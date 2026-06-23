import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, PaperClipIcon, TrashIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { useEmail } from '../../../contexts/EmailContext';
import { RichTextEditor } from './RichTextEditor';
import { EmailRecipients } from './EmailRecipients';
import { EmailAttachments } from './EmailAttachments';
import toast from 'react-hot-toast';

/**
 * Compose Email Modal Component
 * Full featured email composer with rich text editor
 */
export const ComposeEmail = () => {
  const { isComposeOpen, setIsComposeOpen, sendEmail, saveDraft } = useEmail();
  const [isSending, setIsSending] = useState(false);
  const [showCC, setShowCC] = useState(false);
  const [showBCC, setShowBCC] = useState(false);
  const [formData, setFormData] = useState({
    to: [],
    cc: [],
    bcc: [],
    subject: '',
    body: '',
  });
  const [attachments, setAttachments] = useState([]);
  const [isDraft, setIsDraft] = useState(false);

  // Load draft from localStorage if exists
  useEffect(() => {
    const savedDraft = localStorage.getItem('emailDraft');
    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft);
        setFormData({
          to: draft.to || [],
          cc: draft.cc || [],
          bcc: draft.bcc || [],
          subject: draft.subject || '',
          body: draft.body || '',
        });
        setAttachments(draft.attachments || []);
        setIsDraft(true);
      } catch (error) {
        console.error('Failed to load draft:', error);
      }
    }
  }, [isComposeOpen]);

  // Auto-save draft
  useEffect(() => {
    if (isComposeOpen && (formData.to.length > 0 || formData.subject || formData.body)) {
      const draft = {
        ...formData,
        attachments,
        savedAt: new Date().toISOString(),
      };
      localStorage.setItem('emailDraft', JSON.stringify(draft));
    }
  }, [formData, attachments, isComposeOpen]);

  const handleRecipientsChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBodyChange = (value) => {
    setFormData(prev => ({ ...prev, body: value }));
  };

  const handleSend = async () => {
    if (formData.to.length === 0) {
      toast.error('Please add at least one recipient');
      return;
    }
    if (!formData.subject.trim()) {
      toast.error('Please add a subject');
      return;
    }
    if (!formData.body.trim()) {
      toast.error('Please add a message');
      return;
    }

    setIsSending(true);
    try {
      const emailData = {
        to: formData.to,
        cc: formData.cc,
        bcc: formData.bcc,
        subject: formData.subject,
        body: formData.body,
        attachments: attachments.map(f => ({
          name: f.name,
          size: f.size,
          type: f.type,
        })),
      };

      const result = await sendEmail(emailData);
      if (result.success) {
        // Clear draft after sending
        localStorage.removeItem('emailDraft');
        handleClose();
      }
    } catch (error) {
      toast.error('Failed to send email');
    } finally {
      setIsSending(false);
    }
  };

  const handleSaveDraft = async () => {
    try {
      const draftData = {
        to: formData.to,
        cc: formData.cc,
        bcc: formData.bcc,
        subject: formData.subject,
        body: formData.body,
        attachments: attachments.map(f => ({
          name: f.name,
          size: f.size,
          type: f.type,
        })),
      };

      const result = await saveDraft(draftData);
      if (result.success) {
        localStorage.removeItem('emailDraft');
        handleClose();
      }
    } catch (error) {
      toast.error('Failed to save draft');
    }
  };

  const handleDiscard = () => {
    if (formData.to.length > 0 || formData.subject || formData.body) {
      if (!window.confirm('Are you sure you want to discard this email?')) {
        return;
      }
    }
    localStorage.removeItem('emailDraft');
    handleClose();
  };

  const handleClose = () => {
    setFormData({ to: [], cc: [], bcc: [], subject: '', body: '' });
    setAttachments([]);
    setIsDraft(false);
    setIsComposeOpen(false);
  };

  if (!isComposeOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleDiscard}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ type: 'spring', duration: 0.4 }}
          className="relative w-full max-w-4xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700 shrink-0 bg-gray-50 dark:bg-gray-800/50">
            <div className="flex items-center space-x-3">
              <EnvelopeIcon className="h-5 w-5 text-primary-500" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {isDraft ? 'Continue Draft' : 'New Message'}
              </h3>
              {isDraft && (
                <span className="text-xs px-2 py-0.5 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded-full">
                  Draft
                </span>
              )}
            </div>
            <button
              onClick={handleDiscard}
              className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Close"
            >
              <XMarkIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          {/* Form */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {/* To */}
            <EmailRecipients
              label="To *"
              recipients={formData.to}
              onChange={(val) => handleRecipientsChange('to', val)}
              placeholder="Add recipients..."
            />

            {/* CC Toggle */}
            <div className="flex items-center space-x-4">
              <button
                type="button"
                onClick={() => setShowCC(!showCC)}
                className="text-sm text-primary-600 dark:text-primary-400 hover:underline font-medium"
              >
                {showCC ? 'Hide CC' : 'Add CC'}
              </button>
              <button
                type="button"
                onClick={() => setShowBCC(!showBCC)}
                className="text-sm text-primary-600 dark:text-primary-400 hover:underline font-medium"
              >
                {showBCC ? 'Hide BCC' : 'Add BCC'}
              </button>
            </div>

            {/* CC */}
            {showCC && (
              <EmailRecipients
                label="CC"
                recipients={formData.cc}
                onChange={(val) => handleRecipientsChange('cc', val)}
                placeholder="Add CC recipients..."
              />
            )}

            {/* BCC */}
            {showBCC && (
              <EmailRecipients
                label="BCC"
                recipients={formData.bcc}
                onChange={(val) => handleRecipientsChange('bcc', val)}
                placeholder="Add BCC recipients..."
              />
            )}

            {/* Subject */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Subject *
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Enter subject..."
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            {/* Rich Text Editor */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Message Body *
              </label>
              <RichTextEditor
                value={formData.body}
                onChange={handleBodyChange}
                placeholder="Write your message..."
              />
            </div>

            {/* Attachments */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Attachments
              </label>
              <EmailAttachments
                attachments={attachments}
                onChange={setAttachments}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-t border-gray-200 dark:border-gray-700 shrink-0 bg-gray-50 dark:bg-gray-800/50">
            <div className="flex items-center space-x-2">
              <button
                onClick={handleSaveDraft}
                className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                Save Draft
              </button>
              <button
                onClick={handleDiscard}
                className="px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              >
                Discard
              </button>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-xs text-gray-400 dark:text-gray-500">
                {attachments.length} attachment(s)
              </span>
              <button
                onClick={handleSend}
                disabled={isSending}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium shadow-sm hover:shadow-md"
              >
                {isSending ? (
                  <span className="flex items-center space-x-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Sending...</span>
                  </span>
                ) : (
                  'Send'
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};