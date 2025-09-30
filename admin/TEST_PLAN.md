# Admin Panel Test Plan

This document outlines comprehensive testing procedures for the Green Blue Rest Bangkok Admin Panel.

## Test Environment Setup

### Prerequisites
- Admin panel running locally (`npm run dev`)
- Valid GitHub token with repository access
- Test content and media files
- Access to GitHub repository to verify commits

### Test Data
- Test admin credentials
- Sample markdown content
- Sample JSON content
- Test images (PNG, WebP formats)
- Sample frontmatter data

## Authentication Tests

### Test 1: Login Success
**Objective**: Verify successful authentication with valid credentials

**Steps**:
1. Navigate to `/admin/login`
2. Enter valid `ADMIN_EMAIL`
3. Enter valid password
4. Click "Sign in"

**Expected Results**:
- ✅ Redirect to dashboard (`/admin`)
- ✅ Session cookie set with HttpOnly flag
- ✅ Dashboard displays user email
- ✅ No error messages

### Test 2: Login Failure - Invalid Email
**Objective**: Verify authentication failure with invalid email

**Steps**:
1. Navigate to `/admin/login`
2. Enter invalid email
3. Enter valid password
4. Click "Sign in"

**Expected Results**:
- ❌ Error message: "Invalid credentials"
- ❌ No redirect to dashboard
- ❌ No session cookie set

### Test 3: Login Failure - Invalid Password
**Objective**: Verify authentication failure with invalid password

**Steps**:
1. Navigate to `/admin/login`
2. Enter valid email
3. Enter invalid password
4. Click "Sign in"

**Expected Results**:
- ❌ Error message: "Invalid credentials"
- ❌ No redirect to dashboard
- ❌ No session cookie set

### Test 4: Session Validation
**Objective**: Verify session validation on protected routes

**Steps**:
1. Access `/admin` without authentication
2. Verify redirect to login page

**Expected Results**:
- ✅ Redirect to `/admin/login`
- ❌ No access to protected content

## Content Management Tests

### Test 5: Create New Markdown Content (Draft)
**Objective**: Create new markdown content with draft status

**Steps**:
1. Navigate to `/admin/content/new`
2. Ensure "Markdown" tab is selected
3. Fill in:
   - Path: `/content/test/draft-post.md`
   - Title: "Test Draft Post"
   - Date: Current date
   - Tags: "test, draft"
   - Status: "Draft"
   - Body: "# Test Draft Post\n\nThis is a test draft post."
4. Click "Save Content"

**Expected Results**:
- ✅ Success message: "Content saved successfully!"
- ✅ Redirect to edit page
- ✅ GitHub commit created with message: `chore(admin): update /content/test/draft-post.md`
- ✅ File exists in GitHub repository
- ✅ Frontmatter contains correct data

### Test 6: Publish Draft Content
**Objective**: Change draft content to published status

**Steps**:
1. Navigate to existing draft content
2. Click "Publish" button
3. Verify status change

**Expected Results**:
- ✅ Success message: "Content published successfully!"
- ✅ Status changes to "Published"
- ✅ GitHub commit created with updated frontmatter
- ✅ Auto-save functionality works

### Test 7: Edit Markdown Content
**Objective**: Edit existing markdown content

**Steps**:
1. Navigate to existing markdown content
2. Edit frontmatter:
   - Change title to "Updated Test Post"
   - Add new tag: "updated"
3. Edit body content
4. Click "Save Changes"

**Expected Results**:
- ✅ Success message: "Content saved successfully!"
- ✅ GitHub commit created with changes
- ✅ Content updated in repository
- ✅ SHA tracking works correctly

### Test 8: Create New JSON Content
**Objective**: Create new JSON content file

**Steps**:
1. Navigate to `/admin/content/new`
2. Click "JSON" tab
3. Fill in:
   - Path: `/content/data/test-config.json`
   - JSON Content:
     ```json
     {
       "site": {
         "title": "Test Site",
         "description": "Test configuration"
       },
       "features": {
         "blog": true,
         "comments": false
       }
     }
     ```
4. Click "Save Content"

**Expected Results**:
- ✅ Success message: "Content saved successfully!"
- ✅ Redirect to content list
- ✅ GitHub commit created
- ✅ JSON file created in repository
- ✅ Valid JSON format preserved

### Test 9: Edit JSON Content
**Objective**: Edit existing JSON content

**Steps**:
1. Navigate to existing JSON content
2. Modify JSON structure
3. Click "Save Changes"

