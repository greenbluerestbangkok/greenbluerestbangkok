'use client';

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface EditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
  className?: string;
  minHeight?: number;
}

export function Editor({ 
  value, 
  onChange, 
  placeholder = 'Start writing...',
  className,
  minHeight = 200 
}: EditorProps) {
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.max(textareaRef.current.scrollHeight, minHeight)}px`;
    }
  }, [value, minHeight]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    onChange(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const value = textarea.value;
      
      textarea.value = value.substring(0, start) + '  ' + value.substring(end);
      textarea.selectionStart = textarea.selectionEnd = start + 2;
      onChange(textarea.value);
    }
  };

  return (
    <div className={cn('relative', className)}>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className={cn(
          'w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm',
          'focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20',
          'transition-colors duration-200',
          isFocused && 'border-primary-500'
        )}
        style={{ minHeight: `${minHeight}px` }}
      />
      
      <div className="absolute bottom-2 right-2 text-xs text-gray-400">
        {value.length} characters
      </div>
    </div>
  );
}

interface RichEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
  className?: string;
}

export function RichEditor({ 
  value, 
  onChange, 
  placeholder = 'Start writing...',
  className 
}: RichEditorProps) {
  const [isFocused, setIsFocused] = useState(false);

  const insertMarkdown = (before: string, after: string = '') => {
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const newText = value.substring(0, start) + before + selectedText + after + value.substring(end);
    
    onChange(newText);
    
    // Set cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, end + before.length);
    }, 0);
  };

  const toolbarButtons = [
    { label: 'Bold', icon: 'B', action: () => insertMarkdown('**', '**') },
    { label: 'Italic', icon: 'I', action: () => insertMarkdown('*', '*') },
    { label: 'Link', icon: '🔗', action: () => insertMarkdown('[', '](url)') },
    { label: 'Image', icon: '🖼️', action: () => insertMarkdown('![alt](', ')') },
    { label: 'Code', icon: '`', action: () => insertMarkdown('`', '`') },
    { label: 'Quote', icon: '>', action: () => insertMarkdown('> ') },
    { label: 'List', icon: '•', action: () => insertMarkdown('- ') },
  ];

  return (
    <div className={cn('relative', className)}>
      {/* Toolbar */}
      <div className="mb-2 flex flex-wrap gap-1 rounded-lg border border-gray-300 bg-gray-50 p-2">
        {toolbarButtons.map((button, index) => (
          <button
            key={index}
            type="button"
            onClick={button.action}
            className="flex h-8 w-8 items-center justify-center rounded text-sm hover:bg-gray-200"
            title={button.label}
          >
            {button.icon}
          </button>
        ))}
      </div>

      {/* Editor */}
      <Editor
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        minHeight={300}
      />
    </div>
  );
}

