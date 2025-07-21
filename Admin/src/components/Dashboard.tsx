import React from 'react';
import {
  Users,
  Package,
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Star,
  AlertTriangle,
  Activity
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const stats = [
    {
      title: 'Total Users',
      value: '12,345',
      icon: Users,
      change: '+12%',
      positive: true,
    },
    {
      title: 'Total Products',
      value: '1,234',
      icon: Package,
      change: '+8%',
      positive: true,
    },
    {
      title: 'Total Revenue',
      value: '₹4,56,789',
      icon: DollarSign,
      change: '+15%',
      positive: true,
    },
    {
      title: 'Total Orders',
      value: '8,901',
      icon: ShoppingBag,
      change: '+23%',
      positive: true,
    },
  ];

  const recentOrders = [
    { id: '#12345', customer: 'John Doe', amount: '₹2,499', status: 'Shipped' },
    { id: '#12346', customer: 'Jane Smith', amount: '₹1,899', status: 'Pending' },
    { id: '#12347', customer: 'Mike Johnson', amount: '₹3,299', status: 'Delivered' },
    { id: '#12348', customer: 'Sarah Wilson', amount: '₹1,599', status: 'Processing' },
  ];

  const lowStockProducts = [
    { name: 'Travel Toiletry Bag', stock: 3, category: 'Organizers' },
    { name: 'Portable Charger Kit', stock: 2, category: 'Electronics' },
    { name: 'Travel Pillow Set', stock: 4, category: 'Comfort' },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.title}
                  </p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mt-1">
                    {stat.value}
                  </p>
                </div>
                <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
                  <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <span
                  className={`text-sm font-medium ${
                    stat.positive ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {stat.change}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                  from last month
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts and Tables Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
        {/* Revenue Chart */}
        <div className="xl:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
              Revenue Overview
            </h3>
            <div className="flex space-x-1 sm:space-x-2">
              <button className="px-3 py-1 text-xs bg-blue-100 text-blue-600 rounded-lg">
                7 Days
              </button>
              <button className="px-3 py-1 text-xs text-gray-500 rounded-lg">
                30 Days
              </button>
            </div>
          </div>
          <div className="h-48 sm:h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-lg">
            <TrendingUp className="w-16 h-16 text-gray-400" />
            <span className="ml-2 text-gray-500">Revenue Chart Placeholder</span>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Top Products
          </h3>
          <div className="space-y-4">
            {['Travel Kit Premium', 'Organizer Set', 'Comfort Pack', 'Tech Bundle'].map(
              (product, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {product}
                    </p>
                    <div className="flex items-center mt-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-xs text-gray-500 ml-1">4.8</span>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    ₹{(2500 - index * 200).toLocaleString()}
                  </span>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* Recent Orders and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Recent Orders */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
              Recent Orders
            </h3>
            <button className="text-sm text-blue-600 hover:text-blue-700">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentOrders.map((order, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {order.id}
                  </p>
                  <p className="text-xs text-gray-500">{order.customer}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {order.amount}
                  </p>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      order.status === 'Delivered'
                        ? 'bg-green-100 text-green-600'
                        : order.status === 'Shipped'
                        ? 'bg-blue-100 text-blue-600'
                        : order.status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-600'
                        : 'bg-purple-100 text-purple-600'
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
          <div className="flex items-center mb-4">
            <AlertTriangle className="w-5 h-5 text-orange-500 mr-2" />
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
              Low Stock Alert
            </h3>
          </div>
          <div className="space-y-4">
            {lowStockProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {product.name}
                  </p>
                  <p className="text-xs text-gray-500">{product.category}</p>
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-medium text-orange-600 mr-2">
                    {product.stock} left
                  </span>
                  <Activity className="w-4 h-4 text-orange-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard