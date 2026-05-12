'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, CreditCard, Smartphone, Building2 } from 'lucide-react';

export default function GivingPage() {
  const [selectedAmount, setSelectedAmount] = useState(5000);
  const [customAmount, setCustomAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('mpesa');
  const [givingCategory, setGivingCategory] = useState('offering');

  const amounts = [1000, 2500, 5000, 10000, 25000];

  const givingCategories = [
    { id: 'tithe', label: 'Tithe', description: '10% of income' },
    { id: 'offering', label: 'Offering', description: 'Voluntary gift' },
    { id: 'building', label: 'Building Fund', description: 'Church development' },
    { id: 'mission', label: 'Mission Support', description: 'Evangelism and outreach' },
    { id: 'project', label: 'Special Projects', description: 'Community projects' },
  ];

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 pt-20'>
      <div className='max-w-6xl mx-auto px-4 py-12'>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className='text-5xl font-bold text-white mb-2 flex items-center gap-4'
        >
          <Gift className='text-yellow-400' size={40} />
          Online Giving
        </motion.h1>
        <p className='text-gray-300 mb-12'>Support our church ministry with your generous gifts</p>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Giving Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className='lg:col-span-2 bg-gradient-to-br from-blue-900/40 to-purple-900/40 backdrop-blur-md p-8 rounded-xl border border-blue-500/20'
          >
            <h2 className='text-2xl font-bold text-white mb-6'>Make Your Donation</h2>

            {/* Giving Category */}
            <div className='mb-8'>
              <label className='block text-white font-semibold mb-4'>What would you like to give towards?</label>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                {givingCategories.map(category => (
                  <motion.button
                    key={category.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setGivingCategory(category.id)}
                    className={`p-4 rounded-lg border-2 transition text-left ${
                      givingCategory === category.id
                        ? 'bg-blue-600/30 border-blue-400'
                        : 'bg-slate-800/30 border-slate-600 hover:border-blue-500/50'
                    }`}
                  >
                    <div className='font-semibold text-white'>{category.label}</div>
                    <div className='text-sm text-gray-400'>{category.description}</div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Amount Selection */}
            <div className='mb-8'>
              <label className='block text-white font-semibold mb-4'>Select Amount (KES)</label>
              <div className='grid grid-cols-2 md:grid-cols-5 gap-3 mb-4'>
                {amounts.map(amount => (
                  <motion.button
                    key={amount}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => {
                      setSelectedAmount(amount);
                      setCustomAmount('');
                    }}
                    className={`p-3 rounded-lg font-bold transition ${
                      selectedAmount === amount && !customAmount
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
                    }`}
                  >
                    {amount.toLocaleString()}
                  </motion.button>
                ))}
              </div>
              <div>
                <label className='block text-gray-400 text-sm mb-2'>Or enter custom amount:</label>
                <input
                  type='number'
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setSelectedAmount(parseInt(e.target.value) || 0);
                  }}
                  className='w-full px-4 py-3 bg-slate-800 border border-blue-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400'
                  placeholder='Enter amount'
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className='mb-8'>
              <label className='block text-white font-semibold mb-4'>Payment Method</label>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                {[
                  { id: 'mpesa', label: 'M-Pesa', icon: Smartphone },
                  { id: 'card', label: 'Debit/Credit Card', icon: CreditCard },
                  { id: 'bank', label: 'Bank Transfer', icon: Building2 },
                ].map(method => (
                  <motion.button
                    key={method.id}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`p-6 rounded-lg border-2 transition flex flex-col items-center gap-2 ${
                      paymentMethod === method.id
                        ? 'bg-blue-600/30 border-blue-400'
                        : 'bg-slate-800/30 border-slate-600 hover:border-blue-500/50'
                    }`}
                  >
                    <method.icon className='text-blue-400' size={32} />
                    <span className='font-semibold text-white'>{method.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Donate Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition'
            >
              Donate {selectedAmount.toLocaleString()} KES
            </motion.button>
          </motion.div>

          {/* Info Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className='space-y-6'
          >
            {/* Summary */}
            <div className='bg-blue-600/20 border border-blue-500/30 p-6 rounded-lg'>
              <h3 className='text-lg font-bold text-white mb-4'>Donation Summary</h3>
              <div className='space-y-2 text-gray-300'>
                <div className='flex justify-between'>
                  <span>Category:</span>
                  <span className='font-semibold text-white capitalize'>{givingCategory}</span>
                </div>
                <div className='flex justify-between'>
                  <span>Amount:</span>
                  <span className='font-semibold text-white'>{selectedAmount.toLocaleString()} KES</span>
                </div>
                <div className='flex justify-between'>
                  <span>Method:</span>
                  <span className='font-semibold text-white capitalize'>{paymentMethod}</span>
                </div>
              </div>
            </div>

            {/* Bank Details */}
            <div className='bg-purple-600/20 border border-purple-500/30 p-6 rounded-lg'>
              <h3 className='text-lg font-bold text-white mb-4'>Bank Transfer Details</h3>
              <div className='space-y-2 text-sm text-gray-300'>
                <div>
                  <label className='font-semibold text-white'>Bank:</label>
                  <p>Kenya Commercial Bank</p>
                </div>
                <div>
                  <label className='font-semibold text-white'>Account:</label>
                  <p>Gweno Kipodi SDA Church</p>
                </div>
                <div>
                  <label className='font-semibold text-white'>Account No:</label>
                  <p>1234567890</p>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className='bg-yellow-600/20 border border-yellow-500/30 p-6 rounded-lg'>
              <h3 className='text-lg font-bold text-white mb-4'>Receipt & Tax</h3>
              <ul className='space-y-2 text-sm text-gray-300'>
                <li>✓ Automatic receipt via email</li>
                <li>✓ Tax deductible donation</li>
                <li>✓ Secure payment processing</li>
                <li>✓ Anonymous giving option</li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className='mt-16'
        >
          <h2 className='text-3xl font-bold text-white mb-8'>Frequently Asked Questions</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {[
              { q: 'Is my donation secure?', a: 'Yes, we use industry-standard encryption for all transactions.' },
              { q: 'Can I donate anonymously?', a: 'Yes, check the anonymous option during checkout.' },
              { q: 'Are donations tax deductible?', a: 'Yes, with proper documentation.' },
              { q: 'How is my donation used?', a: 'Donations support church operations, community service, and ministry.' },
            ].map((faq, idx) => (
              <div key={idx} className='bg-slate-800/50 p-6 rounded-lg border border-slate-700'>
                <h4 className='font-bold text-white mb-2'>{faq.q}</h4>
                <p className='text-gray-300 text-sm'>{faq.a}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
