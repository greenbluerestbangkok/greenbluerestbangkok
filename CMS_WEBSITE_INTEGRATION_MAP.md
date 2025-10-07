# 🗺️ CMS ↔ Website Integration Map

**Complete System Connection Guide**  
**Date:** 7 ตุลาคม 2025

---

## 🎯 ภาพรวมระบบ

```
┌─────────────────────────────────────────┐
│  Admin Panel (CMS)                      │
│  https://admin.greenbluerestbangkok.com │
│                                         │
│  แก้ไขข้อมูลที่นี่                      │
└──────────────┬──────────────────────────┘
               │
               │ บันทึกลง
               ▼
┌─────────────────────────────────────────┐
│  Supabase Database                      │
│  (PostgreSQL Cloud)                     │
│                                         │
│  • trips (11 รายการ)                   │
│  • products (24 รายการ)                │
│  • articles (5 รายการ)                 │
│  • videos (5 รายการ)                   │
│  • entrepreneurs (8 รายการ)            │
└──────────────┬──────────────────────────┘
               │
               │ ดึงข้อมูล
               ▼
┌─────────────────────────────────────────┐
│  Frontend Website                       │
│  https://greenbluerestbangkok.com       │
│                                         │
│  แสดงบนเว็บที่นี่                       │
└─────────────────────────────────────────┘
```

---

## 📋 1. วิดีโอ (Videos)

### **🎬 ในระบบ Admin CMS:**

**จัดการที่:**
```
https://admin.greenbluerestbangkok.com/videos
```

**สามารถทำได้:**
- ✅ เพิ่มวิดีโอใหม่ (YouTube URL)
- ✅ แก้ไขชื่อและคำอธิบาย
- ✅ เปลี่ยนสถานะ (published/draft)
- ✅ ลบวิดีโอ
- ✅ เรียงลำดับ

**Fields ที่จัดการ:**
```
- title (ชื่อวิดีโอ)
- description (คำอธิบาย)
- youtube_url (ลิงก์ YouTube)
- duration (ระยะเวลา)
- category (หมวดหมู่)
- status (published/draft)
- created_at (วันที่สร้าง)
```

---

### **🌐 แสดงบนเว็บหลักที่:**

**หน้าหลัก:**
```
https://greenbluerestbangkok.com/pages/activities.html
                                        ^^^^^^^^^^^^^
                                        หน้านี้!
```

**Section:**
```html
<!-- ส่วน วิดีโอ -->
<div class="vlog-section">
    <h2>วิดีโอ</h2>
    <div class="vlog-grid">
        <!-- วิดีโอจะแสดงที่นี่ -->
    </div>
</div>
```

**JavaScript ที่ดึงข้อมูล:**
```
src/js/blog-vlog.js
```

---

### **🔗 Data Flow (วิดีโอ):**

```
1. Admin เพิ่มวิดีโอ
   ↓
2. POST /api/videos
   ↓
3. บันทึกใน Supabase (table: videos)
   ↓
4. Frontend ดึงข้อมูล
   GET https://gmdvkegcejrbrobtrhfm.supabase.co/rest/v1/videos
   ↓
5. แสดงใน activities.html
```

---

## 📋 2. ทริป (Trips)

### **🎬 ในระบบ Admin CMS:**

**จัดการที่:**
```
https://admin.greenbluerestbangkok.com/trips
```

**Fields:**
```
- title (ชื่อทริป)
- description (คำอธิบายสั้น)
- content (รายละเอียดเต็ม)
- price (ราคา)
- duration (ระยะเวลา)
- location (สถานที่)
- image_url (รูปภาพหลัก)
- status (published/draft)
```

---

### **🌐 แสดงบนเว็บหลักที่:**

**หน้ารายการทริป:**
```
https://greenbluerestbangkok.com/pages/trips.html
                                        ^^^^^^^^^^
```

**หน้ารายละเอียดทริป:**
```
https://greenbluerestbangkok.com/pages/trip-details.html?id=1
                                        ^^^^^^^^^^^^^^^^^^^
```

**JavaScript:**
```
src/js/trip-details-supabase.js
```

---

### **🔗 Data Flow (ทริป):**

```
Admin Panel:
https://admin.greenbluerestbangkok.com/trips
   ↓ แก้ไขทริป
   ↓ POST /api/trips/[id]
   ↓
Supabase:
table: trips
   ↓ ดึงข้อมูล
   ↓ JavaScript: trip-details-supabase.js
   ↓
Frontend:
https://greenbluerestbangkok.com/pages/trips.html
   → แสดงรายการทริปทั้งหมด

https://greenbluerestbangkok.com/pages/trip-details.html?id=1
   → แสดงรายละเอียดทริป
```

