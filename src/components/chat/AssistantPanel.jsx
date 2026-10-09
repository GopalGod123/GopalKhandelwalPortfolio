import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp, Square, Volume2, VolumeX, X } from 'lucide-react';
import { experience, profile, projects, yearsOfExperience } from '@/data/portfolio';
import ChatMarkdown from './ChatMarkdown';

const GREETING = {
  role: 'assistant',
  content: `Hi, I’m ${profile.firstName}’s AI assistant. Ask me about his experience, projects or skills, or how to get in touch.`,
};

const SUGGESTIONS = [
  'What has he built with LLMs?',
  'Tell me about the RTO simulator',
  'What’s his core tech stack?',
  'Is he open to new roles?',
];

// Used when the API is unreachable, so the widget never dead-ends.
function offlineAnswer(question) {
  const q = question.toLowerCase();
  if (/(contact|email|phone|reach|hire|call)/.test(q)) return `You can reach ${profile.firstName} at **${profile.email}** or book a call from the Contact section.`;
  if (/(project|built|build|work on)/.test(q)) return `Highlights include ${projects.slice(0, 4).map((p) => `**${p.title}**`).join(', ')}. See the Work section for full case studies.`;
  if (/(experience|job|role|company|years)/.test(q)) return `${profile.firstName} has ${yearsOfExperience}+ years of experience and is currently ${experience[0].role} at ${experience[0].company}.`;
  return `I’m offline right now, but ${profile.firstName} is happy to answer directly at **${profile.email}**.`;
}

