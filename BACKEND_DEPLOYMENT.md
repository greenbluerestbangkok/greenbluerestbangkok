# 🚀 คู่มือขึ้น Backend สำหรับ Admin Panel (ฟรี)

## 🎯 ตัวเลือกฟรีสำหรับ Backend

### 1. 🥇 **Railway** (แนะนำ - ฟรี 500 ชม/เดือน)

**ทำไมถึงแนะนำ Railway?**
- ✅ **ฟรี 500 ชั่วโมง/เดือน** (16+ วัน)
- ✅ **ไม่หลับ** (Always on)
- ✅ **Database ฟรี** (PostgreSQL)
- ✅ **Deploy ง่าย** จาก GitHub
- ✅ **Custom domain ได้**

#### ขั้นตอนการ Deploy ใน Railway

**Step 1: สมัครและเชื่อม GitHub**
1. ไป **railway.app**
2. กด **"Start a New Project"** 
3. เลือก **"Login with GitHub"**
4. Authorize Railway

**Step 2: สร้าง Project**
1. กด **"Deploy from GitHub repo"**
2. เลือก repository `community-trip-website`
3. กด **"Deploy Now"**

**Step 3: ตั้งค่า Environment Variables**
1. ไปที่ **Variables** tab
2. เพิ่มตัวแปรเหล่านี้:
```bash
PORT=3000
NODE_ENV=production
JWT_SECRET=your-secret-key-here-make-it-long-and-random
```

**Step 4: ตั้งค่า Start Command**
1. ไปที่ **Settings**
2. เพิ่ม **Start Command**: `node server.js`
3. หรือจะใช้ **Build Command**: `npm install`

**✅ เสร็จแล้ว!** 
- Railway จะให้ URL แบบ: `https://your-app.railway.app`
- Backend พร้อมใช้งานแล้ว!

---

### 2. 🥈 **Render** (ฟรีแต่หลับหลังไม่ใช้งาน)

**ข้อดี:**
- ✅ **ฟรี 100%** (ไม่จำกัดเวลา)
- ✅ **SSL ฟรี**
- ✅ **Custom domain ได้**

**ข้อเสียสำคัญ:**
- ❌ **หลับหลังไม่ใช้ 15 นาที** (ตื่นใช้เวลา 30 วินาที)
- ❌ **ช้าในการเริ่มใหม่**

#### ขั้นตอนการ Deploy ใน Render

**Step 1: สมัครและเชื่อม GitHub**
1. ไป **render.com**
2. กด **"Get Started"**
3. เลือก **"GitHub"** login

**Step 2: สร้าง Web Service**
1. กด **"New +"** → **"Web Service"**
2. เชื่อมต่อ repository `community-trip-website`
3. ตั้งค่า:
   - **Name**: `greenbluerest-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`

**Step 3: ตั้งค่า Environment Variables**
เพิ่มตัวแปรเหล่านี้:
```bash
NODE_ENV=production
JWT_SECRET=your-super-secret-jwt-key-make-it-very-long
PORT=10000
```

**✅ เสร็จแล้ว!**
- URL จะเป็น: `https://greenbluerest-backend.onrender.com`

---

## 📁 **เตรียมไฟล์สำหรับ Deploy Backend**

### 1. ปรับแต่ง package.json
```json
{
  "name": "greenbluerest-backend",
  "version": "1.0.0",
  "description": "Backend for GreenBlueRest Admin Panel",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "engines": {
    "node": ">=18.0.0"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "helmet": "^7.1.0",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "multer": "^1.4.5-lts.1",
    "fs-extra": "^11.1.1"
  }
}
```

