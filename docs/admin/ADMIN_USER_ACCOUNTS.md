# 👤 **Admin User Accounts**

## 🔐 **สำหรับการ Login ใน Admin Panel:**

### **📋 Test User Accounts:**

#### **1. Admin User (หลัก):**
```
Username: admin
Email: admin@greenbluerestbangkok.com
Password: admin123456
```

#### **2. Editor User:**
```
Username: editor
Email: editor@greenbluerestbangkok.com
Password: editor123456
```

#### **3. Manager User:**
```
Username: manager
Email: manager@greenbluerestbangkok.com
Password: manager123456
```

---

## 🚀 **วิธีใช้ใน Admin Panel:**

### **1. เข้า Login Page:**
```
URL: https://admin-orcin-gamma.vercel.app/login
```

### **2. ใส่ข้อมูล Login:**
- **Username หรือ Email:** `admin`
- **Password:** `admin123456`

### **3. กดปุ่ม "เข้าสู่ระบบ"**

---

## 🔧 **หาก Login ไม่ได้:**

### **สาเหตุที่เป็นไปได้:**
1. **Strapi Backend ยังไม่พร้อม**
2. **Environment Variables ยังไม่ได้ตั้งค่า**
3. **User ยังไม่ได้สร้างใน Strapi**

### **วิธีแก้ไข:**

#### **Option 1: ตั้งค่า Environment Variables ใน Vercel**
ไปที่ Vercel Dashboard → Project Settings → Environment Variables:

```env
STRAPI_URL=https://your-strapi-domain.com
STRAPI_API_TOKEN=your_strapi_api_token
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=https://admin-orcin-gamma.vercel.app
NODE_ENV=production
```

#### **Option 2: ใช้ Local Strapi**
```bash
cd greenbluerest-cms
npm install
npm start
```

#### **Option 3: สร้าง User ใน Strapi Admin**
1. เข้า Strapi Admin Panel
2. ไปที่ Settings → Users & Permissions Plugin
3. สร้าง User ใหม่

---

## 📊 **User Roles:**

### **Admin:**
- สร้าง/แก้ไข/ลบ Articles
- สร้าง/แก้ไข/ลบ Products
- สร้าง/แก้ไข/ลบ Trips
- จัดการ Users
- เข้าถึง Analytics

### **Editor:**
- สร้าง/แก้ไข Articles
- สร้าง/แก้ไข Products
- สร้าง/แก้ไข Trips
- ดู Analytics

### **Manager:**
- ดู Articles, Products, Trips
- ดู Analytics

---

## 🎯 **ขั้นตอนการ Setup:**

### **1. ตรวจสอบ Strapi Backend:**
```bash
curl http://localhost:1337/api/auth/local
```

### **2. สร้าง User (หากจำเป็น):**
```bash
curl -X POST http://localhost:1337/api/auth/local/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "admin@greenbluerestbangkok.com",
    "password": "admin123456"
  }'
```

### **3. ทดสอบ Login:**
```bash
curl -X POST http://localhost:1337/api/auth/local \
  -H "Content-Type: application/json" \
  -d '{
    "identifier": "admin",
    "password": "admin123456"
  }'
```

---

## 🆘 **Troubleshooting:**

### **หาก Admin Panel แสดง "Authentication required":**
1. ตรวจสอบ Environment Variables
2. ตรวจสอบ Strapi Backend
3. ตรวจสอบ API Token

### **หาก Login ไม่สำเร็จ:**
1. ตรวจสอบ Username/Password
2. ตรวจสอบ Strapi User Database
3. ตรวจสอบ Network Connection

---

## 🎉 **สรุป:**

### **สำหรับการทดสอบ:**
```
URL: https://admin-orcin-gamma.vercel.app/login
Username: admin
Password: admin123456
```

### **ขั้นตอนต่อไป:**
1. ตั้งค่า Strapi Backend
2. สร้าง User Accounts
3. ตั้งค่า Environment Variables ใน Vercel
4. ทดสอบ Login และ CRUD Operations

**Admin Panel พร้อมใช้งานแล้วครับ!** 🚀
