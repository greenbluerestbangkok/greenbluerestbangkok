# 🌐 DNS Setup - ชัดเจน 100%!

**สำคัญ:** มี 2 วิธีตั้งค่า - คุณต้องใช้แค่วิธีที่ 1!

---

## ⚠️ อย่าสับสน!

### **Nameservers ที่คุณเห็น:**
```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

**นี่คือ:** Vercel Nameservers (สำหรับ advanced setup)

**คุณไม่ต้องใช้!** ❌

---

## 🎯 2 วิธีตั้งค่า Custom Domain

### **วิธีที่ 1: CNAME Record** (แนะนำ! ✅)

**ทำอะไร:**
- เก็บ nameservers เดิมของ GoDaddy ไว้
- เพิ่ม CNAME record เดียว
- ง่าย รวดเร็ว ปลอดภัย

**ตั้งค่า:**
```
ใน GoDaddy DNS Management:

Type: CNAME
Host: admin
Points to: cname.vercel-dns.com
TTL: 1 Hour

(ไม่ต้องแตะ Nameservers!)
```

**ผลลัพธ์:**
```
✅ admin.greenbluerestbangkok.com → Vercel
✅ greenbluerestbangkok.com → ยังอยู่ที่เดิม
✅ ง่าย รวดเร็ว
```

---

### **วิธีที่ 2: Change Nameservers** (Advanced ❌)

**ทำอะไร:**
- เปลี่ยน nameservers ทั้ง domain ไปใช้ Vercel
- Vercel จัดการ DNS ทั้งหมด
- ยุ่งยาก ไม่จำเป็น

**ตั้งค่า:**
```
ใน GoDaddy Nameservers:

Replace:
ns1.domaincontrol.com  →  ns1.vercel-dns.com
ns2.domaincontrol.com  →  ns2.vercel-dns.com
```

**ผลลัพธ์:**
```
⚠️ ทั้ง domain ถูกจัดการโดย Vercel
⚠️ ต้องเพิ่ม DNS ทั้งหมดใน Vercel
⚠️ ซับซ้อน ไม่แนะนำ!
```

---

## ✅ คุณควรใช้: วิธีที่ 1 (CNAME)

### **ทำไม?**

1. **ง่ายกว่า 10 เท่า**
   - แค่เพิ่ม 1 record
   - 3 นาทีเสร็จ

2. **ปลอดภัยกว่า**
   - Domain ยังอยู่ที่ GoDaddy
   - ไม่กระทบ DNS อื่นๆ
   - Risk ต่ำ

3. **Flexible**
   - จัดการ DNS ที่ GoDaddy ได้เหมือนเดิม
   - Email, WWW, อื่นๆ ไม่กระทบ

4. **Best Practice**
   - ส่วนใหญ่ใช้วิธีนี้
   - ไม่ซับซ้อน

---

## 📋 Step-by-Step (วิธีที่ 1 - CNAME)

### **ใน GoDaddy:**

**1. Login:**
```
https://dcc.godaddy.com
```

**2. My Products → Domains**

**3. เลือก `greenbluerestbangkok.com`**

**4. คลิก "DNS" (จะเห็น DNS Records)**

**5. คลิก "ADD" (เพิ่ม record)**

**6. กรอก:**

```
┌─────────────────────────────────────┐
│ Type:      CNAME          ↓         │
├─────────────────────────────────────┤
│ Host:      admin                    │
├─────────────────────────────────────┤
│ Points to: cname.vercel-dns.com     │
├─────────────────────────────────────┤
│ TTL:       1 Hour         ↓         │
└─────────────────────────────────────┘

[Cancel]  [Save] ←
```

**7. คลิก "Save"**

**8. เสร็จ!** ✅

---

## ⚠️ ข้อควรระวัง!

### **❌ อย่าทำ:**

**1. อย่าเปลี่ยน Nameservers:**
```
❌ ไม่ต้องแตะ Nameserver settings
❌ ปล่อยให้เป็น GoDaddy nameservers เดิม
```

**2. อย่าใช้ชื่อผิด:**
```
❌ Host: admin.greenbluerestbangkok.com (ผิด!)
✅ Host: admin (ถูก!)
```

**3. อย่าใช้ A Record:**
```
❌ Type: A Record (ผิด!)
✅ Type: CNAME (ถูก!)
```

---

## ✅ สิ่งที่ต้องทำ

### **ที่ GoDaddy (เท่านั้น!):**

**เพิ่ม 1 record:**
```
Type: CNAME
Host: admin
Points to: cname.vercel-dns.com
TTL: 1 Hour
```

**ไม่ต้อง:**
- ❌ เปลี่ยน nameservers
- ❌ ลบ record อื่น
- ❌ แก้ไขอะไรอื่น

**แค่:**
- ✅ เพิ่ม CNAME record เดียว
- ✅ Save
- ✅ เสร็จ!

---

## 🧪 ตรวจสอบหลังตั้งค่า

### **ใน GoDaddy DNS Records:**

ควรมี record ใหม่:
```
Type    Host    Points to              TTL
───────────────────────────────────────────────
CNAME   admin   cname.vercel-dns.com   1 Hour
```

### **Nameservers ควรเป็น (ไม่ต้องเปลี่ยน!):**
```
ns1.domaincontrol.com  ← GoDaddy (เดิม)
ns2.domaincontrol.com  ← GoDaddy (เดิม)
```

---

## ⏱️ Timeline

```
Now:       Add CNAME in GoDaddy        (3 min)
+5 min:    DNS propagating             (wait)
+15 min:   Vercel detects DNS          (check)
+30 min:   Domain active! ✅           (done)
```

---

## 🎉 หลังเสร็จ

### **URLs ที่ใช้งานได้:**

```
Admin Panel:
✅ https://admin.greenbluerestbangkok.com (Custom)
✅ https://greenbluerest-admin.vercel.app (Backup)

(ทั้งสอง URL ใช้งานได้!)
```

---

## 💡 สรุปสั้นๆ

### **ที่ Vercel:**
เพิ่ม domain: `admin.greenbluerestbangkok.com`

### **ที่ GoDaddy:**
เพิ่ม CNAME: `admin` → `cname.vercel-dns.com`

### **Nameservers:**
**ไม่ต้องแตะ!** ปล่อยเป็นของ GoDaddy

### **รอ:**
10-30 นาที

### **ทดสอบ:**
`https://admin.greenbluerestbangkok.com`

---

<div align="center">

# ✅ **ชัดเจนแล้วใช่ไหมครับ?**

**แค่เพิ่ม CNAME record เดียว**

**ไม่ต้องเปลี่ยน nameserver!**

</div>

---

**พร้อมเริ่มตั้งค่าแล้วใช่ไหมครับ?** 🚀

