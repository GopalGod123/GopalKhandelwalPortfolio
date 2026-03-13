import React from 'react';
import { motion } from 'framer-motion';
import data from './data/data.json';

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0, 1] } },
};

const NeuralSVG = () => (
  <svg viewBox="0 0 400 400" className="w-full h-full" fill="none">
    <defs>
      <linearGradient id="nodeGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.08" />
      </linearGradient>
      <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.15" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.03" />
      </linearGradient>
    </defs>
    {/* Connections */}
    {[
      [80,80,200,160],[80,200,200,160],[80,320,200,240],
      [200,160,320,100],[200,160,320,200],[200,240,320,200],[200,240,320,300],
    ].map(([x1,y1,x2,y2], i) => (
      <motion.line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
        stroke="url(#lineGrad)" strokeWidth="1.5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.8 + i * 0.08 }}
      />
    ))}
    {/* Nodes */}
    {[
      [80,80,8],[80,200,10],[80,320,8],
      [200,160,12],[200,240,12],
      [320,100,8],[320,200,10],[320,300,8],
    ].map(([cx,cy,r], i) => (
      <motion.circle key={`n${i}`} cx={cx} cy={cy} r={r}
        fill="url(#nodeGrad)" stroke="currentColor" strokeWidth="1" strokeOpacity="0.15"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 + i * 0.06 }}
      />
    ))}
    {/* Pulse rings */}
    {[[200,160],[200,240]].map(([cx,cy], i) => (
      <motion.circle key={`p${i}`} cx={cx} cy={cy} r="20"
        fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.1"
        animate={{ r: [20, 40], opacity: [0.2, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay: i * 1.5 }}
      />
    ))}
  </svg>
);

const Hero = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-gradient-to-bl from-accent/[0.04] via-transparent to-transparent blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-accent/[0.03] via-transparent to-transparent blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(234,88,12,0.03),transparent_50%)]" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 -z-10 opacity-[0.015] dark:opacity-[0.03]"
        style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      />

      <div className="section-container w-full">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center pt-28 pb-20 md:pt-36 md:pb-28">
          <motion.div variants={stagger} initial="hidden" animate="visible">
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                               bg-accent/[0.08] dark:bg-accent/[0.12] text-accent text-xs font-semibold tracking-wide mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                Available for opportunities
              </span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-hero text-surface-900 dark:text-white mb-6">
              {data.personal?.name || 'Gopal Khandelwal'}
            </motion.h1>

            <motion.p variants={fadeUp} className="text-heading-3 text-surface-500 dark:text-surface-400 mb-6 font-normal">
              {data.personal?.title}
            </motion.p>

            <motion.p variants={fadeUp} className="text-body-lg text-surface-500 dark:text-surface-400 max-w-xl leading-relaxed mb-10">
              Specializing in LLM integration, real-time AI systems, and scalable web applications.
              Turning complex problems into elegant, intelligent solutions.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 6l6-4 6 4v7a1 1 0 01-1 1H3a1 1 0 01-1-1V6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                View Projects
              </button>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-secondary"
              >
                Get in Touch
              </button>
            </motion.div>

            <motion.div variants={fadeUp} className="flex items-center gap-6 mt-12 pt-8 border-t border-surface-200/60 dark:border-surface-800/60">
              {[
                { value: '3+', label: 'Years Exp.' },
                { value: '15+', label: 'Projects' },
                { value: '25+', label: 'Technologies' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <p className="text-xl font-bold text-surface-900 dark:text-white">{stat.value}</p>
                  <p className="text-xs text-surface-400 dark:text-surface-500 mt-0.5">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden lg:flex items-center justify-center text-surface-300 dark:text-surface-600"
          >
            <div className="w-full max-w-md animate-float">
              <NeuralSVG />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <button
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          className="flex flex-col items-center gap-2 text-surface-400 hover:text-surface-600 dark:hover:text-surface-300 transition-colors"
        >
          <span className="text-overline">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-5 h-8 rounded-full border-2 border-current flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-1.5 rounded-full bg-current" />
          </motion.div>
        </button>
      </motion.div>
    </section>
  );
};

export default Hero;
