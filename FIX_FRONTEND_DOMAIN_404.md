# 🔧 Fix Frontend Domain 404 Error

**Problem:** `https://greenbluerestbangkok.com` → 404 NOT_FOUND  
**Reason:** Custom domain ยังไม่ได้เพิ่มใน Vercel project  
**Solution:** เพิ่ม custom domain และตั้งค่า DNS

---

## 📊 Current Status

### **✅ Working URLs:**
```
Admin Panel:  https://admin.greenbluerestbangkok.com ✅
              (Custom domain configured)

Frontend:     https://greenbluerest.vercel.app ✅
              (Vercel default URL - working!)
```

### **❌ Not Working:**
```
Frontend:     https://greenbluerestbangkok.com ❌
              (Custom domain not configured yet)
```

---

## 🎯 Solution: Add Custom Domain to Frontend

### **Step 1: Go to Vercel Dashboard**

**URL:** https://vercel.com/greenbluerestbangkoks-projects

**Navigate to:**
1. Click on `greenbluerest` project (Frontend)
2. Click **Settings** tab
3. Click **Domains** from sidebar

---

### **Step 2: Add Custom Domain**

**In the "Domains" section:**

1. **Type in the input field:**
   ```
   greenbluerestbangkok.com
   ```

2. **Click "Add"**

3. **Vercel will show DNS instructions:**
   ```
   A Record:
   Type: A
   Name: @ (or root)
   Value: 76.76.21.21
   
   CNAME Record (optional):
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

---

### **Step 3: Configure DNS in GoDaddy**

**Go to GoDaddy DNS Management:**

**URL:** https://dcc.godaddy.com/control/portfolio/greenbluerestbangkok.com/settings

**Add/Update Records:**

#### **A. Root Domain (@):**
```
Type:    A
Name:    @
Value:   76.76.21.21
TTL:     600 seconds (or default)
```

#### **B. WWW Subdomain (optional):**
```
Type:    CNAME
Name:    www
Value:   cname.vercel-dns.com
TTL:     600 seconds
```

**⚠️ Important:**
- **Remove** any existing A record for `@` that points elsewhere
- **Keep** the CNAME for `admin` (points to Vercel for admin panel)

---

### **Step 4: Verify in Vercel**

**After adding DNS records:**

1. Go back to Vercel → `greenbluerest` project → **Domains**
2. Click **"Verify"** or wait a few minutes
3. Status should change from ❌ to ✅

**Expected Result:**
```
Domain Status:
✅ greenbluerestbangkok.com
✅ www.greenbluerestbangkok.com (if added)
```

---

## 📋 Complete DNS Configuration

### **Your GoDaddy DNS should look like:**

```
Type    Name    Value                           Purpose
----    ----    -----                           -------
A       @       76.76.21.21                     Frontend (root)
CNAME   www     cname.vercel-dns.com            Frontend (www)
CNAME   admin   cname.vercel-dns.com            Admin Panel
```

---

## ⏱️ Timeline

```
Now:       Add domain in Vercel          [Start]
+1 min:    Configure DNS in GoDaddy      [Update records]
+5 min:    DNS propagation starts        [Wait...]
+15 min:   Domain verified ✅             [Working!]
+30 min:   Fully propagated globally     [Done!]
```

**Note:** DNS propagation can take 5-30 minutes (sometimes up to 48 hours)

---

## 🧪 Testing

### **After DNS propagates:**

**Test these URLs:**
```bash
# Root domain
curl -I https://greenbluerestbangkok.com

# WWW (if configured)
curl -I https://www.greenbluerestbangkok.com

