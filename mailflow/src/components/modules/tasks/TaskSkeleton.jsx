import React from 'react';

/**
 * Tasks Loading Skeleton
 */
export const TaskSkeleton = () => {
  return (
    <div className="space-y-4 animate-pulse">
      {/* Stats Skeleton */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-8 w-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
              <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters Skeleton */}
      <div className="flex flex-wrap gap-3">
        <div className="h-10 flex-1 min-w-[200px] bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
        <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
        <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
        <div className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
      </div>

      {/* Tasks List Skeleton */}
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-start">
              <div className="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded-full mr-3"></div>
              <div className="flex-1 space-y-2">
                <div className="h-5 w-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-4 w-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="flex gap-2">
                  <div className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                  <div className="h-5 w-24 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};