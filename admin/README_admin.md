# Green Blue Rest Bangkok - Admin Panel

A Next.js 14 admin panel for managing content and media for the Green Blue Rest Bangkok website.

## Features

- **Content Management**: Create, edit, and delete HTML pages, blog posts, trips, and products
- **Media Management**: Upload, organize, and delete images and files
- **Authentication**: Secure JWT-based authentication with HTTP-only cookies
- **GitHub Integration**: Full GitHub API integration for file operations with error handling
- **Responsive Design**: Mobile-friendly admin interface
- **TypeScript**: Full TypeScript support with strict mode

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **Authentication**: JWT with jose
- **File Handling**: Formidable for uploads
- **Content Processing**: gray-matter for frontmatter
- **Validation**: Zod for schema validation
- **GitHub API**: Octokit for GitHub integration

## Project Structure

```
admin/
├── app/
│   ├── api/                 # API routes
│   │   ├── auth/           # Authentication endpoints
│   │   ├── content/        # Content CRUD operations
│   │   └── media/          # Media management
│   ├── content/            # Content management pages
│   ├── login/              # Login page
│   ├── media/              # Media management page
│   └── page.tsx            # Dashboard redirect
├── components/             # Reusable UI components
├── lib/                    # Utility functions and configurations
├── middleware.ts           # Authentication middleware
└── README_admin.md         # This file
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Access to the Green Blue Rest Bangkok repository

### Installation

1. Navigate to the admin directory:
   ```bash
   cd admin
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy environment variables:
   ```bash
   cp .env.example .env.local
   ```

4. Configure environment variables in `.env.local`:

#### GitHub Token Setup

Your GitHub token needs the following permissions:
- `repo` (Full control of private repositories)
- `contents` (Read/write access to repository contents)

**Creating a GitHub Token:**
1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Select scopes:
   - ✅ `repo` (Full control of private repositories)
   - ✅ `contents` (Read/write access to repository contents)
4. Copy the generated token to your `.env.local`

#### Generate Admin Password Hash

Use Node.js to generate a bcrypt hash for your admin password:

```bash
node -e "const bcrypt=require('bcryptjs');(async()=>{console.log(await bcrypt.hash(process.argv[1],12));})();" 'your-secure-password'
```

Example output:
```
$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBdXUc8Vvz4Q2e
```

#### Environment Variables

```env
# GitHub Configuration
GITHUB_OWNER=your-github-username
GITHUB_REPO=your-repo-name
GITHUB_BRANCH=main
GITHUB_TOKEN=your_github_personal_access_token

# Admin Authentication
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_PASSWORD_HASH=your-bcrypt-hash-here
JWT_SECRET=your-super-secret-jwt-key-here

# Application Configuration
BASE_URL=http://localhost:3001

# File Upload
MAX_FILE_SIZE=10485760
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/webp,image/gif

# Content Directories
CONTENT_DIR=../pages
IMAGES_DIR=../images
DATA_DIR=../js
```

### Folder Conventions

#### Content Files (`/content/**`)
- **Markdown files**: `.md` extension with YAML frontmatter
- **JSON files**: `.json` extension for structured data
- **Path structure**: `/content/blog/post.md`, `/content/data/config.json`
- **Frontmatter**: Supports `title`, `date`, `tags`, `status`, `cover` fields

#### Media Files (`/public/images/**`)
- **Supported formats**: PNG, JPEG, WebP, GIF
- **Path structure**: `/public/images/YYYY/MM/filename-nanoid.ext`
- **Auto-organization**: Files organized by year/month
- **Size limit**: 8MB per file

### Commit Messages and Author

All admin operations create commits with:
- **Author**: "Admin Bot" <admin@local>
- **Message format**: `chore(admin): <action> <path>`
- **Examples**:
  - `chore(admin): update /content/blog/post.md`
  - `chore(admin): upload /public/images/2024/01/image-abc123.jpg`
  - `chore(admin): delete /content/blog/old-post.md`

## Development

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Access the admin panel at `http://localhost:3000/admin`

## Production Deployment

### GitHub Pages with Actions

1. **Set up GitHub Actions workflow** (`.github/workflows/deploy.yml`):
   ```yaml
   name: Deploy to GitHub Pages
   
   on:
     push:
       branches: [ main ]
   
   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - name: Setup Node.js
           uses: actions/setup-node@v4
           with:
             node-version: '18'
         - name: Install dependencies
           run: npm install
         - name: Build
           run: npm run build
         - name: Deploy to GitHub Pages
           uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./out
   ```

