import React from 'react';

/**
 * Loading Skeleton for Email List
 */
export const EmailSkeleton = () => {
  return (
    <div className="space-y-4 animate-pulse">
      {/* Filters Skeleton */}
      <div className="flex items-center space-x-2">
        <div className="h-10 w-16 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
        <div className="h-10 w-16 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
        <div className="h-10 w-16 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
      </div>

      {/* Email List Skeleton */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="flex items-center px-4 py-4 border-b border-gray-100 dark:border-gray-700">
            <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded mr-3"></div>
            <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded mr-3"></div>
            <div className="w-24 h-4 bg-gray-200 dark:bg-gray-700 rounded mr-3"></div>
            <div className="flex-1">
              <div className="w-32 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
            <div className="w-16 h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
};