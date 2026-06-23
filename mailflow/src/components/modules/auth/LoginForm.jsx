import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { EnvelopeIcon, LockClosedIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useAuth } from '../../../contexts/AuthContext';
import { loginSchema } from '../../../utils/validators';
import { Button } from '../../common/Button/Button';
import { Input } from '../../common/Input/Input';

/**
 * Login Form Component
 * Handles user authentication with validation and loading states
 * Fully responsive with container card design
 */
export const LoginForm = () => {
  const { login, isLoading } = useAuth();
  const [rememberMe, setRememberMe] = useState(false);

  // React Hook Form setup with Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isSubmitting },
    setError,
    trigger,
    reset,
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    mode: 'onChange',
  });

  /**
   * Handle form submission
   */
  const onSubmit = async (data) => {
    // Prevent submission if already submitting
    if (isSubmitting || isLoading) {
      return;
    }

    try {
      // Call login function
      const result = await login(data);
      
      // Check if login was successful
      if (result.success) {
        toast.success('Welcome back! 👋');
        // Reset form after successful login
        reset();
      } else {
        // Show error toast for invalid credentials
        toast.error(result.error || 'Invalid credentials. Please try again.');
        
        // Reset form fields to empty (but keep focus on email)
        reset({
          email: '',
          password: '',
          rememberMe: data.rememberMe, // Keep remember me state
        });
        
        // Set focus back to email field after reset
        setTimeout(() => {
          const emailInput = document.getElementById('email');
          if (emailInput) {
            emailInput.focus();
          }
        }, 100);
      }
    } catch (error) {
      // Handle any unexpected errors
      console.error('Login error:', error);
      toast.error('An unexpected error occurred. Please try again.');
      
      // Reset form on unexpected error too
      reset({
        email: '',
        password: '',
        rememberMe: data.rememberMe,
      });
    }
  };

  /**
   * Handle form validation errors
   */
  const onError = (errors) => {
    // Scroll to first error field
    const firstError = Object.keys(errors)[0];
    if (firstError) {
      const element = document.getElementById(firstError);
      if (element) {
        element.focus();
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
    
    // Show toast for validation errors
    toast.error('Please fix the validation errors before submitting.');
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-md mx-auto"
    >
      {/* Card Container */}
      <div className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl dark:shadow-gray-900/30 px-6 py-8 sm:px-8 sm:py-10 md:px-10 md:py-12 border border-gray-100 dark:border-gray-700">
        
        {/* Decorative gradient bar at top */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 rounded-t-3xl"></div>
        
        {/* Logo/Icon Section */}
        <div className="flex justify-center mb-5 sm:mb-6">
          <div className="relative">
            <div className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shadow-primary-500/30 dark:shadow-primary-500/20 transition-all duration-300 hover:scale-105">
              <span className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
                MF
              </span>
            </div>
            <div className="absolute -inset-0.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-primary-400 to-primary-600 opacity-20 blur-lg -z-10"></div>
          </div>
        </div>

        {/* Header Section */}
        <div className="text-center mb-7 sm:mb-9">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            Welcome Back
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400">
            Sign in to access your email and productivity tools
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-4 sm:space-y-5 md:space-y-6" noValidate>
          {/* Email Field */}
          <Input
            id="email"
            label="Email Address"
            type="email"
            placeholder="john@example.com"
            icon={EnvelopeIcon}
            error={errors.email?.message}
            touched={touchedFields.email}
            autoComplete="email"
            {...register('email', {
              onChange: () => trigger('email'),
            })}
          />

          {/* Password Field */}
          <Input
            id="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            icon={LockClosedIcon}
            error={errors.password?.message}
            touched={touchedFields.password}
            autoComplete="current-password"
            {...register('password', {
              onChange: () => trigger('password'),
            })}
          />

          {/* Remember Me & Forgot Password */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
            <label className="flex items-center space-x-2 text-xs sm:text-sm cursor-pointer group">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => {
                    setRememberMe(e.target.checked);
                    register('rememberMe').onChange(e);
                  }}
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-700 dark:checked:bg-primary-500 transition-all duration-200"
                />
              </div>
              <span className="text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                Remember me
              </span>
            </label>
            
            <button
              type="button"
              className="text-xs sm:text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium transition-colors hover:underline"
              onClick={() => toast.success('Password reset link sent to your email!')}
            >
              Forgot password?
            </button>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            isLoading={isLoading || isSubmitting}
            className="w-full py-2 sm:py-2.5 md:py-3 text-sm sm:text-base font-semibold shadow-lg shadow-primary-500/30 hover:shadow-primary-500/40 dark:shadow-primary-500/20 transition-shadow duration-300"
            icon={!(isLoading || isSubmitting) ? ArrowRightIcon : null}
            iconPosition="right"
            disabled={isLoading || isSubmitting}
          >
            {isLoading || isSubmitting ? 'Signing in...' : 'Sign In'}
          </Button>

          {/* Demo Credentials */}
          <div className="mt-3 sm:mt-4 md:mt-5 pt-3 sm:pt-4 md:pt-5 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">
                <span className="font-medium text-gray-700 dark:text-gray-300">Demo Credentials</span>
              </p>
              <div className="mt-1 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 md:gap-3 text-[10px] sm:text-xs font-mono text-gray-600 dark:text-gray-400">
                <span className="bg-gray-100 dark:bg-gray-700 px-2 py-0.5 sm:px-3 sm:py-1 rounded-md">
                  📧 john@example.com
                </span>
                <span className="hidden sm:inline text-gray-400">•</span>
                <span className="bg-gray-100 dark:bg-gray-700 px-2 py-0.5 sm:px-3 sm:py-1 rounded-md">
                  🔒 password123
                </span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </motion.div>
  );
};