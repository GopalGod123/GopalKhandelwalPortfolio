import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowDownRight, Github, Linkedin, Sparkles } from 'lucide-react';
import { capabilities, metrics, profile } from '@/data/portfolio';
import { ease } from '@/lib/motion';
import { openAssistant } from '@/lib/assistant';
import CountUp from '@/components/ui/CountUp';
import { GlacierRange } from '@/components/ui/Glacier';
import Magnetic from '@/components/ui/Magnetic';
import SplitText from '@/components/ui/SplitText';

const rise = (delay) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease, delay },
});

// [top, left, size px, delay s]: glints scattered over the ice.
const SPARKLES = [['16%', '44%', 16, 0], ['12%', '88%', 18, 1.4], ['48%', '60%', 12, 2.6], ['62%', '94%', 14, 0.8]];

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

const tiltSpring = { stiffness: 150, damping: 18, mass: 0.5 };

/** Portrait card that tilts towards the pointer in 3D and drifts gently on scroll. */
function Portrait({ scrollYProgress }) {
  const reduce = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [7, -7]), tiltSpring);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-9, 9]), tiltSpring);
  const sheen = useTransform(px, (x) => `radial-gradient(60% 50% at ${50 + x * 60}% 0%, rgb(255 255 255 / 0.28), transparent 70%)`);
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -60]);

  const onMove = (event) => {
    if (reduce || event.pointerType !== 'mouse') return;
    const rect = event.currentTarget.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width - 0.5);
    py.set((event.clientY - rect.top) / rect.height - 0.5);
  };
  const reset = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <motion.figure
      initial={{ opacity: 0, scale: 0.94, y: 40, filter: 'blur(10px)' }}
      animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 1.3, ease, delay: 0.25 }}
      className="relative mx-auto w-full max-w-sm [perspective:1200px] lg:col-span-5 lg:max-w-none xl:col-span-4"
    >
      <motion.div style={{ y }}>
        <div aria-hidden="true" className="absolute -inset-6 -z-10 rounded-[2.6rem] bg-gradient-to-br from-accent/30 via-transparent to-[rgb(var(--aurora-3)/0.45)] blur-3xl" />
        <motion.div
          onPointerMove={onMove}
          onPointerLeave={reset}
          style={{ rotateX, rotateY }}
          className="frame glint glint-auto aspect-[4/5] rounded-[2rem]"
        >
          <img
            src={profile.images.portrait}
            srcSet={`${profile.images.portraitSmall} 480w, ${profile.images.portrait} 742w`}
            sizes="(min-width: 1024px) 30vw, 90vw"
            alt={`Portrait of ${profile.name}`}
            width="742"
            height="928"
            fetchPriority="high"
            className="h-full w-full object-cover object-[50%_20%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a1a2c]/45 via-transparent to-transparent" />
          <motion.div aria-hidden="true" style={{ backgroundImage: sheen }} className="pointer-events-none absolute inset-0" />
          <figcaption className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/40 bg-white/80 p-4 text-[#0a1a2c] shadow-[0_18px_40px_-16px_rgb(10_26_44/0.5)] backdrop-blur-md">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#1d4ed8]">Currently</p>
            <p className="mt-1 text-sm font-semibold">AI/ML Full-Stack Engineer</p>
            <p className="text-sm text-[#485e78]">Lightning Technology · Remote</p>
          </figcaption>
        </motion.div>
      </motion.div>
    </motion.figure>
  );
}

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  return (
    <section id="top" ref={ref} className="spotlight relative overflow-hidden pt-28 md:pt-32">
      <div aria-hidden="true" className="ice-surface pointer-events-none absolute inset-0 -z-10 [mask-image:linear-gradient(180deg,black_70%,transparent)]" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <span className="orb -left-32 top-10 h-[28rem] w-[28rem] animate-drift bg-[rgb(var(--aurora-1)/0.45)]" />
        <span className="orb right-[-10rem] top-40 h-[32rem] w-[32rem] animate-drift-slow bg-[rgb(var(--aurora-3)/0.4)]" />
      </div>
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

            <h1 className="text-display font-semibold">
              <SplitText className="block" delay={0.1}>AI products</SplitText>
              <SplitText className="block" delay={0.25}>
                that <span className="serif-accent ice-text">hold up</span>
              </SplitText>
              <SplitText className="block" delay={0.4}>in production.</SplitText>
            </h1>

            <motion.p {...rise(0.45)} className="mt-8 max-w-xl text-lead text-muted">
              {profile.intro}
            </motion.p>

            <motion.div {...rise(0.55)} className="mt-10 flex flex-wrap items-center gap-3">
              <Magnetic>
                <a href="#work" className="btn-accent group/cta">
                  See selected work <ArrowDownRight size={16} className="transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:translate-y-0.5" />
                </a>
              </Magnetic>
              <Magnetic>
                <button type="button" onClick={openAssistant} className="btn-ghost">
                  <Sparkles size={15} className="text-accent-text" /> Ask my AI assistant
                </button>
              </Magnetic>
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

          <Portrait scrollYProgress={scrollYProgress} />
        </div>

        <dl className="relative mt-20 grid grid-cols-2 md:mt-24 lg:grid-cols-4">
          <motion.span
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease }}
            className="absolute inset-x-0 top-0 h-px origin-left bg-gradient-to-r from-accent/70 via-line to-line"
          />
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
                <span className="block text-5xl font-semibold tracking-[-0.04em] md:text-6xl">
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
