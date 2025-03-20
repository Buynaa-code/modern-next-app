'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  HomeIcon, 
  UserGroupIcon,
  BanknotesIcon,
  ArrowPathIcon,
  ChartBarIcon,
  ArrowRightOnRectangleIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';
import { ThemeToggle } from '../ui/ThemeToggle';

const navigation = [
  { name: 'Хяналтын самбар', href: '/dashboard', icon: HomeIcon },
  { name: 'Харилцагчид', href: '/dashboard/customers', icon: UserGroupIcon },
  { name: 'Дансны мэдээлэл', href: '/dashboard/accounts', icon: BanknotesIcon },
  { name: 'Гүйлгээний түүх', href: '/dashboard/transactions', icon: ArrowPathIcon },
  { name: 'Тайлан & Графикууд', href: '/dashboard/reports', icon: ChartBarIcon },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = () => {
    // For demo, we'll just redirect to the sign-in page
    router.push('/auth/signin');
  };

  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 border-r border-blue-100 dark:border-gray-700 shadow-sm">
      <div className="flex flex-col flex-grow p-5">
        <div className="flex items-center h-16 mb-4">
          <Link href="/dashboard" className="flex items-center">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-2 rounded-lg shadow-md mr-3">
              <BanknotesIcon className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">Банкны ERP</span>
          </Link>
        </div>
        
        {/* User profile summary */}
        <div className="mb-6 p-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-blue-100 dark:border-gray-700">
          <div className="flex items-center">
            <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-2 mr-3">
              <UserCircleIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Админ Хэрэглэгч</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">admin@bank.mn</p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 space-y-1.5">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  group flex items-center px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 ease-in-out
                  ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
                      : 'text-gray-700 hover:bg-blue-50 dark:text-gray-200 dark:hover:bg-gray-700/50 hover:shadow-sm'
                  }
                `}
              >
                <item.icon
                  className={`
                    mr-3 h-5 w-5 flex-shrink-0
                    ${
                      isActive
                        ? 'text-white'
                        : 'text-gray-500 dark:text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400'
                    }
                  `}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="flex flex-shrink-0 border-t border-blue-100 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between w-full bg-white dark:bg-gray-800 p-3 rounded-xl shadow-sm border border-blue-100 dark:border-gray-700">
          <ThemeToggle />
          <button
            onClick={handleSignOut}
            className="flex items-center text-sm font-medium text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors duration-200"
          >
            <ArrowRightOnRectangleIcon className="mr-2 h-5 w-5" />
            Гарах
          </button>
        </div>
      </div>
    </div>
  );
} 