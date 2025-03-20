'use client';

import { useEffect, useState } from 'react';
import { ItemForm } from '@/components/forms/ItemForm';
import { useParams } from 'next/navigation';

// Mock data for demonstration
const mockItems = [
  { id: '1', title: 'Complete project proposal', description: 'Finish the documentation for the new project', status: 'active' },
  { id: '2', title: 'Schedule team meeting', description: 'Set up weekly sync for project status updates', status: 'completed' },
  { id: '3', title: 'Research new technologies', description: 'Look into the latest frameworks for our next project', status: 'active' },
];

export default function EditItemPage() {
  const params = useParams();
  const id = params.id as string;
  const [item, setItem] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // In a real app, you would fetch the item from an API
    // For demo purposes, we'll use our mock data
    setIsLoading(true);
    try {
      const foundItem = mockItems.find(item => item.id === id);
      if (foundItem) {
        setItem(foundItem);
      } else {
        setError('Item not found');
      }
    } catch (err) {
      console.error('Error fetching item:', err);
      setError('Failed to load item');
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center p-12">
        <p className="text-gray-500 dark:text-gray-400">Loading item...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  if (!item) {
    return (
      <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
        Item not found
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Edit Item</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Update item details
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <ItemForm initialData={item} isEditing={true} />
      </div>
    </div>
  );
} 