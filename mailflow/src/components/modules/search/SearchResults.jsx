import React from 'react';
import { motion } from 'framer-motion';
import { SearchResultItem } from './SearchResultItem';
import { useSearch } from '../../../contexts/SearchContext';
import { SEARCH_TYPES } from '../../../utils/constants';

/**
 * Search Results Component
 * Displays filtered search results
 */
export const SearchResults = () => {
  const {
    results,
    isLoading,
    filter,
    setFilter,
    selectedIndex,
    handleResultClick,
    query,
  } = useSearch();

  if (!query.trim() && !isLoading) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="p-4 space-y-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="flex items-start p-3">
              <div className="h-5 w-5 bg-gray-200 dark:bg-gray-700 rounded mr-3"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-3 w-1/2 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-3 w-1/3 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (results.length === 0 && query.trim()) {
    return (
      <div className="text-center py-8">
        <div className="text-4xl mb-3">🔍</div>
        <h4 className="text-base font-medium text-gray-900 dark:text-white">
          No results found
        </h4>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Try adjusting your search terms or filters
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex items-center gap-1 px-4 py-2 border-b border-gray-100 dark:border-gray-700">
        {SEARCH_TYPES.map((type) => (
          <button
            key={type.id}
            onClick={() => setFilter(type.id)}
            className={`
              px-3 py-1 text-xs font-medium rounded-full transition-all
              ${filter === type.id
                ? 'bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }
            `}
          >
            {type.label}
          </button>
        ))}
      </div>

      {/* Results list */}
      <div className="p-2 max-h-96 overflow-y-auto">
        {results.map((result, index) => (
          <SearchResultItem
            key={result.id}
            result={result}
            isSelected={selectedIndex === index}
            onClick={() => handleResultClick(result)}
          />
        ))}
        
        {/* Result count */}
        <div className="px-3 py-2 text-xs text-gray-400 dark:text-gray-500 border-t border-gray-100 dark:border-gray-700 mt-2">
          Showing {results.length} results
        </div>
      </div>
    </div>
  );
};