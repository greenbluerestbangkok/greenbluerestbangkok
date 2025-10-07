# 🌐 Frontend Deployment Guide

**Project:** Green Blue Rest Bangkok - Frontend  
**Type:** Static HTML/CSS/JavaScript  
**Date:** 7 ตุลาคม 2025  
**Status:** ✅ Ready to Deploy

---

## 📊 What We're Deploying

### **Frontend (Static Site):**
- **Location:** `src/` folder
- **Tech:** HTML5, CSS3, JavaScript ES6+
- **Features:** 
  - Responsive design
  - Supabase integration
  - Image galleries
  - Blog system
  - Product catalog
  - Trip listings

---

## 🚀 Deployment Options

### **Option 1: Vercel** (Recommended - Easiest)
- ✅ Free tier available
- ✅ Auto SSL
- ✅ Global CDN
- ✅ Easy custom domain
- ✅ Continuous deployment

### **Option 2: GitHub Pages**
- ✅ Free
- ✅ Auto SSL
- ✅ GitHub integration
- ⚠️ Limited to public repos

### **Option 3: Netlify**
- ✅ Free tier
- ✅ Auto SSL
- ✅ Form handling
- ✅ Serverless functions

---

## 🎯 Deploy to Vercel (Recommended)

### **Method A: Vercel CLI** (Fastest)

```bash
# 1. Navigate to src folder
cd /Users/nattagid/GitHub/greenbluerestbangkok/src

# 2. Login to Vercel (if not already)
vercel login

# 3. Deploy to preview
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? [your-account]
# - Link to existing project? No
# - Project name? greenbluerest-frontend
# - Directory? ./ (current)
# - Override settings? No

# 4. Deploy to production
vercel --prod
```

### **Method B: Vercel Dashboard** (Easiest)

1. **Go to:** https://vercel.com/new
2. **Import Git Repository**
3. **Select:** `greenbluerestbangkok` repository
4. **Configure:**
   - Framework Preset: Other
   - Root Directory: `src`
   - Build Command: (leave empty)
   - Output Directory: (leave empty or `.`)
5. **No environment variables needed** (frontend is static)
6. **Click:** Deploy

---

## 🎯 Deploy to GitHub Pages

### **Option A: Using gh-pages branch**

```bash
# 1. From project root
cd /Users/nattagid/GitHub/greenbluerestbangkok

# 2. Push src/ to gh-pages branch
git subtree push --prefix src origin gh-pages

# 3. Enable GitHub Pages
# Go to: GitHub → Settings → Pages
# Source: gh-pages branch
# Directory: / (root)
```

### **Option B: Using GitHub Actions**

```yaml
# Create .github/workflows/deploy.yml
name: Deploy Frontend

on:
  push:
    branches: [ main ]
    paths:
      - 'src/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./src
```

---

## 📋 Pre-Deployment Checklist

### **Frontend Files:**
- [x] ✅ All HTML files in src/
- [x] ✅ CSS organized in src/css/
- [x] ✅ JavaScript in src/js/
- [x] ✅ Images in src/images/
- [x] ✅ Paths are relative
- [x] ✅ vercel.json created
- [x] ✅ .vercelignore created

### **Content:**
- [x] ✅ All pages working
- [x] ✅ Links working
- [x] ✅ Images loading
- [x] ✅ Supabase integration active
- [x] ✅ JavaScript functioning

### **Performance:**
- [x] ✅ Images optimized (WebP)
- [x] ✅ CSS organized
- [x] ✅ Caching headers configured
- [x] ✅ Clean URLs enabled

---

## 🔧 Configuration Files

### **vercel.json** (Already created)
```json
{
  "cleanUrls": true,
  "trailingSlash": false,
  "headers": [
    {
      "source": "/images/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### **.vercelignore** (Already created)
```
node_modules
.DS_Store
*.log
.env*
```

---

## 🌐 Custom Domain Setup

### **After Deployment:**

#### **For Vercel:**
1. Go to Project Settings → Domains
2. Add domain: `greenbluerestbangkok.com`
3. Update DNS records:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

#### **For GitHub Pages:**
1. Add CNAME file in src/:
   ```
   greenbluerestbangkok.com
   ```
2. Update DNS:
   ```
   Type: A
   Name: @
   Value: 185.199.108.153
   ```

---

## 🧪 Testing After Deployment

### **Test Checklist:**

```bash
# Visit your deployed URL
https://greenbluerest-frontend.vercel.app

# Or custom domain
https://greenbluerestbangkok.com
```

**Pages to test:**
- [ ] ✅ Homepage (index.html)
- [ ] ✅ Trips page (pages/trips.html)
- [ ] ✅ Products page (pages/products.html)
- [ ] ✅ Activities page (pages/activities.html)
- [ ] ✅ Blog pages (pages/blog/*.html)
- [ ] ✅ Contact page (pages/contact.html)

**Features to test:**
- [ ] ✅ Navigation works
- [ ] ✅ Images load
- [ ] ✅ CSS applies
- [ ] ✅ JavaScript works
- [ ] ✅ Supabase data loads
- [ ] ✅ Forms work (if any)
- [ ] ✅ Responsive on mobile

---

## 🎯 Both Sites Deployed

### **After deploying both:**

```
Admin Panel:
https://greenbluerest-admin.vercel.app
or
https://admin.greenbluerestbangkok.com

