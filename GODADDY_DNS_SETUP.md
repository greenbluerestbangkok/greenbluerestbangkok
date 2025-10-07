# 🌐 GoDaddy DNS Setup - ทำทีละขั้นตอน

**Domain:** `greenbluerestbangkok.com`  
**Subdomain:** `admin.greenbluerestbangkok.com`  
**Provider:** GoDaddy  
**Date:** 7 ตุลาคม 2025

---

## 🎯 เป้าหมาย

ตั้งค่า DNS ให้:
```
https://admin.greenbluerestbangkok.com → Admin Panel
```

---

## 📋 Step-by-Step Guide

### **Step 1: Login GoDaddy**

**1.1 เข้า:**
```
https://dcc.godaddy.com
```

**1.2 Login:**
- ใส่ Username/Email
- ใส่ Password
- คลิก Sign In

---

### **Step 2: เข้าหน้า DNS Management**

**2.1 หา Domain:**
- คลิก **"My Products"** (ด้านบน)
- หรือ **"Domains"** จากเมนู

**2.2 เลือก Domain:**
- หา `greenbluerestbangkok.com`
- คลิกปุ่ม **"DNS"** หรือ **"Manage DNS"**

**หรือ shortcut:**
```
https://dcc.godaddy.com/manage/greenbluerestbangkok.com/dns
```

---

### **Step 3: เพิ่ม CNAME Record**

**3.1 ในหน้า DNS Management:**

จะเห็นตาราง DNS Records ที่มีอยู่แล้ว

**3.2 คลิกปุ่ม "ADD" หรือ "Add Record":**

**3.3 กรอกข้อมูล:**

```
┌─────────────────────────────────────┐
│ Add DNS Record                      │
├─────────────────────────────────────┤
│                                     │
│ Type: [CNAME ▼]                     │
│                                     │
│ Host: [admin                    ]   │
│                                     │
│ Points to: [cname.vercel-dns.com]   │
│                                     │
│ TTL: [1 Hour ▼]                     │
│                                     │
│ [Cancel]  [Save]                    │
└─────────────────────────────────────┘
```

**รายละเอียด:**
- **Type:** เลือก `CNAME`
- **Host:** พิมพ์ `admin`
- **Points to:** พิมพ์ `cname.vercel-dns.com`
- **TTL:** เลือก `1 Hour` (หรือ Custom 3600)

**3.4 คลิก "Save"**

---

### **Step 4: ยืนยัน**

**4.1 ดู DNS Records:**

ควรเห็น record ใหม่:

```
Type    Name     Value                 TTL
──────────────────────────────────────────────
CNAME   admin    cname.vercel-dns.com  1 Hour
```

**4.2 คลิก "Save" (ถ้ามีปุ่มด้านล่าง)**

---

### **Step 5: รอ DNS Propagate**

**5.1 เวลาที่ต้องรอ:**
- ⚡ Fast: 5-10 นาที
- ⏱️ Normal: 10-30 นาที
- 🐌 Slow: 1-2 ชั่วโมง (หายาก)

**5.2 เช็คสถานะ:**

**Online tool:**
```
https://dnschecker.org

Domain: admin.greenbluerestbangkok.com
```

**Terminal:**
```bash
dig admin.greenbluerestbangkok.com
```

**5.3 เมื่อเห็น `cname.vercel-dns.com` = เสร็จ!**

---

### **Step 6: Verify ใน Vercel**

**6.1 กลับไป Vercel Dashboard:**
```
https://vercel.com/dashboard
```

**6.2 เลือก Project → Settings → Domains**

**6.3 ควรเห็น:**
```
✅ admin.greenbluerestbangkok.com - Valid Configuration
```

---

### **Step 7: ทดสอบ!**

**7.1 เปิด browser:**
```
https://admin.greenbluerestbangkok.com
```

**7.2 ควรเห็น:**
- ✅ Admin Panel Dashboard
- ✅ SSL 🔒 สีเขียว
- ✅ ไม่มี warning
- ✅ ทุกอย่างทำงาน

**7.3 ทดสอบ features:**
- เข้าหน้า Trips
- เข้าหน้า Products
- ทดสอบ API
- เช็คว่าข้อมูลโหลดได้

---

## 📸 Screenshots Reference

### **GoDaddy DNS Page:**

