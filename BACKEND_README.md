# 🚀 GreenBlueRest Backend API

## 📋 ภาพรวม
Backend API สำหรับ Admin Panel ที่สามารถแก้ไขไฟล์เว็บไซต์ได้จริงๆ อัตโนมัติ

## 🛠️ การติดตั้ง

### **1. ติดตั้ง Node.js**
```bash
# ตรวจสอบเวอร์ชัน Node.js
node --version
npm --version

# ควรเป็น Node.js 16+ และ npm 8+
```

### **2. ติดตั้ง Dependencies**
```bash
# ติดตั้ง packages ที่จำเป็น
npm install

# หรือติดตั้งทีละตัว
npm install express cors helmet bcryptjs jsonwebtoken multer fs-extra
npm install nodemon --save-dev
```

### **3. สร้างโฟลเดอร์ที่จำเป็น**
```bash
# สร้างโฟลเดอร์สำหรับเก็บไฟล์
mkdir backups
mkdir uploads
mkdir logs
```

## 🚀 การรัน Backend

### **รันในโหมด Development:**
```bash
npm run dev
```

### **รันในโหมด Production:**
```bash
npm start
```

### **รันด้วย Node โดยตรง:**
```bash
node server.js
```

## 🔗 การเข้าถึง

### **Backend API:**
```
http://localhost:3000
```

### **Admin Panel:**
```
http://localhost:3000/admin-panel.html
```

### **เว็บไซต์หลัก:**
```
http://localhost:3000/index.html
```

## 🔐 API Endpoints

### **Authentication:**
- `POST /api/auth/login` - เข้าสู่ระบบ
- `GET /api/auth/me` - ข้อมูลผู้ใช้ปัจจุบัน

### **Dashboard:**
- `GET /api/dashboard` - ข้อมูล Dashboard

### **Trips:**
- `GET /api/trips` - ดึงข้อมูลทริปทั้งหมด
- `POST /api/trips` - เพิ่ม/แก้ไขทริป
- `DELETE /api/trips/:id` - ลบทริป

### **Products:**
- `GET /api/products` - ดึงข้อมูลสินค้าทั้งหมด
- `POST /api/products` - เพิ่ม/แก้ไขสินค้า
- `DELETE /api/products/:id` - ลบสินค้า

### **Articles:**
- `GET /api/articles` - ดึงข้อมูลบทความทั้งหมด
- `POST /api/articles` - เพิ่ม/แก้ไขบทความ
- `DELETE /api/articles/:id` - ลบบทความ

### **Partners:**
- `GET /api/partners` - ดึงข้อมูลผู้ประกอบการทั้งหมด
- `POST /api/partners` - เพิ่ม/แก้ไขผู้ประกอบการ
- `DELETE /api/partners/:id` - ลบผู้ประกอบการ

### **Settings:**
- `GET /api/settings` - ดึงการตั้งค่า
- `POST /api/settings` - อัปเดตการตั้งค่า

### **Backup & Restore:**
- `POST /api/backup` - สร้างไฟล์สำรอง
- `POST /api/restore` - กู้คืนข้อมูล

### **Health Check:**
- `GET /api/health` - ตรวจสอบสถานะ Server

## 🔒 ระบบความปลอดภัย

### **Authentication:**
- JWT Token (expires in 24 hours)
- bcrypt password hashing
- Role-based access control

### **Roles & Permissions:**
- **Admin**: เข้าถึงทุกฟีเจอร์
- **Manager**: จัดการข้อมูลได้
- **Editor**: แก้ไขเนื้อหาได้

### **Security Headers:**
- Helmet.js สำหรับ security headers
- CORS protection
- Request size limiting

## 📁 โครงสร้างไฟล์

```
project/
├── server.js              # Backend server หลัก
├── package.json           # Dependencies
├── admin-panel.html       # Admin Panel
├── admin-panel.css        # Admin Panel styles
├── admin-panel.js         # Admin Panel frontend
├── js/                    # JavaScript files
│   ├── trip-details.js    # ข้อมูลทริป
│   ├── products.js        # ข้อมูลสินค้า
│   ├── articles.js        # ข้อมูลบทความ
│   └── partners.js        # ข้อมูลผู้ประกอบการ
├── backups/               # ไฟล์สำรอง
├── uploads/               # ไฟล์อัปโหลด
└── logs/                  # ไฟล์ log
```

## 🔧 การตั้งค่า

### **Environment Variables:**
```bash
# สร้างไฟล์ .env
PORT=3000
JWT_SECRET=your-secret-key
NODE_ENV=development
```

### **Port Configuration:**
```javascript
// ใน server.js
const PORT = process.env.PORT || 3000;
```

## 📊 การทำงานของระบบ

### **1. การแก้ไขข้อมูล:**
1. ผู้ใช้แก้ไขข้อมูลใน Admin Panel
2. Frontend ส่งข้อมูลไปยัง Backend API
3. Backend ตรวจสอบสิทธิ์และบันทึกข้อมูล
4. Backend อัปเดตไฟล์เว็บไซต์อัตโนมัติ
5. ส่งผลลัพธ์กลับไปยัง Frontend

### **2. การอัปเดตไฟล์:**
- `trip-details.js` - อัปเดตเมื่อแก้ไขทริป
- `products.js` - อัปเดตเมื่อแก้ไขสินค้า
- `articles.js` - อัปเดตเมื่อแก้ไขบทความ
- `partners.js` - อัปเดตเมื่อแก้ไขผู้ประกอบการ
- ไฟล์ HTML - อัปเดตเมื่อแก้ไขการตั้งค่า

### **3. การสำรองข้อมูล:**
- สร้างไฟล์ JSON ในโฟลเดอร์ `backups/`
- เก็บข้อมูลทั้งหมดพร้อม timestamp
- สามารถกู้คืนข้อมูลได้

## 🚨 การแก้ไขปัญหา

### **Port ถูกใช้งาน:**
```bash
# เปลี่ยน port ใน server.js
const PORT = process.env.PORT || 3001;
```

### **Permission Denied:**
```bash
# ให้สิทธิ์การเขียนไฟล์
chmod 755 js/
chmod 755 backups/
```

### **Module Not Found:**
```bash
# ลบ node_modules และติดตั้งใหม่
rm -rf node_modules
npm install
```

## 🔄 การอัปเกรด

### **อัปเดต Dependencies:**
```bash
npm update
npm audit fix
```

### **อัปเดต Backend:**
```bash
git pull origin main
npm install
npm run dev
```

## 📞 การสนับสนุน

หากมีปัญหาหรือต้องการความช่วยเหลือ:
1. ตรวจสอบ Console logs
2. ตรวจสอบ Network requests
3. ตรวจสอบ File permissions
4. ติดต่อทีมพัฒนา

---

**สร้างโดย**: GreenBlueRest Team  
**อัปเดตล่าสุด**: มกราคม 2025  
**เวอร์ชัน**: 1.0.0
