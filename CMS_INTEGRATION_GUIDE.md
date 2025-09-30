# 📚 คู่มือการเชื่อมต่อและใช้งาน CMS Integration

## 🎯 ภาพรวมระบบ

ระบบ CMS Integration นี้ช่วยให้เว็บไซต์สามารถดึงข้อมูลจาก Content Management System (CMS) และแสดงผลแบบเรียลไทม์ โดยไม่ต้องแก้ไขโค้ดทุกครั้งที่มีการเพิ่มเนื้อหาใหม่

### 🔧 ส่วนประกอบหลัก
1. **CMS Backend** - ระบบจัดการเนื้อหา (Node.js + SQLite)
2. **CMS API** - REST API สำหรับดึงข้อมูล
3. **CMS Integration JS** - JavaScript สำหรับเชื่อมต่อกับ API
4. **Frontend** - หน้าเว็บที่แสดงผลข้อมูล

---

## 🚀 ขั้นตอนการติดตั้งและใช้งาน

### ขั้นตอนที่ 1: เริ่มต้น CMS Server

```bash
# 1. ไปที่โฟลเดอร์ CMS
cd /Users/nattagid/GitHub/greenbluerestbangkok/greenbluerest-cms

# 2. เริ่มต้นเซิร์ฟเวอร์
npm start

# 3. ตรวจสอบว่าเซิร์ฟเวอร์ทำงาน
# ควรเห็นข้อความ: "🚀 GreenBlueRest CMS is running on http://localhost:1337"
```

### ขั้นตอนที่ 2: เข้าถึง Admin Panel

1. เปิดเบราว์เซอร์ไปที่: `http://localhost:1337/admin`
2. คุณจะเห็นหน้า Admin Panel สำหรับจัดการเนื้อหา
3. สามารถเพิ่ม/แก้ไข/ลบข้อมูลได้ที่หน้านี้

### ขั้นตอนที่ 3: เพิ่มข้อมูลตัวอย่าง

```bash
# รันสคริปต์เพิ่มข้อมูลตัวอย่าง
cd /Users/nattagid/GitHub/greenbluerestbangkok/greenbluerest-cms
node sample-data.js
```

### ขั้นตอนที่ 4: ทดสอบ API

เปิดเบราว์เซอร์ไปที่:
- `http://localhost:1337/api/health` - ตรวจสอบสถานะ
- `http://localhost:1337/api/articles` - ดูข้อมูลบทความ
- `http://localhost:1337/api/products` - ดูข้อมูลสินค้า

### ขั้นตอนที่ 5: รวม JavaScript ในหน้าเว็บ

```html
<!-- เพิ่มใน <head> หรือก่อน </body> -->
<script src="js/cms-integration.js"></script>
```

### ขั้นตอนที่ 6: เพิ่ม HTML Containers

```html
<!-- สำหรับแสดงบทความ -->
<div id="articles-container">
    <!-- ข้อมูลบทความจะแสดงที่นี่ -->
</div>

<!-- สำหรับแสดงสินค้า -->
<div id="products-container">
    <!-- ข้อมูลสินค้าจะแสดงที่นี่ -->
</div>
```

### ขั้นตอนที่ 7: ทดสอบการทำงาน

1. เปิดไฟล์ `cms-demo.html` ในเบราว์เซอร์
2. ตรวจสอบ Console (F12) เพื่อดูการทำงาน
3. ข้อมูลจาก CMS ควรแสดงผลบนหน้าเว็บ

---

## 📡 การใช้งาน API

### 🔍 ดึงข้อมูล (GET Requests)

#### ดึงข้อมูลบทความทั้งหมด
```javascript
fetch('http://localhost:1337/api/articles')
    .then(response => response.json())
    .then(articles => {
        console.log('บทความ:', articles);
        // แสดงผลข้อมูล
    });
```

#### ดึงข้อมูลสินค้าทั้งหมด
```javascript
fetch('http://localhost:1337/api/products')
    .then(response => response.json())
    .then(products => {
        console.log('สินค้า:', products);
        // แสดงผลข้อมูล
    });
```

#### ดึงข้อมูลทริปท่องเที่ยว
```javascript
fetch('http://localhost:1337/api/trips')
    .then(response => response.json())
    .then(trips => {
        console.log('ทริป:', trips);
    });
```

### ➕ เพิ่มข้อมูลใหม่ (POST Requests)

#### เพิ่มบทความใหม่
```javascript
const formData = new FormData();
formData.append('title', 'ชื่อบทความ');
formData.append('description', 'คำอธิบาย');
formData.append('content', 'เนื้อหาเต็ม');
formData.append('author', 'ผู้เขียน');
formData.append('category', 'หมวดหมู่');
formData.append('status', 'published');

fetch('http://localhost:1337/api/articles', {
    method: 'POST',
    body: formData
})
.then(response => response.json())
.then(result => {
    console.log('เพิ่มบทความสำเร็จ:', result);
});
```