### 2. ปรับแต่ง server.js
```javascript
// เพิ่มบรรทัดนี้ที่ต้นไฟล์
const PORT = process.env.PORT || 3000;

// แก้ไข CORS settings
app.use(cors({
    origin: [
        'http://localhost:3000', 
        'http://localhost:8000', 
        'https://your-username.github.io',  // เปลี่ยนเป็น GitHub Pages URL ของคุณ
        'https://your-site.netlify.app',    // หรือ Netlify URL
        'https://your-site.vercel.app'      // หรือ Vercel URL
    ],
    credentials: true
}));
```

### 3. สร้างไฟล์ .gitignore
```
node_modules/
.env
*.log
uploads/
backups/
.DS_Store
```

---

## 🔗 **เชื่อมต่อ Frontend กับ Backend**

### แก้ไขไฟล์ admin-panel.js

**หา API_BASE_URL และเปลี่ยนเป็น:**
```javascript
// แก้จาก localhost เป็น URL ของ backend
const API_BASE_URL = 'https://your-app.railway.app'; 
// หรือ 'https://greenbluerest-backend.onrender.com';
```

**ตัวอย่างเต็ม:**
```javascript
// ที่บรรทัดประมาณ 20-30 ในไฟล์ admin-panel.js
const API_BASE_URL = 'https://greenbluerest-backend.railway.app';

// ฟังก์ชัน login จะกลายเป็น:
async function login() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: document.getElementById('username').value,
                password: document.getElementById('password').value
            })
        });
        // ... ส่วนที่เหลือ
    } catch (error) {
        console.error('Login error:', error);
    }
}
```

---

## 📋 **ขั้นตอนการ Deploy ทั้งหมด**

### 1. **Deploy Backend (Railway)**
1. Push โค้ดไป GitHub
2. Deploy ใน Railway  
3. ได้ URL: `https://your-app.railway.app`

### 2. **แก้ไข Frontend**  
1. เปลี่ยน `API_BASE_URL` ในไฟล์ `admin-panel.js`
2. Push อัปเดตไป GitHub

### 3. **Deploy Frontend (GitHub Pages)**
1. ไฟล์ HTML/CSS/JS ไปที่ GitHub Pages
2. ได้ URL: `https://username.github.io/community-trip-website`

### 4. **ทดสอบ**
1. เปิดเว็บไซต์หลัก (GitHub Pages)
2. เปิด Admin Panel
3. ลอง login ด้วย admin/admin123

---

## 🔧 **แก้ปัญหาที่พบบ่อย**

### **CORS Error**
```javascript
// เพิ่ม frontend URL ลงใน server.js
app.use(cors({
    origin: [
        'https://your-username.github.io',
        'https://your-site.netlify.app'
    ],
    credentials: true
}));
```

### **503 Service Unavailable (Render)**
- Backend หลับแล้ว รอ 30 วินาที
- หรือใช้ Railway แทน

### **Login ไม่ได้**
1. เช็ค Network tab ใน Developer Tools
2. ดู Console errors
3. เช็ค API_BASE_URL ให้ถูกต้อง

---

## 💰 **เปรียบเทียบราคา**

| Service | ฟรี | จำกัด | ข้อเสีย |
|---------|-----|-------|---------|
| **Railway** | 500 ชม/เดือน | ~16 วัน | หมดเวลาต้องจ่าย |
| **Render** | ไม่จำกัด | หลับ 15 นาที | ช้าตอนตื่น |
| **Vercel** | ไม่จำกัด | Functions only | ไม่เหมาะกับ server.js |

---

## 🎉 **เสร็จแล้ว!**

**ตอนนี้คุณจะมี:**
1. **เว็บไซต์หลัก** บน GitHub Pages
2. **Admin Panel** ที่ใช้งานได้
3. **Backend API** บน Railway/Render
4. **ระบบจัดการเนื้อหา** ครบถ้วน

**URL ที่ได้:**
- เว็บไซต์: `https://username.github.io/community-trip-website`
- Admin: `https://username.github.io/community-trip-website/admin-panel.html`
- Backend: `https://your-app.railway.app`

**บัญชี Login:**
- Username: `admin`
- Password: `admin123`