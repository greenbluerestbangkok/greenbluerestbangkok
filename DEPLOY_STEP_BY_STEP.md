# 🚀 Deploy Step-by-Step Guide

**ทำตามนี้ทีละขั้นตอน - ง่ายมาก!**

---

## 📋 **Admin Panel Deployment (5 นาที)**

### **Step 1: เปิด Terminal ใหม่**
```bash
cd /Users/nattagid/GitHub/greenbluerestbangkok/admin
```

---

### **Step 2: Login Vercel**
```bash
vercel login
```

**จะเกิดอะไร:**
- เปิด browser ขึ้นมา
- กด "Continue with GitHub" หรือ "Continue with Email"
- Login เข้า Vercel
- กลับมา Terminal จะขึ้น "Success!"

---

### **Step 3: Deploy**
```bash
vercel
```

**คำถามที่จะถาม + คำตอบ:**

```
? Set up and deploy "~/greenbluerestbangkok/admin"?
→ กด: y (Yes)

? Which scope do you want to deploy to?
→ เลือก: [your-account-name]

? Link to existing project?
→ กด: n (No - สร้างใหม่)

? What's your project's name?
→ พิมพ์: greenbluerest-admin

? In which directory is your code located?
→ กด Enter (ใช้ ./ default)

Auto-detected Project Settings (Next.js):
- Build Command: npm run build
- Output Directory: .next
? Want to override the settings?
→ กด: n (No)
```

**รอ deploy เสร็จ (2-3 นาที)**

---

### **Step 4: เพิ่ม Environment Variables**

หลัง deploy เสร็จ:

```bash
# เพิ่ม Supabase URL
vercel env add NEXT_PUBLIC_SUPABASE_URL

# ระบบจะถาม:
? What's the value of NEXT_PUBLIC_SUPABASE_URL?
→ พิมพ์: https://gmdvkegcejrbrobtrhfm.supabase.co

? Add NEXT_PUBLIC_SUPABASE_URL to which Environments?
→ เลือก: Production, Preview, Development (เลือกทั้ง 3)

# เพิ่ม Supabase Anon Key
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY

? What's the value of NEXT_PUBLIC_SUPABASE_ANON_KEY?
→ พิมพ์: [your-supabase-anon-key]

? Add NEXT_PUBLIC_SUPABASE_ANON_KEY to which Environments?
→ เลือก: Production, Preview, Development
```

**หา Supabase Key ได้ที่:**
1. https://supabase.com/dashboard
2. เลือก project
3. Settings → API
4. Copy "anon/public" key

---

### **Step 5: Deploy Production**

```bash
vercel --prod
```

รอ 1-2 นาที แล้วเสร็จ! 🎉

**จะได้ URL:**
```
https://greenbluerest-admin.vercel.app
```

---

## 📋 **Frontend Deployment (3 นาที)**

### **Step 1: ไปที่ src**
```bash
cd /Users/nattagid/GitHub/greenbluerestbangkok/src
```

---

### **Step 2: Deploy**
```bash
vercel
```

**คำถามที่จะถาม + คำตอบ:**

```
? Set up and deploy "~/greenbluerestbangkok/src"?
→ กด: y

? Which scope do you want to deploy to?
→ เลือก: [your-account-name]

? Link to existing project?
→ กด: n

? What's your project's name?
→ พิมพ์: greenbluerest

? In which directory is your code located?
→ กด Enter

Auto-detected Project Settings:
? Want to override the settings?
→ กด: n
```

---

### **Step 3: Deploy Production**

```bash
vercel --prod
```

**จะได้ URL:**
```
https://greenbluerest.vercel.app
```

---

## ✅ **เช็คว่าสำเร็จ:**

### **Admin Panel:**
1. เปิด: `https://greenbluerest-admin.vercel.app`
2. ควรเห็น Dashboard
3. ทดสอบเข้าหน้า Trips, Products

### **Frontend:**
1. เปิด: `https://greenbluerest.vercel.app`
2. ควรเห็น Homepage
3. ทดสอบเข้าหน้า Products, Trips

---

## 🆘 **ถ้ามีปัญหา:**

### **ปัญหา: vercel: command not found**
```bash
npm install -g vercel
```

### **ปัญหา: Build failed**
```bash
# ลอง build local ก่อน
cd admin
npm run build

# ถ้า build ได้ แล้ว deploy ใหม่
vercel --prod
```

### **ปัญหา: Environment variables ไม่ทำงาน**
```bash
# ไป Vercel Dashboard
https://vercel.com/dashboard

# เลือก project → Settings → Environment Variables
# เพิ่ม variables แล้ว Redeploy
```

---

## 📞 **Quick Reference:**

```bash
# Login
vercel login

# Deploy preview
vercel

# Deploy production
vercel --prod

# Add environment variable
vercel env add VARIABLE_NAME

# View deployments
vercel ls

# Open in browser
vercel open
```

---

## 🎉 **หลังจาก Deploy แล้ว:**

คุณจะมี 2 เว็บ:

1. **Admin Panel:**
   - URL: https://greenbluerest-admin.vercel.app
   - ใช้จัดการข้อมูล

2. **Frontend:**
   - URL: https://greenbluerest.vercel.app
   - เว็บสำหรับคนทั่วไป

---

**ใช้เวลารวม: 8-10 นาที**  
**ยากไหม: ไม่ยาก แค่ตามขั้นตอน!**

Good luck! 🚀

