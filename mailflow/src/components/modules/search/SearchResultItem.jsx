import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { motion } from 'framer-motion';
import {
  EnvelopeIcon,
  UserIcon,
  ClipboardDocumentListIcon,
  CalendarIcon,
  StarIcon,
} from '@heroicons/react/24/outline';
import { TASK_PRIORITIES } from '../../../utils/constants';

/**
 * Individual Search Result Item
 */
export const SearchResultItem = ({ result, isSelected, onClick }) => {
  const getIcon = () => {
    switch (result.type) {
      case 'email':
        return <EnvelopeIcon className="h-5 w-5 text-primary-500" />;
      case 'contact':
        return <UserIcon className="h-5 w-5 text-green-500" />;
      case 'task':
        return <ClipboardDocumentListIcon className="h-5 w-5 text-orange-500" />;
      case 'event':
        return <CalendarIcon className="h-5 w-5 text-purple-500" />;
      default:
        return null;
    }
  };

  const getTypeLabel = () => {
    switch (result.type) {
      case 'email':
        return 'Email';
      case 'contact':
        return 'Contact';
      case 'task':
        return 'Task';
      case 'event':
        return 'Event';
      default:
        return '';
    }
  };

  const getPriorityColor = (priority) => {
    const p = TASK_PRIORITIES.find(p => p.id === priority);
    return p ? p.textColor : '';
  };

  const formatTime = (date) => {
    try {
      return formatDistanceToNow(new Date(date), { addSuffix: true });
    } catch {
      return '';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15 }}
      onClick={onClick}
      className={`
        flex items-start p-3 rounded-lg cursor-pointer transition-all duration-200
        ${isSelected 
          ? 'bg-primary-50 dark:bg-primary-900/20' 
          : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
        }
      `}
    >
      {/* Icon */}
      <div className="mr-3 mt-0.5">
        {getIcon()}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
            {result.title}
          </h4>
          <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full whitespace-nowrap">
            {getTypeLabel()}
          </span>
        </div>
        
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">
          {result.description}
        </p>

        {/* Additional info */}
        <div className="flex flex-wrap items-center gap-2 mt-1.5">
          {result.type === 'email' && result.sender && (
            <span className="text-xs text-gray-400 dark:text-gray-500">
              From: {result.sender}
            </span>
          )}
          
          {result.type === 'contact' && result.company && (
            <span className="text-xs text-gray-400 dark:text-gray-500">
              {result.company}
            </span>
          )}
          
          {result.type === 'task' && result.priority && (
            <span className={`text-xs font-medium ${getPriorityColor(result.priority)}`}>
              {result.priority.toUpperCase()}
            </span>
          )}
          
          {result.type === 'task' && result.dueDate && (
            <span className="text-xs text-gray-400 dark:text-gray-500">
              Due: {formatTime(result.dueDate)}
            </span>
          )}
          
          {result.type === 'event' && result.date && (
            <span className="text-xs text-gray-400 dark:text-gray-500">
              {formatTime(result.date)}
            </span>
          )}
          
          {result.timestamp && (
            <span className="text-xs text-gray-400 dark:text-gray-500">
              {formatTime(result.timestamp)}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};