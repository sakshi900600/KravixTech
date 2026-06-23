import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopNav } from './TopNav';
import { MobileNav } from './MobileNav';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchProvider } from '../../contexts/SearchContext';
import { GlobalSearch } from '../modules/search/GlobalSearch';

/**
 * Dashboard Layout Component
 * Wraps all dashboard pages with sidebar and top navigation
 * Fully responsive with mobile sidebar overlay
 */
export const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      // Close sidebar on desktop if it's open
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [window.location.pathname]);

  return (
    <SearchProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Main Container */}
        <div className="flex h-screen overflow-hidden">
          {/* Desktop Sidebar */}
          <div className="hidden md:flex md:flex-col md:shrink-0">
            <Sidebar />
          </div>

          {/* Mobile Sidebar Overlay */}
          <AnimatePresence>
            {isSidebarOpen && isMobile && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsSidebarOpen(false)}
                  className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 md:hidden"
                />
                <motion.div
                  initial={{ x: -280 }}
                  animate={{ x: 0 }}
                  exit={{ x: -280 }}
                  transition={{ type: 'tween', duration: 0.3 }}
                  className="fixed top-0 left-0 bottom-0 w-[280px] z-50 md:hidden"
                >
                  <Sidebar isMobile onClose={() => setIsSidebarOpen(false)} />
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Top Navigation */}
            <TopNav onMenuClick={() => setIsSidebarOpen(true)} />

            {/* Page Content */}
            <main className="flex-1 overflow-y-auto p-4 sm:p-6 pb-20 md:pb-6">
              <Outlet />
            </main>
          </div>
        </div>

        {/* Mobile Bottom Navigation */}
        <MobileNav />

        {/* Global Search Overlay */}
        <GlobalSearch />
      </div>
    </SearchProvider>
  );
};