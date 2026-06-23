import React from 'react';
import { motion } from 'framer-motion';
import { CalendarProvider } from '../contexts/CalendarContext';
import { Calendar } from '../components/modules/calendar/Calendar';

/**
 * Calendar Page
 * Wraps the Calendar component with CalendarProvider
 */
export const CalendarPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <CalendarProvider>
        <Calendar />
      </CalendarProvider>
    </motion.div>
  );
};