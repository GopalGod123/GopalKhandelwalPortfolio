import { buildSystemPrompt, sanitizeDocuments } from './_lib/prompt.js';
import { groqKey, rateLimit, readJson, sendJson } from './_lib/http.js';

const MAX_HISTORY = 10;
const MAX_CHARS = 2000;
const MAX_BODY = 512 * 1024;

export function sanitize(messages) {
  if (!Array.isArray(messages)) return null;
  const clean = messages
    .slice(-MAX_HISTORY)
    .filter((m) => (m?.role === 'user' || m?.role === 'assistant') && typeof m.content === 'string' && m.content.trim())
    .map((m) => ({ role: m.role, content: m.content.trim().slice(0, MAX_CHARS) }));
  return clean.at(-1)?.role === 'user' ? clean : null;
}

export const chatModels = () => [...new Set([process.env.GROQ_CHAT_MODEL || 'openai/gpt-oss-120b', 'openai/gpt-oss-20b'])];

/** The last two user turns, so follow-ups like "tell me more about it" still retrieve the right context. */
export const retrievalQuery = (messages) =>
  messages.filter((m) => m.role === 'user').slice(-2).map((m) => m.content).join('\n');

/**
 * POST { messages: [{ role, content }], documents?: [{ name, text }] }
 * → streams the assistant reply as plain text; `X-Sources` lists the context used.
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') return sendJson(res, 405, { error: 'Method not allowed' });
  const key = groqKey();
  if (!key) return sendJson(res, 503, { error: 'Assistant is not configured' });
  if (!rateLimit(req)) return sendJson(res, 429, { error: 'Too many requests, please try again later' });

  let messages;
  let documents;
  try {
    const body = await readJson(req, MAX_BODY);
    messages = sanitize(body.messages);
    documents = sanitizeDocuments(body.documents);
  } catch {
    return sendJson(res, 400, { error: 'Invalid request body' });
  }
  if (!messages) return sendJson(res, 400, { error: 'Expected a conversation ending with a user message' });

  const { prompt, sources } = buildSystemPrompt({ query: retrievalQuery(messages), documents });

  // Each Groq model has its own tokens-per-minute budget, so a busy primary falls through to the next.
  let upstream = null;
  for (const model of chatModels()) {
    upstream = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model,
        messages: [{ role: 'system', content: prompt }, ...messages],
        // Reasoning tokens count toward the completion budget, so leave headroom for document analysis.
        reasoning_effort: documents.length ? 'medium' : 'low',
        max_completion_tokens: 2500,
        temperature: 0.2,
        stream: true,
      }),
      signal: AbortSignal.timeout(45_000),
    }).catch(() => null);
    if (upstream?.ok && upstream.body) break;
    console.error(`[chat] ${model} failed: ${upstream ? `${upstream.status} ${(await upstream.text().catch(() => '')).slice(0, 300)}` : 'network error'}`);
    if (upstream && upstream.status !== 429 && upstream.status < 500) break;
  }

  if (!upstream?.ok || !upstream.body) {
    return sendJson(res, upstream?.status === 429 ? 429 : 502, { error: 'Upstream model unavailable' });
  }

  res.writeHead(200, {
    'Content-Type': 'text/plain; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Accel-Buffering': 'no',
    'X-Sources': encodeURIComponent(JSON.stringify(sources)),
  });

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
