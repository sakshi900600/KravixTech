import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagnifyingGlassIcon, XMarkIcon, ClockIcon } from '@heroicons/react/24/outline';
import { useSearch } from '../../../contexts/SearchContext';
import { SearchResults } from './SearchResults';

/**
 * Global Search Component
 * Full-screen overlay search with keyboard shortcuts
 */
export const GlobalSearch = () => {
  const {
    isOpen,
    query,
    setQuery,
    closeSearch,
    clearSearch,
    handleKeyDown,
    recentSearches,
    loadRecentSearches,
    handleResultClick,
  } = useSearch();

  // Keyboard shortcut: Cmd+K or Ctrl+K
  useEffect(() => {
    const handleShortcut = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // This will be handled by the TopNav component
      }
    };

    document.addEventListener('keydown', handleShortcut);
    return () => {
      document.removeEventListener('keydown', handleShortcut);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeSearch}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Search Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', duration: 0.3 }}
          className="relative max-w-2xl mx-auto mt-16 sm:mt-20 md:mt-24 p-4"
        >
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
            {/* Search Input */}
            <div className="flex items-center px-4 py-3 border-b border-gray-200 dark:border-gray-700">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 dark:text-gray-500 shrink-0" />
              <input
                id="global-search-input"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search emails, contacts, tasks, events..."
                className="flex-1 px-3 py-1 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none text-base"
                autoFocus
              />
              {query && (
                <button
                  onClick={clearSearch}
                  className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors shrink-0"
                >
                  <XMarkIcon className="h-4 w-4 text-gray-400" />
                </button>
              )}
              <kbd className="ml-2 px-2 py-0.5 text-xs font-mono text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600 shrink-0 hidden sm:block">
                ESC
              </kbd>
            </div>

            {/* Recent Searches */}
            {!query.trim() && recentSearches.length > 0 && (
              <div className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                    <ClockIcon className="h-4 w-4" />
                    <span>Recent Searches</span>
                  </div>
                  <button
                    onClick={async () => {
                      await loadRecentSearches();
                    }}
                    className="text-xs text-primary-600 dark:text-primary-400 hover:underline"
                  >
                    Clear all
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.slice(0, 8).map((search, index) => (
                    <button
                      key={index}
                      onClick={() => setQuery(search)}
                      className="px-3 py-1.5 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Search Results */}
            <SearchResults />

            {/* Footer */}
            <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 text-xs text-gray-400 dark:text-gray-500 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span>
                  <kbd className="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-[10px]">↑</kbd>
                  <kbd className="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-[10px] ml-1">↓</kbd>
                  <span className="ml-1">Navigate</span>
                </span>
                <span>
                  <kbd className="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-[10px]">Enter</kbd>
                  <span className="ml-1">Select</span>
                </span>
              </div>
              <span>
                <kbd className="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-[10px]">Esc</kbd>
                <span className="ml-1">Close</span>
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};