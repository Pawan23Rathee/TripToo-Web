import React, { useState } from 'react';
import {
  Mail,
  Calendar,
  Clock,
  Bell,
  Settings,
  Send,
  Users,
  Package,
  TrendingDown,
  Star
} from 'lucide-react';

const EmailReports: React.FC = () => {
  const [reportFrequency, setReportFrequency] = useState('weekly');
  const [adminEmail, setAdminEmail] = useState('admin@triptoo.com');
  const [notifications, setNotifications] = useState({
    lowStock: true,
    newOrder: true,
    negativeReview: true,
    weeklyReport: true,
    monthlyReport: false,
  });

  const reportTypes = [
    {
      id: 'sales',
      title: 'Sales Report',
      description: 'Comprehensive sales data and revenue analytics',
      icon: TrendingDown,
      lastSent: '2024-01-15',
      status: 'active'
    },
    {
      id: 'inventory',
      title: 'Inventory Report',
      description: 'Stock levels and low inventory alerts',
      icon: Package,
      lastSent: '2024-01-14',
      status: 'active'
    },
    {
      id: 'customer',
      title: 'Customer Report',
      description: 'New registrations and customer analytics',
      icon: Users,
      lastSent: '2024-01-13',
      status: 'paused'
    },
    {
      id: 'reviews',
      title: 'Reviews Report',
      description: 'Customer feedback and ratings summary',
      icon: Star,
      lastSent: '2024-01-12',
      status: 'active'
    }
  ];

  const recentReports = [
    {
      id: 1,
      type: 'Weekly Sales Report',
      date: '2024-01-15',
      status: 'sent',
      recipients: ['admin@triptoo.com', 'manager@triptoo.com']
    },
    {
      id: 2,
      type: 'Low Stock Alert',
      date: '2024-01-14',
      status: 'sent',
      recipients: ['admin@triptoo.com']
    },
    {
      id: 3,
      type: 'Monthly Customer Report',
      date: '2024-01-01',
      status: 'sent',
      recipients: ['admin@triptoo.com', 'manager@triptoo.com']
    }
  ];

  const handleNotificationToggle = (key: string) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSendTestEmail = () => {
    console.log('Sending test email...');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Email Reports & Notifications
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Configure automated reports and notification settings
          </p>
        </div>
        <button
          onClick={handleSendTestEmail}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Send className="w-4 h-4 mr-2" />
          Send Test Email
        </button>
      </div>

      {/* Email Configuration */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        {/* Report Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
          <div className="flex items-center mb-4">
            <Settings className="w-5 h-5 text-gray-600 dark:text-gray-300 mr-2" />
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
              Report Settings
            </h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Admin Email Address
              </label>
              <input
                type="email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Report Frequency
              </label>
              <select
                value={reportFrequency}
                onChange={(e) => setReportFrequency(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Next Report
              </label>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <Calendar className="w-4 h-4 mr-2" />
                Monday, January 22, 2024 at 9:00 AM
              </div>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
          <div className="flex items-center mb-4">
            <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300 mr-2" />
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
              Notification Settings
            </h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Low Stock Alerts
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  When inventory falls below 5 items
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.lowStock}
                  onChange={() => handleNotificationToggle('lowStock')}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  New Order Notifications
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Immediate alerts for new orders
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.newOrder}
                  onChange={() => handleNotificationToggle('newOrder')}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Negative Review Alerts
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Alerts for reviews with 2 stars or less
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.negativeReview}
                  onChange={() => handleNotificationToggle('negativeReview')}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Weekly Reports
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Comprehensive weekly summary
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.weeklyReport}
                  onChange={() => handleNotificationToggle('weeklyReport')}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Report Types */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Available Reports
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {reportTypes.map((report) => {
            const Icon = report.icon;
            return (
              <div
                key={report.id}
                className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center">
                    <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg mr-3">
                      <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                        {report.title}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {report.description}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      report.status === 'active'
                        ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-200'
                        : 'bg-gray-100 text-gray-600 dark:bg-gray-900 dark:text-gray-200'
                    }`}
                  >
                    {report.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>Last sent: {report.lastSent}</span>
                  <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400">
                    Configure
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
            Recent Reports
          </h3>
          <button className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400">
            View All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-600 dark:text-gray-300">
                  Report Type
                </th>
                <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-600 dark:text-gray-300 hidden sm:table-cell">
                  Date Sent
                </th>
                <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-600 dark:text-gray-300 hidden md:table-cell">
                  Status
                </th>
                <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-600 dark:text-gray-300 hidden lg:table-cell">
                  Recipients
                </th>
                <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-600 dark:text-gray-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {recentReports.map((report) => (
                <tr
                  key={report.id}
                  className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <td className="py-3 px-2 sm:px-4">
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {report.type}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 sm:hidden">
                      {report.date}
                    </div>
                  </td>
                  <td className="py-3 px-2 sm:px-4 hidden sm:table-cell">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <Clock className="w-4 h-4 mr-1" />
                      {report.date}
                    </div>
                  </td>
                  <td className="py-3 px-2 sm:px-4 hidden md:table-cell">
                    <span className="px-2 py-1 text-xs bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-200 rounded-full">
                      {report.status}
                    </span>
                  </td>
                  <td className="py-3 px-2 sm:px-4 hidden lg:table-cell">
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {report.recipients.length} recipient{report.recipients.length > 1 ? 's' : ''}
                    </span>
                  </td>
                  <td className="py-3 px-2 sm:px-4">
                    <button className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400">
                      View
                    </button>
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

export default EmailReports