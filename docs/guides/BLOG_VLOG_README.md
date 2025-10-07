# Blog & Vlog System Documentation

## ภาพรวมของระบบ

ระบบ Blog & Vlog ที่สร้างขึ้นสำหรับเว็บไซต์ Green Blue Rest เป็นระบบที่แสดงเนื้อหาแบบไดนามิก โดยมีคุณสมบัติต่างๆ ดังนี้:

### คุณสมบัติหลัก

1. **ระบบค้นหา** - ค้นหาเนื้อหาตามคำสำคัญ
2. **การกรองตามหมวดหมู่** - แยกเป็น Blog, Vlog หรือแสดงทั้งหมด
3. **การแสดงผลแบบ Grid** - เรียงตามความน่าสนใจ
4. **Modal สำหรับดูเนื้อหาเต็ม** - ไม่ต้องเปิดหน้าใหม่
5. **หน้ารายละเอียด** - สำหรับแชร์และดูเนื้อหาแบบเต็ม
6. **Responsive Design** - รองรับทุกอุปกรณ์

## โครงสร้างไฟล์

```
├── pages/
│   ├── activities.html       # หน้าหลัก Blog & Vlog
│   └── blog-detail.html      # หน้ารายละเอียดบทความ
├── js/
│   ├── blog-data.js          # ข้อมูล Blog และ Vlog
│   ├── blog-vlog.js          # ระบบหลักสำหรับหน้า activities
│   └── blog-detail.js        # ระบบสำหรับหน้ารายละเอียด
├── css/
│   └── style.css             # CSS styles สำหรับ Blog & Vlog
└── images/
    ├── blog/                 # รูปภาพสำหรับ Blog
    └── vlog/                 # รูปภาพ thumbnail สำหรับ Vlog
```

## การจัดการเนื้อหา

### การเพิ่มเนื้อหา Blog ใหม่

แก้ไขไฟล์ `js/blog-data.js` ในส่วน `blogs`:

```javascript
{
  id: 6, // ID ใหม่ (เพิ่มจากล่าสุด)
  title: "ชื่อบทความใหม่",
  excerpt: "สรุปบทความ 2-3 บรรทัด",
  image: "/images/blog/blog6.jpg", // รูปภาพประกอบ
  date: "2024-12-20", // วันที่เผยแพร่
  category: "blog",
  content: `
    <h3>หัวข้อบทความ</h3>
    <p>เนื้อหาบทความในรูปแบบ HTML...</p>
    <!-- เนื้อหาแบบยาวๆ -->
  `
}
```

### การเพิ่มเนื้อหา Vlog ใหม่

แก้ไขไฟล์ `js/blog-data.js` ในส่วน `vlogs`:

```javascript
{
  id: 6, // ID ใหม่
  title: "ชื่อวีดิโอใหม่", 
  excerpt: "คำอธิบายวีดิโอ",
  thumbnail: "/images/vlog/vlog6.jpg", // รูปภาพ thumbnail
  youtubeId: "VIDEO_ID_FROM_YOUTUBE", // YouTube Video ID
  date: "2024-12-20",
  category: "vlog",
  duration: "12:30" // ระยะเวลาวีดิโอ
}
```

### การหา YouTube Video ID

จาก URL: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
Video ID คือ: `dQw4w9WgXcQ` (ส่วนหลัง `v=`)

## คำแนะนำในการใช้งาน

### ขนาดรูปภาพที่แนะนำ

- **Blog Images**: 800x400px หรือ 16:9 aspect ratio
- **Vlog Thumbnails**: 800x450px หรือ 16:9 aspect ratio
- **รูปแบบไฟล์**: JPG หรือ PNG
- **ขนาดไฟล์**: ไม่เกิน 500KB สำหรับการโหลดที่เร็ว

### การจัดรูปแบบเนื้อหา Blog

ใช้ HTML tags พื้นฐานในส่วน `content`:

```html
<h3>หัวข้อหลัก</h3>
<h4>หัวข้อย่อย</h4> 
<h5>หัวข้อย่อยเล็ก</h5>
<p>ย่อหน้าปกติ</p>
<ul>
  <li>รายการแบบจุด</li>
  <li>รายการอีกข้อ</li>
</ul>
<ol>
  <li>รายการแบบตัวเลข</li>
</ol>
<strong>ข้อความที่เน้น</strong>
```

### การเพิ่มสีสันในเนื้อหา

CSS จะจัดการสีให้อัตโนมัติ:
- `<h3>` = สีเขียวหลัก (Primary Color)
- `<h4>` = สีฟ้า (Secondary Color)  
- `<strong>` = สีเขียวหลัก เน้นความสำคัญ

## การทดสอบ

### การทดสอบในเครื่อง

1. เปิด Terminal ใน directory ของโปรเจค
2. รันคำสั่ง: `python3 -m http.server 8000`
3. เปิด browser ไปที่: `http://localhost:8000/pages/activities.html`

### การทดสอบฟีเจอร์

- [ ] ระบบค้นหาทำงานได้
- [ ] การกรองตามหมวดหมู่ Blog/Vlog
- [ ] การเปิด Modal ดูเนื้อหา
- [ ] การแสดงผลบน Mobile
- [ ] การแสดงผล YouTube Video (Vlog)
- [ ] ระบบ Share ใน Blog Detail

## การ Deploy

### ก่อน Deploy

1. ตรวจสอบให้แน่ใจว่าทุกรูปภาพอยู่ใน directory ที่ถูกต้อง
2. ทดสอบการทำงานใน local server
3. ตรวจสอบ YouTube Video IDs ว่าถูกต้อง

### หลัง Deploy

1. ทดสอบการทำงานบนเซิร์ฟเวอร์จริง
2. ตรวจสอบการโหลดรูปภาพ
3. ทดสอบการแชร์ Social Media

## การแก้ไขปัญหาที่พบบ่อย

### รูปภาพไม่แสดง
- ตรวจสอบ path ของรูปภาพใน `blog-data.js`
- ตรวจสอบว่าไฟล์รูปอยู่ใน directory ที่ถูกต้อง

### YouTube Video ไม่เล่น  
- ตรวจสอบ YouTube Video ID
- ตรวจสอบว่าวีดิโอไม่ถูกตั้งค่าเป็น Private

### ระบบค้นหาไม่ทำงาน
- ตรวจสอบ JavaScript Console สำหรับ errors
- ตรวจสอบว่า import modules ถูกต้อง

## การปรับแต่งเพิ่มเติม

### เปลี่ยนสีหลัก
แก้ไขใน `css/style.css` ส่วน `:root`:

```css
:root {
    --primary-color: #2E8B57;    /* สีเขียวหลัก */
    --secondary-color: #20B2AA;  /* สีฟ้า */
    --accent-color: #FFD700;     /* สีทอง */
}
```

### เพิ่ม Social Share Platform
แก้ไขใน `js/blog-detail.js` ในฟังก์ชัน `createBlogDetail()` หรือ `createVlogDetail()`

### เปลี่ยนจำนวน Related Content
แก้ไขใน `js/blog-detail.js` บรรทัดที่มี `.slice(0, 3)` เปลี่ยนเลข 3 เป็นจำนวนที่ต้องการ

---

สร้างโดย Claude Code เพื่อโปรเจค Green Blue Rest Community Website