---

## 📋 3. สินค้า (Products)

### **🎬 ในระบบ Admin CMS:**

**จัดการที่:**
```
https://admin.greenbluerestbangkok.com/products
```

**Fields:**
```
- title (ชื่อสินค้า)
- description (คำอธิบาย)
- price (ราคา)
- category (หมวดหมู่: food/handicraft/etc.)
- image_url (รูปสินค้า)
- status (available/out_of_stock/discontinued)
```

---

### **🌐 แสดงบนเว็บหลักที่:**

```
https://greenbluerestbangkok.com/pages/products.html
                                        ^^^^^^^^^^^^^
```

**JavaScript:**
```
src/js/products-supabase.js
```

**Features:**
- Grid layout (Masonry)
- Search (ค้นหาสินค้า)
- Filter by category (กรองตามหมวดหมู่)
- Image lightbox

---

### **🔗 Data Flow (สินค้า):**

```
Admin Panel:
https://admin.greenbluerestbangkok.com/products
   ↓ เพิ่ม/แก้ไข/ลบ สินค้า
   ↓ Image upload
   ↓ POST/PUT /api/products
   ↓
Supabase:
table: products
   ↓ ดึงข้อมูล
   ↓ JavaScript: products-supabase.js
   ↓ fetchProductsFromSupabase()
   ↓
Frontend:
https://greenbluerestbangkok.com/pages/products.html
   → แสดงสินค้า 24 รายการ
   → Masonry grid layout
   → Search & filter
```

---

## 📋 4. บทความ (Articles)

### **🎬 ในระบบ Admin CMS:**

**จัดการที่:**
```
https://admin.greenbluerestbangkok.com/articles
```

**Fields:**
```
- title (หัวข้อ)
- description (คำอธิบายสั้น)
- content (เนื้อหาเต็ม)
- author (ผู้เขียน)
- category (หมวดหมู่)
- image_url (รูปปก)
- status (published/draft)
```

---

### **🌐 แสดงบนเว็บหลักที่:**

**หน้ารายการบทความ:**
```
https://greenbluerestbangkok.com/pages/activities.html
                                        ^^^^^^^^^^^^^^
                                        (ส่วนบทความ)

https://greenbluerestbangkok.com/pages/blog/index.html
                                        ^^^^^^^^^^^^^^^
                                        (Blog listing)
```

**หน้ารายละเอียดบทความ:**
```
https://greenbluerestbangkok.com/pages/blog-detail.html?id=1
```

**JavaScript:**
```
src/js/blog-data-supabase.js
src/js/blog-listing.js
src/js/blog-detail.js
```

---

### **🔗 Data Flow (บทความ):**

```
Admin Panel:
https://admin.greenbluerestbangkok.com/articles
   ↓ เขียนบทความ
   ↓ อัปโหลดรูปปก
   ↓ Publish/Draft
   ↓ POST /api/articles
   ↓
Supabase:
table: articles
   ↓ ดึงข้อมูล
   ↓ JavaScript: blog-data-supabase.js
   ↓
Frontend:
https://greenbluerestbangkok.com/pages/activities.html
   → แสดงบทความล่าสุด (preview)

https://greenbluerestbangkok.com/pages/blog/index.html
   → แสดงบทความทั้งหมด

https://greenbluerestbangkok.com/pages/blog-detail.html?id=1
   → แสดงเนื้อหาเต็ม
```

---

## 📋 5. ผู้ประกอบการ (Entrepreneurs)

### **🎬 ในระบบ Admin CMS:**

**จัดการที่:**
```
https://admin.greenbluerestbangkok.com/entrepreneurs
```

**Fields:**
```
- name (ชื่อกลุ่ม/ผู้ประกอบการ)
- description (รายละเอียด)
- category (ประเภทธุรกิจ)
- contact_info (ข้อมูลติดต่อ)
- location (ที่ตั้ง)
- image_url (โลโก้/รูปภาพ)
- status (active/inactive)
```

---

### **🌐 แสดงบนเว็บหลักที่:**

```
https://greenbluerestbangkok.com/pages/operators.html
                                        ^^^^^^^^^^^^^^
```

**JavaScript:**
```
src/js/config.js (Supabase config)
+ fetch directly from Supabase
```

---

