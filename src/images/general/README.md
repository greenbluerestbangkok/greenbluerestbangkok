# 🎯 โฟลเดอร์ General Images - ภาพทั่วไป

## 📋 **รายการภาพที่ต้องมี**

### **1. ภาพธนาคารและการชำระเงิน**
- `qr-kbank.png` - QR Code ธนาคารกสิกรไทย
- `qr-scb.png` - QR Code ธนาคารไทยพาณิชย์
- `qr-bbl.png` - QR Code ธนาคารกรุงเทพ
- `payment-methods.png` - วิธีการชำระเงิน

### **2. ภาพโลโก้และแบรนด์**
- `logo-main.png` - โลโก้หลักของเว็บไซต์
- `logo-white.png` - โลโก้สีขาว (สำหรับพื้นหลังเข้ม)
- `logo-black.png` - โลโก้สีดำ (สำหรับพื้นหลังอ่อน)
- `favicon.ico` - ไอคอนเว็บไซต์

### **3. ภาพไอคอนและสัญลักษณ์**
- `map-icon.png` - ไอคอนแผนที่
- `phone-icon.png` - ไอคอนโทรศัพท์
- `email-icon.png` - ไอคอนอีเมล
- `location-icon.png` - ไอคอนตำแหน่ง

### **4. ภาพพื้นหลังและ Texture**
- `pattern-bg.png` - ภาพพื้นหลังแบบลวดลาย
- `gradient-bg.jpg` - ภาพพื้นหลังแบบไล่สี
- `texture-bg.jpg` - ภาพพื้นหลังแบบพื้นผิว

## 🎯 **ข้อกำหนดภาพ**

### **ขนาดภาพ (Recommended)**
- **QR Code**: 200x200px (1:1)
- **โลโก้**: 300x100px (3:1)
- **ไอคอน**: 64x64px (1:1)
- **ภาพพื้นหลัง**: 1920x1080px (16:9)

### **รูปแบบไฟล์**
- **QR Code**: .png (ความโปร่งใส)
- **โลโก้**: .png (ความโปร่งใส)
- **ไอคอน**: .png (ความโปร่งใส)
- **ภาพพื้นหลัง**: .jpg หรือ .png

### **คุณภาพภาพ**
- **ความละเอียด**: 72 DPI (สำหรับเว็บ)
- **ขนาดไฟล์**: ไม่เกิน 100KB (QR Code, ไอคอน), 500KB (โลโก้, พื้นหลัง)
- **การบีบอัด**: ใช้ PNG สำหรับความโปร่งใส

## 📁 **โครงสร้างไฟล์**

```
images/general/
├── README.md                    # คู่มือนี้
├── qr-kbank.png                # QR Code ธนาคารกสิกรไทย
├── qr-scb.png                  # QR Code ธนาคารไทยพาณิชย์
├── qr-bbl.png                  # QR Code ธนาคารกรุงเทพ
├── payment-methods.png          # วิธีการชำระเงิน
├── logo-main.png               # โลโก้หลัก
├── logo-white.png              # โลโก้สีขาว
├── logo-black.png              # โลโก้สีดำ
├── favicon.ico                 # ไอคอนเว็บไซต์
├── map-icon.png                # ไอคอนแผนที่
├── phone-icon.png              # ไอคอนโทรศัพท์
├── email-icon.png              # ไอคอนอีเมล
├── location-icon.png           # ไอคอนตำแหน่ง
├── pattern-bg.png              # ภาพพื้นหลังแบบลวดลาย
├── gradient-bg.jpg             # ภาพพื้นหลังแบบไล่สี
└── texture-bg.jpg              # ภาพพื้นหลังแบบพื้นผิว
```

## 🔧 **การใช้งานในโค้ด**

### **HTML Meta Tags**
```html
<link rel="icon" href="images/general/favicon.ico">
<meta property="og:image" content="https://greenbluerestbangkok.com/images/general/logo-main.png">
```

### **CSS Background**
```css
.logo {
    background-image: url('../images/general/logo-main.png');
    background-size: contain;
    background-repeat: no-repeat;
}

.pattern-bg {
    background-image: url('../images/general/pattern-bg.png');
    background-repeat: repeat;
}
```

### **JavaScript**
```javascript
const generalImages = {
    logo: 'images/general/logo-main.png',
    qrKbank: 'images/general/qr-kbank.png',
    qrScb: 'images/general/qr-scb.png',
    qrBbl: 'images/general/qr-bbl.png',
    mapIcon: 'images/general/map-icon.png',
    phoneIcon: 'images/general/phone-icon.png',
    emailIcon: 'images/general/email-icon.png',
    locationIcon: 'images/general/location-icon.png'
};
```

## 📱 **Responsive Design**

### **Desktop (≥1200px)**
- โลโก้ขนาดใหญ่ (300x100px)
- ไอคอนขนาดใหญ่ (64x64px)

### **Tablet (768px-1199px)**
- โลโก้ขนาดกลาง (250x80px)
- ไอคอนขนาดกลาง (48x48px)

### **Mobile (≤767px)**
- โลโก้ขนาดเล็ก (200x70px)
- ไอคอนขนาดเล็ก (32x32px)

## 📝 **หมายเหตุ**

- QR Code ควรมีขนาดที่เหมาะสมกับการสแกน
- โลโก้ควรมีหลายสีเพื่อใช้ในบริบทต่างๆ
- ไอคอนควรเป็นแบบ flat design หรือ minimal
- ภาพพื้นหลังควรไม่รบกวนการอ่านเนื้อหา

## 🚀 **ขั้นตอนการเพิ่มภาพ**

1. **เตรียมภาพ**: ปรับขนาดและคุณภาพตามข้อกำหนด
2. **ตั้งชื่อ**: ใช้รูปแบบที่กำหนดในคู่มือนี้
3. **วางไฟล์**: ในโฟลเดอร์ `images/general/`
4. **อัปเดตโค้ด**: เพิ่มการอ้างอิงใน HTML/CSS/JavaScript
5. **ทดสอบ**: ตรวจสอบการแสดงผลบนอุปกรณ์ต่างๆ

---

**อัปเดตล่าสุด**: มกราคม 2025
**สถานะ**: ⚠️ รอเพิ่มภาพ
