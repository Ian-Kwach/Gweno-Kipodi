'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Play, Calendar, Music, Heart, Gift } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: Play,
      title: 'Watch Sermons',
      description: 'Access our latest sermon videos',
      href: '/sermons'
    },
    {
      icon: Music,
      title: 'SDA Hymns',
      description: 'Beautiful hymns in multiple languages',
      href: '/hymns'
    },
    {
      icon: Calendar,
      title: 'Events',
      description: 'Upcoming church events and programs',
      href: '/events'
    },
    {
      icon: Heart,
      title: 'Prayer Requests',
      description: 'Submit your prayer needs',
      href: '/prayers'
    },
    {
      icon: Gift,
      title: 'Give Online',
      description: 'Support our ministry',
      href: '/giving'
    },
    {
      icon: Heart,
      title: 'Prayer Requests',
      description: 'Submit your prayer needs',
      href: '/prayers'
    },
  ];

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900'>
      <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16'>
          <div className='text-2xl font-bold text-white'>
            <span className='text-blue-400'>Gweno</span> Kipodi
          </div>
          <div className='hidden md:flex space-x-8'>
            <Link href='/' className='text-gray-200 hover:text-blue-400 transition'>Home</Link>
            <Link href='/sermons' className='text-gray-200 hover:text-blue-400 transition'>Sermons</Link>
            <Link href='/hymns' className='text-gray-200 hover:text-blue-400 transition'>Hymns</Link>
            <Link href='/events' className='text-gray-200 hover:text-blue-400 transition'>Events</Link>
            <Link href='/admin' className='text-gray-200 hover:text-blue-400 transition'>Admin</Link>
          </div>
        </div>
      </nav>

      <section className='relative h-screen flex items-center justify-center overflow-hidden pt-16'>
        <div className='absolute inset-0'>
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
            className='absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-purple-600/20'
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className='relative z-10 text-center px-4'
        >
          <h1 className='text-5xl md:text-7xl font-bold text-white mb-6'>
            Welcome to <span className='bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent'>Gweno Kipodi SDA Church</span>
          </h1>
          <p className='text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto'>
            A place of worship, community, and spiritual growth.
          </p>

          <div className='flex flex-wrap gap-4 justify-center mb-12'>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href='/sermons' className='bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 inline-block'>
                <Play size={20} /> Watch Sermons
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href='/events' className='bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 inline-block'>
                <Calendar size={20} /> View Events
              </Link>
            </motion.div>
          </div>

          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} className='flex justify-center'>
            <ChevronDown size={32} className='text-blue-400' />
          </motion.div>
        </motion.div>
      </section>

      <section className='py-20 px-4 bg-slate-800/50'>
        <div className='max-w-7xl mx-auto'>
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }} className='text-4xl font-bold text-center text-white mb-16'>
            Our Ministry
          </motion.h2>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className='bg-gradient-to-br from-blue-900/40 to-purple-900/40 backdrop-blur-md p-8 rounded-xl border border-blue-500/20 hover:border-blue-400/50 transition'
              >
                <feature.icon className='w-12 h-12 text-blue-400 mb-4' />
                <h3 className='text-xl font-semibold text-white mb-2'>{feature.title}</h3>
                <p className='text-gray-300 mb-4'>{feature.description}</p>
                <Link href={feature.href} className='inline-block text-blue-400 hover:text-blue-300 font-semibold'>
                  Learn More →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <footer className='bg-slate-900 text-gray-300 py-12 px-4'>
        <div className='max-w-7xl mx-auto text-center text-sm'>
          <p>&copy; 2026 Gweno Kipodi SDA Church. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
