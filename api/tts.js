import { groqKey, rateLimit, readJson, sendJson } from './_lib/http.js';

const MAX_CHARS = 600;

export const speakable = (text) => {
  const plain = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/[*_#`>]/g, '').replace(/\s+/g, ' ').trim();
  if (plain.length <= MAX_CHARS) return plain;
  const cut = plain.slice(0, MAX_CHARS);
  return cut.slice(0, Math.max(cut.lastIndexOf('. ') + 1, 200)) || cut;
};

/** POST { text } → audio/wav */
export default async function handler(req, res) {
  if (req.method !== 'POST') return sendJson(res, 405, { error: 'Method not allowed' });
  const key = groqKey();
  if (!key) return sendJson(res, 503, { error: 'Voice is not configured' });
  if (!rateLimit(req, { max: 20 })) return sendJson(res, 429, { error: 'Too many requests' });

  let text;
  try {
    text = (await readJson(req)).text;
  } catch {
    return sendJson(res, 400, { error: 'Invalid request body' });
  }
  if (typeof text !== 'string' || !text.trim()) return sendJson(res, 400, { error: 'Missing text' });

  const upstream = await fetch('https://api.groq.com/openai/v1/audio/speech', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: 'canopylabs/orpheus-v1-english', voice: 'autumn', response_format: 'wav', input: speakable(text) }),
    signal: AbortSignal.timeout(30_000),
  }).catch(() => null);

  if (!upstream?.ok) return sendJson(res, 502, { error: 'Voice service unavailable' });

  const audio = Buffer.from(await upstream.arrayBuffer());
  res.writeHead(200, { 'Content-Type': 'audio/wav', 'Content-Length': audio.length, 'Cache-Control': 'no-store' });
  res.end(audio);
}
