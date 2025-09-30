# ⚡ Quick Start Guide
## Admin Panel - GreenBlueRest Bangkok

---

## 🎯 เริ่มต้นใช้งานใน 5 นาที

### 1. เข้าสู่ระบบ
```
URL: http://localhost:3002/admin/login
Email: admin@greenbluerestbangkok.com
Password: admin
```

### 2. หน้าแรก Dashboard
- 📊 ดูสถิติเนื้อหาและสื่อ
- ⚡ ใช้ปุ่มลัดสำหรับการดำเนินการด่วน

### 3. สร้างเนื้อหาใหม่
```
1. คลิก "สร้างเนื้อหาใหม่"
2. เลือก Markdown หรือ JSON
3. กรอกข้อมูลและบันทึก
```

### 4. อัปโหลดรูปภาพ
```
1. คลิก "จัดการสื่อ"
2. ลากไฟล์ลงในพื้นที่อัปโหลด
3. คัดลอก path เพื่อใช้ในเนื้อหา
```

### 5. เผยแพร่เนื้อหา
```
1. แก้ไขไฟล์ Markdown
2. เปลี่ยน status: "published"
3. บันทึกไฟล์
```

---

## 🔧 การตั้งค่าที่จำเป็น

### Environment Variables (.env.local)
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

### สร้าง Password Hash
```bash
node -e "const bcrypt=require('bcryptjs');(async()=>{console.log(await bcrypt.hash('your_password',12));})();"
```

---

## 🚨 แก้ไขปัญหาด่วน

### เข้าสู่ระบบไม่ได้
- ✅ ตรวจสอบ `.env.local`
- ✅ ตรวจสอบ password hash
- ✅ Restart dev server

### อัปโหลดไฟล์ไม่ได้
- ✅ ตรวจสอบ GitHub token
- ✅ ตรวจสอบขนาดไฟล์ ≤ 8MB
- ✅ ตรวจสอบประเภทไฟล์เป็น image

### บันทึกเนื้อหาไม่ได้
- ✅ ตรวจสอบ GitHub token
- ✅ ตรวจสอบ JSON format
- ✅ ตรวจสอบ path ไม่มีอักขระพิเศษ

---

## 📚 เอกสารเพิ่มเติม

- 📖 **USER_GUIDE.md**: คู่มือการใช้งานแบบละเอียด
- 🔧 **README_admin.md**: คู่มือการติดตั้งและตั้งค่า
- 🧪 **TEST_PLAN.md**: แผนการทดสอบ
- 🚀 **DEPLOYMENT_GUIDE.md**: คู่มือการ deploy

---

**พร้อมใช้งานแล้ว! 🎉**
