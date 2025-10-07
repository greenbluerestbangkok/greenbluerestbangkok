# 🌿 Green Blue Rest Bangkok

**Community-Based Tourism Platform**  
Platform สำหรับส่งเสริมการท่องเที่ยวชุมชนและสินค้าท้องถิ่น

---

## 📋 Overview

Green Blue Rest Bangkok เป็นแพลตฟอร์มที่รวมทริปท่องเที่ยวชุมชน สินค้าท้องถิ่น และเนื้อหาเกี่ยวกับการพัฒนาอย่างยั่งยืนในพื้นที่กรุงเทพมหานคร

### **เว็บไซต์ประกอบด้วย:**
- 🏞️ **Trips** - ทริปท่องเที่ยวชุมชน 11 รายการ
- 🛍️ **Products** - สินค้าชุมชน 24 รายการ
- 📝 **Blog** - บทความและเนื้อหา
- 🎥 **Videos** - วิดีโอเกี่ยวกับชุมชน
- 👥 **Entrepreneurs** - ผู้ประกอบการ 8 กลุ่ม

---

## 🏗️ Project Structure

```
greenbluerestbangkok/
├── admin/                  # Next.js Admin Panel (CMS)
├── pages/                  # Frontend HTML pages
├── js/                     # Frontend JavaScript
├── css/                    # Stylesheets
├── images/                 # Static assets
├── docs/                   # Documentation
└── public/                 # Public assets
```

**อ่านเพิ่มเติม:** [PROJECT_STRUCTURE_ANALYSIS.md](PROJECT_STRUCTURE_ANALYSIS.md)

---

## 🚀 Quick Start

### **1. Frontend Website**
```bash
# เปิดไฟล์ HTML โดยตรง
open index.html

# หรือใช้ local server
python -m http.server 8000
# เปิด http://localhost:8000
```

### **2. Admin Panel (CMS)**
```bash
cd admin
npm install
npm run dev
# เปิด http://localhost:3001
```

**อ่านคู่มือ:** [docs/guides/CMS_USER_GUIDE.md](docs/guides/CMS_USER_GUIDE.md)

---

## 💻 Tech Stack

### **Frontend:**
- HTML5, CSS3, JavaScript (ES6+)
- Responsive Design
- WebP Images

### **Admin Panel:**
- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Supabase (Database)

### **Database:**
- Supabase (PostgreSQL)
- Tables: trips, products, articles, videos, entrepreneurs

---

## 📚 Documentation

### **🎯 Quick Start Guides:**
- [CMS User Guide](docs/guides/CMS_USER_GUIDE.md) - วิธีใช้งาน CMS
- [Quick Data Setup](docs/guides/QUICK_DATA_SETUP.md) - เพิ่มข้อมูลเริ่มต้น
- [Image Upload Feature](docs/guides/IMAGE_UPLOAD_FEATURE.md) - อัปโหลดรูปภาพ

### **🔧 Admin & Setup:**
- [Admin CMS Setup](docs/admin/ADMIN_CMS_SETUP_GUIDE.md) - ติดตั้ง Admin Panel
- [Admin Panel Access](docs/admin/ADMIN_PANEL_ACCESS_GUIDE.md) - วิธีเข้าถึง
- [Admin User Setup](docs/admin/ADMIN_USER_SETUP.md) - สร้างบัญชีผู้ใช้

### **📖 Development:**
- [Development Guide](docs/DEVELOPMENT.md) - วิธี setup สำหรับ developer
- [Project Structure Analysis](PROJECT_STRUCTURE_ANALYSIS.md) - วิเคราะห์โครงสร้าง
- [System Analysis Report](docs/SYSTEM_ANALYSIS_REPORT.md) - รายงานระบบ

### **🚀 Deployment:**
- [Deployment Strategy](docs/deployment/DEPLOYMENT_STRATEGY.md) - วางแผน deployment
- [Vercel URLs](docs/deployment/VERCEL_CORRECT_URLS.md) - URL configuration

### **📦 Full Documentation:**
ดูเอกสารทั้งหมดใน [docs/](docs/)

