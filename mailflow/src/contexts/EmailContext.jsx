import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { mockEmailService } from '../services/api';
import toast from 'react-hot-toast';

const EmailContext = createContext();

export const EmailProvider = ({ children }) => {
  const [emails, setEmails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [currentFilter, setCurrentFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isComposeOpen, setIsComposeOpen] = useState(false);

  // Load emails from API
  const loadEmails = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await mockEmailService.getInbox();
      setEmails(data);
    } catch {
      toast.error('Failed to load emails');
      setEmails([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load emails on mount
  // eslint-disable-next-line
  useEffect(() => {
    loadEmails();
  }, [loadEmails]);

  // Get filtered emails
  const getFilteredEmails = useCallback(() => {
    let filtered = [...emails];

    // Apply filter
    switch (currentFilter) {
      case 'unread':
        filtered = filtered.filter(email => !email.isRead);
        break;
      case 'starred':
        filtered = filtered.filter(email => email.isStarred);
        break;
      case 'attachments':
        filtered = filtered.filter(email => email.hasAttachments);
        break;
      default:
        break;
    }

    // Apply search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(email =>
        email.sender?.name?.toLowerCase().includes(query) ||
        email.subject?.toLowerCase().includes(query) ||
        email.preview?.toLowerCase().includes(query)
      );
    }

    // Sort by date (newest first)
    return filtered.sort((a, b) => {
      try {
        return new Date(b.timestamp) - new Date(a.timestamp);
      } catch {
        return 0;
      }
    });
  }, [emails, currentFilter, searchQuery]);

  // Toggle email selection
  const toggleSelectEmail = (emailId) => {
    setSelectedEmails(prev =>
      prev.includes(emailId)
        ? prev.filter(id => id !== emailId)
        : [...prev, emailId]
    );
  };

  // Select all emails
  const selectAllEmails = () => {
    const filteredIds = getFilteredEmails().map(email => email.id);
    if (selectedEmails.length === filteredIds.length && filteredIds.length > 0) {
      setSelectedEmails([]);
    } else {
      setSelectedEmails(filteredIds);
    }
  };

  // Mark email as read/unread
  const markAsRead = (emailId, isRead = true) => {
    setEmails(prev =>
      prev.map(email =>
        email.id === emailId
          ? { ...email, isRead }
          : email
      )
    );
    // Also update selected email if it's the same
    if (selectedEmail && selectedEmail.id === emailId) {
      setSelectedEmail(prev => prev ? { ...prev, isRead } : null);
    }
    toast.success(isRead ? 'Marked as read' : 'Marked as unread');
  };

  // Toggle star - FIXED to properly update both emails and selectedEmail
  const toggleStar = (emailId) => {
    // Find the email to toggle
    const emailToToggle = emails.find(email => email.id === emailId);
    if (!emailToToggle) return;

    const newStarredState = !emailToToggle.isStarred;

    // Update emails list
    setEmails(prev =>
      prev.map(email =>
        email.id === emailId
          ? { ...email, isStarred: newStarredState }
          : email
      )
    );

    // Update selected email if it's the same
    if (selectedEmail && selectedEmail.id === emailId) {
      setSelectedEmail(prev => prev ? { ...prev, isStarred: newStarredState } : null);
    }

    toast.success(newStarredState ? 'Starred' : 'Unstarred');
  };

  // Delete email(s)
  const deleteEmails = (emailIds) => {
    setEmails(prev => prev.filter(email => !emailIds.includes(email.id)));
    setSelectedEmails([]);
    if (selectedEmail && emailIds.includes(selectedEmail.id)) {
      setSelectedEmail(null);
    }
    toast.success(`${emailIds.length} email(s) deleted`);
  };

  // Archive email(s)
  const archiveEmails = (emailIds) => {
    setEmails(prev => prev.filter(email => !emailIds.includes(email.id)));
    setSelectedEmails([]);
    if (selectedEmail && emailIds.includes(selectedEmail.id)) {
      setSelectedEmail(null);
    }
    toast.success(`${emailIds.length} email(s) archived`);
  };

  // Mark multiple as read/unread
  const markMultipleAsRead = (emailIds, isRead = true) => {
    setEmails(prev =>
      prev.map(email =>
        emailIds.includes(email.id)
          ? { ...email, isRead }
          : email
      )
    );
    setSelectedEmails([]);
    toast.success(`${emailIds.length} email(s) marked as ${isRead ? 'read' : 'unread'}`);
  };

  // Compose actions
  const sendEmail = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Email sent successfully!');
      setIsComposeOpen(false);
      return { success: true };
    } catch (error) {
      toast.error('Failed to send email');
      return { success: false };
    }
  };

  const saveDraft = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      toast.success('Draft saved!');
      setIsComposeOpen(false);
      return { success: true };
    } catch (error) {
      toast.error('Failed to save draft');
      return { success: false };
    }
  };

  const value = {
    emails,
    isLoading,
    selectedEmail,
    selectedEmails,
    currentFilter,
    searchQuery,
    isComposeOpen,
    setSelectedEmail,
    setCurrentFilter,
    setSearchQuery,
    setIsComposeOpen,
    toggleSelectEmail,
    selectAllEmails,
    markAsRead,
    toggleStar,
    deleteEmails,
    archiveEmails,
    markMultipleAsRead,
    sendEmail,
    saveDraft,
    loadEmails,
    getFilteredEmails,
  };

  return (
    <EmailContext.Provider value={value}>
      {children}
    </EmailContext.Provider>
  );
};




export const useEmail = () => {
  const context = useContext(EmailContext);
  if (!context) {
    throw new Error('useEmail must be used within an EmailProvider');
  }
  return context;
};