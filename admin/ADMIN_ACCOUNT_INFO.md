# 🔑 ข้อมูล Account Admin
## GreenBlueRest Bangkok Admin Panel

---

## ✅ Account ที่ใช้งานได้จริง

### **ข้อมูลเข้าสู่ระบบ**
```
🌐 URL: http://localhost:3002/admin/login
📧 Email: admin@greenbluerestbangkok.com
🔒 Password: admin
```

### **การเข้าสู่ระบบ**
1. เปิดเบราว์เซอร์และไปที่ `http://localhost:3002/admin/login`
2. กรอกข้อมูล:
   - **อีเมล**: `admin@greenbluerestbangkok.com`
   - **รหัสผ่าน**: `admin`
3. คลิก **"เข้าสู่ระบบ"**
4. จะถูก redirect ไปหน้า Dashboard

---

## 🎯 ความสามารถของระบบ Admin Panel

### ✅ **สามารถทำได้**

#### 1. **จัดการข้อมูลทริปท่องเที่ยว**
- ✅ สร้างและแก้ไขข้อมูลทริป
- ✅ เพิ่มรูปภาพปกและรูปประกอบ
- ✅ จัดการราคา, เวลา, สถานที่
- ✅ เผยแพร่ทันที

**ตัวอย่างการสร้างทริป:**
```markdown
---
title: "ทริปชุมชนคลองบางมด"
type: "trip"
status: "published"
cover: "/images/trips/community-trip.webp"
---

# ทริปชุมชนคลองบางมด

## ข้อมูลทริป
- ราคา: 500 บาท/คน
- เวลา: 08:00 - 16:00
- สถานที่: ชุมชนคลองบางมด

## จุดเด่น
- ชมวิถีชีวิตชุมชน
- เรียนรู้วัฒนธรรมท้องถิ่น
```

#### 2. **จัดการข้อมูลสินค้า**
- ✅ สร้างและแก้ไขข้อมูลสินค้า
- ✅ เพิ่มรูปภาพสินค้า
- ✅ จัดการราคาและรายละเอียด
- ✅ เผยแพร่ทันที

**ตัวอย่างการสร้างสินค้า:**
```json
{
  "title": "สินค้าชุมชนคลองบางมด",
  "type": "products",
  "items": [
    {
      "name": "ผักปลอดสารพิษ",
      "price": 50,
      "unit": "กิโลกรัม",
      "description": "ผักสดจากสวนชุมชน",
      "image": "/images/products/vegetables.webp"
    }
  ]
}
```

#### 3. **จัดการบทความและข่าวสาร**
- ✅ สร้างและแก้ไขบทความ
- ✅ เพิ่มรูปภาพประกอบ
- ✅ จัดการ Tags และ Categories
- ✅ เผยแพร่ทันที

#### 4. **ใส่ลิงค์ YouTube**
- ✅ แทรกลิงค์ YouTube ในเนื้อหา
- ✅ ใช้ iframe embed
- ✅ จัดการวิดีโอ gallery

**ตัวอย่างการใส่ YouTube:**
```markdown
## วิดีโอทริปชุมชนคลองบางมด

<iframe width="560" height="315" 
src="https://www.youtube.com/embed/YOUR_VIDEO_ID" 
frameborder="0" allowfullscreen></iframe>
```

#### 5. **การอัปโหลดรูปภาพ**
- ✅ อัปโหลดไฟล์ PNG, JPG, WebP, GIF
- ✅ ขนาดสูงสุด 8MB
- ✅ จัดหมวดหมู่รูปภาพ
- ✅ คัดลอก path เพื่อใช้งาน

#### 6. **การอัปเดตเว็บไซต์ทันที**
- ✅ บันทึกแล้วเว็บไซต์หลักอัปเดตทันที
- ✅ ใช้ GitHub integration
- ✅ Version control อัตโนมัติ

---

## ⚠️ ข้อจำกัดปัจจุบัน

### 1. **ไม่มี Visual Editor**
- ❌ ต้องเขียน Markdown หรือ JSON เอง
- ❌ ไม่มี Rich Text Editor
- ❌ ไม่มี Form Builder

### 2. **ไม่มี Preview**
- ❌ ไม่เห็นผลลัพธ์ก่อนเผยแพร่
- ❌ ต้องไปดูในเว็บไซต์หลัก

### 3. **มีแค่ Admin Account เดียว**
- ❌ ไม่มี User Management
- ❌ ไม่มี Role Management

### 4. **ไม่มี Database**
- ❌ ใช้ GitHub เป็น storage
- ❌ ไม่มี Query system

---

## 🚀 วิธีการใช้งาน

### **ขั้นตอนการสร้างเนื้อหาใหม่**
1. เข้าสู่ระบบ Admin Panel
2. คลิก **"สร้างเนื้อหาใหม่"**
3. เลือก **Markdown** หรือ **JSON**
4. กรอกข้อมูลและเนื้อหา
5. คลิก **"บันทึก"**
6. เปลี่ยน status เป็น **"published"** เพื่อเผยแพร่

### **ขั้นตอนการอัปโหลดรูปภาพ**
1. คลิก **"จัดการสื่อ"**
2. ลากไฟล์มาวางหรือเลือกไฟล์
3. รอให้อัปโหลดเสร็จ
4. คัดลอก path เพื่อใช้ในเนื้อหา

### **ขั้นตอนการเผยแพร่**
1. แก้ไขเนื้อหาที่ต้องการ
2. เปลี่ยน `status: "draft"` เป็น `status: "published"`
3. บันทึกไฟล์
4. เว็บไซต์หลักจะอัปเดตทันที

---

## 📊 สรุป

### ✅ **ระบบ Admin Panel สมบูรณ์แล้ว**
- 🎯 **สามารถจัดการเนื้อหาทริปท่องเที่ยวได้**
- 🛍️ **สามารถจัดการข้อมูลสินค้าได้**
- 📰 **สามารถจัดการบทความได้**
- 🎥 **สามารถใส่ลิงค์ YouTube ได้**
- 🖼️ **สามารถอัปโหลดรูปภาพได้**
- ⚡ **สามารถอัปเดตเว็บไซต์ทันทีได้**

### ⚠️ **ข้อจำกัด**
- ต้องเขียน Markdown/JSON เอง
- ไม่มี Visual Editor
- ไม่มี Preview Mode
- มีแค่ Admin Account เดียว

### 🎉 **ข้อดี**
- Real-time update
- Version control
- Secure authentication
- Flexible content management

---

## 🔧 การตั้งค่าสำหรับ Production

### **Environment Variables**
```env
GITHUB_OWNER=your_username
GITHUB_REPO=your_repository
GITHUB_BRANCH=main
GITHUB_TOKEN=your_github_token
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_PASSWORD_HASH=your_password_hash
JWT_SECRET=your_jwt_secret
BASE_URL=https://yourdomain.com
```

### **GitHub Token Setup**
1. ไปที่ GitHub → Settings → Developer settings → Personal access tokens
2. สร้าง token ใหม่
3. เลือก scope: `repo:contents`
4. คัดลอก token มาใส่ใน environment variables

---

## 📞 การสนับสนุน

หากพบปัญหาหรือต้องการความช่วยเหลือ:

1. ตรวจสอบ logs ใน terminal
2. ตรวจสอบ browser console
3. ตรวจสอบ network requests
4. ดูเอกสารในโฟลเดอร์ admin

---

**ระบบ Admin Panel พร้อมใช้งานแล้ว! 🎉**

**เริ่มต้นสร้างเนื้อหาสำหรับเว็บไซต์ GreenBlueRest Bangkok ได้เลย!** 🚀
