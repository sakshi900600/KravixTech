import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import {
  Bold,
  Italic,
  Strikethrough,
  List,
  ListOrdered,
  Quote,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Link as LinkIcon,
  Image as ImageIcon,
  Undo,
  Redo,
} from 'lucide-react';

/**
 * Rich Text Editor Component using TipTap
 * Fully compatible with React 19
 */
export const RichTextEditor = ({ value, onChange, placeholder, readOnly = false }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          target: '_blank',
          rel: 'noopener noreferrer',
        },
      }),
    ],
    content: value || '',
    editable: !readOnly,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm dark:prose-invert max-w-none focus:outline-none min-h-[150px] max-h-[300px] overflow-y-auto p-4',
      },
    },
  });

  if (!editor) {
    return <div className="min-h-[150px] bg-gray-50 dark:bg-gray-800 rounded-lg animate-pulse"></div>;
  }

  const ToolbarButton = ({ onClick, isActive, icon: Icon, label }) => (
    <button
      onClick={onClick}
      className={`
        p-1.5 rounded-md transition-all duration-200
        ${isActive 
          ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400' 
          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
        }
        ${readOnly ? 'opacity-50 cursor-not-allowed' : ''}
      `}
      disabled={readOnly}
      aria-label={label}
      title={label}
    >
      <Icon className="h-4 w-4" />
    </button>
  );

  const addImage = () => {
    const url = window.prompt('Enter image URL:');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('Enter URL:', previousUrl);
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().unsetLink().run();
      return;
    }
    editor.chain().focus().setLink({ href: url }).run();
  };

  if (readOnly) {
    return (
      <div className="rich-text-editor read-only">
        <div className="ql-container rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
          <EditorContent editor={editor} />
        </div>
      </div>
    );
  }

  return (
    <div className="rich-text-editor border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden bg-white dark:bg-gray-800">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 p-1.5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive('bold')}
          icon={Bold}
          label="Bold"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive('italic')}
          icon={Italic}
          label="Italic"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          isActive={editor.isActive('strike')}
          icon={Strikethrough}
          label="Strikethrough"
        />
        <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1"></div>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          isActive={editor.isActive('heading', { level: 1 })}
          icon={Heading1}
          label="Heading 1"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          isActive={editor.isActive('heading', { level: 2 })}
          icon={Heading2}
          label="Heading 2"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          isActive={editor.isActive('heading', { level: 3 })}
          icon={Heading3}
          label="Heading 3"
        />
        <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1"></div>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive('bulletList')}
          icon={List}
          label="Bullet List"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive('orderedList')}
          icon={ListOrdered}
          label="Numbered List"
        />
        <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1"></div>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive('blockquote')}
          icon={Quote}
          label="Quote"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          isActive={editor.isActive('codeBlock')}
          icon={Code}
          label="Code"
        />
        <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1"></div>
        <ToolbarButton
          onClick={setLink}
          isActive={editor.isActive('link')}
          icon={LinkIcon}
          label="Add Link"
        />
        <ToolbarButton
          onClick={addImage}
          isActive={false}
          icon={ImageIcon}
          label="Add Image"
        />
        <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1"></div>
        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          isActive={false}
          icon={Undo}
          label="Undo"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          isActive={false}
          icon={Redo}
          label="Redo"
        />
      </div>

      {/* Editor Content */}
      <EditorContent editor={editor} className="prose prose-sm dark:prose-invert max-w-none" />
      
      <style jsx>{`
        .rich-text-editor :global(.ProseMirror) {
          min-height: 150px;
          max-height: 300px;
          overflow-y: auto;
          padding: 1rem;
          color: rgb(17, 24, 39);
        }
        .dark .rich-text-editor :global(.ProseMirror) {
          color: rgb(243, 244, 246);
        }
        .rich-text-editor :global(.ProseMirror p) {
          margin: 0.5rem 0;
        }
        .rich-text-editor :global(.ProseMirror h1) {
          font-size: 1.5rem;
          font-weight: bold;
          margin: 1rem 0 0.5rem 0;
        }
        .rich-text-editor :global(.ProseMirror h2) {
          font-size: 1.25rem;
          font-weight: bold;
          margin: 0.75rem 0 0.5rem 0;
        }
        .rich-text-editor :global(.ProseMirror h3) {
          font-size: 1.1rem;
          font-weight: bold;
          margin: 0.5rem 0 0.25rem 0;
        }
        .rich-text-editor :global(.ProseMirror ul),
        .rich-text-editor :global(.ProseMirror ol) {
          padding-left: 1.5rem;
          margin: 0.5rem 0;
        }
        .rich-text-editor :global(.ProseMirror blockquote) {
          border-left: 3px solid rgb(59, 130, 246);
          padding-left: 1rem;
          margin: 0.5rem 0;
          color: rgb(107, 114, 128);
        }
        .dark .rich-text-editor :global(.ProseMirror blockquote) {
          color: rgb(156, 163, 175);
        }
        .rich-text-editor :global(.ProseMirror code) {
          background: rgb(243, 244, 246);
          padding: 0.125rem 0.375rem;
          border-radius: 0.25rem;
          font-size: 0.875rem;
        }
        .dark .rich-text-editor :global(.ProseMirror code) {
          background: rgb(31, 41, 55);
        }
        .rich-text-editor :global(.ProseMirror pre) {
          background: rgb(243, 244, 246);
          padding: 0.75rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          margin: 0.5rem 0;
        }
        .dark .rich-text-editor :global(.ProseMirror pre) {
          background: rgb(31, 41, 55);
        }
        .rich-text-editor :global(.ProseMirror img) {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
          margin: 0.5rem 0;
        }
        .rich-text-editor :global(.ProseMirror a) {
          color: rgb(59, 130, 246);
          text-decoration: underline;
        }
        .rich-text-editor :global(.ProseMirror a:hover) {
          color: rgb(37, 99, 235);
        }
      `}</style>
    </div>
  );
};