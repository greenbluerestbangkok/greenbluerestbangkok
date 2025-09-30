/**
 * Content Pages Test Suite
 * 
 * This file contains example usage and tests for the content management pages.
 */

// Example usage documentation for content pages

export const contentPagesExamples = {
  // Content List Page Features
  contentListFeatures: {
    search: 'Search content by filename',
    filter: 'Filter by content type (Markdown/JSON)',
    pagination: 'Built-in pagination for large content libraries',
    actions: 'Quick Edit/Delete actions for each content item',
    stats: 'Display total file count and filtered results',
    navigation: 'Link to create new content'
  },

  // New Content Page Features
  newContentFeatures: {
    tabs: 'Switch between Markdown and JSON content creation',
    markdownForm: {
      fields: [
        'Path (auto-generated from title)',
        'Title (required)',
        'Date (defaults to today)',
        'Tags (comma-separated)',
        'Status (draft/published)',
        'Cover Image URL (optional)',
        'Content body (Markdown)'
      ],
      validation: 'All required fields validated',
      autoSlug: 'Path auto-generated from title slug'
    },
    jsonForm: {
      fields: [
        'Path (required)',
        'JSON Content (validated)'
      ],
      validation: 'Real-time JSON validation with error display',
      formatting: 'Auto-formatted JSON with proper indentation'
    },
    redirect: 'After save, redirects to edit page or content list'
  },

  // Edit Content Page Features
  editContentFeatures: {
    loading: 'Loads existing content via API',
    markdownEdit: {
      form: 'Pre-populated form with existing frontmatter and body',
      publishToggle: 'Quick publish/unpublish button',
      statusUpdate: 'Auto-save status changes',
      validation: 'Same validation as new content'
    },
    jsonEdit: {
      form: 'Pre-populated JSON with proper formatting',
      validation: 'Real-time JSON validation',
      formatting: 'Maintains proper JSON indentation'
    },
    delete: 'Delete confirmation with SHA requirement',
    navigation: 'Back to content list, cancel options'
  }
};

// Navigation examples
export const navigationExamples = {
  // Content List Page Navigation
  contentList: {
    newContent: 'Navigate to /admin/content/new',
    editContent: 'Navigate to /admin/content/[slug]',
    dashboard: 'Navigate to /admin (dashboard)',
    deleteContent: 'Delete with confirmation modal'
  },

  // New Content Page Navigation
  newContent: {
    saveAndEdit: 'Save and redirect to edit page',
    saveAndList: 'Save and redirect to content list',
    cancel: 'Cancel and return to content list'
  },

  // Edit Content Page Navigation
  editContent: {
    save: 'Save changes and reload content',
    publish: 'Toggle publish status (auto-save)',
    delete: 'Delete with confirmation',
    backToList: 'Return to content list'
  }
};

// Form validation examples
export const validationExamples = {
  markdown: {
    required: ['path', 'title', 'date', 'body'],
    optional: ['tags', 'cover', 'status'],
    pathFormat: 'Must start with /content/ and end with .md',
    titleSlug: 'Auto-generates slug from title',
    dateFormat: 'YYYY-MM-DD format',
    tagsFormat: 'Comma-separated list',
    statusOptions: ['draft', 'published']
  },

  json: {
    required: ['path', 'json content'],
    pathFormat: 'Must start with /content/ and end with .json',
    jsonValidation: 'Must be valid JSON format',
    formatting: 'Auto-formatted with 2-space indentation'
  },

  common: {
    pathValidation: 'Must be under /content/ directory',
    shaRequired: 'Required for updates and deletes',
    uniquePaths: 'Each content file must have unique path'
  }
};

// State management examples
export const stateManagementExamples = {
  contentList: {
    loading: 'Loading state while fetching content',
    error: 'Error handling for failed API calls',
    search: 'Real-time search filtering',
    filter: 'Type-based filtering',
    pagination: 'Pagination state management'
  },

  newContent: {
    tabs: 'Active tab state (md/json)',
    forms: 'Separate form states for md/json',
    validation: 'Real-time validation state',
    loading: 'Save operation loading state',
    success: 'Success message display'
  },

  editContent: {
    content: 'Loaded content state',
    forms: 'Pre-populated form states',
    saving: 'Save operation state',
    publishStatus: 'Publish/unpublish state',
    sha: 'SHA tracking for updates'
  }
};

