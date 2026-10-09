import { motion } from 'framer-motion';
import { ease, reveal } from '@/lib/motion';
import SplitText from '@/components/ui/SplitText';

export default function SectionHeader({ index, label, title, children, aside }) {
  return (
    <div className="relative mb-12 grid gap-6 pt-8 md:mb-16 lg:grid-cols-12 lg:gap-10">
      <motion.span
        aria-hidden="true"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 1.3, ease }}
        className="absolute inset-x-0 top-0 h-px origin-left bg-gradient-to-r from-accent/70 via-line to-line"
      />
      <motion.p {...reveal()} className="eyebrow lg:col-span-3">
        <span className="eyebrow-index">{index}</span>
        <span aria-hidden="true" className="h-px w-6 bg-faint/60" />
        {label}
      </motion.p>
      <div className="lg:col-span-9">
        <SplitText as="h2" inView stagger={0.045} className="max-w-4xl text-h1 font-semibold text-balance">
          {title}
        </SplitText>
        {(children || aside) && (
          <motion.div {...reveal(0.15)} className="mt-5 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            {children && <p className="max-w-2xl text-lead text-muted">{children}</p>}
            {aside}
          </motion.div>
        )}
      </div>
    </div>
  );
}
