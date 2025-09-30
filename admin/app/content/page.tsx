'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface ContentFile {
  path: string;
  type: 'md' | 'json';
  sha?: string;
}

interface ContentListResponse {
  content: ContentFile[];
  count: number;
}

export default function ContentListPage() {
  const [content, setContent] = useState<ContentFile[]>([]);
  const [filteredContent, setFilteredContent] = useState<ContentFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'md' | 'json'>('all');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    loadContent();
  }, []);

  useEffect(() => {
    filterContent();
  }, [content, searchTerm, typeFilter]);

  const loadContent = async () => {
    try {
      setLoading(true);
      const response = await fetch('/admin/api/content/list');
      
      if (!response.ok) {
        throw new Error('Failed to load content');
      }

      const data: ContentListResponse = await response.json();
      setContent(data.content);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load content');
    } finally {
      setLoading(false);
    }
  };

  const filterContent = () => {
    let filtered = content;

    // Filter by type
    if (typeFilter !== 'all') {
      filtered = filtered.filter(file => file.type === typeFilter);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(file =>
        file.path.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredContent(filtered);
  };

  const handleDelete = async (path: string, sha: string) => {
    try {
      const response = await fetch('/admin/api/content/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ path, sha }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete content');
      }

      // Reload content list
      await loadContent();
      setDeleteConfirm(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete content');
    }
  };

  const getContentSlug = (path: string) => {
    // Extract slug from path like /content/blog/post.md -> blog/post
    return path.replace(/^\/content\//, '').replace(/\.(md|json)$/, '');
  };

  const getContentTypeIcon = (type: string) => {
    return type === 'md' ? '📝' : '📄';
  };

  const getContentTypeLabel = (type: string) => {
    return type === 'md' ? 'Markdown' : 'JSON';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading content...</p>
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
              <h1 className="text-3xl font-bold text-gray-900">Content Management</h1>
              <p className="text-sm text-gray-600">Manage your content files</p>
            </div>
            <div className="flex space-x-4">
              <Link
                href="/admin/content/new"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              >
                New Content
              </Link>
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

          {/* Search and Filters */}
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div>
                <label htmlFor="search" className="block text-sm font-medium text-gray-700">
                  Search
                </label>
                <input
                  type="text"
                  id="search"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Search by filename..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Type Filter */}
              <div>
                <label htmlFor="typeFilter" className="block text-sm font-medium text-gray-700">
                  Type
                </label>
                <select
                  id="typeFilter"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value as 'all' | 'md' | 'json')}
                >
                  <option value="all">All Types</option>
                  <option value="md">Markdown</option>
                  <option value="json">JSON</option>
                </select>
              </div>

              {/* Stats */}
              <div className="flex items-end">
                <div className="text-sm text-gray-600">
                  Showing {filteredContent.length} of {content.length} files
                </div>
              </div>
            </div>
          </div>

          {/* Content Table */}
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            {filteredContent.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">📁</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No content found</h3>
                <p className="text-gray-500 mb-4">
                  {searchTerm || typeFilter !== 'all' 
                    ? 'Try adjusting your search or filters'
                    : 'Get started by creating your first content file'
                  }
                </p>
                <Link
                  href="/admin/content/new"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                  Create New Content
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        File
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Path
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredContent.map((file, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="text-2xl mr-3">
                              {getContentTypeIcon(file.type)}
                            </span>
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {file.path.split('/').pop()}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {getContentTypeLabel(file.type)}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                            {file.path}
                          </code>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <Link
                              href={`/admin/content/${getContentSlug(file.path)}`}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              Edit
                            </Link>
                            <button
                              onClick={() => setDeleteConfirm(file.path)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
              <h3 className="text-lg font-medium text-gray-900 mt-4">Delete Content</h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  Are you sure you want to delete this content file? This action cannot be undone.
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
                    const file = content.find(f => f.path === deleteConfirm);
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