**Expected Results**:
- ✅ Success message: "Content saved successfully!"
- ✅ GitHub commit created
- ✅ JSON updated in repository
- ✅ Validation prevents invalid JSON

### Test 10: Delete Content File
**Objective**: Delete existing content file

**Steps**:
1. Navigate to content list
2. Find test content file
3. Click "Delete" button
4. Confirm deletion in modal

**Expected Results**:
- ✅ Success message: "Content deleted successfully!"
- ✅ GitHub commit created with message: `chore(admin): delete /content/test/file.md`
- ✅ File removed from repository
- ✅ File no longer appears in content list

## Media Management Tests

### Test 11: Upload PNG Image
**Objective**: Upload PNG image file

**Steps**:
1. Navigate to `/admin/media`
2. Drag and drop PNG image file
3. Verify upload process

**Expected Results**:
- ✅ Upload success message
- ✅ Image appears in media grid
- ✅ GitHub commit created with message: `chore(admin): upload /public/images/YYYY/MM/filename-nanoid.png`
- ✅ File organized in year/month folder structure
- ✅ Public URL generated correctly

### Test 12: Upload WebP Image
**Objective**: Upload WebP image file

**Steps**:
1. Navigate to `/admin/media`
2. Use file input to select WebP image
3. Verify upload process

**Expected Results**:
- ✅ Upload success message
- ✅ Image appears in media grid
- ✅ GitHub commit created
- ✅ WebP format preserved
- ✅ Thumbnail displays correctly

### Test 13: Copy Image Path
**Objective**: Copy image path to clipboard

**Steps**:
1. Find uploaded image in media grid
2. Click "Copy Path" button
3. Verify clipboard content

**Expected Results**:
- ✅ Success message: "Path copied to clipboard!"
- ✅ Correct path copied (e.g., `/images/2024/01/image-abc123.png`)
- ✅ Path is publicly accessible

### Test 14: Delete Media File
**Objective**: Delete uploaded media file

**Steps**:
1. Find uploaded image in media grid
2. Click "Delete" button
3. Confirm deletion in modal

**Expected Results**:
- ✅ Success message: "Media deleted successfully!"
- ✅ GitHub commit created with message: `chore(admin): delete /public/images/YYYY/MM/filename.png`
- ✅ File removed from repository
- ✅ File no longer appears in media grid

### Test 15: Media Filter by Month
**Objective**: Filter media files by month

**Steps**:
1. Navigate to `/admin/media`
2. Select month from filter dropdown
3. Verify filtered results

**Expected Results**:
- ✅ Only files from selected month displayed
- ✅ Filter shows correct file count
- ✅ Clear filter option works

## Dashboard Tests

### Test 16: Dashboard Statistics
**Objective**: Verify dashboard displays correct statistics

**Steps**:
1. Navigate to `/admin` (dashboard)
2. Wait for stats to load
3. Verify displayed numbers

**Expected Results**:
- ✅ Draft count matches actual draft content
- ✅ Published count matches actual published content
- ✅ Total content count correct
- ✅ Media file count correct
- ✅ Recent files displayed

### Test 17: Quick Actions
**Objective**: Verify quick action buttons work

**Steps**:
1. Click "New Post" button
2. Click "Go to Media" button
3. Click "All Content" button

**Expected Results**:
- ✅ "New Post" navigates to `/admin/content/new`
- ✅ "Go to Media" navigates to `/admin/media`
- ✅ "All Content" navigates to `/admin/content`
- ✅ Toast notifications appear for actions

## Security Tests

### Test 18: Path Traversal Prevention
**Objective**: Verify path traversal attacks are prevented

**Steps**:
1. Try to create content with path: `../../../etc/passwd`
2. Try to upload file with path: `../../../../sensitive-file.jpg`

**Expected Results**:
- ❌ Path normalization prevents traversal
- ❌ Content restricted to `/content/**`
- ❌ Media restricted to `/public/images/**`
- ❌ Error messages for invalid paths

### Test 19: File Size Limits
**Objective**: Verify file size limits are enforced

**Steps**:
1. Try to upload file larger than 8MB
2. Verify error handling

**Expected Results**:
- ❌ Upload rejected for oversized files
- ❌ Clear error message: "File size exceeds 8MB limit"
- ❌ No partial uploads or corruption

### Test 20: File Type Validation
**Objective**: Verify only allowed file types are accepted

