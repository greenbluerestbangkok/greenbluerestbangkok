# 📖 คู่มือการแก้ไขเว็บไซต์ Green Blue Rest Bangkok

## 🎯 ภาพรวม
เว็บไซต์นี้เป็นเว็บไซต์ท่องเที่ยวชุมชนย่านคลองบางมดที่ใช้ HTML, CSS, JavaScript และมีระบบจัดการภาพแบบ responsive

---

## 📁 โครงสร้างไฟล์

```
greenbluerestbangkok/
├── main.html              # หน้าแรก
├── pages/                 # หน้าต่างๆ
│   ├── low-carbon.html
│   ├── trips.html
│   ├── products.html
│   ├── operators.html
│   ├── activities.html
│   ├── contact.html
│   └── trip-details.html
├── css/
│   └── style.css          # สไตล์ทั้งหมด
├── js/
│   ├── config.js          # การตั้งค่าภาพและ path
│   ├── main.js            # ฟังก์ชันหลัก
│   └── trip-details.js    # ข้อมูลทริปท่องเที่ยว
└── images/                # รูปภาพทั้งหมด
    ├── operators/         # โลโก้ผู้ประกอบการ
    ├── products/          # สินค้าชุมชน
    ├── trips/             # รูปทริป
    ├── blog/              # รูปบทความ
    ├── vlog/              # รูป vlog
    ├── low-carbon/        # รูป low carbon
    ├── hero/              # รูปปก
    └── general/           # รูปทั่วไป
```

---

## 🖼️ การจัดการภาพและ Path

### ⚙️ การตั้งค่าใน `js/config.js`

ไฟล์นี้เป็นหัวใจของระบบจัดการภาพ:

```javascript
export const IMAGE_CONFIG = {
    // ตั้งค่า Base URL (อัตโนมัติ)
    get BASE_URL() {
        if (window.location.hostname === 'localhost') {
            return ''; // Local Server
        } else {
            return '/greenbluerestbangkok'; // GitHub Pages
        }
    },
    
    // Path ของโฟลเดอร์ภาพ
    PATHS: {
        OPERATORS: '/images/operators',
        TRIPS: '/images/trips',
        PRODUCTS: '/images/products',
        // ... อื่นๆ
    },
    
    // ฟังก์ชันสร้าง URL
    getImageUrl: (folder, filename) => {
        return `${IMAGE_CONFIG.BASE_URL}${IMAGE_CONFIG.PATHS[folder]}/${filename}`;
    }
};
```

### 📝 วิธีใช้ใน HTML/JavaScript

```javascript
// ในไฟล์ JavaScript
import { IMAGE_CONFIG } from '../js/config.js';

// สร้าง URL ภาพ
const logoUrl = IMAGE_CONFIG.getImageUrl('OPERATORS', 'safetist-farm.png');
```

---

## 📄 การแก้ไขเนื้อหาแต่ละหน้า

### 🏠 หน้าแรก (`main.html`)

#### แก้ไขส่วน Hero
```html
<!-- ที่บรรทัด 29-45 -->
<section class="hero">
    <div class="hero-content">
        <h1>Green Blue Rest Bangkok</h1>
        <p>ข้อความที่ต้องการแก้ไข</p>
    </div>
</section>
```

#### แก้ไขทริปแนะนำ
ทริปแนะนำจะโหลดจาก `js/trip-details.js` อัตโนมัติ 6 ทริปแรก

### 🌱 หน้า Low Carbon Tourism (`pages/low-carbon.html`)

#### แก้ไขเนื้อหา
```html
<!-- หา section ที่ต้องการแก้ไข -->
<section class="container">
    <h2>หัวข้อที่ต้องการแก้</h2>
    <p>เนื้อหาที่ต้องการแก้</p>
</section>
```

### 🎒 หน้าทริปท่องเที่ยว (`pages/trips.html`)

ข้อมูลทริปจะโหลดจาก `js/trip-details.js` อัตโนมัติ