#### เพิ่มสินค้าใหม่
```javascript
const formData = new FormData();
formData.append('title', 'ชื่อสินค้า');
formData.append('description', 'คำอธิบาย');
formData.append('content', 'รายละเอียดสินค้า');
formData.append('price', 'ราคา');
formData.append('category', 'หมวดหมู่');
formData.append('status', 'published');

fetch('http://localhost:1337/api/products', {
    method: 'POST',
    body: formData
})
.then(response => response.json())
.then(result => {
    console.log('เพิ่มสินค้าสำเร็จ:', result);
});
```

### ✏️ แก้ไขข้อมูล (PUT Requests)

```javascript
const formData = new FormData();
formData.append('title', 'ชื่อที่แก้ไขแล้ว');

fetch('http://localhost:1337/api/articles/1', {
    method: 'PUT',
    body: formData
})
.then(response => response.json())
.then(result => {
    console.log('แก้ไขสำเร็จ:', result);
});
```

### 🗑️ ลบข้อมูล (DELETE Requests)

```javascript
fetch('http://localhost:1337/api/articles/1', {
    method: 'DELETE'
})
.then(response => response.json())
.then(result => {
    console.log('ลบสำเร็จ:', result);
});
```

---

## 🎨 การแสดงผลข้อมูล

### ใช้ระบบที่เตรียมไว้

```javascript
// เริ่มต้นระบบอัตโนมัติ
// ระบบจะดึงข้อมูลและแสดงผลใน containers ที่กำหนด

// รีเฟรชข้อมูล
refreshCMSData();

// ดึงข้อมูลเฉพาะ
const articles = await getLatestArticles(5);
const products = await getLatestProducts(3);
```

### สร้างการแสดงผลเอง

```javascript
// ดึงข้อมูล
async function loadCustomData() {
    try {
        const response = await fetch('http://localhost:1337/api/articles');
        const articles = await response.json();
        
        // แสดงผลใน HTML
        const container = document.getElementById('my-container');
        container.innerHTML = articles.map(article => `
            <div class="article-item">
                <h3>${article.title}</h3>
                <p>${article.description}</p>
                <small>วันที่: ${article.created_at}</small>
            </div>
        `).join('');
        
    } catch (error) {
        console.error('เกิดข้อผิดพลาด:', error);
    }
}

// เรียกใช้
loadCustomData();
```

---

## 🔧 การปรับแต่ง (Customization)

### เปลี่ยน URL ของ API

```javascript
// แก้ไขในไฟล์ cms-integration.js
const CMS_CONFIG = {
    baseURL: 'http://your-domain.com/api', // เปลี่ยนเป็น URL ของคุณ
    // ... การตั้งค่าอื่นๆ
};
```

### เปลี่ยนจำนวนรายการที่แสดง

```javascript
const CMS_CONFIG = {
    itemsPerPage: 10, // เปลี่ยนจาก 6 เป็น 10
    // ... การตั้งค่าอื่นๆ
};
```

### เปลี่ยนการแสดงผล

```javascript
const CMS_CONFIG = {
    display: {
        articles: {
            containerId: 'my-articles', // เปลี่ยน ID ของ container
            title: 'บทความของเรา',
            showImage: false, // ไม่แสดงรูปภาพ
            showDescription: false, // ไม่แสดงคำอธิบาย
            showDate: true // แสดงวันที่
        }
    }
};
```

---

## 🐛 การแก้ไขปัญหา (Troubleshooting)

### ปัญหา: ไม่สามารถเชื่อมต่อกับ API

**สาเหตุ:** CMS Server ไม่ทำงาน

**วิธีแก้:**
```bash
# ตรวจสอบว่าเซิร์ฟเวอร์ทำงานอยู่
cd /Users/nattagid/GitHub/greenbluerestbangkok/greenbluerest-cms
npm start

# ตรวจสอบในเบราว์เซอร์
# ไปที่: http://localhost:1337/api/health
```

### ปัญหา: ไม่แสดงข้อมูล

**สาเหตุ:** Container ID ไม่ถูกต้อง

**วิธีแก้:**
```html
<!-- ตรวจสอบว่า ID ตรงกับการตั้งค่า -->
<div id="articles-container"></div>
<div id="products-container"></div>
```

### ปัญหา: รูปภาพไม่แสดง

**สาเหตุ:** Path ของรูปภาพไม่ถูกต้อง

