# 🔧 **แก้ไขปัญหา Vercel Build**

## ❌ **ปัญหา:**
```
Error: No Next.js version detected. Make sure your package.json has "next" in either "dependencies" or "devDependencies". Also check your Root Directory setting matches the directory of your package.json file.
```

## ✅ **วิธีแก้ไข:**

### **1. อัปเดต Root Package.json**
เพิ่ม Next.js dependencies ใน `package.json` (root level):

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "next": "^14.0.0"
  },
  "scripts": {
    "build": "cd admin && npm run build"
  }
}
```

### **2. ตั้งค่า Vercel Configuration**
สร้างไฟล์ `vercel.json` ใน root directory:

```json
{
  "version": 2,
  "buildCommand": "cd admin && npm run build",
  "outputDirectory": "admin/.next",
  "installCommand": "cd admin && npm install",
  "devCommand": "cd admin && npm run dev",
  "routes": [
    {
      "src": "/admin/(.*)",
      "dest": "/admin/$1"
    },
    {
      "src": "/api/(.*)",
      "dest": "/api/$1"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  },
  "functions": {
    "admin/app/api/**/*.ts": {
      "maxDuration": 30
    }
  }
}
```

### **3. ตั้งค่าใน Vercel Dashboard**

#### **Project Settings:**
- **Framework Preset:** Next.js
- **Root Directory:** `admin`
- **Build Command:** `npm run build`
- **Output Directory:** `.next`
- **Install Command:** `npm install`

#### **Environment Variables:**
```env
STRAPI_URL=https://your-strapi-domain.com
STRAPI_API_TOKEN=your_production_strapi_api_token
NEXTAUTH_SECRET=your_strong_random_secret_here
NEXTAUTH_URL=https://your-admin-domain.vercel.app
NODE_ENV=production
```

---

## 🚀 **ขั้นตอนการ Deploy ใหม่**

### **1. Push Changes**
```bash
git add .
git commit -m "Fix Vercel build configuration"
git push origin main
```

### **2. Redeploy ใน Vercel**
- ไปที่ Vercel Dashboard
- คลิก "Redeploy" ใน latest deployment
- หรือ push code ใหม่จะ auto-deploy

### **3. ตรวจสอบ Build Logs**
- ดู build logs ใน Vercel Dashboard
- ตรวจสอบว่า build สำเร็จ

---

## 🔍 **การ Debug**

### **1. ตรวจสอบ Build Logs**
```
✓ Installing dependencies...
✓ Running build command...
✓ Building Next.js app...
✓ Generating static pages...
✓ Deploying...
```

### **2. ตรวจสอบ Environment Variables**
- ไปที่ Project Settings → Environment Variables
- ตรวจสอบว่าทุกตัวแปรถูกตั้งค่าแล้ว

### **3. ตรวจสอบ Root Directory**
- ตรวจสอบว่า Root Directory ตั้งเป็น `admin`
- หรือใช้ `vercel.json` configuration

---

## 📋 **Checklist**

### **ก่อน Deploy:**
- [ ] อัปเดต `package.json` ใน root directory
- [ ] สร้างไฟล์ `vercel.json` ใน root directory
- [ ] ตั้งค่า Environment Variables ใน Vercel
- [ ] ตรวจสอบ Root Directory setting

### **หลัง Deploy:**
- [ ] ตรวจสอบ build logs
- [ ] ทดสอบ Admin Panel URL
- [ ] ทดสอบ API endpoints
- [ ] ทดสอบ authentication

---

## 🎯 **Expected Results**

### **Successful Build:**
```
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Generating static pages (28/28)
✓ Finalizing page optimization
✓ Deploying...
```

### **URLs:**
- **Admin Panel:** `https://your-domain.vercel.app/admin`
- **Login:** `https://your-domain.vercel.app/admin/login`
- **API:** `https://your-domain.vercel.app/api/*`

---

## 🆘 **หากยังมีปัญหา**

### **1. ลบและสร้าง Project ใหม่**
- ลบ project ใน Vercel Dashboard
- สร้าง project ใหม่
- Import repository อีกครั้ง
- ตั้งค่า Root Directory เป็น `admin`

### **2. ใช้ Vercel CLI**
```bash
cd admin
vercel --prod
```

### **3. ตรวจสอบ Repository Structure**
```
greenbluerestbangkok/
├── package.json (root)
├── vercel.json (root)
├── admin/
│   ├── package.json
│   ├── next.config.js
│   ├── app/
│   └── ...
└── ...
```

---

## 🎉 **สรุป**

### **สาเหตุปัญหา:**
- Vercel ไม่พบ Next.js ใน root package.json
- Root Directory ไม่ได้ตั้งค่าเป็น `admin`

### **วิธีแก้ไข:**
- เพิ่ม Next.js dependencies ใน root package.json
- สร้าง vercel.json configuration
- ตั้งค่า Root Directory ใน Vercel Dashboard

**หลังจากแก้ไขแล้ว Vercel จะสามารถ build และ deploy Admin Panel ได้สำเร็จ!** 🚀