#### แก้ไขข้อมูลทริป
```javascript
// ในไฟล์ js/trip-details.js
export const tripsData = [
    {
        id: 1,
        title: "ชื่อทริปใหม่",
        description: "คำอธิบายทริป",
        price: "ราคา",
        duration: "ระยะเวลา",
        // ... ข้อมูลอื่นๆ
    }
];
```

### 🛍️ หน้าสินค้าชุมชน (`pages/products.html`)

#### แก้ไขข้อมูลสินค้า
```javascript
// ในไฟล์ pages/products.html (บรรทัด 84+)
const productsData = [
    {
        id: 1,
        name: "ชื่อสินค้าใหม่",
        description: "คำอธิบายสินค้า",
        price: "ราคา",
        // ... ข้อมูลอื่นๆ
    }
];
```

### 🏢 หน้าผู้ประกอบการในชุมชน (`pages/operators.html`)

#### แก้ไขข้อมูลผู้ประกอบการ
```javascript
// ในไฟล์ pages/operators.html (บรรทัด 89+)
const operatorsData = [
    {
        id: 1,
        name: "ชื่อผู้ประกอบการใหม่",
        description: "คำอธิบาย",
        story: "เรื่องราว",
        activities: ["กิจกรรม 1", "กิจกรรม 2"],
        facebook: "https://facebook.com/page",
        // ... ข้อมูลอื่นๆ
    }
];
```

### 📝 หน้าบทความ & วิดีโอ (`pages/activities.html`)

#### แก้ไขข้อมูลบทความ
```javascript
// ในไฟล์ pages/activities.html (บรรทัด 85+)
const blogData = [
    {
        id: 1,
        title: "หัวข้อบทความใหม่",
        excerpt: "สรุปบทความ",
        category: "หมวดหมู่",
        // ... ข้อมูลอื่นๆ
    }
];
```

---

## ➕ การเพิ่ม/ลบข้อมูล

### 📸 เพิ่มรูปภาพใหม่

1. **วางรูปในโฟลเดอร์ที่เหมาะสม**:
   ```
   images/operators/     # โลโก้ผู้ประกอบการ
   images/products/      # สินค้า (ชื่อ: product_01.jpg)
   images/trips/         # ทริป
   images/blog/          # บทความ (ชื่อ: blog_01_01.jpg)
   ```

2. **อัปเดตข้อมูลใน JavaScript**:
   ```javascript
   // เพิ่มในอาร์เรย์ข้อมูล
   {
       id: 9, // ID ใหม่
       name: "ชื่อใหม่",
       logo: IMAGE_CONFIG.getImageUrl('OPERATORS', 'logo-ใหม่.png'),
       // ... ข้อมูลอื่นๆ
   }
   ```

### 👥 เพิ่มผู้ประกอบการใหม่

1. **เพิ่มโลโก้**: วางไฟล์ในโฟลเดอร์ `images/operators/`
2. **เพิ่มข้อมูลใน `pages/operators.html`**:
   ```javascript
   const operatorsData = [
       // ... ข้อมูลเดิม
       {
           id: 9,
           name: "ชื่อผู้ประกอบการใหม่",
           logo: IMAGE_CONFIG.getImageUrl('OPERATORS', 'logo-ใหม่.png'),
           description: "คำอธิบาย",
           story: "เรื่องราว",
           activities: ["กิจกรรม 1", "กิจกรรม 2"],
           facebook: "https://facebook.com/page",
           location: "ชุมชนคลองบางมด เขตทุ่งครุ กรุงเทพฯ"
       }
   ];
   ```

### 🎒 เพิ่มทริปใหม่

1. **เพิ่มรูปทริป**: สร้างโฟลเดอร์ `images/trip09/` (ตัวเลขใหม่)
2. **เพิ่มข้อมูลใน `js/trip-details.js`**:
   ```javascript
   export const tripsData = [
       // ... ข้อมูลเดิม
       {
           id: 9,
           title: "ชื่อทริปใหม่",
           description: "คำอธิบาย",
           price: "999 บาท",
           duration: "1 วัน",
           difficulty: "ง่าย",
           // ... ข้อมูลอื่นๆ
       }
   ];
   ```

