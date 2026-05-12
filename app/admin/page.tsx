'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, LogOut, BarChart3, Users, FileText, Music, Calendar as CalendarIcon, Tent } from 'lucide-react';

interface Hymn {
  id?: string;
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

interface Event {
  id?: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  category?: string;
}

interface Campmeeting {
  id?: string;
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

interface User {
  id?: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  status: 'active' | 'inactive';
  createdAt?: Date;
}

interface SiteInfo {
  siteTitle: string;
  homepageHeadline: string;
  homepageSubtext: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
}

const defaultInfo: SiteInfo = {
  siteTitle: 'Gweno Kipodi SDA Church',
  homepageHeadline: 'Welcome to Gweno Kipodi SDA Church',
  homepageSubtext: 'A place of worship, community, and spiritual growth.',
  contactEmail: 'info@gwenokipodichurch.org',
  contactPhone: '+254 700 000 000',
  address: 'Gweno Kipodi SDA Church, Kisii County, Kenya',
};

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('site-info');
  const [siteInfo, setSiteInfo] = useState(defaultInfo);
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Content data
  const [hymns, setHymns] = useState<Hymn[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [campmeetings, setCampmeetings] = useState<Campmeeting[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  // Editing states
  const [editingHymn, setEditingHymn] = useState<Hymn | null>(null);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [editingCampmeeting, setEditingCampmeeting] = useState<Campmeeting | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const menuItems = [
    { id: 'site-info', label: 'Site Info', icon: FileText },
    { id: 'content', label: 'Content', icon: Music },
    { id: 'events', label: 'Events', icon: CalendarIcon },
    { id: 'campmeetings', label: 'Campmeetings', icon: Tent },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'overview', label: 'Overview', icon: BarChart3 },
  ];

  useEffect(() => {
    async function loadData() {
      try {
        // Load site info
        const siteResponse = await fetch('/api/site-info');
        const siteData = await siteResponse.json();
        if (siteData?.data) {
          setSiteInfo({ ...defaultInfo, ...siteData.data });
        }

        // Load hymns
        const hymnsResponse = await fetch('/api/hymns');
        const hymnsData = await hymnsResponse.json();
        if (hymnsData?.data) {
          setHymns(hymnsData.data);
        }

        // Load events
        const eventsResponse = await fetch('/api/events');
        const eventsData = await eventsResponse.json();
        if (eventsData?.data) {
          setEvents(eventsData.data);
        }

        // Load campmeetings
        const campmeetingsResponse = await fetch('/api/campmeetings');
        const campmeetingsData = await campmeetingsResponse.json();
        if (campmeetingsData?.data) {
          setCampmeetings(campmeetingsData.data);
        }

        // Load users
        const usersResponse = await fetch('/api/users');
        const usersData = await usersResponse.json();
        if (usersData?.data) {
          setUsers(usersData.data);
        }
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const handleSave = async () => {
    setStatus('Saving...');
    try {
      const response = await fetch('/api/site-info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(siteInfo),
      });
      const result = await response.json();
      if (result.success) {
        setStatus('Website information updated successfully.');
      } else {
        setStatus('Unable to save site information.');
      }
    } catch (error) {
      console.error(error);
      setStatus('An error occurred while saving.');
    }
  };

  const handleSaveHymn = async (hymn: Hymn) => {
    setStatus('Saving hymn...');
    try {
      const method = hymn.id ? 'PUT' : 'POST';
      const url = hymn.id ? `/api/hymns/${hymn.id}` : '/api/hymns';
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(hymn),
      });
      const result = await response.json();
      if (result.success) {
        setStatus('Hymn saved successfully.');
        setEditingHymn(null);
        // Reload hymns
        const hymnsResponse = await fetch('/api/hymns');
        const hymnsData = await hymnsResponse.json();
        if (hymnsData?.data) {
          setHymns(hymnsData.data);
        }
      } else {
        setStatus('Unable to save hymn.');
      }
    } catch (error) {
      console.error(error);
      setStatus('An error occurred while saving.');
    }
  };

  const handleDeleteHymn = async (id: string) => {
    if (!confirm('Are you sure you want to delete this hymn?')) return;
    setStatus('Deleting hymn...');
    try {
      const response = await fetch(`/api/hymns/${id}`, {
        method: 'DELETE',
      });
      const result = await response.json();
      if (result.success) {
        setStatus('Hymn deleted successfully.');
        setHymns(hymns.filter(h => h.id !== id));
      } else {
        setStatus('Unable to delete hymn.');
      }
    } catch (error) {
      console.error(error);
      setStatus('An error occurred while deleting.');
    }
  };

  const handleSaveEvent = async (event: Event) => {
    setStatus('Saving event...');
    try {
      const method = event.id ? 'PUT' : 'POST';
      const url = event.id ? `/api/events/${event.id}` : '/api/events';
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event),
      });
      const result = await response.json();
      if (result.success) {
        setStatus('Event saved successfully.');
        setEditingEvent(null);
        // Reload events
        const eventsResponse = await fetch('/api/events');
        const eventsData = await eventsResponse.json();
        if (eventsData?.data) {
          setEvents(eventsData.data);
        }
      } else {
        setStatus('Unable to save event.');
      }
    } catch (error) {
      console.error(error);
      setStatus('An error occurred while saving.');
    }
  };

