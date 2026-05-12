'use client';

import { motion } from 'framer-motion';
import { Gift } from 'lucide-react';

export default function GivingPage() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 pt-20'>
      <div className='max-w-4xl mx-auto px-4 py-12'>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className='text-5xl font-bold text-white mb-4 flex items-center gap-4'
        >
          <Gift className='text-yellow-400' size={40} />
          Online Giving Paused
        </motion.h1>
        <p className='text-gray-300 mb-10'>Thank you for your generosity. Online giving is temporarily disabled while we improve our giving system.</p>

        <div className='rounded-3xl border border-slate-700 bg-slate-950/80 p-10 shadow-xl shadow-blue-500/10'>
          <h2 className='text-3xl font-semibold text-white mb-4'>How to support the church</h2>
          <p className='text-slate-300 mb-6'>For now, please use direct bank transfer or contact our church office for giving instructions. We will restore the online giving feature soon.</p>

          <div className='grid gap-6 md:grid-cols-2'>
            <div className='rounded-3xl border border-slate-800 bg-slate-900 p-6'>
              <h3 className='text-xl font-semibold text-white mb-4'>Bank Transfer</h3>
              <p className='text-slate-400'>Kenya Commercial Bank</p>
              <p className='text-slate-400'>Account Name: Gweno Kipodi SDA Church</p>
              <p className='text-slate-400'>Account Number: 1234567890</p>
              <p className='text-slate-400'>Branch: Kisii</p>
            </div>
            <div className='rounded-3xl border border-slate-800 bg-slate-900 p-6'>
              <h3 className='text-xl font-semibold text-white mb-4'>Contact</h3>
              <p className='text-slate-400'>Email: info@gwenokipodichurch.org</p>
              <p className='text-slate-400'>Phone: +254 700 000 000</p>
              <p className='text-slate-400'>Address: Gweno Kipodi SDA Church, Kisii County, Kenya</p>
            </div>
          </div>

          <div className='mt-8 rounded-3xl border border-blue-500/20 bg-blue-600/10 p-6'>
            <h3 className='text-lg font-semibold text-white mb-3'>Why this is paused</h3>
            <p className='text-slate-300'>We are updating the giving flow and infrastructure so that your gifts are secure and easy to track. Please check back soon or contact our office directly.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
