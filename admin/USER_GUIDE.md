# 📖 คู่มือการใช้งาน Admin Panel
## GreenBlueRest Bangkok

---

## 🎯 ภาพรวม

Admin Panel เป็นระบบจัดการเนื้อหาและสื่อสำหรับเว็บไซต์ GreenBlueRest Bangkok ที่ช่วยให้คุณสามารถ:

- ✅ จัดการเนื้อหาบทความและข้อมูล
- ✅ อัปโหลดและจัดการไฟล์ภาพ
- ✅ ตรวจสอบสถิติการใช้งาน
- ✅ เผยแพร่เนื้อหาออนไลน์

---

## 🚀 เริ่มต้นใช้งาน

### 1. เข้าสู่ระบบ

1. เปิดเบราว์เซอร์และไปที่: `http://localhost:3002/admin/login`
2. ใส่ข้อมูลเข้าสู่ระบบ:
   - **อีเมล**: `admin@greenbluerestbangkok.com`
   - **รหัสผ่าน**: `admin`
3. คลิก **"เข้าสู่ระบบ"**

### 2. หน้าแรก (Dashboard)

หลังจากเข้าสู่ระบบ คุณจะเห็นหน้า Dashboard ที่แสดง:

- 📊 **สถิติเนื้อหา**: จำนวนบทความทั้งหมด, เผยแพร่แล้ว, ร่าง
- 📁 **สถิติสื่อ**: จำนวนไฟล์ภาพทั้งหมด
- ⚡ **การดำเนินการด่วน**: ปุ่มลัดไปยังหน้าที่ใช้งานบ่อย
- 🕒 **ไฟล์ล่าสุด**: รายการไฟล์ที่แก้ไขล่าสุด

---

## 📝 จัดการเนื้อหา

### 1. ดูเนื้อหาทั้งหมด

1. คลิก **"ดูเนื้อหาทั้งหมด"** ในหน้า Dashboard
2. หรือไปที่: `http://localhost:3002/admin/content`

คุณจะเห็นตารางแสดง:
- ชื่อไฟล์
- ประเภท (Markdown หรือ JSON)
- วันที่แก้ไขล่าสุด
- การดำเนินการ (แก้ไข/ลบ)

### 2. สร้างเนื้อหาใหม่

#### สร้างบทความ Markdown

1. คลิก **"สร้างเนื้อหาใหม่"** ในหน้า Dashboard
2. หรือไปที่: `http://localhost:3002/admin/content/new`
3. เลือกแท็บ **"Markdown"**
4. กรอกข้อมูล:

```
Title: ชื่อบทความ
Date: วันที่ (YYYY-MM-DD)
Tags: คำสำคัญ (คั่นด้วยจุลภาค)
Status: draft หรือ published
Cover: URL รูปภาพปก (ถ้ามี)
```

5. เขียนเนื้อหาในช่อง **Body**
6. คลิก **"บันทึก"**

#### สร้างข้อมูล JSON

1. เลือกแท็บ **"JSON"**
2. เขียนข้อมูลในรูปแบบ JSON:

```json
{
  "title": "ชื่อข้อมูล",
  "description": "คำอธิบาย",
  "data": {
    "key": "value"
  }
}
```

3. คลิก **"บันทึก"**

### 3. แก้ไขเนื้อหา

1. ไปที่หน้า **"ดูเนื้อหาทั้งหมด"**
2. คลิก **"แก้ไข"** ข้างไฟล์ที่ต้องการ
3. แก้ไขข้อมูลตามต้องการ
4. คลิก **"บันทึก"**

### 4. ลบเนื้อหา

1. ไปที่หน้า **"ดูเนื้อหาทั้งหมด"**
2. คลิก **"ลบ"** ข้างไฟล์ที่ต้องการ
3. ยืนยันการลบ

---

## 🖼️ จัดการสื่อ

### 1. เข้าสู่หน้า Media

