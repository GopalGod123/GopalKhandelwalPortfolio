import React from 'react';
import { motion } from 'framer-motion';
import data from './data/data.json';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0, 1] },
};

const Experience = () => {
  const experiences = data.experience || [];

  return (
    <section id="experience" className="section-spacing relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-surface-50/60 to-white dark:from-surface-950 dark:via-surface-900/40 dark:to-surface-950" />
      </div>

      <div className="section-container">
        <motion.div {...fadeUp} className="mb-12">
          <span className="section-label">Experience</span>
          <h2 className="text-heading-1 text-surface-900 dark:text-white mb-6 max-w-2xl text-balance">
            Career timeline
          </h2>
          <p className="text-body-lg text-surface-500 dark:text-surface-400 max-w-2xl">
            Building AI/ML solutions and leading impactful engineering projects.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[19px] top-2 bottom-2 w-px bg-surface-200 dark:bg-surface-800 hidden md:block" />

          <div className="space-y-0">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.1 }}
                className="relative group"
              >
                <div className="md:pl-14 py-8 md:py-10 border-b border-surface-100 dark:border-surface-800/50 last:border-0">
                  {/* Timeline dot */}
                  <div className="absolute left-3 top-11 w-[14px] h-[14px] rounded-full border-[3px] border-surface-200 dark:border-surface-700
                                  bg-white dark:bg-surface-950 group-hover:border-accent transition-colors duration-300 hidden md:block z-10" />

                  <div className="flex flex-col lg:flex-row lg:gap-12">
                    <div className="lg:w-60 flex-shrink-0 mb-4 lg:mb-0">
                      <div className="flex items-center gap-3 mb-1.5">
                        <h3 className="font-semibold text-surface-900 dark:text-white">{exp.company}</h3>
                        {exp.type === 'Current' && (
                          <span className="px-2.5 py-0.5 text-[10px] font-semibold rounded-full bg-accent/10 text-accent uppercase tracking-wider">
                            Current
                          </span>
                        )}
                      </div>
                      <p className="text-caption text-surface-400 dark:text-surface-500">{exp.duration}</p>
                      {exp.location && (
                        <p className="text-caption text-surface-400 dark:text-surface-500 mt-0.5">{exp.location}</p>
                      )}
                    </div>

                    <div className="flex-1">
                      <h4 className="text-heading-3 text-surface-900 dark:text-white mb-4">{exp.role}</h4>
                      <ul className="space-y-3">
                        {exp.achievements?.map((a, j) => (
                          <li key={j} className="flex gap-3 text-body text-surface-600 dark:text-surface-400">
                            <svg width="6" height="6" viewBox="0 0 6 6" className="mt-2.5 flex-shrink-0 text-accent">
                              <circle cx="3" cy="3" r="3" fill="currentColor" />
                            </svg>
                            <span>{a.replace(/[🚀🎯⚡🎤🎨🚗👤📊🎮🤖]/g, '').trim()}</span>
                          </li>
                        ))}
                      </ul>

                      {exp.skills?.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-5">
                          {exp.skills.map((s, j) => (
                            <span key={j} className="tag">{s}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
