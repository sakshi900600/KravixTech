import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  // isSameMonth,
  isSameDay,
  isToday,
  // addMonths,
  // subMonths,
  // addWeeks,
  // subWeeks,
  startOfWeek as getStartOfWeek,
  endOfWeek as getEndOfWeek,
  isWithinInterval,
  parseISO,
} from 'date-fns';

/**
 * Get days for month view
 */
export const getMonthDays = (date) => {
  const start = startOfWeek(startOfMonth(date), { weekStartsOn: 0 });
  const end = endOfWeek(endOfMonth(date), { weekStartsOn: 0 });
  return eachDayOfInterval({ start, end });
};

/**
 * Get days for week view
 */
export const getWeekDays = (date) => {
  const start = getStartOfWeek(date, { weekStartsOn: 0 });
  const end = getEndOfWeek(date, { weekStartsOn: 0 });
  return eachDayOfInterval({ start, end });
};

/**
 * Get events for a specific day
 */
export const getEventsForDay = (events, day) => {
  return events.filter(event => {
    try {
      const eventDate = typeof event.start === 'string' 
        ? parseISO(event.start) 
        : event.start;
      return isSameDay(eventDate, day);
    } catch {
      return false;
    }
  });
};

/**
 * Get events for a specific date range
 */
export const getEventsForRange = (events, start, end) => {
  return events.filter(event => {
    try {
      const eventDate = typeof event.start === 'string' 
        ? parseISO(event.start) 
        : event.start;
      return isWithinInterval(eventDate, { start, end });
    } catch {
      return false;
    }
  });
};

/**
 * Format time for display
 */
export const formatTime = (date) => {
  try {
    return format(new Date(date), 'h:mm a');
  } catch {
    return '';
  }
};

/**
 * Format date for display
 */
export const formatDate = (date, formatStr = 'MMM d, yyyy') => {
  try {
    return format(new Date(date), formatStr);
  } catch {
    return '';
  }
};

/**
 * Check if date is today
 */
export const isDateToday = (date) => {
  try {
    return isToday(new Date(date));
  } catch {
    return false;
  }
};

/**
 * Get event status color
 */
export const getEventColor = (type) => {
  const colors = {
    meeting: 'bg-blue-500',
    task: 'bg-green-500',
    reminder: 'bg-yellow-500',
    birthday: 'bg-pink-500',
    holiday: 'bg-purple-500',
    default: 'bg-primary-500',
  };
  return colors[type] || colors.default;
};

/**
 * Get event status color (light version for backgrounds)
 */
export const getEventColorLight = (type) => {
  const colors = {
    meeting: 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300',
    task: 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300',
    reminder: 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300',
    birthday: 'bg-pink-100 dark:bg-pink-900/20 text-pink-700 dark:text-pink-300',
    holiday: 'bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300',
    default: 'bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300',
  };
  return colors[type] || colors.default;
};