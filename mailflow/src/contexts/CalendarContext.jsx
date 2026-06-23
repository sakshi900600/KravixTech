import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { mockCalendarService } from '../services/api';
import toast from 'react-hot-toast';
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns';

const CalendarContext = createContext();

export const CalendarProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('month'); // 'day', 'week', 'month'
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  // Load events on mount
  useEffect(() => {
    loadEvents();
  }, []);

  // Load events from API
  const loadEvents = async () => {
    setIsLoading(true);
    try {
      const data = await mockCalendarService.getEvents();
      setEvents(data);
    } catch (error) {
      toast.error('Failed to load events');
      setEvents([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Get events for current view
  const getVisibleEvents = useCallback(() => {
    let start, end;

    if (view === 'day') {
      start = new Date(currentDate);
      start.setHours(0, 0, 0, 0);
      end = new Date(currentDate);
      end.setHours(23, 59, 59, 999);
    } else if (view === 'week') {
      start = startOfWeek(currentDate, { weekStartsOn: 0 });
      end = endOfWeek(currentDate, { weekStartsOn: 0 });
    } else {
      start = startOfMonth(currentDate);
      end = endOfMonth(currentDate);
    }

    return events.filter(event => {
      try {
        const eventDate = new Date(event.start);
        return eventDate >= start && eventDate <= end;
      } catch {
        return false;
      }
    });
  }, [events, currentDate, view]);

  // Create event
  const createEvent = async (eventData) => {
    try {
      const newEvent = await mockCalendarService.createEvent(eventData);
      setEvents(prev => [...prev, newEvent]);
      toast.success('Event created successfully!');
      setIsEventModalOpen(false);
      return { success: true };
    } catch (error) {
      toast.error('Failed to create event');
      return { success: false };
    }
  };

  // Update event
  const updateEvent = async (eventId, eventData) => {
    try {
      const updatedEvent = await mockCalendarService.updateEvent(eventId, eventData);
      setEvents(prev => prev.map(event => 
        event.id === eventId ? updatedEvent : event
      ));
      toast.success('Event updated successfully!');
      setIsEventModalOpen(false);
      setEditingEvent(null);
      return { success: true };
    } catch (error) {
      toast.error('Failed to update event');
      return { success: false };
    }
  };

  // Delete event
  const deleteEvent = async (eventId) => {
    if (!window.confirm('Are you sure you want to delete this event?')) {
      return { success: false };
    }

    try {
      await mockCalendarService.deleteEvent(eventId);
      setEvents(prev => prev.filter(event => event.id !== eventId));
      setSelectedEvent(null);
      toast.success('Event deleted successfully!');
      return { success: true };
    } catch (error) {
      toast.error('Failed to delete event');
      return { success: false };
    }
  };

  // Navigate date
  const navigateDate = (direction) => {
    const newDate = new Date(currentDate);
    if (view === 'day') {
      newDate.setDate(newDate.getDate() + direction);
    } else if (view === 'week') {
      newDate.setDate(newDate.getDate() + direction * 7);
    } else {
      newDate.setMonth(newDate.getMonth() + direction);
    }
    setCurrentDate(newDate);
  };

  // Go to today
  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const value = {
    events,
    isLoading,
    currentDate,
    view,
    selectedEvent,
    isEventModalOpen,
    editingEvent,
    setCurrentDate,
    setView,
    setSelectedEvent,
    setIsEventModalOpen,
    setEditingEvent,
    loadEvents,
    getVisibleEvents,
    createEvent,
    updateEvent,
    deleteEvent,
    navigateDate,
    goToToday,
  };

  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error('useCalendar must be used within a CalendarProvider');
  }
  return context;
};