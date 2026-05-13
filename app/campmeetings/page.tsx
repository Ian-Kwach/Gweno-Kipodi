'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Users, Tent, Star } from 'lucide-react';

interface Campmeeting {
  id: string;
  title: string;
  location: string;
  date: string;
  duration: string;
  theme: string;
  description: string;
  speakers: string[];
  capacity: number;
  registrationOpen: boolean;
}

export default function CampmeetingsPage() {
  const [campmeetings, setCampmeetings] = useState<Campmeeting[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCampmeeting, setSelectedCampmeeting] = useState<Campmeeting | null>(null);

  useEffect(() => {
    const storedCampmeetings = typeof window !== 'undefined' ? window.localStorage.getItem('gwenoCampmeetings') : null;
    if (storedCampmeetings) {
      try {
        setCampmeetings(JSON.parse(storedCampmeetings));
      } catch (error) {
        console.error('Unable to parse stored campmeetings', error);
      }
    }

    async function loadCampmeetings() {
      try {
        const response = await fetch('/api/campmeetings');
        const data = await response.json();
        const fetchedCampmeetings = data?.data || [];
        setCampmeetings(fetchedCampmeetings);
        if (typeof window !== 'undefined') {
          window.localStorage.setItem('gwenoCampmeetings', JSON.stringify(fetchedCampmeetings));
        }
      } catch (error) {
        console.error('Error loading campmeetings:', error);
      } finally {
        setLoading(false);
      }
    }
    loadCampmeetings();
  }, []);

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900'>
      <div className='container mx-auto px-4 py-16'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='text-center mb-12'
        >
          <h1 className='text-4xl md:text-6xl font-bold text-white mb-4'>
            SDA <span className='bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent'>Campmeetings</span>
          </h1>
          <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
            Join us for inspiring gatherings of worship, fellowship, and spiritual growth.
          </p>
        </motion.div>

        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12'>
          {loading ? (
            <div className='col-span-full text-center text-gray-300'>Loading campmeetings...</div>
          ) : campmeetings.length === 0 ? (
            <div className='col-span-full text-center text-gray-300'>No campmeetings available at this time.</div>
          ) : (
            campmeetings.map((campmeeting, index) => (
            <motion.div
              key={campmeeting.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className='bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer'
              onClick={() => setSelectedCampmeeting(campmeeting)}
            >
              <div className='flex items-center mb-4'>
                <Tent className='w-8 h-8 text-blue-400 mr-3' />
                <h3 className='text-xl font-semibold text-white'>{campmeeting.title}</h3>
              </div>

              <div className='space-y-2 text-gray-300'>
                <div className='flex items-center'>
                  <Calendar className='w-4 h-4 mr-2 text-blue-400' />
                  <span>{new Date(campmeeting.date).toLocaleDateString()}</span>
                </div>
                <div className='flex items-center'>
                  <MapPin className='w-4 h-4 mr-2 text-blue-400' />
                  <span>{campmeeting.location}</span>
                </div>
                <div className='flex items-center'>
                  <Clock className='w-4 h-4 mr-2 text-blue-400' />
                  <span>{campmeeting.duration}</span>
                </div>
              </div>

              <div className='mt-4'>
                <span className='inline-block bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm font-medium'>
                  {campmeeting.theme}
                </span>
              </div>

              <div className='mt-4 flex items-center justify-between'>
                <div className='flex items-center text-gray-400'>
                  <Users className='w-4 h-4 mr-1' />
                  <span className='text-sm'>Capacity: {campmeeting.capacity}</span>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  campmeeting.registrationOpen
                    ? 'bg-green-500/20 text-green-300'
                    : 'bg-red-500/20 text-red-300'
                }`}>
                  {campmeeting.registrationOpen ? 'Registration Open' : 'Registration Closed'}
                </div>
              </div>
            </motion.div>
          ))
          )}
        </div>

        {selectedCampmeeting && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className='bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 max-w-4xl mx-auto'
          >
            <div className='flex justify-between items-start mb-6'>
              <div>
                <h2 className='text-3xl font-bold text-white mb-2'>{selectedCampmeeting.title}</h2>
                <p className='text-blue-400 font-medium'>{selectedCampmeeting.theme}</p>
              </div>
              <button
                onClick={() => setSelectedCampmeeting(null)}
                className='text-gray-400 hover:text-white transition'
              >
                ✕
              </button>
            </div>

            <div className='grid md:grid-cols-2 gap-8'>
              <div>
                <div className='space-y-4 mb-6'>
                  <div className='flex items-center text-gray-300'>
                    <Calendar className='w-5 h-5 mr-3 text-blue-400' />
                    <span>{new Date(selectedCampmeeting.date).toLocaleDateString()}</span>
                  </div>
                  <div className='flex items-center text-gray-300'>
                    <MapPin className='w-5 h-5 mr-3 text-blue-400' />
                    <span>{selectedCampmeeting.location}</span>
                  </div>
                  <div className='flex items-center text-gray-300'>
                    <Clock className='w-5 h-5 mr-3 text-blue-400' />
                    <span>{selectedCampmeeting.duration}</span>
                  </div>
                  <div className='flex items-center text-gray-300'>
                    <Users className='w-5 h-5 mr-3 text-blue-400' />
                    <span>Capacity: {selectedCampmeeting.capacity}</span>
                  </div>
                </div>

                <div className='mb-6'>
                  <h3 className='text-xl font-semibold text-white mb-3'>Featured Speakers</h3>
                  <div className='space-y-2'>
                    {selectedCampmeeting.speakers.map((speaker, index) => (
                      <div key={index} className='flex items-center text-gray-300'>
                        <Star className='w-4 h-4 mr-2 text-yellow-400' />
                        <span>{speaker}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedCampmeeting.registrationOpen && (
                  <button className='w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300'>
                    Register Now
                  </button>
                )}
              </div>

              <div>
                <h3 className='text-xl font-semibold text-white mb-4'>About This Campmeeting</h3>
                <p className='text-gray-300 leading-relaxed'>{selectedCampmeeting.description}</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}