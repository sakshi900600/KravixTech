import React from 'react';

/**
 * Contacts Loading Skeleton
 */
export const ContactSkeleton = () => {
  return (
    <div className="space-y-4 animate-pulse">
      {/* Filters Skeleton */}
      <div className="flex flex-wrap gap-3">
        <div className="h-10 flex-1 min-w-[200px] bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
        <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
        <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
        <div className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
      </div>

      {/* Contacts Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="h-14 w-14 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                <div className="space-y-2">
                  <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              </div>
              <div className="h-5 w-5 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
            <div className="mt-3 space-y-2">
              <div className="h-3 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-3 w-28 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};