2. **Configure repository settings**:
   - Go to Settings → Pages
   - Source: "GitHub Actions"
   - Ensure commits to `GITHUB_BRANCH` trigger the build

### Vercel Deployment

1. **Connect repository to Vercel**:
   ```bash
   npm install -g vercel
   vercel --prod
   ```

2. **Configure environment variables** in Vercel dashboard:
   - Add all variables from `.env.local`
   - Set `BASE_URL` to your Vercel domain

3. **Auto-redeploy**: Vercel automatically redeploys on push to `GITHUB_BRANCH`

### Cloudflare Pages

1. **Connect repository to Cloudflare Pages**:
   - Go to Cloudflare Dashboard → Pages
   - Connect your GitHub repository
   - Build command: `npm run build`
   - Build output directory: `out`

2. **Configure environment variables**:
   - Add all variables from `.env.local`
   - Set `BASE_URL` to your Cloudflare Pages domain

3. **Auto-redeploy**: Cloudflare Pages automatically redeploys on push to `GITHUB_BRANCH`

## Security Features

### CSRF and Origin Protection
- **JWT Authentication**: All admin routes protected with JWT tokens
- **HTTP-only Cookies**: Secure cookie storage prevents XSS attacks
- **SameSite=strict**: Prevents CSRF attacks
- **Secure Cookies**: HTTPS-only cookie transmission
- **Origin Validation**: Middleware validates request origins

### Path Traversal Prevention
- **Path Normalization**: All paths normalized and validated
- **Content Paths**: Restricted to `/content/**` directory
- **Media Paths**: Restricted to `/public/images/**` directory
- **Input Validation**: Zod schemas validate all inputs
- **SHA Verification**: File operations require valid SHA hashes

### Size and Type Limits
- **File Size Limits**: 8MB maximum for media uploads
- **File Type Validation**: Only PNG, JPEG, WebP, GIF allowed
- **Content Validation**: JSON and Markdown validation
- **Rate Limiting**: GitHub API rate limit handling

## Test Plan

### Authentication Tests
1. **Login Success**: 
   - Navigate to `/admin/login`
   - Enter valid credentials
   - Verify redirect to dashboard
   - Verify session cookie set

2. **Login Failure**:
   - Enter invalid credentials
   - Verify error message displayed
   - Verify no session cookie set

### Content Management Tests
3. **Create New Markdown**:
   - Navigate to `/admin/content/new`
   - Fill in title, content, set status to draft
   - Save content
   - Verify commit exists in GitHub
   - Change status to published
   - Save and verify new commit

4. **Edit Markdown Content**:
   - Navigate to existing content
   - Edit frontmatter and body
   - Save changes
   - Verify commit exists with updated content

5. **Create New JSON**:
   - Navigate to `/admin/content/new`
   - Switch to JSON tab
   - Enter valid JSON content
   - Save content
   - Verify commit exists in GitHub

6. **Edit JSON Content**:
   - Navigate to existing JSON content
   - Edit JSON content
   - Save changes
   - Verify commit exists with updated content

### Media Management Tests
7. **Upload Images**:
   - Navigate to `/admin/media`
   - Upload 2 images (PNG and WebP)
   - Verify upload success messages
   - Verify commits exist in GitHub
   - Copy image paths
   - Verify paths are correct

8. **Delete Media**:
   - Select an uploaded image
   - Click delete and confirm
   - Verify deletion success message
   - Verify delete commit exists in GitHub

### Content Deletion Tests
9. **Delete Content File**:
   - Navigate to content list
   - Select a content file
   - Click delete and confirm
   - Verify deletion success message
   - Verify delete commit exists in GitHub

### Site Integration Tests
10. **Verify Site Rebuild**:
    - Make changes via admin panel
    - Verify commits exist in GitHub
    - Check that site CI/CD pipeline triggers
    - Verify changes appear on live site

### Deployment Verification
11. **GitHub Pages**: Ensure commits to `GITHUB_BRANCH` trigger build
12. **Vercel**: Ensure auto-redeploy on push to `GITHUB_BRANCH`
13. **Cloudflare**: Ensure auto-redeploy on push to `GITHUB_BRANCH`

## Troubleshooting

### Common Issues

