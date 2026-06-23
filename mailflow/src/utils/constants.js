export const APP_NAME = 'MailFlow';

export const ROUTES = {
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  INBOX: '/inbox',
  SENT: '/sent',
  DRAFTS: '/drafts',
  SPAM: '/spam',
  TRASH: '/trash',
  ARCHIVE: '/archive',
  CALENDAR: '/calendar',
  CONTACTS: '/contacts',
  TASKS: '/tasks',
  SETTINGS: '/settings',
};

export const SIDEBAR_ITEMS = [
  { id: 'inbox', label: 'Inbox', icon: 'InboxIcon', path: ROUTES.INBOX, badge: 12 },
  { id: 'sent', label: 'Sent', icon: 'PaperAirplaneIcon', path: ROUTES.SENT },
  { id: 'drafts', label: 'Drafts', icon: 'PencilIcon', path: ROUTES.DRAFTS, badge: 3 },
  { id: 'spam', label: 'Spam', icon: 'ExclamationTriangleIcon', path: ROUTES.SPAM, badge: 5 },
  { id: 'trash', label: 'Trash', icon: 'TrashIcon', path: ROUTES.TRASH },
  { id: 'archive', label: 'Archive', icon: 'ArchiveBoxIcon', path: ROUTES.ARCHIVE },
  { separator: true },
  { id: 'calendar', label: 'Calendar', icon: 'CalendarIcon', path: ROUTES.CALENDAR },
  { id: 'contacts', label: 'Contacts', icon: 'UserGroupIcon', path: ROUTES.CONTACTS },
  { id: 'tasks', label: 'Tasks', icon: 'ClipboardDocumentListIcon', path: ROUTES.TASKS },
  { separator: true },
  { id: 'settings', label: 'Settings', icon: 'Cog6ToothIcon', path: ROUTES.SETTINGS },
];

export const MOBILE_NAV_ITEMS = [
  { id: 'inbox', label: 'Inbox', icon: 'InboxIcon', path: ROUTES.INBOX },
  { id: 'calendar', label: 'Calendar', icon: 'CalendarIcon', path: ROUTES.CALENDAR },
  { id: 'contacts', label: 'Contacts', icon: 'UserGroupIcon', path: ROUTES.CONTACTS },
  { id: 'tasks', label: 'Tasks', icon: 'ClipboardDocumentListIcon', path: ROUTES.TASKS },
  { id: 'settings', label: 'Settings', icon: 'Cog6ToothIcon', path: ROUTES.SETTINGS },
];


export const CONTACT_FILTERS = [
  { id: 'all', label: 'All Contacts' },
  { id: 'recent', label: 'Recent' },
  { id: 'favorite', label: 'Favorites' },
];

export const SORT_OPTIONS = [
  { id: 'name', label: 'Name' },
  { id: 'company', label: 'Company' },
  { id: 'recent', label: 'Recently Added' },
];




export const TASK_PRIORITIES = [
  { id: 'low', label: 'Low', color: 'bg-green-500', textColor: 'text-green-600 dark:text-green-400' },
  { id: 'medium', label: 'Medium', color: 'bg-yellow-500', textColor: 'text-yellow-600 dark:text-yellow-400' },
  { id: 'high', label: 'High', color: 'bg-orange-500', textColor: 'text-orange-600 dark:text-orange-400' },
  { id: 'urgent', label: 'Urgent', color: 'bg-red-500', textColor: 'text-red-600 dark:text-red-400' },
];

export const TASK_FILTERS = [
  { id: 'all', label: 'All Tasks' },
  { id: 'pending', label: 'Pending' },
  { id: 'completed', label: 'Completed' },
  { id: 'overdue', label: 'Overdue' },
];

export const TASK_SORT_OPTIONS = [
  { id: 'dueDate', label: 'Due Date' },
  { id: 'priority', label: 'Priority' },
  { id: 'createdAt', label: 'Recently Added' },
  { id: 'name', label: 'Name' },
];




export const SEARCH_TYPES = [
  { id: 'all', label: 'All' },
  { id: 'emails', label: 'Emails' },
  { id: 'contacts', label: 'Contacts' },
  { id: 'tasks', label: 'Tasks' },
  { id: 'events', label: 'Events' },
];

export const SEARCH_FILTERS = [
  { id: 'all', label: 'All Results' },
  { id: 'recent', label: 'Recent' },
  { id: 'relevant', label: 'Most Relevant' },
];