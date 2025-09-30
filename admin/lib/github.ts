import { Octokit } from '@octokit/rest';
import { mockFiles, mockContent, isDevelopmentMode } from './mock-data';

// GitHub configuration from environment variables
const GITHUB_OWNER = process.env.GITHUB_OWNER;
const GITHUB_REPO = process.env.GITHUB_REPO;
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || 'main';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

// Validate required environment variables
if (!GITHUB_OWNER || !GITHUB_REPO) {
  throw new Error('Missing required GitHub environment variables: GITHUB_OWNER, GITHUB_REPO');
}

// Use fallback token if not provided
const FALLBACK_TOKEN = 'ghp_fallback_token_for_development';
const ACTUAL_TOKEN = GITHUB_TOKEN || FALLBACK_TOKEN;

// Initialize Octokit client
const octokit = new Octokit({
  auth: ACTUAL_TOKEN,
  userAgent: 'GreenBlueRest-Admin/1.0.0',
});

// Custom error types for GitHub operations
export class GitHubError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string,
    public originalError?: any
  ) {
    super(message);
    this.name = 'GitHubError';
  }
}

export class GitHubRateLimitError extends GitHubError {
  constructor(retryAfter?: number) {
    super(
      `GitHub API rate limit exceeded${retryAfter ? `. Retry after ${retryAfter} seconds` : ''}`,
      403,
      'RATE_LIMITED'
    );
    this.name = 'GitHubRateLimitError';
  }
}

export class GitHubNotFoundError extends GitHubError {
  constructor(path: string) {
    super(`File not found: ${path}`, 404, 'NOT_FOUND');
    this.name = 'GitHubNotFoundError';
  }
}

export class GitHubValidationError extends GitHubError {
  constructor(message: string, details?: any) {
    super(`Validation error: ${message}`, 422, 'VALIDATION_ERROR', details);
    this.name = 'GitHubValidationError';
  }
}

// Type definitions
export interface GitHubFile {
  name: string;
  path: string;
  type: 'file' | 'dir';
  size?: number;
  sha?: string;
  content?: string; // base64 encoded
}

export interface GitHubCommitInfo {
  sha: string;
  message: string;
  author: {
    name: string;
    email: string;
  };
  date: string;
  url: string;
}

export interface GitHubFileContent {
  content: string; // base64 encoded
  sha: string;
  size?: number;
  encoding?: string;
}

// Helper function to handle GitHub API errors
function handleGitHubError(error: any, operation: string, path?: string): never {
  if (error.status === 403 && error.message?.includes('rate limit')) {
    const retryAfter = error.response?.headers?.['retry-after'];
    throw new GitHubRateLimitError(retryAfter ? parseInt(retryAfter) : undefined);
  }

  if (error.status === 404) {
    throw new GitHubNotFoundError(path || 'unknown');
  }

  if (error.status === 422) {
    const message = error.message || 'Validation failed';
    throw new GitHubValidationError(message, error.errors);
  }

  if (error.status === 409) {
    throw new GitHubError(
      `Conflict: ${operation} failed due to concurrent modifications`,
      error.status,
      'CONFLICT'
    );
  }

  // Generic GitHub error
  throw new GitHubError(
    `GitHub API error during ${operation}: ${error.message || 'Unknown error'}`,
    error.status,
    error.code,
    error
  );
}

// Helper function to format commit messages
function formatCommitMessage(action: string, path: string): string {
  return `chore(admin): ${action} ${path}`;
}

// Helper function to get commit author
function getCommitAuthor() {
  return {
    name: 'Admin Bot',
    email: 'admin@local',
  };
}

/**
 * List directory contents
 * @param path - Directory path (empty string for root)
 * @returns Array of file/directory information
 */
export async function listDir(path: string = ''): Promise<GitHubFile[]> {
  try {
    // Use mock data in development mode
    if (isDevelopmentMode()) {
      return mockFiles.filter(file => file.path.startsWith(path));
    }

    const { data } = await octokit.rest.repos.getContent({
      owner: GITHUB_OWNER!,
      repo: GITHUB_REPO!,
      path: path,
      ref: GITHUB_BRANCH,
    });

    // Handle single file response
    if (!Array.isArray(data)) {
      return [{
        name: data.name,
        path: data.path,
        type: data.type as 'file' | 'dir',
        size: data.size,
        sha: data.sha,
      }];
    }

    // Handle directory response
    return data.map(item => ({
      name: item.name,
      path: item.path,
      type: item.type as 'file' | 'dir',
      size: item.size,
      sha: item.sha,
    }));

  } catch (error: any) {
    // Fallback to mock data on error
    if (isDevelopmentMode()) {
      return mockFiles.filter(file => file.path.startsWith(path));
    }
    handleGitHubError(error, 'list directory', path);
  }
}

/**
 * Get file content and metadata
 * @param path - File path
 * @returns File content (base64) and SHA
 */
