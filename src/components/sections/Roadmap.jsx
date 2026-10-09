import { motion } from 'framer-motion';
import { Activity, ArrowUpRight, FlaskConical, GitPullRequest, Languages, Radar, Satellite } from 'lucide-react';
import { profile, roadmap } from '@/data/portfolio';
import { ease } from '@/lib/motion';
import SectionHeader from '@/components/ui/SectionHeader';

const icons = { radar: Radar, languages: Languages, flask: FlaskConical, activity: Activity, satellite: Satellite, git: GitPullRequest };

export default function Roadmap() {
  return (
    <section id="next" className="py-14 md:py-20">
      <div className="container-site">
        <SectionHeader
          index="06"
          label="Building next"
          title={<>What I’m building <span className="serif-accent ice-text">next</span>.</>}
          aside={
            <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="btn-ghost shrink-0">
              Follow on GitHub <ArrowUpRight size={15} />
            </a>
          }
        >
          My 2027 roadmap. None of these has shipped yet: each is a hard problem I want to solve in public.
        </SectionHeader>

        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {roadmap.map((item, index) => {
            const Icon = icons[item.icon] ?? Radar;
            return (
              <motion.li
                key={item.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, ease, delay: (index % 3) * 0.07 }}
                className="card spotlight spotlight-border group flex flex-col p-6 transition-transform duration-500 hover:-translate-y-1 md:p-7"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[rgb(var(--accent-hi))] via-accent to-[rgb(var(--accent-lo))] text-accent-ink shadow-[inset_0_1px_0_rgb(255_255_255/0.35),0_10px_24px_-10px_rgb(var(--accent)/0.8)] transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-105">
                    <Icon size={22} strokeWidth={1.8} />
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-line bg-elev/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                    <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-accent" />
                    {item.status} · {item.target}
                  </span>
                </div>

                <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-accent-text">{item.tag}</p>
                <h3 className="mt-1.5 text-2xl font-semibold tracking-[-0.025em]">{item.title}</h3>
                <p className="mt-2 text-muted">{item.pitch}</p>

                <p className="mt-5 rounded-2xl border border-line/80 bg-soft/50 px-4 py-3 text-sm">
                  <span className="mb-0.5 block font-mono text-[10px] uppercase tracking-[0.14em] text-faint">The hard part</span>
                  {item.challenge}
                </p>

                <ul className="mt-auto flex flex-wrap gap-1.5 pt-6" aria-label="Planned stack">
                  {item.stack.map((tech) => <li key={tech} className="chip">{tech}</li>)}
                </ul>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
