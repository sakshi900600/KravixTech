import React from 'react';
import { useCalendar } from '../../../contexts/CalendarContext';
import { CalendarHeader } from './CalendarHeader';
import { CalendarGrid } from './CalendarGrid';
import { EventModal } from './EventModal';
import { CalendarSkeleton } from './CalendarSkeleton';

/**
 * Main Calendar Component
 * Combines header, grid, and event modal
 */
export const Calendar = () => {
  const { isLoading } = useCalendar();

  if (isLoading) {
    return <CalendarSkeleton />;
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <CalendarHeader />
      <CalendarGrid />
      <EventModal />
    </div>
  );
};