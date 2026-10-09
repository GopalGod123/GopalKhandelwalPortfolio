import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Menu, Search, Snowflake, X } from 'lucide-react';
import { openPalette } from '@/lib/palette';
import { navItems, profile } from '@/data/portfolio';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useScrollLock } from '@/hooks/useScrollLock';
import { ease } from '@/lib/motion';
import SoundToggle from '@/components/ui/SoundToggle';
import ThemeToggle from '@/components/ui/ThemeToggle';

const sectionIds = navItems.map((item) => item.id);

export default function Navbar({ snow, onToggleSnow }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(sectionIds);
  useScrollLock(open);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => event.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`transition-all duration-500 ${
          scrolled || open ? 'border-b border-line/70 bg-bg/80 backdrop-blur-xl backdrop-saturate-150' : 'border-b border-transparent'
        }`}
      >
        <nav className="container-site flex h-16 items-center justify-between gap-4 md:h-[4.5rem]" aria-label="Primary">
          <a href="#top" className="flex shrink-0 items-center gap-3" aria-label={`${profile.name}, back to top`}>
            <img src={profile.images.avatar} alt="" width="36" height="36" className="h-9 w-9 rounded-full object-cover ring-1 ring-line" />
            <span className="hidden whitespace-nowrap leading-tight sm:block">
              <span className="block text-sm font-semibold tracking-[-0.01em]">{profile.name}</span>
              <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-faint">{profile.role}</span>
            </span>
          </a>

          <ul className="hidden items-center gap-1 rounded-full border border-line bg-elev/50 p-1 backdrop-blur xl:flex">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={active === item.id ? 'true' : undefined}
                  className={`relative block whitespace-nowrap rounded-full px-3 py-1.5 text-[13px] transition-colors 2xl:px-4 ${
                    active === item.id ? 'text-accent-ink' : 'text-muted hover:text-ink'
                  }`}
                >
                  {active === item.id && (
                    <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-accent" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
                  )}
                  <span className="relative">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              onClick={openPalette}
              className="hidden h-10 shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-line px-3 text-sm text-muted transition-colors hover:border-ink/30 hover:text-ink 2xl:flex"
              aria-label="Open command palette"
            >
              <Search size={15} />
              <kbd className="font-mono text-[11px]">Ctrl K</kbd>
            </button>
            <button
              onClick={onToggleSnow}
              className={`grid h-10 w-10 place-items-center rounded-full border border-line transition-colors hover:border-ink/30 ${snow ? 'text-accent-text' : 'text-faint'}`}
              aria-label={snow ? 'Turn snowfall off' : 'Turn snowfall on'}
              aria-pressed={snow}
              title={snow ? 'Snowfall on' : 'Snowfall off'}
            >
              <Snowflake size={16} />
            </button>
            <SoundToggle />
            <ThemeToggle />
            <a href="#contact" className="btn-accent hidden !py-2.5 sm:inline-flex">
              Let’s talk <ArrowUpRight size={14} />
            </a>
            <button
              onClick={() => setOpen((value) => !value)}
              className="grid h-10 w-10 place-items-center rounded-full border border-line xl:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto bg-bg xl:hidden"
          >
            <div className="container-site flex min-h-full flex-col py-8">
              <ul className="flex flex-col">
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.04 * index, duration: 0.5, ease }}
                    className="border-b border-line"
                  >
                    <a href={`#${item.id}`} onClick={() => setOpen(false)} className="flex items-baseline justify-between py-5">
                      <span className="text-4xl font-semibold tracking-[-0.03em]">{item.label}</span>
                      <span className="font-mono text-xs text-faint">0{index + 1}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-auto flex flex-col gap-3 pt-10">
                <a href="#contact" onClick={() => setOpen(false)} className="btn-accent">
                  Let’s talk <ArrowUpRight size={16} />
                </a>
                <a href={`mailto:${profile.email}`} className="btn-ghost">{profile.email}</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
