import { profile } from '../src/data/portfolio.js';
import { rateLimit, readJson, sendJson } from './_lib/http.js';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const escapeHtml = (text) => text.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

/** Validates a contact submission; returns { error } or { name, email, message }. */
export function validateContact(body) {
  const name = String(body?.name ?? '').trim();
  const email = String(body?.email ?? '').trim();
  const message = String(body?.message ?? '').trim();
  if (body?.company) return { error: 'spam' }; // honeypot: real visitors never see this field
  if (name.length < 2 || name.length > 100) return { error: 'Please enter your name.' };
  if (!EMAIL_RE.test(email) || email.length > 200) return { error: 'Please enter a valid email address.' };
  if (message.length < 10 || message.length > 5000) return { error: 'Message should be between 10 and 5000 characters.' };
  return { name, email, message };
}

/**
 * POST { name, email, message, company? } → emails the message via Resend.
 * Needs RESEND_API_KEY; CONTACT_TO_EMAIL defaults to the profile email.
 * Returns 503 when unconfigured so the client can fall back to mailto.
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') return sendJson(res, 405, { error: 'Method not allowed' });
  const key = process.env.RESEND_API_KEY;
  if (!key) return sendJson(res, 503, { error: 'Contact form is not configured' });
  if (!rateLimit(req, { max: 5 })) return sendJson(res, 429, { error: 'Too many messages. Please try again later.' });

  let input;
  try {
    input = validateContact(await readJson(req));
  } catch {
    return sendJson(res, 400, { error: 'Invalid request body' });
  }
  // Pretend success for bots so they don't retry.
  if (input.error === 'spam') return sendJson(res, 200, { ok: true });
  if (input.error) return sendJson(res, 400, { error: input.error });

  const { name, email, message } = input;
  const upstream = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || 'Portfolio <onboarding@resend.dev>',
      to: [process.env.CONTACT_TO_EMAIL || profile.email],
      reply_to: email,
      subject: `Portfolio: message from ${name}`,
      text: `${message}\n\n— ${name} <${email}>`,
      html: `<p>${escapeHtml(message).replace(/\n/g, '<br>')}</p><p>— ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>`,
    }),
    signal: AbortSignal.timeout(15_000),
  }).catch(() => null);

  if (!upstream?.ok) return sendJson(res, 502, { error: 'Could not send right now. Please email directly.' });
  return sendJson(res, 200, { ok: true });
}
