'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface MediaFile {
  path: string;
  type: 'file' | 'dir';
  sha?: string;
  url: string;
}

interface MediaListResponse {
  files: MediaFile[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

interface UploadedFile {
  path: string;
  originalName: string;
  size: number;
  mimeType: string;
  url: string;
}

interface UploadResponse {
  success: boolean;
  uploaded: UploadedFile[];
  errors: Array<{ name: string; error: string }>;
  message: string;
}

export default function MediaPage() {
  const [media, setMedia] = useState<MediaFile[]>([]);
  const [filteredMedia, setFilteredMedia] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [monthFilter, setMonthFilter] = useState<string>('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    loadMedia();
  }, []);

  useEffect(() => {
    filterMedia();
  }, [media, monthFilter]);

  const loadMedia = async () => {
    try {
      setLoading(true);
      const response = await fetch('/admin/api/media/list?recursive=true&limit=100');
      
      if (!response.ok) {
        throw new Error('Failed to load media');
      }

      const data: MediaListResponse = await response.json();
      setMedia(data.files);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load media');
    } finally {
      setLoading(false);
    }
  };

  const filterMedia = () => {
    let filtered = media;

    // Filter by month folder
    if (monthFilter) {
      filtered = filtered.filter(file => file.path.includes(monthFilter));
    }

    setFilteredMedia(filtered);
  };

  const getMonthOptions = () => {
    const months = new Set<string>();
    media.forEach(file => {
      const match = file.path.match(/\/images\/(\d{4})\/(\d{2})\//);
      if (match) {
        months.add(`${match[1]}-${match[2]}`);
      }
    });
    return Array.from(months).sort().reverse();
  };

  const formatFileSize = (bytes: number): string => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const getFileExtension = (path: string): string => {
    return path.split('.').pop()?.toLowerCase() || '';
  };

  const isImageFile = (path: string): boolean => {
    const ext = getFileExtension(path);
    return ['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(ext);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setSuccess('Path copied to clipboard!');
      setTimeout(() => setSuccess(''), 2000);
    } catch (err) {
      setError('Failed to copy to clipboard');
    }
  };

  const handleDelete = async (path: string, sha: string) => {
    try {
      const response = await fetch('/admin/api/media/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ path, sha }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete media');
      }

      await loadMedia();
      setDeleteConfirm(null);
      setSuccess('Media deleted successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete media');
    }
  };

  const handleFiles = async (files: FileList) => {
    if (files.length === 0) return;

    setUploading(true);
    setError('');
    setSuccess('');

    const formData = new FormData();
    Array.from(files).forEach(file => {
      formData.append('files', file);
    });

    try {
      const response = await fetch('/admin/api/media/upload', {
        method: 'POST',
        body: formData,
      });

      const result: UploadResponse = await response.json();

      if (result.success) {
        setSuccess(`${result.uploaded.length} files uploaded successfully!`);
        await loadMedia();
      }

      if (result.errors.length > 0) {
        const errorMessages = result.errors.map(e => `${e.name}: ${e.error}`).join(', ');
        setError(`Some files failed to upload: ${errorMessages}`);
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading media...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Media Library</h1>
              <p className="text-sm text-gray-600">Manage your media files</p>
            </div>
            <div className="flex space-x-4">
              <Link
                href="/admin"
                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
              >
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
              {success}
            </div>
          )}

          {/* Upload Zone */}
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive
                  ? 'border-indigo-500 bg-indigo-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {uploading ? (
                <div className="space-y-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                  <p className="text-gray-600">Uploading files...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-6xl text-gray-400">📁</div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Upload Media Files
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Drag and drop files here, or click to select files
                    </p>
                    <p className="text-sm text-gray-500">
                      Supports PNG, JPEG, WebP images up to 8MB
                    </p>
                  </div>
                  <button
                    onClick={triggerFileInput}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                  >
                    Select Files
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileInput}
                    className="hidden"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              {/* View Mode */}
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-gray-700">View:</label>
                <div className="flex rounded-md shadow-sm">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`px-3 py-2 text-sm font-medium rounded-l-md ${
                      viewMode === 'grid'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white text-gray-700 border border-gray-300'
                    }`}
                  >
                    Grid
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`px-3 py-2 text-sm font-medium rounded-r-md border-t border-r border-b ${
                      viewMode === 'list'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white text-gray-700 border-gray-300'
                    }`}
                  >
                    List
                  </button>
                </div>
              </div>

              {/* Month Filter */}
              <div className="flex items-center space-x-4">
                <label htmlFor="monthFilter" className="text-sm font-medium text-gray-700">
                  Filter by month:
                </label>
                <select
                  id="monthFilter"
                  className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  value={monthFilter}
                  onChange={(e) => setMonthFilter(e.target.value)}
                >
                  <option value="">All months</option>
                  {getMonthOptions().map(month => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>

              {/* Stats */}
              <div className="text-sm text-gray-600">
                Showing {filteredMedia.length} of {media.length} files
              </div>
            </div>
          </div>

          {/* Media Grid/List */}
          <div className="bg-white shadow rounded-lg">
            {filteredMedia.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🖼️</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No media found</h3>
                <p className="text-gray-500 mb-4">
                  {monthFilter 
                    ? 'No media files found for the selected month'
                    : 'Upload some images to get started'
                  }
                </p>
                <button
                  onClick={triggerFileInput}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                  Upload Files
                </button>
              </div>
            ) : (
              <div className={`p-6 ${
                viewMode === 'grid' 
                  ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6'
                  : 'space-y-4'
              }`}>
                {filteredMedia.map((file, index) => (
                  <div
                    key={index}
                    className={`${
                      viewMode === 'grid'
                        ? 'bg-gray-50 rounded-lg overflow-hidden hover:shadow-md transition-shadow'
                        : 'flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50'
                    }`}
                  >
                    {viewMode === 'grid' ? (
                      // Grid View
                      <div className="relative">
                        <div className="aspect-square bg-gray-200 flex items-center justify-center">
                          {isImageFile(file.path) ? (
                            <img
                              src={file.url}
                              alt={file.path}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                target.nextElementSibling?.classList.remove('hidden');
                              }}
                            />
                          ) : null}
                          <div className={`${isImageFile(file.path) ? 'hidden' : ''} text-4xl text-gray-400`}>
                            📄
                          </div>
                        </div>
                        <div className="p-3">
                          <div className="text-sm font-medium text-gray-900 truncate">
                            {file.path.split('/').pop()}
                          </div>
                          <div className="text-xs text-gray-500 truncate">
                            {file.path}
                          </div>
                          <div className="flex space-x-2 mt-2">
                            <button
                              onClick={() => copyToClipboard(file.url)}
                              className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded hover:bg-blue-200"
                            >
                              Copy Path
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(file.path)}
                              className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded hover:bg-red-200"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      // List View
                      <>
                        <div className="flex-shrink-0">
                          <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                            {isImageFile(file.path) ? (
                              <img
                                src={file.url}
                                alt={file.path}
                                className="w-full h-full object-cover rounded-lg"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = 'none';
                                  target.nextElementSibling?.classList.remove('hidden');
                                }}
                              />
                            ) : null}
                            <div className={`${isImageFile(file.path) ? 'hidden' : ''} text-2xl text-gray-400`}>
                              📄
                            </div>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-gray-900 truncate">
                            {file.path.split('/').pop()}
                          </div>
                          <div className="text-sm text-gray-500 truncate">
                            {file.path}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => copyToClipboard(file.url)}
                            className="bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm hover:bg-blue-200"
                          >
                            Copy Path
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(file.path)}
                            className="bg-red-100 text-red-800 px-3 py-1 rounded text-sm hover:bg-red-200"
                          >
                            Delete
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <span className="text-red-600 text-xl">⚠️</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mt-4">Delete Media</h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  Are you sure you want to delete this media file? This action cannot be undone.
                </p>
                <p className="text-sm font-medium text-gray-900 mt-2">
                  <code>{deleteConfirm}</code>
                </p>
              </div>
              <div className="flex justify-center space-x-4 mt-4">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    const file = media.find(f => f.path === deleteConfirm);
                    if (file?.sha) {
                      handleDelete(file.path, file.sha);
                    }
                  }}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}