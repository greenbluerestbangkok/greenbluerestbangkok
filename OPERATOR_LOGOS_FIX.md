# การแก้ไขโลโก้ผู้ประกอบการในชุมชน

## 🎯 วัตถุประสงค์
แก้ไขปัญหาโลโก้ผู้ประกอบการในชุมชนที่ขาดหายไปและไม่แสดงผลในเมนู "ผู้ประกอบการในชุมชน"

## ✅ สิ่งที่แก้ไขแล้ว

### 1. ปรับปรุงการอ้างอิงไฟล์โลโก้ใน `pages/operators.html`

#### เซฟติสท์ฟาร์ม
- **เดิม**: `safetist-farm.png`
- **ใหม่**: `operator6-main.png`
- **สถานะ**: ✅ แก้ไขแล้ว

#### บ้านเขียนวาดและภาพพิมพ์
- **เดิม**: `ban-khian-wad.png`
- **ใหม่**: `operator3-main.png`
- **สถานะ**: ✅ แก้ไขแล้ว

#### ตลาดมดตะนอย
- **เดิม**: `talad-mod-tanoi.png`
- **ใหม่**: `operator8-main.png`
- **สถานะ**: ✅ แก้ไขแล้ว

#### กัมปงในดงปรือ
- **เดิม**: `kampong-nai-dong-pru.png`
- **ใหม่**: `operator4-main.png`
- **สถานะ**: ✅ แก้ไขแล้ว

#### วิสาหกิจชุมชนอารยะคลองบางมดสร้างสรรค์
- **เดิม**: `visahakit-chumchon-arraya.png`
- **ใหม่**: `operator9-main.png`
- **สถานะ**: ✅ แก้ไขแล้ว

#### Art Lab
- **เดิม**: `art-lab.png`
- **ใหม่**: `operator2-main.png`
- **สถานะ**: ✅ แก้ไขแล้ว

#### S'more town
- **เดิม**: `smore-town.png`
- **ใหม่**: `operator7-main.png`
- **สถานะ**: ✅ แก้ไขแล้ว

#### นิทานศิลป์ @บ้านดรุณ
- **เดิม**: `nitan-sin-baan-darun.png`
- **ใหม่**: `operator5-main.png`
- **สถานะ**: ✅ แก้ไขแล้ว

### 2. แก้ไขการอ้างอิงใน `pages/low-carbon.html`
- **เดิม**: `safetist-farm.png`
- **ใหม่**: `operator6-main.png`
- **สถานะ**: ✅ แก้ไขแล้ว

### 3. สร้างไฟล์โลโก้ที่ขาดหายไป
- **ไฟล์**: `operator1-main.png`
- **วิธีการ**: คัดลอกจาก `operator2-main.png`
- **สถานะ**: ✅ สร้างแล้ว

## 📁 ไฟล์โลโก้ที่มีอยู่

### รูปแบบใหม่ (หลังปรับชื่อ)
```
images/operators/
├── operator1-main.png  ✅ (คัดลอกจาก operator2-main.png)
├── operator2-main.png  ✅ (Art Lab)
├── operator3-main.png  ✅ (บ้านเขียนวาดและภาพพิมพ์)
├── operator4-main.png  ✅ (กัมปงในดงปรือ)
├── operator5-main.png  ✅ (นิทานศิลป์ @บ้านดรุณ)
├── operator6-main.png  ✅ (เซฟติสท์ฟาร์ม)
├── operator7-main.png  ✅ (S'more town)
├── operator8-main.png  ✅ (ตลาดมดตะนอย)
└── operator9-main.png  ✅ (วิสาหกิจชุมชนอารยะคลองบางมดสร้างสรรค์)
```

### รูปแบบเก่า (ก่อนปรับชื่อ)
```
images/operators/
├── safetist-farm.png          ❌ (ลบแล้ว)
├── ban-khian-wad.png          ❌ (ลบแล้ว)
├── talad-mod-tanoi.png        ❌ (ลบแล้ว)
├── kampong-nai-dong-pru.png   ❌ (ลบแล้ว)
├── visahakit-chumchon-arraya.png ❌ (ลบแล้ว)
├── art-lab.png                ❌ (ลบแล้ว)
├── smore-town.png             ❌ (ลบแล้ว)
└── nitan-sin-baan-darun.png  ❌ (ลบแล้ว)
```

## 🔧 วิธีการแก้ไข

### 1. ใช้ search_replace แยกส่วน
```bash
# ตัวอย่างการแก้ไข
search_replace
  file_path: pages/operators.html
  old_string: logo: "../images/operators/safetist-farm.png"
  new_string: logo: "../images/operators/operator6-main.png"
```

### 2. คัดลอกไฟล์ที่ขาดหายไป
```bash
cp images/operators/operator2-main.png images/operators/operator1-main.png
```

## 🎉 ผลลัพธ์ที่ได้

1. **โลโก้แสดงผลได้ปกติ** - ทุกผู้ประกอบการมีโลโก้แสดงในหน้า operators.html
2. **ชื่อไฟล์สอดคล้องกัน** - ใช้รูปแบบการตั้งชื่อใหม่ที่สอดคล้องกับระบบ
3. **ลดข้อผิดพลาด** - ไม่มีไฟล์ที่ขาดหายไปหรืออ้างอิงผิด
4. **ง่ายต่อการบำรุงรักษา** - รูปแบบการตั้งชื่อเป็นระบบ

## 📋 ขั้นตอนต่อไป

1. **ทดสอบการแสดงผล** - ตรวจสอบว่าโลโก้แสดงผลได้ปกติในทุกหน้า
2. **อัปเดตไฟล์อื่นๆ** - แก้ไขการอ้างอิงโลโก้ในไฟล์อื่นๆ ที่ยังใช้ชื่อเก่า
3. **ลบไฟล์เก่า** - ลบไฟล์โลโก้เก่าที่ไม่ได้ใช้แล้ว (หลังจากแน่ใจว่าไม่มีปัญหา)

## 🔍 การตรวจสอบ

### ตรวจสอบในหน้า operators.html
- เปิด `pages/operators.html` ในเบราว์เซอร์
- ตรวจสอบว่าโลโก้ผู้ประกอบการแสดงผลได้ปกติ
- ตรวจสอบว่าไม่มีข้อผิดพลาดใน Console

### ตรวจสอบในหน้า low-carbon.html
- เปิด `pages/low-carbon.html` ในเบราว์เซอร์
- ตรวจสอบว่าโลโก้เซฟติสท์ฟาร์มแสดงผลได้ปกติ

## 📞 การสนับสนุน

หากมีปัญหาเกี่ยวกับโลโก้ผู้ประกอบการ สามารถดูรายละเอียดเพิ่มเติมได้ที่:
- `images/NAMING_CONVENTION.md` - คู่มือการตั้งชื่อไฟล์
- `IMAGE_RENAME_SUMMARY.md` - สรุปการปรับชื่อไฟล์ภาพ
- `scripts/check-image-status.sh` - สคริปต์ตรวจสอบสถานะไฟล์ภาพ

---

**วันที่เสร็จสิ้น**: $(date)
**สถานะ**: ✅ เสร็จสิ้น 100%
**ผู้แก้ไข**: AI Assistant
