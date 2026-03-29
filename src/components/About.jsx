import React from 'react';
import { motion } from 'framer-motion';
import data from './data/data.json';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0, 1] },
};

const About = () => {
  const profileImage = '/Gopal.png';
  const stats = [
    { value: data.personal?.stats?.experience || '4+ Years', label: 'Experience' },
    { value: data.personal?.stats?.projects || '15+ Projects', label: 'Projects Built' },
    { value: data.personal?.stats?.technologies || '25+ Technologies', label: 'Technologies' },
    { value: data.personal?.stats?.clients || '4+ Clients', label: 'Clients Served' },
  ];

  const strengths = [
    'Translates product ideas into clear technical execution.',
    'Builds AI experiences that are fast, useful, and production-ready.',
    'Balances architecture, UX detail, and delivery speed.',
  ];

  /** Strip emoji only; keep punctuation like em dashes and readable text */
  const cleanFocus = (item) =>
    item
      .replace(/\p{Extended_Pictographic}/gu, '')
      .replace(/[\uFE0F\u200D]/g, '')
      .replace(/\s+/g, ' ')
      .trim();

  return (
    <section id="about" className="section-spacing relative overflow-x-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-surface-50/60 via-transparent to-surface-50/70 dark:from-surface-900/28 dark:via-transparent dark:to-surface-900/34" />

      <div className="section-container min-w-0">
        <motion.div {...fadeUp} className="mb-12 max-w-3xl min-w-0">
          <span className="section-label">About</span>
          <h2 className="mb-6 text-heading-1 text-balance text-surface-900 dark:text-white">
            Product-minded engineering with strong AI execution
          </h2>
          <p className="text-body-lg text-surface-500 dark:text-surface-400">
            {data.personal?.description}
          </p>
        </motion.div>

        <div className="mb-8 grid grid-cols-1 gap-3 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="premium-card min-w-0 p-4 sm:p-5"
            >
              <p className="text-2xl font-bold text-surface-900 dark:text-white">{stat.value}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.16em] text-surface-400 dark:text-surface-500">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid min-w-0 items-stretch gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(260px,0.85fr)] lg:gap-8 xl:gap-10">
          <motion.div {...fadeUp} className="min-h-0 min-w-0 space-y-6 sm:space-y-8">
            <div className="premium-card p-5 sm:p-8">
              <p className="mb-3 text-overline uppercase tracking-[0.18em] text-accent">Professional Snapshot</p>
              <h3 className="mb-4 text-heading-3 text-surface-900 dark:text-white">Engineering systems that feel sharp in both product and code</h3>
              <p className="mb-6 text-body text-surface-600 dark:text-surface-400">
                My work sits at the intersection of AI capability and practical product delivery. I care about building systems that are technically strong, visually clean, and aligned with real business outcomes.
              </p>
              <div className="grid gap-3">
                {strengths.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl border border-surface-200/70 bg-surface-50 px-4 py-3 dark:border-surface-800 dark:bg-surface-900/70">
                    <span className="mt-2 h-2 w-2 rounded-full bg-accent" />
                    <p className="text-body text-surface-600 dark:text-surface-400">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid min-w-0 gap-6 gap-y-6 md:gap-8 xl:grid-cols-2 xl:items-stretch">
              <div className="premium-card min-w-0 p-5 sm:p-8">
                <h3 className="mb-4 text-heading-3 text-surface-900 dark:text-white">Current Focus</h3>
                <ul className="space-y-3.5">
                  {(data.currentFocus || []).map((item, i) => (
                    <li key={i} className="flex gap-3 text-left text-body leading-relaxed text-surface-600 dark:text-surface-400">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                      <span className="min-w-0">{cleanFocus(item)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="premium-card min-w-0 p-5 sm:p-8">
                <h3 className="mb-4 text-heading-3 text-surface-900 dark:text-white">Get in Touch</h3>
                <p className="mb-4 text-caption text-surface-500 dark:text-surface-500">
                  Email and phone open in your default apps.
                </p>
                <div className="space-y-3">
                  {[
                    {
                      icon: (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
                      ),
                      text: data.personal?.location,
                    },
                    {
                      icon: (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                      ),
                      text: data.personal?.email,
                      href: `mailto:${data.personal?.email}`,
                      breakAll: true,
                    },
                    {
                      icon: (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>
                      ),
                      text: data.personal?.phone,
                      href: `tel:${data.personal?.phone}`,
                    },
                  ].map((item, i) => {
                    const content = (
                      <div className="group flex items-start gap-3 rounded-2xl border border-surface-200/70 bg-surface-50 px-4 py-3 transition-colors hover:border-accent/30 dark:border-surface-800 dark:bg-surface-900/70">
                        <span className="mt-0.5 shrink-0 text-surface-400 transition-colors group-hover:text-accent dark:text-surface-500">{item.icon}</span>
                        <span
                          className={`min-w-0 flex-1 text-body text-surface-600 transition-colors group-hover:text-surface-900 dark:text-surface-400 dark:group-hover:text-white ${item.breakAll ? 'break-all sm:break-words' : 'break-words'}`}
                        >
                          {item.text}
                        </span>
                      </div>
                    );

                    return item.href ? (
                      <a key={i} href={item.href}>
                        {content}
                      </a>
                    ) : (
                      <div key={i}>{content}</div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div {...fadeUp} className="flex min-h-0 min-w-0 lg:h-full lg:min-h-0 lg:flex-col">
            <div className="flex h-full min-h-0 w-full min-w-0 flex-col overflow-hidden rounded-[1.5rem] border border-surface-200/60 shadow-soft dark:border-surface-800/60 sm:rounded-[1.75rem]">
              <div className="relative min-h-[240px] w-full flex-1 bg-surface-100 sm:min-h-[320px] lg:min-h-0">
                <img
                  src={profileImage}
                  alt={data.personal?.name}
                  className="absolute inset-0 h-full w-full max-w-full object-cover object-[34%_22%]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-950/90 via-surface-950/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-white/60">About Gopal</p>
                  <h3 className="mt-2 text-xl font-semibold leading-snug sm:text-2xl">AI/ML Engineer and Full Stack Developer</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/75">
                    Building software where strong engineering, applied AI, and clean UX all move together.
                  </p>
                </div>
              </div>

              <div className="grid shrink-0 gap-px bg-surface-200/80 dark:bg-surface-800">
                <div className="bg-white px-5 py-3.5 dark:bg-surface-900">
                  <p className="text-[10px] uppercase tracking-[0.14em] text-surface-400 dark:text-surface-500">Strength</p>
                  <p className="mt-1 text-xs font-semibold text-surface-900 dark:text-white">LLM integrations, realtime systems, and scalable delivery</p>
                </div>
                <div className="bg-white px-5 py-3.5 dark:bg-surface-900">
                  <p className="text-[10px] uppercase tracking-[0.14em] text-surface-400 dark:text-surface-500">Approach</p>
                  <p className="mt-1 text-xs font-semibold text-surface-900 dark:text-white">Clear architecture, polished UX, production-grade execution</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
