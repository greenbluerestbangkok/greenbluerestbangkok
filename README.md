# 🌟 GreenBlueRest Bangkok - เว็บไซต์ท่องเที่ยวชุมชน

## 📋 ภาพรวม
เว็บไซต์ท่องเที่ยวชุมชนย่านคลองบางมดอย่างยั่งยืน พร้อมทริปท่องเที่ยวชุมชนที่หลากหลายครบทั้ง 20 ทริป

## 🎯 ชื่อเว็บไซต์
**GreenBlueRest Bangkok** - โครงการท่องเที่ยวชุมชนย่านคลองบางมดอย่างยั่งยืน

## 🚀 วิธีการแก้ไขและปรับแต่ง

### 1. 🎨 การแก้ไขสีและฟอนต์

#### แก้ไขสีหลัก
เปิดไฟล์ `css/style.css` และแก้ไขในส่วน CSS Variables:

```css
:root {
    --primary-color: #2E8B57;      /* สีเขียวหลัก - แก้ไขได้ที่นี่ */
    --secondary-color: #20B2AA;    /* สีฟ้า - แก้ไขได้ที่นี่ */
    --accent-color: #FFD700;       /* สีทอง - แก้ไขได้ที่นี่ */
    --text-color: #333;            /* สีข้อความหลัก - แก้ไขได้ที่นี่ */
    --light-text: #666;            /* สีข้อความรอง - แก้ไขได้ที่นี่ */
    --background: #f8f9fa;         /* สีพื้นหลัง - แก้ไขได้ที่นี่ */
    --white: #ffffff;              /* สีขาว - แก้ไขได้ที่นี่ */
}
```

#### แก้ไขฟอนต์
เปลี่ยนฟอนต์ได้ที่:
1. **Google Fonts**: https://fonts.google.com/
2. แก้ไขใน `css/style.css`:
```css
--font-family: 'ชื่อฟอนต์ใหม่', sans-serif;
```

### 2. 🖼️ การแก้ไขรูปภาพ

#### ขนาดภาพที่แนะนำ
- **Hero Section**: 1920x1080 pixels
- **การ์ดทริป**: 400x300 pixels
- **รูปภาพทริป**: 800x600 pixels
- **โลโก้**: 200x100 pixels

#### ตำแหน่งไฟล์รูปภาพ
```
images/
├── trip1/small/     # รูปภาพทริปที่ 1 (ขนาดเล็ก)
├── trip2/small/     # รูปภาพทริปที่ 2 (ขนาดเล็ก)
├── trip3/small/     # รูปภาพทริปที่ 3 (ขนาดเล็ก)
└── logo/            # โลโก้และไอคอน
```

#### วิธีการแก้ไขรูปภาพ
1. แทนที่รูปภาพในโฟลเดอร์ `images/`
2. แก้ไข `src` ในไฟล์ HTML:
```html
<img src="images/trip1/small/kayak-1.jpg" alt="ภาพทริปพายเรือคายัค">
```

### 3. 📝 การแก้ไขข้อความ

#### แก้ไขชื่อเว็บไซต์
ในไฟล์ `index.html`:
```html
<title>เที่ยวชุมชนวิถีคลองบางมด - Green Blue Rest Bangkok</title>
<a href="index.html" class="nav-logo">GreenBlueRest Bangkok</a>
```

#### แก้ไขข้อความ Hero Section
```html
<h1>เที่ยวชุมชนวิถีคลองบางมด<br>สัมผัสเสน่ห์ Low Carbon Tourism</h1>
<p>ค้นพบประสบการณ์ใหม่ในกรุงเทพฯ ที่คุณไม่เคยเห็น พร้อมทริปท่องเที่ยวชุมชนที่หลากหลายครบทั้ง 20 ทริป</p>
```

#### แก้ไขข้อมูลทริป
```html
<h3 class="card-title">ทริปพายเรือคายัค ลัดเลาะสวนมะพร้าว</h3>
<p class="card-text">สัมผัสวิถีชีวิตริมคลอง พร้อมกิจกรรมทำขนมไทยโบราณ</p>
<span class="trip-price">💰 800 บาท/คน</span>
<span class="trip-duration">⏰ 3-4 ชั่วโมง</span>
```

### 4. 🔗 การแก้ไขลิงก์

#### แก้ไขเมนูนำทาง
```html
<ul class="nav-menu">
    <li class="nav-item"><a href="index.html" class="nav-link active">หน้าแรก</a></li>
    <li class="nav-item"><a href="pages/low-carbon.html" class="nav-link">Low Carbon</a></li>
    <li class="nav-item"><a href="pages/trips.html" class="nav-link">ทริป</a></li>
    <li class="nav-item"><a href="pages/products.html" class="nav-link">สินค้าชุมชน</a></li>
    <li class="nav-item"><a href="pages/blog.html" class="nav-link">Blog</a></li>
    <li class="nav-item"><a href="pages/contact.html" class="nav-link">ติดต่อเรา</a></li>
</ul>
```

