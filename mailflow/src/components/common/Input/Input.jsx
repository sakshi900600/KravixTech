import React, { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

/**
 * Reusable Input Component with validation state and password toggle
 * Fully responsive with mobile-first design
 */
export const Input = ({
  id,
  label,
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  touched,
  required,
  placeholder,
  className = '',
  icon: Icon,
  autoComplete,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const isPassword = type === 'password';

  // Determine input type (for password toggle)
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  // Determine if error should be shown
  const showError = error && touched;

  // Base input styles with better mobile support
  const inputStyles = `
    w-full px-4 py-2.5 sm:py-3 rounded-xl border-2 
    ${showError 
      ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
      : isFocused
        ? 'border-primary-500 ring-2 ring-primary-500/20'
        : 'border-gray-200 dark:border-gray-600'
    }
    bg-white dark:bg-gray-800/50
    text-gray-900 dark:text-gray-100
    placeholder-gray-400 dark:placeholder-gray-500
    focus:outline-none focus:ring-2 focus:ring-primary-500/30
    transition-all duration-200
    ${Icon ? 'pl-10 sm:pl-12' : ''}
    ${isPassword ? 'pr-10 sm:pr-12' : ''}
    ${className}
  `.trim();

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id || name} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {/* Left Icon */}
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className={`h-5 w-5 transition-colors duration-200 ${
              showError ? 'text-red-500' :
              isFocused ? 'text-primary-500' : 'text-gray-400 dark:text-gray-500'
            }`} />
          </div>
        )}
        
        {/* Input Field */}
        <input
          id={id || name}
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          onBlur={(e) => {
            setIsFocused(false);
            if (onBlur) onBlur(e);
          }}
          onFocus={() => setIsFocused(true)}
          placeholder={placeholder}
          className={inputStyles}
          aria-invalid={showError ? 'true' : 'false'}
          aria-describedby={showError ? `${name}-error` : undefined}
          autoComplete={autoComplete}
          {...props}
        />
        
        {/* Password Toggle */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none transition-colors duration-200"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <EyeSlashIcon className="h-5 w-5" />
            ) : (
              <EyeIcon className="h-5 w-5" />
            )}
          </button>
        )}
      </div>
      
      {/* Error Message with animation */}
      {showError && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          id={`${name}-error`}
          className="mt-1.5 text-sm text-red-500 flex items-center gap-1"
        >
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500 mr-1"></span>
          {error}
        </motion.p>
      )}
    </div>
  );
};