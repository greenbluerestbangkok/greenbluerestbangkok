# 🛍️ คู่มือการเชื่อมต่อสินค้ากับ CMS

## 🎯 ภาพรวม

ระบบสินค้าได้ถูกปรับปรุงให้เชื่อมต่อกับ Supabase CMS อย่างสมบูรณ์แล้ว!

---

## 📊 ข้อมูลสินค้าทั้งหมด

### **24 สินค้า** จาก **6 กลุ่มผู้ประกอบการ:**

| กลุ่ม | จำนวนสินค้า | หมวดหมู่ |
|-------|-------------|----------|
| เซฟติสท์ฟาร์ม | 7 | Beauty + Food |
| กัมปงในดงปรือ | 9 | Food + Beauty |
| Triple F | 1 | Food |
| บ้านฮา-นะ (ตลาดมดตะนอย) | 3 | Food |
| สวนส้มลุงสมจิตร | 1 | Food |
| Cafe Can Do | 3 | Food |
| **รวม** | **24** | - |

---

## 🔄 การทำงานของระบบ

### **เดิม (Inline Data):**
```
products.html 
  ↓
  มีข้อมูลสินค้า 24 รายการ hardcode ใน <script>
  ↓
  แสดงผลทันที (ไม่เชื่อมต่อ CMS)
```

**ปัญหา:**
- ❌ แก้ไขข้อมูลต้องเข้าไปแก้ HTML
- ❌ ไม่สามารถจัดการผ่าน Admin Panel
- ❌ ข้อมูลไม่ sync กับ CMS

### **ใหม่ (Supabase Integration):**
```
products.html
  ↓
  เรียก products-supabase.js
  ↓
  ดึงข้อมูลจาก Supabase REST API
  ↓
  แสดงสินค้า 24 รายการจาก Database
  ↓
  แก้ไขได้ผ่าน Admin Panel!
```

**ข้อดี:**
- ✅ แก้ไขผ่าน Admin Panel
- ✅ เพิ่ม/ลบสินค้าได้ง่าย
- ✅ ข้อมูล sync อัตโนมัติ
- ✅ มี fallback data สำรอง

---

## 📝 วิธีการเพิ่มข้อมูลสินค้า

### **Step 1: Run SQL Script**

1. **เปิด Supabase Dashboard:**
   ```
   https://supabase.com/dashboard/project/gmdvkegcejrbrobtrhfm/sql
   ```

2. **Copy ไฟล์:**
   ```
   complete-products-data.sql
   ```

3. **Paste และ RUN**

4. **ตรวจสอบ:**
   ```sql
   SELECT COUNT(*) FROM products;
   -- ควรได้ 24 rows
   ```

### **Step 2: ตรวจสอบใน Admin Panel**

1. **เปิด:**
   ```
   http://localhost:3001/products
   ```

2. **Hard Refresh:** `Cmd + Shift + R`

3. **ควรเห็น:**
   - สินค้า 24 รายการ
   - แยกตามหมวดหมู่
   - พร้อมรูปภาพ

### **Step 3: ตรวจสอบในเว็บหลัก**

1. **เปิด:**
   ```
   http://localhost:3000/pages/products.html
   ```

2. **Hard Refresh:** `Cmd + Shift + R`

3. **ควรเห็น:**
   - สินค้า 24 รายการ (จาก Supabase)
   - กรองตามหมวดหมู่ได้
   - ค้นหาได้
   - ปุ่มสั่งซื้อทำงาน

---

## 🎨 Features ที่ใช้งานได้

### **Frontend (products.html):**
- ✅ แสดงสินค้าจาก Supabase
- ✅ กรองตามหมวดหมู่ (ทั้งหมด, อาหาร, งานฝีมือ, ความงาม, ของใช้ในบ้าน)
- ✅ ค้นหาสินค้า (ตามชื่อ, คำอธิบาย, ผู้ผลิต)
- ✅ Masonry layout (การ์ดสวยงาม)
- ✅ ปุ่มสั่งซื้อผ่าน Line
- ✅ Fallback data (ถ้า Supabase ไม่มีข้อมูล)

### **Admin Panel:**
- ✅ ดูรายการสินค้าทั้งหมด
- ✅ เพิ่มสินค้าใหม่
- ✅ แก้ไขสินค้า
- ✅ ลบสินค้า
- ✅ เปลี่ยนสถานะ (มีสินค้า/หมดสต็อก)
- ✅ กรองตามหมวดหมู่
- ✅ ค้นหาสินค้า
- ✅ Bulk operations

---

## 🗂️ โครงสร้างข้อมูล

### **Supabase Table: products**

