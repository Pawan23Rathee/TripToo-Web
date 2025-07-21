import React from 'react';
import {
  LayoutDashboard,
  Users,
  Package,
  BarChart3,
  ShoppingBag,
  MessageSquare,
  Mail,
  Settings,
  ChevronLeft,
  ChevronRight,
  Plane,
  X
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeSection,
  setActiveSection,
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
}) => {
  const { theme } = useTheme();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'products', label: 'Product Management', icon: Package },
    { id: 'analytics', label: 'Sales Analytics', icon: BarChart3 },
    { id: 'orders', label: 'Orders Panel', icon: ShoppingBag },
    { id: 'reviews', label: 'Reviews & Feedback', icon: MessageSquare },
    { id: 'email-reports', label: 'Email Reports', icon: Mail },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleMenuClick = (sectionId: string) => {
    setActiveSection(sectionId);
    // Close mobile menu when item is selected
    if (window.innerWidth < 1024) {
      setMobileOpen(false);
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
      
      <div
        className={`fixed left-0 top-0 h-full transition-all duration-300 z-50 ${
          collapsed ? 'w-16' : 'w-64'
        } ${
          theme === 'dark'
            ? 'bg-gray-800 border-gray-700'
            : 'bg-white border-gray-200'
        } border-r shadow-lg ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Mobile close button */}
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 lg:hidden"
        >
          <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>

      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="bg-blue-500 p-2 rounded-lg">
              <Plane className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-800 dark:text-white">
              TripToo
            </span>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors hidden lg:block"
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          ) : (
            <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="mt-4 px-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => handleMenuClick(item.id)}
              className={`w-full flex items-center px-3 py-3 mb-1 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-blue-500 text-white shadow-md'
                  : `text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700`
              }`}
              title={collapsed ? item.label : ''}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && (
                <span className="ml-3 text-sm font-medium">{item.label}</span>
              )}
            </button>
          );
        })}
      </nav>
      </div>
    </>
  );
};


export default Sidebar