import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Lottie from 'react-lottie';
import animationData from '../assets/Lottie/ContactUS.json';
import data from './data/data.json';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0, 1] },
};

const Contact = () => {
  const [showSchedulePopup, setShowSchedulePopup] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const scheduleCallUrl = data.personal?.links?.scheduleCall;

  useEffect(() => {
    document.body.style.overflow = showSchedulePopup ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [showSchedulePopup]);

  const lottieOptions = { loop: true, autoplay: true, animationData, rendererSettings: { preserveAspectRatio: 'xMidYMid slice' } };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = formData;
    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body = encodeURIComponent(`Hi Gopal,\n\n${message}\n\n— ${name}\n${email}`);
    window.location.href = `mailto:${data.personal?.email}?subject=${subject}&body=${body}`;
    setFormData({ name: '', email: '', message: '' });
  };

  const socialLinks = [
    { label: 'Website', href: data.personal?.links?.website, icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
    )},
    { label: 'GitHub', href: data.personal?.links?.github, icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
    )},
    { label: 'LinkedIn', href: data.personal?.links?.linkedin, icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
    )},
    { label: 'LeetCode', href: data.personal?.links?.leetcode, icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M13.483 0a1.374 1.374 0 00-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 00-1.209 2.104 5.35 5.35 0 00-.125.513 5.527 5.527 0 00.062 2.362 5.83 5.83 0 00.349 1.017 5.938 5.938 0 001.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 00-1.951-.003l-2.396 2.392a3.021 3.021 0 01-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 01.066-.523 2.545 2.545 0 01.619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 00-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0013.483 0zm-2.866 12.815a1.38 1.38 0 00-1.38 1.382 1.38 1.38 0 001.38 1.382H20.79a1.38 1.38 0 001.38-1.382 1.38 1.38 0 00-1.38-1.382z"/></svg>
    )},
    { label: 'Resume', href: data.personal?.links?.resume, icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
    )},
  ];

  return (
    <section id="contact" className="section-spacing relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-t from-accent/[0.04] to-transparent rounded-full blur-3xl" />
      </div>

      <div className="section-container">
        <motion.div {...fadeUp} className="text-center mb-20">
          <span className="section-label">Contact</span>
          <h2 className="text-heading-1 text-surface-900 dark:text-white mb-6 text-balance">
            Let's build something together
          </h2>
          <p className="text-body-lg text-surface-500 dark:text-surface-400 max-w-xl mx-auto mb-8">
            Ready to discuss your next project? I'm always excited to collaborate on AI/ML solutions.
          </p>
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-accent/[0.08] dark:bg-accent/[0.12] text-accent text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Available for new projects
          </div>
        </motion.div>

        <motion.div {...fadeUp} className="max-w-4xl mx-auto">
          <div className="premium-card overflow-hidden">
            <div className="grid lg:grid-cols-5">
              {/* Left – illustration & stats */}
              <div className="lg:col-span-2 p-8 lg:p-10 bg-surface-50 dark:bg-surface-800/30
                              border-b lg:border-b-0 lg:border-r border-surface-200 dark:border-surface-800
                              flex flex-col items-center justify-center">
                <Lottie options={lottieOptions} height={160} width={160} />
                <div className="grid grid-cols-2 gap-3 mt-8 w-full">
                  {[
                    { value: '< 24hrs', label: 'Response' },
                    { value: '15+', label: 'Projects' },
                    { value: 'Happy', label: 'Clients' },
                    { value: 'Always', label: 'Coffee' },
                  ].map((s, i) => (
                    <div key={i} className="text-center p-3 rounded-xl bg-white dark:bg-surface-800/50 border border-surface-200/50 dark:border-surface-700/50">
                      <p className="font-bold text-surface-900 dark:text-white text-sm">{s.value}</p>
                      <p className="text-[11px] text-surface-400 dark:text-surface-500 mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right – form & info */}
              <div className="lg:col-span-3 p-8 lg:p-10">
                <form onSubmit={handleSubmit} className="space-y-4 mb-8">
                  <input
                    type="text" placeholder="Your name" required
                    value={formData.name}
                    onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                    className="input-field"
                  />
                  <input
                    type="email" placeholder="Your email" required
                    value={formData.email}
                    onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
                    className="input-field"
                  />
                  <textarea
                    placeholder="Tell me about your project..." rows={4} required
                    value={formData.message}
                    onChange={(e) => setFormData(p => ({ ...p, message: e.target.value }))}
                    className="input-field resize-none"
                  />
                  <button type="submit" className="btn-primary w-full">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                    Send Message
                  </button>
                </form>

                {/* Quick contact */}
                <div className="space-y-3 mb-8">
                  {[
                    { label: 'Email', value: data.personal?.email, href: `mailto:${data.personal?.email}`,
                      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> },
                    { label: 'Phone', value: data.personal?.phone, href: `tel:${data.personal?.phone}`,
                      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg> },
                    { label: 'Location', value: 'India (Remote)',
                      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg> },
                  ].map((item, i) => {
                    const inner = (
                      <div className="flex items-center gap-4 p-4 rounded-xl border border-surface-200/80 dark:border-surface-700/50
                                      hover:border-accent/30 transition-colors group">
                        <span className="text-surface-400 group-hover:text-accent transition-colors">{item.icon}</span>
                        <div>
                          <p className="text-[11px] text-surface-400 dark:text-surface-500">{item.label}</p>
                          <p className="text-caption font-medium text-surface-900 dark:text-white">{item.value}</p>
                        </div>
                      </div>
                    );
                    return item.href ? <a key={i} href={item.href}>{inner}</a> : <div key={i}>{inner}</div>;
                  })}
                </div>

                {/* Schedule + Socials */}
                <div className="flex flex-wrap gap-3 mb-6">
                  <button
                    onClick={() => setShowSchedulePopup(true)}
                    className="btn-secondary flex-1 min-w-[140px]"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
                    Schedule Call
                  </button>
                </div>

                <div className="pt-6 border-t border-surface-100 dark:border-surface-800">
                  <p className="text-overline text-surface-400 dark:text-surface-500 uppercase tracking-[0.15em] mb-3">Connect</p>
                  <div className="flex flex-wrap gap-2">
                    {socialLinks.map((link, i) => (
                      <a key={i} href={link.href} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl
                                   border border-surface-200 dark:border-surface-700
                                   text-surface-600 dark:text-surface-400
                                   hover:border-accent/30 hover:text-accent
                                   text-caption font-medium transition-all duration-200">
                        {link.icon} {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Schedule popup */}
      {showSchedulePopup && scheduleCallUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowSchedulePopup(false)}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-md" />
          <div className="relative w-full max-w-2xl h-[85vh] bg-white dark:bg-surface-950 rounded-3xl border border-surface-200 dark:border-surface-800 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-surface-200 dark:border-surface-800">
              <h3 className="font-semibold text-surface-900 dark:text-white">Schedule a Call</h3>
              <button onClick={() => setShowSchedulePopup(false)}
                className="w-8 h-8 rounded-lg bg-surface-100 dark:bg-surface-800 flex items-center justify-center
                           hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M4 4l8 8M12 4l-8 8" />
                </svg>
              </button>
            </div>
            <iframe src={scheduleCallUrl} title="Schedule" className="w-full h-[calc(100%-56px)] border-0" />
          </div>
        </div>
      )}
    </section>
  );
};

export default Contact;
