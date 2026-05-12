'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Music, Search, Download, Heart, Share2 } from 'lucide-react';

interface Hymn {
  id: string;
  number: number;
  title: string;
  lyrics: {
    english: string;
    kiswahili: string;
    luo: string;
  };
  sourceUrl?: string;
  imageUrl?: string;
  videoUrl?: string;
}

export default function HymnsPage() {
  const [hymns, setHymns] = useState<Hymn[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [language, setLanguage] = useState<'english' | 'kiswahili' | 'luo'>('luo');
  const [selectedHymn, setSelectedHymn] = useState<Hymn | null>(null);

  useEffect(() => {
    async function loadHymns() {
      try {
        const response = await fetch('/api/hymns');
        const data = await response.json();
        if (data?.data) {
          setHymns(data.data);
        }
      } catch (error) {
        console.error('Error loading hymns:', error);
      }
    }
    loadHymns();
  }, []);

  const filteredHymns = useMemo(
    () => hymns.filter((hymn) =>
      hymn.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hymn.number.toString().includes(searchTerm) ||
      hymn.lyrics.luo.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    [searchTerm, hymns]
  );

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 pt-20'>
      <div className='max-w-7xl mx-auto px-4 py-12'>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className='text-5xl font-bold text-white mb-2'
        >
          <Music className='inline-block mr-4 text-blue-400' size={40} />
          Luo Hymns Library
        </motion.h1>
        <p className='text-gray-300 mb-8'>All songs are available in Luo, with complete lyrics for the SDA hymn collection.</p>

        <div className='mb-8 space-y-4'>
          <div className='flex gap-4 flex-wrap'>
            <div className='flex-1 min-w-xs'>
              <div className='relative'>
                <Search className='absolute left-3 top-3 text-gray-400' size={20} />
                <input
                  type='text'
                  placeholder='Search by number, title, or Luo lyrics...'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className='w-full pl-10 pr-4 py-3 bg-slate-800 border border-blue-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400'
                />
              </div>
            </div>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as 'english' | 'kiswahili' | 'luo')}
              className='px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 cursor-pointer'
            >
              <option value='english'>English</option>
              <option value='kiswahili'>Kiswahili</option>
              <option value='luo'>Luo</option>
            </select>
          </div>
          <p className='text-slate-400'>Showing {filteredHymns.length} of {hymns.length} hymns</p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {filteredHymns.map((hymn, idx) => (
            <motion.div
              key={hymn.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => setSelectedHymn(hymn)}
              className='bg-gradient-to-br from-blue-900/40 to-purple-900/40 backdrop-blur-md p-6 rounded-xl border border-blue-500/20 hover:border-blue-400/50 cursor-pointer transition transform hover:scale-105'
            >
              <div className='flex items-start justify-between mb-4'>
                <div className='text-5xl font-bold text-blue-400'>#{hymn.number}</div>
                <Heart className='text-red-400 hover:fill-red-400 cursor-pointer' size={20} />
              </div>
              <h3 className='text-xl font-semibold text-white mb-4'>{hymn.title}</h3>
              <div className='flex gap-2'>
                <button className='flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition'>
                  View Lyrics
                </button>
                <button className='flex-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition'>
                  Play
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {selectedHymn && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50'
            onClick={() => setSelectedHymn(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className='bg-slate-800 rounded-xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto'
              onClick={(e) => e.stopPropagation()}
            >
              <div className='flex justify-between items-start mb-6'>
                <div>
                  <h2 className='text-3xl font-bold text-white mb-2'>#{selectedHymn.number}</h2>
                  <h3 className='text-2xl text-blue-400'>{selectedHymn.title}</h3>
                </div>
                <button
                  onClick={() => setSelectedHymn(null)}
                  className='text-gray-400 hover:text-white text-2xl'
                >
                  ✕
                </button>
              </div>

              <div className='mb-6'>
                <div className='flex gap-2 mb-4 border-b border-slate-700'>
                  {(['english', 'kiswahili', 'luo'] as const).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setLanguage(lang)}
                      className={`px-4 py-2 font-semibold transition ${
                        language === lang
                          ? 'text-blue-400 border-b-2 border-blue-400'
                          : 'text-gray-400 hover:text-gray-300'
                      }`}
                    >
                      {lang === 'english' ? 'English' : lang === 'kiswahili' ? 'Kiswahili' : 'Luo'}
                    </button>
                  ))}
                </div>
                <div className='bg-slate-900/50 p-6 rounded-lg text-gray-300 whitespace-pre-wrap leading-relaxed'>
                  {selectedHymn.lyrics[language]}
                </div>
              </div>

              {selectedHymn.imageUrl && (
                <div className='mb-6'>
                  <Image
                    src={selectedHymn.imageUrl}
                    alt={`${selectedHymn.title} image`}
                    width={1200}
                    height={700}
                    unoptimized
                    className='w-full rounded-xl border border-slate-700 object-cover max-h-96'
                  />
                </div>
              )}

              {selectedHymn.videoUrl && (
                <div className='mb-6'>
                  <div className='text-slate-300 font-semibold mb-2'>Video</div>
                  <a
                    href={selectedHymn.videoUrl}
                    target='_blank'
                    rel='noreferrer'
                    className='inline-flex items-center gap-2 px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg'
                  >
                    Watch Video
                  </a>
                </div>
              )}

              {selectedHymn.sourceUrl && (
                <p className='text-sm text-slate-400 mb-4'>
                  Source: <a href={selectedHymn.sourceUrl} target='_blank' rel='noreferrer' className='text-blue-400 underline'>SDA Hymn Books Collection</a>
                </p>
              )}

              <div className='flex flex-col gap-4 sm:flex-row'>
                <button className='flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-semibold flex items-center justify-center gap-2'>
                  <Music size={20} /> Play Audio
                </button>
                <button className='flex-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg font-semibold flex items-center justify-center gap-2'>
                  <Download size={20} /> Download PDF
                </button>
                <button className='bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-semibold flex items-center justify-center gap-2'>
                  <Share2 size={20} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
