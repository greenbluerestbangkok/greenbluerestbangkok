# 🔧 แก้ไข Domain 404 - ทีละขั้นตอน (แน่นอน 100%)

## ปัญหา
- `greenbluerestbangkok.com` → 404
- `admin.greenbluerestbangkok.com` → 404

---

## ✅ แก้ Frontend Domain: greenbluerestbangkok.com

### Step 1: เข้า Vercel Dashboard
1. เปิดเว็บ: https://vercel.com/login
2. Login เข้าไป

### Step 2: ย้ายไปที่ Team Account
1. คลิกที่ชื่อ account ด้านบนขวา
2. เลือก: **greenbluerestbangkok's projects**

### Step 3: เข้า Project greenbluerestbangkok (เก่า)
1. คลิกที่ project: **greenbluerestbangkok**
2. หรือเข้าตรงๆ: https://vercel.com/greenbluerestbangkoks-projects/greenbluerestbangkok

### Step 4: ไปที่ Settings → Domains
1. คลิก **Settings** (ซ้ายบน)
2. คลิก **Domains**

### Step 5: ลบ Domain greenbluerestbangkok.com
1. หา `greenbluerestbangkok.com` ในรายการ
2. คลิกปุ่ม **⋯** (three dots) ด้านขวา
3. เลือก **Remove**
4. ยืนยันการลบ

### Step 6: เข้า Project greenbluerest (ใหม่)
1. กลับไปหน้า Projects
2. คลิกที่ project: **greenbluerest**
3. หรือเข้าตรงๆ: https://vercel.com/greenbluerestbangkoks-projects/greenbluerest

### Step 7: เพิ่ม Domain ใหม่
1. คลิก **Settings** → **Domains**
2. ในช่อง "Domain" พิมพ์: `greenbluerestbangkok.com`
3. คลิก **Add**
4. รอสักครู่ให้ Vercel verify

### Step 8: เพิ่ม www subdomain (ถ้าต้องการ)
1. ในช่อง "Domain" พิมพ์: `www.greenbluerestbangkok.com`
2. คลิก **Add**

✅ **เสร็จแล้ว!** ลอง refresh หน้า https://greenbluerestbangkok.com

---

## ✅ แก้ Admin Domain: admin.greenbluerestbangkok.com

### Step 1: เข้า Vercel Dashboard
1. เปิดเว็บ: https://vercel.com/login
2. Login เข้าไป

### Step 2: เปลี่ยนไป Personal Account
1. คลิกที่ชื่อ account ด้านบนขวา
2. เลือก: **bangmodcanal-6790** (Personal Account)

### Step 3: ไปที่ Settings → Domains
1. คลิก **Settings** (ด้านซ้าย)
2. คลิก **Domains**

### Step 4: หา admin.greenbluerestbangkok.com
1. scroll หา `admin.greenbluerestbangkok.com`
2. ถ้าเจอ:
   - คลิกปุ่ม **⋯** (three dots)
   - เลือก **Remove**
   - ยืนยันการลบ
3. ถ้าไม่เจอ:
   - ไปต่อ Step 5 เลย

### Step 5: เปลี่ยนกลับไป Team Account
1. คลิกที่ชื่อ account ด้านบนขวา
2. เลือก: **greenbluerestbangkok's projects**

### Step 6: เข้า Project greenbluerest-admin
1. คลิกที่ project: **greenbluerest-admin**
2. หรือเข้าตรงๆ: https://vercel.com/greenbluerestbangkoks-projects/greenbluerest-admin

### Step 7: เพิ่ม Domain
1. คลิก **Settings** → **Domains**
2. ในช่อง "Domain" พิมพ์: `admin.greenbluerestbangkok.com`
3. คลิก **Add**
4. รอสักครู่ให้ Vercel verify

✅ **เสร็จแล้ว!** ลอง refresh หน้า https://admin.greenbluerestbangkok.com

---

## 🧪 ทดสอบว่าแก้สำเร็จ

```bash
# ทดสอบ Frontend
curl -I https://greenbluerestbangkok.com
# ควรได้ HTTP/2 200

# ทดสอบ Admin
curl -I https://admin.greenbluerestbangkok.com
# ควรได้ HTTP/2 200
```

หรือเปิดใน Browser:
- https://greenbluerestbangkok.com
- https://admin.greenbluerestbangkok.com

---

## ⚠️ ถ้ายังไม่ได้

### ปัญหา: ไม่เจอ domain ใน Personal Account

**วิธีแก้:**
1. ใช้วิธีนี้แทน - เพิ่ม domain ใน Team Account เลย
2. ถ้า Vercel บอก "already exists" ให้ทำตามนี้:
   - เข้า: https://vercel.com/dashboard
   - ดูทุก account ที่มี (Personal + Team)
   - หา domain นั้นว่าอยู่ที่ไหน
   - ลบออก
   - กลับมาเพิ่มใหม่ใน Team Account

### ปัญหา: DNS ไม่ชี้ถูก

**ตรวจสอบ DNS:**
```bash
nslookup greenbluerestbangkok.com
# ควรได้ 76.76.21.21 หรือ IP อื่นของ Vercel
```

**ถ้า DNS ผิด:**
1. เข้า GoDaddy: https://dcc.godaddy.com/control/portfolio/greenbluerestbangkok.com/settings
2. DNS → Manage Zones
3. แก้ A Record ชี้ไป: `76.76.21.21`

---

## 📋 สรุป

**Frontend:** ย้าย domain จาก `greenbluerestbangkok` → `greenbluerest` project  
**Admin:** เพิ่ม domain ใน `greenbluerest-admin` project (ลบจาก Personal Account ก่อน)

**เวลาที่ใช้:** 5-10 นาที  
**ความยาก:** ⭐⭐ (ง่าย)

---

**อัปเดต:** 7 ตุลาคม 2025

