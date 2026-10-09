import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDownRight, Github, Linkedin, Sparkles } from 'lucide-react';
import { capabilities, metrics, profile } from '@/data/portfolio';
import { ease } from '@/lib/motion';
import { openAssistant } from '@/lib/assistant';
import CountUp from '@/components/ui/CountUp';
import { GlacierRange } from '@/components/ui/Glacier';

const rise = (delay) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease, delay },
});

// [top, left, size px, delay s]: glints scattered over the ice.
const SPARKLES = [
  ['16%', '44%', 22, 0], ['30%', '8%', 14, 1.2], ['12%', '88%', 26, 0.6], ['48%', '60%', 16, 2.1],
  ['62%', '92%', 20, 1.6], ['70%', '34%', 12, 2.8], ['38%', '72%', 18, 0.3],
];

const marqueeItems = [...new Set(capabilities.flatMap((group) => group.tools))];

function LocalTime() {
  const format = () =>
    new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: profile.timezone }).format(new Date());
  const [time, setTime] = useState(format);

  useEffect(() => {
    const id = setInterval(() => setTime(format()), 15000);
    return () => clearInterval(id);
  });

  return <span className="tabular-nums">{time} IST</span>;
}

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 md:pt-32">
      <div aria-hidden="true" className="ice-surface pointer-events-none absolute inset-0 -z-10 [mask-image:linear-gradient(180deg,black_70%,transparent)]" />
      {SPARKLES.map(([top, left, size, delay]) => (
        <span key={`${top}-${left}`} aria-hidden="true" className="sparkle" style={{ top, left, '--s': `${size}px`, '--delay': `${delay}s` }} />
      ))}
      <div aria-hidden="true" className="aurora pointer-events-none absolute inset-x-0 -top-24 -z-10 h-[46rem]" />

      <div className="container-site">
        <div className="grid items-end gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7 xl:col-span-8">
            <motion.div {...rise(0.05)} className="mb-8 flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
              <span className="frost inline-flex items-center gap-2.5 rounded-full px-3.5 py-2">
                <span className="h-2 w-2 animate-pulse-dot rounded-full bg-accent" />
                {profile.availability}
              </span>
              <span className="hidden items-center gap-2 px-1 xs:inline-flex">
                {profile.location.split(',')[0]}, IN · <LocalTime />
              </span>
            </motion.div>

            <h1 className="text-display font-medium">
              <motion.span {...rise(0.12)} className="block">
                AI products
              </motion.span>
              <motion.span {...rise(0.22)} className="block">
                that <span className="serif-accent ice-text">hold up</span>
              </motion.span>
              <motion.span {...rise(0.32)} className="block">
                in production.
              </motion.span>
            </h1>

            <motion.p {...rise(0.45)} className="mt-8 max-w-xl text-lead text-muted">
              {profile.intro}
            </motion.p>

            <motion.div {...rise(0.55)} className="mt-10 flex flex-wrap items-center gap-3">
              <a href="#work" className="btn-accent">
                See selected work <ArrowDownRight size={16} />
              </a>
              <button type="button" onClick={openAssistant} className="btn-ghost">
                <Sparkles size={15} className="text-accent-text" /> Ask my AI about me
              </button>
              <div className="ml-1 flex items-center gap-1">
                <a href={profile.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="grid h-11 w-11 place-items-center rounded-full text-muted transition-colors hover:bg-soft hover:text-ink">
                  <Github size={18} />
                </a>
                <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="grid h-11 w-11 place-items-center rounded-full text-muted transition-colors hover:bg-soft hover:text-ink">
                  <Linkedin size={18} />
                </a>
              </div>
            </motion.div>
          </div>

          <motion.figure
            initial={{ opacity: 0, scale: 0.96, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.1, ease, delay: 0.2 }}
            className="relative mx-auto w-full max-w-sm lg:col-span-5 lg:max-w-none xl:col-span-4"
          >
            <div aria-hidden="true" className="absolute -inset-3 -z-10 rounded-[2.4rem] bg-gradient-to-br from-accent/40 via-transparent to-[rgb(var(--aurora-2)/0.35)] blur-2xl" />
            <div className="glint glint-auto relative aspect-[4/5] overflow-hidden rounded-[2rem] border-2 border-white/80 bg-soft shadow-[0_30px_60px_-25px_rgb(2_132_199/0.6),inset_0_1px_0_rgb(255_255_255/0.9)]">
              <img
                src={profile.images.portrait}
                srcSet={`${profile.images.portraitSmall} 480w, ${profile.images.portrait} 880w`}
                sizes="(min-width: 1024px) 30vw, 90vw"
                alt={`Portrait of ${profile.name}`}
                width="880"
                height="1100"
                fetchPriority="high"
                className="h-full w-full object-cover object-[50%_20%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#bfe8fb]/70 via-transparent to-transparent" />
              <span className="absolute left-4 top-4 rounded-full border border-white/70 bg-white/70 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-[#0284c7] backdrop-blur-md">
                Winter arc — {new Date().getFullYear()}
              </span>
              <figcaption className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/70 bg-white/70 p-4 text-[#06324f] shadow-[0_10px_30px_-10px_rgb(2_132_199/0.4)] backdrop-blur-md">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#0284c7]">Currently</p>
                <p className="mt-1 text-sm font-medium">AI/ML Full-Stack Engineer</p>
                <p className="text-sm text-[#2c688e]">Lightning Technology · Remote</p>
              </figcaption>
            </div>
          </motion.figure>
        </div>

        <dl className="mt-20 grid grid-cols-2 border-t border-line md:mt-24 lg:grid-cols-4">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease, delay: 0.08 * index }}
              className={[
                'border-line py-7 pr-4',
                index % 2 === 1 && 'border-l pl-5 md:pl-8',
                index < 2 && 'border-b lg:border-b-0',
                index === 2 && 'lg:border-l lg:pl-8',
              ].filter(Boolean).join(' ')}
            >
              <dt className="sr-only">{metric.label}</dt>
              <dd>
                <span className="block text-5xl font-medium tracking-tight md:text-6xl">
                  <CountUp value={metric.value} suffix={metric.suffix} />
                </span>
                <span className="mt-3 block max-w-[16rem] text-sm text-muted">{metric.label}</span>
              </dd>
            </motion.div>
          ))}
        </dl>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease }}
        className="relative mt-6"
      >
        <GlacierRange className="block h-[200px] w-full sm:h-[260px] lg:h-[340px]" />
      </motion.div>

      <div className="relative overflow-hidden border-b border-line bg-elev/40 py-5 [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]" aria-hidden="true">
        <div className="flex w-max animate-marquee gap-10 hover:[animation-play-state:paused]">
          {[...marqueeItems, ...marqueeItems].map((item, index) => (
            <span key={index} className="flex items-center gap-10 whitespace-nowrap font-mono text-sm text-muted">
              {item}
              <span className="h-1 w-1 rounded-full bg-accent" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
