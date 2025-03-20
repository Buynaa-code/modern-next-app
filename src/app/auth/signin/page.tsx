'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { BanknotesIcon } from '@heroicons/react/24/outline';

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // For demo, we'll accept any credentials and redirect
      // In a real app, you would validate with next-auth properly
      
      // For demo, using direct login without NextAuth for now
      if (email === 'admin@bank.mn' && password === 'password') {
        // Simply redirect to dashboard instead of using NextAuth signIn
        router.push('/dashboard');
      } else {
        setError('Имэйл эсвэл нууц үг буруу байна.');
      }
      
      /* Commented out NextAuth code that's causing issues
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (!result?.error) {
        router.push('/dashboard');
      } else {
        setError('Имэйл эсвэл нууц үг буруу байна.');
      }
      */
    } catch (err) {
      console.error('Sign in error:', err);
      setError('Нэвтрэх үед алдаа гарлаа. Дахин оролдоно уу.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 flex flex-col">
      <div className="p-6 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 text-xl font-bold text-blue-600 dark:text-blue-400">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-2 rounded-lg shadow-md">
            <BanknotesIcon className="h-6 w-6 text-white" />
          </div>
          <span className="bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">Банкны ERP</span>
        </Link>
        <ThemeToggle />
      </div>

      <div className="flex-1 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative">
        {/* Decorative elements */}
        <div className="absolute left-10 top-10 w-20 h-20 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute right-10 bottom-10 w-20 h-20 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-10 left-1/2 w-20 h-20 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
        
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">
            Системд нэвтрэх
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            {' '}
            <Link
              href="/"
              className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
            >
              Банкны ERP системд тавтай морил
            </Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow-lg sm:rounded-xl sm:px-10 border border-blue-100 dark:border-gray-700 relative overflow-hidden">
            {/* Card decorative corner */}
            <div className="absolute bottom-0 right-0 w-20 h-20 bg-blue-100 dark:bg-blue-900/20 rounded-tl-full opacity-20"></div>
            
            {error && (
              <div className="bg-red-50 border-l-4 border-red-400 text-red-700 p-4 mb-6 rounded-md">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Имэйл хаяг
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                    placeholder="tanii@email.mn"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Нууц үг
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    Намайг сануулах
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
                    Нууц үгээ мартсан?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-all duration-200"
                >
                  {isLoading ? 'Нэвтэрч байна...' : 'Нэвтрэх'}
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                    Банкны ERP систем
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <style jsx global>{`
            @keyframes blob {
              0% {
                transform: translate(0px, 0px) scale(1);
              }
              33% {
                transform: translate(30px, -50px) scale(1.1);
              }
              66% {
                transform: translate(-20px, 20px) scale(0.9);
              }
              100% {
                transform: translate(0px, 0px) scale(1);
              }
            }
            .animate-blob {
              animation: blob 7s infinite;
            }
            .animation-delay-2000 {
              animation-delay: 2s;
            }
            .animation-delay-4000 {
              animation-delay: 4s;
            }
          `}</style>
        </div>
      </div>
    </div>
  );
} 