1. คลิก **"จัดการสื่อ"** ในหน้า Dashboard
2. หรือไปที่: `http://localhost:3002/admin/media`

### 2. อัปโหลดไฟล์

#### วิธีที่ 1: Drag & Drop

1. ลากไฟล์ภาพจากเครื่องคอมพิวเตอร์
2. วางลงในพื้นที่ **"อัปโหลดไฟล์"**
3. ระบบจะอัปโหลดอัตโนมัติ

#### วิธีที่ 2: เลือกไฟล์

1. คลิก **"เลือกไฟล์"**
2. เลือกไฟล์ภาพที่ต้องการ
3. คลิก **"อัปโหลด"**

### 3. ไฟล์ที่รองรับ

- ✅ **PNG**: รูปภาพแบบ PNG
- ✅ **JPG/JPEG**: รูปภาพแบบ JPG
- ✅ **WebP**: รูปภาพแบบ WebP (แนะนำ)
- ✅ **GIF**: รูปภาพเคลื่อนไหว

### 4. ขนาดไฟล์

- 📏 **ขนาดสูงสุด**: 8 MB ต่อไฟล์
- 🎯 **แนะนำ**: ใช้ WebP สำหรับประสิทธิภาพที่ดีที่สุด

### 5. จัดการไฟล์

#### คัดลอก Path

1. คลิก **"คัดลอก"** ข้างไฟล์ที่ต้องการ
2. Path จะถูกคัดลอกไปยัง clipboard
3. ใช้ path นี้ในการอ้างอิงรูปภาพในเนื้อหา

#### ลบไฟล์

1. คลิก **"ลบ"** ข้างไฟล์ที่ต้องการ
2. ยืนยันการลบ

---

## 🔧 การตั้งค่าและแก้ไขปัญหา

### 1. Environment Variables

ตรวจสอบไฟล์ `.env.local` มีการตั้งค่าถูกต้อง:

```env
GITHUB_OWNER=nattagid
GITHUB_REPO=greenbluerestbangkok
GITHUB_BRANCH=main
GITHUB_TOKEN=your_github_token
ADMIN_EMAIL=admin@greenbluerestbangkok.com
ADMIN_PASSWORD_HASH=your_password_hash
JWT_SECRET=your_jwt_secret
BASE_URL=http://localhost:3002
```

### 2. สร้าง Password Hash

```bash
cd /Users/nattagid/GitHub/greenbluerestbangkok/admin
node -e "const bcrypt=require('bcryptjs');(async()=>{console.log(await bcrypt.hash('your_password',12));})();"
```

### 3. GitHub Token Setup

1. ไปที่ GitHub → Settings → Developer settings → Personal access tokens
2. สร้าง token ใหม่
3. เลือก scope: `repo:contents`
4. คัดลอก token มาใส่ใน `.env.local`

### 4. การแก้ไขปัญหา

#### ปัญหา: เข้าสู่ระบบไม่ได้

**วิธีแก้:**
1. ตรวจสอบ `.env.local` ว่ามี `ADMIN_EMAIL` และ `ADMIN_PASSWORD_HASH`
2. ตรวจสอบ password hash ถูกต้อง
3. Restart dev server

#### ปัญหา: ไม่สามารถอัปโหลดไฟล์ได้

**วิธีแก้:**
1. ตรวจสอบ GitHub token มี permission `repo:contents`
2. ตรวจสอบขนาดไฟล์ไม่เกิน 8MB
3. ตรวจสอบประเภทไฟล์เป็น image เท่านั้น

#### ปัญหา: ไม่สามารถบันทึกเนื้อหาได้

**วิธีแก้:**
1. ตรวจสอบ GitHub token ถูกต้อง
2. ตรวจสอบ path ไม่มีอักขระพิเศษ
3. ตรวจสอบ JSON format ถูกต้อง

---

## 📚 คำแนะนำการใช้งาน

### 1. การจัดการเนื้อหา

