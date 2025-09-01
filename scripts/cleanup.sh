#!/bin/bash

# 🧹 สคริปต์ Cleanup อัตโนมัติ
# ใช้สำหรับลบไฟล์ที่ไม่จำเป็นและจัดระเบียบเว็บไซต์

echo "🧹 เริ่มต้นการ Cleanup เว็บไซต์..."
echo "======================================"

# ลบไฟล์ .DS_Store
echo "🗑️ ลบไฟล์ .DS_Store..."
find . -name ".DS_Store" -delete
echo "✅ ลบไฟล์ .DS_Store เสร็จสิ้น"

# ลบโฟลเดอร์ backup เก่า
echo "🗑️ ลบโฟลเดอร์ backup เก่า..."
rm -rf images_backup_*
echo "✅ ลบโฟลเดอร์ backup เก่าเสร็จสิ้น"

# ลบไฟล์ที่ซ้ำซ้อน
echo "🗑️ ตรวจสอบไฟล์ที่ซ้ำซ้อน..."
if [ -f "main.html" ]; then
    echo "⚠️ พบไฟล์ main.html ที่ซ้ำซ้อนกับ index.html"
    rm main.html
    echo "✅ ลบไฟล์ main.html เสร็จสิ้น"
fi

# ลบไฟล์ log และ cache
echo "🗑️ ลบไฟล์ log และ cache..."
find . -name "*.log" -delete
find . -name "*.cache" -delete
find . -name "*.tmp" -delete
echo "✅ ลบไฟล์ log และ cache เสร็จสิ้น"

# ตรวจสอบไฟล์รูปภาพที่ซ้ำซ้อน
echo "🔍 ตรวจสอบไฟล์รูปภาพที่ซ้ำซ้อน..."
if [ -d "images" ] && [ -d "images/webp" ]; then
    echo "📁 พบโฟลเดอร์รูปภาพทั้งแบบเก่าและใหม่"
    echo "💡 แนะนำ: ตรวจสอบว่าต้องการลบรูปภาพเก่าหรือไม่"
fi

# แสดงสรุป
echo ""
echo "🎉 การ Cleanup เสร็จสิ้น!"
echo "======================================"
echo "📊 สรุปการทำงาน:"
echo "   ✅ ลบไฟล์ .DS_Store"
echo "   ✅ ลบโฟลเดอร์ backup เก่า"
echo "   ✅ ลบไฟล์ที่ซ้ำซ้อน"
echo "   ✅ ลบไฟล์ log และ cache"
echo ""
echo "💡 คำแนะนำเพิ่มเติม:"
echo "   - ตรวจสอบไฟล์รูปภาพที่ซ้ำซ้อน"
echo "   - ตรวจสอบ CSS ที่ไม่ได้ใช้"
echo "   - ตรวจสอบ JavaScript ที่ไม่ได้ใช้"
echo ""
echo "🔧 สำหรับการ Cleanup แบบละเอียด:"
echo "   ./scripts/cleanup-advanced.sh"