#### แก้ไขลิงก์ทริป
```html
<a href="pages/trip-details.html?id=1" class="btn btn-primary">ดูรายละเอียด</a>
```

### 5. 📱 การแก้ไขการตอบสนอง (Responsive)

#### Breakpoints หลัก
- **768px**: แท็บเล็ตและมือถือแนวตั้ง
- **480px**: มือถือขนาดเล็ก

#### แก้ไขใน `css/style.css`:
```css
@media (max-width: 768px) {
    .hero-content h1 {
        font-size: 2rem;             /* ลดขนาดหัวข้อหลักบนมือถือ */
    }
    
    .container {
        padding: 2rem 1rem;          /* ลดระยะห่างภายในบนมือถือ */
    }
    
    .card-grid {
        grid-template-columns: 1fr;   /* จัดการ์ดเป็น 1 คอลัมน์บนมือถือ */
    }
}
```

### 6. 🎭 การแก้ไขเอฟเฟกต์

#### เอฟเฟกต์ Hover
```css
.card:hover {
    transform: translateY(-5px);     /* เลื่อนขึ้น 5px เมื่อ hover */
    box-shadow: 0 8px 25px rgba(0,0,0,0.15); /* เพิ่มเงาเมื่อ hover */
}

.btn-primary:hover {
    background: #FFC700;             /* เปลี่ยนสีพื้นหลังเมื่อ hover */
    transform: translateY(-2px);     /* เลื่อนขึ้น 2px เมื่อ hover */
}
```

#### เอฟเฟกต์ภาพ
```css
.card:hover .card-img {
    transform: scale(1.05);          /* ขยายภาพ 5% เมื่อ hover */
}
```

### 7. 📊 การแก้ไขการจัดเรียง

#### Grid Layout
```css
.card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); /* จัดเรียงอัตโนมัติ */
    gap: 2rem;                       /* ระยะห่างระหว่างการ์ด */
}
```

#### Flexbox Layout
```css
.hero-cta {
    display: flex;
    gap: 1rem;                       /* ระยะห่างระหว่างปุ่ม */
    justify-content: center;          /* จัดกึ่งกลาง */
    flex-wrap: wrap;                 /* ห่อเมื่อไม่พอดี */
}
```

### 8. 📞 การแก้ไขข้อมูลติดต่อ

#### แก้ไขใน Footer
```html
<div class="footer-column">
    <h4>ติดต่อ</h4>
    <p>Email: contact@greenbluerestbangkok.com</p>
    <p>โทร: 08x-xxx-xxxx</p>
    <p>Line OA: @greenbluerestbangkok</p>
</div>
```

#### แก้ไขลิขสิทธิ์
```html
<div class="footer-bottom">
    <p>&copy; 2025 Green Blue Rest Bangkok. All Rights Reserved.</p>
</div>
```

## 🛠️ โครงสร้างไฟล์

```
community-trip-website/
├── index.html              # หน้าหลัก
├── css/
│   └── style.css          # สไตล์หลัก
├── js/
│   ├── main.js            # JavaScript หลัก
│   ├── products.js        # ฟังก์ชันสินค้า
│   └── trip-details.js    # ฟังก์ชันทริป
├── pages/                  # หน้าต่างๆ
│   ├── activities.html
│   ├── contact.html
│   ├── low-carbon.html
│   ├── products.html
│   ├── trip-details.html
│   └── trips.html
├── images/                 # รูปภาพ
└── README.md              # คู่มือนี้
```

## 💡 เคล็ดลับการแก้ไข

### 1. **ใช้ CSS Variables**
แก้ไขสีที่เดียว เปลี่ยนทั้งเว็บไซต์:
```css
:root {
    --primary-color: #2E8B57;
}
```

### 2. **แก้ไขทีละส่วน**
- เริ่มจากสีและฟอนต์
- แก้ไขข้อความและรูปภาพ
- ปรับการจัดเรียง
- ทดสอบการตอบสนอง

### 3. **ใช้ Developer Tools**
- กด F12 ในเบราว์เซอร์
- ดู CSS และ HTML
- ทดสอบการเปลี่ยนแปลง

### 4. **ทดสอบบนอุปกรณ์ต่างๆ**
- คอมพิวเตอร์
- แท็บเล็ต
- มือถือ

## 🚨 ข้อควรระวัง

1. **สำรองไฟล์ก่อนแก้ไข**
2. **ทดสอบหลังแก้ไขทุกครั้ง**
3. **ตรวจสอบลิงก์ให้ถูกต้อง**
4. **ใช้รูปภาพที่มีขนาดเหมาะสม**
5. **ตรวจสอบการแสดงผลบนมือถือ**

## 📞 ติดต่อขอความช่วยเหลือ

หากมีปัญหาหรือต้องการความช่วยเหลือ:
- Email: contact@greenbluerestbangkok.com
- Line OA: @greenbluerestbangkok

---

**© 2025 Green Blue Rest Bangkok. All Rights Reserved.**