---

## 🎨 Features

### **Frontend Website:**
- ✅ Responsive Design
- ✅ Image Optimization (WebP)
- ✅ SEO Optimized
- ✅ Fast Loading
- ✅ Mobile Friendly

### **Admin Panel (CMS):**
- ✅ Full CRUD Operations
- ✅ Image Upload with Preview
- ✅ Bulk Actions
- ✅ Search & Filter
- ✅ Real-time Statistics
- ✅ SEO Editor
- ✅ User-friendly Interface

---

## 📊 Database

### **Supabase Tables:**
```sql
trips          (11 records)
products       (24 records)
articles       (5 records)
videos         (5 records)
entrepreneurs  (8 records)
```

### **Import Data:**
```bash
# ใช้ SQL script
cd admin/scripts/sql
# Run MASTER_DATA_IMPORT.sql in Supabase SQL Editor

# หรือใช้ auto import
cd admin
node scripts/simple-import.js
```

**อ่านเพิ่มเติม:** [docs/guides/ADD_DATA_TO_SUPABASE.md](docs/guides/ADD_DATA_TO_SUPABASE.md)

---

## 🛠️ Development

### **Prerequisites:**
- Node.js 18+
- npm or yarn
- Supabase account

### **Environment Variables:**
```bash
# admin/.env.local
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
```

### **Install & Run:**
```bash
# Frontend
open index.html

# Admin Panel
cd admin
npm install
npm run dev
```

---

## 📝 Content Management

### **จัดการเนื้อหาผ่าน Admin Panel:**

1. **Trips (ทริป):**
   - เพิ่ม/แก้ไข/ลบทริป
   - อัปโหลดรูปภาพ
   - จัดการราคา, ระยะเวลา

2. **Products (สินค้า):**
   - เพิ่ม/แก้ไข/ลบสินค้า
   - อัปโหลดรูปสินค้า
   - จัดการราคา, หมวดหมู่

3. **Articles (บทความ):**
   - เขียนบทความ
   - อัปโหลดรูปปก
   - Publish/Draft

4. **Videos (วิดีโอ):**
   - เพิ่ม YouTube URL
   - จัดการ thumbnail

5. **Entrepreneurs (ผู้ประกอบการ):**
   - เพิ่มข้อมูลกลุ่ม
   - อัปโหลดโลโก้

**คู่มือ:** [docs/guides/CMS_USER_GUIDE.md](docs/guides/CMS_USER_GUIDE.md)

---

## 🎯 Recent Updates

### **✅ Version 2.1.0** (7 ตุลาคม 2025)
- ✨ เพิ่มระบบอัปโหลดรูปภาพพร้อมปุ่มลบ
- ♻️ จัดระเบียบโครงสร้างโปรเจกต์
- 🧪 แยก test files ออกจาก production
- 📚 จัดระเบียบ documentation
- 🗄️ จัดกลุ่ม SQL files
- ❌ ลบ duplicate files และ test endpoints

**อ่านรายละเอียด:** [CLEANUP_REPORT.md](CLEANUP_REPORT.md)

---

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📞 Support

### **Documentation:**
- [User Guide](docs/guides/CMS_USER_GUIDE.md)
- [FAQ](docs/guides/MAINTENANCE_GUIDE.md)
- [Troubleshooting](docs/archive/)

### **Contact:**
- Website: [Green Blue Rest Bangkok](https://greenbluerestbangkok.com)
- Email: support@greenbluerestbangkok.com

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgments

- ชุมชนในพื้นที่กรุงเทพมหานคร
- ผู้ประกอบการท้องถิ่น
- ทีมพัฒนา Green Blue Rest Bangkok

---

<div align="center">

**Made with ❤️ for Community-Based Tourism**

[Website](https://greenbluerestbangkok.com) • [Admin Panel](https://admin.greenbluerestbangkok.com) • [Documentation](docs/)

</div>

---

**Last Updated:** 7 ตุลาคม 2025  
**Version:** 2.1.0  
**Status:** ✅ Production Ready
