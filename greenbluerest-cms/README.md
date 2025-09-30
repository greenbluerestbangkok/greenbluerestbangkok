# 🌿 GreenBlueRest CMS

ระบบจัดการเนื้อหา (Content Management System) สำหรับเว็บไซต์ GreenBlueRest Bangkok

## ✨ คุณสมบัติ

### 📋 Content Types
- **ทริปท่องเที่ยว (Trips)** - จัดการข้อมูลทริปท่องเที่ยวชุมชน
- **สินค้าชุมชน (Products)** - จัดการสินค้าจากชุมชนท้องถิ่น
- **บทความ (Articles)** - จัดการบทความและเนื้อหาต่างๆ
- **วิดีโอ (Videos)** - จัดการวิดีโอและสื่อมัลติมีเดีย
- **ผู้ประกอบการ (Entrepreneurs)** - จัดการข้อมูลผู้ประกอบการในชุมชน

### 🔧 Technical Features
- **Database**: SQLite (ง่ายต่อการติดตั้งและใช้งาน)
- **File Upload**: รองรับการอัปโหลดรูปภาพ
- **REST API**: API endpoints สำหรับจัดการข้อมูล
- **Admin Panel**: หน้าจัดการที่ใช้งานง่าย
- **Responsive Design**: รองรับการใช้งานบนมือถือ

## 🚀 การติดตั้งและใช้งาน

### 1. ติดตั้ง Dependencies
```bash
npm install
```

### 2. เริ่มต้นเซิร์ฟเวอร์
```bash
npm start
```

### 3. เข้าถึงระบบ
- **Admin Panel**: http://localhost:1337/admin
- **API Endpoints**: http://localhost:1337/api/

## 📡 API Endpoints

### ทริปท่องเที่ยว (Trips)
- `GET /api/trips` - ดูทริปทั้งหมด
- `GET /api/trips/:id` - ดูทริปตาม ID
- `POST /api/trips` - เพิ่มทริปใหม่
- `PUT /api/trips/:id` - แก้ไขทริป
- `DELETE /api/trips/:id` - ลบทริป

### สินค้าชุมชน (Products)
- `GET /api/products` - ดูสินค้าทั้งหมด
- `POST /api/products` - เพิ่มสินค้าใหม่
- `PUT /api/products/:id` - แก้ไขสินค้า
- `DELETE /api/products/:id` - ลบสินค้า

### บทความ (Articles)
- `GET /api/articles` - ดูบทความทั้งหมด
- `POST /api/articles` - เพิ่มบทความใหม่
- `PUT /api/articles/:id` - แก้ไขบทความ
- `DELETE /api/articles/:id` - ลบบทความ

### วิดีโอ (Videos)
- `GET /api/videos` - ดูวิดีโอทั้งหมด
- `POST /api/videos` - เพิ่มวิดีโอใหม่
- `PUT /api/videos/:id` - แก้ไขวิดีโอ
- `DELETE /api/videos/:id` - ลบวิดีโอ

### ผู้ประกอบการ (Entrepreneurs)
- `GET /api/entrepreneurs` - ดูผู้ประกอบการทั้งหมด
- `POST /api/entrepreneurs` - เพิ่มผู้ประกอบการใหม่
- `PUT /api/entrepreneurs/:id` - แก้ไขผู้ประกอบการ
- `DELETE /api/entrepreneurs/:id` - ลบผู้ประกอบการ

## 🗄️ ฐานข้อมูล

### Schema ของตาราง

#### ทริปท่องเที่ยว (trips)
- `id` - Primary Key
- `title` - ชื่อทริป
- `description` - คำอธิบาย
- `image_url` - URL รูปภาพ
- `slug` - URL-friendly identifier
- `content` - เนื้อหาเต็ม
- `duration` - ระยะเวลา
- `price` - ราคา
- `location` - สถานที่
- `status` - สถานะ (draft/published)
- `created_at` - วันที่สร้าง
- `updated_at` - วันที่อัปเดต

#### สินค้าชุมชน (products)
- `id` - Primary Key
- `title` - ชื่อสินค้า
- `description` - คำอธิบาย
- `image_url` - URL รูปภาพ
- `slug` - URL-friendly identifier
- `content` - เนื้อหาเต็ม
- `price` - ราคา
- `category` - หมวดหมู่
- `status` - สถานะ (draft/published)
- `created_at` - วันที่สร้าง
- `updated_at` - วันที่อัปเดต

#### บทความ (articles)
- `id` - Primary Key
- `title` - ชื่อบทความ
- `description` - คำอธิบาย
- `image_url` - URL รูปภาพ
- `slug` - URL-friendly identifier
- `content` - เนื้อหาเต็ม
- `author` - ผู้เขียน
- `category` - หมวดหมู่
- `status` - สถานะ (draft/published)
- `created_at` - วันที่สร้าง
- `updated_at` - วันที่อัปเดต

#### วิดีโอ (videos)
- `id` - Primary Key
- `title` - ชื่อวิดีโอ
- `description` - คำอธิบาย
- `thumbnail_url` - URL รูป thumbnail
- `video_url` - URL วิดีโอ
- `slug` - URL-friendly identifier
- `duration` - ระยะเวลา
- `category` - หมวดหมู่
- `status` - สถานะ (draft/published)
- `created_at` - วันที่สร้าง
- `updated_at` - วันที่อัปเดต

#### ผู้ประกอบการ (entrepreneurs)
- `id` - Primary Key
- `title` - ชื่อผู้ประกอบการ
- `description` - คำอธิบาย
- `image_url` - URL รูปภาพ
- `slug` - URL-friendly identifier
- `content` - เนื้อหาเต็ม
- `contact_info` - ข้อมูลติดต่อ
- `location` - สถานที่
- `category` - หมวดหมู่
- `status` - สถานะ (draft/published)
- `created_at` - วันที่สร้าง
- `updated_at` - วันที่อัปเดต

## 🔧 การพัฒนา

### การรันในโหมด Development
```bash
npm run dev
```

### การเพิ่ม Content Type ใหม่
1. เพิ่มตารางในฐานข้อมูล
2. เพิ่ม API routes ใน `server.js`
3. เพิ่ม UI ใน `public/index.html`

## 📝 หมายเหตุ

- ระบบนี้สร้างขึ้นเพื่อใช้กับโปรเจค GreenBlueRest Bangkok
- รองรับการอัปโหลดไฟล์รูปภาพ
- ใช้ SQLite เป็นฐานข้อมูลเริ่มต้น (สามารถเปลี่ยนเป็น MySQL/PostgreSQL ได้)
- มี Admin Panel ที่ใช้งานง่าย

## 🤝 การสนับสนุน

หากมีปัญหาหรือข้อสงสัย กรุณาติดต่อทีมพัฒนา GreenBlueRest Bangkok
