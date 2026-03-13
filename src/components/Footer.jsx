import React from 'react';
import { motion } from 'framer-motion';
import data from './data/data.json';

const Footer = () => {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer className="border-t border-surface-200 dark:border-surface-800">
      <div className="section-container py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/unnamed.jpg" alt={data.personal?.name} className="w-8 h-8 rounded-lg object-cover" />
              <span className="font-semibold text-surface-900 dark:text-white">
                {data.personal?.name}
              </span>
            </div>
            <p className="text-caption text-surface-500 dark:text-surface-400 max-w-xs leading-relaxed">
              AI/ML Engineer & Full Stack Developer building intelligent systems that make a difference.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-overline uppercase tracking-[0.15em] text-surface-400 dark:text-surface-500 mb-4">Navigation</h4>
            <div className="grid grid-cols-2 gap-2">
              {['About', 'Skills', 'Experience', 'Projects', 'Education', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollTo(item.toLowerCase())}
                  className="text-left text-caption text-surface-500 dark:text-surface-400
                             hover:text-surface-900 dark:hover:text-white transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-overline uppercase tracking-[0.15em] text-surface-400 dark:text-surface-500 mb-4">Connect</h4>
            <div className="space-y-2">
              {[
                { name: 'GitHub', href: data.personal?.links?.github },
                { name: 'LinkedIn', href: data.personal?.links?.linkedin },
                { name: 'LeetCode', href: data.personal?.links?.leetcode },
                { name: 'Email', href: `mailto:${data.personal?.email}` },
              ].map((link, i) => (
                <a key={i} href={link.href} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-caption text-surface-500 dark:text-surface-400
                             hover:text-surface-900 dark:hover:text-white transition-colors group">
                  {link.name}
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                    className="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all">
                    <path d="M4 12L12 4M12 4H6M12 4v6" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="pt-8 border-t border-surface-200/50 dark:border-surface-800/50"
        >
          <p className="text-xs text-surface-400 dark:text-surface-500">
            © {new Date().getFullYear()} {data.personal?.name}. Built with care in India.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
