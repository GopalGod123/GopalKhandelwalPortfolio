import { motion } from 'framer-motion';
import { ArrowUpRight, Brain, CalendarDays, Check, Layers, Mic, Rocket, ScanEye } from 'lucide-react';
import { profile, services } from '@/data/portfolio';
import { ease } from '@/lib/motion';
import SectionHeader from '@/components/ui/SectionHeader';

const icons = { rocket: Rocket, brain: Brain, mic: Mic, scan: ScanEye, layers: Layers };

const rise = (index) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.8, ease, delay: (index % 3) * 0.08 },
});

export default function Services() {
  return (
    <section id="services" className="py-14 md:py-20">
      <div className="container-site">
        <SectionHeader index="01" label="Services" title={<>How I can help your <span className="serif-accent ice-text">business</span>.</>}>
          Focused engagements for teams that need AI to work in production, delivered by the engineer who designs, builds and ships it.
        </SectionHeader>

        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = icons[service.icon] ?? Rocket;
            return (
              <motion.li key={service.title} {...rise(index)} className="card spotlight spotlight-border group flex flex-col p-7 transition-transform duration-500 hover:-translate-y-1 md:p-8">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[rgb(var(--accent-hi))] via-accent to-[rgb(var(--accent-lo))] text-accent-ink shadow-[inset_0_1px_0_rgb(255_255_255/0.35),0_10px_24px_-10px_rgb(var(--accent)/0.8)] transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-105">
                  <Icon size={22} strokeWidth={1.8} />
                </span>
                <h3 className="mt-7 text-2xl font-semibold tracking-[-0.025em]">{service.title}</h3>
                <p className="mt-2 text-muted">{service.pitch}</p>
                <ul className="mt-6 space-y-2.5 border-t border-line pt-6 text-sm">
                  {service.deliverables.map((item) => (
                    <li key={item} className="flex gap-2.5">
                      <Check size={16} className="mt-0.5 shrink-0 text-accent-text" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-auto pt-7 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
                  Proven in · <a href="#work" className="link-underline text-accent-text">{service.proof}</a>
                </p>
              </motion.li>
            );
          })}

          <motion.li {...rise(services.length)} className="relative isolate flex flex-col overflow-hidden rounded-3xl p-7 text-accent-ink md:p-8">
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-br from-[rgb(var(--accent-hi))] via-accent to-[rgb(var(--accent-lo))]" />
            <div aria-hidden="true" className="orb -right-16 -top-16 -z-10 h-56 w-56 animate-drift bg-white/30" />
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] opacity-80">Not sure where to start?</p>
            <h3 className="mt-7 text-2xl font-semibold tracking-[-0.025em]">Let’s scope it together.</h3>
            <p className="mt-2 opacity-85">
              A short call to understand your product, your users and your constraints. You leave with a clear, honest plan, whether or not we work together.
            </p>
            <div className="mt-auto flex flex-wrap gap-3 pt-8">
              <a href={profile.links.schedule} target="_blank" rel="noopener noreferrer" className="btn bg-white text-[#0a1a2c] shadow-[0_10px_24px_-12px_rgb(0_0_0/0.4)] hover:-translate-y-0.5">
                <CalendarDays size={16} /> Book an intro call
              </a>
              <a href="#contact" className="btn border border-[rgb(var(--accent-ink)/0.35)] hover:-translate-y-0.5">
                Send a brief <ArrowUpRight size={16} />
              </a>
            </div>
          </motion.li>
        </ul>
      </div>
    </section>
  );
}
