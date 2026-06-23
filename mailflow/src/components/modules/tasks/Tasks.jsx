import React from 'react';
import { useTasks } from '../../../contexts/TaskContext';
import { TaskStats } from './TaskStats';
import { TaskFilters } from './TaskFilters';
import { TaskItem } from './TaskItem';
import { TaskModal } from './TaskModal';
import { TaskSkeleton } from './TaskSkeleton';

/**
 * Main Tasks Component
 * Combines stats, filters, list, and modal
 */
export const Tasks = () => {
  const {
    isLoading,
    getFilteredTasks,
    setIsModalOpen,
    setEditingTask,
    deleteTask,
  } = useTasks();

  const filteredTasks = getFilteredTasks();

  const handleEdit = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleDelete = async (taskId) => {
    await deleteTask(taskId);
  };

  if (isLoading) {
    return <TaskSkeleton />;
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <TaskStats />
      <TaskFilters />
      
      {/* Tasks List */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="text-5xl mb-4">✅</div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              No tasks found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              {filteredTasks.length === 0 && 'Try adjusting your search or filters'}
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-4 inline-flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
            >
              <span>Add your first task</span>
            </button>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>

      <TaskModal />
    </div>
  );
};