```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price TEXT,
  producer TEXT,
  category TEXT,
  status TEXT DEFAULT 'available',
  stock INTEGER,
  featured BOOLEAN DEFAULT false,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### **Field Mapping:**

| HTML (เดิม) | Supabase | ประเภท |
|------------|----------|--------|
| name | name | TEXT |
| description | description | TEXT |
| price | price | TEXT |
| producer | producer | TEXT |
| category | category | TEXT |
| image | image_url | TEXT |
| - | status | TEXT |
| - | stock | INTEGER |
| - | featured | BOOLEAN |

---

## 🎨 หมวดหมู่สินค้า

### **Categories:**
- `beauty` - ความงาม (สบู่, ยาดม, ครีม)
- `food` - อาหาร (ขนม, เครื่องดื่ม, อาหารสำเร็จรูป)
- `craft` - งานฝีมือ (ผ้า, ของตกแต่ง, ของที่ระลึก)
- `home` - ของใช้ในบ้าน

### **Status:**
- `available` - มีสินค้า
- `out_of_stock` - หมดสต็อก
- `discontinued` - เลิกผลิตแล้ว

---

## 💻 การจัดการผ่าน Admin Panel

### **เพิ่มสินค้าใหม่:**
1. เข้า Admin Panel → "จัดการสินค้า"
2. คลิก "เพิ่มสินค้าใหม่"
3. กรอกข้อมูล:
   - ชื่อสินค้า
   - คำอธิบาย
   - ราคา
   - ผู้ผลิต
   - หมวดหมู่ (beauty/food/craft/home)
   - สถานะ (available/out_of_stock)
   - จำนวนสต็อก
   - แนะนำ (featured)
4. อัปโหลดรูปภาพ (ถ้ามี)
5. บันทึก

**ผลลัพธ์:**
- ✅ สินค้าเพิ่มเข้า Supabase
- ✅ แสดงในเว็บไซต์ทันที
- ✅ แสดงใน Admin Panel

### **แก้ไขสินค้า:**
1. ไปที่ "จัดการสินค้า"
2. คลิก "แก้ไข" ที่สินค้าที่ต้องการ
3. แก้ไขข้อมูล
4. บันทึก

**ผลลัพธ์:**
- ✅ ข้อมูลอัปเดตใน Supabase
- ✅ เว็บไซต์แสดงข้อมูลใหม่ทันที

### **ลบสินค้า:**
1. คลิก "ลบ" ที่สินค้าที่ต้องการ
2. ยืนยัน

**ผลลัพธ์:**
- ✅ สินค้าหายจาก Supabase
- ✅ เว็บไซต์ไม่แสดงสินค้านั้นอีก

---

## 🚀 ขั้นตอนติดตั้ง (20 นาที)

### ✅ **Phase 1: เพิ่มข้อมูลสินค้า (5 นาที)**

```
1. เปิด Supabase SQL Editor
2. Copy ไฟล์ complete-products-data.sql
3. Paste และ RUN
4. ตรวจสอบว่ามี 24 สินค้า
```

### ✅ **Phase 2: ทดสอบ Admin Panel (5 นาที)**

```
1. เปิด http://localhost:3001/products
2. ควรเห็นสินค้า 24 รายการ
3. ลองเพิ่มสินค้าใหม่
4. ลองแก้ไขสินค้า
5. ลองลบสินค้า
```

### ✅ **Phase 3: ทดสอบเว็บไซต์ (5 นาที)**

```
1. เปิด http://localhost:3000/pages/products.html
2. ควรเห็นสินค้า 24 รายการ
3. ลองกรองตามหมวดหมู่
4. ลองค้นหา
5. ลองคลิกปุ่ม "สั่งซื้อ"
```

### ✅ **Phase 4: ทดสอบ Integration (5 นาที)**

```
1. เข้า Admin Panel
2. แก้ไขชื่อสินค้าใดสินค้าหนึ่ง
3. บันทึก
4. กลับไปที่เว็บไซต์หลัก
5. Hard refresh
6. ชื่อสินค้าควรเปลี่ยนตามที่แก้!
```

---

## 🎉 เมื่อทำเสร็จทั้งหมด

**คุณจะมี:**
- ✅ สินค้า 24 รายการจาก 6 กลุ่มผู้ประกอบการ
- ✅ จัดการผ่าน Admin Panel ได้
- ✅ เว็บไซต์ดึงข้อมูลจาก Supabase
- ✅ แก้ไขครั้งเดียว แสดงทุกที่
- ✅ ระบบสมบูรณ์ 100%!

---

## 📞 Support

หากมีปัญหา:
- 📧 admin@greenbluerestbangkok.com
- 📱 @greenbluerestbangkok
- 📚 อ่าน: SYSTEM_ANALYSIS_REPORT.md

---

**Happy Managing! 🚀**

วันที่: 7 เมษายน 2025

