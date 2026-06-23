import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, UserIcon, EnvelopeIcon, PhoneIcon, BriefcaseIcon, DocumentTextIcon, PencilIcon } from '@heroicons/react/24/outline';
import { useContacts } from '../../../contexts/ContactContext';
import toast from 'react-hot-toast';

/**
 * Contact Modal Component
 * Create, Edit, and View contacts
 */
export const ContactModal = () => {
  const {
    isModalOpen,
    setIsModalOpen,
    editingContact,
    setEditingContact,
    selectedContact,
    setSelectedContact,
    createContact,
    updateContact,
    deleteContact,
  } = useContacts();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    company: '',
    designation: '',
    notes: '',
    favorite: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Check if we're in edit mode
  useEffect(() => {
    const contact = editingContact || selectedContact;
    if (contact) {
      setFormData({
        name: contact.name || '',
        email: contact.email || '',
        mobile: contact.mobile || '',
        company: contact.company || '',
        designation: contact.designation || '',
        notes: contact.notes || '',
        favorite: contact.favorite || false,
      });
      // Set editing state based on whether we have editingContact
      setIsEditing(!!editingContact);
    } else {
      setFormData({
        name: '',
        email: '',
        mobile: '',
        company: '',
        designation: '',
        notes: '',
        favorite: false,
      });
      setIsEditing(false);
    }
  }, [editingContact, selectedContact]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast.error('Please enter a name');
      return;
    }
    if (!formData.email.trim()) {
      toast.error('Please enter an email');
      return;
    }

    setIsSubmitting(true);

    const contactData = {
      ...formData,
      name: formData.name.trim(),
      email: formData.email.trim(),
    };

    let result;
    if (isEditing && editingContact) {
      // Update existing contact
      result = await updateContact(editingContact.id, contactData);
    } else if (selectedContact && !isEditing) {
      // Viewing mode - close without saving
      handleClose();
      setIsSubmitting(false);
      return;
    } else {
      // Create new contact
      result = await createContact(contactData);
    }

    setIsSubmitting(false);
    if (result?.success) {
      handleClose();
    }
  };

  const handleDelete = async () => {
    const contactId = editingContact?.id || selectedContact?.id;
    if (contactId) {
      const result = await deleteContact(contactId);
      if (result.success) {
        handleClose();
      }
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setEditingContact(null);
    setSelectedContact(null);
    setIsEditing(false);
  };

  // Enable edit mode from view mode
  const handleEditClick = () => {
    if (selectedContact) {
      setEditingContact(selectedContact);
      setSelectedContact(null);
      setIsEditing(true);
    }
  };

  if (!isModalOpen) return null;

  const isViewing = selectedContact && !isEditing;
  const isEditMode = isEditing || !!editingContact;
  const isCreateMode = !selectedContact && !editingContact;

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
            <div className="flex items-center space-x-3">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {isViewing ? 'Contact Details' : isEditMode ? 'Edit Contact' : 'Add Contact'}
              </h3>
              {isViewing && (
                <button
                  onClick={handleEditClick}
                  className="p-1.5 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors"
                  title="Edit contact"
                >
                  <PencilIcon className="h-4 w-4" />
                </button>
              )}
            </div>
            <button
              onClick={handleClose}
              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <XMarkIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
            {/* Avatar Preview */}
            {formData.name && (
              <div className="flex justify-center mb-4">
                <img
                  src={`https://ui-avatars.com/api/?name=${formData.name}&background=2563eb&color=fff&size=80`}
                  alt={formData.name}
                  className="h-20 w-20 rounded-full ring-4 ring-primary-500/20"
                />
              </div>
            )}

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Full Name *
              </label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  disabled={isViewing}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-60 disabled:cursor-not-allowed"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Email Address *
              </label>
              <div className="relative">
                <EnvelopeIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email address"
                  disabled={isViewing}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-60 disabled:cursor-not-allowed"
                  required
                />
              </div>
            </div>

            {/* Mobile */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Mobile Number
              </label>
              <div className="relative">
                <PhoneIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Enter mobile number"
                  disabled={isViewing}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-60 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            {/* Company */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Company
              </label>
              <div className="relative">
                <BriefcaseIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Enter company name"
                  disabled={isViewing}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-60 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            {/* Designation */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Designation
              </label>
              <input
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                placeholder="Enter job title"
                disabled={isViewing}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-60 disabled:cursor-not-allowed"
              />
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Notes
              </label>
              <div className="relative">
                <DocumentTextIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Add notes about this contact"
                  disabled={isViewing}
                  rows="3"
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-60 disabled:cursor-not-allowed resize-none"
                />
              </div>
            </div>
          </form>

          {/* Footer */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-gray-700 shrink-0 bg-gray-50 dark:bg-gray-800/50">
            <div>
              {(isEditMode || isViewing) && (
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
                {isViewing ? 'Close' : 'Cancel'}
              </button>
              {!isViewing && (
                <button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                >
                  {isSubmitting ? 'Saving...' : isEditMode ? 'Update Contact' : 'Add Contact'}
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};