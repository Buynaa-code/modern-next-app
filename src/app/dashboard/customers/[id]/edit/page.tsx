'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

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
    address: 'Хан-Уул дүүрэг, 2-р хороо, Аполло-33 хороолол, 56A тоот'
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
    address: 'Чингэлтэй дүүрэг, 3-р хороо, Жаргалант хотхон, 112B тоот'
  }
];

export default function EditCustomerPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    accountType: 'Иргэн',
    status: 'active',
    address: ''
  });

  useEffect(() => {
    // In a real app, fetch from API. Here we simulate with mockCustomers
    const fetchCustomer = () => {
      setLoading(true);
      try {
        const foundCustomer = mockCustomers.find(c => c.id === params.id);
        if (foundCustomer) {
          setFormData({
            name: foundCustomer.name,
            email: foundCustomer.email,
            phone: foundCustomer.phone,
            accountType: foundCustomer.accountType,
            status: foundCustomer.status,
            address: foundCustomer.address
          });
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // In a real app, this would be an API call to update the customer
      // For demonstration, we'll just simulate a delay and redirect
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Updated customer data:', formData);
      
      router.push(`/dashboard/customers/${params.id}`);
      router.refresh();
    } catch (err) {
      console.error('Error updating customer:', err);
      setError('Харилцагчийн мэдээлэл шинэчлэх үед алдаа гарлаа. Дахин оролдоно уу.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error && !formData.name) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-xl text-center">
        <p className="text-red-700 dark:text-red-400">{error}</p>
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">
            Харилцагч засах
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            {formData.name} харилцагчийн мэдээллийг шинэчлэх
          </p>
        </div>
        <Link
          href={`/dashboard/customers/${params.id}`}
          className="inline-flex items-center rounded-lg border border-blue-100 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 shadow-sm transition-colors"
        >
          <ArrowLeftIcon className="mr-2 h-5 w-5 text-gray-500 dark:text-gray-400" />
          Буцах
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-blue-50 dark:border-gray-700 p-6 max-w-3xl">
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

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Харилцагчийн нэр <span className="text-red-500">*</span>
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2.5 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Нэр эсвэл байгууллагын нэр"
                />
              </div>
            </div>

            <div>
              <label htmlFor="accountType" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Харилцагчийн төрөл <span className="text-red-500">*</span>
              </label>
              <div className="mt-1">
                <select
                  id="accountType"
                  name="accountType"
                  required
                  value={formData.accountType}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2.5 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="Иргэн">Иргэн</option>
                  <option value="Байгууллага">Байгууллага</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                И-мэйл хаяг <span className="text-red-500">*</span>
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2.5 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="example@example.mn"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Утасны дугаар <span className="text-red-500">*</span>
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2.5 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="9911-2233"
                />
              </div>
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Төлөв
              </label>
              <div className="mt-1">
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2.5 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="active">Идэвхтэй</option>
                  <option value="inactive">Идэвхгүй</option>
                </select>
              </div>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Хаяг
              </label>
              <div className="mt-1">
                <textarea
                  id="address"
                  name="address"
                  rows={3}
                  value={formData.address}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2.5 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Хаяг"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-blue-100 dark:border-gray-700 pt-6">
            <div className="flex justify-end space-x-3">
              <Link
                href={`/dashboard/customers/${params.id}`}
                className="inline-flex items-center rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 shadow-sm transition-colors"
              >
                Цуцлах
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center rounded-lg border border-transparent bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-2.5 text-sm font-medium text-white hover:from-blue-700 hover:to-blue-800 focus:outline-none shadow-sm disabled:opacity-50 transition-all duration-200"
              >
                {isSubmitting ? 'Хадгалж байна...' : 'Мэдээлэл хадгалах'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
} 