  const handleDeleteEvent = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return;
    setStatus('Deleting event...');
    try {
      const response = await fetch(`/api/events/${id}`, {
        method: 'DELETE',
      });
      const result = await response.json();
      if (result.success) {
        setStatus('Event deleted successfully.');
        setEvents(events.filter(e => e.id !== id));
      } else {
        setStatus('Unable to delete event.');
      }
    } catch (error) {
      console.error(error);
      setStatus('An error occurred while deleting.');
    }
  };

  const handleSaveCampmeeting = async (campmeeting: Campmeeting) => {
    setStatus('Saving campmeeting...');
    try {
      const method = campmeeting.id ? 'PUT' : 'POST';
      const url = campmeeting.id ? `/api/campmeetings/${campmeeting.id}` : '/api/campmeetings';
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(campmeeting),
      });
      const result = await response.json();
      if (result.success) {
        setStatus('Campmeeting saved successfully.');
        setEditingCampmeeting(null);
        // Reload campmeetings
        const campmeetingsResponse = await fetch('/api/campmeetings');
        const campmeetingsData = await campmeetingsResponse.json();
        if (campmeetingsData?.data) {
          setCampmeetings(campmeetingsData.data);
        }
      } else {
        setStatus('Unable to save campmeeting.');
      }
    } catch (error) {
      console.error(error);
      setStatus('An error occurred while saving.');
    }
  };

  const handleDeleteCampmeeting = async (id: string) => {
    if (!confirm('Are you sure you want to delete this campmeeting?')) return;
    setStatus('Deleting campmeeting...');
    try {
      const response = await fetch(`/api/campmeetings/${id}`, {
        method: 'DELETE',
      });
      const result = await response.json();
      if (result.success) {
        setStatus('Campmeeting deleted successfully.');
        setCampmeetings(campmeetings.filter(c => c.id !== id));
      } else {
        setStatus('Unable to delete campmeeting.');
      }
    } catch (error) {
      console.error(error);
      setStatus('An error occurred while deleting.');
    }
  };

  const handleSaveUser = async (user: User) => {
    setStatus('Saving user...');
    try {
      const method = user.id ? 'PUT' : 'POST';
      const url = user.id ? `/api/users/${user.id}` : '/api/users';
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });
      const result = await response.json();
      if (result.success) {
        setStatus('User saved successfully.');
        setEditingUser(null);
        // Reload users
        const usersResponse = await fetch('/api/users');
        const usersData = await usersResponse.json();
        if (usersData?.data) {
          setUsers(usersData.data);
        }
      } else {
        setStatus('Unable to save user.');
      }
    } catch (error) {
      console.error(error);
      setStatus('An error occurred while saving.');
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    setStatus('Deleting user...');
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'DELETE',
      });
      const result = await response.json();
      if (result.success) {
        setStatus('User deleted successfully.');
        setUsers(users.filter(u => u.id !== id));
      } else {
        setStatus('Unable to delete user.');
      }
    } catch (error) {
      console.error(error);
      setStatus('An error occurred while deleting.');
    }
  };

  return (
    <div className='min-h-screen bg-slate-900 flex'>
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-slate-800 border-r border-slate-700 p-4 transition-all duration-300 fixed h-screen left-0 top-0 z-40`}
      >
        <div className='flex items-center justify-between mb-8'>
          <div className={`${!sidebarOpen && 'hidden'} text-xl font-bold text-white`}>
            <span className='text-blue-400'>Admin</span>
          </div>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className='text-gray-400 hover:text-white'>
            <Menu size={24} />
          </button>
        </div>

        <nav className='space-y-2'>
          {menuItems.map(item => (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.05 }}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                activeTab === item.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <item.icon size={20} />
              <span className={`${!sidebarOpen && 'hidden'}`}>{item.label}</span>
            </motion.button>
          ))}
        </nav>

        <motion.button
          whileHover={{ scale: 1.05 }}
          className='absolute bottom-4 left-4 right-4 flex items-center gap-3 px-4 py-3 rounded-lg bg-red-600/20 text-red-400 hover:bg-red-600/30 transition'
        >
          <LogOut size={20} />
          <span className={`${!sidebarOpen && 'hidden'}`}>Logout</span>
        </motion.button>
      </motion.div>

      <div className={`${sidebarOpen ? 'ml-64' : 'ml-20'} flex-1 transition-all duration-300`}>
        <div className='bg-slate-800 border-b border-slate-700 px-8 py-6'>
          <div className='flex justify-between items-center'>
            <h1 className='text-3xl font-bold text-white capitalize'>{activeTab.replace('-', ' ')}</h1>
            <a
              href='/'
              target='_blank'
              className='px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-300'
            >
              View Site
            </a>
          </div>
        </div>

        <div className='p-8'>
          {activeTab === 'site-info' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='space-y-8'>
              <div className='rounded-3xl border border-slate-700 bg-slate-900 p-8'>
                <h2 className='text-2xl font-bold text-white mb-4'>Website Information</h2>
                <p className='text-slate-400 mb-6'>Update the homepage headline, contact details, and church description. Changes are saved to your website backend.</p>

                <div className='grid gap-6'>
                  {loading ? (
                    <div className='text-slate-300'>Loading saved settings...</div>
                  ) : (
                    <>
                      <label className='space-y-2'>
                        <span className='text-sm font-semibold text-slate-200'>Site Title</span>
                        <input
                          value={siteInfo.siteTitle}
                          onChange={(e) => setSiteInfo({ ...siteInfo, siteTitle: e.target.value })}
                          className='w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500'
                        />
                      </label>
                      <label className='space-y-2'>
                        <span className='text-sm font-semibold text-slate-200'>Homepage Headline</span>
                        <input
                          value={siteInfo.homepageHeadline}
                          onChange={(e) => setSiteInfo({ ...siteInfo, homepageHeadline: e.target.value })}
                          className='w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500'
                        />
                      </label>
                      <label className='space-y-2'>
                        <span className='text-sm font-semibold text-slate-200'>Homepage Subtext</span>
                        <textarea
                          value={siteInfo.homepageSubtext}
                          onChange={(e) => setSiteInfo({ ...siteInfo, homepageSubtext: e.target.value })}
                          className='w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500 min-h-[120px]'
                        />
                      </label>
                      <div className='grid gap-6 md:grid-cols-2'>
                        <label className='space-y-2'>
                          <span className='text-sm font-semibold text-slate-200'>Contact Email</span>
                          <input
                            value={siteInfo.contactEmail}
                            onChange={(e) => setSiteInfo({ ...siteInfo, contactEmail: e.target.value })}
                            className='w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500'
                          />
                        </label>
                        <label className='space-y-2'>
                          <span className='text-sm font-semibold text-slate-200'>Contact Phone</span>
                          <input
                            value={siteInfo.contactPhone}
                            onChange={(e) => setSiteInfo({ ...siteInfo, contactPhone: e.target.value })}
                            className='w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500'
                          />
                        </label>
                      </div>
                      <label className='space-y-2'>
                        <span className='text-sm font-semibold text-slate-200'>Address</span>
                        <input
                          value={siteInfo.address}
                          onChange={(e) => setSiteInfo({ ...siteInfo, address: e.target.value })}
                          className='w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500'
                        />
                      </label>
                    </>
                  )}
                </div>

                <div className='mt-8 flex flex-col gap-4 sm:flex-row sm:items-center'>
                  <button
                    onClick={handleSave}
                    className='inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-white font-semibold transition hover:bg-blue-700'
                  >
                    Save Website Information
                  </button>
                  {status && <p className='text-slate-300'>{status}</p>}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'content' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='space-y-8'>
              <div className='rounded-3xl border border-slate-700 bg-slate-900 p-8'>
                <div className='flex justify-between items-center mb-6'>
                  <div>
                    <h2 className='text-2xl font-bold text-white mb-2'>SDA Hymns Management</h2>
                    <p className='text-slate-400'>Manage the church hymn collection with lyrics in multiple languages.</p>
                  </div>
                  <button
                    onClick={() => setEditingHymn({ number: hymns.length + 1, title: '', lyrics: { english: '', kiswahili: '', luo: '' }, sourceUrl: '', imageUrl: '', videoUrl: '' })}
                    className='px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-300'
                  >
                    Add Hymn
                  </button>
                </div>

                <div className='space-y-4'>
                  {hymns.map((hymn) => (
                    <div key={hymn.id} className='flex items-center justify-between p-4 bg-slate-800 rounded-lg'>
                      <div>
                        <h3 className='text-white font-medium'>#{hymn.number} - {hymn.title}</h3>
                        <p className='text-slate-400 text-sm'>Languages: {Object.keys(hymn.lyrics || {}).join(', ')}</p>
                      </div>
                      <div className='flex gap-2'>
                        <button
                          onClick={() => setEditingHymn(hymn)}
                          className='px-3 py-1 bg-yellow-600 hover:bg-yellow-700 text-white rounded text-sm'
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => hymn.id && handleDeleteHymn(hymn.id)}
                          className='px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm'
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {editingHymn && (
                  <div className='mt-8 p-6 bg-slate-800 rounded-lg'>
                    <h3 className='text-xl font-bold text-white mb-4'>
                      {editingHymn.id ? 'Edit Hymn' : 'Add New Hymn'}
                    </h3>
                    <div className='grid gap-4'>
                      <div className='grid grid-cols-2 gap-4'>
                        <label className='space-y-2'>
                          <span className='text-sm font-semibold text-slate-200'>Hymn Number</span>
                          <input
                            type='number'
                            value={editingHymn.number || ''}
                            onChange={(e) => setEditingHymn({ ...editingHymn, number: parseInt(e.target.value) })}
                            className='w-full rounded border border-slate-700 bg-slate-950 px-3 py-2 text-white'
                          />
                        </label>
                        <label className='space-y-2'>
                          <span className='text-sm font-semibold text-slate-200'>Title</span>
                          <input
                            value={editingHymn.title || ''}
                            onChange={(e) => setEditingHymn({ ...editingHymn, title: e.target.value })}
                            className='w-full rounded border border-slate-700 bg-slate-950 px-3 py-2 text-white'
                          />
                        </label>
                      </div>
                      <label className='space-y-2'>
                        <span className='text-sm font-semibold text-slate-200'>English Lyrics</span>
                        <textarea
                          value={editingHymn.lyrics?.english || ''}
                          onChange={(e) => setEditingHymn({
                            ...editingHymn,
                            lyrics: { ...editingHymn.lyrics, english: e.target.value }
                          })}
                          className='w-full rounded border border-slate-700 bg-slate-950 px-3 py-2 text-white min-h-[100px]'
                        />
                      </label>
                      <label className='space-y-2'>
                        <span className='text-sm font-semibold text-slate-200'>Kiswahili Lyrics</span>
                        <textarea
                          value={editingHymn.lyrics?.kiswahili || ''}
                          onChange={(e) => setEditingHymn({
                            ...editingHymn,
                            lyrics: { ...editingHymn.lyrics, kiswahili: e.target.value }
                          })}
                          className='w-full rounded border border-slate-700 bg-slate-950 px-3 py-2 text-white min-h-[100px]'
                        />
                      </label>
                      <label className='space-y-2'>
                        <span className='text-sm font-semibold text-slate-200'>Luo Lyrics</span>
                        <textarea
                          value={editingHymn.lyrics?.luo || ''}
                          onChange={(e) => setEditingHymn({
                            ...editingHymn,
                            lyrics: { ...editingHymn.lyrics, luo: e.target.value }
                          })}
                          className='w-full rounded border border-slate-700 bg-slate-950 px-3 py-2 text-white min-h-[100px]'
                        />
                      </label>
                      <label className='space-y-2'>
                        <span className='text-sm font-semibold text-slate-200'>Source URL (Optional)</span>
                        <input
                          value={editingHymn.sourceUrl || ''}
                          onChange={(e) => setEditingHymn({ ...editingHymn, sourceUrl: e.target.value })}
                          className='w-full rounded border border-slate-700 bg-slate-950 px-3 py-2 text-white'
                          placeholder='https://...'
                        />
                      </label>
                      <label className='space-y-2'>
                        <span className='text-sm font-semibold text-slate-200'>Image URL (Optional)</span>
                        <input
                          value={editingHymn.imageUrl || ''}
                          onChange={(e) => setEditingHymn({ ...editingHymn, imageUrl: e.target.value })}
                          className='w-full rounded border border-slate-700 bg-slate-950 px-3 py-2 text-white'
                          placeholder='https://...'
                        />
                      </label>
                      <label className='space-y-2'>
                        <span className='text-sm font-semibold text-slate-200'>Video URL (Optional)</span>
                        <input
                          value={editingHymn.videoUrl || ''}
                          onChange={(e) => setEditingHymn({ ...editingHymn, videoUrl: e.target.value })}
                          className='w-full rounded border border-slate-700 bg-slate-950 px-3 py-2 text-white'
                          placeholder='https://...'
                        />
                      </label>
                    </div>
                    <div className='flex gap-4 mt-6'>
                      <button
                        onClick={() => handleSaveHymn(editingHymn)}
                        className='px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded'
                      >
                        Save Hymn
                      </button>
                      <button
                        onClick={() => setEditingHymn(null)}
                        className='px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded'
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'events' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='space-y-8'>
              <div className='rounded-3xl border border-slate-700 bg-slate-900 p-8'>
                <div className='flex justify-between items-center mb-6'>
                  <div>
                    <h2 className='text-2xl font-bold text-white mb-2'>Church Events Management</h2>
                    <p className='text-slate-400'>Manage upcoming church events and programs.</p>
                  </div>
                  <button
                    onClick={() => setEditingEvent({ title: '', date: '', time: '', location: '', description: '' })}
                    className='px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-300'
                  >
                    Add Event
                  </button>
                </div>

                <div className='space-y-4'>
                  {events.map((event) => (
                    <div key={event.id} className='flex items-center justify-between p-4 bg-slate-800 rounded-lg'>
                      <div>
                        <h3 className='text-white font-medium'>{event.title}</h3>
                        <p className='text-slate-400 text-sm'>{new Date(event.date).toLocaleDateString()} - {event.location}</p>
                      </div>
                      <div className='flex gap-2'>
                        <button
                          onClick={() => setEditingEvent(event)}
                          className='px-3 py-1 bg-yellow-600 hover:bg-yellow-700 text-white rounded text-sm'
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => event.id && handleDeleteEvent(event.id)}
                          className='px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm'
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {editingEvent && (
                  <div className='mt-8 p-6 bg-slate-800 rounded-lg'>
                    <h3 className='text-xl font-bold text-white mb-4'>
                      {editingEvent.id ? 'Edit Event' : 'Add New Event'}
                    </h3>
                    <div className='grid gap-4'>
                      <label className='space-y-2'>
                        <span className='text-sm font-semibold text-slate-200'>Event Title</span>
                        <input
                          value={editingEvent.title || ''}
                          onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
                          className='w-full rounded border border-slate-700 bg-slate-950 px-3 py-2 text-white'
                        />
                      </label>
                      <div className='grid grid-cols-2 gap-4'>
                        <label className='space-y-2'>
                          <span className='text-sm font-semibold text-slate-200'>Date</span>
                          <input
                            type='date'
                            value={editingEvent.date || ''}
                            onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })}
                            className='w-full rounded border border-slate-700 bg-slate-950 px-3 py-2 text-white'
                          />
                        </label>
                        <label className='space-y-2'>
                          <span className='text-sm font-semibold text-slate-200'>Time</span>
                          <input
                            type='time'
                            value={editingEvent.time || ''}
                            onChange={(e) => setEditingEvent({ ...editingEvent, time: e.target.value })}
                            className='w-full rounded border border-slate-700 bg-slate-950 px-3 py-2 text-white'
                          />
                        </label>
                      </div>
                      <label className='space-y-2'>
                        <span className='text-sm font-semibold text-slate-200'>Location</span>
                        <input
                          value={editingEvent.location || ''}
                          onChange={(e) => setEditingEvent({ ...editingEvent, location: e.target.value })}
                          className='w-full rounded border border-slate-700 bg-slate-950 px-3 py-2 text-white'
                        />
                      </label>
                      <label className='space-y-2'>
                        <span className='text-sm font-semibold text-slate-200'>Description</span>
                        <textarea
                          value={editingEvent.description || ''}
                          onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })}
                          className='w-full rounded border border-slate-700 bg-slate-950 px-3 py-2 text-white min-h-[100px]'
                        />
                      </label>
                    </div>
                    <div className='flex gap-4 mt-6'>
                      <button
                        onClick={() => handleSaveEvent(editingEvent)}
                        className='px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded'
                      >
                        Save Event
                      </button>
                      <button
                        onClick={() => setEditingEvent(null)}
                        className='px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded'
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'campmeetings' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='space-y-8'>
              <div className='rounded-3xl border border-slate-700 bg-slate-900 p-8'>
                <div className='flex justify-between items-center mb-6'>
                  <div>
                    <h2 className='text-2xl font-bold text-white mb-2'>Campmeetings Management</h2>
                    <p className='text-slate-400'>Manage SDA campmeeting events and registration details.</p>
                  </div>
                  <button
                    onClick={() => setEditingCampmeeting({
                      title: '',
                      location: '',
                      date: '',
                      duration: '',
                      theme: '',
                      description: '',
                      speakers: [],
                      capacity: 0,
                      registrationOpen: true
                    })}
                    className='px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-300'
                  >
                    Add Campmeeting
                  </button>
                </div>

                <div className='space-y-4'>
                  {campmeetings.map((campmeeting) => (
                    <div key={campmeeting.id} className='flex items-center justify-between p-4 bg-slate-800 rounded-lg'>
                      <div>
                        <h3 className='text-white font-medium'>{campmeeting.title}</h3>
                        <p className='text-slate-400 text-sm'>{new Date(campmeeting.date).toLocaleDateString()} - {campmeeting.location}</p>
                      </div>
                      <div className='flex gap-2'>
                        <button
                          onClick={() => setEditingCampmeeting(campmeeting)}
                          className='px-3 py-1 bg-yellow-600 hover:bg-yellow-700 text-white rounded text-sm'
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => campmeeting.id && handleDeleteCampmeeting(campmeeting.id)}
                          className='px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm'
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {editingCampmeeting && (
                  <div className='mt-8 p-6 bg-slate-800 rounded-lg'>
                    <h3 className='text-xl font-bold text-white mb-4'>
                      {editingCampmeeting.id ? 'Edit Campmeeting' : 'Add New Campmeeting'}
                    </h3>
                    <div className='grid gap-4'>
                      <label className='space-y-2'>
                        <span className='text-sm font-semibold text-slate-200'>Campmeeting Title</span>
                        <input
                          value={editingCampmeeting.title || ''}
                          onChange={(e) => setEditingCampmeeting({ ...editingCampmeeting, title: e.target.value })}
                          className='w-full rounded border border-slate-700 bg-slate-950 px-3 py-2 text-white'
                        />
                      </label>
                      <div className='grid grid-cols-2 gap-4'>
                        <label className='space-y-2'>
                          <span className='text-sm font-semibold text-slate-200'>Date</span>
                          <input
                            type='date'
                            value={editingCampmeeting.date || ''}
                            onChange={(e) => setEditingCampmeeting({ ...editingCampmeeting, date: e.target.value })}
                            className='w-full rounded border border-slate-700 bg-slate-950 px-3 py-2 text-white'
                          />
                        </label>
                        <label className='space-y-2'>
                          <span className='text-sm font-semibold text-slate-200'>Duration</span>
                          <input
                            value={editingCampmeeting.duration || ''}
                            onChange={(e) => setEditingCampmeeting({ ...editingCampmeeting, duration: e.target.value })}
                            className='w-full rounded border border-slate-700 bg-slate-950 px-3 py-2 text-white'
                            placeholder='e.g., 5 days'
                          />
                        </label>
                      </div>
                      <label className='space-y-2'>
                        <span className='text-sm font-semibold text-slate-200'>Location</span>
                        <input
                          value={editingCampmeeting.location || ''}
                          onChange={(e) => setEditingCampmeeting({ ...editingCampmeeting, location: e.target.value })}
                          className='w-full rounded border border-slate-700 bg-slate-950 px-3 py-2 text-white'
                        />
                      </label>
                      <label className='space-y-2'>
                        <span className='text-sm font-semibold text-slate-200'>Theme</span>
                        <input
                          value={editingCampmeeting.theme || ''}
                          onChange={(e) => setEditingCampmeeting({ ...editingCampmeeting, theme: e.target.value })}
                          className='w-full rounded border border-slate-700 bg-slate-950 px-3 py-2 text-white'
                        />
                      </label>
                      <label className='space-y-2'>
                        <span className='text-sm font-semibold text-slate-200'>Description</span>
                        <textarea
                          value={editingCampmeeting.description || ''}
                          onChange={(e) => setEditingCampmeeting({ ...editingCampmeeting, description: e.target.value })}
                          className='w-full rounded border border-slate-700 bg-slate-950 px-3 py-2 text-white min-h-[100px]'
                        />
                      </label>
                      <label className='space-y-2'>
                        <span className='text-sm font-semibold text-slate-200'>Speakers (comma-separated)</span>
                        <input
                          value={editingCampmeeting.speakers?.join(', ') || ''}
                          onChange={(e) => setEditingCampmeeting({
                            ...editingCampmeeting,
                            speakers: e.target.value.split(',').map(s => s.trim()).filter(s => s)
                          })}
                          className='w-full rounded border border-slate-700 bg-slate-950 px-3 py-2 text-white'
                          placeholder='Pastor John, Elder Mary'
                        />
                      </label>
                      <div className='grid grid-cols-2 gap-4'>
                        <label className='space-y-2'>
                          <span className='text-sm font-semibold text-slate-200'>Capacity</span>
                          <input
                            type='number'
                            value={editingCampmeeting.capacity || ''}
                            onChange={(e) => setEditingCampmeeting({ ...editingCampmeeting, capacity: parseInt(e.target.value) || 0 })}
                            className='w-full rounded border border-slate-700 bg-slate-950 px-3 py-2 text-white'
                          />
                        </label>
                        <label className='space-y-2'>
                          <span className='text-sm font-semibold text-slate-200'>Registration Open</span>
                          <select
                            value={editingCampmeeting.registrationOpen ? 'true' : 'false'}
                            onChange={(e) => setEditingCampmeeting({ ...editingCampmeeting, registrationOpen: e.target.value === 'true' })}
                            className='w-full rounded border border-slate-700 bg-slate-950 px-3 py-2 text-white'
                          >
                            <option value='true'>Yes</option>
                            <option value='false'>No</option>
                          </select>
                        </label>
                      </div>
                    </div>
                    <div className='flex gap-4 mt-6'>
                      <button
                        onClick={() => handleSaveCampmeeting(editingCampmeeting)}
                        className='px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded'
                      >
                        Save Campmeeting
                      </button>
                      <button
                        onClick={() => setEditingCampmeeting(null)}
                        className='px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded'
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'users' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='space-y-8'>
              <div className='rounded-3xl border border-slate-700 bg-slate-900 p-8'>
                <div className='flex justify-between items-center mb-6'>
                  <div>
                    <h2 className='text-2xl font-bold text-white mb-2'>User Management</h2>
                    <p className='text-slate-400'>Manage people who can access and edit the website.</p>
                  </div>
                  <button
                    onClick={() => setEditingUser({ name: '', email: '', role: 'editor', status: 'active' })}
                    className='px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-300'
                  >
                    Add User
                  </button>
                </div>

                <div className='space-y-4'>
                  {users.map((user) => (
                    <div key={user.id} className='flex items-center justify-between p-4 bg-slate-800 rounded-lg'>
                      <div>
                        <h3 className='text-white font-medium'>{user.name}</h3>
                        <p className='text-slate-400 text-sm'>{user.email}</p>
                        <div className='flex gap-2 mt-2'>
                          <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                            user.role === 'admin' ? 'bg-red-500/20 text-red-300' : 
                            user.role === 'editor' ? 'bg-blue-500/20 text-blue-300' :
                            'bg-gray-500/20 text-gray-300'
                          }`}>
                            {user.role.toUpperCase()}
                          </span>
                          <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                            user.status === 'active' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'
                          }`}>
                            {user.status.toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div className='flex gap-2'>
                        <button
                          onClick={() => setEditingUser(user)}
                          className='px-3 py-1 bg-yellow-600 hover:bg-yellow-700 text-white rounded text-sm'
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => user.id && handleDeleteUser(user.id)}
                          className='px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm'
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {editingUser && (
                  <div className='mt-8 p-6 bg-slate-800 rounded-lg'>
                    <h3 className='text-xl font-bold text-white mb-4'>
                      {editingUser.id ? 'Edit User' : 'Add New User'}
                    </h3>
                    <div className='grid gap-4'>
                      <label className='space-y-2'>
                        <span className='text-sm font-semibold text-slate-200'>Full Name</span>
                        <input
                          value={editingUser.name || ''}
                          onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                          className='w-full rounded border border-slate-700 bg-slate-950 px-3 py-2 text-white'
                          placeholder='John Doe'
                        />
                      </label>
                      <label className='space-y-2'>
                        <span className='text-sm font-semibold text-slate-200'>Email</span>
                        <input
                          type='email'
                          value={editingUser.email || ''}
                          onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                          className='w-full rounded border border-slate-700 bg-slate-950 px-3 py-2 text-white'
                          placeholder='john@example.com'
                        />
                      </label>
                      <div className='grid grid-cols-2 gap-4'>
                        <label className='space-y-2'>
                          <span className='text-sm font-semibold text-slate-200'>Role</span>
                          <select
                            value={editingUser.role || 'editor'}
                            onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value as 'admin' | 'editor' | 'viewer' })}
                            className='w-full rounded border border-slate-700 bg-slate-950 px-3 py-2 text-white'
                          >
                            <option value='admin'>Admin</option>
                            <option value='editor'>Editor</option>
                            <option value='viewer'>Viewer</option>
                          </select>
                        </label>
                        <label className='space-y-2'>
                          <span className='text-sm font-semibold text-slate-200'>Status</span>
                          <select
                            value={editingUser.status || 'active'}
                            onChange={(e) => setEditingUser({ ...editingUser, status: e.target.value as 'active' | 'inactive' })}
                            className='w-full rounded border border-slate-700 bg-slate-950 px-3 py-2 text-white'
                          >
                            <option value='active'>Active</option>
                            <option value='inactive'>Inactive</option>
                          </select>
                        </label>
                      </div>
                    </div>
                    <div className='flex gap-4 mt-6'>
                      <button
                        onClick={() => handleSaveUser(editingUser)}
                        className='px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded'
                      >
                        Save User
                      </button>
                      <button
                        onClick={() => setEditingUser(null)}
                        className='px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded'
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'overview' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='rounded-3xl border border-slate-700 bg-slate-900 p-8'>
              <h2 className='text-2xl font-bold text-white'>Dashboard Overview</h2>
              <p className='text-slate-400 mt-4'>Analytics and statistics coming soon.</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