#### Authentication Problems
- **Invalid credentials**: Check `ADMIN_EMAIL` and `ADMIN_PASSWORD_HASH` in `.env.local`
- **JWT errors**: Verify `JWT_SECRET` is set and consistent
- **Cookie issues**: Check browser developer tools for cookie settings

#### GitHub API Issues
- **401 Unauthorized**: Verify `GITHUB_TOKEN` has correct permissions
- **403 Forbidden**: Check token scopes include `repo` and `contents`
- **Rate limiting**: Implement exponential backoff for API calls

#### File Upload Issues
- **Size limit exceeded**: Check `MAX_FILE_SIZE` configuration
- **Invalid file type**: Verify `ALLOWED_FILE_TYPES` includes your format
- **Path errors**: Ensure file paths are under allowed directories

#### Deployment Issues
- **Build failures**: Check environment variables in deployment platform
- **Auto-redeploy not working**: Verify webhook configuration
- **Site not updating**: Check CI/CD pipeline logs

### Debug Mode

Enable debug logging by setting:
```env
NODE_ENV=development
DEBUG=admin:*
```

### Support

For issues and questions:
1. Check the troubleshooting section above
2. Review GitHub repository issues
3. Check deployment platform logs
4. Verify environment variable configuration

## Usage

### Authentication

1. Navigate to `/admin/login`
2. Use the email and password configured in your environment variables
3. **Important**: You must set up your admin credentials in `.env.local`:
   - `ADMIN_EMAIL`: Your admin email address
   - `ADMIN_PASSWORD_HASH`: Generated bcrypt hash (see password generation above)
   - `JWT_SECRET`: Strong random secret for JWT signing

4. **Security Features**:
   - HTTP-only cookies for token storage
   - Short-lived tokens (2 hours) with optional refresh
   - Secure cookie settings (Secure, SameSite=strict)
   - All admin routes protected except login

### Content Management

1. **View Content**: Navigate to `/admin/content` to see all existing content
2. **Create Content**: Click "New Content" to create a new page, blog post, trip, or product
3. **Edit Content**: Click "Edit" on any content item to modify it
4. **Delete Content**: Click "Delete" to remove content (with confirmation)

### Media Management

1. **View Media**: Navigate to `/admin/media` to see all uploaded files
2. **Upload Files**: Drag and drop or click to upload images
3. **Copy URLs**: Click "Copy URL" to copy the file URL to clipboard
4. **Delete Files**: Click "Delete" to remove files (with confirmation)

## API Endpoints

### Authentication
- `POST /admin/api/auth/login` - Login with username/password
- `POST /admin/api/auth/logout` - Logout and clear session
- `GET /admin/api/me` - Get current user info

### Content Management
- `GET /admin/api/content/list` - List all content files (recursively from /content directory)
- `GET /admin/api/content/get?path=...` - Get specific content file with frontmatter parsing
- `POST /admin/api/content/save` - Save/update markdown or JSON content to GitHub
- `DELETE /admin/api/content/delete` - Delete content file from GitHub

### Content Pages
- `/admin/content` - Content list with search, filters, and quick actions
- `/admin/content/new` - Create new content with Markdown/JSON tabs
- `/admin/content/[slug]` - Edit existing content with publish controls

### Dashboard
- `/admin` - Enhanced dashboard with real-time stats and quick actions

### Media Management
- `GET /admin/api/media/list` - List all media files with pagination and recursive scanning
- `POST /admin/api/media/upload` - Upload multiple image files (multipart/form-data)
- `DELETE /admin/api/media/delete` - Delete media files from GitHub

### Media Page
- `/admin/media` - Media library with drag & drop upload and grid/list views

### GitHub Integration
The admin panel includes comprehensive GitHub API integration for file operations:

- `listDir(path)` - List directory contents
- `getFile(path)` - Get file content and metadata
- `putFile(path, content, message, sha?)` - Create or update files
- `deleteFile(path, message, sha)` - Delete files
- `fileExists(path)` - Check if file exists
- `getRepoInfo()` - Get repository information
- `getRateLimit()` - Check API rate limits

**Error Handling**: Custom error types for different scenarios:
- `GitHubRateLimitError` - API rate limit exceeded
- `GitHubNotFoundError` - File or directory not found
- `GitHubValidationError` - Invalid request parameters
- `GitHubError` - Generic GitHub API errors

## Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `GITHUB_OWNER` | GitHub repository owner | Required |
| `GITHUB_REPO` | GitHub repository name | Required |
| `GITHUB_BRANCH` | GitHub branch name | `main` |
| `GITHUB_TOKEN` | GitHub personal access token | Required |
| `ADMIN_EMAIL` | Admin login email | Required |
| `ADMIN_PASSWORD_HASH` | Bcrypt hash of admin password | Required |
| `JWT_SECRET` | JWT signing secret | Required |
| `BASE_URL` | Application base URL | `http://localhost:3001` |
| `CONTENT_DIR` | Content files directory | `../pages` |
| `IMAGES_DIR` | Images directory | `../images` |
| `MAX_FILE_SIZE` | Maximum upload size (bytes) | `10485760` |
| `ALLOWED_FILE_TYPES` | Allowed file types | `image/jpeg,image/png,image/webp,image/gif` |

### Content Structure

Content files are stored as HTML files with frontmatter metadata in HTML comments:

```html
<!--
---
title: "Page Title"
type: "page"
published: true
updated: "2024-01-01T00:00:00.000Z"
---
-->
<!DOCTYPE html>
<html lang="th">
<head>
    <title>Page Title</title>
    <link rel="stylesheet" href="/css/style.css">
</head>
<body>
    <!-- Your content here -->
</body>
</html>
```

## Security Considerations

1. **Strong Admin Credentials**: Use a strong password and generate a secure bcrypt hash
2. **Strong JWT Secret**: Use a strong, random JWT secret in production (32+ characters)
3. **HTTPS**: Always use HTTPS in production for secure cookie transmission
4. **File Upload Limits**: Configure appropriate file size and type limits
5. **Environment Variables**: Never commit sensitive environment variables to version control
6. **Cookie Security**: HTTP-only, Secure, and SameSite=strict cookies are enforced
7. **Short-lived Tokens**: JWT tokens expire after 2 hours for enhanced security

## Development Notes

- The admin panel runs on port 3001 to avoid conflicts with the main site
- All admin routes are prefixed with `/admin`
- Authentication middleware protects all admin routes except login
- File uploads are stored in the `images/uploads/` directory
- Content files are stored in the `pages/` directory relative to the project root

### GitHub Integration

The admin panel includes full GitHub API integration for managing content directly in your repository:

#### Setup GitHub Integration

1. **Create a GitHub Personal Access Token**:
   - Go to GitHub Settings → Developer settings → Personal access tokens
   - Generate a new token with `repo` permissions
   - Copy the token to your `.env.local` file

2. **Configure Repository Access**:
   ```env
   GITHUB_OWNER=your-github-username
   GITHUB_REPO=your-repository-name
   GITHUB_BRANCH=main
   GITHUB_TOKEN=your-personal-access-token
   ```

#### GitHub API Features

- **File Operations**: Create, read, update, and delete files directly in your repository
- **Commit Management**: All changes are committed with proper commit messages
- **Error Handling**: Comprehensive error handling for rate limits, conflicts, and validation errors
- **Rate Limit Monitoring**: Built-in rate limit checking and handling
- **Author Information**: All commits are attributed to "Admin Bot" with proper email

#### Example Usage

```typescript
import { listDir, getFile, putFile, deleteFile } from '@/lib/github';

// List directory contents
const files = await listDir('pages');

// Get file content
const file = await getFile('pages/index.html');
const content = Buffer.from(file.content, 'base64').toString('utf-8');

// Create or update file
const newContent = Buffer.from('<html>New content</html>').toString('base64');
const commit = await putFile('pages/new-page.html', newContent);

// Delete file
const commit = await deleteFile('pages/old-page.html', 'chore(admin): remove old page');
```

#### Error Handling

```typescript
import { 
  GitHubError, 
  GitHubRateLimitError, 
  GitHubNotFoundError, 
  GitHubValidationError 
} from '@/lib/github';

try {
  const file = await getFile('nonexistent.txt');
} catch (error) {
  if (error instanceof GitHubNotFoundError) {
    console.log('File not found');
  } else if (error instanceof GitHubRateLimitError) {
    console.log('Rate limited, please wait');
  } else if (error instanceof GitHubValidationError) {
    console.log('Validation error:', error.message);
  }
}
```

### Content API Integration

The admin panel includes specialized content management APIs that work with GitHub:

#### Content List API