export default function AssistantPanel({ open, onClose }) {
  const [messages, setMessages] = useState([GREETING]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [voice, setVoice] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  const scrollRef = useRef(null);
  const inputRef = useRef(null);
  const abortRef = useRef(null);
  const audioRef = useRef(null);

  const stopAudio = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    URL.revokeObjectURL(audio.src);
    audioRef.current = null;
    setSpeaking(false);
  }, []);

  useEffect(() => () => {
    abortRef.current?.abort();
    stopAudio();
  }, [stopAudio]);

  useEffect(() => {
    if (!open) {
      stopAudio();
      return undefined;
    }
    inputRef.current?.focus();
    const onKey = (event) => event.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose, stopAudio]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const speak = useCallback(async (text) => {
    try {
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      if (!response.ok) return;
      stopAudio();
      const audio = new Audio(URL.createObjectURL(await response.blob()));
      audioRef.current = audio;
      audio.onended = stopAudio;
      audio.onerror = stopAudio;
      setSpeaking(true);
      await audio.play();
    } catch {
      stopAudio();
    }
  }, [stopAudio]);

  const send = useCallback(async (text) => {
    const question = text.trim();
    if (!question || busy) return;
    setInput('');
    setBusy(true);
    stopAudio();

    const history = [...messages.filter((m) => m !== GREETING), { role: 'user', content: question }];
    setMessages((prev) => [...prev, { role: 'user', content: question }, { role: 'assistant', content: '', pending: true }]);

    const update = (content, done = false) =>
      setMessages((prev) => [...prev.slice(0, -1), { role: 'assistant', content, pending: !done }]);

    let reply = '';
    try {
      abortRef.current = new AbortController();
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
        signal: abortRef.current.signal,
      });
      if (!response.ok || !response.body) throw new Error(`HTTP ${response.status}`);

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        reply += decoder.decode(value, { stream: true });
        update(reply);
      }
      if (!reply.trim()) throw new Error('Empty reply');
      update(reply, true);
      if (voice) speak(reply);
    } catch (error) {
      if (error.name === 'AbortError') {
        update(reply || '_Stopped._', true);
      } else {
        update(offlineAnswer(question), true);
      }
    } finally {
      abortRef.current = null;
      setBusy(false);
    }
  }, [busy, messages, speak, stopAudio, voice]);

  const onSubmit = (event) => {
    event.preventDefault();
    send(input);
  };

  const toggleVoice = () => {
    if (voice) stopAudio();
    setVoice((value) => !value);
  };

  const showSuggestions = messages.length === 1;

  return (
    <AnimatePresence>
      {open && (
        <motion.section
          role="dialog"
          aria-label="AI assistant"
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.98 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-0 right-0 flex h-[min(620px,calc(100dvh-2rem))] w-[min(410px,calc(100vw-2rem))] origin-bottom-right flex-col overflow-hidden rounded-3xl border border-line bg-elev shadow-[0_30px_80px_-20px_rgb(0_0_0/0.45)]"
        >
          <header className="flex items-center justify-between border-b border-line px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img src={profile.images.avatar} alt="" width="36" height="36" className="h-9 w-9 rounded-full object-cover" />
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-elev bg-accent" />
              </div>
              <div className="leading-tight">
                <p className="text-sm font-medium">Ask about {profile.firstName}</p>
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
                  {speaking ? 'Speaking…' : busy ? 'Thinking…' : 'AI · grounded in his résumé'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={toggleVoice}
                className={`grid h-9 w-9 place-items-center rounded-full transition-colors hover:bg-soft ${voice ? 'text-accent-text' : 'text-faint'}`}
                aria-label={voice ? 'Turn voice replies off' : 'Turn voice replies on'}
                aria-pressed={voice}
                title={voice ? 'Voice replies on' : 'Voice replies off'}
              >
                {voice ? <Volume2 size={16} /> : <VolumeX size={16} />}
              </button>
              <button onClick={onClose} className="grid h-9 w-9 place-items-center rounded-full text-faint transition-colors hover:bg-soft hover:text-ink" aria-label="Close assistant">
                <X size={17} />
              </button>
            </div>
          </header>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-5" role="log" aria-live="polite" aria-busy={busy}>
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm ${
                    message.role === 'user' ? 'rounded-br-md bg-accent text-accent-ink' : 'rounded-bl-md bg-soft text-ink'
                  }`}
                >
                  {message.pending && !message.content ? (
                    <span className="flex gap-1 py-1.5" aria-label="Thinking">
                      {[0, 1, 2].map((dot) => (
                        <span key={dot} className="h-1.5 w-1.5 animate-bounce rounded-full bg-faint" style={{ animationDelay: `${dot * 0.12}s` }} />
                      ))}
                    </span>
                  ) : (
                    <ChatMarkdown>{message.content}</ChatMarkdown>
                  )}
                </div>
              </div>
            ))}

            {showSuggestions && (
              <div className="flex flex-wrap gap-2 pt-2">
                {SUGGESTIONS.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => send(suggestion)}
                    className="rounded-full border border-line px-3 py-1.5 text-xs text-muted transition-colors hover:border-accent/60 hover:text-ink"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form onSubmit={onSubmit} className="border-t border-line p-3">
            <div className="flex items-end gap-2 rounded-2xl border border-line bg-bg px-3 py-2 focus-within:border-accent/60">
              <label htmlFor="assistant-input" className="sr-only">Your question</label>
              <textarea
                id="assistant-input"
                ref={inputRef}
                rows={1}
                value={input}
                maxLength={1000}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' && !event.shiftKey) {
                    event.preventDefault();
                    send(input);
                  }
                }}
                placeholder="Ask anything about Gopal…"
                className="max-h-28 flex-1 resize-none bg-transparent py-1.5 text-sm text-ink placeholder:text-faint focus:outline-none"
              />
              {busy ? (
                <button type="button" onClick={() => abortRef.current?.abort()} className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ink text-bg" aria-label="Stop generating">
                  <Square size={12} fill="currentColor" />
                </button>
              ) : (
                <button type="submit" disabled={!input.trim()} className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent text-accent-ink transition-opacity disabled:opacity-30" aria-label="Send">
                  <ArrowUp size={16} />
                </button>
              )}
            </div>
            <p className="mt-2 text-center font-mono text-[10px] text-faint">AI can make mistakes. Verify important details with Gopal.</p>
          </form>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
