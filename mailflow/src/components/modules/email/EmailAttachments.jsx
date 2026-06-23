import React, { useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { PaperClipIcon, XMarkIcon, DocumentIcon, PhotoIcon } from '@heroicons/react/24/outline';

/**
 * Email Attachments Component
 * Handles file uploads with drag and drop
 */
export const EmailAttachments = ({ attachments = [], onChange, disabled = false }) => {
  const fileInputRef = useRef(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      onChange([...attachments, ...acceptedFiles]);
    },
    disabled: disabled,
    maxSize: 10485760, // 10MB
  });

  const removeAttachment = (index) => {
    const newAttachments = [...attachments];
    newAttachments.splice(index, 1);
    onChange(newAttachments);
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
  };

  const getFileIcon = (file) => {
    const type = file.type || '';
    if (type.startsWith('image/')) {
      return <PhotoIcon className="h-5 w-5 text-blue-500" />;
    }
    return <DocumentIcon className="h-5 w-5 text-gray-500" />;
  };

  return (
    <div className="w-full">
      {/* Drop Zone */}
      {!disabled && (
        <div
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-all duration-200
            ${isDragActive 
              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10' 
              : 'border-gray-300 dark:border-gray-600 hover:border-primary-400 dark:hover:border-primary-500'
            }
          `}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center">
            <PaperClipIcon className={`h-8 w-8 ${isDragActive ? 'text-primary-500' : 'text-gray-400'}`} />
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {isDragActive ? 'Drop files here...' : 'Drag & drop files here, or click to select'}
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
              Max file size: 10MB
            </p>
          </div>
        </div>
      )}

      {/* Attachments List */}
      {attachments.length > 0 && (
        <div className="mt-3 space-y-2">
          {attachments.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between px-3 py-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600"
            >
              <div className="flex items-center space-x-3 min-w-0">
                {getFileIcon(file)}
                <div className="min-w-0">
                  <p className="text-sm text-gray-900 dark:text-white truncate">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {formatFileSize(file.size)}
                  </p>
                </div>
              </div>
              {!disabled && (
                <button
                  type="button"
                  onClick={() => removeAttachment(index)}
                  className="p-1 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors text-gray-400 hover:text-red-500"
                >
                  <XMarkIcon className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};