---

## 🎨 การปรับแต่งสไตล์

### 📐 เปลี่ยนจำนวนคอลัมน์ใน Grid

#### ผู้ประกอบการ (ปัจจุบัน: 4 คอลัมน์)
```css
/* ในไฟล์ css/style.css บรรทัด 747 */
.operators-grid {
    grid-template-columns: repeat(4, 1fr); /* เปลี่ยนเป็น 3, 5, etc. */
}
```

#### สินค้าชุมชน (ปัจจุบัน: 3 คอลัมน์)
```css
/* ในไฟล์ css/style.css บรรทัด 918 */
.product-grid {
    grid-template-columns: repeat(3, 1fr); /* เปลี่ยนเป็น 2, 4, etc. */
}
```

### 🌈 เปลี่ยนสี

```css
/* ในไฟล์ css/style.css บรรทัด 6-17 */
:root {
    --primary-color: #2E7D32;      /* สีเขียวหลัก */
    --secondary-color: #1976D2;    /* สีน้ำเงิน */
    --accent-color: #FF9800;       /* สีส้ม */
    --text-color: #333333;         /* สีข้อความ */
    --light-text: #666666;         /* สีข้อความอ่อน */
}
```

---

## 🚀 การรันเว็บไซต์

### 💻 รันบนเครื่องตัวเอง (Local)

```bash
# เปิด Terminal ในโฟลเดอร์โปรเจ็กต์
python3 -m http.server 8000

# เปิดเบราว์เซอร์ไปที่
http://localhost:8000/main.html
```

### 🌐 Deploy บน GitHub Pages

1. Push โค้ดขึ้น GitHub
2. ตั้งค่า GitHub Pages ในหน้า Settings
3. เว็บไซต์จะอยู่ที่ `https://yourusername.github.io/greenbluerestbangkok/main.html`

---

## 🔧 การแก้ไขปัญหาที่พบบ่อย

### ❌ รูปไม่แสดง
1. ตรวจสอบว่าไฟล์รูปอยู่ในโฟลเดอร์ที่ถูกต้อง
2. ตรวจสอบชื่อไฟล์ให้ตรงกับที่ระบุในโค้ด
3. ตรวจสอบว่า import `IMAGE_CONFIG` ถูกต้อง

### ❌ JavaScript ไม่ทำงาน
1. เปิด Developer Tools (F12) ดูใน Console
2. ตรวจสอบว่า import/export ใช้ `type="module"`
3. ตรวจสอบ path ของไฟล์ JavaScript

### ❌ Grid ไม่แสดงผล
1. ตรวจสอบว่าข้อมูลใน Array ถูกต้อง
2. ตรวจสอบ ID ของ element ใน HTML
3. ตรวจสอบ CSS Grid properties

---

## 📞 การติดต่อเพื่อขอความช่วยเหลือ

หากพบปัญหาหรือต้องการความช่วยเหลือ:
1. ตรวจสอบ Console ใน Developer Tools ก่อน
2. อ่านคู่มือนี้อีกครั้ง
3. ลองค้นหาใน Google ด้วยข้อผิดพลาดที่พบ

---

## 📋 Checklist การแก้ไข

- [ ] แก้ไขเนื้อหาใน HTML
- [ ] อัปเดตข้อมูลใน JavaScript Arrays
- [ ] เพิ่ม/เปลี่ยนรูปภาพในโฟลเดอร์ที่เหมาะสม
- [ ] ตรวจสอบใน Local Server ก่อน Deploy
- [ ] ทดสอบใน Mobile/Desktop
- [ ] ตรวจสอบใน Developer Tools ว่าไม่มี Error

---

*อัปเดตล่าสุด: สิงหาคม 2025*