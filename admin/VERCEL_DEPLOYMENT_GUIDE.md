# 🚀 Vercel Deployment Guide

## 📋 **ขั้นตอนการ Deploy Admin Panel ไปยัง Vercel**

### 🔧 **1. เตรียมการ**

#### **1.1 ตรวจสอบ Dependencies**
```bash
cd admin
npm install
npm run build
```

#### **1.2 สร้าง Strapi Production Instance**
- Deploy Strapi ไปยัง production server (เช่น Railway, Heroku, DigitalOcean)
- ตั้งค่า CORS ให้อนุญาต Vercel domain
- สร้าง API Token สำหรับ production

---

### 🌐 **2. Deploy ไปยัง Vercel**

#### **2.1 วิธีที่ 1: ใช้ Vercel CLI**

```bash
# ติดตั้ง Vercel CLI
npm i -g vercel

# Login เข้า Vercel
vercel login

# Deploy จากโฟลเดอร์ admin
cd admin
vercel

# Follow the prompts:
# - Set up and deploy? Y
# - Which scope? (เลือก organization ของคุณ)
# - Link to existing project? N
# - What's your project's name? greenbluerest-admin
# - In which directory is your code located? ./
```

#### **2.2 วิธีที่ 2: ใช้ Vercel Dashboard**

