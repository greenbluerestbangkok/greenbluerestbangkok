# 🚀 GreenBlueRest Bangkok - Admin Panel System

## 📋 **ภาพรวมระบบ**

ระบบ Admin Panel ที่สมบูรณ์แบบสำหรับการจัดการเว็บไซต์ GreenBlueRest Bangkok โดยมีฟีเจอร์ครบครันและเชื่อมต่อกันทั้งหมดแบบมืออาชีพ

## ✨ **ฟีเจอร์หลัก**

### 🔐 **ระบบความปลอดภัย**
- **JWT Authentication** - ระบบยืนยันตัวตนที่ปลอดภัย
- **Role-based Access Control** - ควบคุมสิทธิ์ตามบทบาท
- **Password Hashing** - เข้ารหัสรหัสผ่านด้วย bcrypt
- **Session Management** - จัดการเซสชันผู้ใช้

### 📊 **การจัดการข้อมูล**
- **ทริปท่องเที่ยว** - เพิ่ม/แก้ไข/ลบ/ดูข้อมูลทริป
- **สินค้าชุมชน** - จัดการสินค้าต่างๆ
- **บทความ** - ระบบจัดการเนื้อหา
- **ผู้ประกอบการ** - จัดการข้อมูลพันธมิตร
- **การตั้งค่าเว็บไซต์** - ข้อมูลพื้นฐานและติดต่อ

### 🖼️ **การจัดการไฟล์**
- **อัปโหลดรูปภาพ** - รองรับไฟล์ขนาดใหญ่ (10MB)
- **จัดการโลโก้** - สำหรับผู้ประกอบการ
- **File Manager** - จัดการไฟล์ที่อัปโหลด
- **Auto-cleanup** - ลบไฟล์ที่ไม่ใช้

### 🔄 **ระบบ Real-time**
- **Auto-refresh** - อัปเดตข้อมูลทุก 30 วินาที
- **WebSocket Support** - การเชื่อมต่อแบบ Real-time
- **Live Updates** - แจ้งเตือนการเปลี่ยนแปลงทันที
- **Performance Monitoring** - ติดตามประสิทธิภาพ

### 🛡️ **ฟีเจอร์ขั้นสูง**
- **Data Validation** - ตรวจสอบความถูกต้องของข้อมูล
- **Auto-save** - บันทึกอัตโนมัติทุก 5 นาที
- **Error Handling** - จัดการข้อผิดพลาดแบบครอบคลุม
- **Backup & Restore** - สำรองและกู้คืนข้อมูล
- **Audit Log** - บันทึกการทำงานทั้งหมด

## 🏗️ **สถาปัตยกรรมระบบ**

### **Frontend (Admin Panel)**
- **HTML5** - โครงสร้างหน้าเว็บ
- **CSS3** - การออกแบบที่สวยงามและ Responsive
- **JavaScript ES6+** - ฟังก์ชันการทำงานแบบ Modern
- **Font Awesome** - ไอคอนที่สวยงาม

### **Backend (Node.js)**
- **Express.js** - Web Framework
- **JWT** - การยืนยันตัวตน
- **Multer** - จัดการไฟล์อัปโหลด
- **fs-extra** - จัดการไฟล์ระบบ
- **Helmet** - ความปลอดภัย HTTP Headers

### **Database**
- **In-Memory Storage** - เก็บข้อมูลในหน่วยความจำ
- **File System** - บันทึกลงไฟล์ JavaScript และ HTML
- **Backup System** - สำรองข้อมูลอัตโนมัติ

## 🚀 **การติดตั้งและใช้งาน**

### **1. ติดตั้ง Dependencies**
```bash
npm install
```

### **2. สร้างโฟลเดอร์ที่จำเป็น**
```bash
mkdir uploads
mkdir backups
mkdir logs
```

### **3. รัน Backend Server**
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

### **4. เข้าถึง Admin Panel**
```
http://localhost:3000/admin-panel.html
```

## 🔑 **ข้อมูลล็อกอิน**

| Username | Password | Role | สิทธิ์ |
|----------|----------|------|--------|
| `admin` | `admin123` | Admin | เต็มรูปแบบ |
| `manager` | `manager123` | Manager | จัดการข้อมูล |
| `editor` | `editor123` | Editor | แก้ไขเนื้อหา |

## 📱 **การใช้งานระบบ**

### **Dashboard**
- ดูภาพรวมข้อมูลทั้งหมด
- สถิติการใช้งาน
- สถานะระบบ
- การแจ้งเตือน

### **จัดการทริป**
- เพิ่มทริปใหม่
- แก้ไขข้อมูลทริป
- ลบทริป
- ดูรายการทริปทั้งหมด

### **จัดการสินค้า**
- เพิ่มสินค้าใหม่
- แก้ไขข้อมูลสินค้า
- จัดหมวดหมู่สินค้า
- จัดการสถานะสินค้า

### **จัดการบทความ**
- เขียนบทความใหม่
- แก้ไขเนื้อหา
- จัดหมวดหมู่
- จัดการสถานะการเผยแพร่

### **จัดการผู้ประกอบการ**
- เพิ่มพันธมิตรใหม่
- อัปโหลดโลโก้
- จัดการข้อมูลติดต่อ
- ติดตามสถานะความร่วมมือ

### **การตั้งค่า**
- ข้อมูลเว็บไซต์
- ข้อมูลติดต่อ
- Social Media
- การตั้งค่าระบบ

## 🔧 **API Endpoints**

### **Authentication**
- `POST /api/auth/login` - เข้าสู่ระบบ
- `GET /api/auth/me` - ข้อมูลผู้ใช้ปัจจุบัน

### **Data Management**
- `GET /api/trips` - ดึงข้อมูลทริป
- `POST /api/trips` - เพิ่ม/แก้ไขทริป
- `DELETE /api/trips/:id` - ลบทริป

