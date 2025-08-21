# 🚀 คู่มือขึ้นเว็บไซต์ฟรี - GreenBlueRest Bangkok

## 🎯 ตัวเลือกฟรี (แนะนำ)

### 1. 🥇 **GitHub Pages** (ง่ายที่สุด + ฟรี)

**ขั้นตอนที่ 1: สมัคร GitHub**
1. ไป https://github.com
2. กด "Sign up" สมัครฟรี
3. ยืนยันอีเมล

**ขั้นตอนที่ 2: อัปโหลดโปรเจค**
1. กด "New repository" (ปุ่มเขียว)
2. ตั้งชื่อ: `community-trip-website`
3. ✅ เลือก "Public" 
4. ✅ เลือก "Add a README file"
5. กด "Create repository"

**ขั้นตอนที่ 3: อัปโหลดไฟล์**
1. กด "uploading an existing file"
2. ลากไฟล์ทั้งหมดใส่ (ยกเว้น node_modules/)
   - index.html
   - admin-panel.html  
   - css/
   - js/
   - pages/
   - images/
   - Logo/
3. เขียน Commit message: "Initial website upload"
4. กด "Commit changes"

**ขั้นตอนที่ 4: เปิด GitHub Pages**
1. ไปที่ repository ของคุณ
2. กด **Settings** (แท็บบนสุด)
3. เลื่อนลงหา **Pages** (เมนูซ้าย)
4. Source: เลือก **Deploy from a branch**
5. Branch: เลือก **main** และ **/ (root)**
6. กด **Save**

**✅ เสร็จแล้ว!** 
- เว็บไซต์จะใช้งานได้ใน 5-10 นาที
- URL: `https://USERNAME.github.io/community-trip-website`

---

### 2. 🥈 **Netlify** (ง่าย + ฟีเจอร์เยอะ)

**ขั้นตอนที่ 1: สมัคร Netlify**
1. ไป https://www.netlify.com
2. กด "Sign up" 
3. เลือก "Sign up with GitHub" (ใช้ GitHub ที่สมัครไว้)

**ขั้นตอนที่ 2: Deploy แบบ Drag & Drop**
1. ไปที่ Netlify Dashboard
2. กด "Add new site" → "Deploy manually"
3. **ลากโฟลเดอร์เว็บไซต์** ใส่กล่อง (ยกเว้น node_modules/)
4. รอสักครู่...

**✅ เสร็จแล้ว!**
- เว็บไซต์ใช้งานได้ทันที
- URL: `https://random-name-123.netlify.app`
- เปลี่ยนชื่อได้ที่ Site settings

---

### 3. 🥉 **Vercel** (เร็ว + สำหรับ Developer)

**ขั้นตอนที่ 1: สมัคร Vercel**
1. ไป https://vercel.com
2. กด "Start Deploying"
3. เลือก "Continue with GitHub"

**ขั้นตอนที่ 2: Import Project**
1. กด "Add New..." → "Project"
2. เลือก repository ที่อัปโหลดไว้ใน GitHub
3. กด "Import"
4. Framework: เลือก "Other" หรือ "Static"
5. กด "Deploy"

**✅ เสร็จแล้ว!**
- เว็บไซต์ใช้งานได้ทันที  
- URL: `https://community-trip-website.vercel.app`

---

## 📝 ไฟล์ที่ต้องอัปโหลด

### ✅ **ไฟล์สำคัญ (ต้องมี)**
```
📁 community-trip-website/
├── index.html              ← หน้าแรก
├── admin-panel.html        ← ระบบจัดการ (ใช้งานได้หลังขึ้นเซิร์ฟเวอร์)
├── 📁 css/
│   └── style.css          ← สไตล์
├── 📁 js/
│   ├── main.js
│   ├── products.js
│   ├── trip-details.js
│   └── blog-vlog.js
├── 📁 pages/              ← หน้าต่างๆ
├── 📁 images/             ← รูปภาพ
└── 📁 Logo/               ← โลโก้
```

