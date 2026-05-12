'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Send } from 'lucide-react';

export default function PrayerRequestsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    request: '',
    anonymous: false,
    category: 'general',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle submission
    setSubmitted(true);
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        request: '',
        anonymous: false,
        category: 'general',
      });
      setSubmitted(false);
    }, 2000);
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 pt-20'>
      <div className='max-w-4xl mx-auto px-4 py-12'>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className='text-center mb-12'
        >
          <h1 className='text-5xl font-bold text-white mb-2 flex items-center justify-center gap-4'>
            <Heart className='text-red-400' size={40} />
            Prayer Requests
          </h1>
          <p className='text-gray-300'>Share your prayer requests with our church community</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className='bg-gradient-to-br from-blue-900/40 to-purple-900/40 backdrop-blur-md p-8 rounded-xl border border-blue-500/20'
        >
          {submitted ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className='text-center py-12'
            >
              <div className='text-6xl mb-4'>✓</div>
              <h2 className='text-2xl font-bold text-white mb-2'>Thank You!</h2>
              <p className='text-gray-300'>Your prayer request has been submitted. Our prayer team will pray for you.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className='space-y-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <label className='block text-white font-semibold mb-2'>Name</label>
                  <input
                    type='text'
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className='w-full px-4 py-3 bg-slate-800 border border-blue-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400'
                    placeholder='Your name'
                    required={!formData.anonymous}
                  />
                </div>
                <div>
                  <label className='block text-white font-semibold mb-2'>Email</label>
                  <input
                    type='email'
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className='w-full px-4 py-3 bg-slate-800 border border-blue-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400'
                    placeholder='Your email'
                    required={!formData.anonymous}
                  />
                </div>
              </div>

              <div>
                <label className='block text-white font-semibold mb-2'>Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className='w-full px-4 py-3 bg-slate-800 border border-blue-500/30 rounded-lg text-white focus:outline-none focus:border-blue-400'
                >
                  <option value='general'>General Prayer</option>
                  <option value='healing'>Healing</option>
                  <option value='family'>Family</option>
                  <option value='work'>Work/Career</option>
                  <option value='spiritual'>Spiritual Growth</option>
                  <option value='other'>Other</option>
                </select>
              </div>

              <div>
                <label className='block text-white font-semibold mb-2'>Prayer Request</label>
                <textarea
                  value={formData.request}
                  onChange={(e) => setFormData({...formData, request: e.target.value})}
                  className='w-full px-4 py-3 bg-slate-800 border border-blue-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 min-h-40'
                  placeholder='Share your prayer request...'
                  required
                />
              </div>

              <div className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  id='anonymous'
                  checked={formData.anonymous}
                  onChange={(e) => setFormData({...formData, anonymous: e.target.checked})}
                  className='w-5 h-5 rounded bg-slate-800 border-blue-500/30 text-blue-600 focus:ring-2 focus:ring-blue-500'
                />
                <label htmlFor='anonymous' className='text-gray-300'>Submit anonymously</label>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type='submit'
                className='w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition'
              >
                <Send size={20} /> Submit Prayer Request
              </motion.button>
            </form>
          )}
        </motion.div>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className='mt-12 grid grid-cols-1 md:grid-cols-3 gap-6'
        >
          {[
            { title: 'Confidential', description: 'Your requests are kept confidential' },
            { title: 'Prayed For', description: 'Our prayer team will pray for you' },
            { title: 'Supportive', description: 'Community support and encouragement' },
          ].map((item, idx) => (
            <div key={idx} className='text-center p-6 bg-blue-900/30 rounded-lg border border-blue-500/20'>
              <h3 className='text-lg font-semibold text-white mb-2'>{item.title}</h3>
              <p className='text-gray-400'>{item.description}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
