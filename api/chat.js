import { buildSystemPrompt } from './_lib/prompt.js';
import { groqKey, rateLimit, readJson, sendJson } from './_lib/http.js';

const MAX_HISTORY = 10;
const MAX_CHARS = 1000;

export function sanitize(messages) {
  if (!Array.isArray(messages)) return null;
  const clean = messages
    .slice(-MAX_HISTORY)
    .filter((m) => (m?.role === 'user' || m?.role === 'assistant') && typeof m.content === 'string' && m.content.trim())
    .map((m) => ({ role: m.role, content: m.content.trim().slice(0, MAX_CHARS) }));
  return clean.at(-1)?.role === 'user' ? clean : null;
}

/** POST { messages: [{ role, content }] } → streams the assistant reply as plain text. */
export default async function handler(req, res) {
  if (req.method !== 'POST') return sendJson(res, 405, { error: 'Method not allowed' });
  const key = groqKey();
  if (!key) return sendJson(res, 503, { error: 'Assistant is not configured' });
  if (!rateLimit(req)) return sendJson(res, 429, { error: 'Too many requests, please try again later' });

  let messages;
  try {
    messages = sanitize((await readJson(req)).messages);
  } catch {
    return sendJson(res, 400, { error: 'Invalid request body' });
  }
  if (!messages) return sendJson(res, 400, { error: 'Expected a conversation ending with a user message' });

  const upstream = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: process.env.GROQ_CHAT_MODEL || 'openai/gpt-oss-120b',
      messages: [{ role: 'system', content: buildSystemPrompt() }, ...messages],
      reasoning_effort: 'low',
      max_completion_tokens: 900,
      temperature: 0.3,
      stream: true,
    }),
    signal: AbortSignal.timeout(30_000),
  }).catch(() => null);

  if (!upstream?.ok || !upstream.body) return sendJson(res, 502, { error: 'Upstream model unavailable' });

  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store', 'X-Accel-Buffering': 'no' });

  // Parse the SSE stream line by line, keeping partial lines across network chunks.
  const reader = upstream.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop();
      for (const line of lines) {
        if (!line.startsWith('data: ')) continue;
        const data = line.slice(6).trim();
        if (data === '[DONE]') continue;
        try {
          const delta = JSON.parse(data).choices?.[0]?.delta?.content;
          if (delta) res.write(delta);
        } catch {
          // Ignore keep-alive or malformed events.
        }
      }
    }
  } finally {
    res.end();
  }
}