```typescript
// List all content files recursively
const response = await fetch('/admin/api/content/list');
const data = await response.json();

// Response format:
{
  "content": [
    { "path": "content/blog/post-1.md", "type": "md", "sha": "abc123..." },
    { "path": "content/data/config.json", "type": "json", "sha": "def456..." }
  ],
  "count": 2
}
```

#### Content Get API

```typescript
// Get markdown content with frontmatter parsing
const response = await fetch('/admin/api/content/get?path=content/blog/post-1.md');
const data = await response.json();

// Markdown response format:
{
  "type": "md",
  "frontmatter": {
    "title": "My Blog Post",
    "date": "2024-01-15",
    "published": true
  },
  "body": "# My Blog Post\n\nContent here...",
  "sha": "abc123..."
}

// JSON response format:
{
  "type": "json",
  "json": { "site": { "title": "My Site" } },
  "sha": "def456..."
}
```

#### Supported File Types

- **Markdown (.md)**: Automatically parsed for frontmatter and body content
- **JSON (.json)**: Safely parsed JSON content
- **Recursive Search**: Searches all subdirectories under `/content`

#### Content Structure

```
/content/
├── blog/
│   ├── post-1.md
│   └── post-2.md
├── pages/
│   ├── about.md
│   └── contact.md
└── data/
    ├── config.json
    └── settings.json
```

#### Content Save API

```typescript
// Save markdown content
const markdownPayload = {
  type: 'md',
  path: 'content/blog/new-post.md',
  frontmatter: {
    title: 'My Blog Post',
    date: '2024-01-15',
    published: true
  },
  body: '# My Blog Post\n\nContent here...',
  sha: 'optional-for-updates'
};

const response = await fetch('/admin/api/content/save', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(markdownPayload)
});

// Save JSON content
const jsonPayload = {
  type: 'json',
  path: 'content/data/config.json',
  json: { site: { title: 'My Site' } },
  sha: 'optional-for-updates'
};

const response = await fetch('/admin/api/content/save', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(jsonPayload)
});

// Response format:
{
  "success": true,
  "commit": {
    "sha": "abc123...",
    "message": "chore(admin): update content/blog/new-post.md",
    "author": { "name": "Admin Bot", "email": "admin@local" },
    "date": "2024-01-15T10:30:00.000Z",
    "url": "https://github.com/owner/repo/commit/abc123..."
  },
  "path": "content/blog/new-post.md",
  "message": "Content saved successfully"
}
```

#### Content Delete API

```typescript
// Delete content file
const deletePayload = {
  path: 'content/blog/old-post.md',
  sha: 'required-sha-from-get-request'
};

const response = await fetch('/admin/api/content/delete', {
  method: 'DELETE',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(deletePayload)
});

// Response format:
{
  "success": true,
  "commit": {
    "sha": "def456...",
    "message": "chore(admin): delete content/blog/old-post.md",
    "author": { "name": "Admin Bot", "email": "admin@local" },
    "date": "2024-01-15T10:30:00.000Z",
    "url": "https://github.com/owner/repo/commit/def456..."
  },
  "path": "content/blog/old-post.md",
  "message": "Content deleted successfully"
}
```

#### Content Operations Features

- **Path Normalization**: All paths are automatically normalized under `/content/**`
- **Frontmatter Support**: Markdown files support YAML frontmatter with proper formatting
- **JSON Formatting**: JSON files are saved with 2-space indentation for readability
- **Version Control**: All operations include proper commit messages and SHA tracking
- **Authentication**: All operations require valid admin authentication
- **Error Handling**: Comprehensive error handling with proper HTTP status codes

## Content Management Pages

### Content List Page (`/admin/content`)

Features:
- **Content Table**: Displays all content files with type icons and metadata
- **Search**: Real-time search by filename
- **Type Filter**: Filter by Markdown or JSON content
- **Quick Actions**: Edit and Delete buttons for each content item
- **Stats Display**: Shows total files and filtered results count
- **Navigation**: Link to create new content

```typescript
// Content list displays files like:
{
  path: "/content/blog/my-post.md",
  type: "md",
  sha: "abc123..."
}

// With actions:
- Edit: Navigate to /admin/content/[slug]
- Delete: Confirm and delete with SHA
```

### New Content Page (`/admin/content/new`)

Features:
- **Tab Interface**: Switch between Markdown and JSON creation
- **Markdown Form**: 
  - Path (auto-generated from title)
  - Title, Date, Tags, Status, Cover Image
  - Content body with Markdown support
