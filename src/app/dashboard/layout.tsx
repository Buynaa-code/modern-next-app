import { Sidebar } from '@/components/layout/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="w-72 hidden md:flex">
        <Sidebar />
      </div>
      <main className="flex-1 overflow-y-auto p-8 bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 shadow-inner">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
} 