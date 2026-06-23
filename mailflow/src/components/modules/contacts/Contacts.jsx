import React from 'react';
import { useContacts } from '../../../contexts/ContactContext';
import { ContactFilters } from './ContactFilters';
import { ContactList } from './ContactList';
import { ContactModal } from './ContactModal';
import { ContactSkeleton } from './ContactSkeleton';

/**
 * Main Contacts Component
 * Combines filters, list, and modal
 */
export const Contacts = () => {
  const { isLoading } = useContacts();

  if (isLoading) {
    return <ContactSkeleton />;
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <ContactFilters />
      <ContactList />
      <ContactModal />
    </div>
  );
};