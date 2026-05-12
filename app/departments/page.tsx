'use client';

import { motion } from 'framer-motion';
import { Users, Music, HeartHandshake, Sparkles, BookOpen, ShieldCheck } from 'lucide-react';

const departments = [
  { title: 'Youth Ministry', leader: 'Pastor Maria', focus: 'Empower young believers through discipleship and outreach.', icon: Users },
  { title: 'Women Ministry', leader: 'Sister Jane', focus: 'Encourage spiritual growth, fellowship, and service.', icon: HeartHandshake },
  { title: 'Choir Ministry', leader: 'Elder Peter', focus: 'Lead worship through music and praise.', icon: Music },
  { title: 'Health Ministry', leader: 'Dr. Alex', focus: 'Promote wholeness, wellness, and compassionate care.', icon: ShieldCheck },
  { title: 'Family Life', leader: 'Sister Mary', focus: 'Support strong families through Bible teaching and counseling.', icon: BookOpen },
  { title: 'Personal Ministries', leader: 'Elder James', focus: 'Share hope through evangelism and community service.', icon: Sparkles },
];

export default function DepartmentsPage() {
  return (
    <div className='min-h-screen bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_30%),linear-gradient(180deg,#020617_0%,#0f172a_100%)] pt-24 text-slate-100'>
      <div className='mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8'>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className='max-w-3xl'>
          <p className='text-sm uppercase tracking-[0.3em] text-blue-400'>Church Departments</p>
          <h1 className='mt-4 text-4xl font-bold text-white sm:text-5xl'>Ministries that serve every member.</h1>
          <p className='mt-6 text-slate-300'>Explore the heart of our church through ministries designed to welcome, equip, and mobilize every generation.</p>
        </motion.div>

        <div className='mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3'>
          {departments.map((department, idx) => (
            <motion.div
              key={department.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              className='rounded-[2rem] border border-slate-800/80 bg-slate-950/80 p-8 shadow-xl shadow-blue-500/10 backdrop-blur-xl'
            >
              <div className='inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-blue-600/15 text-blue-300'>
                <department.icon size={28} />
              </div>
              <h2 className='mt-6 text-2xl font-semibold text-white'>{department.title}</h2>
              <p className='mt-3 text-slate-300'>{department.focus}</p>
              <p className='mt-5 text-sm uppercase tracking-[0.2em] text-blue-400'>Led by {department.leader}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
