#!/bin/bash

# 🚀 Admin Panel Deployment Script
# สคริปต์สำหรับ deploy ระบบ Admin Panel

set -e  # หยุดทำงานเมื่อมี error

echo "🚀 เริ่มต้นการ Deploy ระบบ Admin Panel..."

# สีสำหรับ output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# ฟังก์ชันแสดงข้อความ
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# ตรวจสอบว่าอยู่ใน directory ที่ถูกต้อง
if [ ! -f "package.json" ]; then
    print_error "ไม่พบไฟล์ package.json กรุณารันสคริปต์นี้ใน admin directory"
    exit 1
fi

print_status "ตรวจสอบการเตรียมความพร้อม..."

# ตรวจสอบ Node.js
if ! command -v node &> /dev/null; then
    print_error "ไม่พบ Node.js กรุณาติดตั้ง Node.js ก่อน"
    exit 1
fi

# ตรวจสอบ npm
if ! command -v npm &> /dev/null; then
    print_error "ไม่พบ npm กรุณาติดตั้ง npm ก่อน"
    exit 1
fi

print_success "Node.js และ npm พร้อมใช้งาน"

# ตรวจสอบไฟล์ .env.local
if [ ! -f ".env.local" ]; then
    print_warning "ไม่พบไฟล์ .env.local"
    if [ -f ".env.example" ]; then
        print_status "คัดลอก .env.example เป็น .env.local"
        cp .env.example .env.local
        print_warning "กรุณาแก้ไขไฟล์ .env.local ให้ถูกต้องก่อน deploy"
        exit 1
    else
        print_error "ไม่พบไฟล์ .env.example"
        exit 1
    fi
fi

print_success "พบไฟล์ .env.local"

# ตรวจสอบ environment variables สำคัญ
print_status "ตรวจสอบ Environment Variables..."

if ! grep -q "GITHUB_TOKEN=" .env.local; then
    print_error "ไม่พบ GITHUB_TOKEN ใน .env.local"
    exit 1
fi

if ! grep -q "ADMIN_EMAIL=" .env.local; then
    print_error "ไม่พบ ADMIN_EMAIL ใน .env.local"
    exit 1
fi

if ! grep -q "JWT_SECRET=" .env.local; then
    print_error "ไม่พบ JWT_SECRET ใน .env.local"
    exit 1
fi

print_success "Environment Variables ครบถ้วน"

# ติดตั้ง dependencies
print_status "ติดตั้ง dependencies..."
npm install
print_success "ติดตั้ง dependencies สำเร็จ"

# รัน linting
print_status "ตรวจสอบ code quality..."
if npm run lint 2>/dev/null; then
    print_success "Linting ผ่าน"
else
    print_warning "มี linting issues แต่จะดำเนินการต่อ"
fi

# Build ระบบ
print_status "Build ระบบ..."
if npm run build; then
    print_success "Build สำเร็จ"
else
    print_error "Build ล้มเหลว"
    exit 1
fi

# ตรวจสอบ Vercel CLI
print_status "ตรวจสอบ Vercel CLI..."
if command -v vercel &> /dev/null; then
    print_success "พบ Vercel CLI"
    
    # ตรวจสอบการ login
    if vercel whoami &> /dev/null; then
        print_success "Login Vercel แล้ว"
        
        # Deploy
        print_status "เริ่ม Deploy..."
        if vercel --prod; then
            print_success "Deploy สำเร็จ!"
            print_status "ระบบพร้อมใช้งานที่: https://your-project.vercel.app/admin"
        else
            print_error "Deploy ล้มเหลว"
            exit 1
        fi
    else
        print_warning "ยังไม่ได้ login Vercel"
        print_status "กรุณารัน: vercel login"
        exit 1
    fi
else
    print_warning "ไม่พบ Vercel CLI"
    print_status "ติดตั้งด้วย: npm i -g vercel"
    print_status "หรือใช้วิธีอื่นในการ deploy"
fi

# ตรวจสอบ Git
print_status "ตรวจสอบ Git status..."
if command -v git &> /dev/null; then
    if git status --porcelain | grep -q .; then
        print_warning "มีไฟล์ที่ยังไม่ได้ commit"
        print_status "กรุณา commit การเปลี่ยนแปลง:"
        echo "  git add ."
        echo "  git commit -m 'Deploy admin panel'"
        echo "  git push origin main"
    else
        print_success "Git repository สะอาด"
    fi
else
    print_warning "ไม่พบ Git"
fi

print_success "🎉 การเตรียม Deploy เสร็จสิ้น!"
print_status "📋 ขั้นตอนต่อไป:"
echo "  1. ตรวจสอบ Environment Variables ใน hosting platform"
echo "  2. ทดสอบการเข้าสู่ระบบ"
echo "  3. ทดสอบ API endpoints"
echo "  4. ทดสอบการอัปโหลดไฟล์"

print_status "📖 ดูคู่มือเพิ่มเติม:"
echo "  - QUICK_DEPLOY_GUIDE.md (คู่มือสั้น)"
echo "  - PRODUCTION_DEPLOYMENT_GUIDE.md (คู่มือละเอียด)"
