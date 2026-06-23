import React from 'react';
import { motion } from 'framer-motion';
import { ContactCard } from './ContactCard';
import { useContacts } from '../../../contexts/ContactContext';
import { EnvelopeIcon, UserPlusIcon } from '@heroicons/react/24/outline';

/**
 * Contact List Component
 * Displays contacts in grid or list view
 */
export const ContactList = () => {
  const {
    getFilteredContacts,
    viewMode,
    setSelectedContact,
    setIsModalOpen,
    setEditingContact,
  } = useContacts();

  const contacts = getFilteredContacts();

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
    setIsModalOpen(true);
  };

  const handleAddContact = () => {
    setEditingContact(null);
    setSelectedContact(null);
    setIsModalOpen(true);
  };

  if (contacts.length === 0) {
    return (
      <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="text-5xl mb-4">👤</div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          No contacts found
        </h3>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          {getFilteredContacts().length === 0 && 'Try adjusting your search or filters'}
        </p>
        <button
          onClick={handleAddContact}
          className="mt-4 inline-flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
        >
          <UserPlusIcon className="h-4 w-4" />
          <span>Add your first contact</span>
        </button>
      </div>
    );
  }

  if (viewMode === 'list') {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="divide-y divide-gray-100 dark:divide-gray-700">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              onClick={() => handleContactClick(contact)}
              className="flex items-center px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors"
            >
              <img
                src={contact.avatar || `https://ui-avatars.com/api/?name=${contact.name}&background=2563eb&color=fff&size=40`}
                alt={contact.name}
                className="h-10 w-10 rounded-full mr-3"
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${contact.name}&background=2563eb&color=fff&size=40`;
                }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-900 dark:text-white">
                    {contact.name}
                  </span>
                  {contact.favorite && (
                    <span className="text-yellow-400">⭐</span>
                  )}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                  {contact.email}
                </p>
              </div>
              <div className="hidden sm:block text-sm text-gray-500 dark:text-gray-400">
                {contact.company}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Grid View
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {contacts.map((contact) => (
        <ContactCard
          key={contact.id}
          contact={contact}
          onClick={() => handleContactClick(contact)}
        />
      ))}
    </div>
  );
};