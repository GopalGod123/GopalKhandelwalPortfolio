import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, CalendarDays, Copy, FileText, Github, Hash, Linkedin, Mail, Moon, Search, Snowflake, Sparkles, Sun } from 'lucide-react';
import { navItems, profile } from '@/data/portfolio';
import { useTheme } from '@/hooks/useTheme';
import { useScrollLock } from '@/hooks/useScrollLock';
import { openAssistant } from '@/lib/assistant';
import { PALETTE_OPEN_EVENT } from '@/lib/palette';

const openUrl = (url) => window.open(url, '_blank', 'noopener,noreferrer');

export default function CommandPalette({ snow, onToggleSnow }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const [toast, setToast] = useState('');
  const { theme, toggleTheme } = useTheme();
  const dialogRef = useRef(null);
  const inputRef = useRef(null);
  useScrollLock(open);

  const actions = useMemo(() => [
    ...navItems.map((item) => ({
      id: `go-${item.id}`, group: 'Navigate', label: `Go to ${item.label}`, icon: Hash,
      run: () => document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' }),
    })),
    { id: 'ask', group: 'Actions', label: 'Ask my AI assistant', icon: Sparkles, keywords: 'chat bot question', run: openAssistant },
    {
      id: 'copy-email', group: 'Actions', label: 'Copy email address', icon: Copy, keywords: 'contact mail',
      run: async () => {
        try {
          await navigator.clipboard.writeText(profile.email);
          setToast('Email copied');
        } catch {
          window.location.href = `mailto:${profile.email}`;
        }
      },
      keepOpen: true,
    },
    { id: 'email', group: 'Actions', label: 'Send an email', icon: Mail, keywords: 'contact mail', run: () => { window.location.href = `mailto:${profile.email}`; } },
    { id: 'call', group: 'Actions', label: 'Book a call', icon: CalendarDays, keywords: 'meeting schedule calendar', run: () => openUrl(profile.links.schedule) },
    { id: 'resume', group: 'Links', label: 'Open résumé', icon: FileText, keywords: 'cv resume', run: () => openUrl(profile.links.resume) },
    { id: 'github', group: 'Links', label: 'GitHub', icon: Github, keywords: 'code repos', run: () => openUrl(profile.links.github) },
    { id: 'linkedin', group: 'Links', label: 'LinkedIn', icon: Linkedin, run: () => openUrl(profile.links.linkedin) },
    { id: 'theme', group: 'Preferences', label: theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme', icon: theme === 'dark' ? Sun : Moon, keywords: 'mode color', run: toggleTheme, keepOpen: true },
    { id: 'snow', group: 'Preferences', label: snow ? 'Turn snowfall off' : 'Turn snowfall on', icon: Snowflake, keywords: 'winter animation', run: onToggleSnow, keepOpen: true },
  ], [theme, toggleTheme, snow, onToggleSnow]);

  const results = useMemo(() => {
    const words = query.toLowerCase().split(/\s+/).filter(Boolean);
    return actions.filter((action) => {
      const haystack = `${action.label} ${action.group} ${action.keywords ?? ''}`.toLowerCase();
      return words.every((word) => haystack.includes(word));
    });
  }, [actions, query]);

  useEffect(() => {
    const onKey = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen((value) => !value);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener('keydown', onKey);
    window.addEventListener(PALETTE_OPEN_EVENT, onOpen);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener(PALETTE_OPEN_EVENT, onOpen);
    };
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      setQuery('');
      setActive(0);
      dialog.showModal();
      inputRef.current?.focus();
    }
    if (!open && dialog.open) dialog.close();
  }, [open]);

  useEffect(() => {
    if (!toast) return undefined;
    const id = setTimeout(() => setToast(''), 1600);
    return () => clearTimeout(id);
  }, [toast]);

  const run = (action) => {
    if (!action) return;
    if (!action.keepOpen) setOpen(false);
    action.run();
  };

  const onKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActive((index) => Math.min(index + 1, results.length - 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActive((index) => Math.max(index - 1, 0));
    } else if (event.key === 'Enter') {
      event.preventDefault();
      run(results[active]);
    }
  };

  let lastGroup = null;

  return (
    <dialog
      ref={dialogRef}
      onClose={() => setOpen(false)}
      onClick={(event) => event.target === dialogRef.current && setOpen(false)}
      aria-label="Command palette"
      className="gloss mx-auto mt-[12vh] w-[min(100%-2rem,36rem)] overflow-hidden rounded-3xl p-0 text-ink backdrop:bg-[#0a1a2c]/35 backdrop:backdrop-blur-sm"
    >
      <div className="flex items-center gap-3 border-b border-line px-4">
        <Search size={18} className="shrink-0 text-faint" />
        <input
          ref={inputRef}
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setActive(0);
          }}
          onKeyDown={onKeyDown}
          placeholder="Type a command or search…"
          aria-label="Search commands"
          aria-controls="palette-results"
          aria-activedescendant={results[active] ? `palette-${results[active].id}` : undefined}
          className="h-14 flex-1 bg-transparent text-[15px] placeholder:text-faint focus:outline-none"
        />
        <kbd className="rounded-md border border-line px-1.5 py-0.5 font-mono text-[10px] text-faint">ESC</kbd>
      </div>

      <ul id="palette-results" role="listbox" className="max-h-[min(60vh,26rem)] overflow-y-auto p-2">
        {results.length === 0 && <li className="px-3 py-8 text-center text-sm text-faint">No matches for “{query}”</li>}
        {results.map((action, index) => {
          const Icon = action.icon;
          const header = action.group !== lastGroup ? action.group : null;
          lastGroup = action.group;
          return (
            <li key={action.id} role="presentation">
              {header && <p className="px-3 pb-1 pt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-faint">{header}</p>}
              <button
                id={`palette-${action.id}`}
                role="option"
                aria-selected={index === active}
                onMouseEnter={() => setActive(index)}
                onClick={() => run(action)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${index === active ? 'bg-accent/20 text-ink' : 'text-muted'}`}
              >
                <Icon size={16} className={index === active ? 'text-accent-text' : 'text-faint'} />
                <span className="flex-1">{action.label}</span>
                {index === active && <ArrowRight size={14} className="text-accent-text" />}
              </button>
            </li>
          );
        })}
      </ul>

      <div className="flex items-center justify-between border-t border-line px-4 py-2.5 font-mono text-[10px] text-faint">
        <span>↑↓ navigate · ↵ select</span>
        <span role="status" className="text-accent-text">{toast}</span>
      </div>
    </dialog>
  );
}
