import React from 'react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
  CalendarDaysIcon,
  CalendarIcon,
  Squares2X2Icon,
} from '@heroicons/react/24/outline';
import { useCalendar } from '../../../contexts/CalendarContext';

/**
 * Calendar Header Component
 * Navigation, view toggle, and add event button
 */
export const CalendarHeader = () => {
  const {
    currentDate,
    view,
    setView,
    navigateDate,
    goToToday,
    setIsEventModalOpen,
  } = useCalendar();

  const views = [
    { id: 'day', label: 'Day', icon: CalendarIcon },
    { id: 'week', label: 'Week', icon: CalendarDaysIcon },
    { id: 'month', label: 'Month', icon: Squares2X2Icon },
  ];

  const formatDateRange = () => {
    const date = new Date(currentDate);
    if (view === 'day') {
      return format(date, 'EEEE, MMMM d, yyyy');
    } else if (view === 'week') {
      const start = new Date(date);
      start.setDate(start.getDate() - start.getDay());
      const end = new Date(start);
      end.setDate(end.getDate() + 6);
      return `${format(start, 'MMM d')} - ${format(end, 'MMM d, yyyy')}`;
    } else {
      return format(date, 'MMMM yyyy');
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      {/* Title and Navigation */}
      <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto">
        <button
          onClick={() => navigateDate(-1)}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Previous"
        >
          <ChevronLeftIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
        </button>
        
        <button
          onClick={goToToday}
          className="px-3 sm:px-4 py-1.5 sm:py-2 text-sm font-medium bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          Today
        </button>
        
        <button
          onClick={() => navigateDate(1)}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Next"
        >
          <ChevronRightIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
        </button>
        
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white ml-2">
          {formatDateRange()}
        </h2>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-2 w-full sm:w-auto justify-between sm:justify-end">
        {/* View Toggle */}
        <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
          {views.map((v) => {
            const Icon = v.icon;
            const isActive = view === v.id;
            return (
              <button
                key={v.id}
                onClick={() => setView(v.id)}
                className={`
                  flex items-center space-x-1 px-2 sm:px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium
                  transition-all duration-200
                  ${isActive
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }
                `}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{v.label}</span>
              </button>
            );
          })}
        </div>

        {/* Add Event Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsEventModalOpen(true)}
          className="flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
        >
          <PlusIcon className="h-4 w-4 sm:h-5 sm:w-5" />
          <span className="hidden sm:inline">Add Event</span>
          <span className="sm:hidden">Add</span>
        </motion.button>
      </div>
    </div>
  );
};