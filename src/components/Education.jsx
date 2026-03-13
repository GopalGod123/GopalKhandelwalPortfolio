import React from 'react';
import { motion } from 'framer-motion';
import data from './data/data.json';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0, 1] },
};

const Education = () => {
  const education = data.education || [];
  const certifications = data.certifications || [];

  return (
    <section id="education" className="section-spacing relative">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-surface-50/80 to-white dark:from-surface-900/50 dark:to-surface-950" />

      <div className="section-container">
        <motion.div {...fadeUp} className="mb-20">
          <span className="section-label">Education</span>
          <h2 className="text-heading-1 text-surface-900 dark:text-white mb-6 max-w-2xl text-balance">
            Education & certifications
          </h2>
          <p className="text-body-lg text-surface-500 dark:text-surface-400 max-w-2xl">
            Academic foundation and professional certifications.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Academic */}
          <motion.div {...fadeUp} className="lg:col-span-3 space-y-6">
            <span className="text-overline uppercase tracking-[0.15em] text-surface-400 dark:text-surface-500 block">
              Academic
            </span>
            {education.map((edu, i) => (
              <div key={i} className="premium-card p-8">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-xl bg-accent/[0.08] dark:bg-accent/[0.12] flex items-center justify-center flex-shrink-0">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-surface-900 dark:text-white text-lg">{edu.institution}</h4>
                    <p className="text-accent font-medium mt-1">{edu.degree}</p>
                    <div className="flex flex-wrap gap-4 mt-3 text-caption text-surface-400 dark:text-surface-500">
                      <span className="flex items-center gap-1.5">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                        {edu.duration}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
                        {edu.grade}
                      </span>
                    </div>
                    {edu.achievements?.length > 0 && (
                      <ul className="mt-5 space-y-2">
                        {edu.achievements.map((a, j) => (
                          <li key={j} className="flex gap-3 text-caption text-surface-500 dark:text-surface-400">
                            <svg width="6" height="6" viewBox="0 0 6 6" className="mt-2 flex-shrink-0 text-accent">
                              <circle cx="3" cy="3" r="3" fill="currentColor" />
                            </svg>
                            {a}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Certifications */}
          <motion.div {...fadeUp} className="lg:col-span-2 space-y-6">
            <span className="text-overline uppercase tracking-[0.15em] text-surface-400 dark:text-surface-500 block">
              Certifications
            </span>
            <div className="space-y-3">
              {certifications.map((cert, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="premium-card p-5 hover:border-accent/20"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-lg bg-surface-100 dark:bg-surface-800 flex items-center justify-center flex-shrink-0">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent">
                        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" strokeLinecap="round" />
                        <polyline points="22 4 12 14.01 9 11.01" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-surface-900 dark:text-white text-caption">{cert.name}</h4>
                      <p className="text-xs text-surface-400 dark:text-surface-500 mt-1">{cert.issuer} · {cert.year}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Education;
