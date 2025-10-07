# รูปแบบการตั้งชื่อไฟล์ภาพ

ไฟล์ภาพทั้งหมดในเว็บไซต์ได้ถูกปรับชื่อให้เป็นรูปแบบที่สอดคล้องกัน เพื่อให้ง่ายต่อการจัดการและแก้ไขข้อมูล

## รูปแบบการตั้งชื่อ

### 1. ไฟล์ Blog
```
blog[number]-[type].jpg
```
- `blog1-main.jpg` - ภาพหลักของ blog 1
- `blog1-sub1.jpg` - ภาพย่อยที่ 1 ของ blog 1
- `blog1-sub2.jpg` - ภาพย่อยที่ 2 ของ blog 1
- และอื่นๆ...

### 2. ไฟล์ Products
```
product[number]-main.jpg
```
- `product1-main.jpg` - ภาพหลักของสินค้า 1
- `product2-main.jpg` - ภาพหลักของสินค้า 2
- และอื่นๆ...

### 3. ไฟล์ Vlog
```
vlog[number]-main.jpg
```
- `vlog1-main.jpg` - ภาพหลักของ vlog 1
- `vlog2-main.jpg` - ภาพหลักของ vlog 2
- และอื่นๆ...

### 4. ไฟล์ Operators (แก้ไขใหม่)
```
operator[number]-[type].[ext]
```
- `operator1-logo.jpg` - โลโก้ของ operator 1
- `operator1-card.jpg` - ภาพใน Card ของ operator 1
- `operator1-main.jpg` - ภาพหลักของ operator 1
- `operator1-gallery1.jpg` - ภาพแกลเลอรี่ที่ 1 ของ operator 1
- `operator1-gallery2.jpg` - ภาพแกลเลอรี่ที่ 2 ของ operator 1

### 5. ไฟล์ Trips
```
trip[number]-[type].[ext]
```
- `trip1-main.jpg` - ภาพหลักของ trip 1 (ในโฟลเดอร์ large)
- `trip1-sub1.jpg` - ภาพย่อยของ trip 1 (ในโฟลเดอร์ small)
- และอื่นๆ...

### 6. ไฟล์ Cover
```
[page-name]-cover.jpg
```
- `low-carbon-cover.jpg` - ภาพหลักของ cover 1
- และอื่นๆ...

### 7. ไฟล์ Trips (โฟลเดอร์หลัก)
```
trips[number]-main.[ext]
```
- `trips1-main.jpg` - ภาพหลักของ trips 1
- และอื่นๆ...

## ประโยชน์ของการตั้งชื่อแบบใหม่

1. **ง่ายต่อการจัดการ**: ชื่อไฟล์มีความหมายและเป็นระบบ
2. **ง่ายต่อการแก้ไข**: สามารถระบุตำแหน่งไฟล์ได้ทันที
3. **ง่ายต่อการอ้างอิง**: ในโค้ด JavaScript และ HTML
4. **ง่ายต่อการบำรุงรักษา**: เมื่อต้องการเพิ่มหรือลบไฟล์
5. **แยกประเภทภาพชัดเจน**: โลโก้, ภาพใน Card, ภาพหลัก, ภาพแกลเลอรี่

## การใช้งานในโค้ด

### JavaScript
```javascript
// ตัวอย่างการอ้างอิงไฟล์ blog
const blogImage = `images/blog/blog${blogNumber}-main.jpg`;
const subImage1 = `images/blog/blog${blogNumber}-sub1.jpg`;

// ตัวอย่างการอ้างอิงไฟล์ product
const productImage = `images/products/product${productNumber}-main.jpg`;

// ตัวอย่างการอ้างอิงไฟล์ trip
const tripMainImage = `images/trip${tripNumber}/large/trip${tripNumber}-main.jpg`;
const tripSubImage = `images/trip${tripNumber}/small/trip${tripNumber}-sub1.jpg`;

// ตัวอย่างการอ้างอิงไฟล์ operator (ใหม่)
const operatorLogo = `images/operators/operator${operatorNumber}-logo.jpg`;
const operatorCard = `images/operators/operator${operatorNumber}-card.jpg`;
const operatorMain = `images/operators/operator${operatorNumber}-main.jpg`;
const operatorGallery = `images/operators/operator${operatorNumber}-gallery1.jpg`;
```

### HTML
```html
<!-- ตัวอย่างการอ้างอิงไฟล์ใน HTML -->
<img src="images/blog/blog1-main.jpg" alt="Blog 1 Main Image">
<img src="images/products/product1-main.jpg" alt="Product 1">
<img src="images/trip1/large/trip1-main.jpg" alt="Trip 1 Main">

<!-- ตัวอย่างการอ้างอิงไฟล์ operator (ใหม่) -->
<img src="images/operators/operator1-logo.jpg" alt="Operator 1 Logo">
<img src="images/operators/operator1-card.jpg" alt="Operator 1 Card Image">
<img src="images/operators/operator1-main.jpg" alt="Operator 1 Main Image">
```

## หมายเหตุ

- ไฟล์ทั้งหมดจะถูกเก็บในโฟลเดอร์ที่เหมาะสม
- รูปแบบการตั้งชื่อจะช่วยให้การพัฒนาเว็บไซต์เป็นไปอย่างมีประสิทธิภาพ
- หากต้องการเพิ่มไฟล์ใหม่ ให้ใช้รูปแบบการตั้งชื่อเดียวกันนี้
- **สำคัญ**: แยกประเภทภาพให้ชัดเจน (logo, card, main, gallery)
