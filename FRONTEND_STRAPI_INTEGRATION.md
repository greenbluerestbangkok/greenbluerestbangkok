# Frontend Integration with Strapi CMS

## ภาพรวม

ระบบ frontend ได้ถูกอัปเดตให้ใช้ข้อมูลจาก Strapi CMS แทนการใช้ข้อมูลใน blog-data.js โดยตรง

## ไฟล์ที่เกี่ยวข้อง

### 1. strapi-integration.js
ไฟล์หลักสำหรับดึงข้อมูลจาก Strapi API
- `fetchArticles()` - ดึงข้อมูลบทความ
- `fetchTrips()` - ดึงข้อมูลทริป
- `fetchProducts()` - ดึงข้อมูลสินค้า
- `fetchVlogs()` - ดึงข้อมูลวิดีโอ
- `fetchAllData()` - ดึงข้อมูลทั้งหมดพร้อมกัน

### 2. fallback-data.js
ข้อมูลสำรองที่ใช้เมื่อ Strapi ไม่พร้อมใช้งาน

## การใช้งาน

### ในหน้า HTML
```html
<script src="js/strapi-integration.js"></script>
<script>
// ดึงข้อมูลบทความ
StrapiIntegration.fetchArticles().then(articles => {
  console.log('Articles:', articles);
});

// ดึงข้อมูลทั้งหมด
StrapiIntegration.fetchAllData().then(data => {
  console.log('All data:', data);
});
</script>
```

### ใน JavaScript
```javascript
// ตรวจสอบการเชื่อมต่อ
const isConnected = await StrapiIntegration.checkStrapiConnection();

if (isConnected) {
  // ใช้ข้อมูลจาก Strapi
  const data = await StrapiIntegration.fetchAllData();
  displayContent(data);
} else {
  // ใช้ข้อมูลสำรอง
  import('./fallback-data.js').then(module => {
    displayContent(module.fallbackData);
  });
}
```

## การตั้งค่า

### Development
- Strapi URL: http://localhost:1337
- ใช้ข้อมูลจาก Strapi เมื่อเชื่อมต่อได้
- ใช้ข้อมูลสำรองเมื่อ Strapi ไม่พร้อมใช้งาน

### Production
- Strapi URL: https://your-strapi-app.vercel.app
- เปลี่ยน URL ใน strapi-integration.js

## ข้อดี

1. **Real-time Updates** - ข้อมูลอัปเดตทันทีเมื่อแก้ไขใน Strapi
2. **Fallback System** - ใช้ข้อมูลสำรองเมื่อ Strapi ไม่พร้อมใช้งาน
3. **Performance** - โหลดข้อมูลเฉพาะที่จำเป็น
4. **Maintainability** - จัดการข้อมูลจากจุดเดียว

## การแก้ไขปัญหา

### Strapi ไม่เชื่อมต่อ
1. ตรวจสอบว่า Strapi ทำงานอยู่
2. ตรวจสอบ URL และ API token
3. ตรวจสอบ CORS settings ใน Strapi

### ข้อมูลไม่แสดง
1. ตรวจสอบ console errors
2. ตรวจสอบ network requests
3. ใช้ fallback data เป็นทางเลือก
