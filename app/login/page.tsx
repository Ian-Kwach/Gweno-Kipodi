'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showCreateInitial, setShowCreateInitial] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const storedUser = localStorage.getItem('gwenoAdminUser');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        if (parsed?.role === 'admin' || parsed?.role === 'editor') {
          router.replace('/admin');
        }
      } catch {
        localStorage.removeItem('gwenoAdminUser');
      }
    }
  }, [router]);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus(null);
    setLoading(true);

    try {
      const response = await fetch('/api/users');
      const result = await response.json();
      const users = Array.isArray(result.data) ? result.data : [];

      if (users.length === 0) {
        setShowCreateInitial(true);
        setStatus('No admin users found. Create the first admin account below.');
        return;
      }

      const matchingUser = users.find(
        (user: any) => user.email?.toLowerCase().trim() === email.toLowerCase().trim()
      );

      if (!matchingUser) {
        setStatus('User not found. Please contact the site administrator.');
        return;
      }

      if (matchingUser.status !== 'active') {
        setStatus('This account is inactive. Please contact the administrator.');
        return;
      }

      if (matchingUser.role !== 'admin' && matchingUser.role !== 'editor') {
        setStatus('Only admin and editor users can access this page.');
        return;
      }

      localStorage.setItem('gwenoAdminUser', JSON.stringify(matchingUser));
      router.push('/admin');
    } catch (error) {
      console.error(error);
      setStatus('Unable to complete login right now. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateInitialAdmin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus(null);
    setLoading(true);

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name || 'Admin User',
          email,
          role: 'admin',
          status: 'active',
        }),
      });
      const result = await response.json();

      if (!result.success) {
        setStatus(result.error || 'Unable to create admin user.');
        return;
      }

      const newUser = {
        id: result.id,
        name: name || 'Admin User',
        email,
        role: 'admin',
        status: 'active',
      };
      localStorage.setItem('gwenoAdminUser', JSON.stringify(newUser));
      router.push('/admin');
    } catch (error) {
      console.error(error);
      setStatus('Unable to create admin user at this time.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-slate-900 flex items-center justify-center px-4'>
      <div className='max-w-md w-full bg-slate-800 border border-slate-700 rounded-3xl p-8 shadow-xl'>
        <h1 className='text-3xl font-bold text-white mb-3'>Admin Access</h1>
        <p className='text-slate-400 mb-6'>Use your registered admin email to sign in, or create the first admin if none exists.</p>

        <form onSubmit={showCreateInitial ? handleCreateInitialAdmin : handleLogin} className='space-y-5'>
          {showCreateInitial ? (
            <div>
              <label className='block text-sm font-medium text-slate-300 mb-2' htmlFor='name'>
                Full name
              </label>
              <input
                id='name'
                type='text'
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30'
                placeholder='John Doe'
              />
            </div>
          ) : null}

          <div>
            <label className='block text-sm font-medium text-slate-300 mb-2' htmlFor='email'>
              Email address
            </label>
            <input
              id='email'
              type='email'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30'
            />
          </div>

          {status ? <p className='text-sm text-red-400'>{status}</p> : null}

          <button
            type='submit'
            disabled={loading}
            className='w-full rounded-2xl bg-blue-600 px-4 py-3 text-white font-semibold hover:bg-blue-500 transition disabled:cursor-not-allowed disabled:opacity-70'
          >
            {loading ? 'Processing…' : showCreateInitial ? 'Create first admin' : 'Sign in'}
          </button>
        </form>

        <div className='mt-6 text-sm text-slate-500'>
          <p>Need help? Ask another admin to add your email as a user.</p>
        </div>
      </div>
    </div>
  );
}
