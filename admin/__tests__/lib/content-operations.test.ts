/**
 * Content Operations Test Suite
 * 
 * This file contains example usage and tests for the content save/delete API endpoints.
 */

import { zMarkdownPayload, zJsonPayload, zDeletePayload } from './content-schemas';

// Example usage documentation for content operations

export const contentOperationsExamples = {
  // Save markdown content
  async saveMarkdownContent() {
    try {
      const payload = {
        type: 'md' as const,
        path: 'content/blog/new-post.md',
        frontmatter: {
          title: 'My New Blog Post',
          date: '2024-01-15',
          published: true,
          tags: ['blog', 'example'],
          author: 'Admin User'
        },
        body: '# My New Blog Post\n\nThis is the content of my new blog post.\n\n## Features\n\n- Feature 1\n- Feature 2\n\n## Conclusion\n\nThis is a great post!'
      };

      const response = await fetch('/admin/api/content/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log('Markdown saved:', data);

      // Example response:
      // {
      //   "success": true,
      //   "commit": {
      //     "sha": "abc123...",
      //     "message": "chore(admin): update content/blog/new-post.md",
      //     "author": { "name": "Admin Bot", "email": "admin@local" },
      //     "date": "2024-01-15T10:30:00.000Z",
      //     "url": "https://github.com/owner/repo/commit/abc123..."
      //   },
      //   "path": "content/blog/new-post.md",
      //   "message": "Content saved successfully"
      // }

      return data;
    } catch (error) {
      console.error('Error saving markdown:', error);
      throw error;
    }
  },

  // Save JSON content
  async saveJsonContent() {
    try {
      const payload = {
        type: 'json' as const,
        path: 'content/data/config.json',
        json: {
          site: {
            title: 'My Website',
            description: 'A great website built with Next.js',
            url: 'https://example.com',
            author: 'Admin User'
          },
          features: {
            blog: true,
            comments: false,
            search: true,
            analytics: true
          },
          social: {
            twitter: '@example',
            github: 'example/repo',
            linkedin: 'example'
          }
        }
      };

      const response = await fetch('/admin/api/content/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log('JSON saved:', data);

      // Example response:
      // {
      //   "success": true,
      //   "commit": {
      //     "sha": "def456...",
      //     "message": "chore(admin): update content/data/config.json",
      //     "author": { "name": "Admin Bot", "email": "admin@local" },
      //     "date": "2024-01-15T10:30:00.000Z",
      //     "url": "https://github.com/owner/repo/commit/def456..."
      //   },
      //   "path": "content/data/config.json",
      //   "message": "Content saved successfully"
      // }

      return data;
    } catch (error) {
      console.error('Error saving JSON:', error);
      throw error;
    }
  },

  // Update existing content (requires SHA)
  async updateExistingContent() {
    try {
      // First, get the current content to obtain its SHA
      const getResponse = await fetch('/admin/api/content/get?path=content/blog/existing-post.md');
      const currentContent = await getResponse.json();

      // Update the content
      const payload = {
        type: 'md' as const,
        path: 'content/blog/existing-post.md',
        sha: currentContent.sha, // Required for updates
        frontmatter: {
          ...currentContent.frontmatter,
          title: 'Updated Blog Post Title',
          updated: new Date().toISOString()
        },
        body: currentContent.body + '\n\n## Update\n\nThis post has been updated!'
      };

      const response = await fetch('/admin/api/content/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log('Content updated:', data);

      return data;
    } catch (error) {
      console.error('Error updating content:', error);
      throw error;
    }
  },

  // Delete content
  async deleteContent() {
    try {
      // First, get the content to obtain its SHA
      const getResponse = await fetch('/admin/api/content/get?path=content/blog/old-post.md');
      const content = await getResponse.json();

      const payload = {
        path: 'content/blog/old-post.md',
        sha: content.sha
      };

      const response = await fetch('/admin/api/content/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log('Content deleted:', data);

      // Example response:
      // {
      //   "success": true,
      //   "commit": {
      //     "sha": "ghi789...",
      //     "message": "chore(admin): delete content/blog/old-post.md",
      //     "author": { "name": "Admin Bot", "email": "admin@local" },
      //     "date": "2024-01-15T10:30:00.000Z",
      //     "url": "https://github.com/owner/repo/commit/ghi789..."
      //   },
      //   "path": "content/blog/old-post.md",
      //   "message": "Content deleted successfully"
      // }

      return data;
    } catch (error) {
      if (error instanceof Error && error.message.includes('404')) {
        console.log('File not found - already deleted');
      } else {
        console.error('Error deleting content:', error);
      }
      throw error;
    }
  },

  // Error handling examples
  async handleSaveErrors() {
    try {
      // Try to save with invalid path (outside /content/)
      const payload = {
        type: 'md' as const,
        path: 'invalid/path.md',
        frontmatter: {},
        body: 'Invalid content'
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
        
        switch (response.status) {
          case 401:
            console.log('Authentication required');
            break;
          case 400:
            console.log('Bad request:', errorData.error);
            console.log('Details:', errorData.details);
            break;
          case 500:
            console.log('Server error:', errorData.error);
            break;
        }
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  },

  // Validate payload schemas
  validatePayloads() {
    // Valid markdown payload
    const validMarkdown = {
      type: 'md' as const,
      path: 'content/blog/test.md',
      frontmatter: { title: 'Test' },
      body: 'Test content'
    };
    
    const markdownResult = zMarkdownPayload.safeParse(validMarkdown);
    console.log('Valid markdown:', markdownResult.success);

    // Valid JSON payload
    const validJson = {
      type: 'json' as const,
      path: 'content/data/test.json',
      json: { test: 'data' }
    };
    
    const jsonResult = zJsonPayload.safeParse(validJson);
    console.log('Valid JSON:', jsonResult.success);

    // Valid delete payload
    const validDelete = {
      path: 'content/blog/test.md',
      sha: 'abc123...'
    };
    
    const deleteResult = zDeletePayload.safeParse(validDelete);
    console.log('Valid delete:', deleteResult.success);

    return { markdownResult, jsonResult, deleteResult };
  }
};

// Type definitions for better TypeScript support
export interface SaveResponse {
  success: boolean;
  commit: {
    sha: string;
    message: string;
    author: {
      name: string;
      email: string;
    };
    date: string;
    url: string;
  };
  path: string;
  message: string;
}

export interface DeleteResponse {
  success: boolean;
  commit: {
    sha: string;
    message: string;
    author: {
      name: string;
      email: string;
    };
    date: string;
    url: string;
  };
  path: string;
  message: string;
}