- **JSON Form**:
  - Path input
  - JSON content with real-time validation
  - Auto-formatting with proper indentation
- **Validation**: Client-side validation for all required fields
- **Auto-redirect**: After save, redirects to edit page or content list

```typescript
// Markdown form fields:
{
  path: "/content/blog/new-post.md",
  title: "My New Post",
  date: "2024-01-15",
  tags: "blog, tutorial",
  status: "draft",
  cover: "https://example.com/image.jpg",
  body: "# My Post\n\nContent here..."
}

// JSON form fields:
{
  path: "/content/data/config.json",
  content: '{"site": {"title": "My Site"}}'
}
```

### Edit Content Page (`/admin/content/[slug]`)

Features:
- **Dynamic Loading**: Loads content via API based on URL slug
- **Pre-populated Forms**: Forms filled with existing content data
- **Markdown Editing**:
  - Same form fields as new content
  - Publish/Unpublish toggle button
  - Auto-save status changes
- **JSON Editing**:
  - Pre-formatted JSON content
  - Real-time validation
- **Delete Control**: Delete button with confirmation
- **SHA Tracking**: Tracks SHA for proper updates

```typescript
// Edit page loads content like:
{
  type: "md",
  frontmatter: {
    title: "Existing Post",
    date: "2024-01-15",
    tags: ["blog"],
    status: "published"
  },
  body: "Existing content...",
  sha: "def456..."
}

// Update operations include SHA:
{
  type: "md",
  path: "/content/blog/existing-post.md",
  sha: "def456...", // Required for updates
  frontmatter: { /* updated data */ },
  body: "Updated content..."
}
```

### Content Pages Features

#### User Interface
- **Responsive Design**: Works on mobile, tablet, and desktop
- **Loading States**: Loading indicators during API calls
- **Error Handling**: Clear error messages and recovery options
- **Success Feedback**: Success messages for completed operations
- **Confirmation Dialogs**: Delete confirmation modals

#### Form Validation
- **Real-time Validation**: Immediate feedback on form errors
- **Required Fields**: Clear indication of required fields
- **Format Validation**: JSON syntax validation, date formats
- **Path Validation**: Ensures paths are under /content/ directory

#### Navigation & UX
- **Breadcrumb Navigation**: Clear navigation between pages
- **Auto-save**: Status changes auto-save without full form submission
- **Cancel Options**: Easy cancellation with confirmation
- **Keyboard Support**: Full keyboard navigation support

#### State Management
- **Loading States**: Proper loading indicators
- **Error States**: Error handling with retry options
- **Success States**: Success feedback and auto-redirect
- **Form State**: Proper form state management with validation

## Media Management

### Media Upload API

```typescript
// Upload multiple image files
const formData = new FormData();
files.forEach(file => {
  formData.append('files', file);
});

const response = await fetch('/admin/api/media/upload', {
  method: 'POST',
  body: formData,
});

// Response format:
{
  "success": true,
  "uploaded": [
    {
      "path": "public/images/2024/01/my-image-abc123.jpg",
      "originalName": "my-image.jpg",
      "size": 1024000,
      "mimeType": "image/jpeg",
      "url": "https://example.com/images/2024/01/my-image-abc123.jpg"
    }
  ],
  "errors": [],
  "message": "1 files uploaded successfully"
}
```

### Media List API

```typescript
// List media files with pagination
const response = await fetch('/admin/api/media/list?page=1&limit=20&recursive=true');
const data = await response.json();

// Response format:
{
  "files": [
    {
      "path": "public/images/2024/01/image1.jpg",
      "type": "file",
      "sha": "abc123...",
      "url": "https://example.com/images/2024/01/image1.jpg"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "pages": 8,
    "hasNext": true,
    "hasPrev": false
  }
}
```

### Media Delete API

```typescript
// Delete media file
const payload = {
  path: 'public/images/2024/01/old-image.jpg',
  sha: 'abc123...' // Required SHA from list/get operations
};

const response = await fetch('/admin/api/media/delete', {
  method: 'DELETE',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload)
});

// Response format:
{
  "success": true,
  "commit": {
    "sha": "def456...",
    "message": "chore(admin): delete public/images/2024/01/old-image.jpg",
    "author": { "name": "Admin Bot", "email": "admin@local" },
    "date": "2024-01-15T10:30:00.000Z",
    "url": "https://github.com/owner/repo/commit/def456..."
  },
  "path": "public/images/2024/01/old-image.jpg",
  "message": "Media file deleted successfully"
}
```

