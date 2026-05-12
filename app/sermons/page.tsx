'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Calendar, Clock, User, Share2, ThumbsUp } from 'lucide-react';

interface Sermon {
  id: string;
  title: string;
  speaker: string;
  date: string;
  duration: number;
  topic: string;
  videoUrl?: string;
  thumbnail?: string;
  description: string;
}

const mockSermons: Sermon[] = [
  {
    id: '1',
    title: 'The Power of Faith',
    speaker: 'Pastor John',
    date: '2026-05-10',
    duration: 45,
    topic: 'faith',
    description: 'A powerful message about having faith in God...',
  },
  {
    id: '2',
    title: 'Love One Another',
    speaker: 'Pastor Maria',
    date: '2026-05-03',
    duration: 38,
    topic: 'community',
    description: 'How to show love and compassion to each other...',
  },
  {
    id: '3',
    title: 'Sabbath Rest',
    speaker: 'Pastor David',
    date: '2026-04-26',
    duration: 52,
    topic: 'sabbath',
    description: 'Understanding the true meaning of Sabbath rest...',
  },
];

export default function SermonsPage() {
  const [selectedSermon, setSelectedSermon] = useState<Sermon | null>(null);
  const [filterTopic, setFilterTopic] = useState('all');
  const sermons = mockSermons;

  const filteredSermons = filterTopic === 'all'
    ? sermons
    : sermons.filter(s => s.topic === filterTopic);

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 pt-20'>
      <div className='max-w-7xl mx-auto px-4 py-12'>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className='text-5xl font-bold text-white mb-2'
        >
          <Play className='inline-block mr-4 text-blue-400' size={40} />
          Sermons & Messages
        </motion.h1>
        <p className='text-gray-300 mb-8'>Watch powerful messages from our church leaders</p>

        {/* Filter Buttons */}
        <div className='flex gap-2 mb-8 flex-wrap'>
          {['all', 'faith', 'community', 'sabbath'].map(topic => (
            <button
              key={topic}
              onClick={() => setFilterTopic(topic)}
              className={`px-6 py-2 rounded-full font-semibold transition ${
                filterTopic === topic
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
              }`}
            >
              {topic.charAt(0).toUpperCase() + topic.slice(1)}
            </button>
          ))}
        </div>

        {/* Sermons Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {filteredSermons.map((sermon, idx) => (
            <motion.div
              key={sermon.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className='bg-gradient-to-br from-blue-900/40 to-purple-900/40 backdrop-blur-md rounded-xl border border-blue-500/20 overflow-hidden hover:border-blue-400/50 transition group cursor-pointer'
              onClick={() => setSelectedSermon(sermon)}
            >
              <div className='bg-slate-800 h-40 flex items-center justify-center group-hover:bg-slate-700 transition relative'>
                <Play className='text-blue-400 group-hover:scale-125 transition' size={48} />
                <div className='absolute bottom-2 right-2 bg-black/50 px-2 py-1 rounded text-xs text-white'>
                  {sermon.duration}m
                </div>
              </div>
              <div className='p-6'>
                <h3 className='text-xl font-semibold text-white mb-2'>{sermon.title}</h3>
                <div className='space-y-2 text-sm text-gray-300 mb-4'>
                  <div className='flex items-center gap-2'>
                    <User size={16} className='text-blue-400' />
                    {sermon.speaker}
                  </div>
                  <div className='flex items-center gap-2'>
                    <Calendar size={16} className='text-blue-400' />
                    {new Date(sermon.date).toLocaleDateString()}
                  </div>
                </div>
                <button className='w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition'>
                  Watch Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sermon Detail Modal */}
        {selectedSermon && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50'
            onClick={() => setSelectedSermon(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className='bg-slate-800 rounded-xl overflow-hidden max-w-3xl w-full'
              onClick={(e) => e.stopPropagation()}
            >
              <div className='bg-slate-900 h-96 flex items-center justify-center relative'>
                <Play className='text-blue-400' size={64} />
                <button
                  onClick={() => setSelectedSermon(null)}
                  className='absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full'
                >
                  ✕
                </button>
              </div>
              <div className='p-8'>
                <h2 className='text-3xl font-bold text-white mb-4'>{selectedSermon.title}</h2>
                <div className='grid grid-cols-2 gap-4 mb-6 text-gray-300'>
                  <div className='flex items-center gap-2'>
                    <User className='text-blue-400' size={20} />
                    {selectedSermon.speaker}
                  </div>
                  <div className='flex items-center gap-2'>
                    <Calendar className='text-blue-400' size={20} />
                    {new Date(selectedSermon.date).toLocaleDateString()}
                  </div>
                  <div className='flex items-center gap-2'>
                    <Clock className='text-blue-400' size={20} />
                    {selectedSermon.duration} minutes
                  </div>
                </div>
                <p className='text-gray-300 mb-6'>{selectedSermon.description}</p>
                <div className='flex gap-4'>
                  <button className='flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2'>
                    <Play size={20} /> Watch Full Sermon
                  </button>
                  <button className='bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2'>
                    <Share2 size={20} /> Share
                  </button>
                  <button className='bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2'>
                    <ThumbsUp size={20} /> Like
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
