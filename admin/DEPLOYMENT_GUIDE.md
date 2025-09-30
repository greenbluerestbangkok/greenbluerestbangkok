# Admin Panel Deployment Guide

This guide covers deployment options for the Green Blue Rest Bangkok Admin Panel.

## Deployment Options

### 1. GitHub Pages with Actions

#### Setup Steps

1. **Create GitHub Actions Workflow** (`.github/workflows/deploy.yml`):
   ```yaml
   name: Deploy Admin Panel to GitHub Pages
   
   on:
     push:
       branches: [ main ]
     pull_request:
       branches: [ main ]
   
   permissions:
     contents: read
     pages: write
     id-token: write
   
   concurrency:
     group: "pages"
     cancel-in-progress: false
   
   jobs:
     build:
       runs-on: ubuntu-latest
       steps:
         - name: Checkout
           uses: actions/checkout@v4
           
         - name: Setup Node.js
           uses: actions/setup-node@v4
           with:
             node-version: '18'
             cache: 'npm'
             cache-dependency-path: admin/package-lock.json
           
         - name: Install dependencies
           run: |
             cd admin
             npm ci
           
         - name: Build admin panel
           run: |
             cd admin
             npm run build
           env:
             GITHUB_OWNER: ${{ secrets.GITHUB_OWNER }}
             GITHUB_REPO: ${{ secrets.GITHUB_REPO }}
             GITHUB_BRANCH: main
             GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
             ADMIN_EMAIL: ${{ secrets.ADMIN_EMAIL }}
             ADMIN_PASSWORD_HASH: ${{ secrets.ADMIN_PASSWORD_HASH }}
             JWT_SECRET: ${{ secrets.JWT_SECRET }}
             BASE_URL: ${{ secrets.BASE_URL }}
             MAX_FILE_SIZE: 8388608
             ALLOWED_FILE_TYPES: image/jpeg,image/png,image/webp,image/gif
           
         - name: Setup Pages
           uses: actions/configure-pages@v4
           
         - name: Upload artifact
           uses: actions/upload-pages-artifact@v3
           with:
             path: admin/out
   
     deploy:
       environment:
         name: github-pages
         url: ${{ steps.deployment.outputs.page_url }}
       runs-on: ubuntu-latest
       needs: build
       steps:
         - name: Deploy to GitHub Pages
           id: deployment
           uses: actions/deploy-pages@v4
   ```

2. **Configure Repository Secrets**:
   Go to Settings → Secrets and variables → Actions, add:
   - `GITHUB_OWNER`: Your GitHub username
   - `GITHUB_REPO`: Repository name
   - `GITHUB_TOKEN`: Personal access token with repo permissions
   - `ADMIN_EMAIL`: Admin email address
   - `ADMIN_PASSWORD_HASH`: Bcrypt hash of admin password
   - `JWT_SECRET`: Random JWT secret string
   - `BASE_URL`: Your GitHub Pages URL (e.g., `https://username.github.io/repo-name`)

3. **Enable GitHub Pages**:
   - Go to Settings → Pages
   - Source: "GitHub Actions"
   - The workflow will automatically deploy on push to main branch

#### Verification
- Commits to `main` branch trigger automatic deployment
- Check Actions tab for deployment status
- Verify admin panel accessible at your GitHub Pages URL

### 2. Vercel Deployment

#### Setup Steps

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Configure Vercel**:
   ```bash
   cd admin
   vercel
   ```

3. **Set Environment Variables** in Vercel Dashboard:
   - Go to Project Settings → Environment Variables
   - Add all variables from `.env.local`:
     ```
     GITHUB_OWNER=your-github-username
     GITHUB_REPO=your-repo-name
     GITHUB_BRANCH=main
     GITHUB_TOKEN=your-github-token
     ADMIN_EMAIL=admin@yourdomain.com
     ADMIN_PASSWORD_HASH=your-bcrypt-hash
     JWT_SECRET=your-jwt-secret
     BASE_URL=https://your-vercel-domain.vercel.app
     MAX_FILE_SIZE=8388608
     ALLOWED_FILE_TYPES=image/jpeg,image/png,image/webp,image/gif
     ```

4. **Configure Build Settings**:
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `out`
   - Install Command: `npm install`

5. **Deploy**:
   ```bash
   vercel --prod
   ```

#### Auto-Deployment
- Vercel automatically deploys on push to connected branch
- Pull requests create preview deployments
- Configure branch protection rules for production

### 3. Cloudflare Pages

#### Setup Steps

1. **Connect Repository**:
   - Go to Cloudflare Dashboard → Pages
   - Click "Create a project"
   - Connect your GitHub repository

2. **Configure Build Settings**:
   - Framework preset: Next.js
   - Build command: `cd admin && npm run build`
   - Build output directory: `admin/out`
   - Root directory: `/`

3. **Set Environment Variables**:
   - Go to Settings → Environment Variables
   - Add all required variables:
     ```
     GITHUB_OWNER=your-github-username
     GITHUB_REPO=your-repo-name
     GITHUB_BRANCH=main
     GITHUB_TOKEN=your-github-token
     ADMIN_EMAIL=admin@yourdomain.com
     ADMIN_PASSWORD_HASH=your-bcrypt-hash
     JWT_SECRET=your-jwt-secret
     BASE_URL=https://your-project.pages.dev
     MAX_FILE_SIZE=8388608
     ALLOWED_FILE_TYPES=image/jpeg,image/png,image/webp,image/gif
     ```

