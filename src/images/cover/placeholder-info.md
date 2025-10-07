# 📋 รายการภาพที่ต้องเพิ่มในโฟลเดอร์ Cover

## 🚨 **สถานะปัจจุบัน**: รอเพิ่มภาพ

### **ภาพที่ต้องมี (Priority: High)**

#### **1. ภาพปกหลัก (Main Covers)**
- [ ] `low-carbon-cover.jpg` - ภาพปกหน้า Low Carbon Tourism
- [ ] `operators-cover.jpg` - ภาพปกหน้าผู้ประกอบการในชุมชน
- [ ] `trips-cover.jpg` - ภาพปกหน้าทริปท่องเที่ยว
- [ ] `products-cover.jpg` - ภาพปกหน้าสินค้าชุมชน
- [ ] `activities-cover.jpg` - ภาพปกหน้าบทความ & วิดีโอ
- [ ] `learning-city-cover.jpg` - ภาพปกหน้า Learning City
- [ ] `contact-cover.jpg` - ภาพปกหน้าติดต่อเรา

#### **2. ภาพปกหน้าแรก (Homepage)**
- [ ] `hero-cover.jpg` - ภาพปกหลักหน้าแรก
- [ ] `about-cover.jpg` - ภาพปกส่วนเกี่ยวกับเรา
- [ ] `features-cover.jpg` - ภาพปกส่วนคุณสมบัติ

## 🎯 **ข้อกำหนดภาพ**

### **ขนาดภาพ (Recommended)**
- **ความกว้าง**: 1200px - 1920px
- **ความสูง**: 400px - 600px
- **สัดส่วน**: 3:1 หรือ 4:1 (แนวนอน)
- **รูปแบบไฟล์**: .jpg (สำหรับภาพถ่าย), .png (สำหรับกราฟิก)

### **คุณภาพภาพ**
- **ความละเอียด**: 72 DPI (สำหรับเว็บ)
- **ขนาดไฟล์**: ไม่เกิน 500KB
- **การบีบอัด**: ใช้ JPEG quality 80-85%

## 🖼️ **ตัวอย่างภาพที่ต้องการ**

### **Low Carbon Tourism Cover**
- ภาพธรรมชาติ สวน ต้นไม้
- สีเขียว สีฟ้า (ธรรมชาติ)
- แสดงกิจกรรมการท่องเที่ยวอย่างยั่งยืน

### **Operators Cover**
- ภาพชุมชน ผู้คน งานฝีมือ
- สีธรรมชาติ สีอบอุ่น
- แสดงวิถีชีวิตชุมชน

### **Trips Cover**
- ภาพท่องเที่ยว แหล่งท่องเที่ยว
- สีสดใส สีธรรมชาติ
- แสดงประสบการณ์การท่องเที่ยว

### **Products Cover**
- ภาพสินค้าชุมชน งานฝีมือ
- สีธรรมชาติ สีสดใส
- แสดงผลิตภัณฑ์ท้องถิ่น

## 📱 **การใช้งาน**

### **HTML Meta Tags**
```html
<meta property="og:image" content="https://greenbluerestbangkok.com/images/cover/[page-name]-cover.jpg">
```

### **CSS Background**
```css
.cover-section {
    background-image: url('../images/cover/[page-name]-cover.jpg');
    background-size: cover;
    background-position: center;
}
```

## 🚀 **ขั้นตอนการเพิ่มภาพ**

1. **เตรียมภาพ**: ปรับขนาดและคุณภาพตามข้อกำหนด
2. **ตั้งชื่อ**: ใช้รูปแบบ `[page-name]-cover.jpg`
3. **วางไฟล์**: ในโฟลเดอร์ `images/cover/`
4. **อัปเดตโค้ด**: เพิ่มการอ้างอิงใน HTML/CSS/JavaScript
5. **ทดสอบ**: ตรวจสอบการแสดงผลบนเว็บไซต์

## 📞 **หากต้องการความช่วยเหลือ**

- ดูคู่มือใน `images/cover/README.md`
- ตรวจสอบรูปแบบการตั้งชื่อใน `images/NAMING_CONVENTION.md`
- ใช้สคริปต์ตรวจสอบ: `./scripts/check-image-status.sh`

---

**สถานะ**: ⚠️ รอเพิ่มภาพ
**ความสำคัญ**: 🔴 สูง (จำเป็นสำหรับการแสดงผลเว็บไซต์)
