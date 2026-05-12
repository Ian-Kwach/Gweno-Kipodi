'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, Bell } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  attendees?: number;
  image?: string;
  category: 'worship' | 'youth' | 'community' | 'education';
}

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Youth Camp 2026',
    date: '2026-07-15',
    time: '08:00 AM',
    location: 'Church Grounds',
    description: 'A week-long youth spiritual retreat with games, worship, and Bible studies.',
    attendees: 120,
    category: 'youth',
  },
  {
    id: '2',
    title: 'Community Service Day',
    date: '2026-06-10',
    time: '09:00 AM',
    location: 'Downtown Kisii',
    description: 'Join us in serving the community through various service projects.',
    attendees: 80,
    category: 'community',
  },
  {
    id: '3',
    title: 'Sabbath Spiritual Retreat',
    date: '2026-05-25',
    time: '10:00 AM',
    location: 'Church Auditorium',
    description: 'A day of deep spiritual reflection and renewal.',
    attendees: 200,
    category: 'worship',
  },
  {
    id: '4',
    title: 'Bible Study Series',
    date: '2026-06-01',
    time: '06:00 PM',
    location: 'Conference Room',
    description: 'Weekly Bible study on the Book of Revelation.',
    attendees: 45,
    category: 'education',
  },
];

export default function EventsPage() {
  const [filterCategory, setFilterCategory] = useState('all');
  const events = mockEvents;

  const filteredEvents = filterCategory === 'all'
    ? events
    : events.filter(e => e.category === filterCategory);

  const upcomingEvents = filteredEvents.sort((a, b) =>
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 pt-20'>
      <div className='max-w-7xl mx-auto px-4 py-12'>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className='text-5xl font-bold text-white mb-2'
        >
          <Calendar className='inline-block mr-4 text-blue-400' size={40} />
          Church Events
        </motion.h1>
        <p className='text-gray-300 mb-8'>Upcoming events and activities</p>

        {/* Filter Buttons */}
        <div className='flex gap-2 mb-8 flex-wrap'>
          {['all', 'worship', 'youth', 'community', 'education'].map(category => (
            <button
              key={category}
              onClick={() => setFilterCategory(category)}
              className={`px-6 py-2 rounded-full font-semibold transition ${
                filterCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Events Timeline */}
        <div className='space-y-6'>
          {upcomingEvents.map((event, idx) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className='bg-gradient-to-br from-blue-900/40 to-purple-900/40 backdrop-blur-md p-8 rounded-xl border border-blue-500/20 hover:border-blue-400/50 transition'
            >
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-6'>
                <div>
                  <h3 className='text-2xl font-bold text-white mb-2'>{event.title}</h3>
                  <div className='inline-block bg-blue-600/30 px-3 py-1 rounded-full text-blue-300 text-sm font-semibold'>
                    {event.category}
                  </div>
                </div>
                <div className='space-y-2 text-gray-300'>
                  <div className='flex items-center gap-2'>
                    <Calendar className='text-blue-400' size={20} />
                    {new Date(event.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>
                  <div className='flex items-center gap-2'>
                    <Clock className='text-blue-400' size={20} />
                    {event.time}
                  </div>
                </div>
                <div className='space-y-2 text-gray-300'>
                  <div className='flex items-center gap-2'>
                    <MapPin className='text-blue-400' size={20} />
                    {event.location}
                  </div>
                  <div className='flex items-center gap-2'>
                    <Users className='text-blue-400' size={20} />
                    {event.attendees} expected attendees
                  </div>
                </div>
              </div>
              <p className='text-gray-300 mb-6'>{event.description}</p>
              <div className='flex gap-4'>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className='flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition'
                >
                  RSVP Now
                </motion.button>
                <button className='bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition'>
                  <Bell size={20} /> Remind Me
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
