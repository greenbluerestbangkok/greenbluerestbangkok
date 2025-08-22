# 📸 คู่มือการใส่ภาพบนเว็บไซต์ Green Blue Rest

## 📁 โครงสร้างโฟลเดอร์ภาพ

```
images/
├── blog/               # ภาพสำหรับบทความ Blog ✅
├── vlog/               # ภาพ Thumbnail สำหรับ Vlog ✅
├── operators/          # โลโก้ผู้ประกอบการ ✅ (มีไฟล์แล้ว)
├── trips/             # ภาพทริปท่องเที่ยว ✅
├── products/          # ภาพสินค้าชุมชน ✅
├── low-carbon/        # ภาพส่วน Low Carbon ✅
├── hero/              # ภาพหน้าแรก (Hero Section) ✅
└── general/           # ภาพทั่วไป ✅
```

> 💡 **หมายเหตุ**: โฟลเดอร์ทั้งหมดถูกสร้างเรียบร้อยแล้ว พร้อมใช้งาน!

## 🎯 ขนาดภาพที่แนะนำ

### 📝 Blog & Vlog
- **ภาพบทความ Blog**: 800x400px (16:9)
- **Thumbnail Vlog**: 800x450px (16:9)  
- **ขนาดไฟล์**: ไม่เกิน 500KB

### 🏢 โลโก้ผู้ประกอบการ
- **ขนาด**: 400x400px (1:1 - สี่เหลี่ยมจัตุรัส)
- **รูปแบบ**: PNG (พื้นหลังโปร่งใส) หรือ JPG
- **ขนาดไฟล์**: ไม่เกิน 200KB
- **สถานะ**: ✅ มีไฟล์ครบ 8 รายการแล้ว

### 🎒 ภาพทริปท่องเที่ยว
- **ภาพหลัก**: 1200x800px (3:2)
- **ภาพย่อย**: 600x400px (3:2)
- **ขนาดไฟล์**: ไม่เกิน 800KB

### 🛍️ ภาพสินค้า
- **ขนาด**: 600x600px (1:1)
- **รูปแบบ**: JPG หรือ PNG
- **ขนาดไฟล์**: ไม่เกิน 300KB

## 🚀 วิธีการเพิ่มภาพ (วิธีง่ายที่สุด)

### วิธีที่ 1: ใช้ไฟล์ผ่าน Finder/File Explorer

1. **เตรียมภาพ**: ปรับขนาดตามที่แนะนำ
2. **คัดลอกไฟล์**: วางไฟล์ลงในโฟลเดอร์ที่เหมาะสม
   ```
   /images/blog/my-new-post.jpg
   /images/operators/company-logo.png
   ```
3. **แก้ไขโค้ด**: ใช้ Config หรือ Helper functions (แนะนำ)

> 🎯 **โฟลเดอร์พร้อมใช้งาน**: ทุกโฟลเดอร์ถูกสร้างเรียบร้อยแล้ว คุณสามารถวางไฟล์ภาพได้ทันที!

### วิธีที่ 2: ใช้ Config และ Helper Functions (แนะนำ)

#### ใช้ไฟล์ `js/config.js`:
```javascript
import { IMAGE_CONFIG } from './config.js';

// ตัวอย่างการใช้งาน
image: IMAGE_CONFIG.getImageUrl('PRODUCTS', 'product1.jpg')
image: IMAGE_CONFIG.getTripImageUrl(1, 'small', 'kayak-1.jpg')
```

#### ใช้ไฟล์ `js/image-helper.js`:
```javascript
// ตัวอย่างการใช้งาน
image: ImageHelper.getProductImageUrl('product1.jpg')
image: ImageHelper.getTripImageUrl(1, 'small', 'kayak-1.jpg')
```

### วิธีที่ 3: ใช้รูปภาพออนไลน์ (สำหรับทดสอบ)

```html
<!-- ใช้ URL จาก unsplash หรือ placeholder services -->
<img src="https://picsum.photos/800/400" alt="ภาพตัวอย่าง">
```

## 📋 ตัวอย่างการแก้ไขไฟล์

### เพิ่มภาพ Blog ใหม่

**1. วางไฟล์ภาพ:**
```
/images/blog/new-article.jpg
```

**2. แก้ไข `js/blog-data.js` (ใช้ Config):**
```javascript
import { IMAGE_CONFIG } from './config.js';

{
  id: 6,
  title: "บทความใหม่",
  image: IMAGE_CONFIG.getImageUrl('BLOG', 'new-article.jpg'), // ใช้ Config
  // ...
}
```

**หรือใช้ Helper:**
```javascript
{
  id: 6,
  title: "บทความใหม่",
  image: ImageHelper.getBlogImageUrl('new-article.jpg'), // ใช้ Helper
  // ...
}
```

### เพิ่มโลโก้ผู้ประกอบการใหม่

**1. วางไฟล์โลโก้:**
```
/images/operators/new-company.png
```

**2. แก้ไข `pages/low-carbon.html`:**
```html
<img src="../images/operators/new-company.png" 
     alt="บริษัทใหม่" 
     class="operator-img">
```

> 💡 **หมายเหตุ**: โฟลเดอร์ `images/operators/` มีโลโก้ครบ 8 รายการแล้ว หากต้องการเพิ่มใหม่ ให้วางไฟล์ในโฟลเดอร์นี้

### เพิ่มภาพสินค้าใหม่

**1. วางไฟล์ภาพ:**
```
/images/products/product21.jpg
```

**2. แก้ไข `js/products.js` (ใช้ Config):**
```javascript
import { IMAGE_CONFIG } from './config.js';

{
  id: 21,
  name: "สินค้าใหม่",
  image: IMAGE_CONFIG.getImageUrl('PRODUCTS', 'product21.jpg'), // ใช้ Config
  // ...
}
```

