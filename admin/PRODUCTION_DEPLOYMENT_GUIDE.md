# 🚀 คู่มือการ Deploy ระบบ Admin Panel สำหรับใช้งานจริง

## 📋 สารบัญ
1. [การเตรียมความพร้อม](#การเตรียมความพร้อม)
2. [การตั้งค่า GitHub](#การตั้งค่า-github)
3. [การกำหนดค่า Environment Variables](#การกำหนดค่า-environment-variables)
4. [ตัวเลือกการ Deploy](#ตัวเลือกการ-deploy)
5. [การทดสอบระบบ](#การทดสอบระบบ)
6. [การบำรุงรักษา](#การบำรุงรักษา)

---

## 🔧 การเตรียมความพร้อม

### 1. ตรวจสอบไฟล์ที่จำเป็น
```bash
cd admin
ls -la
```

**ไฟล์ที่ต้องมี:**
- ✅ `package.json` - Dependencies
- ✅ `next.config.js` - Next.js configuration
- ✅ `.env.example` - Template สำหรับ environment variables
- ✅ `middleware.ts` - Authentication middleware
- ✅ `app/` - Application files

### 2. ตรวจสอบการ Build
```bash
npm run build
```

หาก build สำเร็จ จะเห็น:
```
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Collecting page data
✓ Generating static pages
✓ Finalizing page optimization
```

---

## 🔑 การตั้งค่า GitHub

### 1. สร้าง GitHub Personal Access Token

1. **ไปที่ GitHub Settings**
   - เปิด https://github.com/settings/tokens
   - คลิก "Generate new token" → "Generate new token (classic)"

2. **กำหนดค่า Token**
   ```
   Note: GreenBlueRest Bangkok Admin Panel
   Expiration: No expiration (หรือ 1 year)
   
   Scopes (เลือก):
   ✅ repo (Full control of private repositories)
     ✅ repo:status
     ✅ repo_deployment
     ✅ public_repo
     ✅ repo:invite
     ✅ security_events
   ✅ workflow (Update GitHub Action workflows)
   ```

3. **คัดลอก Token**
   - เก็บ Token ไว้ในที่ปลอดภัย
   - จะแสดงเพียงครั้งเดียว!

### 2. ตรวจสอบ Repository Settings

```bash
# ตรวจสอบ repository URL
git remote -v

# ตรวจสอบ branch
git branch
```

**ข้อมูลที่ต้องมี:**
- Owner: `nattagid` (หรือ username ของคุณ)
- Repository: `greenbluerestbangkok`
- Branch: `main`

---

## ⚙️ การกำหนดค่า Environment Variables

### 1. สร้างไฟล์ `.env.local`

```bash
cd admin
cp .env.example .env.local
```

### 2. แก้ไข `.env.local`

```env
# GitHub Configuration
GITHUB_OWNER=nattagid
GITHUB_REPO=greenbluerestbangkok
GITHUB_BRANCH=main
GITHUB_TOKEN=ghp_your_token_here

# Admin Authentication
ADMIN_EMAIL=admin@greenbluerestbangkok.com
ADMIN_PASSWORD_HASH=$2a$12$WKT7hdMuqyoltvxjANaNuui9rnPsh/cv6cUg/.kt8iQBRTxt8jAJS

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random

# Base URL
BASE_URL=https://your-domain.com/admin
```

### 3. สร้าง Password Hash ใหม่ (แนะนำ)

```bash
node -e "
const bcrypt = require('bcryptjs');
(async () => {
  const password = 'your-new-password';
  const hash = await bcrypt.hash(password, 12);
  console.log('Password:', password);
  console.log('Hash:', hash);
})();
"
```

### 4. สร้าง JWT Secret ใหม่

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

---

## 🌐 ตัวเลือกการ Deploy

### 🅰️ ตัวเลือก 1: Vercel (แนะนำ)

#### **ข้อดี:**
- ✅ Deploy ง่ายที่สุด
- ✅ Auto-deploy จาก GitHub
- ✅ CDN เร็ว
- ✅ Free tier มากมาย

#### **วิธีการ:**

1. **ติดตั้ง Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   cd admin
   vercel
   ```

4. **ตั้งค่า Environment Variables**
   - ไปที่ Vercel Dashboard
   - เลือก Project → Settings → Environment Variables
   - เพิ่มตัวแปรทั้งหมดจาก `.env.local`

5. **ตั้งค่า Domain (ถ้าต้องการ)**
   - Settings → Domains
   - เพิ่ม custom domain

#### **URL ที่ได้:**
```
https://your-project.vercel.app/admin
```

---

### 🅱️ ตัวเลือก 2: Cloudflare Pages

#### **ข้อดี:**
- ✅ ฟรี
- ✅ เร็วมาก
- ✅ ตั้งค่าได้ละเอียด

#### **วิธีการ:**

1. **Push Code ไป GitHub**
   ```bash
   git add .
   git commit -m "Prepare for production deployment"
   git push origin main
   ```

2. **เชื่อมต่อ Cloudflare Pages**
   - เปิด https://pages.cloudflare.com/
   - คลิก "Create a project"
   - เลือก "Connect to Git"
   - เลือก repository `greenbluerestbangkok`

3. **ตั้งค่า Build**
   ```
   Framework preset: Next.js
   Build command: cd admin && npm run build
   Build output directory: admin/.next
   Root directory: admin
   ```

4. **ตั้งค่า Environment Variables**
   - Settings → Environment Variables
   - เพิ่มตัวแปรทั้งหมด

#### **URL ที่ได้:**
```
https://your-project.pages.dev/admin
```

---

### 🅲 ตัวเลือก 3: Netlify

#### **ข้อดี:**
- ✅ ง่าย
- ✅ ฟรี
- ✅ Form handling

#### **วิธีการ:**

1. **สร้างไฟล์ `netlify.toml`**
   ```toml
   [build]
     base = "admin"
     command = "npm run build"
     publish = "admin/.next"
   
   [[redirects]]
     from = "/admin/*"
     to = "/admin/:splat"
     status = 200
   ```

2. **Deploy ผ่าน Netlify**
   - เปิด https://app.netlify.com/
   - Drag & drop folder `admin/.next`
   - หรือเชื่อมต่อ GitHub

3. **ตั้งค่า Environment Variables**
   - Site settings → Environment variables

---

## 🧪 การทดสอบระบบ

### 1. ทดสอบการเข้าสู่ระบบ

```bash
# ทดสอบ login API
curl -X POST https://your-domain.com/admin/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@greenbluerestbangkok.com","password":"your-password"}'
```

### 2. ทดสอบ API Endpoints

```bash
# ทดสอบ trips API
curl https://your-domain.com/admin/api/trips

# ทดสอบ products API  
curl https://your-domain.com/admin/api/products

# ทดสอบ settings API
curl https://your-domain.com/admin/api/settings
```

### 3. ทดสอบ Frontend

1. **เปิดเบราว์เซอร์**
   ```
   https://your-domain.com/admin/login
   ```

2. **ทดสอบ Login**
   - Email: `admin@greenbluerestbangkok.com`
   - Password: `your-password`

3. **ทดสอบการนำทาง**
   - Dashboard
   - จัดการทริป
   - จัดการสินค้า
   - จัดการสื่อ

---

## 🔒 ความปลอดภัย

### 1. ตรวจสอบ HTTPS
```bash
curl -I https://your-domain.com/admin
# ต้องได้ HTTP/2 200
```

### 2. ตรวจสอบ Headers
```bash
curl -I https://your-domain.com/admin
# ตรวจสอบ:
# - X-Frame-Options
# - X-Content-Type-Options  
# - Referrer-Policy
```

### 3. ตั้งค่า CORS (ถ้าจำเป็น)
```javascript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/admin/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: 'https://your-main-website.com'
          }
        ]
      }
    ]
  }
}
```

---

## 📊 การบำรุงรักษา

### 1. การอัปเดต

```bash
# อัปเดต dependencies
npm update

