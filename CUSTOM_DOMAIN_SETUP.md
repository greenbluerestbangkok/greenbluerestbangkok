# 🌐 Custom Domain Setup Guide

**Target Domain:** `admin.greenbluerestbangkok.com`  
**Date:** 7 ตุลาคม 2025

---

## 🎯 Goal

ตั้งค่าให้ Admin Panel ใช้ domain:
```
https://admin.greenbluerestbangkok.com
```

แทน:
```
https://greenbluerest-admin.vercel.app
```

---

## 📋 Step-by-Step Instructions

### **Step 1: เพิ่ม Domain ใน Vercel**

**1.1 เข้า Vercel Dashboard:**
```
https://vercel.com/dashboard
```

**1.2 เลือก Project:**
- คลิกที่โปรเจกต์ `greenbluerest-admin` (หรือชื่อที่คุณตั้ง)

**1.3 ไป Settings:**
- คลิก "Settings" ที่ด้านบน
- เลือก "Domains" จากเมนูด้านซ้าย

**1.4 เพิ่ม Domain:**
- คลิกปุ่ม "Add"
- พิมพ์: `admin.greenbluerestbangkok.com`
- คลิก "Add"

**1.5 Vercel จะแสดง DNS Configuration:**

จะแสดงแบบนี้:
```
⚠️ Invalid Configuration

Add the following record to your DNS provider:

Type: CNAME
Name: admin
Value: cname.vercel-dns.com
TTL: 3600 (or Auto)
```

---

### **Step 2: ตั้งค่า DNS**

**2.1 หา DNS Provider:**

Domain `greenbluerestbangkok.com` ซื้อจากที่ไหน?
- GoDaddy
- Namecheap
- Cloudflare
- Google Domains
- Thai providers (ThaiDomains, etc.)

**2.2 Login เข้า DNS Provider:**

**2.3 หา DNS Management/DNS Settings:**
- มองหา "DNS Management"
- หรือ "DNS Records"
- หรือ "Domain Settings"

**2.4 เพิ่ม CNAME Record:**

```
Type: CNAME
Name: admin
Value: cname.vercel-dns.com
TTL: Auto (หรือ 3600)
```

**หรือถ้าเป็น Cloudflare:**
```
Type: CNAME
Name: admin
Target: cname.vercel-dns.com
Proxy status: DNS only (เทา ☁️)
```

**2.5 บันทึก:**
- คลิก "Save" หรือ "Add Record"

---

### **Step 3: รอ DNS Propagate**

**3.1 เช็คสถานะ:**

กลับไปที่ Vercel Dashboard → Domains

จะเห็น:
```
⏳ admin.greenbluerestbangkok.com - Pending Configuration
```

**3.2 รอ 5-30 นาที:**

DNS ต้องใช้เวลาในการอัปเดต (DNS propagation)

**3.3 เมื่อเสร็จ:**
```
✅ admin.greenbluerestbangkok.com - Valid Configuration
```

---

### **Step 4: เช็คว่าใช้งานได้**

**4.1 เปิด browser:**
```
https://admin.greenbluerestbangkok.com
```

**4.2 ควรเห็น:**
- ✅ Admin Panel Dashboard
- ✅ SSL certificate (🔒 สีเขียว)
- ✅ ทุกอย่างทำงานปกติ

---

## 🔧 DNS Configuration Examples

### **Cloudflare (Popular):**
```
DNS Records:
┌──────┬───────┬─────────────────────────┬────────────┐
│ Type │ Name  │ Target                  │ Proxy      │
├──────┼───────┼─────────────────────────┼────────────┤
│ CNAME│ admin │ cname.vercel-dns.com    │ DNS only   │
└──────┴───────┴─────────────────────────┴────────────┘
```

### **GoDaddy:**
```
Type: CNAME
Host: admin
Points to: cname.vercel-dns.com
TTL: 1 Hour
```

### **Namecheap:**
```
Type: CNAME Record
Host: admin
Value: cname.vercel-dns.com
TTL: Automatic
```

---

## ✅ Verification

### **Check DNS Propagation:**

**Online Tools:**
```
https://dnschecker.org
```

พิมพ์: `admin.greenbluerestbangkok.com`  
ควรเห็น: `cname.vercel-dns.com`

**Terminal:**
```bash
# Mac/Linux
dig admin.greenbluerestbangkok.com

# Should show:
# admin.greenbluerestbangkok.com. 300 IN CNAME cname.vercel-dns.com.
```

---

## 🎯 Result

### **After Setup:**

```
https://admin.greenbluerestbangkok.com
  ↓
Redirects to your Vercel project
  ↓
Shows Admin Panel
```

### **Both URLs work:**
```
https://admin.greenbluerestbangkok.com ← Custom (production)
https://greenbluerest-admin.vercel.app ← Vercel (fallback)
```

---

## 📊 Timeline

```
Now:       Add domain in Vercel        (2 min)
+5 min:    Configure DNS                (3 min)
+10 min:   DNS propagating              (wait)
+30 min:   Domain active! ✅            (done)
```

---

## 🚨 Troubleshooting

### **Domain still not working after 1 hour?**

**Check:**
1. DNS record ถูกต้อง (CNAME, not A)
2. Name = `admin` (not `admin.greenbluerestbangkok.com`)
3. Value = `cname.vercel-dns.com` (exact)
4. TTL updated
5. Cloudflare proxy OFF (if using Cloudflare)

**Clear DNS cache:**
```bash
# Mac
sudo dscacheutil -flushcache

# Windows
ipconfig /flushdns
```

---

## 📱 After Domain is Active

### **Update Documentation:**

Update all references from:
```
https://greenbluerest-admin.vercel.app
```

To:
```
https://admin.greenbluerestbangkok.com
```

### **Share with Team:**
```
Admin Panel: https://admin.greenbluerestbangkok.com
Username: [your-username]
Password: [your-password]
```

---

## 🎉 Final Architecture

```
┌─────────────────────────────────────────┐
│  https://greenbluerestbangkok.com       │
│  (Frontend - Public Website)            │
│  Status: To be deployed                 │
└──────────────┬──────────────────────────┘
               │
               │ Reads data
               ▼
┌─────────────────────────────────────────┐
│  Supabase Database                      │
│  (PostgreSQL)                           │
└──────────────┬──────────────────────────┘
               │
               │ Managed by
               ▼
┌─────────────────────────────────────────┐
│  https://admin.greenbluerestbangkok.com │
│  (Admin Panel - CMS)                    │
│  Status: ✅ DEPLOYED                    │
└─────────────────────────────────────────┘
```

---

<div align="center">

# 🌐 **Custom Domain Ready!**

**Follow steps above to configure:**

`admin.greenbluerestbangkok.com`

**Estimated time:** 30 minutes  
**Difficulty:** Easy

</div>

---

**Created:** 7 ตุลาคม 2025  
**Status:** Ready to configure

