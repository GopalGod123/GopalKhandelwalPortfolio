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
  const profileImage = '/Gopal.png';

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
        className={`fixed top-0 z-50 w-full transition-all duration-500 ${
          scrolled ? 'glass py-3 shadow-soft' : 'bg-transparent py-5'
        }`}
      >
        <div className="section-container">
          <nav className="flex items-center justify-between">
            <button onClick={() => scrollTo('hero')} className="group flex items-center gap-3">
              <img
                src={profileImage}
                alt={data.personal?.name}
                className="h-10 w-10 rounded-xl object-cover object-[35%_center] ring-2 ring-surface-200 transition-all duration-200 group-hover:scale-105 group-hover:ring-accent/50 dark:ring-surface-700"
              />
              <span className="hidden text-caption font-semibold text-surface-900 dark:text-white sm:block">
                {data.personal?.name}
              </span>
            </button>

            <div className="hidden items-center gap-1 md:flex">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="rounded-lg px-4 py-2 text-caption font-medium text-surface-500 transition-all duration-200 hover:bg-surface-100 hover:text-surface-900 dark:text-surface-400 dark:hover:bg-surface-800 dark:hover:text-white"
                >
                  {item.name}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="rounded-xl p-2.5 text-surface-500 transition-all duration-200 hover:bg-surface-100 hover:text-surface-900 dark:hover:bg-surface-800 dark:hover:text-white"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
              </button>

              <a
                href={data?.personal?.links?.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary hidden !w-auto !px-5 !py-2.5 sm:inline-flex"
              >
                Resume
              </a>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="rounded-xl p-2.5 transition-colors hover:bg-surface-100 dark:hover:bg-surface-800 md:hidden"
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
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 h-full w-80 max-w-[85vw] border-l border-surface-200 bg-white p-8 dark:border-surface-800 dark:bg-surface-950"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mt-10 rounded-3xl border border-surface-200/80 bg-surface-50 p-4 dark:border-surface-800 dark:bg-surface-900/70">
                <div className="flex items-center gap-3">
                  <img
                    src={profileImage}
                    alt={data.personal?.name}
                    className="h-14 w-14 rounded-2xl object-cover object-[35%_center]"
                  />
                  <div>
                    <p className="font-semibold text-surface-900 dark:text-white">{data.personal?.name}</p>
                    <p className="text-sm text-surface-500 dark:text-surface-400">{data.personal?.title}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-2">
                {navItems.map((item, i) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => scrollTo(item.id)}
                    className="rounded-xl px-4 py-3.5 text-left text-body font-medium text-surface-600 transition-colors hover:bg-surface-50 dark:text-surface-400 dark:hover:bg-surface-800"
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