# Admin (should already work)
curl -I https://admin.greenbluerestbangkok.com
```

**Expected Result:**
```
HTTP/2 200 OK
✅ All domains working!
```

---

## 🔍 Troubleshooting

### **Issue 1: Still 404 after adding domain**

**Check:**
1. **Vercel Domain Status:**
   - Go to Vercel → Project → Domains
   - Domain should show ✅ green checkmark
   - If ❌ red, DNS not configured correctly

2. **DNS Records in GoDaddy:**
   - Verify A record: `@` → `76.76.21.21`
   - Check for conflicting records
   - TTL should be 600 seconds or lower

3. **Wait for DNS Propagation:**
   ```bash
   # Check DNS propagation status
   nslookup greenbluerestbangkok.com
   
   # Should return:
   # Name: greenbluerestbangkok.com
   # Address: 76.76.21.21
   ```

---

### **Issue 2: "Domain already exists"**

**Reason:** Domain might be linked to another Vercel project

**Solution:**
1. Go to that project in Vercel
2. Remove the domain
3. Add it to the correct project (`greenbluerest`)

---

### **Issue 3: SSL Certificate Error**

**Reason:** Vercel is provisioning SSL (takes a few minutes)

**Solution:**
- Wait 5-10 minutes
- Vercel will auto-generate SSL certificate
- Status: "Pending" → "Valid" ✅

---

## 📖 Step-by-Step Guide (Detailed)

### **1. Find Your Vercel Project:**

```bash
cd /Users/nattagid/GitHub/greenbluerestbangkok/src
vercel ls
```

**Output:**
```
greenbluerest    <-- This is your Frontend project
```

---

### **2. Add Domain via Vercel CLI (Alternative):**

```bash
cd /Users/nattagid/GitHub/greenbluerestbangkok/src
vercel domains add greenbluerestbangkok.com
```

**Follow prompts:**
- Select project: `greenbluerest`
- Configure DNS as instructed

---

### **3. Check Domain Status:**

```bash
vercel domains ls
```

**Expected Output:**
```
Domain                        Status
greenbluerestbangkok.com      Valid ✅
admin.greenbluerestbangkok.com Valid ✅
```

---

## 🎯 Quick Fix Summary

### **Option A: Vercel Dashboard (Recommended)**
1. Go to https://vercel.com
2. Select `greenbluerest` project
3. Settings → Domains
4. Add `greenbluerestbangkok.com`
5. Update DNS in GoDaddy

### **Option B: Vercel CLI**
```bash
cd /Users/nattagid/GitHub/greenbluerestbangkok/src
vercel domains add greenbluerestbangkok.com
# Follow DNS instructions
```

### **Option C: Let Me Do It (Manual Steps)**
- Tell me your Vercel login email
- I'll guide you through each click

---

## 📊 Final DNS Configuration

```
GoDaddy DNS for greenbluerestbangkok.com:

┌─────────┬───────┬─────────────────────────┬─────────────────┐
│ Type    │ Name  │ Value                   │ Purpose         │
├─────────┼───────┼─────────────────────────┼─────────────────┤
│ A       │ @     │ 76.76.21.21             │ Frontend Root   │
│ CNAME   │ www   │ cname.vercel-dns.com    │ Frontend WWW    │
│ CNAME   │ admin │ cname.vercel-dns.com    │ Admin Panel     │
└─────────┴───────┴─────────────────────────┴─────────────────┘
```

---

## ✅ Success Criteria

**All these should work:**
```
✅ https://greenbluerestbangkok.com          → Frontend
✅ https://www.greenbluerestbangkok.com      → Frontend (redirect)
✅ https://admin.greenbluerestbangkok.com    → Admin Panel
✅ https://greenbluerest.vercel.app          → Frontend (Vercel URL)
✅ https://greenbluerest-admin.vercel.app    → Admin Panel (Vercel URL)
```

---

## 🚀 Next Steps

### **After Domain is Working:**

1. **Test all pages:**
   - Homepage
   - Trips page
   - Products page
   - Contact page

2. **Verify responsive design:**
   - Mobile view
   - Tablet view
   - Desktop view

3. **Check navigation:**
   - Logo left ✅
   - Menu right ✅
   - Hamburger on mobile ✅

4. **Test CMS integration:**
   - Edit content in Admin Panel
   - Check if changes appear on Frontend

---

<div align="center">

# 🎯 **Quick Action Required**

**Step 1:** Go to Vercel Dashboard  
**Step 2:** Add `greenbluerestbangkok.com` to `greenbluerest` project  
**Step 3:** Update DNS in GoDaddy  
**Step 4:** Wait 5-15 minutes  
**Step 5:** ✅ Done!

**Need help? บอกมาได้เลยครับ!** 😊

</div>

---

**Created:** 7 ตุลาคม 2025  
**Status:** Pending user action

