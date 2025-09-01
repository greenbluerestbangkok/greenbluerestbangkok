# คู่มือการย้ายโดเมนจาก Wix ไปยัง GitHub Pages

## 🎯 เป้าหมาย
ย้ายเว็บไซต์จาก Wix (https://www.greenbluerestbangkok.com) ไปยัง GitHub Pages

## 📋 ขั้นตอนการย้าย

### 1. เตรียมการย้ายโดเมน

#### A. ตรวจสอบสถานะโดเมนใน Wix
1. เข้าสู่ Wix Dashboard
2. ไปที่ **Domains** → **Manage Domains**
3. ตรวจสอบว่าโดเมน `greenbluerestbangkok.com` อยู่ในสถานะ "Active"

#### B. ตรวจสอบการล็อคโดเมน
1. ในหน้า Domain Management
2. ตรวจสอบว่าโดเมนไม่ได้ถูก "Locked"
3. หากถูกล็อค ให้ปลดล็อคก่อน

### 2. ย้ายโดเมนออกจาก Wix

#### A. ขอ Transfer Authorization Code
1. ในหน้า Domain Management
2. คลิกที่โดเมน `greenbluerestbangkok.com`
3. เลือก **"Transfer Domain"**
4. ขอ **Authorization Code** (หรือ Transfer Code)
5. รอรับ email ที่มี Authorization Code

#### B. ย้ายโดเมนไปยัง DNS Provider ใหม่
1. ไปยัง DNS provider ที่ต้องการ (แนะนำ: Cloudflare, GoDaddy, Namecheap)
2. เลือก **"Transfer Domain"**
3. ใส่โดเมน `greenbluerestbangkok.com`
4. ใส่ Authorization Code ที่ได้รับจาก Wix
5. ยืนยันการย้าย

### 3. ตั้งค่า DNS Records

#### A. ตั้งค่า A Records สำหรับ GitHub Pages
```
Type: A
Name: @
Value: 185.199.108.153
TTL: 3600

Type: A
Name: @
Value: 185.199.109.153
TTL: 3600

Type: A
Name: @
Value: 185.199.110.153
TTL: 3600

Type: A
Name: @
Value: 185.199.111.153
TTL: 3600
```

#### B. ตั้งค่า CNAME Record สำหรับ www
```
Type: CNAME
Name: www
Value: greenbluerestbangkok.github.io
TTL: 3600
```

### 4. เปิดใช้งาน GitHub Pages

#### A. เปิดใช้งานใน GitHub
1. ไปที่ repository: https://github.com/greenbluerestbangkok/greenbluerestbangkok
2. ไปที่ **Settings** → **Pages**
3. เลือก **Source**: "GitHub Actions"
4. กด **Save**

#### B. ตรวจสอบการทำงาน
1. รอ 5-10 นาทีให้ GitHub Actions ทำงาน
2. ตรวจสอบที่: https://greenbluerestbangkok.github.io
3. ตรวจสอบที่: https://www.greenbluerestbangkok.com

### 5. ตรวจสอบและทดสอบ

#### A. ตรวจสอบ DNS Propagation
```bash
# ตรวจสอบ A records
dig greenbluerestbangkok.com A

# ตรวจสอบ CNAME records
dig www.greenbluerestbangkok.com CNAME

# ตรวจสอบ GitHub Pages
curl -I https://greenbluerestbangkok.github.io
```

#### B. ทดสอบเว็บไซต์
1. เปิด https://www.greenbluerestbangkok.com
2. เปิด https://greenbluerestbangkok.com
3. ทดสอบทุกหน้าและฟีเจอร์
4. ตรวจสอบรูปภาพและ CSS

## ⏱️ เวลาที่ใช้
- **DNS Propagation**: 24-48 ชั่วโมง
- **GitHub Pages Deployment**: 5-10 นาที
- **การย้ายโดเมน**: 5-7 วัน (ขึ้นอยู่กับ DNS provider)

## 🚨 ข้อควรระวัง
1. **อย่าลบโดเมนจาก Wix จนกว่าการย้ายจะเสร็จสิ้น**
2. **ตรวจสอบ Authorization Code ให้ถูกต้อง**
3. **รอให้ DNS propagate ก่อนทดสอบ**
4. **สำรองข้อมูลเว็บไซต์ก่อนย้าย**

## 📞 การสนับสนุน
หากมีปัญหาในการย้ายโดเมน:
- ติดต่อ DNS provider ที่ใช้
- ตรวจสอบ GitHub Pages documentation
- ตรวจสอบ Wix support
