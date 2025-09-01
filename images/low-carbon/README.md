# 🌱 โฟลเดอร์ Low Carbon Tourism Images

## 📋 **รายการภาพที่ต้องมี**

### **1. ภาพปกหลัก**
- `cover.jpg` - ภาพปกหน้า Low Carbon Tourism

### **2. ภาพประกอบเนื้อหา**
- `walking-cycling.jpg` - ภาพการเดินเท้าและจักรยาน
- `local-accommodation.jpg` - ภาพพักในชุมชนท้องถิ่น
- `nature-activities.jpg` - ภาพกิจกรรมธรรมชาติ
- `local-products.jpg` - ภาพซื้อของท้องถิ่น

### **3. ภาพประโยชน์**
- `environment-benefits.jpg` - ภาพประโยชน์ต่อสิ่งแวดล้อม
- `community-benefits.jpg` - ภาพประโยชน์ต่อชุมชน
- `tourist-benefits.jpg` - ภาพประโยชน์ต่อนักท่องเที่ยว

## 🎯 **ข้อกำหนดภาพ**

### **ขนาดภาพ (Recommended)**
- **ภาพปก**: 1200x400px (3:1)
- **ภาพประกอบ**: 800x600px (4:3)
- **รูปแบบไฟล์**: .jpg
- **ขนาดไฟล์**: ไม่เกิน 300KB

### **ธีมภาพ**
- **สีเขียว**: ธรรมชาติ, ต้นไม้, สวน
- **สีฟ้า**: ท้องฟ้า, น้ำ, อากาศบริสุทธิ์
- **สีน้ำตาล**: ดิน, ไม้, วัสดุธรรมชาติ
- **สีขาว**: พลังงานสะอาด, ความบริสุทธิ์

## 📁 **โครงสร้างไฟล์**

```
images/low-carbon/
├── README.md                    # คู่มือนี้
├── cover.jpg                    # ภาพปกหลัก
├── walking-cycling.jpg         # การเดินเท้าและจักรยาน
├── local-accommodation.jpg     # พักในชุมชนท้องถิ่น
├── nature-activities.jpg       # กิจกรรมธรรมชาติ
├── local-products.jpg          # ซื้อของท้องถิ่น
├── environment-benefits.jpg    # ประโยชน์ต่อสิ่งแวดล้อม
├── community-benefits.jpg      # ประโยชน์ต่อชุมชน
└── tourist-benefits.jpg        # ประโยชน์ต่อนักท่องเที่ยว
```

## 🔧 **การใช้งานในโค้ด**

### **HTML Meta Tags**
```html
<meta property="og:image" content="https://greenbluerestbangkok.com/images/low-carbon/cover.jpg">
```

### **CSS Background**
```css
.low-carbon-cover {
    background-image: url('../images/low-carbon/cover.jpg');
    background-size: cover;
    background-position: center;
}
```

### **JavaScript**
```javascript
const lowCarbonImages = {
    cover: 'images/low-carbon/cover.jpg',
    walking: 'images/low-carbon/walking-cycling.jpg',
    accommodation: 'images/low-carbon/local-accommodation.jpg',
    nature: 'images/low-carbon/nature-activities.jpg',
    products: 'images/low-carbon/local-products.jpg'
};
```

## 📝 **หมายเหตุ**

- ภาพควรสะท้อนแนวคิดการท่องเที่ยวอย่างยั่งยืน
- เน้นการใช้สีธรรมชาติและบรรยากาศที่เป็นมิตรต่อสิ่งแวดล้อม
- ภาพควรแสดงกิจกรรมที่เกี่ยวข้องกับ Low Carbon Tourism
- ใช้ภาพที่มีคุณภาพสูงและเหมาะสมกับธีมของเว็บไซต์

## 🚀 **ขั้นตอนการเพิ่มภาพ**

1. **เตรียมภาพ**: ปรับขนาดและคุณภาพตามข้อกำหนด
2. **ตั้งชื่อ**: ใช้รูปแบบที่กำหนดในคู่มือนี้
3. **วางไฟล์**: ในโฟลเดอร์ `images/low-carbon/`
4. **อัปเดตโค้ด**: เพิ่มการอ้างอิงใน HTML/CSS/JavaScript
5. **ทดสอบ**: ตรวจสอบการแสดงผลบนเว็บไซต์

---

**อัปเดตล่าสุด**: มกราคม 2025
**สถานะ**: ⚠️ รอเพิ่มภาพ
