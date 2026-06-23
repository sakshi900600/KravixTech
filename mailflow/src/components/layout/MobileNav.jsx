// import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  InboxIcon,
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
import { MOBILE_NAV_ITEMS } from '../../utils/constants';

const iconMap = {
  InboxIcon: InboxIcon,
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
 * Mobile Bottom Navigation
 * Visible only on mobile devices
 */
export const MobileNav = () => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-50">
      <div className="flex items-center justify-around px-2">
        {MOBILE_NAV_ITEMS.map((item) => {
          const Icon = iconMap[item.icon];
          const IconSolid = iconMapSolid[item.icon];
          
          return (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) => `
                flex flex-col items-center py-1.5 px-3 rounded-lg transition-all duration-200 min-w-[56px]
                ${isActive 
                  ? 'text-primary-600 dark:text-primary-400' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }
              `}
            >
              {({ isActive }) => (
                <>
                  {isActive ? (
                    <IconSolid className="h-6 w-6" />
                  ) : (
                    <Icon className="h-6 w-6" />
                  )}
                  <span className="text-[10px] font-medium mt-0.5">
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};