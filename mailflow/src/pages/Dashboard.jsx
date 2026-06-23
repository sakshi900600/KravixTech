// import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import {
  EnvelopeIcon,
  CalendarIcon,
  UserGroupIcon,
  ClipboardDocumentListIcon,
  ArrowTrendingUpIcon,
} from '@heroicons/react/24/outline';

/**
 * Dashboard Page
 * Shows overview of emails, calendar, contacts, tasks
 */
export const Dashboard = () => {
  const { user } = useAuth();

  // Mock stats
  const stats = [
    { id: 1, label: 'Unread Emails', value: '12', icon: EnvelopeIcon, color: 'primary' },
    { id: 2, label: 'Upcoming Events', value: '3', icon: CalendarIcon, color: 'purple' },
    { id: 3, label: 'Contacts', value: '156', icon: UserGroupIcon, color: 'green' },
    { id: 4, label: 'Pending Tasks', value: '8', icon: ClipboardDocumentListIcon, color: 'orange' },
  ];

  const recentEmails = [
    { id: 1, from: 'Sarah Johnson', subject: 'Weekly Team Meeting', time: '2 hours ago' },
    { id: 2, from: 'Michael Chen', subject: 'Project Update - Q4 Goals', time: '4 hours ago' },
    { id: 3, from: 'Emily Davis', subject: 'Design Review Feedback', time: 'Yesterday' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-6 sm:p-8 text-white"
      >
        <h1 className="text-2xl sm:text-3xl font-bold">
          Welcome back, {user?.name || 'User'}! 👋
        </h1>
        <p className="mt-1 text-primary-100">
          Here's what's happening with your productivity tools today.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const colorClasses = {
            primary: 'bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400',
            purple: 'bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
            green: 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400',
            orange: 'bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400',
          };

          return (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-xl ${colorClasses[stat.color]}`}>
                  <Icon className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-3 flex items-center text-xs text-green-600 dark:text-green-400">
                <ArrowTrendingUpIcon className="h-3 w-3 mr-1" />
                <span>+12% from last month</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Emails */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Recent Emails
          </h3>
          <div className="space-y-3">
            {recentEmails.map((email) => (
              <div key={email.id} className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors cursor-pointer">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {email.from}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                    {email.subject}
                  </p>
                </div>
                <span className="text-xs text-gray-400 dark:text-gray-500 ml-2 shrink-0">
                  {email.time}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-xl text-primary-600 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors text-sm font-medium">
              Compose Email
            </button>
            <button className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors text-sm font-medium">
              Add Event
            </button>
            <button className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors text-sm font-medium">
              New Contact
            </button>
            <button className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl text-orange-600 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors text-sm font-medium">
              Add Task
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};