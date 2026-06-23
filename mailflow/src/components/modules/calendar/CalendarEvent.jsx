import React from 'react';
import { motion } from 'framer-motion';
import { getEventColor, formatTime } from '../../../utils/calendarHelpers';
import { useCalendar } from '../../../contexts/CalendarContext';

/**
 * Calendar Event Component
 * Individual event display with color coding
 */
export const CalendarEvent = ({ event, onEdit }) => {
  const { setSelectedEvent, setIsEventModalOpen, setEditingEvent } = useCalendar();

  const handleClick = () => {
    setSelectedEvent(event);
    setIsEventModalOpen(true);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    setEditingEvent(event);
    setIsEventModalOpen(true);
  };

  const eventColor = getEventColor(event.type);
  const time = formatTime(event.start);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      onClick={handleClick}
      className={`
        cursor-pointer rounded-lg p-1.5 sm:p-2 mb-1 transition-all duration-200
        hover:shadow-lg hover:scale-[1.02] group
        ${eventColor}
        ${event.allDay ? 'w-full' : 'max-w-full'}
      `}
    >
      <div className="flex items-start justify-between gap-1">
        <div className="min-w-0 flex-1">
          <p className="text-xs sm:text-sm font-medium text-white truncate">
            {event.title}
          </p>
          {!event.allDay && (
            <p className="text-[10px] sm:text-xs text-white/80 truncate">
              {time}
            </p>
          )}
          {event.location && (
            <p className="text-[10px] text-white/60 truncate hidden sm:block">
              📍 {event.location}
            </p>
          )}
        </div>
        
        {/* Edit Button */}
        <button
          onClick={handleEdit}
          className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 hover:bg-white/20 rounded"
          aria-label="Edit event"
        >
          <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
};