### Media Operations Features

- **File Validation**: Supports PNG, JPEG, WebP images up to 8MB
- **Path Generation**: Auto-generates organized paths: `/public/images/YYYY/MM/{slugified-name}-{nanoid}.{ext}`
- **Batch Upload**: Accepts multiple files in single request
- **Recursive Listing**: Can scan subdirectories with optional recursion
- **Pagination**: Built-in pagination for large media libraries
- **URL Generation**: Auto-generates public URLs for uploaded files
- **Version Control**: Full GitHub integration with commit tracking
- **Security**: Path validation ensures files stay within `/public/images/**`

## Media Management Page

### Media Library Page (`/admin/media`)

Features:
- **Drag & Drop Upload**: Visual drag and drop zone for multiple file uploads
- **File Validation**: Supports PNG, JPEG, WebP images up to 8MB
- **Grid/List Views**: Switch between grid and list view modes
- **Thumbnail Display**: Image thumbnails with fallback for non-images
- **Copy Path**: One-click copy file path to clipboard
- **Delete Control**: Delete media files with confirmation modal
- **Month Filter**: Filter media by month folder (YYYY-MM)
- **Stats Display**: Show total files and filtered count

```typescript
// Drag & Drop Upload
- Drag files over the upload zone
- Visual feedback with blue border and background
- Support for multiple file selection
- Real-time validation and progress

// Media Display
{
  path: "public/images/2024/01/image-abc123.jpg",
  type: "file",
  sha: "abc123...",
  url: "https://example.com/images/2024/01/image-abc123.jpg"
}

// Grid View Features
- Responsive grid (1-6 columns based on screen size)
- Square thumbnails with object-cover
- Hover shadow effects
- Copy Path and Delete buttons

// List View Features
- Horizontal layout with 64x64px thumbnails
- Filename and path display
- Action buttons on the right
- Consistent spacing
```

### Media Page Features

#### Upload Functionality
- **Drag & Drop Zone**: Visual upload area with hover states
- **File Selection**: Click to select files via file input
- **Multiple Files**: Upload multiple files simultaneously
- **Progress Tracking**: Upload progress indicators
- **Error Handling**: Clear error messages for failed uploads
- **Success Feedback**: Success messages with auto-hide

#### Media Display
- **View Modes**: Toggle between Grid and List views
- **Thumbnails**: Image thumbnails with error fallback
- **File Information**: Display filename and full path
- **Copy Path**: Copy file URL to clipboard with confirmation
- **Delete Action**: Delete with confirmation modal
- **Responsive Design**: Works on all device sizes

#### Filtering & Organization
- **Month Filter**: Filter by month folder (YYYY-MM format)
- **Stats Display**: Show total and filtered file counts
- **Clear Filter**: Easy way to clear month filter
- **Auto-sort**: Months sorted in descending order (newest first)

#### User Experience
- **Loading States**: Loading indicators during operations
- **Error Handling**: Clear error messages with retry options
- **Success Feedback**: Success messages with auto-hide
- **Confirmation Dialogs**: Delete confirmation modals
- **Keyboard Support**: Full keyboard navigation
- **Touch Support**: Touch-friendly on mobile devices

#### State Management
- **Media State**: Array of all media files
- **Filtered State**: Filtered media based on month selection
- **UI State**: View mode, drag active, delete confirmation
- **Upload State**: Upload progress and error tracking
- **Feedback State**: Success and error messages

#### API Integration
- **Load Media**: `GET /admin/api/media/list?recursive=true&limit=100`
- **Upload Media**: `POST /admin/api/media/upload` with FormData
- **Delete Media**: `DELETE /admin/api/media/delete` with path and SHA
- **Error Handling**: Handle 401, 404, 500 errors appropriately

#### Responsive Design
- **Mobile**: Single column grid, stacked list items
- **Tablet**: 2-3 column grid, horizontal list items
- **Desktop**: 4-6 column grid, full horizontal layout
- **Touch**: Touch-friendly button sizes and spacing

## Enhanced Dashboard

### Dashboard Page (`/admin`)