**วิธีแก้:**
```javascript
// ตรวจสอบ image_url ในข้อมูล
// ควรเป็น: /uploads/filename.jpg
// ไม่ใช่: http://localhost:1337/uploads/filename.jpg
```

### ปัญหา: CORS Error

**สาเหตุ:** เซิร์ฟเวอร์ไม่รองรับ CORS

**วิธีแก้:** CMS ของเรารองรับ CORS แล้ว แต่ถ้าใช้เซิร์ฟเวอร์อื่น:

```javascript
// ใช้ proxy หรือแก้ไขเซิร์ฟเวอร์ให้รองรับ CORS
fetch('http://localhost:1337/api/articles', {
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json',
    }
});
```

---

## 📊 โครงสร้างข้อมูล (Data Structure)

### Articles (บทความ)
```json
{
    "id": 1,
    "title": "ชื่อบทความ",
    "description": "คำอธิบาย",
    "image_url": "/uploads/image.jpg",
    "slug": "url-friendly-title",
    "content": "เนื้อหาเต็ม",
    "author": "ผู้เขียน",
    "category": "หมวดหมู่",
    "status": "published",
    "created_at": "2025-09-30 09:45:19",
    "updated_at": "2025-09-30 09:45:19"
}
```

### Products (สินค้า)
```json
{
    "id": 1,
    "title": "ชื่อสินค้า",
    "description": "คำอธิบาย",
    "image_url": "/uploads/image.jpg",
    "slug": "url-friendly-title",
    "content": "รายละเอียดสินค้า",
    "price": "ราคา",
    "category": "หมวดหมู่",
    "status": "published",
    "created_at": "2025-09-30 09:45:19",
    "updated_at": "2025-09-30 09:45:19"
}
```

---

## 🎯 ตัวอย่างการใช้งานจริง

### 1. แสดงบทความล่าสุดในหน้าแรก

```html
<!-- ในหน้า index.html -->
<section class="latest-articles">
    <h2>บทความล่าสุด</h2>
    <div id="articles-container"></div>
</section>

<script src="js/cms-integration.js"></script>
```

### 2. แสดงสินค้าแนะนำ

```html
<!-- ในหน้า products.html -->
<section class="featured-products">
    <h2>สินค้าแนะนำ</h2>
    <div id="products-container"></div>
</section>

<script src="js/cms-integration.js"></script>
```

### 3. สร้างหน้าแสดงรายละเอียด

```javascript
// ในไฟล์ article-detail.html
async function loadArticleDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');
    
    try {
        const response = await fetch(`http://localhost:1337/api/articles/${articleId}`);
        const article = await response.json();
        
        document.title = article.title;
        document.getElementById('article-title').textContent = article.title;
        document.getElementById('article-content').innerHTML = article.content;
        
    } catch (error) {
        console.error('เกิดข้อผิดพลาด:', error);
    }
}

// เรียกใช้เมื่อหน้าเว็บโหลด
loadArticleDetail();
```

---

## 🚀 การ Deploy

### Deploy CMS ไปยังเซิร์ฟเวอร์

1. **อัปโหลดไฟล์ CMS**
```bash
# อัปโหลดโฟลเดอร์ greenbluerest-cms ไปยังเซิร์ฟเวอร์
# ตั้งค่า environment variables
```

2. **ติดตั้ง Dependencies**
```bash
npm install
npm start
```

3. **ตั้งค่า Reverse Proxy (ถ้าจำเป็น)**
```nginx
# ใน Nginx config
location /api/ {
    proxy_pass http://localhost:1337/api/;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
}
```

### อัปเดต URL ใน Frontend

```javascript
// แก้ไขในไฟล์ cms-integration.js
const CMS_CONFIG = {
    baseURL: 'https://your-domain.com/api', // เปลี่ยนเป็น URL จริง
    // ... การตั้งค่าอื่นๆ
};
```

---

## 📝 สรุป

ระบบ CMS Integration นี้ช่วยให้:

1. **จัดการเนื้อหาได้ง่าย** - ผ่าน Admin Panel
2. **แสดงผลแบบเรียลไทม์** - ไม่ต้องแก้ไขโค้ดทุกครั้ง
3. **ยืดหยุ่นสูง** - ปรับแต่งได้ตามต้องการ
4. **ใช้งานง่าย** - API มาตรฐาน REST

**ขั้นตอนสำคัญ:**
1. เริ่มต้น CMS Server
2. เพิ่มข้อมูลผ่าน Admin Panel
3. รวม JavaScript ในหน้าเว็บ
4. เพิ่ม HTML containers
5. ทดสอบการทำงาน

หากมีปัญหาหรือข้อสงสัย สามารถตรวจสอบ Console ในเบราว์เซอร์ (F12) เพื่อดูข้อความ error และการทำงานของระบบ
