/** Tiny helpers that work with both Vercel functions and the Vite dev middleware (plain Node req/res). */

export function sendJson(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

export async function readJson(req, limit = 32 * 1024) {
  if (req.body !== undefined) {
    return typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  }
  let raw = '';
  for await (const chunk of req) {
    raw += chunk;
    if (raw.length > limit) throw new Error('Payload too large');
  }
  return raw ? JSON.parse(raw) : {};
}

// Best-effort per-instance limiter; swap for Upstash/KV if abuse becomes real.
const hits = new Map();
export function rateLimit(req, { max = 20, windowMs = 10 * 60 * 1000 } = {}) {
  const ip = String(req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown').split(',')[0].trim();
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || entry.reset < now) {
    hits.set(ip, { count: 1, reset: now + windowMs });
    return true;
  }
  entry.count += 1;
  return entry.count <= max;
}

export const groqKey = () => process.env.GROQ_API_KEY;