Features:
- **Real-time Stats**: Concurrent fetching of content and media statistics
- **Smart Analytics**: Draft vs published content analysis with sampling
- **Quick Actions**: Direct navigation to key admin functions
- **Recent Files**: Mix of recent content and media files
- **Toast Notifications**: Real-time feedback for user actions
- **Responsive Design**: Optimized for all device sizes

```typescript
// Dashboard Stats
{
  contentStats: {
    total: 25,
    markdown: 20,
    json: 5,
    draft: 8,
    published: 12
  },
  mediaStats: {
    total: 150,
    recent: 5
  },
  recentFiles: [
    {
      name: "blog-post.md",
      path: "/content/blog/blog-post.md",
      date: "2024-01-15",
      type: "content",
      subtype: "md"
    }
  ]
}

// Quick Actions
- New Post: Navigate to content creation
- Go to Media: Navigate to media library
- All Content: Navigate to content management
```

### Dashboard Features

#### Real-time Statistics
- **Concurrent Loading**: Fetch content and media lists simultaneously
- **Content Analytics**: 
  - Total content files (Markdown + JSON)
  - Draft vs Published estimation using frontmatter sampling
  - File type breakdown (MD/JSON counts)
- **Media Analytics**: Total media files count
- **Performance**: Fast loading with Promise.all concurrent fetching

#### Smart Content Analysis
- **Sampling Strategy**: Sample recent markdown files for status analysis
- **Frontmatter Parsing**: Extract status from frontmatter for sampled files
- **Ratio Scaling**: Scale up draft/published counts based on sample ratio
- **Fallback Logic**: 50/50 split estimation if sampling fails
- **Error Handling**: Graceful degradation when APIs fail

#### Quick Actions Panel
- **New Post**: Direct link to content creation with toast feedback
- **Go to Media**: Direct link to media library with toast feedback
- **All Content**: Direct link to content management
- **Visual Design**: Card-based layout with icons and descriptions
- **Hover Effects**: Smooth transitions and visual feedback

#### Recent Files Display
- **Mixed Content**: Shows both recent content and media files
- **Type Classification**: Clear distinction between content and media
- **Subtype Display**: Shows file type (md/json/image)
- **Quick Edit**: Direct links to edit content files
- **Responsive Layout**: Adapts to screen size

#### Toast Notification System
- **Multiple Types**: Success, error, and info notifications
- **Auto-hide**: Configurable auto-hide duration (default 3 seconds)
- **Manual Dismiss**: Close button for manual dismissal
- **Positioning**: Fixed top-right corner with stacking
- **Visual Design**: Color-coded borders and icons

#### Responsive Design
- **Stats Grid**: 1-4 columns based on screen size
- **Quick Actions**: Responsive grid with proper spacing
- **Recent Files**: Adaptive list layout
- **Toast Positioning**: Responsive toast sizing and positioning
- **Mobile Optimization**: Touch-friendly interface elements

#### State Management
- **Loading States**: Loading indicators during data fetch
- **Error Handling**: Graceful error handling with user feedback
- **Toast Management**: Dynamic toast array with unique IDs
- **Session Management**: Authentication state handling
- **Data Caching**: Efficient data processing and display

#### Performance Optimization
- **Concurrent API Calls**: Promise.all for parallel data fetching
- **Limited Sampling**: Only fetch frontmatter for recent files
- **Efficient Processing**: Minimal data processing overhead
- **Error Boundaries**: Graceful error handling and recovery
- **Optimistic UI**: Show loading states and fallback data

#### User Experience
- **Fast Loading**: Concurrent data fetching for quick stats
- **Visual Feedback**: Toast notifications for all actions
- **Intuitive Navigation**: Clear quick action buttons
- **Recent Activity**: Easy access to recently modified files
- **System Status**: Authentication and session status display

## Troubleshooting

### Common Issues

1. **Login Not Working**: Check environment variables and JWT secret
2. **File Upload Fails**: Verify file size limits and allowed types
3. **Content Not Saving**: Check file permissions on content directory
4. **Media Not Loading**: Verify images directory path and permissions

### Debug Mode

Enable debug logging by setting `NODE_ENV=development` in your environment variables.

## Contributing

1. Follow TypeScript strict mode guidelines
2. Use Tailwind CSS for styling
3. Ensure all API routes have proper error handling
4. Add appropriate authentication checks
5. Test all functionality before deployment

## License

This admin panel is part of the Green Blue Rest Bangkok project.
