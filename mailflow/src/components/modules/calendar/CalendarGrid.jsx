import React from 'react';
import { format, isSameMonth, isSameDay, isToday } from 'date-fns';
import { motion } from 'framer-motion';
import { useCalendar } from '../../../contexts/CalendarContext';
import { CalendarEvent } from './CalendarEvent';
import { getEventsForDay, getMonthDays, getWeekDays } from '../../../utils/calendarHelpers';

/**
 * Calendar Grid Component
 * Displays events in day, week, or month view
 */
export const CalendarGrid = () => {
  const { events, currentDate, view, setIsEventModalOpen, setEditingEvent } = useCalendar();

  let days = [];
  let weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  if (view === 'month') {
    days = getMonthDays(currentDate);
  } else if (view === 'week') {
    days = getWeekDays(currentDate);
  } else {
    // Day view - just one day
    days = [currentDate];
  }

  const handleDayClick = (day) => {
    setEditingEvent(null);
    // In day view, open add event modal with selected date
    if (view === 'day') {
      setIsEventModalOpen(true);
    } else {
      // For week/month views, we could navigate to day view
      // For now, just set current date and open modal
      // setCurrentDate(day);
      // setIsEventModalOpen(true);
    }
  };

  // Month view grid
  if (view === 'month') {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Week header */}
        <div className="grid grid-cols-7 border-b border-gray-200 dark:border-gray-700">
          {weekDays.map((day) => (
            <div
              key={day}
              className="py-2 sm:py-3 text-center text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Month grid */}
        <div className="grid grid-cols-7">
          {days.map((day, index) => {
            const dayEvents = getEventsForDay(events, day);
            const isCurrentMonth = isSameMonth(day, currentDate);
            const isTodayDate = isToday(day);

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.01 }}
                onClick={() => handleDayClick(day)}
                className={`
                  min-h-[80px] sm:min-h-[120px] p-1 sm:p-2 border-r border-b border-gray-100 dark:border-gray-700
                  ${!isCurrentMonth ? 'bg-gray-50 dark:bg-gray-800/50' : ''}
                  ${isTodayDate ? 'bg-primary-50 dark:bg-primary-900/10' : ''}
                  hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors cursor-pointer
                `}
              >
                <div className="flex items-center justify-between">
                  <span className={`
                    text-sm font-medium
                    ${!isCurrentMonth ? 'text-gray-400 dark:text-gray-600' : 'text-gray-900 dark:text-white'}
                    ${isTodayDate ? 'bg-primary-600 text-white rounded-full w-8 h-8 flex items-center justify-center' : ''}
                  `}>
                    {format(day, 'd')}
                  </span>
                  {dayEvents.length > 0 && (
                    <span className="text-[10px] text-gray-400 dark:text-gray-500">
                      {dayEvents.length}
                    </span>
                  )}
                </div>

                {/* Events */}
                <div className="space-y-1 mt-1 max-h-[60px] sm:max-h-[80px] overflow-y-auto">
                  {dayEvents.slice(0, 3).map((event) => (
                    <CalendarEvent key={event.id} event={event} />
                  ))}
                  {dayEvents.length > 3 && (
                    <div className="text-[10px] text-gray-400 dark:text-gray-500 text-center">
                      +{dayEvents.length - 3} more
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  }

  // Week or Day view
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Time slots */}
      <div className="grid grid-cols-1">
        {/* Header with days */}
        <div className={`grid ${view === 'day' ? 'grid-cols-1' : 'grid-cols-7'} border-b border-gray-200 dark:border-gray-700`}>
          {days.map((day, index) => (
            <div
              key={index}
              className={`py-2 sm:py-3 text-center ${
                view !== 'day' && index > 0 ? 'border-l border-gray-200 dark:border-gray-700' : ''
              }`}
            >
              <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                {view === 'day' ? 'Today' : format(day, 'EEE')}
              </p>
              <p className={`text-lg sm:text-xl font-bold ${isToday(day) ? 'text-primary-600 dark:text-primary-400' : 'text-gray-900 dark:text-white'}`}>
                {format(day, 'd')}
              </p>
            </div>
          ))}
        </div>

        {/* Time slots */}
        <div className={`grid ${view === 'day' ? 'grid-cols-1' : 'grid-cols-7'}`}>
          {days.map((day, dayIndex) => {
            const dayEvents = getEventsForDay(events, day);
            
            return (
              <div
                key={dayIndex}
                className={`min-h-[400px] p-2 ${
                  view !== 'day' && dayIndex > 0 ? 'border-l border-gray-200 dark:border-gray-700' : ''
                }`}
              >
                {dayEvents.length === 0 ? (
                  <div className="text-center text-gray-400 dark:text-gray-500 text-sm py-4">
                    No events
                  </div>
                ) : (
                  <div className="space-y-1">
                    {dayEvents.map((event) => (
                      <CalendarEvent key={event.id} event={event} />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};