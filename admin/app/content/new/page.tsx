'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface MarkdownContent {
  type: 'md';
  path: string;
  frontmatter: {
    title: string;
    date: string;
    tags: string[];
    status: 'draft' | 'published';
    cover?: string;
  };
  body: string;
}

interface JsonContent {
  type: 'json';
  path: string;
  json: any;
}

export default function NewContentPage() {
  const [activeTab, setActiveTab] = useState<'md' | 'json'>('md');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  // Markdown form state
  const [mdForm, setMdForm] = useState({
    path: '',
    title: '',
    date: new Date().toISOString().split('T')[0],
    tags: '',
    status: 'draft' as 'draft' | 'published',
    cover: '',
    body: ''
  });

  // JSON form state
  const [jsonForm, setJsonForm] = useState({
    path: '',
    content: '{\n  "example": "value",\n  "array": [1, 2, 3],\n  "nested": {\n    "key": "value"\n  }\n}'
  });

  const handleMarkdownSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Parse tags
      const tags = mdForm.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);

      // Build payload
      const payload: MarkdownContent = {
        type: 'md',
        path: mdForm.path,
        frontmatter: {
          title: mdForm.title,
          date: mdForm.date || '',
          tags,
          status: mdForm.status,
          ...(mdForm.cover && { cover: mdForm.cover })
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
      
      // Redirect to content list or edit page
      setTimeout(() => {
        const slug = mdForm.path.replace(/^\/content\//, '').replace(/\.md$/, '');
        router.push(`/admin/content/${slug}`);
      }, 1500);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save content');
    } finally {
      setLoading(false);
    }
  };

  const handleJsonSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
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
      const payload: JsonContent = {
        type: 'json',
        path: jsonForm.path,
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
      
      // Redirect to content list
      setTimeout(() => {
        router.push('/admin/content');
      }, 1500);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save content');
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleTitleChange = (title: string) => {
    setMdForm(prev => ({
      ...prev,
      title,
      path: title ? `/content/${generateSlug(title)}.md` : ''
    }));
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Create New Content</h1>
              <p className="text-sm text-gray-600">Create a new content file</p>
            </div>
            <div className="flex space-x-4">
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

          {/* Tabs */}
          <div className="bg-white shadow rounded-lg">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex">
                <button
                  onClick={() => setActiveTab('md')}
                  className={`py-4 px-6 border-b-2 font-medium text-sm ${
                    activeTab === 'md'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  📝 Markdown
                </button>
                <button
                  onClick={() => setActiveTab('json')}
                  className={`py-4 px-6 border-b-2 font-medium text-sm ${
                    activeTab === 'json'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  📄 JSON
                </button>
              </nav>
            </div>

            <div className="p-6">
              {/* Markdown Tab */}
              {activeTab === 'md' && (
                <form onSubmit={handleMarkdownSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Path */}
                    <div>
                      <label htmlFor="md-path" className="block text-sm font-medium text-gray-700">
                        Path
                      </label>
                      <input
                        type="text"
                        id="md-path"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="/content/blog/my-post.md"
                        value={mdForm.path}
                        onChange={(e) => setMdForm(prev => ({ ...prev, path: e.target.value }))}
                        required
                      />
                    </div>

                    {/* Title */}
                    <div>
                      <label htmlFor="md-title" className="block text-sm font-medium text-gray-700">
                        Title
                      </label>
                      <input
                        type="text"
                        id="md-title"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="My Blog Post"
                        value={mdForm.title}
                        onChange={(e) => handleTitleChange(e.target.value)}
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

                    {/* Status */}
                    <div>
                      <label htmlFor="md-status" className="block text-sm font-medium text-gray-700">
                        Status
                      </label>
                      <select
                        id="md-status"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        value={mdForm.status}
                        onChange={(e) => setMdForm(prev => ({ ...prev, status: e.target.value as 'draft' | 'published' }))}
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                      </select>
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
                        placeholder="blog, tutorial, web"
                        value={mdForm.tags}
                        onChange={(e) => setMdForm(prev => ({ ...prev, tags: e.target.value }))}
                      />
                    </div>

                    {/* Cover */}
                    <div>
                      <label htmlFor="md-cover" className="block text-sm font-medium text-gray-700">
                        Cover Image URL (optional)
                      </label>
                      <input
                        type="url"
                        id="md-cover"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="https://example.com/image.jpg"
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
                      placeholder="# My Blog Post

This is the content of my blog post...

## Features

- Feature 1
- Feature 2

## Conclusion

This is a great post!"
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
                      disabled={loading}
                      className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50"
                    >
                      {loading ? 'Saving...' : 'Save Content'}
                    </button>
                  </div>
                </form>
              )}

              {/* JSON Tab */}
              {activeTab === 'json' && (
                <form onSubmit={handleJsonSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Path */}
                    <div>
                      <label htmlFor="json-path" className="block text-sm font-medium text-gray-700">
                        Path
                      </label>
                      <input
                        type="text"
                        id="json-path"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="/content/data/config.json"
                        value={jsonForm.path}
                        onChange={(e) => setJsonForm(prev => ({ ...prev, path: e.target.value }))}
                        required
                      />
                    </div>

                    {/* JSON Validation */}
                    <div className="flex items-end">
                      {!jsonValidation.valid && (
                        <div className="text-sm text-red-600">
                          Invalid JSON: {jsonValidation.error}
                        </div>
                      )}
                      {jsonValidation.valid && (
                        <div className="text-sm text-green-600">
                          ✓ Valid JSON
                        </div>
                      )}
                    </div>
                  </div>

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
                      placeholder='{
  "site": {
    "title": "My Website",
    "description": "A great website"
  },
  "features": {
    "blog": true,
    "comments": false
  }
}'
                      value={jsonForm.content}
                      onChange={(e) => setJsonForm(prev => ({ ...prev, content: e.target.value }))}
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
                      disabled={loading || !jsonValidation.valid}
                      className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50"
                    >
                      {loading ? 'Saving...' : 'Save Content'}
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