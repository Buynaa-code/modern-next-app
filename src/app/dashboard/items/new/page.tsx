import { ItemForm } from '@/components/forms/ItemForm';

export default function NewItemPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Create New Item</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Add a new item to your collection
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <ItemForm />
      </div>
    </div>
  );
} 