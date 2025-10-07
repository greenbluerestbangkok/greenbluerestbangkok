# 🎯 คู่มือติดตั้งและใช้งาน Admin CMS

## 📋 สารบัญ
- [ข้อกำหนดเบื้องต้น](#ข้อกำหนดเบื้องต้น)
- [การติดตั้ง](#การติดตั้ง)
- [การตั้งค่า](#การตั้งค่า)
- [การรันระบบ](#การรันระบบ)
- [การใช้งาน](#การใช้งาน)
- [การ Deploy](#การ-deploy)
- [Troubleshooting](#troubleshooting)

---

## 🔧 ข้อกำหนดเบื้องต้น

ก่อนเริ่มต้น ตรวจสอบว่าคุณมี:

- ✅ **Node.js** 14 ขึ้นไป
  ```bash
  node --version  # ควรเป็น v14.x ขึ้นไป
  ```

- ✅ **npm** หรือ **yarn**
  ```bash
  npm --version   # ควรเป็น v6.x ขึ้นไป
  ```

- ✅ **Supabase Account** (ฟรี)
  - ไปที่: https://supabase.com
  - สมัครบัญชี (ถ้ายังไม่มี)
  - สร้าง Project ใหม่

---

## 📦 การติดตั้ง

### Step 1: เข้าไปในโฟลเดอร์ Admin

```bash
cd /Users/nattagid/GitHub/greenbluerestbangkok/admin
```

### Step 2: ติดตั้ง Dependencies

```bash
npm install
```

**รอจนกว่าจะเสร็จ** (อาจใช้เวลา 2-5 นาที)

---

## ⚙️ การตั้งค่า

### Step 1: สร้างไฟล์ Environment Variables

**สร้างไฟล์ `.env.local`:**

```bash
cp .env.example .env.local
```

หรือสร้างเองโดยใส่ข้อมูลนี้:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://gmdvkegcejrbrobtrhfm.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdtZHZrZWdjZWpyYnJvYnRyaGZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyMzQ1NjYsImV4cCI6MjA3NDgxMDU2Nn0.n5iWM2P7G_vYs5VoIexeZ4N0ajkQtnKw8uqsCtzFZto
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdtZHZrZWdjZWpyYnJvYnRyaGZtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTIzNDU2NiwiZXhwIjoyMDc0ODEwNTY2fQ.Kq6bnRzZFuBaIcVLSCF_v83n8FeauELatKg067Kc9hM

# JWT Secret (ควรเปลี่ยนใน production)
JWT_SECRET=greenbluerest-super-secret-key-2025

# NextAuth
NEXTAUTH_SECRET=nextauth-greenbluerest-secret-2025
NEXTAUTH_URL=http://localhost:3001
```

### Step 2: ตรวจสอบ Supabase

**เปิด Supabase Dashboard:**
1. ไปที่ https://supabase.com/dashboard
2. เลือก Project: `gmdvkegcejrbrobtrhfm`
3. ตรวจสอบว่ามี Tables ต่อไปนี้:
   - ✅ `trips`
   - ✅ `products`
   - ✅ `articles`
   - ✅ `videos`
   - ✅ `entrepreneurs`

**ถ้ายังไม่มี Tables:**
- ไปที่ SQL Editor
- รัน script ใน `sample-trips-data.sql`

---

## 🚀 การรันระบบ

### Development Mode (Local)

```bash
cd admin
npm run dev
```

**จะเห็น:**
```
✓ Ready on http://localhost:3001
```

### Production Build

```bash
npm run build
npm start
```

---

## 💻 การใช้งาน

### 1. เข้าสู่ระบบ

**เปิด Browser:**
```
http://localhost:3001
```

**Login:**
- Username: `admin`
- Password: `admin123` (ควรเปลี่ยนใน production!)

### 2. หน้า Dashboard

หลังจาก login สำเร็จ คุณจะเห็น:
- 📊 สถิติภาพรวม (ทริป, สินค้า, บทความ)
- ⚡ Quick Actions
- 📈 System Status

### 3. จัดการเนื้อหา

#### 🎒 จัดการทริป

1. คลิกเมนู **"Trips"** หรือการ์ด **"ทริป"**
2. คุณจะเห็นรายการทริปทั้งหมด
3. **เพิ่มทริปใหม่:**
   - คลิก "เพิ่มทริปใหม่"
   - กรอกข้อมูล
   - คลิก "บันทึก"
4. **แก้ไขทริป:**
   - คลิก "แก้ไข" ที่ทริปที่ต้องการ
   - แก้ไขข้อมูล
   - คลิก "บันทึก"
5. **ลบทริป:**
   - คลิก "ลบ" ที่ทริปที่ต้องการ
   - ยืนยันการลบ

#### 🛍️ จัดการสินค้า

1. คลิกเมนู **"Products"**
2. ทำแบบเดียวกับทริป

#### 📝 จัดการบทความ

1. คลิกเมนู **"Articles"**
2. ทำแบบเดียวกับทริป

---

## 🌐 การ Deploy

### Option 1: Deploy บน Vercel (แนะนำ)

**ขั้นตอน:**

1. **ติดตั้ง Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Login Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy Admin Panel:**
   ```bash
   cd admin
   vercel --prod
   ```

4. **ตั้งค่า Environment Variables:**
   - ไปที่ Vercel Dashboard
   - เลือก Project
   - Settings > Environment Variables
   - เพิ่ม env vars จาก `.env.local`

5. **Custom Domain (ถ้าต้องการ):**
   ```
   admin.greenbluerestbangkok.com
   ```

### Option 2: Deploy แบบ Static

Admin Panel เป็น Next.js App ต้อง deploy แบบ serverless หรือ SSR

**ไม่สามารถ deploy แบบ static HTML ได้**

---

## 🔐 การสร้าง User ใหม่

ตอนนี้ระบบใช้ hardcoded admin user

**ถ้าต้องการ User Management แบบเต็มรูป:**

### Step 1: สร้าง Users Table

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'editor',
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Step 2: เพิ่ม User

```sql
INSERT INTO users (email, password_hash, full_name, role)
VALUES (
  'admin@greenbluerestbangkok.com',
  '$2a$10$...',  -- hashed password
  'Administrator',
  'admin'
);
```

---

## 🔍 Troubleshooting

### ❌ Problem 1: `npm install` ล้มเหลว

**วิธีแก้:**
```bash
# ลบ node_modules และ lock file
rm -rf node_modules package-lock.json

# ติดตั้งใหม่
npm install
```

### ❌ Problem 2: Port 3001 ถูกใช้แล้ว

**วิธีแก้:**
```bash
# หา process ที่ใช้ port
lsof -ti:3001

# Kill process
kill -9 $(lsof -ti:3001)

# หรือเปลี่ยน port
npm run dev -- -p 3002
```

### ❌ Problem 3: Supabase Connection Error

**ตรวจสอบ:**
1. ✅ SUPABASE_URL ถูกต้องหรือไม่
2. ✅ SUPABASE_ANON_KEY ถูกต้องหรือไม่
3. ✅ Internet connection
4. ✅ Supabase Project ยังทำงานอยู่หรือไม่

### ❌ Problem 4: Login ไม่ได้

**วิธีแก้:**
1. ตรวจสอบ JWT_SECRET มีค่าหรือไม่
2. ลอง clear cookies
3. ลอง incognito mode

### ❌ Problem 5: ทริปไม่แสดง

**ตรวจสอบ:**
1. มีข้อมูลใน Supabase หรือไม่
2. ทริปมี status = 'published' หรือไม่
3. เปิด DevTools Console ดู errors

---

## 📱 Features ที่พร้อมใช้งาน

### ✅ ฟีเจอร์พื้นฐาน
- ✅ Authentication (Login/Logout)
- ✅ Dashboard with Statistics
- ✅ CRUD Trips
- ✅ CRUD Products
- ✅ CRUD Articles
- ✅ CRUD Videos

### ✅ ฟีเจอร์ขั้นสูง (ที่เพิ่มแล้ว)
- ✅ Bulk Operations
- ✅ Image Uploader
- ✅ SEO Editor
- ✅ Analytics Dashboard

### ⏳ ฟีเจอร์ที่อาจต้องการเพิ่ม (Optional)
- ⏳ User Management (หลาย users)
- ⏳ Role-based Access Control
- ⏳ Activity Logs
- ⏳ Email Notifications
- ⏳ Scheduled Publishing

---

## 🎯 Quick Start Checklist

ใช้ Checklist นี้เพื่อเริ่มต้น:

- [ ] **ติดตั้ง Node.js & npm**
- [ ] **Clone repository**
- [ ] **`cd admin`**
- [ ] **`npm install`**
- [ ] **สร้างไฟล์ `.env.local`**
- [ ] **ใส่ Supabase credentials**
- [ ] **`npm run dev`**
- [ ] **เปิด http://localhost:3001**
- [ ] **Login ด้วย admin/admin123**
- [ ] **เพิ่มทริปทดสอบ**
- [ ] **ตรวจสอบว่าแสดงบนเว็บหลัก**

---

## 📚 เอกสารเพิ่มเติม

- 📖 [CMS User Guide](../CMS_USER_GUIDE.md) - คู่มือใช้งาน CMS
- 📘 [README](../README.md) - เอกสารหลักโปรเจกต์
- 🔧 [Troubleshooting](../TROUBLESHOOTING_TRIPS_NOT_SHOWING.md) - แก้ปัญหาทั่วไป

---

## 🆘 ต้องการความช่วยเหลือ?

- 📧 Email: admin@greenbluerestbangkok.com
- 📱 Line: @greenbluerestbangkok
- 📞 Tel: 08x-xxx-xxxx

---

## 💡 Tips

### Tip 1: Development vs Production

**Development:**
- ใช้ `npm run dev`
- Hot reload
- Debug mode

**Production:**
- ใช้ `npm run build && npm start`
- Optimized
- Better performance

### Tip 2: Environment Variables

**อย่าเปิดเผย:**
- ❌ SUPABASE_SERVICE_ROLE_KEY
- ❌ JWT_SECRET

**ปลอดภัยที่จะเปิดเผย:**
- ✅ NEXT_PUBLIC_SUPABASE_URL
- ✅ NEXT_PUBLIC_SUPABASE_ANON_KEY

### Tip 3: การเปลี่ยน Password

**Hardcoded Password อยู่ที่:**
```typescript
// admin/app/api/auth/login/route.ts
const validUsers = {
  admin: 'admin123'  // ⬅️ เปลี่ยนที่นี่
};
```

### Tip 4: Backup ข้อมูล

**Export ข้อมูลจาก Supabase:**
1. ไปที่ SQL Editor
2. รัน: `SELECT * FROM trips;`
3. Download เป็น CSV

---

## 🎉 สรุป

**ตอนนี้คุณมี:**
- ✅ Admin Panel พร้อมใช้งาน
- ✅ เชื่อมต่อ Supabase แล้ว
- ✅ สามารถจัดการเนื้อหาได้
- ✅ พร้อม Deploy

**Next Steps:**
1. เพิ่มข้อมูลทริปจริง
2. อัปโหลดรูปภาพ
3. ทดสอบฟีเจอร์ทั้งหมด
4. Deploy ขึ้น Production

---

**Happy Coding! 🚀**

วันที่: 7 เมษายน 2025  
เวอร์ชัน: 1.0.0

