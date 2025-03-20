'use client';

import { useState } from 'react';
import { 
  MagnifyingGlassIcon, 
  PlusIcon, 
  PencilIcon, 
  TrashIcon, 
  EyeIcon 
} from '@heroicons/react/24/outline';
import Link from 'next/link';

// Dummy data for customers
const mockCustomers = [
  { 
    id: '1', 
    name: 'Батбаяр Дорж', 
    email: 'batbayar@example.mn', 
    phone: '9911-2233', 
    accountType: 'Иргэн',
    accounts: 2,
    status: 'active',
    joinDate: '2022-05-15'
  },
  { 
    id: '2', 
    name: 'Оюунтуяа Сүхбат', 
    email: 'oyunaa@example.mn', 
    phone: '9944-5566', 
    accountType: 'Иргэн',
    accounts: 1,
    status: 'active',
    joinDate: '2022-06-20'
  },
  { 
    id: '3', 
    name: 'Эрдэнэбат Наран', 
    email: 'erdenebat@example.mn', 
    phone: '9977-8899', 
    accountType: 'Иргэн',
    accounts: 3,
    status: 'inactive',
    joinDate: '2022-04-10'
  },
  { 
    id: '4', 
    name: '"Од" ХХК', 
    email: 'info@od.mn', 
    phone: '7711-2233', 
    accountType: 'Байгууллага',
    accounts: 5,
    status: 'active',
    joinDate: '2022-02-05'
  },
  { 
    id: '5', 
    name: '"Эрдэнэт Далай" ХХК', 
    email: 'info@erdendalai.mn', 
    phone: '7744-5566', 
    accountType: 'Байгууллага',
    accounts: 2,
    status: 'active',
    joinDate: '2021-12-15'
  },
  { 
    id: '6', 
    name: 'Мягмар Лхагва', 
    email: 'myagmar@example.mn', 
    phone: '9900-1122', 
    accountType: 'Иргэн',
    accounts: 1,
    status: 'active',
    joinDate: '2022-07-30'
  },
  { 
    id: '7', 
    name: 'Номин Сувдаа', 
    email: 'nomin@example.mn', 
    phone: '9933-4455', 
    accountType: 'Иргэн',
    accounts: 2,
    status: 'active',
    joinDate: '2022-08-05'
  },
  { 
    id: '8', 
    name: '"Сүүн" ХК', 
    email: 'info@suun.mn', 
    phone: '7700-8899', 
    accountType: 'Байгууллага',
    accounts: 4,
    status: 'active',
    joinDate: '2021-11-20'
  }
];

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Filter customers based on search and filters
  const filteredCustomers = mockCustomers.filter(customer => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm);
    
    const matchesType = 
      filterType === 'all' || 
      (filterType === 'individual' && customer.accountType === 'Иргэн') ||
      (filterType === 'organization' && customer.accountType === 'Байгууллага');
    
    const matchesStatus = 
      filterStatus === 'all' || 
      customer.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Харилцагчид</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Нийт харилцагчдын жагсаалт болон мэдээлэл
          </p>
        </div>
        <Link
          href="/dashboard/customers/new"
          className="mt-4 sm:mt-0 inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          <PlusIcon className="mr-2 h-5 w-5" />
          Шинэ харилцагч
        </Link>
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
                placeholder="Харилцагч хайх..."
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
              <option value="individual">Иргэн</option>
              <option value="organization">Байгууллага</option>
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

      {/* Customers table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Харилцагчийн нэр
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Холбоо барих
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Төрөл
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Данс
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Төлөв
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Бүртгүүлсэн
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Үйлдэл
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                    Харилцагч олдсонгүй
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{customer.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">{customer.email}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{customer.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">{customer.accountType}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">{customer.accounts} данс</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                        customer.status === 'active' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}>
                        {customer.status === 'active' ? 'Идэвхтэй' : 'Идэвхгүй'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(customer.joinDate).toLocaleDateString('mn-MN')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Link
                          href={`/dashboard/customers/${customer.id}`}
                          className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                          title="Дэлгэрэнгүй"
                        >
                          <EyeIcon className="h-5 w-5" />
                        </Link>
                        <Link
                          href={`/dashboard/customers/${customer.id}/edit`}
                          className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                          title="Засах"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </Link>
                        <button
                          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                          title="Устгах"
                          onClick={() => {
                            if (confirm('Энэ харилцагчийг устгахдаа итгэлтэй байна уу?')) {
                              console.log('Устгах харилцагч:', customer.id);
                              // Implement delete functionality in real app
                            }
                          }}
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
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
              Нийт <span className="font-medium">{filteredCustomers.length}</span> харилцагч
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