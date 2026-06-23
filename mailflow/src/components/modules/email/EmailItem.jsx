import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { motion } from 'framer-motion';
import { StarIcon as StarOutline } from '@heroicons/react/24/outline';
import { StarIcon as StarSolid } from '@heroicons/react/24/solid';
import { PaperClipIcon } from '@heroicons/react/24/outline';
import { useEmail } from '../../../contexts/EmailContext';

/**
 * Individual Email Item Component
 * Displays sender, subject, preview, date, and status indicators
 */
export const EmailItem = ({ email, onSelect, isSelected }) => {
  const { markAsRead, toggleStar, setSelectedEmail } = useEmail();

  const handleClick = () => {
    if (!email.isRead) {
      markAsRead(email.id, true);
    }
    setSelectedEmail(email);
  };

  const handleStar = (e) => {
    e.stopPropagation();
    // Call toggleStar directly - it now handles both email list and selected email
    toggleStar(email.id);
  };

  const handleCheckbox = (e) => {
    e.stopPropagation();
    onSelect(email.id);
  };

  // Format date safely
  const formatDate = (timestamp) => {
    try {
      return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
    } catch (error) {
      return 'Unknown date';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`
        flex items-center px-4 py-3 border-b border-gray-100 dark:border-gray-700 
        hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-all duration-200
        ${!email.isRead ? 'bg-blue-50 dark:bg-blue-900/10' : ''}
        ${isSelected ? 'bg-primary-50 dark:bg-primary-900/20' : ''}
      `}
      onClick={handleClick}
    >
      {/* Checkbox */}
      <div className="mr-3 shrink-0">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={handleCheckbox}
          className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
          onClick={(e) => e.stopPropagation()}
        />
      </div>

      {/* Star */}
      <button
        onClick={handleStar}
        className="mr-3 shrink-0 focus:outline-none transition-colors"
        aria-label={email.isStarred ? 'Unstar email' : 'Star email'}
      >
        {email.isStarred ? (
          <StarSolid className="h-4 w-4 text-yellow-400 hover:text-yellow-500 transition-colors" />
        ) : (
          <StarOutline className="h-4 w-4 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors" />
        )}
      </button>

      {/* Sender */}
      <div className="w-32 sm:w-40 shrink-0 truncate">
        <span className={`text-sm ${!email.isRead ? 'font-semibold text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}>
          {email.sender?.name || 'Unknown Sender'}
        </span>
      </div>

      {/* Subject & Preview */}
      <div className="flex-1 min-w-0 mx-3">
        <div className="flex items-center space-x-2">
          <span className={`text-sm truncate ${!email.isRead ? 'font-semibold text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
            {email.subject || 'No Subject'}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400 truncate hidden sm:inline">
            - {email.preview || ''}
          </span>
        </div>
        {/* Mobile preview */}
        <p className="text-xs text-gray-500 dark:text-gray-400 truncate sm:hidden mt-0.5">
          {email.preview || ''}
        </p>
      </div>

      {/* Attachment Indicator */}
      {email.hasAttachments && (
        <div className="mr-3 shrink-0 hidden sm:block">
          <PaperClipIcon className="h-4 w-4 text-gray-400 dark:text-gray-500" />
        </div>
      )}

      {/* Date */}
      <div className="shrink-0 text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
        {formatDate(email.timestamp)}
      </div>
    </motion.div>
  );
};