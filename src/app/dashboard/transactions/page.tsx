'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  MagnifyingGlassIcon, 
  ArrowDownIcon, 
  ArrowUpIcon, 
  ArrowsRightLeftIcon,
  DocumentArrowDownIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';

// Dummy data for transactions
const mockTransactions = [
  { 
    id: '1', 
    accountNumber: '5001234567', 
    accountName: 'Батбаяр Дорж', 
    type: 'deposit',
    amount: 250000,
    currency: 'MNT',
    date: '2023-03-19 14:30',
    description: 'Цалин',
    reference: 'REF001',
    status: 'completed'
  },
  { 
    id: '2', 
    accountNumber: '5007654321', 
    accountName: 'Оюунтуяа Сүхбат', 
    type: 'withdrawal',
    amount: 150000,
    currency: 'MNT',
    date: '2023-03-19 12:20',
    description: 'ATM Баянзүрх',
    reference: 'REF002',
    status: 'completed'
  },
  { 
    id: '3', 
    accountNumber: '5009876543', 
    accountName: 'Эрдэнэбат Наран', 
    type: 'deposit',
    amount: 500,
    currency: 'USD',
    date: '2023-03-19 11:05',
    description: 'Гадаад шилжүүлэг',
    reference: 'REF003',
    status: 'completed'
  },
  { 
    id: '4', 
    accountNumber: '4001234567', 
    accountName: '"Од" ХХК', 
    type: 'transfer',
    amount: 300000,
    currency: 'MNT',
    date: '2023-03-19 10:45',
    description: 'Худалдан авалт',
    reference: 'REF004',
    status: 'completed'
  },
  { 
    id: '5', 
    accountNumber: '4007654321', 
    accountName: '"Эрдэнэт Далай" ХХК', 
    type: 'deposit',
    amount: 1250000,
    currency: 'MNT',
    date: '2023-03-18 16:30',
    description: 'Орлого',
    reference: 'REF005',
    status: 'completed'
  },
  { 
    id: '6', 
    accountNumber: '5003456789', 
    accountName: 'Мягмар Лхагва', 
    type: 'withdrawal',
    amount: 50000,
    currency: 'MNT',
    date: '2023-03-18 15:15',
    description: 'Гар утасны төлбөр',
    reference: 'REF006',
    status: 'completed'
  },
  { 
    id: '7', 
    accountNumber: '5008765432', 
    accountName: 'Номин Сувдаа', 
    type: 'transfer',
    amount: 750000,
    currency: 'MNT',
    date: '2023-03-18 14:20',
    description: 'Зээлийн төлбөр',
    reference: 'REF007',
    status: 'pending'
  },
  { 
    id: '8', 
    accountNumber: '4004567890', 
    accountName: '"Сүүн" ХК', 
    type: 'deposit',
    amount: 3500000,
    currency: 'MNT',
    date: '2023-03-18 13:45',
    description: 'Борлуулалт',
    reference: 'REF008',
    status: 'completed'
  },
  { 
    id: '9', 
    accountNumber: '5001234567', 
    accountName: 'Батбаяр Дорж', 
    type: 'withdrawal',
    amount: 100000,
    currency: 'MNT',
    date: '2023-03-18 11:30',
    description: 'Хүнсний дэлгүүр',
    reference: 'REF009',
    status: 'completed'
  },
  { 
    id: '10', 
    accountNumber: '5007654321', 
    accountName: 'Оюунтуяа Сүхбат', 
    type: 'transfer',
    amount: 500000,
    currency: 'MNT',
    date: '2023-03-18 10:15',
    description: 'Хүүхдийн сургалт',
    reference: 'REF010',
    status: 'failed'
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

export default function TransactionsPage() {
  const searchParams = useSearchParams();
  const accountId = searchParams.get('account');
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDate, setFilterDate] = useState('all');
  const [accountFilter, setAccountFilter] = useState(accountId || '');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Calculate transaction statistics
  const totalTransactions = mockTransactions.length;
  const completedTransactions = mockTransactions.filter(transaction => transaction.status === 'completed').length;
  const totalDeposits = mockTransactions
    .filter(transaction => transaction.type === 'deposit')
    .reduce((sum, transaction) => transaction.currency === 'MNT' ? sum + transaction.amount : sum, 0);
  const totalWithdrawals = mockTransactions
    .filter(transaction => transaction.type === 'withdrawal')
    .reduce((sum, transaction) => transaction.currency === 'MNT' ? sum + transaction.amount : sum, 0);

  // Filter transactions based on search and filters
  const filteredTransactions = mockTransactions.filter(transaction => {
    const matchesSearch = 
      transaction.accountNumber.includes(searchTerm) ||
      transaction.accountName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.reference.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = 
      filterType === 'all' || 
      transaction.type === filterType;
    
    const matchesStatus = 
      filterStatus === 'all' || 
      transaction.status === filterStatus;
    
    const matchesAccount = 
      accountFilter === '' || 
      transaction.accountNumber === accountFilter;
    
    let matchesDate = true;
    if (filterDate === 'today') {
      const today = new Date().toISOString().split('T')[0];
      matchesDate = transaction.date.startsWith(today);
    } else if (filterDate === 'yesterday') {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayString = yesterday.toISOString().split('T')[0];
      matchesDate = transaction.date.startsWith(yesterdayString);
    } else if (filterDate === 'week') {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      const transactionDate = new Date(transaction.date);
      matchesDate = transactionDate >= weekAgo;
    }
    
    return matchesSearch && matchesType && matchesStatus && matchesAccount && matchesDate;
  });

  // Update account filter when URL param changes
  useEffect(() => {
    if (accountId) {
      setAccountFilter(accountId);
    }
  }, [accountId]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Гүйлгээний түүх</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Нийт хийгдсэн гүйлгээний түүх
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-2">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="inline-flex items-center rounded-md bg-white dark:bg-gray-700 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600"
          >
            <FunnelIcon className="mr-2 h-5 w-5" />
            Шүүлтүүр
          </button>
          <button
            className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            <DocumentArrowDownIcon className="mr-2 h-5 w-5" />
            Хуулга татах
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Нийт гүйлгээ</h3>
            <ArrowsRightLeftIcon className="h-6 w-6 text-blue-600" />
          </div>
          <p className="text-3xl font-bold mt-2 text-gray-900 dark:text-white">{totalTransactions}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Хийгдсэн нийт гүйлгээ</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Амжилттай</h3>
            <div className="rounded-full bg-green-100 dark:bg-green-900 p-2">
              <span className="text-sm font-medium text-green-800 dark:text-green-200">{Math.round((completedTransactions / totalTransactions) * 100)}%</span>
            </div>
          </div>
          <p className="text-3xl font-bold mt-2 text-gray-900 dark:text-white">{completedTransactions}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Амжилттай гүйлгээний тоо</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Нийт орлого</h3>
            <ArrowUpIcon className="h-6 w-6 text-green-600" />
          </div>
          <p className="text-3xl font-bold mt-2 text-green-600 dark:text-green-400">{formatCurrency(totalDeposits, 'MNT')}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Орлогын гүйлгээ</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Нийт зарлага</h3>
            <ArrowDownIcon className="h-6 w-6 text-red-600" />
          </div>
          <p className="text-3xl font-bold mt-2 text-red-600 dark:text-red-400">{formatCurrency(totalWithdrawals, 'MNT')}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Зарлагын гүйлгээ</p>
        </div>
      </div>

      {/* Basic search section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full rounded-md border-0 py-2 pl-10 text-gray-900 dark:text-white dark:bg-gray-700 ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
            placeholder="Гүйлгээний дугаар, данс, нэр, утга, эсвэл гүйлгээний дугаараар хайх..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Advanced filter section */}
      {isFilterOpen && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <h3 className="font-medium text-gray-900 dark:text-white mb-3">Нарийвчилсан шүүлтүүр</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label htmlFor="filterType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Гүйлгээний төрөл
              </label>
              <select
                id="filterType"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white dark:bg-gray-700 ring-1 ring-inset ring-gray-300 dark:ring-gray-600 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="all">Бүгд</option>
                <option value="deposit">Орлого</option>
                <option value="withdrawal">Зарлага</option>
                <option value="transfer">Шилжүүлэг</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="filterStatus" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Төлөв
              </label>
              <select
                id="filterStatus"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white dark:bg-gray-700 ring-1 ring-inset ring-gray-300 dark:ring-gray-600 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">Бүгд</option>
                <option value="completed">Амжилттай</option>
                <option value="pending">Хүлээгдэж буй</option>
                <option value="failed">Амжилтгүй</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="filterDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Хугацаа
              </label>
              <select
                id="filterDate"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white dark:bg-gray-700 ring-1 ring-inset ring-gray-300 dark:ring-gray-600 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
              >
                <option value="all">Бүх хугацаа</option>
                <option value="today">Өнөөдөр</option>
                <option value="yesterday">Өчигдөр</option>
                <option value="week">Сүүлийн 7 хоног</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="accountFilter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Данс
              </label>
              <input
                type="text"
                id="accountFilter"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white dark:bg-gray-700 ring-1 ring-inset ring-gray-300 dark:ring-gray-600 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
                placeholder="Дансны дугаар"
                value={accountFilter}
                onChange={(e) => setAccountFilter(e.target.value)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Transactions table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Огноо
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Данс
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Гүйлгээний утга
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Дүн
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Төрөл
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Төлөв
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                    Гүйлгээ олдсонгүй
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">{transaction.date}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{transaction.reference}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">{transaction.accountName}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{transaction.accountNumber}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 dark:text-white">{transaction.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm font-semibold ${
                        transaction.type === 'deposit' 
                          ? 'text-green-600 dark:text-green-400' 
                          : transaction.type === 'withdrawal'
                          ? 'text-red-600 dark:text-red-400'
                          : 'text-blue-600 dark:text-blue-400'
                      }`}>
                        {transaction.type === 'deposit' ? '+' : transaction.type === 'withdrawal' ? '-' : ''}
                        {formatCurrency(transaction.amount, transaction.currency)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                        transaction.type === 'deposit' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                          : transaction.type === 'withdrawal'
                          ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      }`}>
                        {transaction.type === 'deposit' 
                          ? 'Орлого' 
                          : transaction.type === 'withdrawal' 
                          ? 'Зарлага' 
                          : 'Шилжүүлэг'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                        transaction.status === 'completed' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                          : transaction.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}>
                        {transaction.status === 'completed' 
                          ? 'Амжилттай' 
                          : transaction.status === 'pending' 
                          ? 'Хүлээгдэж байна' 
                          : 'Амжилтгүй'}
                      </span>
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
              Нийт <span className="font-medium">{filteredTransactions.length}</span> гүйлгээ
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