- `GET /api/products` - ดึงข้อมูลสินค้า
- `POST /api/products` - เพิ่ม/แก้ไขสินค้า
- `DELETE /api/products/:id` - ลบสินค้า

- `GET /api/articles` - ดึงข้อมูลบทความ
- `POST /api/articles` - เพิ่ม/แก้ไขบทความ
- `DELETE /api/articles/:id` - ลบบทความ

- `GET /api/partners` - ดึงข้อมูลผู้ประกอบการ
- `POST /api/partners` - เพิ่ม/แก้ไขผู้ประกอบการ
- `DELETE /api/partners/:id` - ลบผู้ประกอบการ

### **File Management**
- `POST /api/upload/image` - อัปโหลดรูปภาพ
- `POST /api/upload/logo` - อัปโหลดโลโก้
- `GET /api/files` - ดูไฟล์ทั้งหมด
- `DELETE /api/files/:filename` - ลบไฟล์

### **System**
- `GET /api/dashboard` - ข้อมูล Dashboard
- `GET /api/analytics` - สถิติและวิเคราะห์
- `GET /api/health` - สถานะระบบ
- `POST /api/backup` - สร้างสำรองข้อมูล
- `POST /api/restore` - กู้คืนข้อมูล

## 📁 **โครงสร้างไฟล์**

```
community-trip-website/
├── admin-panel.html          # หน้า Admin Panel
├── admin-panel.css           # สไตล์ Admin Panel
├── admin-panel.js            # JavaScript Admin Panel
├── server.js                 # Backend Server
├── package.json              # Dependencies
├── .gitignore               # Git ignore rules
├── uploads/                 # ไฟล์ที่อัปโหลด
├── backups/                 # ไฟล์สำรองข้อมูล
├── logs/                    # ไฟล์บันทึก
├── js/                      # JavaScript files
│   ├── trip-details.js      # ข้อมูลทริป
│   ├── products.js          # ข้อมูลสินค้า
│   └── main.js              # JavaScript หลัก
├── css/                     # CSS files
├── images/                  # รูปภาพ
└── pages/                   # หน้าต่างๆ
```

## 🚨 **การแก้ไขปัญหา**

### **ปัญหาที่พบบ่อย**

#### **1. ไม่สามารถเชื่อมต่อ Backend ได้**
```bash
# ตรวจสอบว่า Server กำลังทำงาน
npm run dev

# ตรวจสอบ Port 3000 ไม่ถูกใช้งาน
lsof -i :3000
```

#### **2. ข้อผิดพลาด CORS**
```javascript
// ตรวจสอบ CORS configuration ใน server.js
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:8000'],
    credentials: true
}));
```

#### **3. ไฟล์อัปโหลดไม่ได้**
```bash
# ตรวจสอบโฟลเดอร์ uploads
ls -la uploads/

# สร้างโฟลเดอร์ใหม่ถ้าจำเป็น
mkdir -p uploads
```

#### **4. ข้อผิดพลาด JWT**
```bash
# ล้าง Local Storage
localStorage.clear()

# ล็อกอินใหม่
```

### **การ Debug**

#### **Frontend Console**
1. กด F12 ในเบราว์เซอร์
2. ไปที่แท็บ Console
3. ดู Error Messages

#### **Backend Terminal**
1. ดู Terminal ที่รัน Server
2. ตรวจสอบ Error Logs
3. ดู Network Requests

#### **Network Tab**
1. กด F12 ในเบราว์เซอร์
2. ไปที่แท็บ Network
3. ดู API Requests และ Responses

## 🔒 **ความปลอดภัย**

### **การป้องกัน**
- **JWT Token** - ยืนยันตัวตนทุกครั้ง
- **Password Hashing** - เข้ารหัสรหัสผ่าน
- **Input Validation** - ตรวจสอบข้อมูลนำเข้า
- **CORS Protection** - ป้องกันการเข้าถึงข้ามโดเมน
- **Helmet Security** - HTTP Security Headers

### **การตรวจสอบ**
- **Token Expiration** - หมดอายุอัตโนมัติ
- **Role Verification** - ตรวจสอบสิทธิ์
- **Session Management** - จัดการเซสชัน
- **Audit Logging** - บันทึกการทำงาน

## 📈 **การพัฒนาต่อ**

### **ฟีเจอร์ที่วางแผน**
- **Real-time Chat** - แชทระหว่างผู้ใช้
- **Advanced Analytics** - กราฟและสถิติขั้นสูง
- **Email Notifications** - แจ้งเตือนทางอีเมล
- **Mobile App** - แอปมือถือ
- **Multi-language** - รองรับหลายภาษา
- **API Documentation** - เอกสาร API

### **การปรับปรุงประสิทธิภาพ**
- **Database Integration** - เชื่อมต่อฐานข้อมูลจริง
- **Caching System** - ระบบแคช
- **Load Balancing** - กระจายโหลด
- **CDN Integration** - กระจายเนื้อหา

## 📞 **การติดต่อและสนับสนุน**

### **ทีมพัฒนา**
- **Lead Developer** - GreenBlueRest Team
- **Email** - dev@greenbluerestbangkok.com
- **Support** - support@greenbluerestbangkok.com

### **เอกสารเพิ่มเติม**
- **API Documentation** - `/api/docs`
- **User Manual** - `/docs/user-manual`
- **Developer Guide** - `/docs/developer-guide`

## 📄 **ลิขสิทธิ์**

© 2025 GreenBlueRest Bangkok. All rights reserved.

---

**เวอร์ชัน**: 1.0.0  
**อัปเดตล่าสุด**: มกราคม 2025  
**สถานะ**: Production Ready 🚀
