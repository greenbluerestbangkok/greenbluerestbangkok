# ✅ Image Upload Feature - เพิ่มเสร็จสมบูรณ์!

**วันที่:** 7 ตุลาคม 2025  
**สถานะ:** ✅ **ใช้งานได้แล้ว**

---

## 🎯 สรุปการเพิ่มฟีเจอร์

เพิ่ม **ImageUploader Component** ให้ทุกหน้า New/Edit ในระบบ Admin CMS แล้ว!

---

## 📸 ImageUploader Component

**ตำแหน่ง:** `admin/components/ImageUploader.tsx`

### Features:
- ✅ **Drag & Drop** - ลากรูปมาวาง
- ✅ **Preview Image** - แสดงตัวอย่างรูป
- ✅ **Edit/Replace** - แก้ไขรูปเดิม
- ✅ **Delete Button** - ลบรูปออก (ปุ่ม X สีแดง)
- ✅ **Auto Compression** - บีบอัดรูปอัตโนมัติ
- ✅ **File Validation** - ตรวจสอบนามสกุลไฟล์
- ✅ **Aspect Ratio Control** - กำหนดสัดส่วนรูป

### Supported Formats:
- JPEG/JPG
- PNG
- WebP
- GIF

---

## 📋 หน้าที่เพิ่ม ImageUploader แล้ว

### ✅ สินค้า (Products)
**หน้า New:**
- `admin/app/products/new/page.tsx`
- Aspect Ratio: **1:1** (สี่เหลี่ยมจัตุรัส)
- Label: "รูปภาพสินค้า"

**หน้า Edit:**
- `admin/app/products/[id]/page.tsx`
- แสดงรูปเดิม + ปุ่มแก้ไข + ปุ่มลบ

---

### ✅ ทริป (Trips)
**หน้า Edit:**
- `admin/app/trips/[id]/page.tsx`
- Aspect Ratio: **16:9** (แนวนอน)
- Label: "รูปภาพหลักทริป"
- แสดงรูปเดิม + ปุ่มแก้ไข + ปุ่มลบ

---

### ✅ บทความ (Articles)
**หน้า New:**
- `admin/app/articles/new/page.tsx`
- Aspect Ratio: **16:9**
- Label: "รูปภาพปกบทความ"

**หน้า Edit:**
- `admin/app/articles/[id]/page.tsx`
- แสดงรูปเดิม + ปุ่มแก้ไข + ปุ่มลบ

---

### ✅ ผู้ประกอบการ (Entrepreneurs)
**หน้า New:**
- `admin/app/entrepreneurs/new/page.tsx`
- Aspect Ratio: **1:1**
- Label: "รูปภาพ/โลโก้กลุ่ม"

**หน้า Edit:**
- `admin/app/entrepreneurs/[id]/page.tsx`
- แสดงรูปเดิม + ปุ่มแก้ไข + ปุ่มลบ

---

## 🎨 UI/UX Features

### **1. Drag & Drop Zone:**
```
┌─────────────────────────────────┐
│     📷 Drag & Drop รูปภาพ       │
│  หรือคลิกเพื่อเลือกไฟล์        │
│                                 │
│  รองรับ JPG, PNG, WebP          │
└─────────────────────────────────┘
```

### **2. Image Preview (เมื่ออัปโหลดแล้ว):**
```
┌─────────────────────────────────┐
│  [รูปภาพ Preview]          [X]  │
│                            ลบ    │
│  [เปลี่ยนรูป]                    │
└─────────────────────────────────┘
```

### **3. Edit Mode (เมื่อมีรูปเดิม):**
```
┌─────────────────────────────────┐
│  [รูปภาพเดิม]              [X]  │
│                            ลบ    │
│  [เปลี่ยนรูป]                    │
└─────────────────────────────────┘
```

---

## 🔧 วิธีใช้งาน

### **1. เพิ่มรูปใหม่:**
1. คลิกที่ Drag & Drop Zone
2. เลือกไฟล์รูป หรือลากรูปมาวาง
3. ดู Preview ทันที
4. คลิก "บันทึก" เพื่อ save

