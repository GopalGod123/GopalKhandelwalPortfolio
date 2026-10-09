import { ArrowUp } from 'lucide-react';
import { navItems, profile } from '@/data/portfolio';
import { GlacierRange } from '@/components/ui/Glacier';

const social = [
  ['GitHub', profile.links.github],
  ['LinkedIn', profile.links.linkedin],
  ['LeetCode', profile.links.leetcode],
  ['Résumé', profile.links.resume],
];

export default function Footer() {
  return (
    <footer className="overflow-hidden border-t border-line pt-16">
      <div className="container-site">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="max-w-sm text-lead text-muted">
              Full-stack AI engineer building LLM platforms, realtime voice agents and production systems.
            </p>
          </div>
          <nav aria-label="Footer" className="md:col-span-3">
            <p className="eyebrow mb-4">Sitemap</p>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.id}><a href={`#${item.id}`} className="link-underline text-muted hover:text-ink">{item.label}</a></li>
              ))}
            </ul>
          </nav>
          <div className="md:col-span-4">
            <p className="eyebrow mb-4">Elsewhere</p>
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

        <div aria-hidden="true" className="relative mt-20 select-none">
          <GlacierRange water={false} className="absolute inset-x-0 bottom-0 h-[75%] w-full opacity-70 dark:opacity-40" />
          <p className="ice-text relative whitespace-nowrap text-center text-[17.5vw] font-semibold leading-[0.8] tracking-[-0.06em] opacity-[0.22] lg:text-[15.2rem]">
            Gopal K.
          </p>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-line py-6 font-mono text-[11px] uppercase tracking-[0.14em] text-faint sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} {profile.name}</p>
          <p>React · Tailwind · Three.js · Groq</p>
          <a href="#top" className="inline-flex items-center gap-2 hover:text-ink">
            Back to top <ArrowUp size={13} />
          </a>
        </div>
      </div>
    </footer>
  );
}
