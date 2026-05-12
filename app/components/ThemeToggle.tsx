'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
  const stored = typeof window !== 'undefined' ? window.localStorage.getItem('gweno-theme') : null;
  const [theme, setTheme] = useState<'dark' | 'light'>(stored === 'light' ? 'light' : 'dark');

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  }, [theme]);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    window.localStorage.setItem('gweno-theme', next);
    document.documentElement.classList.toggle('light', next === 'light');
  };

  return (
    <button
      type='button'
      onClick={toggleTheme}
      className='inline-flex items-center justify-center gap-2 rounded-full border border-slate-700 bg-slate-950/80 px-3 py-2 text-sm font-semibold text-slate-100 transition hover:bg-slate-900'
    >
      {theme === 'dark' ? <Sun size={18} className='text-amber-300' /> : <Moon size={18} className='text-slate-200' />}
      <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
    </button>
  );
}
