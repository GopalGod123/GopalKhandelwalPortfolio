import React from 'react';
import { motion } from 'framer-motion';
import data from './data/data.json';

const Footer = () => {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  const profileImage = '/Gopal.png';

  return (
    <footer className="border-t border-surface-200 dark:border-surface-800">
      <div className="section-container py-16">
        <div className="mb-12 grid gap-12 md:grid-cols-3">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <img
                src={profileImage}
                alt={data.personal?.name}
                className="h-10 w-10 rounded-xl object-cover object-[35%_center] ring-1 ring-surface-200 dark:ring-surface-800"
              />
              <span className="font-semibold text-surface-900 dark:text-white">
                {data.personal?.name}
              </span>
            </div>
            <p className="max-w-xs text-caption leading-relaxed text-surface-500 dark:text-surface-400">
              AI/ML Engineer and Full Stack Developer building reliable, human-centered software with modern AI systems.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-overline uppercase tracking-[0.15em] text-surface-400 dark:text-surface-500">Navigation</h4>
            <div className="grid grid-cols-2 gap-2">
              {['About', 'Skills', 'Experience', 'Projects', 'Education', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollTo(item.toLowerCase())}
                  className="text-left text-caption text-surface-500 transition-colors hover:text-surface-900 dark:text-surface-400 dark:hover:text-white"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-overline uppercase tracking-[0.15em] text-surface-400 dark:text-surface-500">Connect</h4>
            <div className="space-y-2">
              {[
                { name: 'Website', href: data.personal?.links?.website },
                { name: 'GitHub', href: data.personal?.links?.github },
                { name: 'LinkedIn', href: data.personal?.links?.linkedin },
                { name: 'LeetCode', href: data.personal?.links?.leetcode },
                { name: 'Email', href: `mailto:${data.personal?.email}` },
              ].map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-caption text-surface-500 transition-colors hover:text-surface-900 dark:text-surface-400 dark:hover:text-white"
                >
                  {link.name}
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    className="-translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                  >
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
          className="border-t border-surface-200/50 pt-8 dark:border-surface-800/50"
        >
          <p className="text-xs text-surface-400 dark:text-surface-500">
            Copyright {new Date().getFullYear()} {data.personal?.name}. Built with care in India.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
