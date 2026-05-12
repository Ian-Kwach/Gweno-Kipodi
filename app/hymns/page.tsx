'use client';

import { useState } from 'react';
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
  audio?: string;
}

const mockHymns: Hymn[] = [
  {
    id: '1',
    number: 1,
    title: 'Jesus, My Savior',
    lyrics: {
      english: 'Jesus, my Savior, help me to understand...',
      kiswahili: 'Yesu, Mkombezi wangu, nisaidie kuelewa...',
      luo: 'Yesu, Jadoktor mara, konyo mar kuonge...',
    },
  },
  {
    id: '2',
    number: 2,
    title: 'Amazing Grace',
    lyrics: {
      english: 'Amazing grace, how sweet the sound...',
      kiswahili: 'Neema ya kushangilia, jinsi ya sauti nyingi...',
      luo: 'Nyanyar mokwongo, mopo paw oyawore...',
    },
  },
  {
    id: '3',
    number: 3,
    title: 'Holy, Holy, Holy',
    lyrics: {
      english: 'Holy, holy, holy is the Lord...',
      kiswahili: 'Mtakatifu, mtakatifu, mtakatifu ni Mungu...',
      luo: 'Maler, Maler, Maler e Nyasaye...',
    },
  },
];

export default function HymnsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [language, setLanguage] = useState('english');
  const [selectedHymn, setSelectedHymn] = useState<Hymn | null>(null);
  const hymns = mockHymns;

  const filteredHymns = hymns.filter(hymn =>
    hymn.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hymn.number.toString().includes(searchTerm)
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
          SDA Hymns Library
        </motion.h1>
        <p className='text-gray-300 mb-8'>Beautiful hymns in Luo, Kiswahili, and English</p>

        {/* Search and Filters */}
        <div className='mb-8 space-y-4'>
          <div className='flex gap-4 flex-wrap'>
            <div className='flex-1 min-w-xs'>
              <div className='relative'>
                <Search className='absolute left-3 top-3 text-gray-400' size={20} />
                <input
                  type='text'
                  placeholder='Search by hymn number or title...'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className='w-full pl-10 pr-4 py-3 bg-slate-800 border border-blue-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400'
                />
              </div>
            </div>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className='px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 cursor-pointer'
            >
              <option value='english'>English</option>
              <option value='kiswahili'>Kiswahili</option>
              <option value='luo'>Luo</option>
            </select>
          </div>
        </div>

        {/* Hymns Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {filteredHymns.map((hymn, idx) => (
            <motion.div
              key={hymn.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
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

        {/* Hymn Detail Modal */}
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

              {/* Lyrics Tabs */}
              <div className='mb-6'>
                <div className='flex gap-2 mb-4 border-b border-slate-700'>
                  {(['english', 'kiswahili', 'luo'] as const).map(lang => (
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
                  {selectedHymn.lyrics[language as keyof typeof selectedHymn.lyrics]}
                </div>
              </div>

              {/* Action Buttons */}
              <div className='flex gap-4'>
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
