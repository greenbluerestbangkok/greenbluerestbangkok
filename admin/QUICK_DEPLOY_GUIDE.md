# 🚀 คู่มือ Deploy ระบบ Admin Panel (แบบสั้น)

## ⚡ วิธีเร็วที่สุด - Vercel

### 1. เตรียม GitHub Token
1. ไปที่ https://github.com/settings/tokens
2. คลิก "Generate new token (classic)"
3. เลือก scopes: `repo` (ทั้งหมด)
4. คัดลอก token (เก็บไว้ดีๆ)

### 2. สร้างไฟล์ `.env.local`
```bash
cd admin
cp .env.example .env.local
```

แก้ไข `.env.local`:
```env
GITHUB_OWNER=nattagid
GITHUB_REPO=greenbluerestbangkok  
GITHUB_BRANCH=main
GITHUB_TOKEN=ghp_your_token_here

ADMIN_EMAIL=admin@greenbluerestbangkok.com
ADMIN_PASSWORD_HASH=$2a$12$WKT7hdMuqyoltvxjANaNuui9rnPsh/cv6cUg/.kt8iQBRTxt8jAJS
JWT_SECRET=your-super-secret-jwt-key-here

BASE_URL=https://your-domain.vercel.app/admin
```

### 3. Deploy ด้วย Vercel
```bash
# ติดตั้ง Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
cd admin
vercel
```

### 4. ตั้งค่า Environment Variables
1. ไปที่ Vercel Dashboard
2. เลือก Project → Settings → Environment Variables
3. เพิ่มตัวแปรทั้งหมดจาก `.env.local`

### 5. ทดสอบ
```
URL: https://your-project.vercel.app/admin/login
Email: admin@greenbluerestbangkok.com
Password: admin
```

---

## 🔧 วิธีอื่นๆ

### Cloudflare Pages
1. Push code ไป GitHub
2. ไปที่ https://pages.cloudflare.com/
3. Connect repository
4. Build settings:
   - Framework: Next.js
   - Build command: `cd admin && npm run build`
   - Build output: `admin/.next`
   - Root directory: `admin`

### Netlify
1. สร้างไฟล์ `netlify.toml`:
```toml
[build]
  base = "admin"
  command = "npm run build"
  publish = "admin/.next"
```
2. Drag & drop folder `admin/.next` ไป Netlify

---

## ✅ Checklist
- [ ] GitHub Token ถูกต้อง
- [ ] Environment Variables ครบ
- [ ] Build สำเร็จ (`npm run build`)
- [ ] Login ทำงาน
- [ ] API ทำงาน

**🎉 เสร็จแล้ว!**

