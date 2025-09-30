'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

interface MarkdownContent {
  type: 'md';
  frontmatter: {
    title: string;
    date: string;
    tags: string[];
    status: 'draft' | 'published';
    cover?: string;
  };
  body: string;
  sha: string;
}

interface JsonContent {
  type: 'json';
  json: any;
  sha: string;
}

export default function EditContentPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;

  const [content, setContent] = useState<MarkdownContent | JsonContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Markdown form state
  const [mdForm, setMdForm] = useState({
    title: '',
    date: '',
    tags: '',
    status: 'draft' as 'draft' | 'published',
    cover: '',
    body: ''
  });

  // JSON form state
  const [jsonForm, setJsonForm] = useState({
    content: ''
  });

  useEffect(() => {
    if (slug) {
      loadContent();
    }
  }, [slug]);

  const loadContent = async () => {
    try {
      setLoading(true);
      setError('');

      // Construct path from slug
      const path = `/content/${slug}`;
      
      const response = await fetch(`/admin/api/content/get?path=${encodeURIComponent(path)}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Content not found');
        }
        throw new Error('Failed to load content');
      }

      const data = await response.json();
      setContent(data);

      if (data.type === 'md') {
        // Populate markdown form
        setMdForm({
          title: data.frontmatter.title || '',
          date: data.frontmatter.date || '',
          tags: data.frontmatter.tags?.join(', ') || '',
          status: data.frontmatter.status || 'draft',
          cover: data.frontmatter.cover || '',
          body: data.body || ''
        });
      } else if (data.type === 'json') {
        // Populate JSON form
        setJsonForm({
          content: JSON.stringify(data.json, null, 2)
        });
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load content');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkdownSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content || content.type !== 'md') return;

    setSaving(true);
    setError('');
    setSuccess('');

    try {
      // Parse tags
      const tags = mdForm.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);

      // Build payload
      const payload = {
        type: 'md' as const,
        path: `/content/${slug}`,
        sha: content.sha,
        frontmatter: {
          title: mdForm.title,
          date: mdForm.date,
          tags,
          status: mdForm.status,
          cover: mdForm.cover || undefined
        },
        body: mdForm.body
      };

      const response = await fetch('/admin/api/content/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save content');
      }

      const result = await response.json();
      setSuccess('Content saved successfully!');
      
      // Reload content to get new SHA
      setTimeout(() => {
        loadContent();
        setSuccess('');
      }, 1500);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save content');
    } finally {
      setSaving(false);
    }
  };

  const handleJsonSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content || content.type !== 'json') return;

    setSaving(true);
    setError('');
    setSuccess('');

    try {
      // Parse JSON content
      let jsonData;
      try {
        jsonData = JSON.parse(jsonForm.content);
      } catch (parseError) {
        throw new Error('Invalid JSON format');
      }

      // Build payload
      const payload = {
        type: 'json' as const,
        path: `/content/${slug}`,
        sha: content.sha,
        json: jsonData
      };

      const response = await fetch('/admin/api/content/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save content');
      }

      const result = await response.json();
      setSuccess('Content saved successfully!');
      
      // Reload content to get new SHA
      setTimeout(() => {
        loadContent();
        setSuccess('');
      }, 1500);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save content');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!content) return;

    if (!confirm('Are you sure you want to delete this content? This action cannot be undone.')) {
      return;
    }

    try {
      setSaving(true);
      const response = await fetch('/admin/api/content/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          path: `/content/${slug}`,
          sha: content.sha
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete content');
      }

      // Redirect to content list
      router.push('/admin/content');

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete content');
      setSaving(false);
    }
  };

  const togglePublishStatus = async () => {
    if (!content || content.type !== 'md') return;

    const newStatus = mdForm.status === 'draft' ? 'published' : 'draft';
    
    setMdForm(prev => ({ ...prev, status: newStatus }));
    
    // Auto-save the status change
    try {
      const tags = mdForm.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);

      const payload = {
        type: 'md' as const,
        path: `/content/${slug}`,
        sha: content.sha,
        frontmatter: {
          ...mdForm,
          status: newStatus,
          tags
        },
        body: mdForm.body
      };

      const response = await fetch('/admin/api/content/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSuccess(`Content ${newStatus} successfully!`);
        setTimeout(() => {
          loadContent();
          setSuccess('');
        }, 1500);
      }

    } catch (err) {
      setError('Failed to update status');
      // Revert the status
      setMdForm(prev => ({ ...prev, status: mdForm.status }));
    }
  };

  const validateJson = (jsonString: string) => {
    try {
      JSON.parse(jsonString);
      return { valid: true, error: null };
    } catch (error) {
      return { 
        valid: false, 
        error: error instanceof Error ? error.message : 'Invalid JSON' 
      };
    }
  };

  const jsonValidation = validateJson(jsonForm.content);

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

  if (error && !content) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Error</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link
            href="/admin/content"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Back to Content
          </Link>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Content Not Found</h1>
          <p className="text-gray-600 mb-4">The requested content could not be found.</p>
          <Link
            href="/admin/content"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Back to Content
          </Link>
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
              <h1 className="text-3xl font-bold text-gray-900">
                Edit Content
              </h1>
              <p className="text-sm text-gray-600">
                {content.type === 'md' ? '📝' : '📄'} /content/{slug}
              </p>
            </div>
            <div className="flex space-x-4">
              {content.type === 'md' && (
                <button
                  onClick={togglePublishStatus}
                  disabled={saving}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    mdForm.status === 'published'
                      ? 'bg-green-100 text-green-800 hover:bg-green-200'
                      : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                  } disabled:opacity-50`}
                >
                  {mdForm.status === 'published' ? 'Unpublish' : 'Publish'}
                </button>
              )}
              <button
                onClick={handleDelete}
                disabled={saving}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 disabled:opacity-50"
              >
                Delete
              </button>
              <Link
                href="/admin/content"
                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
              >
                Back to Content
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
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

          {/* Content Form */}
          <div className="bg-white shadow rounded-lg">
            <div className="p-6">
              {content.type === 'md' ? (
                <form onSubmit={handleMarkdownSave} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Title */}
                    <div>
                      <label htmlFor="md-title" className="block text-sm font-medium text-gray-700">
                        Title
                      </label>
                      <input
                        type="text"
                        id="md-title"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        value={mdForm.title}
                        onChange={(e) => setMdForm(prev => ({ ...prev, title: e.target.value }))}
                        required
                      />
                    </div>

                    {/* Date */}
                    <div>
                      <label htmlFor="md-date" className="block text-sm font-medium text-gray-700">
                        Date
                      </label>
                      <input
                        type="date"
                        id="md-date"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        value={mdForm.date}
                        onChange={(e) => setMdForm(prev => ({ ...prev, date: e.target.value }))}
                        required
                      />
                    </div>

                    {/* Tags */}
                    <div>
                      <label htmlFor="md-tags" className="block text-sm font-medium text-gray-700">
                        Tags (comma-separated)
                      </label>
                      <input
                        type="text"
                        id="md-tags"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        value={mdForm.tags}
                        onChange={(e) => setMdForm(prev => ({ ...prev, tags: e.target.value }))}
                      />
                    </div>

                    {/* Cover */}
                    <div>
                      <label htmlFor="md-cover" className="block text-sm font-medium text-gray-700">
                        Cover Image URL
                      </label>
                      <input
                        type="url"
                        id="md-cover"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        value={mdForm.cover}
                        onChange={(e) => setMdForm(prev => ({ ...prev, cover: e.target.value }))}
                      />
                    </div>
                  </div>

                  {/* Body */}
                  <div>
                    <label htmlFor="md-body" className="block text-sm font-medium text-gray-700">
                      Content
                    </label>
                    <textarea
                      id="md-body"
                      rows={15}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      value={mdForm.body}
                      onChange={(e) => setMdForm(prev => ({ ...prev, body: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="flex justify-end space-x-4">
                    <Link
                      href="/admin/content"
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                    >
                      Cancel
                    </Link>
                    <button
                      type="submit"
                      disabled={saving}
                      className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50"
                    >
                      {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleJsonSave} className="space-y-6">
                  {/* JSON Content */}
                  <div>
                    <label htmlFor="json-content" className="block text-sm font-medium text-gray-700">
                      JSON Content
                    </label>
                    <textarea
                      id="json-content"
                      rows={20}
                      className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 font-mono text-sm ${
                        jsonValidation.valid ? 'border-gray-300' : 'border-red-300'
                      }`}
                      value={jsonForm.content}
                      onChange={(e) => setJsonForm(prev => ({ ...prev, content: e.target.value }))}
                      required
                    />
                    {!jsonValidation.valid && (
                      <p className="mt-2 text-sm text-red-600">
                        Invalid JSON: {jsonValidation.error}
                      </p>
                    )}
                  </div>

                  <div className="flex justify-end space-x-4">
                    <Link
                      href="/admin/content"
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                    >
                      Cancel
                    </Link>
                    <button
                      type="submit"
                      disabled={saving || !jsonValidation.valid}
                      className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50"
                    >
                      {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}