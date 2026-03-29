import React from 'react';
import { motion } from 'framer-motion';
import data from './data/data.json';

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0, 1] },
  },
};

const Hero = () => {
  const profileImage = '/Gopal.png';
  const subtitle = data.personal?.subtitle?.replace(/[^\x20-\x7E]/g, '').trim() || 'Building the Future with AI';
  const highlights =
    data.personal?.heroHighlights?.length > 0
      ? data.personal.heroHighlights
      : ['LLM Product Engineering', 'Realtime AI Systems', 'Full Stack Delivery'];
  const stats = [
    { value: data.personal?.stats?.experience || '4+ Years', label: 'Experience' },
    { value: data.personal?.stats?.projects || '15+ Projects', label: 'Projects Built' },
    { value: data.personal?.stats?.technologies || '25+ Technologies', label: 'Technologies' },
  ];

  return (
    <section id="hero" className="relative flex min-h-screen items-center overflow-x-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(234,88,12,0.12),transparent_32%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.06),transparent_24%)] dark:bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.05),transparent_24%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.96),rgba(255,247,237,0.88),rgba(255,255,255,0.98))] dark:bg-[linear-gradient(135deg,rgba(10,10,10,0.98),rgba(17,17,17,0.96),rgba(10,10,10,1))]" />
      </div>

      <div
        className="absolute inset-0 -z-10 opacity-[0.035] dark:opacity-[0.06]"
        style={{
          backgroundImage: 'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />

      <div className="section-container w-full min-w-0">
        <div className="grid min-w-0 items-center gap-8 pb-14 pt-20 sm:gap-10 sm:pb-16 sm:pt-24 md:gap-14 md:pb-20 md:pt-32 lg:grid-cols-[minmax(0,1.1fr)_minmax(min(100%,320px),0.9fr)] lg:gap-16">
          <motion.div variants={stagger} initial="hidden" animate="visible" className="min-w-0 max-w-2xl">
            <motion.div variants={fadeUp}>
              <span className="mb-8 inline-flex items-center gap-2 rounded-full bg-accent/[0.08] px-4 py-2 text-xs font-semibold tracking-[0.14em] text-accent dark:bg-accent/[0.12]">
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                Available for AI and full stack roles
              </span>
            </motion.div>

            <motion.p variants={fadeUp} className="mb-5 text-overline uppercase tracking-[0.24em] text-surface-500 dark:text-surface-400">
              {subtitle}
            </motion.p>

            <motion.h1 variants={fadeUp} className="mb-6 max-w-full text-balance text-hero text-surface-900 dark:text-white sm:max-w-[14ch]">
              {data.personal?.name}
            </motion.h1>

            <motion.p variants={fadeUp} className="mb-6 text-heading-3 font-normal text-surface-600 dark:text-surface-300">
              {data.personal?.title}
            </motion.p>

            <motion.p variants={fadeUp} className="mb-8 max-w-xl text-body-lg leading-relaxed text-surface-500 dark:text-surface-400">
              {data.personal?.heroIntro ||
                'I build AI products that feel refined in the interface and dependable in production, with strong experience in LLM workflows, realtime systems, and scalable web delivery.'}
            </motion.p>

            <motion.div variants={fadeUp} className="mb-8 flex flex-wrap gap-2 sm:gap-2.5">
              {highlights.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-surface-200/80 bg-white/80 px-3 py-1.5 text-xs font-medium text-surface-700 backdrop-blur dark:border-surface-700 dark:bg-surface-900/60 dark:text-surface-300 sm:px-4 sm:py-2 sm:text-sm"
                >
                  {item}
                </span>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="flex w-full max-w-md flex-col gap-3 sm:max-w-none sm:flex-row sm:flex-wrap sm:gap-4">
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M2 6l6-4 6 4v7a1 1 0 01-1 1H3a1 1 0 01-1-1V6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                View Projects
              </button>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-secondary"
              >
                Get in Touch
              </button>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-8 grid grid-cols-2 gap-x-4 gap-y-6 border-t border-surface-200/70 pt-6 dark:border-surface-800/70 sm:mt-10 sm:flex sm:flex-wrap sm:gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="min-w-0">
                  <p className="text-xl font-bold text-surface-900 dark:text-white sm:text-2xl">{stat.value}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-surface-400 dark:text-surface-500 sm:text-xs sm:tracking-[0.16em]">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="relative mx-auto w-full min-w-0 max-w-[420px]"
          >
            <div className="relative overflow-hidden rounded-[1.5rem] border border-surface-200/60 shadow-soft-lg dark:border-surface-800/60 sm:rounded-[1.75rem]">
              <div className="relative aspect-[3/4] max-h-[min(70vh,520px)] w-full bg-surface-100 dark:bg-surface-900 sm:max-h-none">
                <img
                  src={profileImage}
                  alt={data.personal?.name}
                  className="h-full w-full max-w-full object-cover object-[34%_center]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-950/90 via-surface-950/20 to-transparent" />
                <div className="absolute left-4 top-4 rounded-full border border-white/30 bg-black/40 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.16em] text-white backdrop-blur-sm">
                  AI / ML Engineer
                </div>
                <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-white/60">Professional Profile</p>
                  <p className="mt-2 text-lg font-semibold leading-snug sm:text-xl">Building practical, polished AI products</p>
                </div>
              </div>

              <div className="grid grid-cols-2 divide-x divide-surface-200/80 bg-white dark:divide-surface-800 dark:bg-surface-900">
                <div className="px-4 py-3">
                  <p className="text-[10px] uppercase tracking-[0.14em] text-surface-400 dark:text-surface-500">Based In</p>
                  <p className="mt-1 text-xs font-semibold text-surface-900 dark:text-white">{data.personal?.location}</p>
                </div>
                <div className="px-4 py-3">
                  <p className="text-[10px] uppercase tracking-[0.14em] text-surface-400 dark:text-surface-500">Working Style</p>
                  <p className="mt-1 text-xs font-semibold text-surface-900 dark:text-white">Remote & product-focused</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 sm:bottom-10 sm:block"
      >
        <button
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          className="flex flex-col items-center gap-2 text-surface-400 transition-colors hover:text-surface-600 dark:hover:text-surface-300"
        >
          <span className="text-overline">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex h-8 w-5 items-start justify-center rounded-full border-2 border-current pt-1.5"
          >
            <div className="h-1.5 w-1 rounded-full bg-current" />
          </motion.div>
        </button>
      </motion.div>
    </section>
  );
};

export default Hero;
