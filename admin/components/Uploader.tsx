'use client';

import { useState, useRef, useCallback } from 'react';
import { Upload, X, Image as ImageIcon, FileText } from 'lucide-react';
import { cn, formatFileSize, isImageFile, isVideoFile } from '@/lib/utils';

interface UploaderProps {
  onUpload: (files: File[]) => Promise<void>;
  accept?: string;
  multiple?: boolean;
  maxFiles?: number;
  maxSize?: number; // in bytes
  className?: string;
}

export function Uploader({
  onUpload,
  accept = 'image/*',
  multiple = true,
  maxFiles = 10,
  maxSize = 10 * 1024 * 1024, // 10MB
  className
}: UploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    if (file.size > maxSize) {
      return `File ${file.name} is too large. Maximum size is ${formatFileSize(maxSize)}.`;
    }
    
    if (accept && !file.type.match(accept.replace(/\*/g, '.*'))) {
      return `File ${file.name} is not a supported format.`;
    }
    
    return null;
  };

  const handleFiles = useCallback((newFiles: FileList | File[]) => {
    const fileArray = Array.from(newFiles);
    const errors: string[] = [];
    const validFiles: File[] = [];

    // Check file count
    if (files.length + fileArray.length > maxFiles) {
      setError(`Maximum ${maxFiles} files allowed.`);
      return;
    }

    // Validate each file
    fileArray.forEach(file => {
      const error = validateFile(file);
      if (error) {
        errors.push(error);
      } else {
        validFiles.push(file);
      }
    });

    if (errors.length > 0) {
      setError(errors.join('\n'));
      return;
    }

    setError(null);
    setFiles(prev => [...prev, ...validFiles]);
  }, [files.length, maxFiles, maxSize, accept]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      handleFiles(droppedFiles);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      handleFiles(selectedFiles);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    setIsUploading(true);
    setError(null);

    try {
      await onUpload(files);
      setFiles([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const getFileIcon = (file: File) => {
    if (isImageFile(file.type)) {
      return <ImageIcon className="h-4 w-4" />;
    }
    if (isVideoFile(file.type)) {
      return <FileText className="h-4 w-4" />;
    }
    return <FileText className="h-4 w-4" />;
  };

  return (
    <div className={cn('space-y-4', className)}>
      {/* Upload Area */}
      <div
        className={cn(
          'relative rounded-lg border-2 border-dashed p-8 text-center transition-colors',
          isDragging
            ? 'border-primary-500 bg-primary-50'
            : 'border-gray-300 hover:border-gray-400',
          'cursor-pointer'
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileInput}
          className="hidden"
        />
        
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">
          {isDragging ? 'Drop files here' : 'Click to upload or drag and drop'}
        </p>
        <p className="text-xs text-gray-500">
          {accept} • Max {formatFileSize(maxSize)} • {maxFiles} files max
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
          {error.split('\n').map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </div>
      )}

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-gray-700">
              Selected Files ({files.length})
            </h4>
            <button
              onClick={handleUpload}
              disabled={isUploading}
              className="rounded bg-primary-500 px-3 py-1 text-sm text-white hover:bg-primary-600 disabled:opacity-50"
            >
              {isUploading ? 'Uploading...' : 'Upload All'}
            </button>
          </div>
          
          <div className="max-h-48 space-y-2 overflow-y-auto">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-3"
              >
                <div className="flex items-center space-x-3">
                  {getFileIcon(file)}
                  <div>
                    <p className="text-sm font-medium text-gray-700">{file.name}</p>
                    <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

interface ImageUploaderProps {
  onUpload: (file: File) => Promise<string>;
  category: string;
  className?: string;
}

export function ImageUploader({ onUpload, category, className }: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = async (file: File) => {
    if (!isImageFile(file.type)) {
      setError('Please select a valid image file');
      return;
    }

    setError(null);
    setPreview(URL.createObjectURL(file));
    setIsUploading(true);

    try {
      await onUpload(file);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className={cn('space-y-4', className)}>
      <Uploader
        onUpload={async (files) => {
          if (files.length > 0 && files[0]) {
            await handleFileSelect(files[0]);
          }
        }}
        accept="image/*"
        multiple={false}
        maxFiles={1}
        maxSize={5 * 1024 * 1024} // 5MB
      />
      
      {preview && (
        <div className="relative">
          <img
            src={preview}
            alt="Preview"
            className="h-48 w-full rounded-lg object-cover"
          />
          {isUploading && (
            <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black bg-opacity-50">
              <div className="text-white">Uploading...</div>
            </div>
          )}
        </div>
      )}
      
      {error && (
        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}
    </div>
  );
}

