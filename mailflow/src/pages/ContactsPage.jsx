import React from 'react';
import { motion } from 'framer-motion';
import { ContactProvider } from '../contexts/ContactContext';
import { Contacts } from '../components/modules/contacts/Contacts';

/**
 * Contacts Page
 * Wraps the Contacts component with ContactProvider
 */
export const ContactsPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <ContactProvider>
        <Contacts />
      </ContactProvider>
    </motion.div>
  );
};