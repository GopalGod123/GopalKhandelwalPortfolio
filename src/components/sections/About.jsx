import { motion } from 'framer-motion';
import { focus, principles, profile } from '@/data/portfolio';
import { ease, reveal } from '@/lib/motion';
import SectionHeader from '@/components/ui/SectionHeader';
import { Iceberg } from '@/components/ui/Glacier';

export default function About() {
  return (
    <section id="about" className="py-14 md:py-20">
      <div className="container-site">
        <SectionHeader index="06" label="About" title={<>How I <span className="serif-accent ice-text">work</span>.</>} />

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <motion.blockquote {...reveal()} className="lg:col-span-7">
            <p className="font-serif text-[clamp(2.1rem,4vw,3.4rem)] font-medium leading-[1.1] tracking-[-0.01em] text-balance">
              “I like the unglamorous parts of AI: latency, edge cases, the moment a stream stutters. <span className="text-faint">That’s where users decide whether to trust it.</span>”
            </p>
            <footer className="mt-8 flex items-center gap-4">
              <img src={profile.images.avatar} alt="" width="48" height="48" loading="lazy" className="h-12 w-12 rounded-full object-cover ring-1 ring-line" />
              <div>
                <p className="font-medium">{profile.name}</p>
                <p className="text-sm text-muted">{profile.location}</p>
              </div>
            </footer>
            <figure className="mt-14 flex items-center gap-6">
              <Iceberg className="h-36 w-36 shrink-0 animate-float drop-shadow-[0_20px_40px_rgb(var(--aurora-1)/0.35)] sm:h-44 sm:w-44" />
              <figcaption className="max-w-xs text-sm text-muted">
                <span className="mb-1 block font-mono text-[11px] uppercase tracking-[0.16em] text-accent-text">The iceberg rule</span>
                What users see is the tip. Reliability, evals and graceful failure are the 90% below the waterline, and that’s where I spend my time.
              </figcaption>
            </figure>
          </motion.blockquote>

          <div className="lg:col-span-5">
            <ol className="space-y-8">
              {principles.map((item, index) => (
                <motion.li
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.7, ease, delay: index * 0.08 }}
                  className="grid grid-cols-[2.5rem_1fr] gap-2"
                >
                  <span className="font-mono text-sm text-accent-text">0{index + 1}</span>
                  <div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="mt-1.5 text-muted">{item.body}</p>
                  </div>
                </motion.li>
              ))}
            </ol>

            <motion.div {...reveal(0.1)} className="card spotlight spotlight-border mt-12 p-6">
              <p className="eyebrow">Currently exploring</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {focus.map((item, index) => (
                  <li
                    key={item}
                    className={`rounded-full px-3 py-1.5 text-sm ${index === 0 ? 'bg-accent text-accent-ink' : 'border border-line text-muted'}`}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
