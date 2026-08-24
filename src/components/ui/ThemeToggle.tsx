import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const initialTheme = (document.documentElement.getAttribute('data-theme') as 'dark' | 'light') ||
      (localStorage.getItem('theme') as 'dark' | 'light') ||
      'dark';
    setTheme(initialTheme);
    document.documentElement.setAttribute('data-theme', initialTheme);

    const onThemeChanged = (e: Event) => {
      const customEvent = e as CustomEvent<{ theme: 'dark' | 'light' }>;
      if (customEvent.detail?.theme) {
        setTheme(customEvent.detail.theme);
      } else {
        const current = (document.documentElement.getAttribute('data-theme') as 'dark' | 'light') || 'dark';
        setTheme(current);
      }
    };

    window.addEventListener('theme-change', onThemeChanged);
    return () => window.removeEventListener('theme-change', onThemeChanged);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    window.dispatchEvent(new CustomEvent('theme-change', { detail: { theme: nextTheme } }));
  };

  if (!mounted) {
    return (
      <button className="p-2.5 rounded-full bg-white/5 border border-white/10 text-slate-400" aria-label="Toggle theme">
        <Moon className="w-4 h-4" />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors duration-200"
      aria-label="Toggle theme"
      title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
    </button>
  );
};
