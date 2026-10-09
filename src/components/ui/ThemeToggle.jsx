import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const next = theme === 'dark' ? 'light' : 'dark';
  return (
    <button
      onClick={toggleTheme}
      className="grid h-10 w-10 place-items-center rounded-full border border-line text-muted transition-colors hover:border-ink/30 hover:text-ink"
      aria-label={`Switch to ${next} theme`}
    >
      {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
