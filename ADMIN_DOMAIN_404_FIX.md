# 🔧 Admin Domain 404 Fix

**Error:** `404: NOT_FOUND` on `admin.greenbluerestbangkok.com`  
**Date:** 7 ตุลาคม 2025

---

## ❌ Problem

```
https://admin.greenbluerestbangkok.com
→ 404: NOT_FOUND
```

**สาเหตุ:**
Custom domain `admin.greenbluerestbangkok.com` ยังไม่ได้ตั้งค่าใน Vercel

---

## ✅ Solution: ตั้งค่า Custom Domain

### **Step 1: ใช้ Vercel URL ก่อน (ใช้งานได้ทันที!)**

**Admin Panel ที่ใช้งานได้:**
```
https://greenbluerest-admin-ftw3qcgw3-greenbluerestbangkoks-projects.vercel.app
```

**หรือ:**
```
https://greenbluerest-admin.vercel.app
```

**ลองเปิด URL เหล่านี้ ควรใช้งานได้!** ✅

---

### **Step 2: ตั้งค่า Custom Domain ใน Vercel**

**2.1 เข้า Vercel Dashboard:**
```
https://vercel.com/dashboard
```

**2.2 เลือก Project:**
- หา project ชื่อ `greenbluerest-admin` (หรือชื่อที่คล้ายกัน)
- คลิกเข้าไป

**2.3 ไป Settings:**
- คลิก "Settings" (ด้านบน)
- คลิก "Domains" (เมนูซ้าย)

**2.4 Add Domain:**
- คลิก "Add"
- พิมพ์: `admin.greenbluerestbangkok.com`
- คลิก "Add"

**2.5 Vercel จะแสดง:**
```
⚠️ Invalid Configuration

Add the following DNS record:

Type: CNAME
Name: admin
Value: cname.vercel-dns.com
```

---

### **Step 3: ตั้งค่า DNS ใน GoDaddy**

**3.1 เข้า GoDaddy:**
```
https://dcc.godaddy.com
```

**3.2 เลือก domain:**
`greenbluerestbangkok.com`

**3.3 คลิก DNS → Add Record**

**3.4 กรอก:**
```
Type: CNAME
Host: admin
Points to: cname.vercel-dns.com
TTL: 1 Hour
```

**3.5 Save**

---

### **Step 4: รอ DNS Propagate**

**รอ 10-30 นาที**

**เช็คที่:**
```
https://dnschecker.org
Input: admin.greenbluerestbangkok.com
```

ควรเห็น: `cname.vercel-dns.com`

---

### **Step 5: Verify**

**5.1 กลับไป Vercel → Domains**

ควรเห็น:
```
✅ admin.greenbluerestbangkok.com - Valid Configuration
```

**5.2 เปิด browser:**
```
https://admin.greenbluerestbangkok.com
```

**ควรเห็น Admin Panel!** ✅

---

## 🎯 Quick Fix (ใช้ทันที!)

### **ระหว่างรอตั้งค่า Custom Domain:**

**ใช้ Vercel URL:**
```
https://greenbluerest-admin-ftw3qcgw3-greenbluerestbangkoks-projects.vercel.app
```

**หรือ:**
```
https://greenbluerest-admin.vercel.app
```

**เปิด URL นี้ → ใช้งาน Admin Panel ได้เลย!**

---

## 📋 Timeline

```
Now:       Use Vercel URL              (works now!)
+2 min:    Add domain in Vercel        (step 2)
+5 min:    Add DNS in GoDaddy          (step 3)
+30 min:   DNS propagated              (step 4)
+30 min:   Custom domain works! ✅     (step 5)
```

---

## 🆘 Alternative: Use Vercel Dashboard Method

**ถ้าตั้งค่ายาก:**

**1. ใช้ Vercel URL ไปก่อน:**
```
https://greenbluerest-admin.vercel.app
```

**2. ตั้งค่า custom domain ทีหลัง (ไม่เร่งด่วน)**

---

## ✅ Current Working URLs

```
Admin Panel:
✅ https://greenbluerest-admin-ftw3qcgw3-greenbluerestbangkoks-projects.vercel.app
✅ https://greenbluerest-admin.vercel.app
❌ https://admin.greenbluerestbangkok.com (ยังไม่ได้ตั้งค่า)

Frontend:
✅ https://greenbluerest.vercel.app
⏳ https://greenbluerestbangkok.com (ยังไม่ได้ตั้งค่า)
```

---

<div align="center">

# 💡 **Quick Fix!**

**ใช้ URL นี้ได้เลย (ไม่ต้องรอ!):**

```
https://greenbluerest-admin.vercel.app
```

**หรือตั้งค่า custom domain ตาม guide ด้านบน**

</div>

---

**ต้องการ:**
1. **ใช้ Vercel URL ไปก่อน** (ง่าย ทันที)
2. **ตั้งค่า custom domain** (ต้องรอ 30 นาที)

**เลือกแบบไหนครับ?** 😊