### **🔗 Data Flow (ผู้ประกอบการ):**

```
Admin Panel:
https://admin.greenbluerestbangkok.com/entrepreneurs
   ↓ เพิ่มผู้ประกอบการ
   ↓ อัปโหลดโลโก้
   ↓ POST /api/entrepreneurs
   ↓
Supabase:
table: entrepreneurs
   ↓ ดึงข้อมูล
   ↓
Frontend:
https://greenbluerestbangkok.com/pages/operators.html
   → แสดงผู้ประกอบการ 8 กลุ่ม
   → Card layout
```

---

## 📊 Complete Integration Table

| CMS Section | Admin URL | Frontend URL | Supabase Table | JavaScript File |
|-------------|-----------|--------------|----------------|-----------------|
| **ทริป** | /trips | /pages/trips.html<br>/pages/trip-details.html | trips | trip-details-supabase.js |
| **สินค้า** | /products | /pages/products.html | products | products-supabase.js |
| **บทความ** | /articles | /pages/activities.html<br>/pages/blog/index.html<br>/pages/blog-detail.html | articles | blog-data-supabase.js<br>blog-listing.js<br>blog-detail.js |
| **วิดีโอ** | /videos | /pages/activities.html | videos | blog-vlog.js |
| **ผู้ประกอบการ** | /entrepreneurs | /pages/operators.html | entrepreneurs | (fetch directly) |

---

## 🎬 วิดีโอ - รายละเอียดเต็ม

### **📝 Admin Panel:**

**URL:**
```
https://admin.greenbluerestbangkok.com/videos
```

**หน้าจัดการ:**
```
/videos          → รายการวิดีโอทั้งหมด
/videos/new      → เพิ่มวิดีโอใหม่
/videos/[id]     → แก้ไขวิดีโอ
```

**สามารถทำได้:**
1. ✅ เพิ่มวิดีโอ (ใส่ YouTube URL)
2. ✅ แก้ไขชื่อและคำอธิบาย
3. ✅ เลือก category
4. ✅ เปลี่ยนสถานะ (published/draft)
5. ✅ ลบวิดีโอ
6. ✅ ดู YouTube thumbnail อัตโนมัติ

---

### **🌐 Frontend:**

**แสดงที่:**
```
https://greenbluerestbangkok.com/pages/activities.html
```

**Section:**
```html
<div class="vlog-section">
    <h2 class="section-title">วิดีโอ</h2>
    <div class="vlog-grid" id="vlogGrid">
        <!-- วิดีโอจาก Supabase จะแสดงที่นี่ -->
    </div>
</div>
```

**การแสดงผล:**
- YouTube thumbnail
- ชื่อวิดีโอ
- คำอธิบาย
- ระยะเวลา
- ปุ่ม "ดูเลย" → เปิด YouTube

---

### **💾 Supabase:**

**Table:** `videos`

**Columns:**
```sql
- id (integer)
- title (text)
- description (text)
- youtube_url (text)
- thumbnail_url (text, auto-generated)
- duration (text)
- category (text)
- status (text: published/draft)
- view_count (integer)
- created_at (timestamp)
- updated_at (timestamp)
```

---

### **⚙️ JavaScript Integration:**

**File:** `src/js/blog-vlog.js`

**Function:**
```javascript
// ดึงวิดีโอจาก Supabase
async function fetchVideos() {
    const response = await fetch(
        `${SUPABASE_URL}/rest/v1/videos?status=eq.published&order=created_at.desc`,
        {
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Content-Type': 'application/json'
            }
        }
    );
    const videos = await response.json();
    return videos;
}

// แสดงวิดีโอ
function renderVideos(videos) {
    const vlogGrid = document.getElementById('vlogGrid');
    videos.forEach(video => {
        // สร้าง HTML card
        // แสดง YouTube embed
    });
}
```

---

## 🔄 Complete Data Flow Diagram

