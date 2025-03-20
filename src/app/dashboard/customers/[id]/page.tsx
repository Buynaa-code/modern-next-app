'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeftIcon, 
  PencilIcon, 
  UserIcon, 
  EnvelopeIcon, 
  PhoneIcon,
  CalendarIcon,
  BanknotesIcon
} from '@heroicons/react/24/outline';

// Dummy data - in a real app, this would be fetched from an API
const mockCustomers = [
  { 
    id: '1', 
    name: 'Батбаяр Дорж', 
    email: 'batbayar@example.mn', 
    phone: '9911-2233', 
    accountType: 'Иргэн',
    accounts: 2,
    status: 'active',
    joinDate: '2022-05-15',
    address: 'Хан-Уул дүүрэг, 2-р хороо, Аполло-33 хороолол, 56A тоот',
    accountsList: [
      { number: '1234567890', name: 'Хадгаламжийн данс', balance: '₮ 2,500,000', type: 'Хадгаламж' },
      { number: '9876543210', name: 'Харилцах данс', balance: '₮ 1,200,000', type: 'Харилцах' }
    ]
  },
  { 
    id: '2', 
    name: 'Оюунтуяа Сүхбат', 
    email: 'oyunaa@example.mn', 
    phone: '9944-5566', 
    accountType: 'Иргэн',
    accounts: 1,
    status: 'active',
    joinDate: '2022-06-20',
    address: 'Чингэлтэй дүүрэг, 3-р хороо, Жаргалант хотхон, 112B тоот',
    accountsList: [
      { number: '5432167890', name: 'Харилцах данс', balance: '₮ 850,000', type: 'Харилцах' }
    ]
  },
  // Add more customer data for other IDs as needed
];

export default function CustomerDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [customer, setCustomer] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // In a real app, fetch from API. Here we simulate with mockCustomers
    const fetchCustomer = () => {
      setLoading(true);
      try {
        const foundCustomer = mockCustomers.find(c => c.id === params.id);
        if (foundCustomer) {
          setCustomer(foundCustomer);
        } else {
          setError('Харилцагч олдсонгүй');
        }
      } catch (err) {
        console.error('Error fetching customer:', err);
        setError('Харилцагчийн мэдээлэл авах үед алдаа гарлаа');
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !customer) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-xl text-center">
        <p className="text-red-700 dark:text-red-400">{error || 'Харилцагч олдсонгүй'}</p>
        <Link
          href="/dashboard/customers"
          className="inline-flex items-center mt-4 text-blue-600 dark:text-blue-400 hover:underline"
        >
          <ArrowLeftIcon className="mr-2 h-4 w-4" />
          Харилцагчдын жагсаалт руу буцах
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">
            {customer.name}
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Харилцагчийн дэлгэрэнгүй мэдээлэл
          </p>
        </div>
        <div className="flex space-x-3">
          <Link
            href="/dashboard/customers"
            className="inline-flex items-center rounded-lg border border-blue-100 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 shadow-sm transition-colors"
          >
            <ArrowLeftIcon className="mr-2 h-5 w-5 text-gray-500 dark:text-gray-400" />
            Буцах
          </Link>
          <Link
            href={`/dashboard/customers/${customer.id}/edit`}
            className="inline-flex items-center rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:from-blue-700 hover:to-blue-800"
          >
            <PencilIcon className="mr-2 h-5 w-5" />
            Засах
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main info card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-blue-50 dark:border-gray-700 p-6 md:col-span-2">
          <div className="flex items-center mb-6">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full mr-4">
              <UserIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Үндсэн мэдээлэл</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Харилцагчийн бүртгэлийн мэдээлэл</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Харилцагчийн нэр</h3>
              <p className="mt-1 text-base text-gray-900 dark:text-white">{customer.name}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Харилцагчийн төрөл</h3>
              <p className="mt-1 text-base text-gray-900 dark:text-white">{customer.accountType}</p>
            </div>
            
            <div className="flex items-start">
              <EnvelopeIcon className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">И-мэйл хаяг</h3>
                <p className="mt-1 text-base text-gray-900 dark:text-white">{customer.email}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <PhoneIcon className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Утасны дугаар</h3>
                <p className="mt-1 text-base text-gray-900 dark:text-white">{customer.phone}</p>
              </div>
            </div>

            <div className="flex items-start md:col-span-2">
              <CalendarIcon className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Хаяг</h3>
                <p className="mt-1 text-base text-gray-900 dark:text-white">{customer.address}</p>
              </div>
            </div>

            <div className="flex items-start">
              <CalendarIcon className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Бүртгүүлсэн огноо</h3>
                <p className="mt-1 text-base text-gray-900 dark:text-white">{new Date(customer.joinDate).toLocaleDateString('mn-MN')}</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Төлөв</h3>
              <span className={`inline-flex rounded-full px-2.5 py-1 mt-1 text-xs font-semibold ${
                customer.status === 'active' 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
              }`}>
                {customer.status === 'active' ? 'Идэвхтэй' : 'Идэвхгүй'}
              </span>
            </div>
          </div>
        </div>

        {/* Customer stats card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-blue-50 dark:border-gray-700 p-6 h-fit">
          <div className="flex items-center mb-6">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full mr-4">
              <BanknotesIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Дансны мэдээлэл</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Дансдын тоо болон мэдээлэл</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Нийт данс</h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{customer.accounts}</p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                <BanknotesIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            
            <Link
              href={`/dashboard/accounts?customer=${customer.id}`}
              className="text-blue-600 dark:text-blue-400 text-sm flex items-center hover:underline"
            >
              Бүх дансыг харах
              <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Accounts list */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-blue-50 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Харилцагчийн данснууд</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Бүх дансны жагсаалт</p>
          </div>
          <Link 
            href={`/dashboard/accounts/new?customer=${customer.id}`}
            className="rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:from-blue-700 hover:to-blue-800"
          >
            Данс нэмэх
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-blue-100 dark:divide-gray-700">
            <thead className="bg-blue-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3.5 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Дансны дугаар
                </th>
                <th scope="col" className="px-6 py-3.5 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Дансны нэр
                </th>
                <th scope="col" className="px-6 py-3.5 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Төрөл
                </th>
                <th scope="col" className="px-6 py-3.5 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Үлдэгдэл
                </th>
                <th scope="col" className="px-6 py-3.5 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Дэлгэрэнгүй
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-blue-50 dark:bg-gray-800 dark:divide-gray-700">
              {customer.accountsList.map((account: any, index: number) => (
                <tr key={index} className="hover:bg-blue-50 dark:hover:bg-gray-700/50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {account.number}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {account.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {account.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {account.balance}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link href={`/dashboard/accounts/${account.number}`}>
                      <span className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">Харах</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 