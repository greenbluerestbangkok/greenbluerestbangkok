/**
 * Content API Test Suite
 * 
 * This file contains example usage and tests for the content API endpoints.
 */

// Example usage documentation for content APIs

export const contentApiExamples = {
  // List all content files
  async listContent() {
    try {
      const response = await fetch('/admin/api/content/list');
      const data = await response.json();
      
      console.log('Content files:', data.content);
      console.log('Total count:', data.count);
      
      // Example response:
      // {
      //   "content": [
      //     { "path": "content/blog/post-1.md", "type": "md", "sha": "abc123..." },
      //     { "path": "content/data/config.json", "type": "json", "sha": "def456..." },
      //     { "path": "content/pages/about.md", "type": "md", "sha": "ghi789..." }
      //   ],
      //   "count": 3
      // }
      
      return data;
    } catch (error) {
      console.error('Error listing content:', error);
      throw error;
    }
  },

  // Get markdown content with frontmatter
  async getMarkdownContent() {
    try {
      const response = await fetch('/admin/api/content/get?path=content/blog/post-1.md');
      const data = await response.json();
      
      console.log('Markdown content:', data);
      
      // Example response:
      // {
      //   "type": "md",
      //   "frontmatter": {
      //     "title": "My Blog Post",
      //     "date": "2024-01-15",
      //     "published": true,
      //     "tags": ["blog", "example"]
      //   },
      //   "body": "# My Blog Post\n\nThis is the content of my blog post...",
      //   "sha": "abc123..."
      // }
      
      return data;
    } catch (error) {
      if (error instanceof Error && error.message.includes('404')) {
        console.log('File not found');
      } else {
        console.error('Error getting markdown content:', error);
      }
      throw error;
    }
  },

  // Get JSON content
  async getJsonContent() {
    try {
      const response = await fetch('/admin/api/content/get?path=content/data/config.json');
      const data = await response.json();
      
      console.log('JSON content:', data);
      
      // Example response:
      // {
      //   "type": "json",
      //   "json": {
      //     "site": {
      //       "title": "My Site",
      //       "description": "A great website",
      //       "url": "https://example.com"
      //     },
      //     "features": ["feature1", "feature2"]
      //   },
      //   "sha": "def456..."
      // }
      
      return data;
    } catch (error) {
      if (error instanceof Error && error.message.includes('400')) {
        console.log('Invalid JSON format');
      } else {
        console.error('Error getting JSON content:', error);
      }
      throw error;
    }
  },

  // Error handling examples
  async handleErrors() {
    try {
      // Try to get a non-existent file
      const response = await fetch('/admin/api/content/get?path=content/nonexistent.md');
      
      if (!response.ok) {
        const errorData = await response.json();
        
        switch (response.status) {
          case 401:
            console.log('Authentication required');
            break;
          case 404:
            console.log('File not found:', errorData.error);
            break;
          case 400:
            console.log('Bad request:', errorData.error);
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

  // Filter content by type
  async filterContentByType() {
    try {
      const response = await fetch('/admin/api/content/list');
      const data = await response.json();
      
      // Filter markdown files
      const markdownFiles = data.content.filter((file: any) => file.type === 'md');
      console.log('Markdown files:', markdownFiles);
      
      // Filter JSON files
      const jsonFiles = data.content.filter((file: any) => file.type === 'json');
      console.log('JSON files:', jsonFiles);
      
      return { markdownFiles, jsonFiles };
    } catch (error) {
      console.error('Error filtering content:', error);
      throw error;
    }
  },

  // Get content from specific directories
  async getContentFromDirectory() {
    try {
      const response = await fetch('/admin/api/content/list');
      const data = await response.json();
      
      // Filter files from specific directories
      const blogPosts = data.content.filter((file: any) => 
        file.path.startsWith('content/blog/')
      );
      
      const dataFiles = data.content.filter((file: any) => 
        file.path.startsWith('content/data/')
      );
      
      console.log('Blog posts:', blogPosts);
      console.log('Data files:', dataFiles);
      
      return { blogPosts, dataFiles };
    } catch (error) {
      console.error('Error getting content from directory:', error);
      throw error;
    }
  }
};

// Type definitions for better TypeScript support
export interface ContentListItem {
  path: string;
  type: 'md' | 'json';
  sha?: string;
}

export interface ContentListResponse {
  content: ContentListItem[];
  count: number;
}

export interface MarkdownContentResponse {
  type: 'md';
  frontmatter: Record<string, any>;
  body: string;
  sha: string;
}

export interface JsonContentResponse {
  type: 'json';
  json: any;
  sha: string;
}

export type ContentResponse = MarkdownContentResponse | JsonContentResponse;