```
╔═══════════════════════════════════════════════════════════╗
║                    ADMIN PANEL (CMS)                      ║
║           https://admin.greenbluerestbangkok.com          ║
╚═══════════════════════════════════════════════════════════╝
               │
               │ เพิ่ม/แก้ไข/ลบ
               │ (HTTP POST/PUT/DELETE)
               ▼
    ┌──────────────────────────────┐
    │  API Routes (Next.js)        │
    │                              │
    │  /api/trips                  │
    │  /api/products               │
    │  /api/articles               │
    │  /api/videos       ← นี่!    │
    │  /api/entrepreneurs          │
    └──────────┬───────────────────┘
               │
               │ เขียนข้อมูล
               ▼
╔═══════════════════════════════════════════════════════════╗
║                   SUPABASE DATABASE                       ║
║          https://gmdvkegcejrbrobtrhfm.supabase.co         ║
╠═══════════════════════════════════════════════════════════╣
║  trips (11)    │  products (24)  │  articles (5)         ║
║  videos (5)    │  entrepreneurs (8)                       ║
╚═══════════════════════════════════════════════════════════╝
               │
               │ อ่านข้อมูล
               │ (HTTP GET)
               ▼
    ┌──────────────────────────────┐
    │  Frontend JavaScript         │
    │                              │
    │  trip-details-supabase.js    │
    │  products-supabase.js        │
    │  blog-data-supabase.js       │
    │  blog-vlog.js      ← นี่!    │
    │  config.js                   │
    └──────────┬───────────────────┘
               │
               │ แสดงผล
               ▼
╔═══════════════════════════════════════════════════════════╗
║                   FRONTEND WEBSITE                        ║
║           https://greenbluerestbangkok.com                ║
╠═══════════════════════════════════════════════════════════╣
║  /pages/trips.html         → ทริป                        ║
║  /pages/products.html      → สินค้า                      ║
║  /pages/activities.html    → บทความ & วิดีโอ ← นี่!      ║
║  /pages/blog/index.html    → บทความ                      ║
║  /pages/operators.html     → ผู้ประกอบการ                ║
╚═══════════════════════════════════════════════════════════╝
```

---

## 📋 Complete Feature Map

### **1. Dashboard (สถิติ)**

**Admin:**
```
https://admin.greenbluerestbangkok.com/
```

**แสดง:**
- จำนวนทริปทั้งหมด
- จำนวนสินค้าทั้งหมด
- จำนวนบทความ
- จำนวนวิดีโอ
- จำนวนผู้ประกอบการ
- Activity ล่าสุด

**Data from:**
```
API: /api/stats
Supabase: COUNT(*) จากทุก table
```

---

### **2. จัดการทริป**

| Action | Admin URL | API | Frontend Display |
|--------|-----------|-----|------------------|
| ดูรายการ | /trips | GET /api/trips | /pages/trips.html |
| เพิ่มทริป | /trips/new | POST /api/trips | → อัปเดตหน้ารายการ |
| แก้ไขทริป | /trips/[id] | PUT /api/trips/[id] | /pages/trip-details.html?id=X |
| ลบทริป | /trips (bulk) | DELETE /api/trips/[id] | → หายจากรายการ |
| อัปโหลดรูป | /trips/[id] | (ImageUploader) | แสดงใน trip-details |

---

### **3. จัดการสินค้า**

| Action | Admin URL | API | Frontend Display |
|--------|-----------|-----|------------------|
| ดูรายการ | /products | GET /api/products | /pages/products.html |
| เพิ่มสินค้า | /products/new | POST /api/products | → เพิ่มในรายการ |
| แก้ไขสินค้า | /products/[id] | PUT /api/products/[id] | อัปเดตข้อมูลสินค้า |
| ลบสินค้า | /products (bulk) | DELETE /api/products/[id] | → หายจากรายการ |
| อัปโหลดรูป | /products/[id] | (ImageUploader) | แสดงรูปสินค้า |
| เปลี่ยนสถานะ | /products/[id] | (status field) | กรองตาม status |

---

### **4. จัดการบทความ**

| Action | Admin URL | API | Frontend Display |
|--------|-----------|-----|------------------|
| ดูรายการ | /articles | GET /api/articles | /pages/activities.html (preview) |
| เขียนใหม่ | /articles/new | POST /api/articles | → เพิ่มในรายการ |
| แก้ไข | /articles/[id] | PUT /api/articles/[id] | /pages/blog-detail.html?id=X |
| ลบ | /articles (bulk) | DELETE /api/articles/[id] | → หายจากรายการ |
| อัปโหลดรูป | /articles/[id] | (ImageUploader) | รูปปกบทความ |
| Publish/Draft | /articles/[id] | (status field) | แสดงเฉพาะ published |

---

### **5. จัดการวิดีโอ** ⭐ (คุณถาม!)

