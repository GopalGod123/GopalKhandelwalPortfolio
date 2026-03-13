import React from 'react';
import { motion } from 'framer-motion';
import data from './data/data.json';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0, 1] },
};

const CodeEditorSVG = () => (
  <svg viewBox="0 0 360 260" fill="none" className="w-full">
    <rect width="360" height="260" rx="16" className="fill-surface-100 dark:fill-surface-800/50" />
    <rect y="0" width="360" height="36" rx="16" className="fill-surface-200/80 dark:fill-surface-700/50" />
    <rect y="20" width="360" height="16" className="fill-surface-200/80 dark:fill-surface-700/50" />
    <circle cx="20" cy="18" r="5" className="fill-red-400/60" />
    <circle cx="36" cy="18" r="5" className="fill-yellow-400/60" />
    <circle cx="52" cy="18" r="5" className="fill-green-400/60" />
    {/* Code lines */}
    <rect x="24" y="52" width="80" height="8" rx="4" className="fill-accent/30" />
    <rect x="24" y="72" width="160" height="8" rx="4" className="fill-surface-300 dark:fill-surface-600" opacity="0.5" />
    <rect x="40" y="92" width="120" height="8" rx="4" className="fill-surface-300 dark:fill-surface-600" opacity="0.4" />
    <rect x="40" y="112" width="180" height="8" rx="4" className="fill-surface-300 dark:fill-surface-600" opacity="0.35" />
    <rect x="40" y="132" width="100" height="8" rx="4" className="fill-accent/20" />
    <rect x="24" y="152" width="60" height="8" rx="4" className="fill-surface-300 dark:fill-surface-600" opacity="0.4" />
    <rect x="24" y="172" width="200" height="8" rx="4" className="fill-surface-300 dark:fill-surface-600" opacity="0.3" />
    <rect x="40" y="192" width="140" height="8" rx="4" className="fill-surface-300 dark:fill-surface-600" opacity="0.35" />
    <rect x="24" y="212" width="80" height="8" rx="4" className="fill-surface-300 dark:fill-surface-600" opacity="0.3" />
    {/* Cursor blink */}
    <motion.rect x="150" y="132" width="2" height="12" rx="1" className="fill-accent"
      animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1.2, repeat: Infinity }} />
  </svg>
);

const About = () => {
  const stats = [
    { value: data.personal?.stats?.experience || '3+ Years', label: 'Experience' },
    { value: '15+', label: 'Projects Built' },
    { value: '25+', label: 'Technologies' },
    { value: '40%', label: 'Engagement ↑' },
  ];

  return (
    <section id="about" className="section-spacing relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-surface-50/50 via-transparent to-surface-50/50 dark:from-surface-900/30 dark:via-transparent dark:to-surface-900/30" />

      <div className="section-container">
        <motion.div {...fadeUp} className="mb-20">
          <span className="section-label">About</span>
          <h2 className="text-heading-1 text-surface-900 dark:text-white mb-6 max-w-3xl text-balance">
            Building intelligent systems that make a difference
          </h2>
          <p className="text-body-lg text-surface-500 dark:text-surface-400 max-w-2xl">
            {data.personal?.description}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          <motion.div {...fadeUp} className="lg:col-span-3 space-y-10">
            {/* Stats grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="premium-card p-5 text-center"
                >
                  <p className="text-2xl font-bold text-surface-900 dark:text-white">{stat.value}</p>
                  <p className="text-xs text-surface-500 dark:text-surface-400 mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Current focus */}
            <div className="premium-card p-8">
              <h3 className="text-heading-3 text-surface-900 dark:text-white mb-5">Current Focus</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {(data.currentFocus || []).map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-body text-surface-600 dark:text-surface-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                    {item.replace(/[🔬🎤🏥⚡📊]/g, '').trim()}
                  </div>
                ))}
              </div>
            </div>

            {/* Contact info */}
            <div className="premium-card p-8">
              <h3 className="text-heading-3 text-surface-900 dark:text-white mb-5">Get in Touch</h3>
              <div className="space-y-4">
                {[
                  { icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  ), text: data.personal?.location },
                  { icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  ), text: data.personal?.email, href: `mailto:${data.personal?.email}` },
                  { icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                  ), text: data.personal?.phone, href: `tel:${data.personal?.phone}` },
                ].map((item, i) => {
                  const content = (
                    <div className="flex items-center gap-4 group">
                      <span className="text-surface-400 dark:text-surface-500 group-hover:text-accent transition-colors">{item.icon}</span>
                      <span className="text-body text-surface-600 dark:text-surface-400 group-hover:text-surface-900 dark:group-hover:text-white transition-colors">{item.text}</span>
                    </div>
                  );
                  return item.href ? <a key={i} href={item.href}>{content}</a> : <div key={i}>{content}</div>;
                })}
              </div>
            </div>
          </motion.div>

          <motion.div
            {...fadeUp}
            className="lg:col-span-2 sticky top-32"
          >
            <div className="premium-card p-6 overflow-hidden">
              <CodeEditorSVG />
            </div>
            <div className="mt-6 flex items-center gap-4 px-2">
              <div className="flex -space-x-2">
                {['#EA580C', '#3B82F6', '#10B981'].map((color, i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-surface-950"
                    style={{ backgroundColor: color, opacity: 0.8 }} />
                ))}
              </div>
              <p className="text-caption text-surface-500 dark:text-surface-400">
                Collaborating across <span className="text-surface-900 dark:text-white font-medium">AI, Web & Mobile</span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
