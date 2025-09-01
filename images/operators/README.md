# 🏢 โฟลเดอร์ Operators - โลโก้และภาพผู้ประกอบการ

## 📋 **ระบบการตั้งชื่อไฟล์ใหม่ (แก้ไขแล้ว)**

### **ประเภทภาพที่แยกชัดเจน**

#### **1. โลโก้ (Logo)**
```
operator[number]-logo.[ext]
```
- `operator1-logo.jpg` - โลโก้ของ operator 1
- `operator2-logo.png` - โลโก้ของ operator 2
- `operator3-logo.jpg` - โลโก้ของ operator 3
- และอื่นๆ...

#### **2. ภาพใน Card (Card Image)**
```
operator[number]-card.[ext]
```
- `operator1-card.jpg` - ภาพใน Card ของ operator 1
- `operator2-card.jpg` - ภาพใน Card ของ operator 2
- `operator3-card.jpg` - ภาพใน Card ของ operator 3
- และอื่นๆ...

#### **3. ภาพหลัก (Main Image)**
```
operator[number]-main.[ext]
```
- `operator1-main.jpg` - ภาพหลักของ operator 1
- `operator2-main.jpg` - ภาพหลักของ operator 2
- `operator3-main.jpg` - ภาพหลักของ operator 3
- และอื่นๆ...

#### **4. ภาพแกลเลอรี่ (Gallery Images)**
```
operator[number]-gallery[number].[ext]
```
- `operator1-gallery1.jpg` - ภาพแกลเลอรี่ที่ 1 ของ operator 1
- `operator1-gallery2.jpg` - ภาพแกลเลอรี่ที่ 2 ของ operator 1
- `operator2-gallery1.jpg` - ภาพแกลเลอรี่ที่ 1 ของ operator 2
- และอื่นๆ...

## 🎯 **ข้อกำหนดภาพแต่ละประเภท**

### **โลโก้ (Logo)**
- **ขนาด**: 200x200px (1:1)
- **รูปแบบ**: .jpg หรือ .png
- **ขนาดไฟล์**: ไม่เกิน 100KB
- **คุณภาพ**: ความชัดเจนสูง, ความโปร่งใส (PNG)

### **ภาพใน Card (Card Image)**
- **ขนาด**: 400x300px (4:3)
- **รูปแบบ**: .jpg
- **ขนาดไฟล์**: ไม่เกิน 200KB
- **คุณภาพ**: แสดงกิจกรรมหรือผลิตภัณฑ์

### **ภาพหลัก (Main Image)**
- **ขนาด**: 800x600px (4:3)
- **รูปแบบ**: .jpg
- **ขนาดไฟล์**: ไม่เกิน 500KB
- **คุณภาพ**: ภาพคุณภาพสูง แสดงภาพรวม

### **ภาพแกลเลอรี่ (Gallery)**
- **ขนาด**: 600x450px (4:3)
- **รูปแบบ**: .jpg
- **ขนาดไฟล์**: ไม่เกิน 300KB
- **คุณภาพ**: ภาพประกอบเพิ่มเติม

## 📁 **โครงสร้างไฟล์ที่แนะนำ**

```
images/operators/
├── README.md                    # คู่มือนี้
├── operator1-logo.jpg           # โลโก้ operator 1
├── operator1-card.jpg           # ภาพใน Card operator 1
├── operator1-main.jpg           # ภาพหลัก operator 1
├── operator1-gallery1.jpg       # ภาพแกลเลอรี่ที่ 1 operator 1
├── operator1-gallery2.jpg       # ภาพแกลเลอรี่ที่ 2 operator 1
├── operator2-logo.png           # โลโก้ operator 2
├── operator2-card.jpg           # ภาพใน Card operator 2
├── operator2-main.jpg           # ภาพหลัก operator 2
├── operator2-gallery1.jpg       # ภาพแกลเลอรี่ที่ 1 operator 2
├── operator3-logo.jpg           # โลโก้ operator 3
├── operator3-card.jpg           # ภาพใน Card operator 3
├── operator3-main.jpg           # ภาพหลัก operator 3
└── ... (ทำแบบเดียวกันสำหรับ operator 4-9)
```

