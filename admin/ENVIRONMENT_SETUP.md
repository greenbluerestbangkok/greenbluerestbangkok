# ⚙️ คู่มือการตั้งค่า Environment Variables

## 📋 Environment Variables ที่จำเป็น

### 1. สร้างไฟล์ `.env.local`

```bash
cd admin
cp .env.example .env.local
```

### 2. แก้ไขไฟล์ `.env.local`

```env
# GitHub Configuration
GITHUB_OWNER=nattagid
GITHUB_REPO=greenbluerestbangkok
GITHUB_BRANCH=main
GITHUB_TOKEN=ghp_your_github_token_here

# Admin Authentication
ADMIN_EMAIL=admin@greenbluerestbangkok.com
ADMIN_PASSWORD_HASH=$2a$12$WKT7hdMuqyoltvxjANaNuui9rnPsh/cv6cUg/.kt8iQBRTxt8jAJS

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random

# Base URL
BASE_URL=https://your-domain.com/admin
```

---

## 🔑 การสร้าง GitHub Token

### 1. ไปที่ GitHub Settings
```
https://github.com/settings/tokens
```

### 2. สร้าง Personal Access Token
- คลิก "Generate new token" → "Generate new token (classic)"
- **Note**: `GreenBlueRest Bangkok Admin Panel`
- **Expiration**: `No expiration` (หรือ 1 year)

### 3. เลือก Scopes
```
✅ repo (Full control of private repositories)
  ✅ repo:status
  ✅ repo_deployment
  ✅ public_repo
  ✅ repo:invite
  ✅ security_events
✅ workflow (Update GitHub Action workflows)
```

### 4. คัดลอก Token
- เก็บ Token ไว้ในที่ปลอดภัย
- จะแสดงเพียงครั้งเดียว!

---

## 🔐 การสร้าง Password Hash

### 1. สร้าง Hash ใหม่
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

### 2. ใช้ Hash ที่ได้
```env
ADMIN_PASSWORD_HASH=$2a$12$your_new_hash_here
```

---

## 🔒 การสร้าง JWT Secret

### 1. สร้าง Secret ใหม่
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 2. ใช้ Secret ที่ได้
```env
JWT_SECRET=your_new_jwt_secret_here
```

---

## 🌐 การตั้งค่า Base URL

### Development
```env
BASE_URL=http://localhost:3002/admin
```

### Production (Vercel)
```env
BASE_URL=https://your-project.vercel.app/admin
```

### Production (Cloudflare Pages)
```env
BASE_URL=https://your-project.pages.dev/admin
```

### Production (Custom Domain)
```env
BASE_URL=https://admin.yourdomain.com
```

---

## ✅ การตรวจสอบ

### 1. ตรวจสอบไฟล์
```bash
# ตรวจสอบว่ามีไฟล์ .env.local
ls -la .env.local

# ตรวจสอบ content (ระวัง! ไม่ควร commit)
cat .env.local
```

### 2. ตรวจสอบ Build
```bash
npm run build
```

### 3. ตรวจสอบ GitHub Token
```bash
curl -H "Authorization: token YOUR_TOKEN" \
  https://api.github.com/user
```

---

## 🚨 ข้อควรระวัง

### ⚠️ ความปลอดภัย
- **ห้าม commit** `.env.local` ลง Git
- เก็บ Token และ Secret ไว้ในที่ปลอดภัย
- ใช้ HTTPS เสมอใน production

### ⚠️ การแก้ไข
- หลังแก้ไข `.env.local` ต้อง restart server
- ตรวจสอบ quotes และ spaces
- Case-sensitive ทั้งหมด

### ⚠️ การ Backup
```bash
# Backup environment variables
cp .env.local .env.local.backup
```

---

## 📞 การแก้ไขปัญหา

### ปัญหา: Build Error
```bash
# ล้าง cache
rm -rf .next
rm -rf node_modules
npm install
npm run build
```

### ปัญหา: GitHub API Error
```bash
# ทดสอบ token
curl -H "Authorization: token YOUR_TOKEN" \
  https://api.github.com/repos/nattagid/greenbluerestbangkok
```

### ปัญหา: Login ไม่ได้
```bash
# ตรวจสอบ password hash
node -e "
const bcrypt = require('bcryptjs');
(async () => {
  const password = 'your-password';
  const hash = 'YOUR_HASH_FROM_ENV';
  const isValid = await bcrypt.compare(password, hash);
  console.log('Password valid:', isValid);
})();
"
```

---

## 🎯 ตัวอย่างไฟล์ .env.local ที่สมบูรณ์

```env
# GitHub Configuration
GITHUB_OWNER=nattagid
GITHUB_REPO=greenbluerestbangkok
GITHUB_BRANCH=main
GITHUB_TOKEN=ghp_1234567890abcdef1234567890abcdef12345678

# Admin Authentication
ADMIN_EMAIL=admin@greenbluerestbangkok.com
ADMIN_PASSWORD_HASH=$2a$12$WKT7hdMuqyoltvxjANaNuui9rnPsh/cv6cUg/.kt8iQBRTxt8jAJS

# JWT Secret
JWT_SECRET=a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef

# Base URL
BASE_URL=https://greenbluerestbangkok-admin.vercel.app/admin
```

**🎉 พร้อม deploy แล้ว!**
