import React from 'react';

/**
 * Calendar Loading Skeleton
 */
export const CalendarSkeleton = () => {
  return (
    <div className="space-y-4 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          <div className="h-10 w-20 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
        </div>
      </div>

      {/* Calendar Grid Skeleton */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="grid grid-cols-7 gap-0">
          {[...Array(7)].map((_, i) => (
            <div key={i} className="py-3 text-center border-b border-gray-200 dark:border-gray-700">
              <div className="h-4 w-12 bg-gray-200 dark:bg-gray-700 rounded mx-auto"></div>
            </div>
          ))}
          {[...Array(42)].map((_, i) => (
            <div key={i} className="min-h-[100px] p-2 border-r border-b border-gray-100 dark:border-gray-700">
              <div className="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded-full mb-1"></div>
              <div className="space-y-1">
                <div className="h-5 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-5 w-3/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};