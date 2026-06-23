import React from 'react';
import { motion } from 'framer-motion';
import { Cog6ToothIcon, UserIcon, BellIcon, ShieldCheckIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

export const SettingsPage = () => {
  const { isDark, toggleTheme } = useTheme();
  const { user } = useAuth();

  const settingsSections = [
    {
      id: 'profile',
      icon: UserIcon,
      title: 'Profile Settings',
      description: 'Manage your personal information',
    },
    {
      id: 'notifications',
      icon: BellIcon,
      title: 'Notifications',
      description: 'Configure notification preferences',
    },
    {
      id: 'security',
      icon: ShieldCheckIcon,
      title: 'Security',
      description: 'Manage security and privacy settings',
    },
    {
      id: 'email',
      icon: EnvelopeIcon,
      title: 'Email Preferences',
      description: 'Customize your email experience',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
      </div>

      {/* Theme Toggle */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">Theme</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              Switch between light and dark mode
            </p>
          </div>
          <button
            onClick={toggleTheme}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm font-medium"
          >
            {isDark ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {settingsSections.map((section) => {
          const Icon = section.icon;
          return (
            <div
              key={section.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow cursor-pointer group"
            >
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-primary-50 dark:bg-primary-900/20 rounded-lg group-hover:bg-primary-100 dark:group-hover:bg-primary-900/30 transition-colors">
                  <Icon className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    {section.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                    {section.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Account Info */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Account Information</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <img
              src={user?.avatar || 'https://ui-avatars.com/api/?name=User&background=2563eb&color=fff'}
              alt={user?.name || 'User'}
              className="h-12 w-12 rounded-full"
            />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">{user?.name || 'User'}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email || 'user@example.com'}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};