'use client';

import { useState } from 'react';
import { 
  MagnifyingGlassIcon, 
  BanknotesIcon, 
  ArrowPathIcon, 
  EyeIcon 
} from '@heroicons/react/24/outline';
import Link from 'next/link';

// Dummy data for accounts
const mockAccounts = [
  { 
    id: '1', 
    accountNumber: '5001234567', 
    accountName: 'Батбаяр Дорж', 
    type: 'Хадгаламж', 
    currency: 'MNT',
    balance: 4850000,
    availableBalance: 4850000,
    status: 'active',
    openDate: '2022-05-15'
  },
  { 
    id: '2', 
    accountNumber: '5007654321', 
    accountName: 'Оюунтуяа Сүхбат', 
    type: 'Харилцах', 
    currency: 'MNT',
    balance: 1250000,
    availableBalance: 1250000,
    status: 'active',
    openDate: '2022-06-20'
  },
  { 
    id: '3', 
    accountNumber: '5009876543', 
    accountName: 'Эрдэнэбат Наран', 
    type: 'Хадгаламж', 
    currency: 'USD',
    balance: 5000,
    availableBalance: 5000,
    status: 'inactive',
    openDate: '2022-04-10'
  },
  { 
    id: '4', 
    accountNumber: '4001234567', 
    accountName: '"Од" ХХК', 
    type: 'Бизнес', 
    currency: 'MNT',
    balance: 78500000,
    availableBalance: 78500000,
    status: 'active',
    openDate: '2022-02-05'
  },
  { 
    id: '5', 
    accountNumber: '4007654321', 
    accountName: '"Эрдэнэт Далай" ХХК', 
    type: 'Бизнес', 
    currency: 'MNT',
    balance: 42750000,
    availableBalance: 42750000,
    status: 'active',
    openDate: '2021-12-15'
  },
  { 
    id: '6', 
    accountNumber: '5003456789', 
    accountName: 'Мягмар Лхагва', 
    type: 'Харилцах', 
    currency: 'MNT',
    balance: 750000,
    availableBalance: 750000,
    status: 'active',
    openDate: '2022-07-30'
  },
  { 
    id: '7', 
    accountNumber: '5008765432', 
    accountName: 'Номин Сувдаа', 
    type: 'Зээл', 
    currency: 'MNT',
    balance: -15000000,
    availableBalance: 0,
    status: 'active',
    openDate: '2022-08-05'
  },
  { 
    id: '8', 
    accountNumber: '4004567890', 
    accountName: '"Сүүн" ХК', 
    type: 'Бизнес', 
    currency: 'MNT',
    balance: 32450000,
    availableBalance: 32450000,
    status: 'active',
    openDate: '2021-11-20'
  }
];

// Helper function to format currency
const formatCurrency = (amount: number, currency: string) => {
  return new Intl.NumberFormat('mn-MN', { 
    style: 'currency', 
    currency: currency,
    maximumFractionDigits: currency === 'MNT' ? 0 : 2
  }).format(amount);
};

