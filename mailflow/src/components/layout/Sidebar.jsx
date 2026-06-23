import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  InboxIcon,
  PaperAirplaneIcon,
  PencilIcon,
  ExclamationTriangleIcon,
  TrashIcon,
  ArchiveBoxIcon,
  CalendarIcon,
  UserGroupIcon,
  ClipboardDocumentListIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';
import {
  InboxIcon as InboxIconSolid,
  CalendarIcon as CalendarIconSolid,
  UserGroupIcon as UserGroupIconSolid,
  ClipboardDocumentListIcon as ClipboardDocumentListIconSolid,
  Cog6ToothIcon as Cog6ToothIconSolid,
} from '@heroicons/react/24/solid';
import { SIDEBAR_ITEMS } from '../../utils/constants';
import { useTheme } from '../../contexts/ThemeContext';
import { ROUTES } from '../../utils/constants';

// Icon mapping - Make sure all icons are properly mapped
const iconMap = {
  InboxIcon: InboxIcon,
  PaperAirplaneIcon: PaperAirplaneIcon,
  PencilIcon: PencilIcon,
  ExclamationTriangleIcon: ExclamationTriangleIcon,
  TrashIcon: TrashIcon,
  ArchiveBoxIcon: ArchiveBoxIcon,
  CalendarIcon: CalendarIcon,
  UserGroupIcon: UserGroupIcon,
  ClipboardDocumentListIcon: ClipboardDocumentListIcon,
  Cog6ToothIcon: Cog6ToothIcon,
};

const iconMapSolid = {
  InboxIcon: InboxIconSolid,
  CalendarIcon: CalendarIconSolid,
  UserGroupIcon: UserGroupIconSolid,
  ClipboardDocumentListIcon: ClipboardDocumentListIconSolid,
  Cog6ToothIcon: Cog6ToothIconSolid,
};

/**
 * Sidebar Navigation Component
 * Responsive: Hidden on mobile, shown on tablet/desktop
 */
export const Sidebar = ({ isMobile = false, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isDark } = useTheme();

  const isActive = (path) => {
    return location.pathname === path;
  };

  // Handle logo click - navigate to dashboard and close sidebar
  const handleLogoClick = () => {
    navigate(ROUTES.DASHBOARD);
    if (isMobile && onClose) {
      onClose();
    }
  };

  return (
    <aside className={`
      ${isMobile ? 'w-full' : 'hidden md:flex md:w-64 lg:w-72'}
      flex flex-col bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700
      h-full overflow-y-auto
    `}>
      {/* Logo Section */}
      <div 
        onClick={handleLogoClick}
        className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700 shrink-0 cursor-pointer group"
      >
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
            <span className="text-sm font-bold text-white">MF</span>
          </div>
          <span className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            MailFlow
          </span>
        </div>
        {isMobile && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Close sidebar"
          >
            <svg className="h-5 w-5 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {SIDEBAR_ITEMS.map((item, index) => {
          if (item.separator) {
            return (
              <div key={`separator-${index}`} className="my-3 border-t border-gray-200 dark:border-gray-700"></div>
            );
          }

          // Get the icon component - with fallback
          const Icon = iconMap[item.icon];
          const IconSolid = iconMapSolid[item.icon];
          
          // If icon doesn't exist, skip this item
          if (!Icon) {
            console.warn(`Icon "${item.icon}" not found for item:`, item);
            return null;
          }

          const active = isActive(item.path);

          return (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) => `
                flex items-center px-3 py-2.5 rounded-lg transition-all duration-200
                ${isActive 
                  ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50'
                }
                group relative
              `}
              onClick={() => {
                if (isMobile && onClose) {
                  onClose();
                }
              }}
            >
              {/* Active Indicator */}
              {active && (
                <motion.div
                  layoutId="sidebarActive"
                  className="absolute left-0 w-1 h-8 bg-primary-600 dark:bg-primary-400 rounded-r-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}

              {/* Icon */}
              <div className="flex items-center justify-center w-5 h-5 mr-3">
                {active && IconSolid ? (
                  <IconSolid className="h-5 w-5" />
                ) : (
                  <Icon className="h-5 w-5 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
                )}
              </div>

              {/* Label */}
              <span className="text-sm font-medium flex-1">
                {item.label}
              </span>

              {/* Badge */}
              {item.badge && (
                <span className={`
                  px-2 py-0.5 text-xs font-medium rounded-full
                  ${active 
                    ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }
                `}>
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* User Profile at Bottom */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 shrink-0">
        <div className="flex items-center space-x-3">
          <img
            src="https://ui-avatars.com/api/?name=John+Doe&background=2563eb&color=fff&size=40"
            alt="User"
            className="h-9 w-9 rounded-full ring-2 ring-primary-500/20"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
              John Doe
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              john@example.com
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};