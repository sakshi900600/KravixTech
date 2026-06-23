import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { mockSearchService } from '../services/api';
import { useDebounce } from '../hooks/useDebounce';
import toast from 'react-hot-toast';

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState('all');
  const [recentSearches, setRecentSearches] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const debouncedQuery = useDebounce(query, 300);

  // Load recent searches on mount
  useEffect(() => {
    loadRecentSearches();
  }, []);

  // Perform search when query changes
  useEffect(() => {
    if (debouncedQuery.trim()) {
      performSearch(debouncedQuery);
    } else {
      setResults([]);
      setSelectedIndex(-1);
    }
  }, [debouncedQuery, filter]);

  const loadRecentSearches = async () => {
    try {
      const recent = await mockSearchService.getRecentSearches();
      setRecentSearches(recent);
    } catch (error) {
      console.error('Failed to load recent searches:', error);
    }
  };

  const performSearch = async (searchQuery) => {
    setIsLoading(true);
    try {
      const data = await mockSearchService.search(searchQuery, filter);
      setResults(data.results);
      
      // Save to recent searches if query has results
      if (data.results.length > 0) {
        await mockSearchService.saveRecentSearch(searchQuery);
        await loadRecentSearches();
      }
    } catch (error) {
      toast.error('Search failed. Please try again.');
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const openSearch = () => {
    setIsOpen(true);
    setQuery('');
    setResults([]);
    setSelectedIndex(-1);
    loadRecentSearches();
    // Focus on search input after a small delay
    setTimeout(() => {
      const input = document.getElementById('global-search-input');
      if (input) input.focus();
    }, 100);
  };

  const closeSearch = () => {
    setIsOpen(false);
    setQuery('');
    setResults([]);
    setSelectedIndex(-1);
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setSelectedIndex(-1);
    const input = document.getElementById('global-search-input');
    if (input) input.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      closeSearch();
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => 
        prev < results.length - 1 ? prev + 1 : prev
      );
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
    }

    if (e.key === 'Enter' && selectedIndex >= 0) {
      const selected = results[selectedIndex];
      if (selected) {
        handleResultClick(selected);
      }
    }
  };

  const handleResultClick = (result) => {
    // Navigate to the appropriate page based on result type
    const routes = {
      email: '/inbox',
      contact: '/contacts',
      task: '/tasks',
      event: '/calendar',
    };
    
    const route = routes[result.type] || '/dashboard';
    window.location.href = route;
    closeSearch();
  };

  const value = {
    isOpen,
    query,
    results,
    isLoading,
    filter,
    recentSearches,
    selectedIndex,
    setQuery,
    setFilter,
    openSearch,
    closeSearch,
    clearSearch,
    handleKeyDown,
    handleResultClick,
    loadRecentSearches,
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};