1. ไปที่ [vercel.com](https://vercel.com)
2. คลิก "New Project"
3. Import repository จาก GitHub
4. ตั้งค่า:
   - **Framework Preset:** Next.js
   - **Root Directory:** `admin`
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`

---

### ⚙️ **3. ตั้งค่า Environment Variables**

ใน Vercel Dashboard → Project Settings → Environment Variables:

```env
# Strapi Configuration
STRAPI_URL=https://your-strapi-domain.com
STRAPI_API_TOKEN=your_production_strapi_api_token

# Next.js Configuration
NEXTAUTH_SECRET=your_strong_random_secret_here
NEXTAUTH_URL=https://your-admin-domain.vercel.app

# Environment
NODE_ENV=production
```

#### **3.1 สร้าง NEXTAUTH_SECRET**
```bash
# สร้าง random secret
openssl rand -base64 32
```

#### **3.2 ตั้งค่า STRAPI_URL**
- ใช้ domain ของ Strapi production instance
- ตัวอย่าง: `https://greenbluerest-cms.railway.app`

---

### 🔧 **4. ตั้งค่า Strapi สำหรับ Production**

#### **4.1 CORS Configuration**
```javascript
// config/middlewares.js
module.exports = [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      headers: '*',
      origin: [
        'http://localhost:3001',
        'https://your-admin-domain.vercel.app'
      ]
    }
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
```

#### **4.2 Database Configuration**
```javascript
// config/database.js
module.exports = ({ env }) => ({
  connection: {
    client: 'sqlite',
    connection: {
      filename: env('DATABASE_FILENAME', '.tmp/data.db'),
    },
    useNullAsDefault: true,
  },
});
```

#### **4.3 Server Configuration**
```javascript
// config/server.js
module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
});
```

---

### 🔐 **5. ตั้งค่า Authentication**

#### **5.1 สร้าง Admin User ใน Strapi**
1. เข้า Strapi Admin Panel
2. ไปที่ Settings → Users & Permissions Plugin → Roles
3. สร้าง Role: "Admin"
4. ไปที่ Users → Add New User
5. สร้าง user: `admin` / `admin123`

#### **5.2 ตั้งค่า Permissions**
- **Articles:** Public access (GET), Authenticated access (POST/PUT/DELETE)
- **Products:** Public access (GET), Authenticated access (POST/PUT/DELETE)
- **Trips:** Public access (GET), Authenticated access (POST/PUT/DELETE)

---

### 🧪 **6. ทดสอบการ Deploy**

#### **6.1 ทดสอบ API Endpoints**
```bash
# ทดสอบ Strapi API
curl https://your-strapi-domain.com/api/health
curl https://your-strapi-domain.com/api/articles
curl https://your-strapi-domain.com/api/products
curl https://your-strapi-domain.com/api/trips

# ทดสอบ Admin Panel API
curl https://your-admin-domain.vercel.app/api/articles
curl https://your-admin-domain.vercel.app/api/products
curl https://your-admin-domain.vercel.app/api/trips
```

#### **6.2 ทดสอบ Authentication**
```bash
# Login
curl -X POST https://your-strapi-domain.com/api/auth/local \
  -H "Content-Type: application/json" \
  -d '{"identifier":"admin","password":"admin123"}'

# ใช้ token ที่ได้
curl https://your-admin-domain.vercel.app/api/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

#### **6.3 ทดสอบ UI**
1. เปิด `https://your-admin-domain.vercel.app/admin/login`
2. เข้าสู่ระบบด้วย `admin` / `admin123`
3. ทดสอบทุกหน้า:
   - Dashboard
   - Articles Management
   - Products Management
   - Trips Management

---

### 🔄 **7. การอัปเดต**

#### **7.1 Auto Deploy จาก GitHub**
- Vercel จะ auto-deploy เมื่อ push code ไปยัง main branch
- ตั้งค่า branch protection rules ใน GitHub

#### **7.2 Manual Deploy**
```bash
cd admin
vercel --prod
```

#### **7.3 Rollback**
- ไปที่ Vercel Dashboard → Deployments
- คลิก "Promote to Production" บน deployment ที่ต้องการ

---

### 🐛 **8. การ Debug**

#### **8.1 ดู Logs**
```bash
# ดู Vercel logs
vercel logs

# ดู specific deployment
vercel logs [deployment-url]
```

#### **8.2 ตรวจสอบ Environment Variables**
```bash
# ตรวจสอบ env vars
vercel env ls
```

#### **8.3 ทดสอบ Local Production Build**
```bash
cd admin
npm run build
npm run start
```

---

### 📊 **9. Monitoring และ Analytics**

#### **9.1 Vercel Analytics**
- เปิดใช้งานใน Vercel Dashboard
- ดู performance metrics
- ตรวจสอบ error rates

#### **9.2 Custom Domain**
1. ไปที่ Project Settings → Domains
2. เพิ่ม custom domain
3. ตั้งค่า DNS records

---

### ⚠️ **10. ข้อควรระวัง**

#### **10.1 Security**
- ใช้ HTTPS เสมอ
- ตั้งค่า strong passwords
- หมั่นอัปเดต dependencies
- ใช้ environment variables สำหรับ sensitive data

#### **10.2 Performance**
- ใช้ Vercel Edge Functions สำหรับ API routes
- ตั้งค่า caching headers
- Optimize images
- ใช้ CDN

#### **10.3 Backup**
- Backup Strapi database เป็นประจำ
- เก็บ backup ของ environment variables
- ใช้ version control อย่างเคร่งครัด

---

### 🎯 **11. Production Checklist**

#### **11.1 Pre-Deploy**
- [ ] ทดสอบ build locally
- [ ] ตรวจสอบ environment variables
- [ ] ทดสอบ Strapi API
- [ ] ตั้งค่า CORS
- [ ] สร้าง admin user

#### **11.2 Post-Deploy**
- [ ] ทดสอบ login
- [ ] ทดสอบ CRUD operations
- [ ] ตรวจสอบ API endpoints
- [ ] ทดสอบ error handling
- [ ] ตั้งค่า monitoring

#### **11.3 Ongoing**
- [ ] หมั่นอัปเดต dependencies
- [ ] ตรวจสอบ logs
- [ ] Backup database
- [ ] Monitor performance
- [ ] Security audits

---

## 🎉 **สรุป**

### ✅ **สิ่งที่ได้:**
- **Production Admin Panel** บน Vercel
- **Secure Authentication** ด้วย JWT
- **Real-time Content Management** ผ่าน Strapi
- **Auto Deploy** จาก GitHub
- **Performance Monitoring** ผ่าน Vercel Analytics

### 🚀 **URLs:**
- **Admin Panel:** `https://your-admin-domain.vercel.app/admin`
- **Strapi CMS:** `https://your-strapi-domain.com/admin`

### 📞 **Support:**
- Vercel Documentation: https://vercel.com/docs
- Strapi Documentation: https://docs.strapi.io
- Next.js Documentation: https://nextjs.org/docs

**พร้อมใช้งานแล้ว!** 🎊