| Action | Admin URL | API | Frontend Display |
|--------|-----------|-----|------------------|
| **ดูรายการ** | /videos | GET /api/videos | /pages/activities.html (vlog section) |
| **เพิ่มวิดีโอ** | /videos/new | POST /api/videos | → เพิ่มในรายการ |
| **แก้ไข** | /videos/[id] | PUT /api/videos/[id] | อัปเดตข้อมูลวิดีโอ |
| **ลบ** | /videos (bulk) | DELETE /api/videos/[id] | → หายจากรายการ |
| **YouTube URL** | /videos/[id] | (youtube_url field) | Embed YouTube player |
| **Publish/Draft** | /videos/[id] | (status field) | แสดงเฉพาะ published |

**เชื่อมโยง:**
```
Admin เพิ่ม YouTube URL
   ↓
บันทึก: https://youtube.com/watch?v=ABC123
   ↓
Supabase: videos.youtube_url
   ↓
Frontend ดึงมา
   ↓
สร้าง YouTube embed
   ↓
แสดงใน activities.html (ส่วนวิดีโอ)
```

---

### **6. ผู้ประกอบการ**

| Action | Admin URL | API | Frontend Display |
|--------|-----------|-----|------------------|
| ดูรายการ | /entrepreneurs | GET /api/entrepreneurs | /pages/operators.html |
| เพิ่มกลุ่ม | /entrepreneurs/new | POST /api/entrepreneurs | → เพิ่มในรายการ |
| แก้ไข | /entrepreneurs/[id] | PUT /api/entrepreneurs/[id] | อัปเดตข้อมูล |
| ลบ | /entrepreneurs (bulk) | DELETE /api/entrepreneurs/[id] | → หายจากรายการ |
| อัปโหลดโลโก้ | /entrepreneurs/[id] | (ImageUploader) | แสดงโลโก้กลุ่ม |

---

## 🔗 API Endpoints Summary

### **Admin Panel API Routes:**

```
GET    /api/videos              → ดึงวิดีโอทั้งหมด
POST   /api/videos              → เพิ่มวิดีโอใหม่
GET    /api/videos/[id]         → ดึงวิดีโอ 1 รายการ
PUT    /api/videos/[id]         → แก้ไขวิดีโอ
DELETE /api/videos/[id]         → ลบวิดีโอ

GET    /api/trips               → ดึงทริป
POST   /api/trips               → เพิ่มทริป
GET    /api/trips/[id]          → ดึงทริป 1 รายการ
PUT    /api/trips/[id]          → แก้ไขทริป
DELETE /api/trips/[id]          → ลบทริป

GET    /api/products            → ดึงสินค้า
POST   /api/products            → เพิ่มสินค้า
GET    /api/products/[id]       → ดึงสินค้า 1 รายการ
PUT    /api/products/[id]       → แก้ไขสินค้า
DELETE /api/products/[id]       → ลบสินค้า

GET    /api/articles            → ดึงบทความ
POST   /api/articles            → เขียนบทความ
GET    /api/articles/[id]       → ดึงบทความ 1 รายการ
PUT    /api/articles/[id]       → แก้ไขบทความ
DELETE /api/articles/[id]       → ลบบทความ

GET    /api/entrepreneurs       → ดึงผู้ประกอบการ
POST   /api/entrepreneurs       → เพิ่มผู้ประกอบการ
GET    /api/entrepreneurs/[id]  → ดึงผู้ประกอบการ 1 รายการ
PUT    /api/entrepreneurs/[id]  → แก้ไข
DELETE /api/entrepreneurs/[id]  → ลบ

GET    /api/stats               → สถิติทั้งหมด
```

---

## 📱 Example: จัดการวิดีโอแบบครบวงจร

### **Scenario: เพิ่มวิดีโอใหม่**