export async function getFile(path: string): Promise<GitHubFileContent> {
  try {
    // Use mock data in development mode
    if (isDevelopmentMode()) {
      const mockFileContent = mockContent[path as keyof typeof mockContent];
      if (mockFileContent) {
        return {
          content: mockFileContent,
          sha: 'mock-sha-' + Math.random().toString(36).substring(7),
          size: mockFileContent.length,
          encoding: 'base64'
        };
      }
      throw new GitHubNotFoundError(path);
    }

    const { data } = await octokit.rest.repos.getContent({
      owner: GITHUB_OWNER!,
      repo: GITHUB_REPO!,
      path: path,
      ref: GITHUB_BRANCH,
    });

    // Ensure it's a file, not a directory
    if (Array.isArray(data)) {
      throw new GitHubValidationError(`${path} is a directory, not a file`);
    }

    if (data.type !== 'file') {
      throw new GitHubValidationError(`${path} is not a file`);
    }

    if (!data.content) {
      throw new GitHubError(`No content found for file: ${path}`);
    }

    return {
      content: data.content,
      sha: data.sha,
      size: data.size,
      encoding: data.encoding,
    };

  } catch (error: any) {
    // Fallback to mock data on error
    if (isDevelopmentMode()) {
      const mockFileContent = mockContent[path as keyof typeof mockContent];
      if (mockFileContent) {
        return {
          content: mockFileContent,
          sha: 'mock-sha-' + Math.random().toString(36).substring(7),
          size: mockFileContent.length,
          encoding: 'base64'
        };
      }
    }
    handleGitHubError(error, 'get file', path);
  }
}

/**
 * Create or update a file
 * @param path - File path
 * @param base64Content - Base64 encoded file content
 * @param message - Commit message (optional, will be auto-generated)
 * @param sha - File SHA for updates (optional, required for updates)
 * @returns Commit information
 */
export async function putFile(
  path: string,
  base64Content: string,
  message?: string,
  sha?: string
): Promise<GitHubCommitInfo> {
  try {
    // Use mock data in development mode
    if (isDevelopmentMode()) {
      return {
        sha: 'mock-commit-' + Math.random().toString(36).substring(7),
        message: message || 'Mock commit',
        author: { name: 'Admin Bot', email: 'admin@local' },
        date: new Date().toISOString(),
        url: 'https://github.com/mock/repo/commit/mock'
      };
    }

    const commitMessage = message || formatCommitMessage(
      sha ? 'update' : 'create',
      path
    );

    const { data } = await octokit.rest.repos.createOrUpdateFileContents({
      owner: GITHUB_OWNER!,
      repo: GITHUB_REPO!,
      path: path,
      message: commitMessage,
      content: base64Content,
      branch: GITHUB_BRANCH,
      ...(sha && { sha }), // Only include sha if provided
      author: getCommitAuthor(),
      committer: getCommitAuthor(),
    });

    return {
      sha: data.commit.sha || '',
      message: data.commit.message || '',
      author: {
        name: data.commit.author?.name || 'Admin Bot',
        email: data.commit.author?.email || 'admin@local',
      },
      date: data.commit.author?.date || new Date().toISOString(),
      url: data.commit.html_url || '',
    };

  } catch (error: any) {
    handleGitHubError(error, 'put file', path);
  }
}

/**
 * Delete a file
 * @param path - File path
 * @param message - Commit message (optional, will be auto-generated)
 * @param sha - File SHA (required for deletion)
 * @returns Commit information
 */
export async function deleteFile(
  path: string,
  message?: string,
  sha?: string
): Promise<GitHubCommitInfo> {
  try {
    // Use mock data in development mode
    if (isDevelopmentMode()) {
      return {
        sha: 'mock-delete-' + Math.random().toString(36).substring(7),
        message: message || 'Mock delete commit',
        author: { name: 'Admin Bot', email: 'admin@local' },
        date: new Date().toISOString(),
        url: 'https://github.com/mock/repo/commit/mock'
      };
    }

    if (!sha) {
      // Get the file SHA first
      const fileInfo = await getFile(path);
      sha = fileInfo.sha;
    }

    const commitMessage = message || formatCommitMessage('delete', path);

    const { data } = await octokit.rest.repos.deleteFile({
      owner: GITHUB_OWNER!,
      repo: GITHUB_REPO!,
      path: path,
      message: commitMessage,
      sha: sha,
      branch: GITHUB_BRANCH,
      author: getCommitAuthor(),
      committer: getCommitAuthor(),
    });

    return {
      sha: data.commit.sha || '',
      message: data.commit.message || '',
      author: {
        name: data.commit.author?.name || 'Admin Bot',
        email: data.commit.author?.email || 'admin@local',
      },
      date: data.commit.author?.date || new Date().toISOString(),
      url: data.commit.html_url || '',
    };

  } catch (error: any) {
    handleGitHubError(error, 'delete file', path);
  }
}

/**
 * Check if file exists
 * @param path - File path
 * @returns Boolean indicating if file exists
 */
export async function fileExists(path: string): Promise<boolean> {
  try {
    await getFile(path);
    return true;
  } catch (error) {
    if (error instanceof GitHubNotFoundError) {
      return false;
    }
    throw error;
  }
}

/**
 * Get repository information
 * @returns Repository metadata
 */
export async function getRepoInfo(): Promise<{
  name: string;
  fullName: string;
  defaultBranch: string;
  url: string;
}> {
  try {
    const { data } = await octokit.rest.repos.get({
      owner: GITHUB_OWNER!,
      repo: GITHUB_REPO!,
    });

    return {
      name: data.name,
      fullName: data.full_name,
      defaultBranch: data.default_branch,
      url: data.html_url,
    };

  } catch (error: any) {
    handleGitHubError(error, 'get repository info');
  }
}

/**
 * Get rate limit status
 * @returns Current rate limit information
 */
export async function getRateLimit(): Promise<{
  limit: number;
  remaining: number;
  reset: Date;
  used: number;
}> {
  try {
    const { data } = await octokit.rest.rateLimit.get();

    return {
      limit: data.rate.limit,
      remaining: data.rate.remaining,
      reset: new Date(data.rate.reset * 1000),
      used: data.rate.limit - data.rate.remaining,
    };

  } catch (error: any) {
    handleGitHubError(error, 'get rate limit');
  }
}

// Export the configured Octokit instance for advanced usage
export { octokit };