```
┌─────────────────────────────────────────────────┐
│ DNS Management for greenbluerestbangkok.com     │
├─────────────────────────────────────────────────┤
│                                                 │
│ Type    Name     Value                TTL       │
│ ─────────────────────────────────────────────  │
│ A       @        123.456.789.0        1 Hour   │
│ CNAME   www      @                    1 Hour   │
│ CNAME   admin    cname.vercel-dns.com 1 Hour ← │
│                                                 │
│                              [Add] [Edit]       │
└─────────────────────────────────────────────────┘
```

---

## 🔧 Common GoDaddy Issues

### **Issue 1: Can't find DNS Management**
**Solution:**
- My Products → Domains
- Click domain name
- Look for "DNS" or "Manage DNS" button

### **Issue 2: Can't add CNAME**
**Solution:**
- Make sure you select "CNAME" type first
- Then other fields appear

### **Issue 3: Says "Invalid host"**
**Solution:**
- Use just `admin` (not `admin.greenbluerestbangkok.com`)
- GoDaddy adds domain automatically

### **Issue 4: Taking too long**
**Solution:**
- GoDaddy can take 30-60 minutes
- Be patient
- Check dnschecker.org

---

## ⏱️ Timeline

```
Now:       Add CNAME in GoDaddy        (3 min)
+5 min:    DNS starts propagating      (wait)
+15 min:   Some servers see it         (partial)
+30 min:   Most servers see it         (good)
+60 min:   All servers see it          (complete)
```

---

## ✅ Verification Checklist

**In GoDaddy:**
- [ ] Logged in successfully
- [ ] Found greenbluerestbangkok.com
- [ ] Opened DNS Management
- [ ] Added CNAME record:
  - Type: CNAME
  - Host: admin
  - Points to: cname.vercel-dns.com
  - TTL: 1 Hour
- [ ] Saved changes
- [ ] See record in list

**In Vercel:**
- [ ] Domain added
- [ ] Shows configuration instructions
- [ ] Waiting for verification

**Testing:**
- [ ] DNS checker shows CNAME
- [ ] Vercel shows ✅ Valid
- [ ] Site loads at https://admin.greenbluerestbangkok.com
- [ ] SSL certificate active 🔒
- [ ] All features working

---

## 📱 Mobile Friendly Tip

GoDaddy has a mobile app:
- Download "GoDaddy" app
- Can manage DNS from phone
- Same steps apply

---

## 🎊 Success Criteria

### **When everything is done:**

```
✅ DNS Record added in GoDaddy
✅ Vercel shows "Valid Configuration"
✅ https://admin.greenbluerestbangkok.com loads
✅ SSL certificate active 🔒
✅ Admin Panel fully functional
✅ Can manage content
```

---

## 🚀 After Domain is Active

### **URLs you'll have:**

```
Production (Custom Domain):
https://admin.greenbluerestbangkok.com ✅

Backup (Vercel URL):
https://greenbluerest-admin.vercel.app ✅

Both work! Use custom domain for production.
```

---

## 💡 Pro Tips

### **1. Set as Primary:**
In Vercel → Domains → Set as Primary Domain

### **2. Redirect Vercel URL:**
Automatically redirect `.vercel.app` → custom domain

### **3. Test both:**
Both URLs should work identically

---

## 🆘 Need Help?

### **GoDaddy Support:**
- Phone: ดูในบัญชีของคุณ
- Chat: https://www.godaddy.com/help
- Help Center: https://www.godaddy.com/help/dns-management

### **Vercel Support:**
- Docs: https://vercel.com/docs/concepts/projects/domains
- Support: https://vercel.com/support

---

<div align="center">

# 🎯 **Ready to Configure!**

**Step 1:** Vercel Dashboard (2 min)  
**Step 2:** GoDaddy DNS (3 min)  
**Step 3:** Wait (10-30 min)  
**Step 4:** Test! ✅

**Total time:** 35-45 minutes  
**Difficulty:** Easy

</div>

---

## 📋 Quick Checklist

Copy this and check off as you go:

```
□ Login to Vercel
□ Add domain: admin.greenbluerestbangkok.com
□ Copy DNS configuration
□ Login to GoDaddy
□ Open DNS Management
□ Add CNAME record (admin → cname.vercel-dns.com)
□ Save changes
□ Wait 10-30 minutes
□ Check DNS propagation
□ Visit https://admin.greenbluerestbangkok.com
□ Verify it works
□ Test all features
□ Done! 🎉
```

---

**บอกผมมาได้เลยครับว่า:**
1. ทำ Step 1 (Vercel) เสร็จหรือยัง?
2. ต้องการให้แนะนำ GoDaddy DNS เพิ่มไหม?

**พร้อมช่วยเมื่อไหร่ก็ได้!** 😊

