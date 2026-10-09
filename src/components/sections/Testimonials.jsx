import { motion } from 'framer-motion';
import { ArrowUpRight, Quote } from 'lucide-react';
import { testimonials } from '@/data/portfolio';
import { ease } from '@/lib/motion';
import SectionHeader from '@/components/ui/SectionHeader';

const initials = (name) => name.split(/\s+/).map((part) => part[0]).slice(0, 2).join('').toUpperCase();

/** Reviews from real clients and colleagues. Renders nothing until `testimonials` has entries. */
export default function Testimonials() {
  if (testimonials.length === 0) return null;
  const [featured, ...rest] = testimonials;

  return (
    <section id="reviews" className="py-14 md:py-20">
      <div className="container-site">
        <SectionHeader label="Reviews" title={<>In the words of the people <span className="serif-accent ice-text">I’ve built with</span>.</>} />

        <motion.figure
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease }}
          className="card spotlight spotlight-border relative overflow-hidden p-8 md:p-12"
        >
          <Quote aria-hidden="true" className="absolute -right-4 -top-4 h-40 w-40 text-accent/10" strokeWidth={1} />
          <blockquote className="relative max-w-4xl font-serif text-[clamp(1.6rem,3vw,2.5rem)] font-medium leading-[1.2] text-balance">
            “{featured.quote}”
          </blockquote>
          <Attribution item={featured} className="mt-8" />
        </motion.figure>

        {rest.length > 0 && (
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {rest.map((item, index) => (
              <motion.figure
                key={item.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, ease, delay: (index % 2) * 0.08 }}
                className="card spotlight spotlight-border flex flex-col p-7 md:p-8"
              >
                <Quote aria-hidden="true" size={22} className="text-accent-text" />
                <blockquote className="mt-4 text-lg leading-relaxed text-ink">“{item.quote}”</blockquote>
                <Attribution item={item} className="mt-auto pt-7" />
              </motion.figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function Attribution({ item, className = '' }) {
  return (
    <figcaption className={`flex flex-wrap items-center gap-4 ${className}`}>
      {item.photo ? (
        <img src={item.photo} alt="" width="48" height="48" loading="lazy" className="h-12 w-12 rounded-full object-cover ring-1 ring-line" />
      ) : (
        <span aria-hidden="true" className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-[rgb(var(--accent-hi))] to-[rgb(var(--accent-lo))] text-sm font-semibold text-accent-ink">
          {initials(item.name)}
        </span>
      )}
      <div className="min-w-0">
        <p className="font-semibold">{item.name}</p>
        <p className="text-sm text-muted">{item.role}, {item.company}</p>
      </div>
      <span className="chip ml-auto">{item.relation}</span>
      {item.source && (
        <a href={item.source} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-medium text-ink">
          <span className="link-underline">View original</span> <ArrowUpRight size={14} />
        </a>
      )}
    </figcaption>
  );
}
