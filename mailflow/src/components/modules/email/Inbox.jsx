import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useEmail } from '../../../contexts/EmailContext';
import { EmailItem } from './EmailItem';
import { EmailFilters } from './EmailFilters';
import { EmailActions } from './EmailActions';
import { EmailSkeleton } from './EmailSkeleton';
import { EmailDetail } from './EmailDetail';
import { ComposeEmail } from './ComposeEmail';

/**
 * Main Inbox Component
 * Displays email list with filters, actions, and compose
 */
export const Inbox = () => {
  const {
    isLoading,
    selectedEmails,
    getFilteredEmails,
    setIsComposeOpen,
    toggleSelectEmail,
    selectAllEmails,
    setSelectedEmails,
  } = useEmail();

  const [selectAll, setSelectAll] = useState(false);

  const filteredEmails = getFilteredEmails();

  const handleSelectAll = () => {
    selectAllEmails();
    setSelectAll(!selectAll);
  };

  const handleClearSelection = () => {
    setSelectedEmails([]);
    setSelectAll(false);
  };

  if (isLoading) {
    return <EmailSkeleton />;
  }

  return (
    <>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <EmailFilters />
          </div>
          <button
            onClick={() => setIsComposeOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium shrink-0 w-full sm:w-auto justify-center"
          >
            <PlusIcon className="h-4 w-4" />
            <span>Compose</span>
          </button>
        </div>

        {/* Actions Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={selectAll && filteredEmails.length > 0}
              onChange={handleSelectAll}
              className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
              disabled={filteredEmails.length === 0}
            />
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {filteredEmails.length} emails
            </span>
          </div>
          <EmailActions
            selectedIds={selectedEmails}
            onClearSelection={handleClearSelection}
          />
        </div>

        {/* Email List */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          {filteredEmails.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">📭</div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                No emails found
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                {selectedEmails.length > 0 ? 'Try clearing your filters' : 'Your inbox is empty'}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {filteredEmails.map((email) => (
                <EmailItem
                  key={email.id}
                  email={email}
                  onSelect={toggleSelectEmail}
                  isSelected={selectedEmails.includes(email.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Email Detail Modal - Now renders on top as a popup */}
      <EmailDetail />

      {/* Compose Modal */}
      <ComposeEmail />
    </>
  );
};