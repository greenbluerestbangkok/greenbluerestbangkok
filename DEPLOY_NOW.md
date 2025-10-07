# 🚀 Deploy Now - Quick Guide

**Ready to Deploy:** ✅ Yes!  
**Build Status:** ✅ Successful  
**Date:** 7 ตุลาคม 2025

---

## ⚡ Quick Deploy Steps

### **Option 1: Deploy via Vercel CLI** (Recommended - Fastest)

```bash
# 1. Navigate to admin folder
cd /Users/nattagid/GitHub/greenbluerestbangkok/admin

# 2. Deploy to Vercel
vercel

# 3. Follow prompts:
# - Set up and deploy? Yes
# - Which scope? [your-account]
# - Link to existing project? No
# - Project name? greenbluerest-admin
# - Directory? ./ (current)
# - Override settings? No

# 4. After preview deployment, deploy to production:
vercel --prod
```

### **Option 2: Deploy via Vercel Dashboard** (Easier for beginners)

1. Go to https://vercel.com/new
2. Import Git Repository
3. Connect to your GitHub/GitLab
4. Select repository: `greenbluerestbangkok`
5. Configure Project:
   - **Framework Preset:** Next.js
   - **Root Directory:** `admin`
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`
6. Add Environment Variables (see below)
7. Click "Deploy"

---

## 🔑 Environment Variables (IMPORTANT!)

**You MUST add these before deploying:**

```env
NEXT_PUBLIC_SUPABASE_URL=https://gmdvkegcejrbrobtrhfm.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### **How to add in Vercel CLI:**
```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL
# Paste: https://gmdvkegcejrbrobtrhfm.supabase.co

vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
# Paste: your anon key from Supabase
```

### **How to add in Vercel Dashboard:**
1. Go to Project Settings
2. Click "Environment Variables"
3. Add each variable:
   - Name: `NEXT_PUBLIC_SUPABASE_URL`
   - Value: `https://gmdvkegcejrbrobtrhfm.supabase.co`
   - Environment: Production, Preview, Development
4. Click "Save"
5. Repeat for `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### **Where to find Supabase Keys:**
1. Go to https://supabase.com/dashboard
2. Select your project
3. Go to Settings → API
4. Copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - anon/public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## ✅ Pre-Deployment Checklist

- [x] ✅ Build successful (`npm run build`)
- [x] ✅ Vercel CLI installed
- [x] ✅ vercel.json configured
- [x] ✅ No test endpoints in production
- [x] ✅ Components cleaned
- [x] ✅ Documentation ready
- [ ] ⚠️  Supabase credentials ready
- [ ] ⚠️  Vercel account logged in

---

## 🎯 After Deployment

### **1. Test Your Deployment:**
```bash
# Your app will be at:
https://greenbluerest-admin-[random].vercel.app

# Or with custom domain:
https://admin.greenbluerestbangkok.com
```

### **2. Verify Everything Works:**
- [ ] Homepage loads
- [ ] Dashboard shows statistics
- [ ] Can view trips
- [ ] Can view products
- [ ] Can view articles
- [ ] API routes work
- [ ] Database connection works

### **3. Configure Custom Domain (Optional):**
1. Go to Vercel Dashboard
2. Select your project
3. Go to Settings → Domains
4. Add domain: `admin.greenbluerestbangkok.com`
5. Update DNS records as instructed

---

## 🔄 Continuous Deployment

### **Connect to GitHub (Recommended):**

1. Go to Vercel Dashboard
2. Import Git Repository
3. Connect to GitHub
4. Select `greenbluerestbangkok` repository
5. Set Root Directory: `admin`
6. Deploy!

**Result:** Every push to main = auto deploy! 🎉

---

## 📝 Quick Commands

```bash
# Check Vercel login status
vercel whoami

# Deploy to preview
cd admin && vercel

# Deploy to production
cd admin && vercel --prod

# View deployments
vercel ls

# View logs
vercel logs

# Open in browser
vercel open
```

---

## 🆘 Troubleshooting

### **Issue: "vercel: command not found"**
```bash
npm install -g vercel
```

### **Issue: "Build failed"**
```bash
# Test build locally first
cd admin
npm run build

# If successful, then deploy
vercel --prod
```

### **Issue: "Environment variables not working"**
```bash
# Add them via CLI
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY

# Then redeploy
vercel --prod
```

### **Issue: "404 on API routes"**
- Check `admin/vercel.json` exists
- Check middleware.ts doesn't block API routes
- Redeploy

---

## 🎊 Ready to Deploy!

Everything is ready! Just run:

```bash
cd /Users/nattagid/GitHub/greenbluerestbangkok/admin
vercel
```

Or visit: https://vercel.com/new

---

**Good luck! 🍀**

