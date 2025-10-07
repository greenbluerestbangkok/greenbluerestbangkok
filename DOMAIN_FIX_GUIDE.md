# 🔧 คู่มือแก้ไข Domain ทั้ง 2 ตัว

## ปัญหาที่พบ

1. `admin.greenbluerestbangkok.com` → 404
2. `greenbluerestbangkok.com` → 404

---

## ✅ วิธีแก้ไข Frontend (`greenbluerestbangkok.com`)

### วิธีที่ 1: Deploy ไปที่ project greenbluerestbangkok (แนะนำ - ทำผ่าน Terminal)

```bash
# 1. ไปที่ folder src
cd /Users/nattagid/GitHub/greenbluerestbangkok/src

# 2. ลบ .vercel directory
rm -rf .vercel

# 3. Deploy to production
vercel --prod

# 4. ตอบคำถาม:
# ? Set up and deploy "src"? → YES
# ? Which scope? → greenbluerestbangkok's projects
# ? Link to existing project? → YES
# ? What's the name of your existing project? → greenbluerestbangkok
```

### วิธีที่ 2: ย้าย Domain ผ่าน Vercel Dashboard

1. เข้า: https://vercel.com/greenbluerestbangkoks-projects/greenbluerestbangkok
2. Settings → Domains
3. ลบ `greenbluerestbangkok.com` ออก
4. เข้า: https://vercel.com/greenbluerestbangkoks-projects/greenbluerest
5. Settings → Domains
6. Add: `greenbluerestbangkok.com`

---

## ✅ วิธีแก้ไข Admin (`admin.greenbluerestbangkok.com`)

### ต้องทำผ่าน Vercel Dashboard เท่านั้น

1. **เปลี่ยนไป Personal Account:**
   - คลิกชื่อ account ด้านบนขวา
   - เลือก `bangmodcanal-6790`

2. **ลบ Domain จาก Personal Account:**
   - ไปที่ Settings → Domains
   - หา `admin.greenbluerestbangkok.com`
   - คลิก Remove

3. **เปลี่ยนไป Team Account:**
   - คลิกชื่อ account ด้านบนขวา
   - เลือก `greenbluerestbangkok's projects`

4. **เพิ่ม Domain ใน project greenbluerest-admin:**
   - เข้าไปที่ project `greenbluerest-admin`
   - Settings → Domains
   - Add: `admin.greenbluerestbangkok.com`

---

## 🔍 ตรวจสอบว่าแก้สำเร็จ

```bash
# ตรวจสอบ Frontend
curl -I https://greenbluerestbangkok.com
# ควรได้ HTTP/2 200 (ไม่ใช่ 404)

# ตรวจสอบ Admin
curl -I https://admin.greenbluerestbangkok.com
# ควรได้ HTTP/2 200 (ไม่ใช่ 404)
```

---

## 🎯 สรุป

- Frontend: Deploy ไปที่ project greenbluerestbangkok ผ่าน Terminal
- Admin: ย้าย domain จาก Personal → Team Account ผ่าน Dashboard

---

**อัปเดต:** 7 ตุลาคม 2025