export default function AccountsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Calculate account statistics
  const totalAccounts = mockAccounts.length;
  const activeAccounts = mockAccounts.filter(account => account.status === 'active').length;
  const totalMNTBalance = mockAccounts
    .filter(account => account.currency === 'MNT')
    .reduce((sum, account) => sum + account.balance, 0);
  const totalUSDBalance = mockAccounts
    .filter(account => account.currency === 'USD')
    .reduce((sum, account) => sum + account.balance, 0);

  // Filter accounts based on search and filters
  const filteredAccounts = mockAccounts.filter(account => {
    const matchesSearch = 
      account.accountNumber.includes(searchTerm) ||
      account.accountName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = 
      filterType === 'all' || 
      account.type === filterType;
    
    const matchesStatus = 
      filterStatus === 'all' || 
      account.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Дансны мэдээлэл</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Данс, үлдэгдлийн мэдээлэл
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Нийт данс</h3>
            <BanknotesIcon className="h-6 w-6 text-blue-600" />
          </div>
          <p className="text-3xl font-bold mt-2 text-gray-900 dark:text-white">{totalAccounts}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Бүртгэлтэй нийт данс</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Идэвхтэй данс</h3>
            <BanknotesIcon className="h-6 w-6 text-green-600" />
          </div>
          <p className="text-3xl font-bold mt-2 text-gray-900 dark:text-white">{activeAccounts}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Идэвхтэй дансны тоо</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Нийт үлдэгдэл (₮)</h3>
            <ArrowPathIcon className="h-6 w-6 text-purple-600" />
          </div>
          <p className="text-3xl font-bold mt-2 text-gray-900 dark:text-white">{formatCurrency(totalMNTBalance, 'MNT')}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Төгрөгийн дансны үлдэгдэл</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Нийт үлдэгдэл ($)</h3>
            <ArrowPathIcon className="h-6 w-6 text-yellow-600" />
          </div>
          <p className="text-3xl font-bold mt-2 text-gray-900 dark:text-white">{formatCurrency(totalUSDBalance, 'USD')}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Долларын дансны үлдэгдэл</p>
        </div>
      </div>

      {/* Search and filter section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full rounded-md border-0 py-2 pl-10 text-gray-900 dark:text-white dark:bg-gray-700 ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
                placeholder="Дансны дугаар эсвэл нэрээр хайх..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <select
              className="block w-full rounded-md border-0 py-2 text-gray-900 dark:text-white dark:bg-gray-700 ring-1 ring-inset ring-gray-300 dark:ring-gray-600 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">Бүх төрөл</option>
              <option value="Харилцах">Харилцах</option>
              <option value="Хадгаламж">Хадгаламж</option>
              <option value="Бизнес">Бизнес</option>
              <option value="Зээл">Зээл</option>
            </select>
          </div>
          
          <div>
            <select
              className="block w-full rounded-md border-0 py-2 text-gray-900 dark:text-white dark:bg-gray-700 ring-1 ring-inset ring-gray-300 dark:ring-gray-600 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">Бүх төлөв</option>
              <option value="active">Идэвхтэй</option>
              <option value="inactive">Идэвхгүй</option>
            </select>
          </div>
        </div>
      </div>

      {/* Accounts table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Дансны дугаар
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Дансны нэр
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Төрөл
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Валют
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Үлдэгдэл
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Төлөв
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Үйлдэл
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
              {filteredAccounts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                    Данс олдсонгүй
                  </td>
                </tr>
              ) : (
                filteredAccounts.map((account) => (
                  <tr key={account.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{account.accountNumber}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">{account.accountName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">{account.type}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">{account.currency}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm font-semibold ${
                        account.balance >= 0 
                          ? 'text-gray-900 dark:text-white' 
                          : 'text-red-600 dark:text-red-400'
                      }`}>
                        {formatCurrency(account.balance, account.currency)}
                      </div>
                      {account.availableBalance !== account.balance && (
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Боломжит: {formatCurrency(account.availableBalance, account.currency)}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                        account.status === 'active' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}>
                        {account.status === 'active' ? 'Идэвхтэй' : 'Идэвхгүй'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Link
                          href={`/dashboard/accounts/${account.id}`}
                          className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                          title="Дэлгэрэнгүй"
                        >
                          <EyeIcon className="h-5 w-5" />
                        </Link>
                        <Link
                          href={`/dashboard/transactions?account=${account.id}`}
                          className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                          title="Гүйлгээний түүх"
                        >
                          <ArrowPathIcon className="h-5 w-5" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="bg-white dark:bg-gray-800 px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 sm:px-6 rounded-lg shadow">
        <div className="flex-1 flex justify-between sm:hidden">
          <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            Өмнөх
          </button>
          <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            Дараах
          </button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Нийт <span className="font-medium">{filteredAccounts.length}</span> данс
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600">
                Өмнөх
              </button>
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600">
                1
              </button>
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600">
                2
              </button>
              <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600">
                Дараах
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
} 