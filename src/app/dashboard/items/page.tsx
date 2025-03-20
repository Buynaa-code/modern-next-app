'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PlusIcon, PencilIcon, TrashIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

// Mock data for demonstration
const mockItems = [
  { id: '1', title: 'Complete project proposal', description: 'Finish the documentation for the new project', status: 'active' },
  { id: '2', title: 'Schedule team meeting', description: 'Set up weekly sync for project status updates', status: 'completed' },
  { id: '3', title: 'Research new technologies', description: 'Look into the latest frameworks for our next project', status: 'active' },
];

export default function ItemsPage() {
  const [items, setItems] = useState(mockItems);
  const [filter, setFilter] = useState('all');

  const filteredItems = items.filter(item => {
    if (filter === 'all') return true;
    return item.status === filter;
  });

  const handleStatusChange = (id: string, newStatus: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, status: newStatus } : item
    ));
  };

  const handleDelete = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Items</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage your items and their statuses
          </p>
        </div>
        <Link
          href="/dashboard/items/new"
          className="mt-4 sm:mt-0 inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500"
        >
          <PlusIcon className="mr-2 h-5 w-5" />
          New Item
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="border-b border-gray-200 dark:border-gray-700 px-4 py-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">
              Your Items
            </h2>
            <div className="mt-3 sm:mt-0 flex space-x-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1 text-sm rounded-md ${
                  filter === 'all'
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('active')}
                className={`px-3 py-1 text-sm rounded-md ${
                  filter === 'active'
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200'
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setFilter('completed')}
                className={`px-3 py-1 text-sm rounded-md ${
                  filter === 'completed'
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200'
                }`}
              >
                Completed
              </button>
            </div>
          </div>
        </div>

        {filteredItems.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-gray-500 dark:text-gray-400">No items found with the selected filter.</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredItems.map((item) => (
              <li key={item.id} className="p-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-medium text-gray-900 dark:text-white truncate">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {item.description}
                    </p>
                    <p className="mt-1 text-xs">
                      <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                        item.status === 'completed' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                          : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      }`}>
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </span>
                    </p>
                  </div>
                  <div className="ml-4 flex-shrink-0 flex space-x-2">
                    {item.status === 'active' ? (
                      <button
                        onClick={() => handleStatusChange(item.id, 'completed')}
                        className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                        title="Mark as completed"
                      >
                        <CheckIcon className="h-5 w-5" />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleStatusChange(item.id, 'active')}
                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                        title="Mark as active"
                      >
                        <XMarkIcon className="h-5 w-5" />
                      </button>
                    )}
                    <Link
                      href={`/dashboard/items/${item.id}`}
                      className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
                      title="Edit item"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </Link>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                      title="Delete item"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
} 