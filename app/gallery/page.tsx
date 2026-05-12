'use client';

import { motion } from 'framer-motion';
import { Camera, Video, Sparkles, Play } from 'lucide-react';

const collections = [
  { title: 'Weekend Worship', count: 16, category: 'photo', icon: Camera },
  { title: 'Youth Camps', count: 12, category: 'photo', icon: Sparkles },
  { title: 'Choir Moments', count: 8, category: 'video', icon: Video },
  { title: 'Outreach Projects', count: 10, category: 'photo', icon: Play },
];

export default function GalleryPage() {
  return (
    <div className='min-h-screen bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),transparent_35%),linear-gradient(180deg,#020617_0%,#0f172a_100%)] pt-24 text-slate-100'>
      <div className='mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8'>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className='max-w-3xl'>
          <p className='text-sm uppercase tracking-[0.3em] text-blue-400'>Gallery</p>
          <h1 className='mt-4 text-4xl font-bold text-white sm:text-5xl'>Visual stories of our church family.</h1>
          <p className='mt-6 text-slate-300'>Photos and videos from worship, events, missions, and gatherings across Gweno Kipodi SDA Church.</p>
        </motion.div>

        <div className='mt-12 grid gap-6 lg:grid-cols-2'>
          {collections.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              className='group rounded-[2rem] border border-slate-800/80 bg-slate-950/80 p-8 shadow-xl shadow-blue-500/10 transition hover:-translate-y-1'
            >
              <div className='flex items-center justify-between gap-4'>
                <div className='rounded-3xl bg-blue-600/15 p-4 text-blue-300'>
                  <item.icon size={28} />
                </div>
                <div className='rounded-full bg-slate-900/80 px-4 py-2 text-xs uppercase tracking-[0.25em] text-slate-300'>
                  {item.category === 'photo' ? 'Photo Album' : 'Video Album'}
                </div>
              </div>
              <h2 className='mt-8 text-2xl font-semibold text-white'>{item.title}</h2>
              <p className='mt-4 text-slate-300'>Discover {item.count} beautiful moments from church life and ministry.</p>
              <button className='mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500 px-5 py-3 text-sm font-semibold text-white transition hover:brightness-110'>
                View Collection
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
