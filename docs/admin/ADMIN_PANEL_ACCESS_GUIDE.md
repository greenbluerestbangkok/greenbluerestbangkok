# 🔐 **Admin Panel Access Guide**

## 🚀 **Admin Panel URLs:**

### **✅ Production URL (Updated):**
```
https://admin-bw558prv2-greenbluerestbangkoks-projects.vercel.app
```

### **🔗 Direct Login URL:**
```
https://admin-bw558prv2-greenbluerestbangkoks-projects.vercel.app/admin/login
```

### **🏠 Dashboard URL:**
```
https://admin-bw558prv2-greenbluerestbangkoks-projects.vercel.app/admin
```

---

## 📋 **ขั้นตอนการเข้าถึง:**

### **🔧 ขั้นตอนที่ 1: เข้าสู่ระบบ**

1. เปิดเว็บเบราว์เซอร์
2. ไปที่: **https://admin-bw558prv2-greenbluerestbangkoks-projects.vercel.app/admin/login**
3. กรอกข้อมูล:
   - **Email:** `admin@greenbluerestbangkok.com`
   - **Password:** `admin123456`
4. คลิก **เข้าสู่ระบบ**

### **🔧 ขั้นตอนที่ 2: สร้าง Admin User ใน Supabase (หากยังไม่ได้สร้าง)**

1. ไปที่ [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. เลือกโปรเจ็กต์ `greenbluerestbangkok`
3. ไปที่ **Authentication** → **Users**
4. คลิก **Add user**
5. กรอกข้อมูล:
   - **Email:** `admin@greenbluerestbangkok.com`
   - **Password:** `admin123456`
   - **Email Confirmed:** ✅

---

## 🎯 **ผลลัพธ์ที่คาดหวัง:**

### **✅ หลังเข้าสู่ระบบสำเร็จ:**
- ✅ ถูก redirect ไปที่ Dashboard
- ✅ แสดงข้อมูลสถิติ
- ✅ สามารถเข้าถึงเมนูต่างๆ ได้:
  - 📝 จัดการบทความ
  - 🧭 จัดการทริป
  - 🛍️ จัดการสินค้า
  - 🎥 จัดการวิดีโอ
  - 🏢 จัดการผู้ประกอบการ

---

## 🔧 **การแก้ไขปัญหา:**

### **❌ Error: "404 This page could not be found"**
- ✅ **แก้ไขแล้ว:** อัปเดต basePath ใน Next.js config
- ✅ **URL ใหม่:** https://admin-bw558prv2-greenbluerestbangkoks-projects.vercel.app

### **❌ Error: "Invalid credentials"**
- ตรวจสอบว่า admin user ถูกสร้างใน Supabase แล้ว
- ตรวจสอบ email และ password ว่าถูกต้อง

### **❌ Error: "Authentication failed"**
- ตรวจสอบ Supabase connection
- ตรวจสอบ environment variables

---

## 📱 **Navigation Menu:**

### **🏠 Dashboard:**
- `/admin` - หน้าหลัก Dashboard

### **📝 Content Management:**
- `/admin/articles` - จัดการบทความ
- `/admin/trips` - จัดการทริปท่องเที่ยว
- `/admin/products` - จัดการสินค้า
- `/admin/videos` - จัดการวิดีโอ
- `/admin/entrepreneurs` - จัดการผู้ประกอบการ

### **⚙️ System:**
- `/admin/settings` - การตั้งค่า
- `/admin/login` - เข้าสู่ระบบ
- `/admin/logout` - ออกจากระบบ

---

## 🔑 **ข้อมูลเข้าสู่ระบบ:**

```
Email: admin@greenbluerestbangkok.com
Password: admin123456
```

---

## 🆘 **การติดต่อ:**

หากพบปัญหา:
- **Email:** support@greenbluerestbangkok.com
- **Supabase Dashboard:** [https://supabase.com/dashboard](https://supabase.com/dashboard)
- **Vercel Dashboard:** [https://vercel.com/dashboard](https://vercel.com/dashboard)

---

**🎉 Admin Panel พร้อมใช้งานแล้ว! 🚀**