**หรือใช้ Helper:**
```javascript
{
  id: 21,
  name: "สินค้าใหม่",
  image: ImageHelper.getProductImageUrl('product21.jpg'), // ใช้ Helper
  // ...
}
```

## 🛠️ เครื่องมือแนะนำสำหรับปรับขนาดภาพ

### ออนไลน์ (ฟรี)
- **ResizeImage.net** - ปรับขนาดง่าย
- **TinyPNG** - ลดขนาดไฟล์
- **Canva** - สร้างและแก้ไขภาพ

### โปรแกรมคอมพิวเตอร์
- **GIMP** (ฟรี) - แก้ไขภาพขั้นสูง
- **Paint.NET** (Windows, ฟรี)
- **Preview** (Mac) - ปรับขนาดพื้นฐาน

## ⚠️ ข้อควรระวัง

### ชื่อไฟล์
- ใช้ภาษาอังกฤษเท่านั้น
- ไม่มีช่องว่าง (ใช้ - หรือ _ แทน)
- ตัวอย่าง: `blog-post-1.jpg`, `company_logo.png`

### ลิขสิทธิ์
- ใช้ภาพที่มีลิขสิทธิ์ถูกต้อง
- แหล่งภาพฟรี: Unsplash, Pexels, Pixabay

### ประสิทธิภาพ
- ขนาดไฟล์เล็กดีกว่าใหญ่
- รูปแบบ JPG สำหรับภาพถ่าย
- รูปแบบ PNG สำหรับโลโก้/กราฟิก

## 📞 ตัวอย่างรหัสที่ใช้บ่อย

### ภาพพร้อม Fallback
```html
<img src="/images/blog/article1.jpg" 
     alt="ชื่อบทความ" 
     onerror="this.src='/images/placeholder.jpg'">
```

### ภาพแบบ Responsive
```html
<img src="/images/trips/trip1.jpg" 
     alt="ทริปท่องเที่ยว" 
     class="responsive-img">
```

### CSS สำหรับภาพ
```css
.responsive-img {
    width: 100%;
    height: auto;
    object-fit: cover;
}
```

## ✅ Checklist ก่อนเพิ่มภาพ

- [ ] ขนาดภาพถูกต้องตามที่แนะนำ
- [ ] ขนาดไฟล์ไม่เกินที่กำหนด  
- [ ] ชื่อไฟล์เป็นภาษาอังกฤษ ไม่มีช่องว่าง
- [ ] วางในโฟลเดอร์ที่ถูกต้อง ✅ (โฟลเดอร์พร้อมใช้งานแล้ว)
- [ ] แก้ไข path ในโค้ดแล้ว
- [ ] ทดสอบการแสดงผลบนเบราว์เซอร์

## 🎉 สถานะปัจจุบัน

- **โฟลเดอร์ภาพ**: ✅ สร้างครบทุกโฟลเดอร์แล้ว
- **โลโก้ผู้ประกอบการ**: ✅ มีไฟล์ครบ 8 รายการแล้ว
- **โครงสร้าง**: ✅ พร้อมใช้งานทันที
- **Config & Helper**: ✅ สร้างไฟล์สำหรับจัดการ path แล้ว
- **การแก้ไข**: ✅ แก้ไขไฟล์ทั้งหมดให้ใช้ absolute path แล้ว

## 🔧 ไฟล์ที่แก้ไขแล้ว

### ✅ HTML Files:
- `pages/activities.html` - แก้ไข 6 รูปภาพ
- `pages/contact.html` - แก้ไข 1 รูปภาพ
- `pages/low-carbon.html` - แก้ไข 1 รูปภาพ + 8 โลโก้
- `pages/blog/index.html` - แก้ไข 6 รูปภาพ
- `pages/blog/eating-at-pa-da-garden.html` - แก้ไข 1 รูปภาพ

### ✅ JavaScript Files:
- `js/products.js` - แก้ไข 18 รูปภาพสินค้า
- `js/trip-details.js` - แก้ไข 54 รูปภาพทริป

### ✅ Config Files:
- `js/config.js` - สร้างไฟล์ config ใหม่
- `js/image-helper.js` - สร้างไฟล์ helper ใหม่

---

📝 **หมายเหตุ**: หากมีปัญหาในการใส่ภาพ ให้ตรวจสอบ path ของไฟล์ก่อน โดยใช้ Developer Tools ในเบราว์เซอร์ (F12)

## 🚀 ข้อดีของการใช้ Config และ Helper

1. **แก้ไขที่เดียว**: เปลี่ยน path ในไฟล์ config เดียว แก้ปัญหาทั้งหมด
2. **ป้องกันข้อผิดพลาด**: ไม่ต้องจำ path ที่ซับซ้อน
3. **ง่ายต่อการบำรุงรักษา**: เมื่อเปลี่ยน repository name แก้ที่เดียว
4. **รองรับหลาย environment**: สามารถปรับ config ให้เหมาะกับ local และ production
5. **Code Reusability**: ใช้ฟังก์ชันเดียวกันในหลายไฟล์

## 🔄 การแก้ไขในอนาคต

หากต้องการเปลี่ยน path ในอนาคต ให้แก้ไขในไฟล์เดียว:

**แก้ไข `js/config.js`:**
```javascript
export const IMAGE_CONFIG = {
    BASE_URL: '/new-repository-name', // เปลี่ยนที่นี่เดียว
    // ...
};
```

**หรือแก้ไข `js/image-helper.js`:**
```javascript
const IMAGE_BASE_URL = '/new-repository-name'; // เปลี่ยนที่นี่เดียว
```