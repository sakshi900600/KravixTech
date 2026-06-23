import React from 'react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { CheckCircleIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon as CheckCircleSolid } from '@heroicons/react/24/solid';
import { useTasks } from '../../../contexts/TaskContext';
import { TASK_PRIORITIES } from '../../../utils/constants';

/**
 * Individual Task Item Component
 */
export const TaskItem = ({ task, onEdit, onDelete }) => {
  const { toggleComplete, setSelectedTask, setIsModalOpen } = useTasks();

  const priority = TASK_PRIORITIES.find(p => p.id === task.priority) || TASK_PRIORITIES[0];
  const isOverdue = task.dueDate && !task.completed && new Date(task.dueDate) < new Date();

  const handleToggleComplete = (e) => {
    e.stopPropagation();
    toggleComplete(task.id);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit(task);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(task.id);
  };

  const handleClick = () => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const formatDate = (date) => {
    try {
      return format(new Date(date), 'MMM d, yyyy');
    } catch {
      return '';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`
        flex items-start p-3 sm:p-4 rounded-xl border transition-all duration-200
        ${task.completed 
          ? 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700' 
          : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-md'
        }
        ${isOverdue && !task.completed ? 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/5' : ''}
        cursor-pointer group
      `}
      onClick={handleClick}
    >
      {/* Checkbox */}
      <button
        onClick={handleToggleComplete}
        className="mr-3 mt-0.5 shrink-0 focus:outline-none"
        aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
      >
        {task.completed ? (
          <CheckCircleSolid className="h-6 w-6 text-green-500" />
        ) : (
          <CheckCircleIcon className="h-6 w-6 text-gray-300 dark:text-gray-600 hover:text-primary-500 transition-colors" />
        )}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h4 className={`
              text-sm sm:text-base font-medium truncate
              ${task.completed ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-900 dark:text-white'}
            `}>
              {task.name}
            </h4>
            {task.description && (
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate mt-0.5">
                {task.description}
              </p>
            )}
          </div>
          
          {/* Actions */}
          <div className="flex items-center space-x-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleEdit}
              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              aria-label="Edit task"
            >
              <PencilIcon className="h-4 w-4" />
            </button>
            <button
              onClick={handleDelete}
              className="p-1.5 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors text-gray-400 hover:text-red-600"
              aria-label="Delete task"
            >
              <TrashIcon className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Meta information */}
        <div className="flex flex-wrap items-center gap-2 mt-2">
          {/* Priority */}
          <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${priority.textColor} bg-gray-100 dark:bg-gray-700`}>
            {priority.label}
          </span>

          {/* Due Date */}
          {task.dueDate && (
            <span className={`
              text-xs flex items-center space-x-1
              ${isOverdue && !task.completed ? 'text-red-500 font-medium' : 'text-gray-500 dark:text-gray-400'}
            `}>
              <span>📅</span>
              <span>{formatDate(task.dueDate)}</span>
              {isOverdue && !task.completed && (
                <span className="text-red-500">(Overdue)</span>
              )}
            </span>
          )}

          {/* Completed date */}
          {task.completed && task.completedAt && (
            <span className="text-xs text-green-600 dark:text-green-400">
              ✅ Completed {formatDate(task.completedAt)}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};