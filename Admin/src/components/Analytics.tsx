import React, { useState } from 'react';
import {
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Target,
  Calendar,
  Download
} from 'lucide-react';

const Analytics: React.FC = () => {
  const [dateRange, setDateRange] = useState('30days');

  const kpiData = [
    {
      title: 'Total Revenue',
      value: '₹4,56,789',
      change: '+15.2%',
      positive: true,
      icon: DollarSign,
    },
    {
      title: 'Total Orders',
      value: '8,901',
      change: '+23.1%',
      positive: true,
      icon: ShoppingBag,
    },
    {
      title: 'Average Order Value',
      value: '₹2,513',
      change: '+8.4%',
      positive: true,
      icon: Target,
    },
    {
      title: 'Total Profit',
      value: '₹1,23,456',
      change: '+12.7%',
      positive: true,
      icon: TrendingUp,
    },
  ];

  const topProducts = [
    { name: 'Premium Travel Kit', sales: 1250, revenue: '₹31,25,000' },
    { name: 'Tech Travel Bundle', sales: 890, revenue: '₹29,34,100' },
    { name: 'Comfort Travel Set', sales: 756, revenue: '₹14,35,440' },
    { name: 'Organizer Pro', sales: 654, revenue: '₹8,49,460' },
    { name: 'Basic Travel Kit', sales: 543, revenue: '₹6,51,600' },
  ];

  const categoryData = [
    { category: 'Travel Kits', percentage: 35, amount: '₹1,59,876' },
    { category: 'Electronics', percentage: 28, amount: '₹1,27,900' },
    { category: 'Organizers', percentage: 20, amount: '₹91,358' },
    { category: 'Comfort', percentage: 17, amount: '₹77,655' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Sales Analytics
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Comprehensive sales performance and revenue insights
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
            <option value="custom">Custom Range</option>
          </select>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {kpiData.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {kpi.title}
                  </p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mt-1">
                    {kpi.value}
                  </p>
                </div>
                <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
                  <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <span
                  className={`text-sm font-medium ${
                    kpi.positive ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {kpi.change}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                  from last period
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        {/* Revenue Trend Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
              Monthly Revenue Trends
            </h3>
            <Calendar className="w-5 h-5 text-gray-400" />
          </div>
          <div className="h-48 sm:h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-lg">
            <TrendingUp className="w-16 h-16 text-gray-400" />
            <span className="ml-2 text-gray-500">Line Chart Placeholder</span>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Jan</p>
              <p className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">₹3.2L</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Feb</p>
              <p className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">₹4.1L</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Mar</p>
              <p className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">₹4.6L</p>
            </div>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Sales by Category
          </h3>
          <div className="h-48 sm:h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-lg mb-4">
            <div className="text-center">
              <div className="w-24 h-24 sm:w-32 sm:h-32 bg-blue-200 rounded-full mx-auto mb-2"></div>
              <span className="text-gray-500">Pie Chart Placeholder</span>
            </div>
          </div>
          <div className="space-y-3">
            {categoryData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div
                    className={`w-3 h-3 rounded-full mr-3 ${
                      index === 0
                        ? 'bg-blue-500'
                        : index === 1
                        ? 'bg-green-500'
                        : index === 2
                        ? 'bg-yellow-500'
                        : 'bg-purple-500'
                    }`}
                  ></div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {item.category}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {item.percentage}%
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {item.amount}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Top 5 Best-Selling Products
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-600 dark:text-gray-300">
                  Rank
                </th>
                <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-600 dark:text-gray-300">
                  Product Name
                </th>
                <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-600 dark:text-gray-300 hidden sm:table-cell">
                  Sales Count
                </th>
                <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-600 dark:text-gray-300">
                  Revenue
                </th>
                <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-600 dark:text-gray-300 hidden md:table-cell">
                  Performance
                </th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((product, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <td className="py-3 px-2 sm:px-4">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      #{index + 1}
                    </span>
                  </td>
                  <td className="py-3 px-2 sm:px-4">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {product.name}
                    </span>
                    <div className="text-xs text-gray-500 dark:text-gray-400 sm:hidden">
                      {product.sales} sales
                    </div>
                  </td>
                  <td className="py-3 px-2 sm:px-4 hidden sm:table-cell">
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {product.sales}
                    </span>
                  </td>
                  <td className="py-3 px-2 sm:px-4">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {product.revenue}
                    </span>
                  </td>
                  <td className="py-3 px-2 sm:px-4 hidden md:table-cell">
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${100 - index * 15}%` }}
                      ></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analytics