import { motion } from 'framer-motion';
import { reveal } from '@/lib/motion';

export default function SectionHeader({ index, label, title, children, aside }) {
  return (
    <div className="mb-12 grid gap-6 border-t border-line pt-8 md:mb-16 lg:grid-cols-12 lg:gap-10">
      <motion.p {...reveal()} className="eyebrow lg:col-span-3">
        <span className="eyebrow-index">{index}</span>
        <span aria-hidden="true">/</span>
        {label}
      </motion.p>
      <div className="lg:col-span-9">
        <motion.h2 {...reveal(0.05)} className="max-w-4xl text-h1 font-medium text-balance">
          {title}
        </motion.h2>
        {(children || aside) && (
          <motion.div {...reveal(0.1)} className="mt-5 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            {children && <p className="max-w-2xl text-lead text-muted">{children}</p>}
            {aside}
          </motion.div>
        )}
      </div>
    </div>
  );
}
