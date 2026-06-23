import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MagnifyingGlassIcon,
  BellIcon,
  ArrowRightOnRectangleIcon,
  Cog6ToothIcon,
  SunIcon,
  MoonIcon,
  Bars3Icon,
} from '@heroicons/react/24/outline';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { useClickOutside } from '../../hooks/useClickOutside';
import { useSearch } from '../../contexts/SearchContext';

/**
 * Top Navigation Component
 * Features: Search Bar, Notifications, Profile, Dark/Light Toggle
 * Responsive: Adapts to all screen sizes
 */
export const TopNav = ({ onMenuClick }) => {
  const { theme, toggleTheme, isDark } = useTheme();
  const { user, logout } = useAuth();
  const { openSearch } = useSearch();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const profileRef = useRef(null);
  const notificationRef = useRef(null);

  // Click outside handlers
  useClickOutside(profileRef, () => setIsProfileOpen(false));
  useClickOutside(notificationRef, () => setIsNotificationsOpen(false));

  // Keyboard shortcut listener
  useEffect(() => {
    const handleGlobalShortcut = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        openSearch();
      }
    };

    document.addEventListener('keydown', handleGlobalShortcut);
    return () => document.removeEventListener('keydown', handleGlobalShortcut);
  }, [openSearch]);

  // Mock notifications
  const notifications = [
    { id: 1, title: 'New email from Sarah', time: '5 min ago', read: false },
    { id: 2, title: 'Meeting reminder: 2:00 PM', time: '1 hour ago', read: false },
    { id: 3, title: 'Task completed: Project report', time: '3 hours ago', read: true },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleSearchClick = () => {
    openSearch();
  };

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between px-4 h-16 sm:px-6">
        {/* Left Section - Menu Toggle & Logo (Mobile) */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors md:hidden"
            aria-label="Toggle menu"
          >
            <Bars3Icon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
          </button>
          
          {/* Mobile Logo */}
          <Link to="/dashboard" className="md:hidden">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-sm font-bold text-white">MF</span>
              </div>
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                MailFlow
              </span>
            </div>
          </Link>
        </div>

        {/* Center Section - Search Bar (Desktop) */}
        <div className="flex-1 max-w-2xl mx-4 hidden sm:block">
          <button
            onClick={handleSearchClick}
            className="w-full relative group"
          >
            <div className="flex items-center w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 
              bg-gray-50 dark:bg-gray-700/50
              text-gray-400 dark:text-gray-500
              hover:border-primary-400 dark:hover:border-primary-500
              transition-all duration-200"
            >
              <MagnifyingGlassIcon className="h-5 w-5 mr-3 text-gray-400 dark:text-gray-500 group-hover:text-primary-500 transition-colors" />
              <span className="text-sm">Search emails, contacts, tasks...</span>
              <kbd className="ml-auto px-2 py-0.5 text-xs font-mono 
                text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-600 rounded border 
                border-gray-200 dark:border-gray-500">
                ⌘K
              </kbd>
            </div>
          </button>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center space-x-1 sm:space-x-2">
          {/* Search (Mobile) */}
          <button
            onClick={handleSearchClick}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors sm:hidden"
            aria-label="Search"
          >
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
          </button>

          {/* Dark/Light Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? (
              <SunIcon className="h-5 w-5 text-yellow-400" />
            ) : (
              <MoonIcon className="h-5 w-5 text-gray-700" />
            )}
          </button>

          {/* Notifications */}
          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative"
              aria-label="Notifications"
            >
              <BellIcon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 h-4 w-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            <AnimatePresence>
              {isNotificationsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-72 sm:w-80 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
                >
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                      Notifications
                    </h3>
                  </div>
                  <div className="max-h-72 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">
                        No notifications
                      </div>
                    ) : (
                      notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className={`px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer ${
                            !notif.read ? 'bg-primary-50 dark:bg-primary-900/10' : ''
                          }`}
                        >
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {notif.title}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            {notif.time}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="p-3 border-t border-gray-200 dark:border-gray-700 text-center">
                    <button className="text-xs text-primary-600 dark:text-primary-400 hover:underline">
                      View all notifications
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User Profile */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-2 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="User profile"
            >
              <img
                src={user?.avatar || 'https://ui-avatars.com/api/?name=User&background=2563eb&color=fff'}
                alt={user?.name || 'User'}
                className="h-8 w-8 rounded-full ring-2 ring-primary-500/20"
              />
              <span className="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-300">
                {user?.name || 'User'}
              </span>
            </button>

            {/* Profile Dropdown */}
            <AnimatePresence>
              {isProfileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
                >
                  <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {user?.name || 'User'}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {user?.email || 'user@example.com'}
                    </p>
                  </div>
                  <div className="py-1">
                    <Link
                      to="/settings"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <Cog6ToothIcon className="h-4 w-4 mr-3" />
                      Settings
                    </Link>
                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        logout();
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      <ArrowRightOnRectangleIcon className="h-4 w-4 mr-3" />
                      Sign Out
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
};