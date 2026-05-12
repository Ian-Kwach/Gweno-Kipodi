'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, LogOut, Plus, Edit, Trash2, BarChart3, Users, FileText, Music, Calendar as CalendarIcon, Gift } from 'lucide-react';

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [showNewPostModal, setShowNewPostModal] = useState(false);

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'posts', label: 'Blog Posts', icon: FileText },
    { id: 'sermons', label: 'Sermons', icon: Music },
    { id: 'events', label: 'Events', icon: CalendarIcon },
    { id: 'giving', label: 'Donations', icon: Gift },
    { id: 'users', label: 'Users', icon: Users },
  ];

  const stats = [
    { label: 'Total Posts', value: '24', icon: FileText },
    { label: 'Total Sermons', value: '156', icon: Music },
    { label: 'Events', value: '12', icon: CalendarIcon },
    { label: 'Users', value: '1,240', icon: Users },
  ];

  return (
    <div className='min-h-screen bg-slate-900 flex'>
      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-slate-800 border-r border-slate-700 p-4 transition-all duration-300 fixed h-screen left-0 top-0 z-40`}
      >
        <div className='flex items-center justify-between mb-8'>
          <div className={`${!sidebarOpen && 'hidden'} text-xl font-bold text-white`}>
            <span className='text-blue-400'>Admin</span>
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className='text-gray-400 hover:text-white'
          >
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

      {/* Main Content */}
      <div className={`${sidebarOpen ? 'ml-64' : 'ml-20'} flex-1 transition-all duration-300`}>
        {/* Top Bar */}
        <div className='bg-slate-800 border-b border-slate-700 px-8 py-6'>
          <div className='flex justify-between items-center'>
            <h1 className='text-3xl font-bold text-white capitalize'>{activeTab}</h1>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowNewPostModal(true)}
              className='flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold'
            >
              <Plus size={20} /> Add New
            </motion.button>
          </div>
        </div>

        {/* Content */}
        <div className='p-8'>
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className='space-y-8'
            >
              <h2 className='text-2xl font-bold text-white'>Dashboard Overview</h2>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                {stats.map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className='bg-slate-800 border border-slate-700 p-6 rounded-lg'
                  >
                    <div className='flex items-center justify-between'>
                      <div>
                        <p className='text-gray-400 text-sm'>{stat.label}</p>
                        <p className='text-3xl font-bold text-white mt-2'>{stat.value}</p>
                      </div>
                      <stat.icon className='text-blue-400' size={32} />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Recent Activity */}
              <div className='bg-slate-800 border border-slate-700 p-6 rounded-lg'>
                <h3 className='text-xl font-bold text-white mb-6'>Recent Activity</h3>
                <div className='space-y-4'>
                  {[1, 2, 3, 4, 5].map((item) => (
                    <div key={item} className='flex items-center justify-between p-4 bg-slate-900 rounded-lg'>
                      <div>
                        <p className='text-white font-semibold'>New sermon uploaded</p>
                        <p className='text-gray-400 text-sm'>2 hours ago</p>
                      </div>
                      <span className='text-green-400'>✓</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'posts' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className='space-y-6'
            >
              <h2 className='text-2xl font-bold text-white'>Blog Posts</h2>
              <div className='bg-slate-800 border border-slate-700 rounded-lg overflow-hidden'>
                <table className='w-full'>
                  <thead className='bg-slate-900 border-b border-slate-700'>
                    <tr>
                      <th className='px-6 py-3 text-left text-white font-semibold'>Title</th>
                      <th className='px-6 py-3 text-left text-white font-semibold'>Author</th>
                      <th className='px-6 py-3 text-left text-white font-semibold'>Date</th>
                      <th className='px-6 py-3 text-left text-white font-semibold'>Actions</th>
                    </tr>
                  </thead>
                  <tbody className='divide-y divide-slate-700'>
                    {['Post 1', 'Post 2', 'Post 3'].map((post) => (
                      <tr key={post} className='hover:bg-slate-900/50'>
                        <td className='px-6 py-4 text-white'>{post}</td>
                        <td className='px-6 py-4 text-gray-400'>Admin</td>
                        <td className='px-6 py-4 text-gray-400'>May 11, 2026</td>
                        <td className='px-6 py-4 flex gap-2'>
                          <button className='text-blue-400 hover:text-blue-300'><Edit size={18} /></button>
                          <button className='text-red-400 hover:text-red-300'><Trash2 size={18} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {activeTab === 'sermons' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className='space-y-6'
            >
              <h2 className='text-2xl font-bold text-white'>Sermons</h2>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {['Sermon 1', 'Sermon 2', 'Sermon 3'].map((sermon) => (
                  <div key={sermon} className='bg-slate-800 border border-slate-700 p-6 rounded-lg'>
                    <div className='bg-slate-900 h-32 rounded-lg mb-4 flex items-center justify-center'>
                      <Music className='text-gray-500' size={48} />
                    </div>
                    <h4 className='text-white font-semibold mb-2'>{sermon}</h4>
                    <p className='text-gray-400 text-sm mb-4'>By Pastor John • May 10</p>
                    <div className='flex gap-2'>
                      <button className='flex-1 text-blue-400 hover:text-blue-300 px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-700 transition'><Edit size={18} /></button>
                      <button className='flex-1 text-red-400 hover:text-red-300 px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-700 transition'><Trash2 size={18} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* New Post Modal */}
      {showNewPostModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className='fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50'
          onClick={() => setShowNewPostModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className='bg-slate-800 rounded-lg p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto'
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className='text-2xl font-bold text-white mb-6'>Create New Post</h2>
            <form className='space-y-6'>
              <div>
                <label className='block text-white font-semibold mb-2'>Title</label>
                <input
                  type='text'
                  className='w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:border-blue-500 outline-none'
                  placeholder='Post title'
                />
              </div>
              <div>
                <label className='block text-white font-semibold mb-2'>Content</label>
                <textarea
                  className='w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:border-blue-500 outline-none min-h-40'
                  placeholder='Post content'
                />
              </div>
              <div className='flex gap-4'>
                <button
                  type='submit'
                  className='flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition'
                >
                  Publish
                </button>
                <button
                  type='button'
                  onClick={() => setShowNewPostModal(false)}
                  className='flex-1 bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg font-semibold transition'
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
