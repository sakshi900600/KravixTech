import React from 'react';
import { motion } from 'framer-motion';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export const SpamPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Spam</h1>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 text-center">
        <ExclamationTriangleIcon className="h-16 w-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          No spam messages
        </h3>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Your spam folder is empty
        </p>
      </div>
    </motion.div>
  );
};