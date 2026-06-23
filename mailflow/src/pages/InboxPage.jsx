import React from 'react';
import { motion } from 'framer-motion';
import { Inbox } from '../components/modules/email/Inbox';
import { EmailProvider } from '../contexts/EmailContext';

/**
 * Inbox Page
 * Wraps the Inbox component with EmailProvider
 */
export const InboxPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <EmailProvider>
        <Inbox />
      </EmailProvider>
    </motion.div>
  );
};