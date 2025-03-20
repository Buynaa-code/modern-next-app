'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (status === 'authenticated' && session) {
      setIsRedirecting(true);
      router.push('/dashboard');
    }
  }, [status, session, router]);

  if (isRedirecting) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500 dark:text-gray-400">Хяналтын самбар руу дамжуулж байна...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-blue-600 dark:text-blue-400">Банкны ERP</span>
            </div>
            <div className="flex items-center">
              <ThemeToggle />
              {status === 'authenticated' ? (
                <Link 
                  href="/dashboard" 
                  className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Хяналтын самбар
                </Link>
              ) : (
                <Link 
                  href="/auth/signin" 
                  className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Нэвтрэх
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
              Банкны ERP Систем
            </h1>
            <p className="mt-5 max-w-xl mx-auto text-xl text-gray-600 dark:text-gray-400">
              Банкны үйл ажиллагааг удирдах, хяналт тавих, мэдээлэл боловсруулах цогц систем.
            </p>
            <div className="mt-8 flex justify-center">
              <div className="rounded-md shadow">
                <Link
                  href="/auth/signin"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                >
                  Системд нэвтрэх
                </Link>
              </div>
              <div className="ml-3 rounded-md shadow">
                <a
                  href="#features"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 dark:text-blue-400 dark:bg-gray-800 dark:hover:bg-gray-700 md:py-4 md:text-lg md:px-10"
                >
                  Дэлгэрэнгүй
                </a>
              </div>
            </div>
          </div>

          <div id="features" className="mt-16">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Харилцагчийн Мэдээлэл</h3>
                  <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                    Харилцагчдын мэдээллийг бүртгэх, хянах, удирдах боломжтой.
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Дансны Удирдлага</h3>
                  <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                    Дансны мэдээлэл, үлдэгдэл, хуулга зэргийг хянах, удирдах.
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Тайлан & Графикууд</h3>
                  <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                    Үйл ажиллагааны тайлан, статистик мэдээллийг харуулсан дүрслэлүүд.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-8 text-center text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Банкны ERP Систем. Бүх эрх хуулиар хамгаалагдсан.
          </div>
        </div>
      </footer>
    </div>
  );
}
