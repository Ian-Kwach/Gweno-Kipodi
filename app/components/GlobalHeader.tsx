'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/sermons', label: 'Sermons' },
  { href: '/hymns', label: 'Hymns' },
  { href: '/events', label: 'Events' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/devotionals', label: 'Devotionals' },
  { href: '/departments', label: 'Departments' },
  { href: '/contact', label: 'Contact' },
];

export default function GlobalHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className='fixed inset-x-0 top-0 z-50 border-b border-slate-800/70 bg-slate-950/90 backdrop-blur-xl'>
      <div className='mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8'>
        <div className='flex items-center gap-3'>
          <div className='flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-500 bg-blue-600 text-white shadow-lg shadow-blue-500/10'>
            GK
          </div>
          <div>
            <p className='text-sm font-semibold uppercase tracking-[0.2em] text-blue-300'>Gweno Kipodi</p>
            <p className='text-xs text-slate-400'>SDA Church | Southern Kenya Lake Field</p>
          </div>
        </div>

        <nav className='hidden items-center gap-6 md:flex'>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className='text-sm font-medium text-slate-200 transition hover:text-blue-300'>
              {item.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>

        <button
          type='button'
          onClick={() => setMobileOpen(!mobileOpen)}
          className='inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900/95 p-2 text-slate-200 transition hover:border-blue-500 hover:text-blue-300 md:hidden'
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {mobileOpen && (
        <div className='border-t border-slate-800/70 bg-slate-950/95 px-4 py-4 md:hidden'>
          <div className='flex flex-col gap-3'>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className='rounded-2xl px-4 py-3 text-sm font-medium text-slate-100 transition hover:bg-slate-800 hover:text-blue-300'
              >
                {item.label}
              </Link>
            ))}
            <ThemeToggle />
          </div>
        </div>
      )}
    </header>
  );
}