Frontend:
https://greenbluerest-frontend.vercel.app
or
https://greenbluerestbangkok.com
```

### **Architecture:**

```
┌─────────────────────────────────────┐
│  Frontend (Static Site)             │
│  - HTML/CSS/JS                      │
│  - Supabase Client                  │
│  - Public facing                    │
│  URL: greenbluerestbangkok.com      │
└──────────────┬──────────────────────┘
               │
               │ Reads from
               │
               ▼
┌─────────────────────────────────────┐
│  Supabase Database                  │
│  - PostgreSQL                       │
│  - Real-time data                   │
└──────────────┬──────────────────────┘
               │
               │ Managed by
               │
               ▼
┌─────────────────────────────────────┐
│  Admin Panel (Next.js)              │
│  - CMS interface                    │
│  - Data management                  │
│  - Staff only                       │
│  URL: admin.greenbluerestbangkok.com│
└─────────────────────────────────────┘
```

---

## 📊 Deployment Comparison

| Feature | Vercel | GitHub Pages | Netlify |
|---------|--------|--------------|---------|
| Free Tier | ✅ Yes | ✅ Yes | ✅ Yes |
| Custom Domain | ✅ Easy | ✅ Yes | ✅ Easy |
| SSL | ✅ Auto | ✅ Auto | ✅ Auto |
| CDN | ✅ Global | ✅ Yes | ✅ Global |
| Build Time | ✅ Fast | ⚠️ Slower | ✅ Fast |
| CI/CD | ✅ Auto | ⚠️ Manual | ✅ Auto |
| Forms | ❌ No | ❌ No | ✅ Yes |
| Analytics | ✅ Yes | ❌ No | ✅ Yes |

**Recommendation:** Vercel (best overall)

---

## 🚀 Quick Deploy Commands

### **Vercel:**
```bash
cd src
vercel login
vercel
vercel --prod
```

### **GitHub Pages:**
```bash
git subtree push --prefix src origin gh-pages
```

### **Check Status:**
```bash
# Vercel
vercel ls

# View logs
vercel logs

# Open in browser
vercel open
```

---

## 🎉 Success Metrics

After deployment, you should have:

### **Frontend:**
```
✅ Static site deployed
✅ All pages accessible
✅ Images loading
✅ Supabase data showing
✅ SEO optimized
✅ Fast load times
✅ Mobile responsive
```

### **Admin Panel:**
```
✅ CMS deployed
✅ API routes working
✅ Database connected
✅ Can manage content
✅ Secure login
```

---

## 💡 Pro Tips

### **1. Use Both Platforms:**
```
Admin Panel → Vercel
Frontend → GitHub Pages (free forever)
```

### **2. Separate Domains:**
```
www.greenbluerestbangkok.com → Frontend
admin.greenbluerestbangkok.com → Admin
```

### **3. Environment-specific:**
```
Production: custom domain
Staging: vercel subdomain
```

---

## 🆘 Troubleshooting

### **Issue: 404 on pages**
```bash
Solution:
- Check vercel.json has cleanUrls enabled
- Verify all HTML files exist
- Check relative paths
```

### **Issue: Images not loading**
```bash
Solution:
- Verify images exist in src/images/
- Check paths are relative (./images/ or ../images/)
- Check file names match exactly (case-sensitive)
```

### **Issue: JavaScript not working**
```bash
Solution:
- Check console for errors
- Verify js files exist in src/js/
- Check Supabase URL is correct in js/config.js
```

### **Issue: Supabase data not showing**
```bash
Solution:
- Check js/config.js has correct Supabase URL
- Verify Supabase is publicly accessible
- Check API key is correct
- Test Supabase connection in console
```

---

## 🔄 Update Workflow

### **Making Changes:**

```bash
# 1. Make changes to files in src/
cd src/
# Edit files...

# 2. Test locally
python3 -m http.server 8000

# 3. Commit changes
git add .
git commit -m "Update: description"
git push

# 4. Vercel auto-deploys (if connected to Git)
# Or manually:
vercel --prod
```

---

## ✅ Final Checklist

### **Before Going Live:**
- [ ] All pages tested
- [ ] All links working
- [ ] Images optimized
- [ ] SEO tags present
- [ ] Mobile responsive
- [ ] Forms working (if any)
- [ ] Analytics set up (optional)
- [ ] Custom domain configured (optional)
- [ ] SSL certificate active
- [ ] Performance tested

---

<div align="center">

# 🚀 **Ready to Deploy Frontend!**

**Everything is prepared and optimized**

Choose your deployment method and go! 🎉

</div>

---

## 📞 Quick Links

- **Vercel:** https://vercel.com/new
- **GitHub Pages:** https://pages.github.com
- **Netlify:** https://netlify.com

---

**Created:** 7 ตุลาคม 2025  
**Version:** 1.0  
**Status:** ✅ Ready

