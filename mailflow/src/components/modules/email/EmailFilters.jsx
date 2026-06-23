import React from 'react';
import { motion } from 'framer-motion';
import { useEmail } from '../../../contexts/EmailContext';

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'unread', label: 'Unread' },
  { id: 'starred', label: 'Starred' },
  { id: 'attachments', label: 'Attachments' },
];

/**
 * Email Filter Tabs Component
 */
export const EmailFilters = () => {
  const { currentFilter, setCurrentFilter, emails } = useEmail();

  const getCount = (filterId) => {
    if (filterId === 'all') return emails.length;
    if (filterId === 'unread') return emails.filter(e => !e.isRead).length;
    if (filterId === 'starred') return emails.filter(e => e.isStarred).length;
    if (filterId === 'attachments') return emails.filter(e => e.hasAttachments).length;
    return 0;
  };

  return (
    <div className="flex items-center space-x-1 sm:space-x-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl">
      {FILTERS.map((filter) => {
        const isActive = currentFilter === filter.id;
        const count = getCount(filter.id);

        return (
          <button
            key={filter.id}
            onClick={() => setCurrentFilter(filter.id)}
            className={`
              relative px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-lg
              transition-all duration-200
              ${isActive
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-gray-700/50'
              }
            `}
          >
            {isActive && (
              <motion.div
                layoutId="activeFilter"
                className="absolute inset-0 bg-white dark:bg-gray-700 rounded-lg shadow-sm"
                transition={{ type: 'spring', duration: 0.3 }}
              />
            )}
            <span className="relative flex items-center space-x-1.5">
              <span>{filter.label}</span>
              {count > 0 && (
                <span className={`
                  text-[10px] px-1.5 py-0.5 rounded-full
                  ${isActive 
                    ? 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                  }
                `}>
                  {count}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
};