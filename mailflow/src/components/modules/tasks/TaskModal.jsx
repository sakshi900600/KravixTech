import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, CalendarIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import { useTasks } from '../../../contexts/TaskContext';
import { TASK_PRIORITIES } from '../../../utils/constants';
import toast from 'react-hot-toast';

/**
 * Task Modal Component
 * Create, Edit, and View tasks
 */
export const TaskModal = () => {
  const {
    isModalOpen,
    setIsModalOpen,
    editingTask,
    setEditingTask,
    selectedTask,
    setSelectedTask,
    createTask,
    updateTask,
    deleteTask,
  } = useTasks();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    dueDate: '',
    priority: 'medium',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const task = editingTask || selectedTask;
    if (task) {
      setFormData({
        name: task.name || '',
        description: task.description || '',
        dueDate: task.dueDate ? new Date(task.dueDate).toISOString().slice(0, 10) : '',
        priority: task.priority || 'medium',
      });
      setIsEditing(!!editingTask);
    } else {
      setFormData({
        name: '',
        description: '',
        dueDate: '',
        priority: 'medium',
      });
      setIsEditing(false);
    }
  }, [editingTask, selectedTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast.error('Please enter a task name');
      return;
    }

    setIsSubmitting(true);

    const taskData = {
      ...formData,
      name: formData.name.trim(),
    };

    let result;
    if (isEditing && editingTask) {
      result = await updateTask(editingTask.id, taskData);
    } else if (selectedTask && !isEditing) {
      handleClose();
      setIsSubmitting(false);
      return;
    } else {
      result = await createTask(taskData);
    }

    setIsSubmitting(false);
    if (result?.success) {
      handleClose();
    }
  };

  const handleDelete = async () => {
    const taskId = editingTask?.id || selectedTask?.id;
    if (taskId) {
      const result = await deleteTask(taskId);
      if (result.success) {
        handleClose();
      }
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setEditingTask(null);
    setSelectedTask(null);
    setIsEditing(false);
  };

  const handleEditClick = () => {
    if (selectedTask) {
      setEditingTask(selectedTask);
      setSelectedTask(null);
      setIsEditing(true);
    }
  };

  if (!isModalOpen) return null;

  const isViewing = selectedTask && !isEditing;
  const isEditMode = isEditing || !!editingTask;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', duration: 0.4 }}
          className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700 shrink-0">
            <div className="flex items-center space-x-3">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {isViewing ? 'Task Details' : isEditMode ? 'Edit Task' : 'New Task'}
              </h3>
              {isViewing && (
                <button
                  onClick={handleEditClick}
                  className="p-1.5 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors"
                  title="Edit task"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
              )}
            </div>
            <button
              onClick={handleClose}
              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <XMarkIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Task Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter task name"
                disabled={isViewing}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-60 disabled:cursor-not-allowed"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Description
              </label>
              <div className="relative">
                <DocumentTextIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Add description"
                  disabled={isViewing}
                  rows="3"
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-60 disabled:cursor-not-allowed resize-none"
                />
              </div>
            </div>

            {/* Due Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Due Date
              </label>
              <div className="relative">
                <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                  disabled={isViewing}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-60 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            {/* Priority */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Priority
              </label>
              <div className="grid grid-cols-2 gap-2">
                {TASK_PRIORITIES.map((priority) => (
                  <button
                    key={priority.id}
                    type="button"
                    onClick={() => !isViewing && setFormData(prev => ({ ...prev, priority: priority.id }))}
                    disabled={isViewing}
                    className={`
                      px-3 py-2 rounded-lg border-2 text-sm font-medium transition-all
                      ${formData.priority === priority.id
                        ? `border-${priority.id === 'urgent' ? 'red' : priority.id === 'high' ? 'orange' : priority.id === 'medium' ? 'yellow' : 'green'}-500 bg-${priority.id === 'urgent' ? 'red' : priority.id === 'high' ? 'orange' : priority.id === 'medium' ? 'yellow' : 'green'}-50 dark:bg-${priority.id === 'urgent' ? 'red' : priority.id === 'high' ? 'orange' : priority.id === 'medium' ? 'yellow' : 'green'}-900/20`
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }
                      ${isViewing ? 'cursor-default' : 'cursor-pointer'}
                    `}
                  >
                    <span className={`${priority.textColor}`}>
                      {priority.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </form>

          {/* Footer */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-gray-700 shrink-0 bg-gray-50 dark:bg-gray-800/50">
            <div>
              {(isEditMode || isViewing) && (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors text-sm font-medium"
                >
                  Delete
                </button>
              )}
            </div>
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-sm font-medium"
              >
                {isViewing ? 'Close' : 'Cancel'}
              </button>
              {!isViewing && (
                <button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                >
                  {isSubmitting ? 'Saving...' : isEditMode ? 'Update Task' : 'Add Task'}
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};