import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, CalendarIcon, ClockIcon, MapPinIcon, UserGroupIcon, BellIcon } from '@heroicons/react/24/outline';
import { useCalendar } from '../../../contexts/CalendarContext';
import { formatDate } from '../../../utils/calendarHelpers';
import toast from 'react-hot-toast';

/**
 * Event Modal Component
 * Create and Edit events
 */
export const EventModal = () => {
  const {
    isEventModalOpen,
    setIsEventModalOpen,
    editingEvent,
    setEditingEvent,
    createEvent,
    updateEvent,
    deleteEvent,
    selectedEvent,
    setSelectedEvent,
  } = useCalendar();

  const [formData, setFormData] = useState({
    title: '',
    start: '',
    end: '',
    description: '',
    type: 'meeting',
    location: '',
    allDay: false,
    reminder: null,
    attendees: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editingEvent || selectedEvent) {
      const event = editingEvent || selectedEvent;
      setFormData({
        title: event.title || '',
        start: event.start ? new Date(event.start).toISOString().slice(0, 16) : '',
        end: event.end ? new Date(event.end).toISOString().slice(0, 16) : '',
        description: event.description || '',
        type: event.type || 'meeting',
        location: event.location || '',
        allDay: event.allDay || false,
        reminder: event.reminder || null,
        attendees: event.attendees || [],
      });
    } else {
      // Set default start time to next hour
      const now = new Date();
      now.setHours(now.getHours() + 1, 0, 0, 0);
      const end = new Date(now);
      end.setHours(end.getHours() + 1);
      
      setFormData({
        title: '',
        start: now.toISOString().slice(0, 16),
        end: end.toISOString().slice(0, 16),
        description: '',
        type: 'meeting',
        location: '',
        allDay: false,
        reminder: null,
        attendees: [],
      });
    }
  }, [editingEvent, selectedEvent]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      toast.error('Please enter a title');
      return;
    }
    if (!formData.start) {
      toast.error('Please select a start time');
      return;
    }
    if (!formData.end) {
      toast.error('Please select an end time');
      return;
    }

    setIsSubmitting(true);

    const eventData = {
      ...formData,
      attendees: formData.attendees || [],
    };

    let result;
    if (editingEvent || selectedEvent) {
      const eventId = editingEvent?.id || selectedEvent?.id;
      result = await updateEvent(eventId, eventData);
    } else {
      result = await createEvent(eventData);
    }

    setIsSubmitting(false);
    if (result.success) {
      handleClose();
    }
  };

  const handleDelete = async () => {
    const eventId = editingEvent?.id || selectedEvent?.id;
    if (eventId) {
      const result = await deleteEvent(eventId);
      if (result.success) {
        handleClose();
      }
    }
  };

  const handleClose = () => {
    setIsEventModalOpen(false);
    setEditingEvent(null);
    setSelectedEvent(null);
  };

  if (!isEventModalOpen) return null;

  const isEditing = !!(editingEvent || selectedEvent);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', duration: 0.4 }}
          className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700 shrink-0">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {isEditing ? 'Edit Event' : 'New Event'}
            </h3>
            <button
              onClick={handleClose}
              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <XMarkIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter event title"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>

            {/* Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Event Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="meeting">Meeting</option>
                <option value="task">Task</option>
                <option value="reminder">Reminder</option>
                <option value="birthday">Birthday</option>
                <option value="holiday">Holiday</option>
              </select>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Start *
                </label>
                <input
                  type="datetime-local"
                  name="start"
                  value={formData.start}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  End *
                </label>
                <input
                  type="datetime-local"
                  name="end"
                  value={formData.end}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>
            </div>

            {/* All Day */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="allDay"
                checked={formData.allDay}
                onChange={handleChange}
                className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <label className="text-sm text-gray-700 dark:text-gray-300">
                All day event
              </label>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Location
              </label>
              <div className="relative">
                <MapPinIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Add location"
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                placeholder="Add description"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
              />
            </div>

            {/* Reminder */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Reminder
              </label>
              <select
                name="reminder"
                value={formData.reminder || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">No reminder</option>
                <option value="5">5 minutes before</option>
                <option value="15">15 minutes before</option>
                <option value="30">30 minutes before</option>
                <option value="60">1 hour before</option>
                <option value="1440">1 day before</option>
              </select>
            </div>
          </form>

          {/* Footer */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-gray-700 shrink-0 bg-gray-50 dark:bg-gray-800/50">
            <div>
              {isEditing && (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors text-sm font-medium"
                >
                  Delete
                </button>
              )}
            </div>
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-sm font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
              >
                {isSubmitting ? 'Saving...' : isEditing ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};