4. **Deploy**:
   - Click "Save and Deploy"
   - Cloudflare will build and deploy your admin panel

#### Auto-Deployment
- Cloudflare Pages automatically deploys on push to connected branch
- Preview deployments for pull requests
- Custom domains can be configured

### 4. Netlify Deployment

#### Setup Steps

1. **Connect Repository**:
   - Go to Netlify Dashboard
   - Click "New site from Git"
   - Connect your GitHub repository

2. **Configure Build Settings**:
   - Base directory: `admin`
   - Build command: `npm run build`
   - Publish directory: `out`

3. **Set Environment Variables**:
   - Go to Site settings → Environment variables
   - Add all required variables (same as other platforms)

4. **Deploy**:
   - Click "Deploy site"
   - Netlify will build and deploy your admin panel

## Environment Variables Reference

### Required Variables
```env
# GitHub Configuration
GITHUB_OWNER=your-github-username
GITHUB_REPO=your-repo-name
GITHUB_BRANCH=main
GITHUB_TOKEN=your-github-token

# Admin Authentication
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_PASSWORD_HASH=your-bcrypt-hash
JWT_SECRET=your-jwt-secret

# Application Configuration
BASE_URL=https://your-domain.com
```

### Optional Variables
```env
# File Upload Limits
MAX_FILE_SIZE=8388608
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/webp,image/gif

# Content Directories
CONTENT_DIR=../pages
IMAGES_DIR=../images
DATA_DIR=../js
```

## Security Considerations

### Production Security
1. **Use Strong Passwords**: Generate strong admin passwords
2. **Secure JWT Secret**: Use a cryptographically secure random string
3. **HTTPS Only**: Ensure all deployments use HTTPS
4. **Environment Variables**: Never commit secrets to version control
5. **GitHub Token**: Use tokens with minimal required permissions

### GitHub Token Permissions
Required scopes for GitHub token:
- `repo` (Full control of private repositories)
- `contents` (Read/write access to repository contents)

### Domain Security
1. **Custom Domains**: Use custom domains for production
2. **SSL Certificates**: Ensure SSL certificates are valid
3. **Security Headers**: Configure appropriate security headers

## Monitoring and Maintenance

### Health Checks
1. **Admin Panel Accessibility**: Regular checks for admin panel availability
2. **GitHub API Status**: Monitor GitHub API rate limits and status
3. **Deployment Status**: Monitor deployment pipeline health

### Logging
1. **Error Logging**: Monitor application errors and exceptions
2. **Access Logs**: Track admin panel usage and access patterns
3. **Performance Metrics**: Monitor response times and resource usage

### Backup Strategy
1. **Repository Backup**: Regular repository backups
2. **Environment Variables**: Secure backup of environment variables
3. **Content Backup**: Regular content and media backups

## Troubleshooting Deployment

### Common Issues

#### Build Failures
- **Missing Dependencies**: Ensure all dependencies are in package.json
- **Environment Variables**: Verify all required variables are set
- **Build Command**: Check build command matches framework requirements

#### Runtime Errors
- **Authentication Issues**: Verify JWT_SECRET and password hash
- **GitHub API Errors**: Check token permissions and rate limits
- **File Upload Issues**: Verify file size and type limits

#### Deployment Issues
- **Platform-Specific**: Check platform-specific deployment documentation
- **Environment Variables**: Ensure variables are set in deployment platform
- **Build Output**: Verify build output directory is correct

### Debug Mode
Enable debug logging in production:
```env
NODE_ENV=production
DEBUG=admin:*
```

### Support Resources
1. **Platform Documentation**: GitHub Actions, Vercel, Cloudflare Pages docs
2. **Next.js Deployment**: Next.js deployment documentation
3. **Community Forums**: Platform-specific community support

## Performance Optimization

### Build Optimization
1. **Static Export**: Use Next.js static export for better performance
2. **Image Optimization**: Optimize images before upload
3. **Bundle Analysis**: Analyze bundle size and optimize dependencies

### Runtime Optimization
1. **Caching**: Implement appropriate caching strategies
2. **CDN**: Use CDN for static assets
3. **Compression**: Enable gzip/brotli compression

### Monitoring
1. **Performance Metrics**: Monitor Core Web Vitals
2. **Error Tracking**: Implement error tracking (Sentry, LogRocket)
3. **Analytics**: Track usage patterns and performance

## Rollback Strategy

### Emergency Rollback
1. **Previous Deployment**: Revert to previous stable deployment
2. **Database Rollback**: If applicable, rollback database changes
3. **Content Recovery**: Restore content from backups

### Planned Rollback
1. **Feature Flags**: Use feature flags for gradual rollouts
2. **Blue-Green Deployment**: Maintain parallel environments
3. **Canary Releases**: Gradual rollout to subset of users

## Maintenance Schedule

### Regular Tasks
- **Weekly**: Check deployment status and error logs
- **Monthly**: Review and rotate secrets/tokens
- **Quarterly**: Update dependencies and security patches

### Emergency Procedures
- **Security Incident**: Immediate token rotation and access review
- **Service Outage**: Emergency deployment and communication
- **Data Loss**: Backup restoration and incident analysis