# ตรวจสอบ security vulnerabilities
npm audit

# แก้ไข vulnerabilities
npm audit fix
```

### 2. การ Backup

```bash
# Backup environment variables
cp .env.local .env.local.backup

# Backup code
git add .
git commit -m "Backup before update"
git push origin main
```

### 3. การ Monitor

#### **Vercel:**
- Dashboard → Functions → View logs

#### **Cloudflare:**
- Analytics → Web Analytics

#### **Netlify:**
- Site overview → Deploys

---

## 🚨 การแก้ไขปัญหา

### ปัญหาที่พบบ่อย:

#### **1. Build Error**
```bash
# ล้าง cache
rm -rf admin/.next
rm -rf admin/node_modules
npm install
npm run build
```

#### **2. Environment Variables ไม่ทำงาน**
- ตรวจสอบชื่อตัวแปร (case-sensitive)
- ตรวจสอบ quotes ใน .env
- Restart server หลังแก้ไข

#### **3. GitHub API Error**
```bash
# ทดสอบ token
curl -H "Authorization: token YOUR_TOKEN" \
  https://api.github.com/user
```

#### **4. 404 Error**
- ตรวจสอบ `basePath` ใน `next.config.js`
- ตรวจสอบ redirects ใน hosting platform

---

## 📞 การติดต่อและ Support

### เอกสารเพิ่มเติม:
- 📖 [User Guide](./USER_GUIDE.md)
- 🚀 [Quick Start](./QUICK_START.md)
- 🔧 [Development Guide](./DEVELOPMENT.md)

### การขอความช่วยเหลือ:
1. ตรวจสอบ logs ใน hosting platform
2. ตรวจสอบ Network tab ใน browser dev tools
3. ทดสอบ API endpoints ด้วย curl

---

## ✅ Checklist การ Deploy

- [ ] ✅ Build สำเร็จ (`npm run build`)
- [ ] ✅ GitHub Token ถูกต้อง
- [ ] ✅ Environment Variables ครบถ้วน
- [ ] ✅ Domain/DNS ตั้งค่าแล้ว
- [ ] ✅ HTTPS ทำงาน
- [ ] ✅ Login ทำงาน
- [ ] ✅ API endpoints ทำงาน
- [ ] ✅ ไฟล์อัปโหลดได้
- [ ] ✅ ข้อมูลแสดงผลถูกต้อง

**🎉 ระบบพร้อมใช้งานจริงแล้ว!**


