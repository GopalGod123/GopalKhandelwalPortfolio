import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import data from './data/data.json';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0, 1] },
};

const categoryGradients = {
  'AI/ML': 'from-violet-500/20 via-purple-500/10 to-pink-500/5',
  'Mobile AI': 'from-blue-500/20 via-cyan-500/10 to-teal-500/5',
  default: 'from-accent/15 via-orange-500/8 to-yellow-500/5',
};

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 12L12 4M12 4H6M12 4v6" />
  </svg>
);

const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
);

const ExternalIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
  </svg>
);

const Projects = () => {
  const [selected, setSelected] = useState(null);
  const featured = data.projects?.featured || [];
  const other = data.projects?.other || [];

  const cleanName = (name) => name.replace(/[🤖🎯🚗💬🎤🎮🏛️]/g, '').trim();

  return (
    <section id="projects" className="section-spacing">
      <div className="section-container">
        <motion.div {...fadeUp} className="mb-12">
          <span className="section-label">Projects</span>
          <h2 className="text-heading-1 text-surface-900 dark:text-white mb-6 max-w-2xl text-balance">
            Selected work
          </h2>
          <p className="text-body-lg text-surface-500 dark:text-surface-400 max-w-2xl">
            AI/ML solutions and full-stack applications built with measurable impact.
          </p>
        </motion.div>

        {/* Featured projects */}
        <div className="grid md:grid-cols-2 gap-6">
          {featured.map((project, i) => {
            const grad = categoryGradients[project.category] || categoryGradients.default;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.08 }}
                onClick={() => setSelected(project)}
                className="group premium-card overflow-hidden cursor-pointer hover:border-accent/20"
              >
                {/* Preview area */}
                <div className={`aspect-[16/10] bg-gradient-to-br ${grad} dark:from-surface-800 dark:to-surface-800/50
                                 flex items-center justify-center relative overflow-hidden`}>
                  {project.image ? (
                    <>
                      <img
                        src={project.image}
                        alt=""
                        role="presentation"
                        className="absolute inset-0 w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-surface-950/80 via-surface-950/25 to-surface-950/40 dark:from-surface-950/90 dark:via-surface-950/30" />
                    </>
                  ) : (
                    <div className="absolute inset-0 opacity-30 dark:opacity-20"
                      style={{ backgroundImage: 'radial-gradient(circle at 20% 80%, currentColor 1px, transparent 1px), radial-gradient(circle at 80% 20%, currentColor 1px, transparent 1px)', backgroundSize: '30px 30px' }}
                    />
                  )}
                  <div className="relative z-10 flex flex-col items-center gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-white/80 dark:bg-surface-900/80 shadow-soft flex items-center justify-center backdrop-blur-sm">
                      <span className="text-2xl font-bold text-surface-700 dark:text-surface-300">{cleanName(project.name).charAt(0)}</span>
                    </div>
                    <span className="text-xs font-medium text-white/95 bg-surface-900/50 dark:bg-surface-950/60 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10">
                      {project.category}
                    </span>
                  </div>
                  {/* Hover arrow */}
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-white/60 dark:bg-surface-800/60 backdrop-blur-sm
                                  flex items-center justify-center opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0
                                  transition-all duration-300 text-surface-600 dark:text-surface-300">
                    <ArrowIcon />
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-heading-3 text-surface-900 dark:text-white mb-1.5
                                 group-hover:text-accent transition-colors duration-300">
                    {cleanName(project.name)}
                  </h3>
                  <p className="text-caption font-medium text-accent mb-3">{project.tagline}</p>
                  <p className="text-caption text-surface-500 dark:text-surface-400 mb-4 line-clamp-2 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies?.slice(0, 4).map((t, j) => (
                      <span key={j} className="tag !text-[11px] !py-1 !px-2.5">{t}</span>
                    ))}
                    {project.technologies?.length > 4 && (
                      <span className="tag !text-[11px] !py-1 !px-2.5">+{project.technologies.length - 4}</span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Other projects */}
        {other.length > 0 && (
          <motion.div {...fadeUp} className="mt-16">
            <h3 className="text-heading-3 text-surface-900 dark:text-white mb-6">More projects</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {other.map((project, i) => {
                const Wrapper = project.link ? 'a' : 'div';
                const linkProps = project.link ? { href: project.link, target: '_blank', rel: 'noopener noreferrer' } : {};
                return (
                  <Wrapper
                    key={i}
                    {...linkProps}
                    className="group premium-card p-6 hover:border-accent/20"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-medium text-surface-900 dark:text-white group-hover:text-accent transition-colors">
                        {cleanName(project.name)}
                      </h4>
                      {project.link ? (
                        <span className="text-surface-400 group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all">
                          <ArrowIcon />
                        </span>
                      ) : (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-surface-300 dark:text-surface-600 flex-shrink-0">
                          <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
                        </svg>
                      )}
                    </div>
                    <p className="text-caption text-surface-500 dark:text-surface-400 line-clamp-2">{project.description}</p>
                  </Wrapper>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 10 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0, 1] }}
              className="relative max-w-2xl w-full max-h-[85vh] overflow-y-auto
                         bg-white dark:bg-surface-900 rounded-3xl border border-surface-200 dark:border-surface-700
                         shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-5 right-5 w-9 h-9 rounded-xl bg-surface-100 dark:bg-surface-800
                           flex items-center justify-center hover:bg-surface-200 dark:hover:bg-surface-700
                           transition-colors z-10"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M4 4l8 8M12 4l-8 8" />
                </svg>
              </button>

              <div className="p-8 md:p-10">
                {selected.image && (
                  <div className="mb-8 -mx-2 md:-mx-4 rounded-2xl overflow-hidden border border-surface-200 dark:border-surface-700 aspect-[21/9] max-h-48">
                    <img
                      src={selected.image}
                      alt={`${cleanName(selected.name)} preview`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                )}
                <span className="tag mb-4 inline-block">{selected.category}</span>
                <h3 className="text-heading-2 text-surface-900 dark:text-white mb-2">
                  {cleanName(selected.name)}
                </h3>
                <p className="text-body font-medium text-accent mb-6">{selected.tagline}</p>
                <p className="text-body text-surface-600 dark:text-surface-400 leading-relaxed mb-8">
                  {selected.fullDescription || selected.description}
                </p>

                {selected.features?.length > 0 && (
                  <div className="mb-8">
                    <h4 className="text-heading-3 text-surface-900 dark:text-white mb-4">Key Features</h4>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {selected.features.map((f, i) => (
                        <div key={i} className="flex items-start gap-3 text-caption text-surface-600 dark:text-surface-400">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-0.5 flex-shrink-0 text-accent">
                            <path d="M13.3 4.3L6 11.6 2.7 8.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          {f}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-2 mb-8">
                  {selected.technologies?.map((t, i) => (
                    <span key={i} className="tag">{t}</span>
                  ))}
                </div>

                <div className="flex gap-3 pt-6 border-t border-surface-100 dark:border-surface-800">
                  {selected.link ? (
                    <a href={selected.link} target="_blank" rel="noopener noreferrer" className="btn-primary !rounded-xl">
                      <GithubIcon /> View Code
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-surface-100 dark:bg-surface-800 text-surface-400 dark:text-surface-500 text-caption font-medium cursor-default">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
                      Private Repository
                    </span>
                  )}
                  {selected.liveDemo && (
                    <a href={selected.liveDemo} target="_blank" rel="noopener noreferrer" className="btn-secondary !rounded-xl">
                      <ExternalIcon /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
