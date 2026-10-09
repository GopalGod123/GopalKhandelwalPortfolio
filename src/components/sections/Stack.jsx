import { motion } from 'framer-motion';
import { capabilities } from '@/data/portfolio';
import { ease } from '@/lib/motion';
import SectionHeader from '@/components/ui/SectionHeader';

export default function Stack() {
  return (
    <section id="stack" className="py-14 md:py-20">
      <div className="container-site">
        <SectionHeader index="03" label="Capabilities" title={<>A full-stack toolkit, <span className="serif-accent ice-text">centred on AI</span>.</>}>
          Tools grouped by the job they do. I pick whichever fits the product, not the trend.
        </SectionHeader>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((group, index) => (
            <motion.article
              key={group.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease, delay: index * 0.06 }}
              className={`card frost group relative flex flex-col overflow-hidden p-7 transition-colors duration-300 hover:border-accent/60 md:p-8 ${group.span ?? ''} ${index === 0 ? 'md:col-span-2' : ''}`}
            >
              {index === 0 && (
                <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[rgb(var(--aurora-1)/0.18)] blur-3xl" />
              )}
              <span className="font-mono text-xs text-faint">{String(index + 1).padStart(2, '0')}</span>
              <h3 className={`mt-8 font-medium tracking-tight ${index === 0 ? 'text-3xl md:text-4xl' : 'text-2xl'}`}>{group.title}</h3>
              <p className="mt-2 text-muted">{group.body}</p>
              <ul className="mt-auto flex flex-wrap gap-1.5 pt-8">
                {group.tools.map((tool) => <li key={tool} className="chip">{tool}</li>)}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
