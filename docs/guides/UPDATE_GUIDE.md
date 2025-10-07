# 🚀 Complete Update System Guide
## Green Blue Rest Bangkok Website

This guide provides the **exact commands** to run your complete update system with auto-commit, push, cache-busting, status checks, and auto-deployment.

---

## ⚡ Quick Start Commands

### 1. **Standard Update and Deploy** (Recommended)
```bash
./scripts/update-and-deploy.sh
```
This command will:
- ✅ Auto-commit any changes with descriptive messages
- ✅ Push to GitHub with conflict resolution
- ✅ Trigger GitHub Actions deployment with cache-busting
- ✅ Monitor deployment status
- ✅ Verify site accessibility

### 2. **Quick Update** (Faster, minimal checks)
```bash
./scripts/update-and-deploy.sh --quick
```

### 3. **Force Commit and Deploy** (Even with no changes)
```bash
./scripts/update-and-deploy.sh --force-commit
```

### 4. **Clear Cache and Deploy** (For cache issues)
```bash
./scripts/update-and-deploy.sh --clear-cache
```

---

## 🔧 Individual Component Commands

### Auto-Commit Current Changes
```bash
./scripts/auto-commit.sh
```

### Check Deployment Status
```bash
./scripts/status-check.sh
```

### Quick Status Check
```bash
./scripts/status-check.sh --quick
```

### Wait for Deployment to Complete
```bash
./scripts/status-check.sh --wait
```

---

## 📋 Manual Step-by-Step Process

If you prefer to run each step manually:

### Step 1: Commit Changes
```bash
git add .
git commit -m "🔧 Manual update: $(date)"
```

### Step 2: Push to GitHub
```bash
git push origin main
```

### Step 3: Trigger Manual Deployment (with GitHub CLI)
```bash
gh workflow run auto-update.yml
```

### Step 4: Check Status
```bash
gh run list --workflow=auto-update.yml --limit=3
```

---

## 🎯 Advanced Usage

### Combine Multiple Options
```bash
./scripts/update-and-deploy.sh --force-commit --clear-cache --quick
```

### Check All Available Options
```bash
./scripts/update-and-deploy.sh --help
```

### Monitor Live Deployment
```bash
# Terminal 1: Start deployment
./scripts/update-and-deploy.sh

# Terminal 2: Monitor in real-time
watch -n 10 './scripts/status-check.sh --quick'
```

---

## 🌐 URLs and Links

- **Live Website**: https://nattagid.github.io/greenbluerestbangkok
- **GitHub Actions**: https://github.com/nattagid/greenbluerestbangkok/actions
- **Repository**: https://github.com/nattagid/greenbluerestbangkok

---

## 🔄 Cache Management

### Clear Browser Cache (JavaScript Console)
```javascript
// Run in browser console
window.clearSiteCache();     // Clear all site cache
window.checkForUpdates();    // Force check for updates
window.hardReload();         // Reload without cache
```

### Verify Cache Busting is Working
```bash
# Check if cache parameters are applied
curl -I "https://nattagid.github.io/greenbluerestbangkok/css/style.css" | grep -i cache
```

---

## 🚨 Troubleshooting Commands

### If Git Push Fails
```bash
git pull --rebase origin main
git push origin main
```

### If Deployment Fails
```bash
# Check workflow logs
gh run list --workflow=auto-update.yml
gh run view [RUN_ID] --log

# Re-trigger deployment
gh workflow run auto-update.yml --field force_rebuild=true
```

### If Site Not Updating
```bash
# Force cache clear and deploy
./scripts/update-and-deploy.sh --clear-cache --force-commit
```

### Check File Permissions
```bash
# Make all scripts executable
chmod +x scripts/*.sh
```

---

## 🔧 System Requirements

### Required Tools
- **Git**: For version control
- **Bash**: For running scripts (pre-installed on macOS/Linux)

### Optional Tools (Enhanced Features)
- **GitHub CLI** (`gh`): For advanced GitHub Actions control
  ```bash
  # Install on macOS
  brew install gh
  
  # Authenticate
  gh auth login
  ```

- **jq**: For JSON processing in status scripts
  ```bash
  # Install on macOS
  brew install jq
  ```

---

## 📊 Understanding the Process

### What Happens During Update
1. **Pre-flight Checks**: Validates git repo and prerequisites
2. **Auto-Commit**: Intelligently commits changes with descriptive messages
3. **Push with Conflict Resolution**: Handles merge conflicts automatically
4. **Deployment Trigger**: Starts GitHub Actions workflow
5. **Cache Busting**: Adds timestamps to CSS/JS files
6. **Status Monitoring**: Tracks deployment progress
7. **Site Validation**: Verifies site accessibility

### Generated Files During Process
- `build-info.json`: Build metadata and timestamps
- `deployment-manifest.json`: File counts and deployment info
- `deployment-report.md`: Detailed deployment report

---

## 🎉 Success Indicators

After running the update commands, you should see:
- ✅ Green checkmarks for each completed step
- 🌐 Site URL confirmation
- 📊 Build statistics
- ⏰ Completion timestamp

The website should be updated within **1-2 minutes** of successful deployment.

---

## 💡 Pro Tips

1. **Use Quick Mode for Frequent Updates**:
   ```bash
   ./scripts/update-and-deploy.sh --quick
   ```

2. **Monitor Deployments**:
   ```bash
   # Set up an alias for easy status checking
   alias deploy-status='./scripts/status-check.sh --quick'
   ```

3. **Automated Daily Updates**:
   The system includes a scheduled workflow that runs daily at midnight UTC to refresh caches.

4. **Emergency Reset**:
   ```bash
   # If everything breaks, start fresh
   git reset --hard origin/main
   ./scripts/update-and-deploy.sh --clear-cache --force-commit
   ```

---

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review GitHub Actions logs: https://github.com/nattagid/greenbluerestbangkok/actions
3. Verify all scripts have execute permissions: `chmod +x scripts/*.sh`

---

**🚀 Ready to deploy? Run this command to get started:**

```bash
./scripts/update-and-deploy.sh
```