**Steps**:
1. Try to upload non-image files (e.g., .txt, .exe)
2. Try to upload unsupported image formats

**Expected Results**:
- ❌ Upload rejected for unsupported types
- ❌ Error message: "Invalid file type. Only PNG, JPEG, and WebP images are allowed."
- ❌ No security vulnerabilities

## Site Integration Tests

### Test 21: GitHub Commit Verification
**Objective**: Verify all admin actions create proper GitHub commits

**Steps**:
1. Perform various admin actions (create, edit, delete)
2. Check GitHub repository for commits
3. Verify commit messages and author

**Expected Results**:
- ✅ All actions create commits
- ✅ Commit author: "Admin Bot" <admin@local>
- ✅ Commit messages follow format: `chore(admin): <action> <path>`
- ✅ Commits contain correct file changes

### Test 22: Site Rebuild Trigger
**Objective**: Verify site rebuilds after admin changes

**Steps**:
1. Make content changes via admin panel
2. Check CI/CD pipeline status
3. Verify changes appear on live site

**Expected Results**:
- ✅ CI/CD pipeline triggers on commits
- ✅ Site rebuilds successfully
- ✅ Changes visible on live site
- ✅ No build errors or failures

## Error Handling Tests

### Test 23: Network Error Handling
**Objective**: Verify graceful handling of network errors

**Steps**:
1. Disconnect internet connection
2. Try to save content or upload media
3. Verify error handling

**Expected Results**:
- ❌ Clear error messages for network failures
- ❌ No application crashes
- ❌ Retry options available where appropriate

### Test 24: GitHub API Rate Limiting
**Objective**: Verify handling of GitHub API rate limits

**Steps**:
1. Perform many rapid admin actions
2. Trigger rate limiting
3. Verify error handling

**Expected Results**:
- ❌ Graceful handling of rate limit errors
- ❌ Clear error messages
- ❌ No application crashes

## Performance Tests

### Test 25: Large File Handling
**Objective**: Verify performance with large files

**Steps**:
1. Upload multiple large images (close to 8MB limit)
2. Monitor upload performance
3. Verify successful uploads

**Expected Results**:
- ✅ Uploads complete within reasonable time
- ✅ No memory leaks or performance issues
- ✅ Progress indicators work correctly

### Test 26: Concurrent Operations
**Objective**: Verify handling of concurrent admin operations

**Steps**:
1. Open multiple admin panel tabs
2. Perform operations simultaneously
3. Verify consistency

**Expected Results**:
- ✅ No race conditions
- ✅ All operations complete successfully
- ✅ Data consistency maintained

## Test Results Summary

| Test ID | Test Name | Status | Notes |
|---------|-----------|--------|-------|
| 1 | Login Success | ⏳ | |
| 2 | Login Failure - Invalid Email | ⏳ | |
| 3 | Login Failure - Invalid Password | ⏳ | |
| 4 | Session Validation | ⏳ | |
| 5 | Create New Markdown (Draft) | ⏳ | |
| 6 | Publish Draft Content | ⏳ | |
| 7 | Edit Markdown Content | ⏳ | |
| 8 | Create New JSON Content | ⏳ | |
| 9 | Edit JSON Content | ⏳ | |
| 10 | Delete Content File | ⏳ | |
| 11 | Upload PNG Image | ⏳ | |
| 12 | Upload WebP Image | ⏳ | |
| 13 | Copy Image Path | ⏳ | |
| 14 | Delete Media File | ⏳ | |
| 15 | Media Filter by Month | ⏳ | |
| 16 | Dashboard Statistics | ⏳ | |
| 17 | Quick Actions | ⏳ | |
| 18 | Path Traversal Prevention | ⏳ | |
| 19 | File Size Limits | ⏳ | |
| 20 | File Type Validation | ⏳ | |
| 21 | GitHub Commit Verification | ⏳ | |
| 22 | Site Rebuild Trigger | ⏳ | |
| 23 | Network Error Handling | ⏳ | |
| 24 | GitHub API Rate Limiting | ⏳ | |
| 25 | Large File Handling | ⏳ | |
| 26 | Concurrent Operations | ⏳ | |

## Test Execution Notes

- Run tests in order for best results
- Clean up test data after each test
- Document any issues or unexpected behaviors
- Update test results table as tests are completed
- Report critical issues immediately

## Test Environment Cleanup

After testing completion:
1. Remove all test content files
2. Remove all test media files
3. Clean up GitHub repository commits if needed
4. Reset admin panel to clean state
