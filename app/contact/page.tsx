'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, MessageCircle, Clock } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className='min-h-screen bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.18),_transparent_35%),linear-gradient(180deg,#020617_0%,#0f172a_100%)] pt-24 text-slate-100'>
      <div className='mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8'>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className='grid gap-10 lg:grid-cols-[1.4fr_1fr]'>
          <div>
            <p className='text-sm uppercase tracking-[0.3em] text-blue-400'>Get in touch</p>
            <h1 className='mt-4 text-4xl font-bold text-white sm:text-5xl'>Contact Gweno Kipodi SDA Church</h1>
            <p className='mt-4 max-w-2xl text-slate-300'>Visit us, send us a message, or start a prayer request. We are here to serve our community with heart and hope.</p>

            <div className='mt-10 space-y-4 rounded-3xl border border-slate-800/80 bg-slate-950/80 p-8 shadow-xl shadow-blue-500/5'>
              {[
                { icon: MapPin, label: 'Location', value: 'Gweno Kipodi SDA Church, Kisii County, Kenya' },
                { icon: Phone, label: 'Phone', value: '+254 700 000 000' },
                { icon: Mail, label: 'Email', value: 'info@gwenokipodichurch.org' },
                { icon: Clock, label: 'Office Hours', value: 'Mon - Fri • 8:00 AM - 5:00 PM' },
              ].map((item) => (
                <div key={item.label} className='flex items-start gap-4 rounded-3xl bg-slate-900/80 p-4'>
                  <item.icon className='mt-1 h-6 w-6 text-blue-400' />
                  <div>
                    <p className='text-sm uppercase tracking-[0.2em] text-slate-400'>{item.label}</p>
                    <p className='mt-1 text-base text-slate-100'>{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className='rounded-[2rem] border border-slate-800/80 bg-slate-950/80 p-8 shadow-xl shadow-slate-950/30'>
            <p className='text-sm uppercase tracking-[0.3em] text-blue-400'>Send a message</p>
            <h2 className='mt-4 text-3xl font-semibold text-white'>Connect with our team</h2>
            <div className='mt-8 grid gap-4'>
              <label className='space-y-2'>
                <span className='text-sm text-slate-300'>Name</span>
                <input className='w-full rounded-3xl border border-slate-800 bg-slate-900 px-4 py-3 text-slate-100 outline-none transition focus:border-blue-500' placeholder='Your name' />
              </label>
              <label className='space-y-2'>
                <span className='text-sm text-slate-300'>Email</span>
                <input className='w-full rounded-3xl border border-slate-800 bg-slate-900 px-4 py-3 text-slate-100 outline-none transition focus:border-blue-500' placeholder='you@example.com' />
              </label>
              <label className='space-y-2'>
                <span className='text-sm text-slate-300'>Message</span>
                <textarea rows={5} className='w-full rounded-3xl border border-slate-800 bg-slate-900 px-4 py-3 text-slate-100 outline-none transition focus:border-blue-500' placeholder='Write your message here...' />
              </label>
            </div>
            <button type='submit' className='mt-8 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:brightness-110'>
              Submit Request
            </button>
          </motion.form>
        </motion.div>

        <div className='mt-14 grid gap-8 lg:grid-cols-2'>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className='rounded-[2rem] border border-slate-800/80 bg-slate-950/80 p-8 shadow-xl shadow-blue-500/10'>
            <h2 className='text-2xl font-semibold text-white'>Visit Our Location</h2>
            <p className='mt-3 text-slate-300'>The church is near the main highway in Gweno Kipodi. Join us for Sabbath worship and weekly ministries.</p>
            <div className='mt-8 aspect-[16/9] overflow-hidden rounded-3xl bg-slate-900'>
              <iframe className='h-full w-full' src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8971676725!2d34.75542891535382!3d-0.6953545999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMMKwNDInMjYuMSJTIDM0wrA0NScxOS40IkU!5e0!3m2!1sen!2ske!4v1700000000000!5m2!1sen!2ske' title='Church location map' loading='lazy' referrerPolicy='no-referrer-when-downgrade' />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className='rounded-[2rem] border border-slate-800/80 bg-slate-950/80 p-8 shadow-xl shadow-blue-500/10'>
            <h2 className='text-2xl font-semibold text-white'>WhatsApp Connect</h2>
            <p className='mt-3 text-slate-300'>Chat directly with our support team for prayer, event questions, or church ministry information.</p>
            <div className='mt-8 space-y-4'>
              <a href='https://wa.me/254700000000' target='_blank' rel='noreferrer' className='flex items-center gap-3 rounded-3xl bg-slate-900/80 px-5 py-4 text-slate-100 transition hover:bg-slate-800'>
                <MessageCircle className='h-6 w-6 text-green-400' />
                <span>Message us on WhatsApp</span>
              </a>
              <div className='rounded-3xl bg-slate-900/80 p-5'>
                <p className='text-sm uppercase tracking-[0.25em] text-blue-400'>Office</p>
                <p className='mt-3 text-slate-100'>Monday — Friday</p>
                <p className='text-slate-400'>8:00 AM — 5:00 PM</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
