/**
 * GitHub API Functions Test Suite
 * 
 * This file contains example usage and tests for the GitHub API functions.
 * Run with: npx jest lib/github.test.ts
 */

import {
  listDir,
  getFile,
  putFile,
  deleteFile,
  fileExists,
  getRepoInfo,
  getRateLimit,
  GitHubError,
  GitHubRateLimitError,
  GitHubNotFoundError,
  GitHubValidationError,
} from './github';

// Mock environment variables for testing
process.env.GITHUB_OWNER = 'test-owner';
process.env.GITHUB_REPO = 'test-repo';
process.env.GITHUB_TOKEN = 'test-token';
process.env.GITHUB_BRANCH = 'main';

describe('GitHub API Functions', () => {
  describe('Error Handling', () => {
    test('should throw GitHubNotFoundError for 404 responses', () => {
      const error = new GitHubNotFoundError('test/file.txt');
      expect(error).toBeInstanceOf(GitHubError);
      expect(error.status).toBe(404);
      expect(error.code).toBe('NOT_FOUND');
      expect(error.message).toBe('File not found: test/file.txt');
    });

    test('should throw GitHubRateLimitError with retry information', () => {
      const error = new GitHubRateLimitError(60);
      expect(error).toBeInstanceOf(GitHubError);
      expect(error.status).toBe(403);
      expect(error.code).toBe('RATE_LIMITED');
      expect(error.message).toBe('GitHub API rate limit exceeded. Retry after 60 seconds');
    });

    test('should throw GitHubValidationError for 422 responses', () => {
      const error = new GitHubValidationError('Invalid file path', { path: 'invalid' });
      expect(error).toBeInstanceOf(GitHubError);
      expect(error.status).toBe(422);
      expect(error.code).toBe('VALIDATION_ERROR');
      expect(error.message).toBe('Validation error: Invalid file path');
    });
  });

  describe('Utility Functions', () => {
    test('should validate environment variables', () => {
      // This test would run in a real environment
      expect(process.env.GITHUB_OWNER).toBeDefined();
      expect(process.env.GITHUB_REPO).toBeDefined();
      expect(process.env.GITHUB_TOKEN).toBeDefined();
    });
  });
});

// Example usage documentation
export const exampleUsage = {
  // List directory contents
  async listDirectory() {
    try {
      const files = await listDir('pages');
      console.log('Directory contents:', files);
      return files;
    } catch (error) {
      if (error instanceof GitHubNotFoundError) {
        console.log('Directory not found');
      } else if (error instanceof GitHubRateLimitError) {
        console.log('Rate limited, please wait');
      }
      throw error;
    }
  },

  // Get file content
  async readFile() {
    try {
      const file = await getFile('pages/index.html');
      console.log('File SHA:', file.sha);
      console.log('File size:', file.size);
      // Decode base64 content
      const content = Buffer.from(file.content, 'base64').toString('utf-8');
      console.log('File content:', content);
      return file;
    } catch (error) {
      if (error instanceof GitHubNotFoundError) {
        console.log('File does not exist');
      }
      throw error;
    }
  },

  // Create or update file
  async writeFile() {
    const content = '<html><body>Hello World</body></html>';
    const base64Content = Buffer.from(content).toString('base64');

    try {
      const commit = await putFile(
        'pages/test.html',
        base64Content,
        'chore(admin): create test page'
      );
      console.log('File created/updated:', commit.sha);
      console.log('Commit URL:', commit.url);
      return commit;
    } catch (error) {
      if (error instanceof GitHubValidationError) {
        console.log('Validation failed:', error.message);
      }
      throw error;
    }
  },

  // Update existing file
  async updateFile() {
    try {
      // First, get the current file to obtain its SHA
      const currentFile = await getFile('pages/test.html');
      
      // Modify content
      const newContent = '<html><body>Updated Content</body></html>';
      const base64Content = Buffer.from(newContent).toString('base64');

      // Update file with SHA
      const commit = await putFile(
        'pages/test.html',
        base64Content,
        'chore(admin): update test page',
        currentFile.sha // Required for updates
      );
      
      console.log('File updated:', commit.sha);
      return commit;
    } catch (error) {
      throw error;
    }
  },

  // Delete file
  async removeFile() {
    try {
      // Get file SHA first
      const file = await getFile('pages/test.html');
      
      const commit = await deleteFile(
        'pages/test.html',
        'chore(admin): remove test page',
        file.sha
      );
      
      console.log('File deleted:', commit.sha);
      return commit;
    } catch (error) {
      if (error instanceof GitHubNotFoundError) {
        console.log('File already deleted or does not exist');
      }
      throw error;
    }
  },

  // Check if file exists
  async checkFileExists() {
    const exists = await fileExists('pages/index.html');
    console.log('File exists:', exists);
    return exists;
  },

  // Get repository information
  async getRepositoryInfo() {
    try {
      const repo = await getRepoInfo();
      console.log('Repository:', repo.fullName);
      console.log('Default branch:', repo.defaultBranch);
      console.log('URL:', repo.url);
      return repo;
    } catch (error) {
      throw error;
    }
  },

  // Check rate limit
  async checkRateLimit() {
    try {
      const rateLimit = await getRateLimit();
      console.log('Rate limit:', rateLimit.remaining, '/', rateLimit.limit);
      console.log('Resets at:', rateLimit.reset);
      return rateLimit;
    } catch (error) {
      throw error;
    }
  },
};
