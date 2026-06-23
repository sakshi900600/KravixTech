import React from 'react';
import { motion } from 'framer-motion';
import { StarIcon as StarOutline, StarIcon as StarSolid } from '@heroicons/react/24/outline';
import { EnvelopeIcon, PhoneIcon, BriefcaseIcon } from '@heroicons/react/24/outline';
import { useContacts } from '../../../contexts/ContactContext';

/**
 * Contact Card Component
 * Displays contact in grid view
 */
export const ContactCard = ({ contact, onClick }) => {
  const { toggleFavorite } = useContacts();

  const handleFavorite = (e) => {
    e.stopPropagation();
    toggleFavorite(contact.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg border border-gray-200 dark:border-gray-700 p-4 sm:p-6 cursor-pointer transition-all duration-200 group"
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <img
            src={contact.avatar || `https://ui-avatars.com/api/?name=${contact.name}&background=2563eb&color=fff&size=60`}
            alt={contact.name}
            className="h-12 w-12 sm:h-14 sm:w-14 rounded-full ring-2 ring-primary-500/20 group-hover:ring-primary-500/40 transition-all"
            onError={(e) => {
              e.target.src = `https://ui-avatars.com/api/?name=${contact.name}&background=2563eb&color=fff&size=60`;
            }}
          />
          <div className="min-w-0">
            <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white truncate">
              {contact.name}
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">
              {contact.designation || 'No designation'}
            </p>
          </div>
        </div>
        <button
          onClick={handleFavorite}
          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors shrink-0"
          aria-label={contact.favorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {contact.favorite ? (
            <StarSolid className="h-5 w-5 text-yellow-400" />
          ) : (
            <StarOutline className="h-5 w-5 text-gray-300 dark:text-gray-600 hover:text-yellow-400 transition-colors" />
          )}
        </button>
      </div>

      {/* Contact Details */}
      <div className="mt-3 space-y-1.5">
        <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
          <EnvelopeIcon className="h-4 w-4 shrink-0" />
          <span className="truncate">{contact.email}</span>
        </div>
        <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
          <PhoneIcon className="h-4 w-4 shrink-0" />
          <span className="truncate">{contact.mobile}</span>
        </div>
        <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
          <BriefcaseIcon className="h-4 w-4 shrink-0" />
          <span className="truncate">{contact.company}</span>
        </div>
      </div>
    </motion.div>
  );
};