## 🔧 **การใช้งานในโค้ด**

### **JavaScript**
```javascript
const operatorImages = {
    logo: `images/operators/operator${operatorNumber}-logo.jpg`,
    card: `images/operators/operator${operatorNumber}-card.jpg`,
    main: `images/operators/operator${operatorNumber}-main.jpg`,
    gallery1: `images/operators/operator${operatorNumber}-gallery1.jpg`,
    gallery2: `images/operators/operator${operatorNumber}-gallery2.jpg`
};
```

### **HTML**
```html
<!-- โลโก้ -->
<img src="images/operators/operator1-logo.jpg" alt="Operator 1 Logo" class="operator-logo">

<!-- ภาพใน Card -->
<img src="images/operators/operator1-card.jpg" alt="Operator 1 Card" class="operator-card-img">

<!-- ภาพหลัก -->
<img src="images/operators/operator1-main.jpg" alt="Operator 1 Main" class="operator-main-img">

<!-- ภาพแกลเลอรี่ -->
<img src="images/operators/operator1-gallery1.jpg" alt="Operator 1 Gallery 1" class="operator-gallery-img">
```

### **CSS**
```css
.operator-logo {
    background-image: url('../images/operators/operator1-logo.jpg');
    background-size: contain;
    background-repeat: no-repeat;
}

.operator-card-img {
    background-image: url('../images/operators/operator1-card.jpg');
    background-size: cover;
    background-position: center;
}
```

## 📱 **การใช้งานในหน้าเว็บ**

### **หน้า Operators (pages/operators.html)**
- **โลโก้**: แสดงในส่วน header ของแต่ละ operator card
- **ภาพใน Card**: แสดงใต้โลโก้ใน operator card
- **ภาพหลัก**: แสดงในหน้า detail ของแต่ละ operator
- **ภาพแกลเลอรี่**: แสดงในส่วน gallery ของแต่ละ operator

### **หน้า Low Carbon Tourism (pages/low-carbon.html)**
- **โลโก้**: แสดงในส่วน business-operators-section
- **ภาพใน Card**: แสดงเป็นภาพประกอบใน operator card

## 🚀 **ขั้นตอนการเพิ่มภาพ**

### **1. เตรียมภาพ**
- ปรับขนาดตามข้อกำหนดแต่ละประเภท
- บีบอัดไฟล์ให้มีขนาดเหมาะสม
- ตั้งชื่อไฟล์ตามรูปแบบใหม่

### **2. วางไฟล์**
- วางในโฟลเดอร์ `images/operators/`
- ตรวจสอบชื่อไฟล์ให้ถูกต้อง

### **3. อัปเดตโค้ด**
- เปลี่ยนการอ้างอิงจาก `operatorX-main.jpg` เป็น `operatorX-logo.jpg` หรือ `operatorX-card.jpg`
- อัปเดต HTML, CSS, และ JavaScript

### **4. ทดสอบ**
- ตรวจสอบการแสดงผลบนเว็บไซต์
- ทดสอบ responsive design

## 📝 **หมายเหตุสำคัญ**

- **แยกประเภทภาพให้ชัดเจน**: อย่าใช้ชื่อเดียวกันสำหรับภาพประเภทต่างกัน
- **โลโก้**: ใช้สำหรับแสดงแบรนด์/ชื่อ
- **ภาพใน Card**: ใช้สำหรับแสดงใน operator card
- **ภาพหลัก**: ใช้สำหรับแสดงภาพรวมหรือภาพหลัก
- **ภาพแกลเลอรี่**: ใช้สำหรับแสดงภาพเพิ่มเติม

---

**อัปเดตล่าสุด**: มกราคม 2025
**สถานะ**: ✅ ระบบการตั้งชื่อใหม่เสร็จสิ้น
**หมายเหตุ**: แยกประเภทภาพชัดเจนแล้ว
