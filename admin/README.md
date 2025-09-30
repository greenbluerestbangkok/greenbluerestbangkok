# 🏛️ Admin Panel - GreenBlueRest Bangkok

> ระบบจัดการเนื้อหาและสื่อสำหรับเว็บไซต์ GreenBlueRest Bangkok

[![Next.js](https://img.shields.io/badge/Next.js-14.2.32-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.3-38B2AC)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

---

## 🎯 ภาพรวม

Admin Panel เป็นระบบจัดการเนื้อหาและสื่อที่ทันสมัยสำหรับเว็บไซต์ GreenBlueRest Bangkok โดยใช้เทคโนโลยี Next.js 14, TypeScript, และ Tailwind CSS เพื่อให้การจัดการเนื้อหาเป็นไปอย่างมีประสิทธิภาพและปลอดภัย

### ✨ คุณสมบัติหลัก

- 🎨 **Design สวยงาม**: สอดคล้องกับเว็บไซต์หลัก GreenBlueRest Bangkok
- 📝 **จัดการเนื้อหา**: สร้าง แก้ไข และลบบทความ Markdown และ JSON
- 🖼️ **จัดการสื่อ**: อัปโหลดและจัดการไฟล์ภาพ
- 🔐 **ความปลอดภัย**: JWT Authentication และ GitHub API Integration
- 📱 **Responsive**: ใช้งานได้ในทุกอุปกรณ์
- ⚡ **Performance**: โหลดเร็วและตอบสนองทันที

---

## 📚 คู่มือการใช้งาน

### 🚀 สำหรับผู้เริ่มต้น
- **[⚡ Quick Start Guide](QUICK_START.md)** - เริ่มต้นใช้งานใน 5 นาที
- **[📋 Step-by-Step Guide](STEP_BY_STEP_GUIDE.md)** - คู่มือใช้งานแบบทีละขั้นตอน

### 📖 สำหรับผู้ใช้ทั่วไป
- **[📖 User Guide](USER_GUIDE.md)** - คู่มือการใช้งานแบบละเอียด
- **[🖼️ Visual Guide](VISUAL_GUIDE.md)** - คู่มือการใช้งานแบบ Visual

### 🔧 สำหรับนักพัฒนา
- **[🔧 Admin Setup Guide](README_admin.md)** - คู่มือการติดตั้งและตั้งค่า
- **[🧪 Test Plan](TEST_PLAN.md)** - แผนการทดสอบ
- **[🚀 Deployment Guide](DEPLOYMENT_GUIDE.md)** - คู่มือการ deploy

---

## 🚀 เริ่มต้นใช้งาน

### 1. เข้าสู่ระบบ
```
URL: http://localhost:3002/admin/login
Email: admin@greenbluerestbangkok.com
Password: admin
```

### 2. หน้าแรก Dashboard
- 📊 ดูสถิติเนื้อหาและสื่อ
- ⚡ ใช้ปุ่มลัดสำหรับการดำเนินการด่วน
- 🕒 ตรวจสอบไฟล์ล่าสุด

### 3. การดำเนินการหลัก
- **สร้างเนื้อหาใหม่**: Markdown และ JSON
- **จัดการสื่อ**: อัปโหลดและจัดการรูปภาพ
- **เผยแพร่เนื้อหา**: เปลี่ยนสถานะเป็น published

---

## 🛠️ การติดตั้ง

### Prerequisites
- Node.js 18.0 หรือใหม่กว่า
- npm หรือ yarn
- GitHub account พร้อม Personal Access Token

### ขั้นตอนการติดตั้ง

1. **Clone Repository**
```bash
git clone https://github.com/nattagid/greenbluerestbangkok.git
cd greenbluerestbangkok/admin
```

2. **ติดตั้ง Dependencies**
```bash
npm install
```

3. **ตั้งค่า Environment Variables**
```bash
cp env.example .env.local
# แก้ไข .env.local ตามข้อมูลของคุณ
```

4. **รัน Development Server**
```bash
npm run dev
```

5. **เปิดเบราว์เซอร์**
```
http://localhost:3002/admin
```

---

## ⚙️ การตั้งค่า

### Environment Variables

สร้างไฟล์ `.env.local` และตั้งค่าดังนี้:

```env
# GitHub Configuration
GITHUB_OWNER=your_username
GITHUB_REPO=your_repository
GITHUB_BRANCH=main
GITHUB_TOKEN=your_github_token

# Admin Authentication
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_PASSWORD_HASH=your_password_hash
JWT_SECRET=your_jwt_secret

# Application Configuration
BASE_URL=http://localhost:3002
```

### สร้าง Password Hash

```bash
node -e "const bcrypt=require('bcryptjs');(async()=>{console.log(await bcrypt.hash('your_password',12));})();"
```

### GitHub Token Setup

1. ไปที่ GitHub → Settings → Developer settings → Personal access tokens
2. สร้าง token ใหม่
3. เลือก scope: `repo:contents`
4. คัดลอก token มาใส่ใน `.env.local`

---

## 📁 โครงสร้างโปรเจกต์

```
admin/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   │   ├── auth/          # Authentication
│   │   ├── content/       # Content Management
│   │   └── media/         # Media Management
│   ├── content/           # Content Pages
│   ├── login/             # Login Page
│   └── media/             # Media Page
├── components/            # React Components
├── lib/                   # Utility Libraries
│   ├── auth.ts           # Authentication
│   ├── github.ts         # GitHub API
│   └── schema.ts         # Validation Schemas
├── public/               # Static Assets
└── styles/               # CSS Styles
```

---

## 🎨 Design System

### สีหลัก
- **Primary**: #2E8B57 (เขียวหลัก)
- **Secondary**: #20B2AA (ฟ้า)
- **Accent**: #FFD700 (ทอง)
- **Text**: #333333 (เทาเข้ม)
- **Background**: #F8F9FA (เทาอ่อน)

### Typography
- **Font**: IBM Plex Sans Thai
- **Weights**: 300, 400, 500, 600, 700
- **Sizes**: 12px - 48px

### Components
- **Cards**: bg-white, rounded-lg, shadow-sm
- **Buttons**: rounded-md, transition-colors
- **Forms**: border-gray-300, focus:ring-green-500
- **Badges**: rounded-full, px-2.5, py-0.5

---

## 🔒 ความปลอดภัย

### Authentication
- JWT-based authentication
- HTTP-only cookies
- Secure, SameSite=strict cookies
- Short-lived tokens (2 hours)

### File Upload
- File type validation (PNG, JPG, WebP, GIF)
- File size limits (8MB max)
- Path traversal prevention
- Secure file naming

### Content Management
- Path validation under `/content/`
- JSON format validation
- SHA-based change tracking
- CSRF protection

---

## 🚀 การ Deploy

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

### Deployment Platforms
- **Vercel**: Zero-config deployment
- **Cloudflare Pages**: Fast global CDN
- **GitHub Pages**: Free hosting
- **Netlify**: Easy deployment

ดูรายละเอียดใน [Deployment Guide](DEPLOYMENT_GUIDE.md)

---

## 🧪 การทดสอบ

### Test Plan
- Authentication tests
- Content management tests
- Media management tests
- Security tests
- Performance tests

ดูรายละเอียดใน [Test Plan](TEST_PLAN.md)

---

## 📊 Performance

### Metrics
- **First Load JS**: 87.1 kB
- **Build Time**: < 30 seconds
- **Lighthouse Score**: 95+ (Performance)
- **Bundle Size**: Optimized with Next.js

### Optimization
- Image optimization
- Code splitting
- Lazy loading
- Caching strategies

---

## 🤝 การมีส่วนร่วม

### Reporting Issues
1. ตรวจสอบ existing issues
2. สร้าง issue ใหม่พร้อมรายละเอียด
3. ใช้ template ที่เหมาะสม

### Pull Requests
1. Fork repository
2. สร้าง feature branch
3. Commit changes
4. สร้าง pull request

---

## 📄 License

MIT License - ดูรายละเอียดใน [LICENSE](LICENSE)

---

## 🙏 Acknowledgments

- **Next.js Team** - สำหรับ framework ที่ยอดเยี่ยม
- **Tailwind CSS** - สำหรับ utility-first CSS framework
- **GitHub** - สำหรับ API และ hosting
- **GreenBlueRest Bangkok** - สำหรับโครงการที่สร้างแรงบันดาลใจ

---

## 📞 การติดต่อ

- **Website**: [greenbluerestbangkok.com](https://greenbluerestbangkok.com)
- **GitHub**: [nattagid/greenbluerestbangkok](https://github.com/nattagid/greenbluerestbangkok)
- **Issues**: [GitHub Issues](https://github.com/nattagid/greenbluerestbangkok/issues)

---

## 🎉 สรุป

Admin Panel ของ GreenBlueRest Bangkok เป็นเครื่องมือที่ทรงพลังสำหรับการจัดการเนื้อหาและสื่อ โดยมีคุณสมบัติครบครันและใช้งานง่าย

**เริ่มต้นใช้งาน Admin Panel วันนี้และทำให้เว็บไซต์ GreenBlueRest Bangkok มีเนื้อหาที่สดใหม่และน่าสนใจ!** 🚀

---

*สร้างด้วย ❤️ สำหรับ GreenBlueRest Bangkok*