// API integration examples
export const apiIntegrationExamples = {
  contentList: {
    fetch: 'GET /admin/api/content/list',
    delete: 'DELETE /admin/api/content/delete',
    errorHandling: 'Handle 401, 404, 500 errors'
  },

  newContent: {
    save: 'POST /admin/api/content/save',
    validation: 'Validate payload before sending',
    success: 'Handle successful creation'
  },

  editContent: {
    load: 'GET /admin/api/content/get?path=...',
    save: 'POST /admin/api/content/save (with SHA)',
    delete: 'DELETE /admin/api/content/delete (with SHA)',
    publish: 'Auto-save status changes'
  }
};

// UI/UX examples
export const uiUxExamples = {
  responsive: {
    mobile: 'Mobile-friendly table layout',
    tablet: 'Responsive form layouts',
    desktop: 'Full-featured desktop interface'
  },

  accessibility: {
    labels: 'Proper form labels',
    focus: 'Keyboard navigation support',
    contrast: 'Good color contrast',
    screenReaders: 'Screen reader friendly'
  },

  userExperience: {
    loading: 'Loading indicators',
    feedback: 'Success/error messages',
    confirmation: 'Delete confirmation modals',
    autoSave: 'Auto-save for status changes',
    validation: 'Real-time validation feedback'
  }
};

// Error handling examples
export const errorHandlingExamples = {
  network: {
    timeout: 'Handle network timeouts',
    offline: 'Handle offline state',
    retry: 'Retry failed requests'
  },

  validation: {
    clientSide: 'Real-time form validation',
    serverSide: 'Handle server validation errors',
    display: 'Clear error message display'
  },

  permissions: {
    unauthorized: 'Handle 401 errors',
    forbidden: 'Handle 403 errors',
    redirect: 'Redirect to login on auth failure'
  },

  content: {
    notFound: 'Handle missing content (404)',
    conflict: 'Handle SHA conflicts',
    invalid: 'Handle invalid content format'
  }
};

// Type definitions for better TypeScript support
export interface ContentListState {
  content: Array<{
    path: string;
    type: 'md' | 'json';
    sha?: string;
  }>;
  filteredContent: Array<{
    path: string;
    type: 'md' | 'json';
    sha?: string;
  }>;
  loading: boolean;
  error: string;
  searchTerm: string;
  typeFilter: 'all' | 'md' | 'json';
  deleteConfirm: string | null;
}

export interface NewContentState {
  activeTab: 'md' | 'json';
  loading: boolean;
  error: string;
  success: string;
  mdForm: {
    path: string;
    title: string;
    date: string;
    tags: string;
    status: 'draft' | 'published';
    cover: string;
    body: string;
  };
  jsonForm: {
    path: string;
    content: string;
  };
}

export interface EditContentState {
  content: {
    type: 'md' | 'json';
    frontmatter?: any;
    body?: string;
    json?: any;
    sha: string;
  } | null;
  loading: boolean;
  saving: boolean;
  error: string;
  success: string;
  mdForm: {
    title: string;
    date: string;
    tags: string;
    status: 'draft' | 'published';
    cover: string;
    body: string;
  };
  jsonForm: {
    content: string;
  };
}

// Utility functions
export const contentUtils = {
  // Generate slug from title
  generateSlug: (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  },

  // Extract slug from path
  getContentSlug: (path: string): string => {
    return path.replace(/^\/content\//, '').replace(/\.(md|json)$/, '');
  },

  // Get content type icon
  getContentTypeIcon: (type: string): string => {
    return type === 'md' ? '📝' : '📄';
  },

  // Get content type label
  getContentTypeLabel: (type: string): string => {
    return type === 'md' ? 'Markdown' : 'JSON';
  },

  // Format tags
  formatTags: (tags: string): string[] => {
    return tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);
  },

  // Validate JSON
  validateJson: (jsonString: string): { valid: boolean; error: string | null } => {
    try {
      JSON.parse(jsonString);
      return { valid: true, error: null };
    } catch (error) {
      return { 
        valid: false, 
        error: error instanceof Error ? error.message : 'Invalid JSON' 
      };
    }
  },

  // Format JSON
  formatJson: (json: any): string => {
    return JSON.stringify(json, null, 2);
  }
};
