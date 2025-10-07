# 🖼️ โฟลเดอร์ Cover Images - ภาพปกเว็บไซต์

## 📋 **รายการภาพปกที่ต้องมี**

### **1. ภาพปกหลัก (Main Covers)**
- `low-carbon-cover.jpg` - ภาพปกหน้า Low Carbon Tourism
- `operators-cover.jpg` - ภาพปกหน้าผู้ประกอบการในชุมชน
- `trips-cover.jpg` - ภาพปกหน้าทริปท่องเที่ยว
- `products-cover.jpg` - ภาพปกหน้าสินค้าชุมชน
- `activities-cover.jpg` - ภาพปกหน้าบทความ & วิดีโอ
- `learning-city-cover.jpg` - ภาพปกหน้า Learning City
- `contact-cover.jpg` - ภาพปกหน้าติดต่อเรา

### **2. ภาพปกหน้าแรก (Homepage)**
- `hero-cover.jpg` - ภาพปกหลักหน้าแรก
- `about-cover.jpg` - ภาพปกส่วนเกี่ยวกับเรา
- `features-cover.jpg` - ภาพปกส่วนคุณสมบัติ

## 🎯 **ข้อกำหนดภาพปก**

### **ขนาดภาพ (Recommended)**
- **ความกว้าง**: 1200px - 1920px
- **ความสูง**: 400px - 600px
- **สัดส่วน**: 3:1 หรือ 4:1 (แนวนอน)
- **รูปแบบไฟล์**: .jpg (สำหรับภาพถ่าย), .png (สำหรับกราฟิก)

### **คุณภาพภาพ**
- **ความละเอียด**: 72 DPI (สำหรับเว็บ)
- **ขนาดไฟล์**: ไม่เกิน 500KB
- **การบีบอัด**: ใช้ JPEG quality 80-85%

## 📁 **โครงสร้างไฟล์**

```
images/cover/
├── README.md                    # คู่มือนี้
├── low-carbon-cover.jpg        # ภาพปก Low Carbon Tourism
├── operators-cover.jpg         # ภาพปกผู้ประกอบการ
├── trips-cover.jpg             # ภาพปกทริปท่องเที่ยว
├── products-cover.jpg          # ภาพปกสินค้าชุมชน
├── activities-cover.jpg        # ภาพปกบทความ & วิดีโอ
├── learning-city-cover.jpg     # ภาพปก Learning City
├── contact-cover.jpg           # ภาพปกติดต่อเรา
├── hero-cover.jpg              # ภาพปกหน้าแรก
├── about-cover.jpg             # ภาพปกเกี่ยวกับเรา
└── features-cover.jpg          # ภาพปกคุณสมบัติ
```

## 🔧 **การใช้งานในโค้ด**

### **HTML Meta Tags**
```html
<meta property="og:image" content="https://greenbluerestbangkok.com/images/cover/low-carbon-cover.jpg">
```

### **CSS Background**
```css
.cover-section {
    background-image: url('../images/cover/low-carbon-cover.jpg');
    background-size: cover;
    background-position: center;
}
```

### **JavaScript**
```javascript
const coverImage = `images/cover/${pageName}-cover.jpg`;
```

## 📝 **หมายเหตุ**

- ภาพปกควรมีความเกี่ยวข้องกับเนื้อหาของแต่ละหน้า
- ใช้ภาพที่มีคุณภาพสูงและเหมาะสมกับธีมของเว็บไซต์
- ตรวจสอบขนาดไฟล์ไม่ให้ใหญ่เกินไปเพื่อประสิทธิภาพการโหลด
- ใช้ alt text ที่อธิบายภาพอย่างชัดเจน

## 🚀 **ขั้นตอนการเพิ่มภาพปก**

1. **เตรียมภาพ**: ปรับขนาดและคุณภาพตามข้อกำหนด
2. **ตั้งชื่อ**: ใช้รูปแบบ `[page-name]-cover.jpg`
3. **วางไฟล์**: ในโฟลเดอร์ `images/cover/`
4. **อัปเดตโค้ด**: เพิ่มการอ้างอิงใน HTML/CSS/JavaScript
5. **ทดสอบ**: ตรวจสอบการแสดงผลบนเว็บไซต์

---

**อัปเดตล่าสุด**: มกราคม 2025
**สถานะ**: ⚠️ รอเพิ่มภาพปก
