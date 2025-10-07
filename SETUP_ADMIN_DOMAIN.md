# 🌐 Setup Admin Domain - Step by Step

**Target:** `https://admin.greenbluerestbangkok.com`  
**Date:** 7 ตุลาคม 2025

---

## ✅ Quick Guide (5 Steps - 5 Minutes)

### **Step 1: Vercel Dashboard**

**1.1 เข้า:**
```
https://vercel.com/dashboard
```

**1.2 เลือก Project:**
- หา project ที่ deploy Admin Panel
- คลิกเข้าไป

**1.3 ไป Domains:**
- คลิก **Settings** (ด้านบน)
- คลิก **Domains** (เมนูซ้าย)

---

### **Step 2: Add Domain**

**2.1 คลิก "Add"**

**2.2 พิมพ์:**
```
admin.greenbluerestbangkok.com
```

**2.3 คลิก "Add"**

**2.4 Vercel จะแสดง:**
```
⚠️ Invalid Configuration

Add this DNS record:

Type: CNAME
Name: admin
Value: cname.vercel-dns.com
```

**Copy ข้อมูลนี้!** 📋

---

### **Step 3: Configure DNS**

**Domain `greenbluerestbangkok.com` ซื้อจากที่ไหน?**

#### **🔸 Cloudflare (Popular):**

1. เข้า: https://dash.cloudflare.com
2. เลือก `greenbluerestbangkok.com`
3. คลิก **DNS** → **Records**
4. คลิก **Add record**
5. กรอก:
   ```
   Type: CNAME
   Name: admin
   Target: cname.vercel-dns.com
   Proxy status: DNS only (เทา ☁️ ปิด Proxy!)
   TTL: Auto
   ```
6. คลิก **Save**

#### **🔸 GoDaddy:**

1. เข้า: https://dcc.godaddy.com/manage/dns
2. เลือก `greenbluerestbangkok.com`
3. คลิก **Add** (DNS Records)
4. กรอก:
   ```
   Type: CNAME
   Host: admin
   Points to: cname.vercel-dns.com
   TTL: 1 Hour
   ```
5. คลิก **Save**

#### **🔸 Namecheap:**

1. เข้า: https://ap.www.namecheap.com
2. Domain List → เลือก domain
3. **Advanced DNS**
4. **Add New Record**
5. กรอก:
   ```
   Type: CNAME Record
   Host: admin
   Value: cname.vercel-dns.com
   TTL: Automatic
   ```
6. คลิก **Save**

#### **🔸 Thai Providers (ThaiDomains, etc.):**

1. Login เข้าระบบ
2. เลือก domain
3. หา DNS Management
4. เพิ่ม CNAME:
   ```
   Name: admin
   Type: CNAME
   Value: cname.vercel-dns.com
   ```
5. บันทึก

---

### **Step 4: Wait (10-30 minutes)**

DNS ต้องใช้เวลา propagate:
- Fast: 5-10 นาที
- Normal: 10-30 นาที
- Slow: 1-2 ชั่วโมง (แต่หาย่อม)

**ทำอะไรระหว่างรอ:**
- ☕ ดื่มกาแฟ
- 📱 เช็คโซเชียล
- 📖 อ่านเอกสาร

---

### **Step 5: Verify**

**5.1 เช็คใน Vercel:**

กลับไปที่ Vercel → Domains

ควรเห็น:
```
✅ admin.greenbluerestbangkok.com - Valid Configuration
```

**5.2 เปิด Browser:**
```
https://admin.greenbluerestbangkok.com
```

**ควรเห็น:**
- ✅ Admin Panel Dashboard
- ✅ SSL 🔒 (สีเขียว)
- ✅ ทุกอย่างทำงาน

---

## 🧪 Testing DNS

### **Online Tool:**
```
https://dnschecker.org

Input: admin.greenbluerestbangkok.com
Should show: cname.vercel-dns.com
```

### **Terminal (Mac/Linux):**
```bash
dig admin.greenbluerestbangkok.com

# Should show:
# admin.greenbluerestbangkok.com. 300 IN CNAME cname.vercel-dns.com.
```

### **Terminal (Windows):**
```cmd
nslookup admin.greenbluerestbangkok.com
```

---

## 📋 DNS Record Summary

### **What to add:**

| Type | Name | Value | TTL | Proxy |
|------|------|-------|-----|-------|
| CNAME | `admin` | `cname.vercel-dns.com` | Auto | OFF |

### **Important:**
- ✅ Name = `admin` (ไม่ใช่ `admin.greenbluerestbangkok.com`)
- ✅ Type = `CNAME` (ไม่ใช่ A record)
- ✅ Value = `cname.vercel-dns.com` (ตัวพิมพ์เล็ก)
- ✅ Proxy OFF (ถ้าใช้ Cloudflare)

---

## 🎊 After Setup Success

### **You will have:**

```
Frontend (Public):
https://greenbluerestbangkok.com (to be deployed)

Admin (Staff only):
https://admin.greenbluerestbangkok.com ✅ (LIVE!)

Database:
Supabase (connected to both)
```

---

## 🚨 Troubleshooting

### **DNS not updating?**
1. เช็คว่า record ถูกต้อง
2. รอนานขึ้น (1-2 ชั่วโมง)
3. Clear DNS cache
4. ลอง incognito mode

### **Still shows Vercel URL?**
- Normal! ทั้งสอง URL ใช้งานได้
- Custom domain จะเป็น primary
- Vercel URL เป็น fallback

### **SSL Error?**
- รอ 5-10 นาที (SSL cert generating)
- Vercel auto-generate SSL
- Should work automatically

---

## ✅ Final Checklist

**In Vercel:**
- [ ] Add domain: `admin.greenbluerestbangkok.com`
- [ ] Copy DNS configuration

**In DNS Provider:**
- [ ] Add CNAME record
- [ ] Name: `admin`
- [ ] Value: `cname.vercel-dns.com`
- [ ] Save changes

**Wait & Verify:**
- [ ] Wait 10-30 minutes
- [ ] Check Vercel → ✅ Valid
- [ ] Visit `https://admin.greenbluerestbangkok.com`
- [ ] Test Admin Panel
- [ ] Verify SSL 🔒

---

<div align="center">

# 🎯 **Ready to Configure!**

**Follow steps above to set up:**

`admin.greenbluerestbangkok.com`

**Time:** 5 minutes + waiting  
**Difficulty:** Easy

</div>

---

**ต้องการให้แนะนำเรื่อง DNS Provider ไหมครับ?**

บอกมาได้เลยว่า domain ซื้อจากที่ไหน:
- Cloudflare?
- GoDaddy?
- Namecheap?
- Thai provider?
- อื่นๆ?

