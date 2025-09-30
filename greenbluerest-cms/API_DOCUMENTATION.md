# 📡 GreenBlueRest CMS API Documentation

## 🚀 Base URL
```
http://localhost:1337/api
```

## 📋 Content Types

### 1. ทริปท่องเที่ยว (Trips)

#### GET /api/trips
ดูทริปท่องเที่ยวทั้งหมด

**Response:**
```json
[
  {
    "id": 1,
    "title": "เที่ยวชุมชนคลองบางมด 1 วัน",
    "description": "สัมผัสวิถีชีวิตชุมชนคลองบางมด พร้อมกิจกรรมเรียนรู้วัฒนธรรมท้องถิ่น",
    "image_url": "/uploads/trip-image.jpg",
    "slug": "เที่ยวชุมชนคลองบางมด-1-วัน",
    "content": "เนื้อหาเต็มของทริป...",
    "duration": "1 วัน",
    "price": "800 บาท/คน",
    "location": "ชุมชนคลองบางมด กรุงเทพฯ",
    "status": "published",
    "created_at": "2025-09-30 09:45:19",
    "updated_at": "2025-09-30 09:45:19"
  }
]
```

#### GET /api/trips/:id
ดูทริปท่องเที่ยวตาม ID

#### POST /api/trips
เพิ่มทริปท่องเที่ยวใหม่

**Request Body (multipart/form-data):**
- `title` (required): ชื่อทริป
- `description`: คำอธิบาย
- `content`: เนื้อหาเต็ม
- `duration`: ระยะเวลา
- `price`: ราคา
- `location`: สถานที่
- `status`: สถานะ (draft/published)
- `image`: ไฟล์รูปภาพ

**Response:**
```json
{
  "id": 3,
  "message": "Trip created successfully"
}
```

#### PUT /api/trips/:id
แก้ไขทริปท่องเที่ยว

#### DELETE /api/trips/:id
ลบทริปท่องเที่ยว

### 2. สินค้าชุมชน (Products)

#### GET /api/products
ดูสินค้าชุมชนทั้งหมด

**Response:**
```json
[
  {
    "id": 1,
    "title": "น้ำพริกแกงสูตรโบราณ",
    "description": "น้ำพริกแกงสูตรดั้งเดิมที่สืบทอดมา 4 รุ่น จากครูใหญ่สมหมาย",
    "image_url": "/uploads/product-image.jpg",
    "slug": "น้ำพริกแกงสูตรโบราณ",
    "content": "เนื้อหาสินค้า...",
    "price": "150 บาท/กระปุก",
    "category": "อาหารพื้นบ้าน",
    "status": "published",
    "created_at": "2025-09-30 09:45:19",
    "updated_at": "2025-09-30 09:45:19"
  }
]
```

#### POST /api/products
เพิ่มสินค้าใหม่

**Request Body (multipart/form-data):**
- `title` (required): ชื่อสินค้า
- `description`: คำอธิบาย
- `content`: เนื้อหาเต็ม
- `price`: ราคา
- `category`: หมวดหมู่
- `status`: สถานะ (draft/published)
- `image`: ไฟล์รูปภาพ

### 3. บทความ (Articles)

#### GET /api/articles
ดูบทความทั้งหมด

**Response:**
```json
[
  {
    "id": 1,
    "title": "เรียนรู้การทำน้ำพริกแกงจากครูใหญ่สมหมาย",
    "description": "เรียนรู้เคล็ดลับการทำน้ำพริกแกงไทยแท้...",
    "image_url": "/uploads/article-image.jpg",
    "slug": "เรียนรู้การทำน้ำพริกแกงจากครูใหญ่สมหมาย",
    "content": "เนื้อหาบทความ...",
    "author": "ทีมงาน GreenBlueRest",
    "category": "ภูมิปัญญาท้องถิ่น",
    "status": "published",
    "created_at": "2025-09-30 09:45:19",
    "updated_at": "2025-09-30 09:45:19"
  }
]
```

#### POST /api/articles
เพิ่มบทความใหม่

**Request Body (multipart/form-data):**
- `title` (required): ชื่อบทความ
- `description`: คำอธิบาย
- `content`: เนื้อหาเต็ม
- `author`: ผู้เขียน
- `category`: หมวดหมู่
- `status`: สถานะ (draft/published)
- `image`: ไฟล์รูปภาพ

### 4. วิดีโอ (Videos)

#### GET /api/videos
ดูวิดีโอทั้งหมด

**Response:**
```json
[
  {
    "id": 1,
    "title": "เที่ยวชุมชนบางมดใน 1 วัน",
    "description": "พาชมบรรยากาศการท่องเที่ยวชุมชนบางมดแบบจัดเต็ม...",
    "thumbnail_url": "/uploads/video-thumbnail.jpg",
    "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "slug": "เที่ยวชุมชนบางมดใน-1-วัน",
    "duration": "15:30",
    "category": "ท่องเที่ยวชุมชน",
    "status": "published",
    "created_at": "2025-09-30 09:45:19",
    "updated_at": "2025-09-30 09:45:19"
  }
]
```

#### POST /api/videos
เพิ่มวิดีโอใหม่

**Request Body (multipart/form-data):**
- `title` (required): ชื่อวิดีโอ
- `description`: คำอธิบาย
- `video_url`: URL วิดีโอ
- `duration`: ระยะเวลา
- `category`: หมวดหมู่
- `status`: สถานะ (draft/published)
- `thumbnail`: ไฟล์รูป thumbnail

