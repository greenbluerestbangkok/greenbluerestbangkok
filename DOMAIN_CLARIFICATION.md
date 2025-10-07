# 🌐 Domain Clarification

**Date:** 7 ตุลาคม 2025

---

## ❓ Domain ที่ถูกต้องคืออะไร?

### **ตัวเลือก 1:**
```
greenbluerest.com
```

### **ตัวเลือก 2:**
```
greenbluerestbangkok.com
```

---

## 📋 Current Configuration

### **ใน CNAME file:**
```
greenbluerestbangkok.com
```

### **ตามที่คุณบอก:**
```
greenbluerest.com
```

---

## 🎯 Recommended Setup

### **ถ้า Domain จริงคือ `greenbluerest.com`:**

**Setup:**
```
Frontend:
https://greenbluerest.com
https://www.greenbluerest.com

Admin:
https://admin.greenbluerest.com
```

**DNS Configuration (GoDaddy):**
```
For greenbluerest.com:

Type: A
Name: @
Value: 76.76.21.21
TTL: 1 Hour

Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 1 Hour

Type: CNAME
Name: admin
Value: cname.vercel-dns.com
TTL: 1 Hour
```

---

### **ถ้า Domain จริงคือ `greenbluerestbangkok.com`:**

**Setup:**
```
Frontend:
https://greenbluerestbangkok.com
https://www.greenbluerestbangkok.com

Admin:
https://admin.greenbluerestbangkok.com ✅ (ตั้งค่าแล้ว)
```

**DNS Configuration (GoDaddy):**
```
For greenbluerestbangkok.com:

Type: A
Name: @
Value: 76.76.21.21
TTL: 1 Hour

Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 1 Hour

Type: CNAME
Name: admin
Value: cname.vercel-dns.com
TTL: 1 Hour (ตั้งค่าแล้ว?)
```

---

## 🤔 Which Domain Do You Own?

**Please confirm:**

### **Option 1: greenbluerest.com**
```
□ ฉันมี greenbluerest.com
□ ต้องการใช้ greenbluerest.com เป็นหลัก
```

**Setup needed:**
- Update CNAME file
- Configure Vercel for greenbluerest.com
- Set up admin.greenbluerest.com

---

### **Option 2: greenbluerestbangkok.com**
```
□ ฉันมี greenbluerestbangkok.com
□ ต้องการใช้ greenbluerestbangkok.com เป็นหลัก
```

**Setup needed:**
- Keep CNAME as is
- Configure Vercel for greenbluerestbangkok.com
- admin.greenbluerestbangkok.com already set

---

### **Option 3: Both!**
```
□ ฉันมีทั้งสอง domain
□ greenbluerest.com (main)
□ greenbluerestbangkok.com (redirect or alternative)
```

**Setup needed:**
- Configure both
- Set one as primary
- Redirect the other

---

## 🎯 Please Confirm

**Which is correct?**

1. **greenbluerest.com** (shorter)
2. **greenbluerestbangkok.com** (in CNAME)
3. **Both** (own both domains)

**Tell me and I'll help configure correctly!**

---

## 🔧 Configuration Based on Answer

### **If greenbluerest.com:**

**Update CNAME:**
```bash
echo "greenbluerest.com" > CNAME
```

**Vercel Domains:**
```
Frontend: greenbluerest.com
Admin: admin.greenbluerest.com
```

---

### **If greenbluerestbangkok.com:**

**Keep CNAME:**
```bash
# No change needed
```

**Vercel Domains:**
```
Frontend: greenbluerestbangkok.com
Admin: admin.greenbluerestbangkok.com ✅
```

---

### **If Both:**

**Primary:** greenbluerest.com  
**Secondary:** greenbluerestbangkok.com (301 redirect)

---

**Please confirm which domain(s) you actually own!** 🌐

