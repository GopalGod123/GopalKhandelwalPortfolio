import React from 'react';
import { motion } from 'framer-motion';
import data from './data/data.json';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0, 1] },
};

const Testimonials = () => {
  const testimonials = data.testimonials || [];
  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="section-spacing relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-surface-50/60 via-transparent to-surface-50/70 dark:from-surface-900/28 dark:via-transparent dark:to-surface-900/34" />

      <div className="section-container">
        <motion.div {...fadeUp} className="mb-12">
          <span className="section-label">Testimonials</span>
          <h2 className="mb-6 text-heading-1 text-balance text-surface-900 dark:text-white">
            What people say
          </h2>
          <p className="text-body-lg text-surface-500 dark:text-surface-400 max-w-2xl">
            Feedback from teams and clients I've worked with.
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="premium-card p-6 sm:p-7"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" className="text-accent/25 mb-4 flex-shrink-0">
                <path
                  fill="currentColor"
                  d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"
                />
              </svg>
              <p className="text-body text-surface-600 dark:text-surface-400 leading-relaxed mb-5">
                &ldquo;{t.message}&rdquo;
              </p>
              <div className="border-t border-surface-100 dark:border-surface-800 pt-4">
                <p className="font-semibold text-surface-900 dark:text-white text-sm">{t.name}</p>
                <p className="text-xs text-surface-400 dark:text-surface-500 mt-0.5">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
