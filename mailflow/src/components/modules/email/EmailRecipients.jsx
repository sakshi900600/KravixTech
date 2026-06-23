import React, { useState, useRef } from 'react';
import { XMarkIcon, UserPlusIcon } from '@heroicons/react/24/outline';

/**
 * Email Recipients Component
 * Handles To, CC, BCC with chip input
 */
export const EmailRecipients = ({
  label,
  recipients = [],
  onChange,
  placeholder = 'Add recipients...',
  disabled = false,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addRecipient();
    } else if (e.key === 'Backspace' && !inputValue && recipients.length > 0) {
      // Remove last recipient on backspace
      const newRecipients = [...recipients];
      newRecipients.pop();
      onChange(newRecipients);
    }
  };

  const addRecipient = () => {
    const email = inputValue.trim();
    if (email && isValidEmail(email)) {
      onChange([...recipients, email]);
      setInputValue('');
    }
  };

  const removeRecipient = (index) => {
    const newRecipients = [...recipients];
    newRecipients.splice(index, 1);
    onChange(newRecipients);
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (inputValue) {
      addRecipient();
    }
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
        {label}
      </label>
      <div
        className={`
          flex flex-wrap items-center gap-1.5 p-2 rounded-lg border-2 min-h-[42px]
          ${isFocused 
            ? 'border-primary-500 ring-2 ring-primary-500/20' 
            : 'border-gray-300 dark:border-gray-600'
          }
          ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
          bg-white dark:bg-gray-800 transition-all duration-200
        `}
        onClick={() => !disabled && inputRef.current?.focus()}
      >
        {/* Recipient Chips */}
        {recipients.map((recipient, index) => (
          <span
            key={index}
            className="inline-flex items-center gap-1 px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-lg text-sm"
          >
            <span className="max-w-[120px] sm:max-w-[200px] truncate">
              {recipient}
            </span>
            {!disabled && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeRecipient(index);
                }}
                className="hover:text-red-500 transition-colors"
              >
                <XMarkIcon className="h-3.5 w-3.5" />
              </button>
            )}
          </span>
        ))}

        {/* Input Field */}
        {!disabled && (
          <input
            ref={inputRef}
            type="email"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={handleBlur}
            placeholder={recipients.length === 0 ? placeholder : ''}
            className="flex-1 min-w-[100px] bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none text-sm"
            disabled={disabled}
          />
        )}
      </div>
      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
        Press Enter or comma to add recipients
      </p>
    </div>
  );
};