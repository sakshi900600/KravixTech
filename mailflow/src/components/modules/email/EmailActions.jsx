import React from 'react';
import {
  EnvelopeIcon,
  EnvelopeOpenIcon,
  ArchiveBoxIcon,
  TrashIcon,
  StarIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';
import { useEmail } from '../../../contexts/EmailContext';

/**
 * Email Action Buttons Component
 */
export const EmailActions = ({ selectedIds, onClearSelection }) => {
  const { markMultipleAsRead, deleteEmails, archiveEmails, toggleStar } = useEmail();

  if (selectedIds.length === 0) return null;

  const handleMarkRead = () => markMultipleAsRead(selectedIds, true);
  const handleMarkUnread = () => markMultipleAsRead(selectedIds, false);
  const handleDelete = () => {
    if (window.confirm(`Delete ${selectedIds.length} email(s)?`)) {
      deleteEmails(selectedIds);
      onClearSelection?.();
    }
  };
  const handleArchive = () => {
    archiveEmails(selectedIds);
    onClearSelection?.();
  };

  return (
    <div className="flex items-center space-x-1 sm:space-x-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-1">
      <span className="text-xs text-gray-500 dark:text-gray-400 px-2">
        {selectedIds.length} selected
      </span>
      
      <div className="w-px h-6 bg-gray-200 dark:bg-gray-700" />

      <button
        onClick={handleMarkRead}
        className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-400"
        title="Mark as read"
      >
        <EnvelopeOpenIcon className="h-4 w-4" />
      </button>

      <button
        onClick={handleMarkUnread}
        className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-400"
        title="Mark as unread"
      >
        <EnvelopeIcon className="h-4 w-4" />
      </button>

      <div className="w-px h-6 bg-gray-200 dark:bg-gray-700" />

      <button
        onClick={handleArchive}
        className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-400"
        title="Archive"
      >
        <ArchiveBoxIcon className="h-4 w-4" />
      </button>

      <button
        onClick={handleDelete}
        className="p-1.5 rounded hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors text-red-600 dark:text-red-400"
        title="Delete"
      >
        <TrashIcon className="h-4 w-4" />
      </button>

      <button
        onClick={onClearSelection}
        className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-400 ml-1"
        title="Clear selection"
      >
        <ArrowPathIcon className="h-4 w-4" />
      </button>
    </div>
  );
};