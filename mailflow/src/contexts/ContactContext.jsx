import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { mockContactService } from '../services/api';
import toast from 'react-hot-toast';

const ContactContext = createContext();

export const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  // Load contacts on mount
  useEffect(() => {
    loadContacts();
  }, []);

  // Load contacts from API
  const loadContacts = async () => {
    setIsLoading(true);
    try {
      const data = await mockContactService.getContacts();
      setContacts(data);
    } catch (error) {
      toast.error('Failed to load contacts');
      setContacts([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Get filtered and sorted contacts
  const getFilteredContacts = useCallback(() => {
    let filtered = [...contacts];

    // Apply filter
    if (filter === 'favorite') {
      filtered = filtered.filter(contact => contact.favorite);
    } else if (filter === 'recent') {
      filtered = filtered.sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      );
      return filtered.slice(0, 10);
    }

    // Apply search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(contact =>
        contact.name.toLowerCase().includes(query) ||
        contact.email.toLowerCase().includes(query) ||
        contact.company.toLowerCase().includes(query) ||
        contact.designation.toLowerCase().includes(query)
      );
    }

    // Apply sort
    if (sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'company') {
      filtered.sort((a, b) => a.company.localeCompare(b.company));
    } else if (sortBy === 'recent') {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return filtered;
  }, [contacts, filter, searchQuery, sortBy]);

  // Create contact
  const createContact = async (contactData) => {
    try {
      const newContact = await mockContactService.createContact(contactData);
      setContacts(prev => [newContact, ...prev]);
      toast.success('Contact added successfully!');
      setIsModalOpen(false);
      return { success: true };
    } catch (error) {
      toast.error('Failed to add contact');
      return { success: false };
    }
  };

  // Update contact
  const updateContact = async (contactId, contactData) => {
    try {
      const updatedContact = await mockContactService.updateContact(contactId, contactData);
      setContacts(prev => prev.map(contact =>
        contact.id === contactId ? updatedContact : contact
      ));
      toast.success('Contact updated successfully!');
      setIsModalOpen(false);
      setEditingContact(null);
      setSelectedContact(null);
      return { success: true };
    } catch (error) {
      toast.error('Failed to update contact');
      return { success: false };
    }
  };

  // Delete contact
  const deleteContact = async (contactId) => {
    if (!window.confirm('Are you sure you want to delete this contact?')) {
      return { success: false };
    }

    try {
      await mockContactService.deleteContact(contactId);
      setContacts(prev => prev.filter(contact => contact.id !== contactId));
      setSelectedContact(null);
      toast.success('Contact deleted successfully!');
      return { success: true };
    } catch (error) {
      toast.error('Failed to delete contact');
      return { success: false };
    }
  };

  // Toggle favorite
  const toggleFavorite = (contactId) => {
    setContacts(prev => prev.map(contact =>
      contact.id === contactId
        ? { ...contact, favorite: !contact.favorite }
        : contact
    ));
  };

  const value = {
    contacts,
    isLoading,
    selectedContact,
    searchQuery,
    filter,
    sortBy,
    isModalOpen,
    editingContact,
    viewMode,
    setSelectedContact,
    setSearchQuery,
    setFilter,
    setSortBy,
    setIsModalOpen,
    setEditingContact,
    setViewMode,
    loadContacts,
    getFilteredContacts,
    createContact,
    updateContact,
    deleteContact,
    toggleFavorite,
  };

  return (
    <ContactContext.Provider value={value}>
      {children}
    </ContactContext.Provider>
  );
};

export const useContacts = () => {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error('useContacts must be used within a ContactProvider');
  }
  return context;
};