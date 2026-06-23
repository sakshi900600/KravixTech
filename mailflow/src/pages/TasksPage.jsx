import React from 'react';
import { motion } from 'framer-motion';
import { TaskProvider } from '../contexts/TaskContext';
import { Tasks } from '../components/modules/tasks/Tasks';

/**
 * Tasks Page
 * Wraps the Tasks component with TaskProvider
 */
export const TasksPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <TaskProvider>
        <Tasks />
      </TaskProvider>
    </motion.div>
  );
};