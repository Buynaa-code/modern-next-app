'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { UserIcon } from '@heroicons/react/24/outline';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');

  // Update name when session is loaded
  useEffect(() => {
    if (session?.user?.name) {
      setName(session.user.name);
    }
  }, [session]);

  if (status === 'loading') {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">Loading profile...</p>
      </div>
    );
  }

  if (status === 'unauthenticated' || !session) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-700 dark:text-gray-300">You need to be signed in to view this page</p>
          <a href="/auth/signin" className="mt-4 inline-block rounded bg-blue-600 px-4 py-2 text-white">Sign In</a>
        </div>
      </div>
    );
  }

  const handleSave = async () => {
    // In a real app, you would call an API to update the user's profile
    console.log('Saving profile...', { name });
    setIsEditing(false);
  };

  return (
    <div className="mx-auto max-w-2xl py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Your Profile</h1>
      
      <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
          <div className="relative h-24 w-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
            {session.user.image ? (
              <Image 
                src={session.user.image} 
                alt={session.user.name || 'User'} 
                fill 
                className="object-cover"
              />
            ) : (
              <UserIcon className="h-12 w-12 text-gray-400" />
            )}
          </div>
          
          <div className="flex-1">
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email
                  </label>
                  <p className="mt-1 text-gray-900 dark:text-white">{session.user.email}</p>
                </div>
                
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSave}
                    className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500"
                  >
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {session.user.name || 'User'}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">{session.user.email}</p>
                </div>
                
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500"
                >
                  Edit Profile
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Account Information</h2>
        <div className="mt-4 space-y-4">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">User ID</p>
            <p className="text-gray-900 dark:text-white">{session.user.id}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Account Type</p>
            <p className="text-gray-900 dark:text-white">Standard</p>
          </div>
        </div>
      </div>
    </div>
  );
} 