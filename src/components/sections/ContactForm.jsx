import { useState } from 'react';
import { ArrowUp, Check, Loader2 } from 'lucide-react';
import { profile } from '@/data/portfolio';

const EMPTY = { name: '', email: '', message: '', company: '' };

/**
 * Sends through /api/contact. If the endpoint isn't configured (503) or is
 * unreachable, falls back to a pre-filled mailto so no message is ever lost.
 */
export default function ContactForm() {
  const [form, setForm] = useState(EMPTY);
  const [state, setState] = useState({ status: 'idle', error: '' });

  const update = (field) => (event) => setForm((prev) => ({ ...prev, [field]: event.target.value }));

  const mailtoFallback = () => {
    const subject = encodeURIComponent(`Portfolio: message from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} <${form.email}>`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setState({ status: 'sending', error: '' });
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (response.ok) {
        setForm(EMPTY);
        setState({ status: 'sent', error: '' });
        return;
      }
      if (response.status === 503 || response.status === 404) {
        mailtoFallback();
        setState({ status: 'idle', error: '' });
        return;
      }
      const { error } = await response.json().catch(() => ({}));
      setState({ status: 'error', error: error || 'Something went wrong. Please email directly.' });
    } catch {
      mailtoFallback();
      setState({ status: 'idle', error: '' });
    }
  };

  if (state.status === 'sent') {
    return (
      <div className="gloss flex flex-col items-center justify-center rounded-3xl p-10 text-center" role="status">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-accent text-accent-ink">
          <Check size={24} />
        </span>
        <p className="mt-5 text-xl font-medium">Message sent!</p>
        <p className="mt-1 text-muted">Thanks for reaching out. I’ll reply to you by email.</p>
        <button onClick={() => setState({ status: 'idle', error: '' })} className="btn-ghost mt-6">Send another</button>
      </div>
    );
  }

  const field = 'w-full rounded-2xl border border-line bg-elev/70 px-4 py-3 text-ink placeholder:text-faint transition focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/20';

  return (
    <form onSubmit={onSubmit} className="gloss space-y-3 rounded-3xl p-5 sm:p-6">
      <p className="eyebrow mb-1">Send a message</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="sr-only">Your name</span>
          <input required minLength={2} maxLength={100} value={form.name} onChange={update('name')} placeholder="Your name" autoComplete="name" className={field} />
        </label>
        <label className="block">
          <span className="sr-only">Your email</span>
          <input required type="email" maxLength={200} value={form.email} onChange={update('email')} placeholder="you@company.com" autoComplete="email" className={field} />
        </label>
      </div>
      <label className="block">
        <span className="sr-only">Message</span>
        <textarea required minLength={10} maxLength={5000} rows={5} value={form.message} onChange={update('message')} placeholder="What are you building, and how can I help?" className={`${field} resize-none`} />
      </label>
      {/* Honeypot: hidden from people, irresistible to bots. */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" value={form.company} onChange={update('company')} className="hidden" aria-hidden="true" />
      {state.status === 'error' && <p role="alert" className="text-sm text-[#e11d48]">{state.error}</p>}
      <button type="submit" disabled={state.status === 'sending'} className="btn-accent w-full disabled:opacity-60">
        {state.status === 'sending' ? <><Loader2 size={16} className="animate-spin" /> Sending…</> : <>Send message <ArrowUp size={16} className="rotate-45" /></>}
      </button>
    </form>
  );
}
