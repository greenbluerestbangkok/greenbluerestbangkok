# 🏠 โฟลเดอร์ Hero Images - ภาพปกหน้าแรก

## 📋 **รายการภาพที่ต้องมี**

### **1. ภาพปกหลัก (Main Hero)**
- `hero-main.jpg` - ภาพปกหลักหน้าแรก (ขนาดใหญ่)
- `hero-mobile.jpg` - ภาพปกสำหรับมือถือ (ขนาดเล็ก)

### **2. ภาพประกอบหน้าแรก**
- `about-section.jpg` - ภาพส่วนเกี่ยวกับเรา
- `features-section.jpg` - ภาพส่วนคุณสมบัติ
- `community-section.jpg` - ภาพส่วนชุมชน
- `sustainability-section.jpg` - ภาพส่วนความยั่งยืน

### **3. ภาพพื้นหลัง**
- `hero-bg.jpg` - ภาพพื้นหลังส่วน hero
- `section-bg.jpg` - ภาพพื้นหลังส่วนต่างๆ

## 🎯 **ข้อกำหนดภาพ**

### **ขนาดภาพ (Recommended)**
- **Hero Main**: 1920x600px (16:5)
- **Hero Mobile**: 800x400px (2:1)
- **Section Images**: 1200x400px (3:1)
- **Background Images**: 1920x1080px (16:9)

### **รูปแบบไฟล์**
- **ภาพถ่าย**: .jpg (JPEG quality 85%)
- **กราฟิก**: .png (สำหรับภาพที่มีความโปร่งใส)
- **ขนาดไฟล์**: ไม่เกิน 800KB

### **ธีมภาพ**
- **สีเขียว**: ธรรมชาติ, สวน, ต้นไม้
- **สีฟ้า**: ท้องฟ้า, น้ำ, อากาศบริสุทธิ์
- **สีน้ำตาล**: ดิน, ไม้, วัสดุธรรมชาติ
- **สีทอง**: แสงอาทิตย์, ความอบอุ่น

## 📁 **โครงสร้างไฟล์**

```
images/hero/
├── README.md                    # คู่มือนี้
├── hero-main.jpg               # ภาพปกหลักหน้าแรก
├── hero-mobile.jpg             # ภาพปกสำหรับมือถือ
├── about-section.jpg            # ภาพส่วนเกี่ยวกับเรา
├── features-section.jpg         # ภาพส่วนคุณสมบัติ
├── community-section.jpg        # ภาพส่วนชุมชน
├── sustainability-section.jpg   # ภาพส่วนความยั่งยืน
├── hero-bg.jpg                 # ภาพพื้นหลังส่วน hero
└── section-bg.jpg              # ภาพพื้นหลังส่วนต่างๆ
```

## 🔧 **การใช้งานในโค้ด**

### **HTML Meta Tags**
```html
<meta property="og:image" content="https://greenbluerestbangkok.com/images/hero/hero-main.jpg">
```

### **CSS Background**
```css
.hero-section {
    background-image: url('../images/hero/hero-main.jpg');
    background-size: cover;
    background-position: center;
}

@media (max-width: 768px) {
    .hero-section {
        background-image: url('../images/hero/hero-mobile.jpg');
    }
}
```

### **JavaScript**
```javascript
const heroImages = {
    main: 'images/hero/hero-main.jpg',
    mobile: 'images/hero/hero-mobile.jpg',
    about: 'images/hero/about-section.jpg',
    features: 'images/hero/features-section.jpg',
    community: 'images/hero/community-section.jpg',
    sustainability: 'images/hero/sustainability-section.jpg'
};
```

## 📱 **Responsive Design**

### **Desktop (≥1200px)**
- ใช้ `hero-main.jpg` (1920x600px)
- ภาพเต็มหน้าจอ

### **Tablet (768px-1199px)**
- ใช้ `hero-main.jpg` (ปรับขนาด)
- ภาพครอบคลุมหน้าจอ

### **Mobile (≤767px)**
- ใช้ `hero-mobile.jpg` (800x400px)
- ภาพเหมาะสมกับหน้าจอมือถือ

## 📝 **หมายเหตุ**

- ภาพควรสะท้อนเอกลักษณ์ของชุมชนคลองบางมด
- เน้นการใช้สีธรรมชาติและบรรยากาศที่เป็นมิตร
- ภาพควรแสดงกิจกรรมการท่องเที่ยวชุมชน
- ใช้ภาพที่มีคุณภาพสูงและเหมาะสมกับธีมของเว็บไซต์

## 🚀 **ขั้นตอนการเพิ่มภาพ**

1. **เตรียมภาพ**: ปรับขนาดและคุณภาพตามข้อกำหนด
2. **ตั้งชื่อ**: ใช้รูปแบบที่กำหนดในคู่มือนี้
3. **วางไฟล์**: ในโฟลเดอร์ `images/hero/`
4. **อัปเดตโค้ด**: เพิ่มการอ้างอิงใน HTML/CSS/JavaScript
5. **ทดสอบ**: ตรวจสอบการแสดงผลบนอุปกรณ์ต่างๆ

---

**อัปเดตล่าสุด**: มกราคม 2025
**สถานะ**: ⚠️ รอเพิ่มภาพ
