# 🔄 Strapi Migration Guide

## ภาพรวมการเปลี่ยนแปลง

ระบบ Admin Panel ได้ถูกอัปเดตให้ใช้ **Strapi API** แทน **GitHub API** สำหรับการจัดการเนื้อหา

### ✅ สิ่งที่เปลี่ยนแปลงแล้ว:

1. **Authentication System** - ใช้ JWT จาก Strapi
2. **Products API** - เชื่อมต่อกับ Strapi
3. **Trips API** - เชื่อมต่อกับ Strapi  
4. **Articles API** - เชื่อมต่อกับ Strapi (ใหม่)
5. **Auth API** - ระบบ Login/Logout ด้วย JWT

---

## 🚀 การตั้งค่า

### 1. ตั้งค่า Environment Variables

สร้างไฟล์ `.env.local` ในโฟลเดอร์ `admin/`:

```env
# Strapi Configuration
STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your_strapi_api_token_here

# Next.js Configuration
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3001

# Development
NODE_ENV=development
```

### 2. เริ่มต้นเซิร์ฟเวอร์

```bash
# เริ่มต้น Strapi CMS
cd /Users/nattagid/GitHub/greenbluerestbangkok/greenbluerest-cms
npm start

# เริ่มต้น Admin Panel
cd /Users/nattagid/GitHub/greenbluerestbangkok/admin
npm run dev
```

---

## 🔐 ระบบ Authentication

### JWT Authentication Flow

1. **Login** - ผู้ใช้เข้าสู่ระบบด้วย username/password
2. **Token** - ได้รับ JWT token จาก Strapi
3. **Session** - เก็บ token ใน HTTP-only cookie
4. **API Calls** - ส่ง token ในการเรียก API

### API Endpoints

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "identifier": "username_or_email",
  "password": "password"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <jwt_token>
```

#### Logout
```http
POST /api/auth/logout
```

---

## 📡 API Endpoints ที่เปลี่ยนแปลง

### Products API

#### List Products
```http
GET /api/products?page=1&limit=20&search=keyword&status=published
```

#### Create Product
```http
POST /api/products
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "name": "Product Name",
  "description": "Product Description",
  "price": "100 บาท",
  "category": "อาหาร",
  "status": "published"
}
```

#### Update Product
```http
PUT /api/products/1
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "name": "Updated Product Name",
  "status": "draft"
}
```

#### Delete Product
```http
DELETE /api/products/1
Authorization: Bearer <jwt_token>
```

### Trips API

#### List Trips
```http
GET /api/trips?page=1&limit=20&category=community
```

#### Create Trip
```http
POST /api/trips
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "name": "Trip Name",
  "shortDescription": "Trip Description",
  "category": "community",
  "status": "published"
}
```

### Articles API (ใหม่)

#### List Articles
```http
GET /api/articles?page=1&limit=20&status=published
```

#### Create Article
```http
POST /api/articles
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "title": "Article Title",
  "description": "Article Description",
  "content": "Full article content",
  "author": "Author Name",
  "category": "travel",
  "status": "published"
}
```

---

## 🔧 การใช้งาน

### 1. เข้าสู่ระบบ

1. เปิด Admin Panel ที่ `http://localhost:3001/admin`
2. เข้าสู่ระบบด้วย username/password ที่มีใน Strapi
3. ระบบจะเก็บ JWT token อัตโนมัติ

### 2. จัดการเนื้อหา

1. **Products** - ไปที่ `/admin/products`
2. **Trips** - ไปที่ `/admin/trips`
3. **Articles** - ไปที่ `/admin/articles` (ใหม่)

### 3. การเพิ่มเนื้อหาใหม่

1. คลิกปุ่ม "เพิ่มใหม่"
2. กรอกข้อมูลในฟอร์ม
3. เลือกสถานะ (draft/published)
4. บันทึก - ข้อมูลจะถูกส่งไปยัง Strapi

---

## 🗄️ ฐานข้อมูล Strapi

### Content Types ที่ต้องมีใน Strapi:

#### Articles
- `title` (Text)
- `description` (Text)
- `content` (Rich Text)
- `author` (Text)
- `category` (Text)
- `status` (Enum: draft, published)
- `image_url` (URL)
- `slug` (UID)

#### Products
- `name` (Text)
- `description` (Text)
- `price` (Text)
- `category` (Text)
- `status` (Enum: draft, published)
- `image_url` (URL)
- `slug` (UID)

#### Trips
- `name` (Text)
- `shortDescription` (Text)
- `longDescription` (Rich Text)
- `category` (Text)
- `status` (Enum: draft, published)
- `image_url` (URL)
- `slug` (UID)

---

## 🔍 การ Debug

### ตรวจสอบการเชื่อมต่อ Strapi

```bash
# ตรวจสอบ Strapi Health
curl http://localhost:1337/api/health

# ตรวจสอบ Articles API
curl http://localhost:1337/api/articles

# ตรวจสอบ Products API
curl http://localhost:1337/api/products
```

### ตรวจสอบ Authentication

```bash
# Login
curl -X POST http://localhost:1337/api/auth/local \
  -H "Content-Type: application/json" \
  -d '{"identifier":"admin","password":"admin123"}'

# ใช้ token ที่ได้
curl http://localhost:1337/api/articles \
  -H "Authorization: Bearer <jwt_token>"
```

---

## ⚠️ ข้อควรระวัง

### 1. CORS Configuration
Strapi ต้องตั้งค่า CORS ให้อนุญาต Admin Panel:

```javascript
// config/middlewares.js
module.exports = [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
```

### 2. Permissions
ตั้งค่า Permissions ใน Strapi Admin Panel:
- `articles` - Allow public access for GET, authenticated access for POST/PUT/DELETE
- `products` - Allow public access for GET, authenticated access for POST/PUT/DELETE
- `trips` - Allow public access for GET, authenticated access for POST/PUT/DELETE

### 3. User Roles
สร้าง User ใน Strapi:
- Username: `admin`
- Password: `admin123`
- Role: `Admin`

---

## 🎯 สรุป

### ✅ สิ่งที่ทำได้แล้ว:
1. **Authentication** - JWT-based authentication
2. **Products Management** - CRUD operations
3. **Trips Management** - CRUD operations
4. **Articles Management** - CRUD operations (ใหม่)
5. **File Upload** - รองรับการอัปโหลดไฟล์
6. **Error Handling** - จัดการข้อผิดพลาดอย่างเหมาะสม

### 🔄 การเปลี่ยนแปลงหลัก:
- **จาก GitHub API** → **ไป Strapi API**
- **จาก File-based** → **ไป Database-based**
- **จาก Mock Authentication** → **ไป JWT Authentication**

**ระบบพร้อมใช้งานแล้ว!** 🚀
