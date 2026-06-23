import React from 'react';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import {
  XMarkIcon,
  StarIcon as StarOutline,
  StarIcon as StarSolid,
  EnvelopeIcon,
  EnvelopeOpenIcon,
  TrashIcon,
  ArchiveBoxIcon,
  PaperClipIcon,
  ArrowPathIcon,
  ArrowLeftIcon,
} from '@heroicons/react/24/outline';
import { useEmail } from '../../../contexts/EmailContext';

/**
 * Email Detail View Component - Popup/Modal Style
 * Fully scrollable with all actions visible
 */
export const EmailDetail = () => {
  const { selectedEmail, setSelectedEmail, markAsRead, toggleStar, deleteEmails, archiveEmails } = useEmail();

  if (!selectedEmail) return null;

  const { id, sender, subject, body, timestamp, isRead, isStarred, hasAttachments } = selectedEmail;

  const handleClose = () => setSelectedEmail(null);
  const handleMarkRead = () => markAsRead(id, !isRead);
  const handleStar = () => toggleStar(id);
  const handleDelete = () => {
    if (window.confirm('Delete this email?')) {
      deleteEmails([id]);
      handleClose();
    }
  };
  const handleArchive = () => {
    archiveEmails([id]);
    handleClose();
  };

  // Format date safely
  const formatDate = (date) => {
    try {
      return format(new Date(date), 'MMM d, yyyy h:mm a');
    } catch (error) {
      return 'Unknown date';
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', duration: 0.4 }}
          className="relative w-full max-w-3xl max-h-[95vh] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Fixed Header - Always visible */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 dark:border-gray-700 shrink-0 bg-gray-50 dark:bg-gray-800/50">
            <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
              <button
                onClick={handleClose}
                className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Close"
              >
                <XMarkIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </button>
              <h2 className="text-sm sm:text-base font-medium text-gray-900 dark:text-white truncate">
                {subject || 'No Subject'}
              </h2>
            </div>
            
            {/* Action Buttons - Fixed Header */}
            <div className="flex items-center space-x-0.5 sm:space-x-1 shrink-0">
              <button
                onClick={handleStar}
                className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label={isStarred ? 'Unstar email' : 'Star email'}
                title={isStarred ? 'Unstar' : 'Star'}
              >
                {isStarred ? (
                  <StarSolid className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400 hover:text-yellow-500 transition-colors" />
                ) : (
                  <StarOutline className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors" />
                )}
              </button>
              <button
                onClick={handleMarkRead}
                className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-400"
                aria-label={isRead ? 'Mark as unread' : 'Mark as read'}
                title={isRead ? 'Mark as unread' : 'Mark as read'}
              >
                {isRead ? (
                  <EnvelopeIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                ) : (
                  <EnvelopeOpenIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                )}
              </button>
              <button
                onClick={handleArchive}
                className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-400"
                aria-label="Archive"
                title="Archive"
              >
                <ArchiveBoxIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
              <button
                onClick={handleDelete}
                className="p-1.5 sm:p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors text-red-600 dark:text-red-400"
                aria-label="Delete"
                title="Delete"
              >
                <TrashIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </div>
          </div>

          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            {/* Sender & Date */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-0">
              <div className="flex items-center space-x-3 sm:space-x-4 w-full sm:w-auto">
                <img
                  src={`https://ui-avatars.com/api/?name=${sender?.name || 'User'}&background=2563eb&color=fff&size=48`}
                  alt={sender?.name || 'User'}
                  className="h-10 w-10 sm:h-12 sm:w-12 rounded-full ring-2 ring-primary-500/20 shrink-0"
                  onError={(e) => {
                    e.target.src = 'https://ui-avatars.com/api/?name=User&background=2563eb&color=fff&size=48';
                  }}
                />
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-gray-900 dark:text-white text-base sm:text-lg truncate">
                    {sender?.name || 'Unknown'}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">
                    {sender?.email || 'unknown@email.com'}
                  </p>
                </div>
              </div>
              <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 shrink-0">
                {formatDate(timestamp)}
              </span>
            </div>

            {/* Subject */}
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 break-words">
              {subject || 'No Subject'}
            </h3>

            {/* Body */}
            <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none break-words">
              <div dangerouslySetInnerHTML={{ __html: body || '<p>No content available</p>' }} />
            </div>

            {/* Attachments */}
            {hasAttachments && (
              <div className="mt-6 sm:mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center">
                  <PaperClipIcon className="h-4 w-4 mr-2" />
                  Attachments
                </p>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  <div className="flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors cursor-pointer">
                    <PaperClipIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">document.pdf</span>
                    <span className="text-[10px] sm:text-xs text-gray-400">(2.4 MB)</span>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors cursor-pointer">
                    <PaperClipIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">image.jpg</span>
                    <span className="text-[10px] sm:text-xs text-gray-400">(1.2 MB)</span>
                  </div>
                </div>
              </div>
            )}

            {/* Spacer to ensure content doesn't hide behind actions */}
            <div className="h-4 sm:h-6"></div>
          </div>

          {/* Fixed Footer with Action Buttons - Always visible */}
          <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-200 dark:border-gray-700 shrink-0 bg-gray-50 dark:bg-gray-800/50">
            <div className="flex flex-wrap gap-2">
              <button className="flex-1 min-w-[80px] sm:min-w-[100px] px-3 sm:px-4 py-2 sm:py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-xs sm:text-sm font-medium shadow-sm hover:shadow-md">
                Reply
              </button>
              <button className="flex-1 min-w-[80px] sm:min-w-[100px] px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-xs sm:text-sm font-medium">
                Reply All
              </button>
              <button className="flex-1 min-w-[80px] sm:min-w-[100px] px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-xs sm:text-sm font-medium">
                Forward
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};