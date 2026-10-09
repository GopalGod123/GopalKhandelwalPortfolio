import { useCallback, useState } from 'react';
import { ThemeContext } from './theme';

const readTheme = () => (document.documentElement.classList.contains('light') ? 'light' : 'dark');

// The initial class is set by an inline script in index.html before first paint.
export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(readTheme);

  const setTheme = useCallback((next) => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(next);
    try {
      localStorage.setItem('theme', next);
    } catch {
      // Storage unavailable (private mode) — theme still applies for this visit.
    }
    setThemeState(next);
  }, []);

  const toggleTheme = useCallback(() => setTheme(theme === 'dark' ? 'light' : 'dark'), [theme, setTheme]);

  return <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>{children}</ThemeContext.Provider>;
};