### 5. ผู้ประกอบการ (Entrepreneurs)

#### GET /api/entrepreneurs
ดูผู้ประกอบการทั้งหมด

**Response:**
```json
[
  {
    "id": 1,
    "title": "บ้านสวนป้าดา",
    "description": "ร้านอาหารไทยต้นตำรับที่ทำจากวัตถุดิบสดใหม่ในชุมชน",
    "image_url": "/uploads/entrepreneur-image.jpg",
    "slug": "บ้านสวนป้าดา",
    "content": "เนื้อหาผู้ประกอบการ...",
    "contact_info": "โทร: 08x-xxx-xxxx",
    "location": "หมู่ 7 ตำบลบางมด อำเภอเมเทพ จังหวัดสมุทรปราการ",
    "category": "ร้านอาหาร",
    "status": "published",
    "created_at": "2025-09-30 09:45:19",
    "updated_at": "2025-09-30 09:45:19"
  }
]
```

#### POST /api/entrepreneurs
เพิ่มผู้ประกอบการใหม่

**Request Body (multipart/form-data):**
- `title` (required): ชื่อผู้ประกอบการ
- `description`: คำอธิบาย
- `content`: เนื้อหาเต็ม
- `contact_info`: ข้อมูลติดต่อ
- `location`: สถานที่
- `category`: หมวดหมู่
- `status`: สถานะ (draft/published)
- `image`: ไฟล์รูปภาพ

## 🔧 Utility Endpoints

### GET /api/health
ตรวจสอบสถานะของระบบ

**Response:**
```json
{
  "status": "OK",
  "message": "GreenBlueRest CMS is running!"
}
```

## 📝 Error Responses

### 400 Bad Request
```json
{
  "error": "Validation error message"
}
```

### 404 Not Found
```json
{
  "error": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error message"
}
```

## 🚀 Usage Examples

### cURL Examples

#### Get all trips
```bash
curl -X GET http://localhost:1337/api/trips
```

#### Create new trip
```bash
curl -X POST http://localhost:1337/api/trips \
  -F "title=ทริปใหม่" \
  -F "description=คำอธิบายทริป" \
  -F "duration=1 วัน" \
  -F "price=500 บาท" \
  -F "status=published" \
  -F "image=@/path/to/image.jpg"
```

#### Delete trip
```bash
curl -X DELETE http://localhost:1337/api/trips/1
```

### JavaScript Examples

#### Fetch trips
```javascript
fetch('http://localhost:1337/api/trips')
  .then(response => response.json())
  .then(data => console.log(data));
```

#### Create new product
```javascript
const formData = new FormData();
formData.append('title', 'สินค้าใหม่');
formData.append('description', 'คำอธิบายสินค้า');
formData.append('price', '100 บาท');
formData.append('category', 'อาหาร');

fetch('http://localhost:1337/api/products', {
  method: 'POST',
  body: formData
})
.then(response => response.json())
.then(data => console.log(data));
```

## 📊 Database Schema

### Trips Table
- `id` - INTEGER PRIMARY KEY
- `title` - TEXT NOT NULL
- `description` - TEXT
- `image_url` - TEXT
- `slug` - TEXT UNIQUE
- `content` - TEXT
- `duration` - TEXT
- `price` - TEXT
- `location` - TEXT
- `status` - TEXT DEFAULT 'draft'
- `created_at` - DATETIME DEFAULT CURRENT_TIMESTAMP
- `updated_at` - DATETIME DEFAULT CURRENT_TIMESTAMP

### Products Table
- `id` - INTEGER PRIMARY KEY
- `title` - TEXT NOT NULL
- `description` - TEXT
- `image_url` - TEXT
- `slug` - TEXT UNIQUE
- `content` - TEXT
- `price` - TEXT
- `category` - TEXT
- `status` - TEXT DEFAULT 'draft'
- `created_at` - DATETIME DEFAULT CURRENT_TIMESTAMP
- `updated_at` - DATETIME DEFAULT CURRENT_TIMESTAMP

### Articles Table
- `id` - INTEGER PRIMARY KEY
- `title` - TEXT NOT NULL
- `description` - TEXT
- `image_url` - TEXT
- `slug` - TEXT UNIQUE
- `content` - TEXT
- `author` - TEXT
- `category` - TEXT
- `status` - TEXT DEFAULT 'draft'
- `created_at` - DATETIME DEFAULT CURRENT_TIMESTAMP
- `updated_at` - DATETIME DEFAULT CURRENT_TIMESTAMP

### Videos Table
- `id` - INTEGER PRIMARY KEY
- `title` - TEXT NOT NULL
- `description` - TEXT
- `thumbnail_url` - TEXT
- `video_url` - TEXT
- `slug` - TEXT UNIQUE
- `duration` - TEXT
- `category` - TEXT
- `status` - TEXT DEFAULT 'draft'
- `created_at` - DATETIME DEFAULT CURRENT_TIMESTAMP
- `updated_at` - DATETIME DEFAULT CURRENT_TIMESTAMP

### Entrepreneurs Table
- `id` - INTEGER PRIMARY KEY
- `title` - TEXT NOT NULL
- `description` - TEXT
- `image_url` - TEXT
- `slug` - TEXT UNIQUE
- `content` - TEXT
- `contact_info` - TEXT
- `location` - TEXT
- `category` - TEXT
- `status` - TEXT DEFAULT 'draft'
- `created_at` - DATETIME DEFAULT CURRENT_TIMESTAMP
- `updated_at` - DATETIME DEFAULT CURRENT_TIMESTAMP
