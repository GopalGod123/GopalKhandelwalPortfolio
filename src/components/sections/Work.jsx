import { motion } from 'framer-motion';
import { ArrowUpRight, Building2, Github, Lock } from 'lucide-react';
import { moreProjects, profile, projects } from '@/data/portfolio';
import { ease, reveal } from '@/lib/motion';
import SectionHeader from '@/components/ui/SectionHeader';
import ProjectVisual from '@/components/ui/ProjectVisual';

// The frame opens from a rounded inset while its content settles from a slight zoom.
const frameReveal = {
  hidden: { clipPath: 'inset(10% 8% 10% 8% round 28px)', opacity: 0 },
  show: { clipPath: 'inset(0% 0% 0% 0% round 28px)', opacity: 1, transition: { duration: 1.2, ease } },
};
const settle = {
  hidden: { scale: 1.08 },
  show: { scale: 1, transition: { duration: 1.6, ease } },
};
const textReveal = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease, delay: 0.15 } },
};

function CaseStudy({ project, index }) {
  const flip = index % 2 === 1;
  return (
    <motion.article
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-100px' }}
      transition={{ staggerChildren: 0.08 }}
      className="group grid gap-8 lg:grid-cols-12 lg:gap-12"
      aria-labelledby={`${project.slug}-title`}
    >
      <motion.div
        variants={frameReveal}
        className={`frame spotlight spotlight-border aspect-[16/11] rounded-[1.75rem] backdrop-blur-md transition-shadow duration-500 lg:col-span-7 ${flip ? 'lg:order-2' : ''}`}
      >
        <motion.div variants={settle} className="h-full w-full">
          <ProjectVisual project={project} />
        </motion.div>
        <span className="absolute left-4 top-4 z-[1] rounded-full border border-line bg-elev/90 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted backdrop-blur">
          {project.kind}
        </span>
      </motion.div>

      <motion.div variants={textReveal} className="flex flex-col lg:col-span-5">
        <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
          <span className="text-accent-text">{String(index + 1).padStart(2, '0')}</span>
          <span className="h-px w-8 bg-line" />
          {project.org} · {project.year}
          {project.status && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 text-[10px] text-accent-text">
              <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-accent" /> {project.status}
            </span>
          )}
        </div>
        <h3 id={`${project.slug}-title`} className="mt-4 text-h2 font-semibold">{project.title}</h3>
        <p className="mt-3 text-muted">{project.summary}</p>

        <dl className="mt-7 space-y-4 border-t border-line pt-6 text-sm">
          {[
            ['Problem', project.problem],
            ['Approach', project.approach],
            [project.status ? 'Goal' : 'Outcome', project.outcome],
          ].map(([term, text]) => (
            <div key={term} className="grid gap-1 sm:grid-cols-[6.5rem_1fr] sm:gap-4">
              <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint sm:pt-0.5">{term}</dt>
              <dd className={term !== 'Problem' && term !== 'Approach' ? 'text-ink' : 'text-muted'}>{text}</dd>
            </div>
          ))}
        </dl>

        {project.metrics && (
          <ul className="mt-6 flex flex-wrap gap-2">
            {project.metrics.map((metric) => (
              <li key={metric} className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent-text">{metric}</li>
            ))}
          </ul>
        )}

        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Tech stack">
          {project.stack.map((tech) => <li key={tech} className="chip">{tech}</li>)}
        </ul>

        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
          {project.links.live && (
            <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-medium text-ink">
              <span className="link-underline">Live demo</span> <ArrowUpRight size={15} />
            </a>
          )}
          {project.links.code && (
            <a href={project.links.code} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-medium text-ink">
              <Github size={15} /> <span className="link-underline">Source code</span>
            </a>
          )}
          {project.status && !project.links.code && !project.links.live && (
            <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-medium text-ink">
              <Github size={15} /> <span className="link-underline">Follow progress on GitHub</span>
            </a>
          )}
          {!project.status && !project.links.code && !project.links.live && (
            <>
              <span className="inline-flex items-center gap-1.5 text-muted">
                <Building2 size={15} className="shrink-0 text-accent-text" />
                {project.privateNote ?? 'Private project. Walkthrough available on request.'}
              </span>
              <a href="#contact" className="inline-flex items-center gap-1.5 font-medium text-ink">
                <span className="link-underline">Request a demo</span> <ArrowUpRight size={15} />
              </a>
            </>
          )}
        </div>
      </motion.div>
    </motion.article>
  );
}

export default function Work() {
  return (
    <section id="work" className="py-14 md:py-20">
      <div className="container-site">
        <SectionHeader index="01" label="Selected work" title={<>Case studies in shipping <span className="serif-accent ice-text">applied AI</span>.</>}>
          Systems in production or delivered to clients, plus what I’m building now, each described by the problem, how it’s built and what it changes.
        </SectionHeader>

        <div className="space-y-24 md:space-y-32">
          {projects.map((project, index) => (
            <CaseStudy key={project.slug} project={project} index={index} />
          ))}
        </div>

        {moreProjects.length > 0 && <motion.div {...reveal()} className="mt-20 md:mt-28">
          <p className="eyebrow mb-4">Earlier work</p>
          <ul className="border-t border-line">
            {moreProjects.map((item) => {
              const Tag = item.link ? 'a' : 'div';
              return (
                <li key={item.title} className="border-b border-line">
                  <Tag
                    {...(item.link ? { href: item.link, target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="group grid items-center gap-1 py-5 transition-all duration-300 hover:pl-2 sm:grid-cols-12 sm:gap-4"
                  >
                    <span className="text-lg font-medium transition-colors group-hover:text-accent-text sm:col-span-4">{item.title}</span>
                    <span className="text-sm text-muted sm:col-span-4">{item.note}</span>
                    <span className="font-mono text-xs text-faint sm:col-span-3">{item.stack}</span>
                    <span className="hidden justify-self-end text-faint transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink sm:col-span-1 sm:block">
                      {item.link ? <ArrowUpRight size={18} /> : <Lock size={15} />}
                    </span>
                  </Tag>
                </li>
              );
            })}
          </ul>
        </motion.div>}
      </div>
    </section>
  );
}
