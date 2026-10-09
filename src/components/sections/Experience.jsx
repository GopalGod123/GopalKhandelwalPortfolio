import { motion } from 'framer-motion';
import { experience, yearsOfExperience } from '@/data/portfolio';
import { ease } from '@/lib/motion';
import SectionHeader from '@/components/ui/SectionHeader';

export default function Experience() {
  return (
    <section id="experience" className="py-14 md:py-20">
      <div className="container-site">
        <SectionHeader index="03" label="Experience" title={<>{yearsOfExperience}+ years across startups, <span className="serif-accent ice-text">GovTech</span> and AI SaaS.</>}>
          From multiplayer game backends to government computer-vision systems to LLM platforms, every role has meant owning hard problems end to end.
        </SectionHeader>

        <ol className="border-b border-line">
          {experience.map((job, index) => (
            <motion.li
              key={job.company}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease, delay: index * 0.05 }}
              className="spotlight relative grid gap-6 py-10 lg:grid-cols-12 lg:gap-10"
            >
              <motion.span
                aria-hidden="true"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 1.2, ease, delay: 0.1 }}
                className="absolute inset-x-0 top-0 h-px origin-left bg-gradient-to-r from-accent/60 via-line to-line"
              />
              <div className="font-mono text-xs uppercase tracking-[0.12em] text-faint lg:col-span-3">
                <p className="text-muted">{job.period}</p>
                <p className="mt-1.5">{job.location}</p>
                {job.current && (
                  <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-2.5 py-1 text-[10px] text-accent-text">
                    <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-accent" /> Current
                  </span>
                )}
              </div>
              <div className="lg:col-span-6">
                <h3 className="text-2xl font-semibold tracking-[-0.02em]">{job.role}</h3>
                <p className="mt-1 serif-accent text-2xl text-accent-text">{job.company}</p>
                <ul className="mt-6 space-y-3">
                  {job.highlights.map((item) => (
                    <li key={item} className="flex gap-3 text-muted">
                      <span className="mt-[0.6rem] h-px w-3 shrink-0 bg-faint" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <ul className="flex flex-wrap content-start gap-1.5 lg:col-span-3 lg:justify-end" aria-label="Technologies">
                {job.stack.map((tech) => <li key={tech} className="chip">{tech}</li>)}
              </ul>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
