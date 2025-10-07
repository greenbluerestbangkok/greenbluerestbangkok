# 🚀 Deploy Frontend NOW - Copy & Paste!

**เว็บหลัก:** https://greenbluerestbangkok.com  
**Date:** 7 ตุลาคม 2025

---

## ✅ คำสั่งที่ต้องรัน (Copy ทั้งหมด)

### **Step 1: Navigate to src folder**

```bash
cd /Users/nattagid/GitHub/greenbluerestbangkok/src
pwd
```

**ควรแสดง:**
```
/Users/nattagid/GitHub/greenbluerestbangkok/src
```

---

### **Step 2: Deploy**

```bash
vercel
```

---

## 📋 คำตอบสำหรับคำถามที่จะถาม

**Vercel จะถามคำถามหลายข้อ - ตอบแบบนี้:**

```
? Set up and deploy "~/GitHub/greenbluerestbangkok/src"?
→ พิมพ์: y
→ กด Enter

? Which scope should contain your project?
→ เลือก: greenbluerestbangkok's projects
→ กด Enter

? Link to existing project?
→ พิมพ์: n (No - สร้างใหม่!)
→ กด Enter

? What's your project's name?
→ พิมพ์: greenbluerest
→ กด Enter

? In which directory is your code located?
→ กด Enter (ใช้ ./ default)

? Want to override the settings?
→ พิมพ์: n (No)
→ กด Enter
```

**รอ deploy 1-2 นาที...**

---

### **Step 3: Deploy to Production**

```bash
vercel --prod
```

**รอ 2-3 นาที...**

**จะได้ URL:**
```
✅ Production: https://greenbluerest.vercel.app
```

---

## 🎯 หลัง Deploy สำเร็จ

### **URL ที่ได้:**
```
https://greenbluerest.vercel.app
```

**หรือชื่อที่คุณตั้ง**

### **ทดสอบ:**
- เปิด URL
- ควรเห็น Homepage
- ลองคลิกเมนู Trips, Products
- เช็คว่าข้อมูลจาก Supabase แสดงหรือไม่

---

## 🌐 ตั้งค่า Custom Domain

### **หลัง Deploy สำเร็จ:**

**1. ใน Vercel Dashboard:**
```
https://vercel.com/dashboard
→ เลือก project "greenbluerest"
→ Settings → Domains
→ Add: greenbluerestbangkok.com
→ Add: www.greenbluerestbangkok.com
```

**2. ใน GoDaddy:**
```
DNS Records:

Type: A
Name: @
Value: 76.76.21.21
TTL: 1 Hour

Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 1 Hour
```

**3. รอ 10-30 นาที**

**4. เปิด:**
```
https://greenbluerestbangkok.com
```

---

## ✅ Result

### **After Everything:**

```
Frontend:
✅ https://greenbluerest.vercel.app (Vercel URL)
✅ https://greenbluerestbangkok.com (Custom domain)

Admin:
✅ https://admin.greenbluerestbangkok.com

Database:
✅ Supabase (connected to both)
```

---

## 📋 Quick Checklist

```
□ cd to src folder
□ Run: vercel
□ Answer questions (n for "Link to existing")
□ Project name: greenbluerest
□ Wait for preview deploy
□ Run: vercel --prod
□ Wait for production deploy
□ Get URL
□ Test website
□ (Optional) Add custom domain
□ Done! 🎉
```

---

## 🎊 Expected Timeline

```
Step 1: cd src                     (10 seconds)
Step 2: vercel (preview)           (2 minutes)
Step 3: vercel --prod              (3 minutes)
Step 4: Test                       (2 minutes)
───────────────────────────────────────────
Total:                             ~7-8 minutes
```

---

<div align="center">

# 🚀 **Ready to Deploy!**

**Just copy-paste commands above**

**Good luck!** 🍀

</div>

---

**Start here:**
```bash
cd /Users/nattagid/GitHub/greenbluerestbangkok/src
vercel
```