**Step 1: ใน Admin (https://admin.greenbluerestbangkok.com)**
```
1. คลิก "จัดการวิดีโอ"
2. คลิก "เพิ่มวิดีโอใหม่"
3. กรอก:
   - ชื่อ: "ทริปล่องเรือชุมชนคลองบางมด"
   - คำอธิบาย: "สัมผัสวิถีชีวิตชุมชนริมน้ำ..."
   - YouTube URL: https://youtube.com/watch?v=ABC123
   - Category: "ทริปท่องเที่ยว"
   - Status: "Published"
4. คลิก "บันทึก"
```

**Step 2: ระบบประมวลผล**
```
Admin Panel
   ↓ ส่งข้อมูล
   ↓ POST /api/videos
   ↓
API Route (admin/app/api/videos/route.ts)
   ↓ validate ข้อมูล
   ↓ INSERT INTO videos
   ↓
Supabase Database
   ↓ บันทึกสำเร็จ
   ↓ return { id: 6, ... }
   ↓
Admin Panel
   ↓ แสดง "เพิ่มวิดีโอสำเร็จ!"
   ↓ redirect → /videos
```

**Step 3: แสดงบนเว็บหลัก**
```
User เปิดเว็บ
   ↓ https://greenbluerestbangkok.com/pages/activities.html
   ↓
JavaScript (blog-vlog.js)
   ↓ fetchVideos()
   ↓ GET /rest/v1/videos?status=eq.published
   ↓
Supabase
   ↓ return [{ id: 6, title: "ทริปล่องเรือ...", ... }]
   ↓
JavaScript
   ↓ renderVideos(videos)
   ↓ สร้าง HTML cards
   ↓
Browser
   ↓ แสดงวิดีโอใหม่ในหน้าเว็บ! ✅
```

---

## 🎯 Quick Reference Card

### **ต้องการแก้ไขอะไร → ไปที่:**

| ต้องการแก้ | ไปที่ Admin | แสดงที่เว็บหลัก |
|------------|-------------|-----------------|
| วิดีโอ | /videos | /pages/activities.html (ส่วนวิดีโอ) |
| บทความ | /articles | /pages/activities.html (ส่วนบทความ)<br>/pages/blog/ |
| ทริป | /trips | /pages/trips.html<br>/pages/trip-details.html |
| สินค้า | /products | /pages/products.html |
| ผู้ประกอบการ | /entrepreneurs | /pages/operators.html |

---

## 🔍 ตัวอย่างการใช้งานจริง

### **Use Case 1: เพิ่มวิดีโอทริปใหม่**

**1. ไปที่:**
```
https://admin.greenbluerestbangkok.com/videos/new
```

**2. กรอก:**
- ชื่อ: "เที่ยวตลาดน้ำบางมด"
- YouTube URL: `https://youtube.com/watch?v=XYZ789`
- Category: "ทริปท่องเที่ยว"

**3. บันทึก → Supabase**

**4. ผลลัพธ์:**
- ✅ แสดงที่ `activities.html` ส่วนวิดีโอ
- ✅ มี YouTube player embed
- ✅ คนทั่วไปดูได้ทันที

---

### **Use Case 2: แก้ไขสินค้า**

**1. ไปที่:**
```
https://admin.greenbluerestbangkok.com/products
```

**2. เลือกสินค้า → คลิก "แก้ไข"**

**3. แก้:**
- ราคา: 350 → 400 บาท
- คำอธิบาย: เพิ่มรายละเอียด
- อัปโหลดรูปใหม่

**4. บันทึก → Supabase**

**5. ผลลัพธ์:**
- ✅ `products.html` อัปเดตราคาใหม่
- ✅ รูปภาพเปลี่ยน
- ✅ Realtime!

---

## 📊 Database Schema

### **videos table:**
```sql
CREATE TABLE videos (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    youtube_url TEXT NOT NULL,
    thumbnail_url TEXT,
    duration TEXT,
    category TEXT,
    status TEXT DEFAULT 'published',
    view_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

### **Integration:**
```
Admin Panel → videos table → Frontend
     ↓              ↓             ↓
  /videos       Supabase      activities.html
  /videos/new   (store)       (display)
  /videos/[id]  (update)      (YouTube embed)
```

---

## 🎯 สรุปสำหรับวิดีโอ

### **จัดการวิดีโอที่:**
```
https://admin.greenbluerestbangkok.com/videos
```

**แก้ไขอะไรได้บ้าง:**
- ✅ ชื่อวิดีโอ → แสดงเป็น title
- ✅ คำอธิบาย → แสดงเป็น description
- ✅ YouTube URL → embed player
- ✅ Category → จัดกลุ่ม
- ✅ Status → published/draft (แสดง/ซ่อน)
- ✅ Duration → แสดงระยะเวลา

**แสดงบนเว็บที่:**
```
https://greenbluerestbangkok.com/pages/activities.html
                                        ^^^^^^^^^^^^^^
                                        ส่วน "วิดีโอ"
```

**เชื่อมผ่าน:**
```
Supabase table: videos
JavaScript: blog-vlog.js
```

---

<div align="center">

# ✅ **ระบบเชื่อมโยงครบถ้วนแล้ว!**

**Admin Panel → Supabase → Frontend**

**ทุกส่วนทำงานสมบูรณ์**

</div>

---

**มีคำถามเพิ่มเติมเกี่ยวกับส่วนอื่นๆ ไหมครับ?** 😊

