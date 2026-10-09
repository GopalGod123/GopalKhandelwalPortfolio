import { motion } from 'framer-motion';
import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { navItems, profile } from '@/data/portfolio';
import { reveal } from '@/lib/motion';

const social = [
  ['LinkedIn', profile.links.linkedin],
  ['GitHub', profile.links.github],
  ['Book a call', profile.links.schedule],
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line pt-20">
      <div aria-hidden="true" className="orb -bottom-40 left-1/2 h-[24rem] w-[48rem] -translate-x-1/2 bg-[rgb(var(--aurora-1)/0.25)]" />
      <div className="container-site relative">
        <motion.div {...reveal()} className="grid gap-10 border-b border-line pb-16 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="eyebrow">Gopal Khandelwal · AI Product Engineering</p>
            <p className="mt-6 max-w-3xl text-[clamp(2rem,4.4vw,3.5rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-balance">
              Intelligent systems, engineered with <span className="serif-accent ice-text">precision</span> and built to last.
            </p>
          </div>
          <div className="lg:col-span-4 lg:justify-self-end">
            <a href="#contact" className="btn-accent">
              Start a conversation <ArrowUpRight size={16} />
            </a>
          </div>
        </motion.div>

        <div className="grid gap-10 py-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="max-w-sm text-muted">
              Partnering with founders and product teams to design, build and scale AI products, from first prototype to dependable production systems.
            </p>
          </div>
          <nav aria-label="Footer" className="md:col-span-3">
            <p className="eyebrow mb-4">Explore</p>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.id}><a href={`#${item.id}`} className="link-underline text-muted hover:text-ink">{item.label}</a></li>
              ))}
            </ul>
          </nav>
          <div className="md:col-span-4">
            <p className="eyebrow mb-4">Connect</p>
            <ul className="space-y-2">
              {social.map(([label, href]) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noopener noreferrer" className="link-underline text-muted hover:text-ink">{label}</a>
                </li>
              ))}
              <li><a href={`mailto:${profile.email}`} className="link-underline text-muted hover:text-ink">{profile.email}</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-line py-6 font-mono text-[11px] uppercase tracking-[0.14em] text-faint sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
          <p>{profile.location}</p>
          <a href="#top" className="inline-flex items-center gap-2 hover:text-ink">
            Back to top <ArrowUp size={13} />
          </a>
        </div>
      </div>
    </footer>
  );
}
