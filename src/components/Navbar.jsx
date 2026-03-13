import React, { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import data from './data/data.json';

const navItems = [
  { name: 'About', id: 'about' },
  { name: 'Skills', id: 'skills' },
  { name: 'Experience', id: 'experience' },
  { name: 'Projects', id: 'projects' },
  { name: 'Contact', id: 'contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }, [isOpen]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? 'py-3 glass shadow-soft'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="section-container">
          <nav className="flex items-center justify-between">
            <button onClick={() => scrollTo('hero')} className="flex items-center gap-3 group">
              <img src="/unnamed.jpg" alt={data.personal?.name} className="w-9 h-9 rounded-lg object-cover ring-2 ring-surface-200 dark:ring-surface-700 group-hover:ring-accent/50 group-hover:scale-105 transition-all duration-200" />
              <span className="hidden sm:block font-semibold text-surface-900 dark:text-white text-caption">
                {data.personal?.name}
              </span>
            </button>

            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="px-4 py-2 rounded-lg text-caption font-medium
                             text-surface-500 dark:text-surface-400
                             hover:text-surface-900 dark:hover:text-white
                             hover:bg-surface-100 dark:hover:bg-surface-800
                             transition-all duration-200"
                >
                  {item.name}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-xl text-surface-500 hover:text-surface-900 dark:hover:text-white
                           hover:bg-surface-100 dark:hover:bg-surface-800 transition-all duration-200"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
              </button>

              <a
                href={data?.personal?.links?.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex btn-primary !py-2.5 !px-5"
              >
                Resume
              </a>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2.5 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
                aria-label="Menu"
              >
                {isOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-white dark:bg-surface-950 border-l border-surface-200 dark:border-surface-800 p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col gap-2 mt-16">
                {navItems.map((item, i) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => scrollTo(item.id)}
                    className="text-left px-4 py-3.5 rounded-xl text-body font-medium
                               text-surface-600 dark:text-surface-400
                               hover:bg-surface-50 dark:hover:bg-surface-800
                               transition-colors"
                  >
                    {item.name}
                  </motion.button>
                ))}
                <a
                  href={data?.personal?.links?.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary mt-4"
                >
                  Resume
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
