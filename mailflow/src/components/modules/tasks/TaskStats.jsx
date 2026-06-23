import React from 'react';
import { useTasks } from '../../../contexts/TaskContext';
import { CheckCircleIcon, ClockIcon, ExclamationCircleIcon, ListBulletIcon } from '@heroicons/react/24/outline';

/**
 * Task Statistics Component
 * Shows summary of task statuses
 */
export const TaskStats = () => {
  const { tasks } = useTasks();

  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = total - completed;
  const overdue = tasks.filter(t => {
    if (t.completed) return false;
    if (!t.dueDate) return false;
    return new Date(t.dueDate) < new Date();
  }).length;

  const stats = [
    {
      id: 'total',
      label: 'Total Tasks',
      value: total,
      icon: ListBulletIcon,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20',
      textColor: 'text-blue-600 dark:text-blue-400',
    },
    {
      id: 'pending',
      label: 'Pending',
      value: pending,
      icon: ClockIcon,
      color: 'bg-yellow-500',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/20',
      textColor: 'text-yellow-600 dark:text-yellow-400',
    },
    {
      id: 'completed',
      label: 'Completed',
      value: completed,
      icon: CheckCircleIcon,
      color: 'bg-green-500',
      bgColor: 'bg-green-100 dark:bg-green-900/20',
      textColor: 'text-green-600 dark:text-green-400',
    },
    {
      id: 'overdue',
      label: 'Overdue',
      value: overdue,
      icon: ExclamationCircleIcon,
      color: 'bg-red-500',
      bgColor: 'bg-red-100 dark:bg-red-900/20',
      textColor: 'text-red-600 dark:text-red-400',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-5"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  {stat.label}
                </p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {stat.value}
                </p>
              </div>
              <div className={`p-2 sm:p-3 rounded-xl ${stat.bgColor}`}>
                <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${stat.textColor}`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};