#### การตั้งชื่อไฟล์

```
/content/trips/community-trips.md
/content/guides/low-carbon-tourism.md
/content/products/community-products.json
```

#### Frontmatter สำหรับ Markdown

```yaml
---
title: "ชื่อบทความ"
date: "2024-01-15"
tags: ["ท่องเที่ยว", "ชุมชน", "คลองบางมด"]
status: "published"
cover: "/images/cover/trip-cover.webp"
---
```

### 2. การจัดการสื่อ

#### การตั้งชื่อไฟล์

```
/public/images/trips/trip1-main.webp
/public/images/products/product1-main.webp
/public/images/hero/hero-main.webp
```

#### การอ้างอิงรูปภาพ

```markdown
![ชื่อรูปภาพ](/images/trips/trip1-main.webp)
```

### 3. การเผยแพร่

#### เปลี่ยนสถานะเป็น Published

1. แก้ไขไฟล์ Markdown
2. เปลี่ยน `status: "draft"` เป็น `status: "published"`
3. บันทึกไฟล์

#### ตรวจสอบการเผยแพร่

1. ไปที่เว็บไซต์หลัก: `https://greenbluerestbangkok.com`
2. ตรวจสอบเนื้อหาใหม่ปรากฏหรือไม่

---

## 🔒 ความปลอดภัย

### 1. การเข้าถึง

- ✅ Admin Panel มีการป้องกันด้วย authentication
- ✅ ใช้ JWT token สำหรับ session management
- ✅ Cookies มีการตั้งค่า `HttpOnly`, `Secure`, `SameSite=strict`

### 2. การจัดการไฟล์

- ✅ ตรวจสอบประเภทไฟล์ก่อนอัปโหลด
- ✅ จำกัดขนาดไฟล์ไม่เกิน 8MB
- ✅ ป้องกัน path traversal attacks

### 3. การจัดการเนื้อหา

- ✅ ตรวจสอบ path อยู่ใน `/content/` เท่านั้น
- ✅ Validate JSON format ก่อนบันทึก
- ✅ ใช้ SHA สำหรับ tracking changes

---

## 📞 การสนับสนุน

### 1. เอกสารเพิ่มเติม

- 📖 **README_admin.md**: คู่มือการติดตั้งและตั้งค่า
- 🧪 **TEST_PLAN.md**: แผนการทดสอบ
- 🚀 **DEPLOYMENT_GUIDE.md**: คู่มือการ deploy

### 2. การติดต่อ

หากพบปัญหาหรือต้องการความช่วยเหลือ:

1. ตรวจสอบ logs ใน terminal
2. ตรวจสอบ browser console
3. ตรวจสอบ network requests
4. ดูเอกสารใน GitHub repository

### 3. การอัปเดต

```bash
cd /Users/nattagid/GitHub/greenbluerestbangkok/admin
git pull origin main
npm install
npm run dev
```

---

## 🎉 สรุป

Admin Panel ของ GreenBlueRest Bangkok เป็นเครื่องมือที่ทรงพลังสำหรับการจัดการเนื้อหาและสื่อ โดยมีคุณสมบัติ:

- 🎨 **Design สวยงาม**: สอดคล้องกับเว็บไซต์หลัก
- 🚀 **ใช้งานง่าย**: Interface ที่เข้าใจง่าย
- 🔒 **ปลอดภัย**: มีการป้องกันที่ครบถ้วน
- 📱 **Responsive**: ใช้งานได้ในทุกอุปกรณ์
- 🌐 **Real-time**: อัปเดตเนื้อหาได้ทันที

**เริ่มต้นใช้งานวันนี้และทำให้เว็บไซต์ GreenBlueRest Bangkok มีเนื้อหาที่สดใหม่และน่าสนใจ!** 🎊

---

*คู่มือนี้สร้างขึ้นสำหรับ Admin Panel v1.0 - GreenBlueRest Bangkok*
