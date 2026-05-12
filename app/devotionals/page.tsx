'use client';

import { motion } from 'framer-motion';
import { BookOpen, Sparkles, Heart } from 'lucide-react';

const devotionals = [
  { title: 'Sabbath Rest', author: 'Pastor John', date: 'May 10, 2026', excerpt: 'A restful heart welcomes God’s peace and presence in the Sabbath.' },
  { title: 'Hope in Trial', author: 'Sister Mary', date: 'May 9, 2026', excerpt: 'God’s love carries us through every season of challenge and change.' },
  { title: 'Living Faith', author: 'Pastor Maria', date: 'May 8, 2026', excerpt: 'Trusting God in obedience brings fruit and joy to our daily walk.' },
];

export default function DevotionalsPage() {
  return (
    <div className='min-h-screen bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.14),transparent_40%),linear-gradient(180deg,#020617_0%,#0f172a_100%)] pt-24 text-slate-100'>
      <div className='mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8'>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className='max-w-3xl'>
          <p className='text-sm uppercase tracking-[0.3em] text-blue-400'>Daily Devotionals</p>
          <h1 className='mt-4 text-4xl font-bold text-white sm:text-5xl'>Reflect, pray, and grow each day.</h1>
          <p className='mt-6 text-slate-300'>Nourish your spirit with short devotionals, scripture reflections, and practical encouragement for the week.</p>
        </motion.div>

        <div className='mt-12 grid gap-6 xl:grid-cols-[1.4fr_0.6fr]'>
          <div className='space-y-6'>
            {devotionals.map((item, idx) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                className='rounded-[2rem] border border-slate-800/80 bg-slate-950/80 p-8 shadow-xl shadow-blue-500/10'
              >
                <div className='flex items-center gap-3'>
                  <div className='rounded-3xl bg-blue-600/15 p-3 text-blue-300'>
                    <BookOpen size={24} />
                  </div>
                  <div>
                    <p className='text-sm uppercase tracking-[0.25em] text-blue-400'>{item.date}</p>
                    <h2 className='mt-2 text-2xl font-semibold text-white'>{item.title}</h2>
                  </div>
                </div>
                <p className='mt-6 text-slate-300'>{item.excerpt}</p>
                <div className='mt-6 flex flex-wrap gap-3 text-sm text-slate-400'>
                  <span className='rounded-full bg-slate-900/70 px-3 py-2'>Author: {item.author}</span>
                  <span className='rounded-full bg-slate-900/70 px-3 py-2'>Bible Reading</span>
                </div>
              </motion.article>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className='space-y-6'>
            <div className='rounded-[2rem] border border-slate-800/80 bg-slate-950/80 p-8 shadow-xl shadow-blue-500/10'>
              <div className='flex items-center gap-3'>
                <Sparkles size={28} className='text-blue-400' />
                <div>
                  <p className='text-sm uppercase tracking-[0.3em] text-blue-400'>Weekly Theme</p>
                  <h2 className='mt-2 text-2xl font-semibold text-white'>Walking by Faith</h2>
                </div>
              </div>
              <p className='mt-6 text-slate-300'>Join our weekly devotional series focusing on faith, prayer, and practical discipleship for church life.</p>
            </div>

            <div className='rounded-[2rem] border border-slate-800/80 bg-slate-950/80 p-8 shadow-xl shadow-blue-500/10'>
              <div className='flex items-center gap-3'>
                <Heart size={28} className='text-pink-400' />
                <div>
                  <p className='text-sm uppercase tracking-[0.3em] text-pink-300'>Daily Verse</p>
                  <h2 className='mt-2 text-2xl font-semibold text-white'>Psalm 119:105</h2>
                </div>
              </div>
              <p className='mt-6 text-slate-300'>&quot;Your word is a lamp to my feet and a light to my path.&quot; Receive strength for today&apos;s journey.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
