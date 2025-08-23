# 📁 โครงสร้างโฟลเดอร์ภาพ - ระบบเลขที่รันไปเรื่อยๆ

## 🎯 **ระบบการตั้งชื่อไฟล์ใหม่**

### 📸 **ภาพทริปท่องเที่ยว (Trips)**
```
images/trip01/small/trip_01_01.jpg  ← ภาพหลัก (ขนาดเล็ก)
images/trip01/large/trip_01_01.jpg  ← ภาพหลัก (ขนาดใหญ่)
images/trip01/large/trip_01_02.jpg  ← ภาพรองที่ 1
images/trip01/large/trip_01_03.jpg  ← ภาพรองที่ 2
images/trip01/large/trip_01_04.jpg  ← ภาพรองที่ 3

images/trip02/small/trip_02_01.jpg  ← ภาพหลัก (ขนาดเล็ก)
images/trip02/large/trip_02_01.jpg  ← ภาพหลัก (ขนาดใหญ่)
images/trip02/large/trip_02_02.jpg  ← ภาพรองที่ 1
images/trip02/large/trip_02_03.jpg  ← ภาพรองที่ 2
images/trip02/large/trip_02_04.jpg  ← ภาพรองที่ 3

... และต่อไปเรื่อยๆ จนถึง trip18
```

### 🛍️ **ภาพสินค้า (Products)**
```
images/products/product_01.jpg  ← สินค้าที่ 1
images/products/product_02.jpg  ← สินค้าที่ 2
images/products/product_03.jpg  ← สินค้าที่ 3
... และต่อไปเรื่อยๆ จนถึง product_15
```

### 📝 **ภาพบทความ (Blog)**
```
images/blog/blog_01_01.jpg  ← บทความที่ 1 ภาพหลัก
images/blog/blog_01_02.jpg  ← บทความที่ 1 ภาพรอง
images/blog/blog_01_03.jpg  ← บทความที่ 1 ภาพรอง

images/blog/blog_02_01.jpg  ← บทความที่ 2 ภาพหลัก
images/blog/blog_02_02.jpg  ← บทความที่ 2 ภาพรอง
... และต่อไปเรื่อยๆ
```

### 🎬 **ภาพวิดีโอ (Vlog)**
```
images/vlog/vlog_01_01.jpg  ← วิดีโอที่ 1 ภาพหลัก
images/vlog/vlog_01_02.jpg  ← วิดีโอที่ 1 ภาพรอง
... และต่อไปเรื่อยๆ
```

### 🏢 **โลโก้ผู้ประกอบการ (Operators)**
```
images/operators/safetist-farm.png
images/operators/ban-khian-wad.png
images/operators/talad-mod-tanoi.png
images/operators/kampong-nai-dong-pru.png
images/operators/visahakit-chumchon-arraya.png
images/operators/art-lab.png
images/operators/smore-town.png
images/operators/nitan-sin-baan-darun.png
```

### 🌱 **ภาพ Low Carbon Tourism**
```
images/low-carbon/cover.jpg  ← ภาพหน้าปก
```

### 🖼️ **ภาพทั่วไป (General)**
```
images/general/qr-kbank.png  ← QR Code ธนาคาร
```

## ✅ **ข้อดีของระบบใหม่**

1. **ง่ายต่อการจัดการ** - ไม่ต้องจำชื่อไฟล์เฉพาะเจาะจง
2. **ขยายได้ไม่จำกัด** - เพิ่มทริป/สินค้าใหม่ได้ง่าย
3. **เป็นระบบ** - ใช้ JavaScript เรียกใช้ได้อัตโนมัติ
4. **แก้ไขง่าย** - เปลี่ยนชื่อไฟล์ได้โดยไม่กระทบโค้ด

## 🔧 **การใช้งานในโค้ด**

### **ภาพทริป**
```javascript
// ใช้ฟังก์ชันใหม่
IMAGE_CONFIG.getTripImageUrlByNumber(tripId, size, imageNumber)

// ตัวอย่าง
IMAGE_CONFIG.getTripImageUrlByNumber(1, 'small', 1)  // → /images/trip01/small/trip_01_01.jpg
IMAGE_CONFIG.getTripImageUrlByNumber(1, 'large', 2)  // → /images/trip01/large/trip_01_02.jpg
```

### **ภาพสินค้า**
```javascript
// ใช้ฟังก์ชันใหม่
IMAGE_CONFIG.getProductImageUrlByNumber(productNumber)

// ตัวอย่าง
IMAGE_CONFIG.getProductImageUrlByNumber(1)  // → /images/products/product_01.jpg
```

### **ภาพบทความ**
```javascript
// ใช้ฟังก์ชันใหม่
IMAGE_CONFIG.getBlogImageUrlByNumber(blogNumber, imageNumber)

// ตัวอย่าง
IMAGE_CONFIG.getBlogImageUrlByNumber(1, 1)  // → /images/blog/blog_01_01.jpg
```

## 📋 **รายการไฟล์ที่ต้องมี**

### **ทริปท่องเที่ยว (18 ทริป)**
- `trip01/small/trip_01_01.jpg` - ภาพหลักขนาดเล็ก
- `trip01/large/trip_01_01.jpg` - ภาพหลักขนาดใหญ่
- `trip01/large/trip_01_02.jpg` - ภาพรองที่ 1
- `trip01/large/trip_01_03.jpg` - ภาพรองที่ 2
- `trip01/large/trip_01_04.jpg` - ภาพรองที่ 3
- ... ทำแบบเดียวกันสำหรับ trip02 ถึง trip18

### **สินค้า (15 รายการ)**
- `products/product_01.jpg` ถึง `products/product_15.jpg`

### **บทความ (6 บทความ)**
- `blog/blog_01_01.jpg` ถึง `blog/blog_06_01.jpg`

## 🚀 **ขั้นตอนการอัปเดต**

1. **เปลี่ยนชื่อไฟล์** ตามระบบใหม่
2. **อัปเดตโค้ด** ให้ใช้ฟังก์ชันใหม่
3. **ทดสอบ** ว่าภาพแสดงผลถูกต้อง
4. **Commit และ Push** ขึ้น GitHub

## 📝 **หมายเหตุ**

- ไฟล์ภาพต้องมีนามสกุล `.jpg` สำหรับภาพ และ `.png` สำหรับโลโก้
- ขนาดภาพทริป: small (300x200px), large (800x600px)
- ขนาดภาพสินค้า: 600x600px (1:1)
- ขนาดภาพบทความ: 800x600px