### ❌ **ไฟล์ที่ไม่ต้องอัปโหลด**
```
❌ node_modules/           ← ไฟล์ใหญ่ ไม่จำเป็น
❌ server.js              ← สำหรับเซิร์ฟเวอร์เท่านั้น
❌ package.json           ← ไม่จำเป็นสำหรับ static site
❌ .env                   ← ไฟล์ลับ
```

---

## 🔧 **ปรับแต่งก่อน Deploy**

### 1. แก้ไข Admin Panel ให้ใช้งานได้
```javascript
// ใน admin-panel.js บรรทัด ~20
const API_BASE_URL = 'https://your-backend.herokuapp.com'; // แทนที่ localhost
```

### 2. เช็คลิงค์ให้ถูกต้อง
- เปิดไฟล์ HTML ทุกไฟล์
- ตรวจสอบ path ของรูปภาพและไฟล์
- เปลี่ยน `../` ให้ถูกต้อง

---

## 🌐 **ขั้นตอนต่อไป (ถ้าต้องการ)**

### 1. **ใช้ชื่อโดเมนของตัวเอง**
- ซื้อโดเมน (เช่น godaddy.com, namecheap.com)
- ประมาณ 300-500 บาท/ปี
- ตั้งค่า DNS ให้ชี้ไปยัง hosting

### 2. **เพิ่มฟังก์ชัน Backend**
- ใช้ **Railway** (ฟรี 500 ชม/เดือน)
- ใช้ **Render** (ฟรีแต่หลับหลังไม่ใช้งาน)
- อัปโหลด server.js และ package.json

### 3. **เพิ่มฐานข้อมูล**
- **MongoDB Atlas** (ฟรี 512MB)
- **PlanetScale** (ฟรี)
- **Supabase** (ฟรี)

---

## ⚡ **เริ่มต้นแนะนำ: GitHub Pages**

**ทำไมถึงแนะนำ GitHub Pages?**
- ✅ **ฟรี 100%** 
- ✅ **ไม่มี ads**
- ✅ **SSL/HTTPS ให้ฟรี**
- ✅ **อัปเดตง่าย** (แค่ push code ใหม่)
- ✅ **เสถียร** (ของ Microsoft)
- ✅ **Custom domain ได้**

**ข้อจำกัด:**
- ❌ ไม่มี backend (server.js ใช้ไม่ได้)
- ❌ ไม่มีฐานข้อมูล  
- ❌ Static files เท่านั้น

---

## 🆘 **แก้ปัญหาที่พบบ่อย**

### **รูปภาพไม่แสดง**
```html
<!-- ❌ ผิด -->
<img src="../images/trip1.jpg">

<!-- ✅ ถูก (สำหรับ GitHub Pages) -->
<img src="./images/trip1.jpg">
<img src="images/trip1.jpg">
```

### **CSS ไม่โหลด**
```html
<!-- ❌ ผิด -->
<link rel="stylesheet" href="../css/style.css">

<!-- ✅ ถูก -->
<link rel="stylesheet" href="./css/style.css">
<link rel="stylesheet" href="css/style.css">
```

### **Admin Panel ไม่ทำงาน**
- Admin Panel ต้องการ backend server
- บน static hosting จะใช้งานไม่ได้
- ต้องขึ้น backend แยก (Railway, Render)

---

## 📞 **ต้องการความช่วยเหลือ?**

1. **GitHub Pages ใช้งานไม่ได้** - ตรวจสอบ Settings > Pages
2. **รูปภาพไม่แสดง** - ตรวจสอบ path และชื่อไฟล์
3. **เว็บไซต์ช้า** - ลดขนาดรูปภาพ  
4. **ต้องการ custom domain** - ซื้อโดเมนและตั้งค่า DNS

---

**🎉 สำเร็จแล้ว! เว็บไซต์ของคุณจะออนไลน์แล้ว** 

**ขั้นตอนต่อไป:**
1. ทดสอบเว็บไซต์ทุกหน้า
2. แชร์ URL ให้เพื่อนดู
3. เพิ่มเนื้อหาและปรับปรุงต่อไป