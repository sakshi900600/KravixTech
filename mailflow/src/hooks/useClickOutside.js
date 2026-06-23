import { useEffect, useRef } from 'react';

/**
 * Custom hook to detect clicks outside a component
 * @param {Function} callback - Function to call when clicking outside
 * @param {Array} excludeRefs - Array of refs to exclude from outside detection
 */
export const useClickOutside = (ref, callback, excludeRefs = []) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click is on excluded refs
      const isExcluded = excludeRefs.some(
        (excludeRef) => excludeRef.current && excludeRef.current.contains(event.target)
      );

      if (ref.current && !ref.current.contains(event.target) && !isExcluded) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [ref, callback, excludeRefs]);
};