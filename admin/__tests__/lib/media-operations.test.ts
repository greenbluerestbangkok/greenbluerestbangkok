/**
 * Media Operations Test Suite
 * 
 * This file contains example usage and tests for the media upload/list/delete API endpoints.
 */

import { zMediaDeletePayload } from './media-schemas';

// Example usage documentation for media operations

export const mediaOperationsExamples = {
  // Upload media files
  async uploadMediaFiles(files: FileList) {
    try {
      const formData = new FormData();
      
      // Add all files to form data
      Array.from(files).forEach(file => {
        formData.append('files', file);
      });

      const response = await fetch('/admin/api/media/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      console.log('Media upload result:', data);

      // Example response:
      // {
      //   "success": true,
      //   "uploaded": [
      //     {
      //       "path": "public/images/2024/01/my-image-abc123.jpg",
      //       "originalName": "my-image.jpg",
      //       "size": 1024000,
      //       "mimeType": "image/jpeg",
      //       "url": "https://example.com/images/2024/01/my-image-abc123.jpg"
      //     }
      //   ],
      //   "errors": [],
      //   "message": "1 files uploaded successfully"
      // }

      return data;
    } catch (error) {
      console.error('Error uploading media:', error);
      throw error;
    }
  },

  // List media files with pagination
  async listMediaFiles(options: {
    page?: number;
    limit?: number;
    recursive?: boolean;
  } = {}) {
    try {
      const params = new URLSearchParams();
      if (options.page) params.set('page', options.page.toString());
      if (options.limit) params.set('limit', options.limit.toString());
      if (options.recursive) params.set('recursive', 'true');

      const response = await fetch(`/admin/api/media/list?${params}`);
      const data = await response.json();
      console.log('Media list result:', data);

      // Example response:
      // {
      //   "files": [
      //     {
      //       "path": "public/images/2024/01/image1.jpg",
      //       "type": "file",
      //       "sha": "abc123...",
      //       "url": "https://example.com/images/2024/01/image1.jpg"
      //     },
      //     {
      //       "path": "public/images/2024/01/image2.png",
      //       "type": "file",
      //       "sha": "def456...",
      //       "url": "https://example.com/images/2024/01/image2.png"
      //     }
      //   ],
      //   "pagination": {
      //     "page": 1,
      //     "limit": 50,
      //     "total": 25,
      //     "pages": 1,
      //     "hasNext": false,
      //     "hasPrev": false
      //   }
      // }

      return data;
    } catch (error) {
      console.error('Error listing media:', error);
      throw error;
    }
  },

  // Delete media file
  async deleteMediaFile(path: string, sha: string) {
    try {
      const payload = {
        path,
        sha
      };

      const response = await fetch('/admin/api/media/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log('Media delete result:', data);

      // Example response:
      // {
      //   "success": true,
      //   "commit": {
      //     "sha": "ghi789...",
      //     "message": "chore(admin): delete public/images/2024/01/old-image.jpg",
      //     "author": { "name": "Admin Bot", "email": "admin@local" },
      //     "date": "2024-01-15T10:30:00.000Z",
      //     "url": "https://github.com/owner/repo/commit/ghi789..."
      //   },
      //   "path": "public/images/2024/01/old-image.jpg",
      //   "message": "Media file deleted successfully"
      // }

      return data;
    } catch (error) {
      console.error('Error deleting media:', error);
      throw error;
    }
  },

  // Complete workflow: Upload -> List -> Delete
  async mediaWorkflowExample() {
    try {
      // 1. List existing files
      console.log('=== Listing existing media files ===');
      const initialList = await this.listMediaFiles({ limit: 5 });
      console.log('Initial files:', initialList.files.length);

      // 2. Upload new files (simulated - would need actual File objects)
      console.log('=== Uploading new files ===');
      // const uploadResult = await this.uploadMediaFiles(fileInput.files);
      // console.log('Uploaded files:', uploadResult.uploaded.length);

      // 3. List files again to see new uploads
      console.log('=== Listing files after upload ===');
      const afterUploadList = await this.listMediaFiles({ limit: 10 });
      console.log('Files after upload:', afterUploadList.files.length);

      // 4. Delete a file (example)
      if (afterUploadList.files.length > 0) {
        const fileToDelete = afterUploadList.files[0];
        console.log('=== Deleting file ===');
        console.log('Deleting:', fileToDelete.path);
        
        // Note: In real usage, you'd need the SHA from the file listing
        // For this example, we'll assume you have it
        // await this.deleteMediaFile(fileToDelete.path, fileToDelete.sha);
      }

      return {
        initial: initialList,
        afterUpload: afterUploadList,
      };
    } catch (error) {
      console.error('Media workflow error:', error);
      throw error;
    }
  },

  // Error handling examples
  async handleMediaErrors() {
    try {
      // Try to delete with invalid path
      const invalidPayload = {
        path: 'invalid/path.jpg',
        sha: 'abc123'
      };

      const response = await fetch('/admin/api/media/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(invalidPayload)
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
          case 404:
            console.log('File not found:', errorData.error);
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

  // File validation examples
  validateFileUpload(file: File) {
    const errors: string[] = [];
    
    // Check file type
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      errors.push(`Invalid file type: ${file.type}. Allowed: ${allowedTypes.join(', ')}`);
    }
    
    // Check file size (8MB limit)
    const maxSize = 8 * 1024 * 1024; // 8MB
    if (file.size > maxSize) {
      errors.push(`File too large: ${(file.size / 1024 / 1024).toFixed(2)}MB. Max: 8MB`);
    }
    
    // Check file name
    if (file.name.length === 0) {
      errors.push('File name is required');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  },

  // Validate delete payload
  validateDeletePayload(path: string, sha: string) {
    const payload = { path, sha };
    const result = zMediaDeletePayload.safeParse(payload);
    
    return {
      isValid: result.success,
      errors: result.success ? [] : result.error.errors.map(e => e.message),
      data: result.success ? result.data : null
    };
  }
};

// Type definitions for better TypeScript support
export interface MediaUploadResponse {
  success: boolean;
  uploaded: Array<{
    path: string;
    originalName: string;
    size: number;
    mimeType: string;
    url: string;
  }>;
  errors: Array<{
    name: string;
    error: string;
  }>;
  message: string;
}

export interface MediaListResponse {
  files: Array<{
    path: string;
    type: 'file' | 'dir';
    sha?: string;
    url: string;
  }>;
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface MediaDeleteResponse {
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

// Utility functions
export const mediaUtils = {
  // Generate file path preview
  generatePathPreview(originalName: string, mimeType: string): string {
    const now = new Date();
    const year = now.getFullYear().toString();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    
    const extMap: Record<string, string> = {
      'image/png': 'png',
      'image/jpeg': 'jpg',
      'image/jpg': 'jpg',
      'image/webp': 'webp'
    };
    
    const ext = extMap[mimeType.toLowerCase()] || 'jpg';
    const nameWithoutExt = originalName.replace(/\.[^/.]+$/, '');
    const slugifiedName = nameWithoutExt
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    
    const nanoid = Math.random().toString(36).substring(2, 8);
    
    return `public/images/${year}/${month}/${slugifiedName}-${nanoid}.${ext}`;
  },

  // Format file size
  formatFileSize(bytes: number): string {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  },

  // Get file extension from path
  getFileExtension(path: string): string {
    return path.split('.').pop()?.toLowerCase() || '';
  },

  // Check if file is image
  isImageFile(path: string): boolean {
    const ext = this.getFileExtension(path);
    return ['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(ext);
  }
};
