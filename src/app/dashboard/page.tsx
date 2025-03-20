import { Suspense } from 'react';
import { 
  ArrowUpIcon, 
  ArrowDownIcon, 
  UserGroupIcon, 
  BanknotesIcon,
  ChartBarIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';

// Dummy data for statistics
const stats = {
  totalAccounts: '12,853',
  activeAccounts: '10,246',
  totalCustomers: '8,492',
  totalTransactions: '320,459',
  totalDeposits: '₮ 2,458,986,500',
  totalWithdrawals: '₮ 1,245,986,200',
  recentTransactions: [
    { id: 1, customer: 'Б. Болд', type: 'deposit', amount: '₮ 250,000', date: '2023-03-19 14:30' },
    { id: 2, customer: 'Д. Сувд', type: 'withdrawal', amount: '₮ 150,000', date: '2023-03-19 12:20' },
    { id: 3, customer: 'Н. Батаа', type: 'deposit', amount: '₮ 500,000', date: '2023-03-19 11:05' },
    { id: 4, customer: 'С. Оюунаа', type: 'transfer', amount: '₮ 300,000', date: '2023-03-19 10:45' },
  ]
};

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="pb-2 border-b border-blue-100 dark:border-gray-700">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">
          Хяналтын самбар
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Банкны үйл ажиллагааны ерөнхий мэдээлэл
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard 
          title="Нийт данс" 
          value={stats.totalAccounts} 
          icon={<BanknotesIcon className="h-6 w-6 text-white" />}
          description="Бүртгэлтэй нийт данс"
          iconBg="from-blue-500 to-blue-600"
        />
        <StatCard 
          title="Идэвхтэй данс" 
          value={stats.activeAccounts} 
          icon={<BanknotesIcon className="h-6 w-6 text-white" />}
          description="Идэвхтэй дансны тоо"
          iconBg="from-green-500 to-green-600"
        />
        <StatCard 
          title="Нийт харилцагч" 
          value={stats.totalCustomers} 
          icon={<UserGroupIcon className="h-6 w-6 text-white" />}
          description="Бүртгэлтэй нийт харилцагч"
          iconBg="from-purple-500 to-purple-600"
        />
        <StatCard 
          title="Нийт гүйлгээ" 
          value={stats.totalTransactions} 
          icon={<ChartBarIcon className="h-6 w-6 text-white" />}
          description="Хийгдсэн нийт гүйлгээний тоо"
          iconBg="from-amber-500 to-amber-600"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-blue-50 dark:border-gray-700 overflow-hidden">
          <div className="px-6 pt-5 pb-4 border-b border-blue-50 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
              <CurrencyDollarIcon className="h-6 w-6 mr-2 text-blue-500 dark:text-blue-400" />
              Мөнгөн хөдөлгөөн
            </h2>
          </div>
          <div className="p-6 space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-blue-50 dark:border-gray-700">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-green-100 dark:bg-green-900 mr-3">
                  <ArrowUpIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Нийт орлого</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Сүүлийн 30 хоног</p>
                </div>
              </div>
              <span className="text-lg font-bold text-green-600 dark:text-green-400">{stats.totalDeposits}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-red-100 dark:bg-red-900 mr-3">
                  <ArrowDownIcon className="h-5 w-5 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Нийт зарлага</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Сүүлийн 30 хоног</p>
                </div>
              </div>
              <span className="text-lg font-bold text-red-600 dark:text-red-400">{stats.totalWithdrawals}</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-blue-50 dark:border-gray-700 overflow-hidden">
          <div className="px-6 pt-5 pb-4 border-b border-blue-50 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
              <ChartBarIcon className="h-6 w-6 mr-2 text-blue-500 dark:text-blue-400" />
              Хамгийн их гүйлгээ хийгдсэн салбарууд
            </h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center">
              <div className="w-full">
                <div className="flex justify-between mb-1.5">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Сүхбаатар дүүрэг</span>
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400">58%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5 dark:bg-gray-700">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2.5 rounded-full" style={{ width: '58%' }}></div>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-full">
                <div className="flex justify-between mb-1.5">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Чингэлтэй дүүрэг</span>
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400">25%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5 dark:bg-gray-700">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2.5 rounded-full" style={{ width: '25%' }}></div>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-full">
                <div className="flex justify-between mb-1.5">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Баянзүрх дүүрэг</span>
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400">17%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5 dark:bg-gray-700">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2.5 rounded-full" style={{ width: '17%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-blue-50 dark:border-gray-700 overflow-hidden">
        <div className="px-6 py-5 border-b border-blue-50 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
            <ArrowUpIcon className="h-6 w-6 mr-2 text-blue-500 dark:text-blue-400" />
            Сүүлийн гүйлгээнүүд
          </h2>
        </div>
        <Suspense fallback={<div className="p-6 text-center text-gray-500 dark:text-gray-400">Гүйлгээний мэдээлэл ачааллаж байна...</div>}>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-blue-50 dark:divide-gray-700">
              <thead className="bg-blue-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3.5 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Харилцагч
                  </th>
                  <th scope="col" className="px-6 py-3.5 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Төрөл
                  </th>
                  <th scope="col" className="px-6 py-3.5 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Дүн
                  </th>
                  <th scope="col" className="px-6 py-3.5 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Огноо
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-blue-50 dark:bg-gray-800 dark:divide-gray-700">
                {stats.recentTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-blue-50 dark:hover:bg-gray-700/50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {transaction.customer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {transaction.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {transaction.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Suspense>
      </div>
    </div>
  );
}

function StatCard({ 
  title, 
  value, 
  description, 
  icon, 
  iconBg 
}: { 
  title: string; 
  value: string; 
  description: string; 
  icon: React.ReactNode;
  iconBg: string;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-blue-50 dark:border-gray-700 p-6 relative overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        <div className={`p-2 rounded-lg bg-gradient-to-r ${iconBg} shadow-sm`}>
          {icon}
        </div>
      </div>
      <p className="text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{description}</p>
      <div className="absolute bottom-0 right-0 w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-tl-full opacity-20"></div>
    </div>
  );
} 