### **2. แก้ไขรูปเดิม:**
1. คลิกปุ่ม "เปลี่ยนรูป"
2. เลือกไฟล์รูปใหม่
3. ดู Preview ทันที
4. คลิก "บันทึก" เพื่อ save

### **3. ลบรูป:**
1. คลิกปุ่ม **X** (สีแดง ขวาบน)
2. รูปจะหายทันที
3. คลิก "บันทึก" เพื่อ save การลบ

---

## 💾 การจัดเก็บรูปภาพ

### **ปัจจุบัน (Phase 1):**
```javascript
// สร้าง fake URL สำหรับทดสอบ
const fakeUrl = `/images/products/${file.name}`;
```

**ผลลัพธ์:**
- รูปจะถูก save เป็น path เช่น `/images/products/image.jpg`
- ยังไม่อัปโหลดไป Supabase Storage จริง
- ใช้สำหรับทดสอบระบบก่อน

### **อนาคต (Phase 2 - TODO):**
```javascript
// อัปโหลดไป Supabase Storage
const { data, error } = await supabase.storage
  .from('products')
  .upload(`${Date.now()}-${file.name}`, file);

const publicUrl = supabase.storage
  .from('products')
  .getPublicUrl(data.path).data.publicUrl;

return publicUrl;
```

**ผลลัพธ์:**
- รูปจะถูกอัปโหลดไป Supabase Storage จริง
- ได้ public URL กลับมา
- สามารถแสดงรูปบนเว็บได้ทันที

---

## 📊 Summary

### **หน้าที่มี ImageUploader:**
```
✅ Products New      - รูปสินค้า (1:1)
✅ Products Edit     - รูปสินค้า (1:1) + แก้ไข/ลบ
✅ Trips Edit        - รูปทริป (16:9) + แก้ไข/ลบ
✅ Articles New      - รูปปกบทความ (16:9)
✅ Articles Edit     - รูปปกบทความ (16:9) + แก้ไข/ลบ
✅ Entrepreneurs New - โลโก้กลุ่ม (1:1)
✅ Entrepreneurs Edit- โลโก้กลุ่ม (1:1) + แก้ไข/ลบ
───────────────────────────────────────────
Total: 7 หน้า
```

### **Features ที่มี:**
- ✅ Drag & Drop
- ✅ Preview
- ✅ Edit/Replace
- ✅ Delete (ปุ่ม X)
- ✅ Auto Compression
- ✅ File Validation
- ✅ Aspect Ratio Control
- ⏳ Supabase Storage Upload (TODO)

---

## 🚀 Next Steps (Optional)

### **Phase 2: Supabase Storage Integration**
1. สร้าง Storage Bucket ใน Supabase:
   - `products`
   - `trips`
   - `articles`
   - `entrepreneurs`

2. เพิ่มฟังก์ชันอัปโหลดจริง:
```typescript
// admin/lib/supabase-storage.ts
export async function uploadImage(
  bucket: string,
  file: File
): Promise<string> {
  const fileName = `${Date.now()}-${file.name}`;
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(fileName, file);
  
  if (error) throw error;
  
  return supabase.storage
    .from(bucket)
    .getPublicUrl(data.path).data.publicUrl;
}
```

3. อัปเดตทุกหน้า:
```typescript
onImageUpload={async (file) => {
  const url = await uploadImage('products', file);
  setProduct({ ...product, image_url: url });
  return url;
}}
```

---

## ✅ **สำเร็จแล้ว!**

ตอนนี้ทุกหน้า New/Edit มีระบบอัปโหลดรูปภาพพร้อมปุ่มลบแล้ว!

**ทดสอบได้ที่:**
```
http://localhost:3001/products/new
http://localhost:3001/articles/new
http://localhost:3001/entrepreneurs/new
```

---

**Made with ❤️ for Green Blue Rest Bangkok**

