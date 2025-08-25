# 🚀 GitHub Actions Deployment Guide

## การตั้งค่า GitHub Actions และ Secrets สำหรับ Green Blue Rest Bangkok

### 📋 ภาพรวม

ไฟล์นี้จะแนะนำวิธีการตั้งค่า GitHub Actions สำหรับการ Deploy เว็บไซต์อัตโนมัติและการจัดการ Secrets

## 🔧 ไฟล์ Workflow ที่สร้าง

### 1. `.github/workflows/deploy.yml`
- **วัตถุประสงค์**: Deploy เว็บไซต์ไปยัง GitHub Pages อัตโนมัติ
- **เมื่อไหร่ทำงาน**: เมื่อ push หรือ pull request ไปยัง branch `main`
- **การทำงาน**:
  - Copy `main.html` เป็น `index.html`
  - ตรวจสอบลิงก์ assets ทั้งหมด
  - Deploy ไปยัง GitHub Pages

### 2. `.github/workflows/secrets-setup.yml`
- **วัตถุประสงค์**: แนะนำและทดสอบการใช้ Secrets
- **เมื่อไหร่ทำงาน**: เรียกใช้ Manual เท่านั้น
- **การทำงาน**:
  - แสดงสถานะของ Secrets ที่ตั้งค่า
  - แทนที่ค่าในไฟล์ HTML ด้วยค่าจาก Secrets

## 🔐 การตั้งค่า Secrets

### ขั้นตอนการตั้งค่า Secrets

1. **เข้าไปที่ Repository Settings**
   ```
   Repository → Settings → Secrets and variables → Actions
   ```

2. **คลิก "New repository secret"**

3. **เพิ่ม Secrets ต่อไปนี้**:

#### Secrets หลัก (แนะนำ)
```
Name: SITE_NAME
Value: Green Blue Rest Bangkok

Name: CONTACT_EMAIL  
Value: contact@greenbluerestbangkok.com

Name: GOOGLE_ANALYTICS_ID
Value: G-XXXXXXXXXX (ถ้ามี)
```

#### Secrets เสริม (สำหรับ Custom Deployment)
```
Name: FTP_HOST
Value: your-hosting-server.com

Name: FTP_USERNAME
Value: your-ftp-username

Name: FTP_PASSWORD
Value: your-secure-password

Name: DOMAIN_NAME
Value: www.greenbluerestbangkok.com
```

## 🚀 วิธีการ Deploy

### อัตโนมัติ (แนะนำ)
1. Push code ไปยัง branch `main`
2. GitHub Actions จะทำงานอัตโนมัติ
3. เว็บไซต์จะถูก deploy ไปยัง GitHub Pages

### Manual
1. ไปที่ Actions tab ใน Repository
2. เลือก "Deploy to GitHub Pages" workflow
3. คลิก "Run workflow"

## 📱 การตั้งค่า GitHub Pages

1. **เข้าไปที่ Repository Settings**
   ```
   Repository → Settings → Pages
   ```

2. **ตั้งค่า Source**
   - Source: Deploy from a branch
   - Branch: `gh-pages` (จะถูกสร้างอัตโนมัติ)
   - Folder: `/ (root)`

3. **Custom Domain (ถ้าต้องการ)**
   - ใส่ domain name ที่ต้องการ
   - ตรวจสอบให้แน่ใจว่า DNS ชี้มาที่ GitHub Pages

## 🔍 การตรวจสอบการทำงาน

### ตรวจสอบ Workflow
1. ไปที่ Actions tab
2. ดู status ของ workflow ล่าสุด
3. คลิกเข้าไปดู logs ถ้ามีปัญหา

### ตรวจสอบ Deployment
1. ไปที่ Settings → Pages
2. ดู URL ของเว็บไซต์ที่ deploy แล้ว
3. เข้าไปตรวจสอบเว็บไซต์

## 🛠️ การแก้ไขปัญหา

### ปัญหาทั่วไป

#### 1. Workflow ล้มเหลว
```bash
# ตรวจสอบ logs ใน Actions tab
# ดูข้อผิดพลาดและแก้ไขตามคำแนะนำ
```

#### 2. เว็บไซต์ไม่แสดงผล
```bash
# ตรวจสอบว่า main.html ถูก copy เป็น index.html หรือไม่
# ตรวจสอบ path ของ CSS และ JS files
```

#### 3. Secrets ไม่ทำงาน
```bash
# ตรวจสอบชื่อ Secret ให้ตรงกับใน workflow
# ตรวจสอบค่าใน Secret ให้ถูกต้อง
```

## 📊 การติดตาม Performance

### GitHub Actions Usage
- ตรวจสอบ usage ใน Settings → Billing
- Free tier มี 2000 minutes/month

### Pages Analytics
- ใช้ Google Analytics (ถ้าตั้งค่า GOOGLE_ANALYTICS_ID)
- ดู traffic ใน Repository Insights

## 🔄 การอัพเดต Workflow

### แก้ไข Deploy Workflow
1. แก้ไขไฟล์ `.github/workflows/deploy.yml`
2. Push การเปลี่ยนแปลง
3. Workflow จะใช้การตั้งค่าใหม่ในการรันครั้งต่อไป

### เพิ่ม Steps ใหม่
```yaml
- name: Custom Step
  run: |
    echo "Add your custom commands here"
    # เพิ่มคำสั่งที่ต้องการ
```

## 📞 ขอความช่วยเหลือ

หากมีปัญหาในการตั้งค่า:
1. ดู logs ใน Actions tab
2. ตรวจสอบ GitHub Pages documentation
3. ติดต่อ support ผ่าน issues ใน repository

---

**© 2025 Green Blue Rest Bangkok. สร้างด้วย GitHub Actions**