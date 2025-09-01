#!/bin/bash

# 🖼️ สคริปต์จัดการรูปภาพ
# ใช้สำหรับตรวจสอบและจัดการรูปภาพในเว็บไซต์

echo "🖼️ เริ่มต้นการจัดการรูปภาพ..."
echo "======================================"

# ตรวจสอบโฟลเดอร์รูปภาพ
echo "📁 ตรวจสอบโครงสร้างโฟลเดอร์รูปภาพ..."

if [ -d "images" ]; then
    echo "✅ พบโฟลเดอร์ images/"
    echo "   📊 จำนวนไฟล์: $(find images -type f | wc -l | tr -d ' ')"
fi

if [ -d "images/webp" ]; then
    echo "✅ พบโฟลเดอร์ images/webp/"
    echo "   📊 จำนวนไฟล์: $(find images/webp -type f | wc -l | tr -d ' ')"
fi

# ตรวจสอบรูปภาพที่ซ้ำซ้อน
echo ""
echo "🔍 ตรวจสอบรูปภาพที่ซ้ำซ้อน..."

# ตรวจสอบรูปภาพในโฟลเดอร์ operators
if [ -d "images/operators" ] && [ -d "images/webp/operators" ]; then
    echo "📂 ตรวจสอบโฟลเดอร์ operators..."
    
    # นับจำนวนไฟล์ในแต่ละโฟลเดอร์
    old_count=$(find images/operators -type f | wc -l | tr -d ' ')
    new_count=$(find images/webp/operators -type f | wc -l | tr -d ' ')
    
    echo "   📊 รูปภาพเก่า: $old_count ไฟล์"
    echo "   📊 รูปภาพใหม่ (WebP): $new_count ไฟล์"
    
    if [ $old_count -gt 0 ] && [ $new_count -gt 0 ]; then
        echo "   ⚠️ พบรูปภาพทั้งแบบเก่าและใหม่"
        echo "   💡 แนะนำ: ตรวจสอบว่าต้องการลบรูปภาพเก่าหรือไม่"
    fi
fi

# ตรวจสอบรูปภาพในโฟลเดอร์ products
if [ -d "images/products" ] && [ -d "images/webp/products" ]; then
    echo "📂 ตรวจสอบโฟลเดอร์ products..."
    
    old_count=$(find images/products -type f | wc -l | tr -d ' ')
    new_count=$(find images/webp/products -type f | wc -l | tr -d ' ')
    
    echo "   📊 รูปภาพเก่า: $old_count ไฟล์"
    echo "   📊 รูปภาพใหม่ (WebP): $new_count ไฟล์"
fi

# ตรวจสอบรูปภาพในโฟลเดอร์ blog
if [ -d "images/blog" ] && [ -d "images/webp/blog" ]; then
    echo "📂 ตรวจสอบโฟลเดอร์ blog..."
    
    old_count=$(find images/blog -type f | wc -l | tr -d ' ')
    new_count=$(find images/webp/blog -type f | wc -l | tr -d ' ')
    
    echo "   📊 รูปภาพเก่า: $old_count ไฟล์"
    echo "   📊 รูปภาพใหม่ (WebP): $new_count ไฟล์"
fi

# ตรวจสอบรูปภาพในโฟลเดอร์ trips
echo "📂 ตรวจสอบโฟลเดอร์ trips..."
trip_dirs=$(find images -type d -name "trip*" | wc -l | tr -d ' ')
webp_trip_dirs=$(find images/webp -type d -name "trip*" | wc -l | tr -d ' ')

echo "   📊 โฟลเดอร์ trip เก่า: $trip_dirs โฟลเดอร์"
echo "   📊 โฟลเดอร์ trip ใหม่: $webp_trip_dirs โฟลเดอร์"

# แสดงสรุป
echo ""
echo "🎉 การตรวจสอบรูปภาพเสร็จสิ้น!"
echo "======================================"
echo "📊 สรุปการทำงาน:"
echo "   ✅ ตรวจสอบโครงสร้างโฟลเดอร์"
echo "   ✅ ตรวจสอบรูปภาพที่ซ้ำซ้อน"
echo "   ✅ นับจำนวนไฟล์ในแต่ละโฟลเดอร์"
echo ""
echo "💡 คำแนะนำ:"
echo "   - หากต้องการลบรูปภาพเก่า: ./scripts/remove-old-images.sh"
echo "   - หากต้องการแปลงรูปภาพเป็น WebP: ./scripts/convert-to-webp.sh"
echo "   - หากต้องการตรวจสอบการอ้างอิง: ./scripts/check-image-references.sh"
