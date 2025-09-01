#!/bin/bash

# 🖼️ สคริปต์เปลี่ยนนามสกุลไฟล์ภาพทั้งหมดเป็น .webp
# เปลี่ยนไฟล์ .jpg, .jpeg, .png เป็น .webp ในโฟลเดอร์ images

echo "🔄 เริ่มต้นการเปลี่ยนนามสกุลไฟล์ภาพเป็น .webp..."

# สร้างโฟลเดอร์สำรองข้อมูล
backup_dir="images_backup_$(date +%Y%m%d_%H%M%S)"
echo "📁 สร้างโฟลเดอร์สำรองข้อมูล: $backup_dir"
mkdir -p "$backup_dir"

# สำรองข้อมูลทั้งหมด
echo "💾 สำรองข้อมูลทั้งหมด..."
cp -r images "$backup_dir/"

# ฟังก์ชันเปลี่ยนนามสกุลไฟล์
rename_to_webp() {
    local file_path="$1"
    local dir_path=$(dirname "$file_path")
    local filename=$(basename "$file_path")
    local name_without_ext="${filename%.*}"
    local extension="${filename##*.}"
    
    # เปลี่ยนนามสกุลเป็น .webp
    local new_filename="${name_without_ext}.webp"
    local new_path="$dir_path/$new_filename"
    
    # ตรวจสอบว่าไฟล์ .webp มีอยู่แล้วหรือไม่
    if [ -f "$new_path" ]; then
        echo "✅ $filename → $new_filename (มีไฟล์ .webp อยู่แล้ว)"
        # ลบไฟล์เก่า
        rm "$file_path"
        echo "   🗑️ ลบไฟล์เก่า: $filename"
    else
        echo "❌ $filename → ไม่มีไฟล์ .webp ที่ตรงกัน"
        echo "   💡 ต้องแปลงไฟล์เป็น .webp ก่อน"
    fi
}

# เปลี่ยนนามสกุลไฟล์ทั้งหมด
echo "🔄 เปลี่ยนนามสกุลไฟล์ภาพทั้งหมด..."

# เปลี่ยนไฟล์ในโฟลเดอร์ operators
echo "📁 โฟลเดอร์ operators..."
for file in images/operators/*.{jpg,jpeg,png}; do
    if [ -f "$file" ]; then
        rename_to_webp "$file"
    fi
done

# เปลี่ยนไฟล์ในโฟลเดอร์ products
echo "📁 โฟลเดอร์ products..."
for file in images/products/*.{jpg,jpeg,png}; do
    if [ -f "$file" ]; then
        rename_to_webp "$file"
    fi
done

# เปลี่ยนไฟล์ในโฟลเดอร์ blog
echo "📁 โฟลเดอร์ blog..."
for file in images/blog/*.{jpg,jpeg,png}; do
    if [ -f "$file" ]; then
        rename_to_webp "$file"
    fi
done

# เปลี่ยนไฟล์ในโฟลเดอร์ trips
echo "📁 โฟลเดอร์ trips..."
for file in images/trip*/*.{jpg,jpeg,png}; do
    if [ -f "$file" ]; then
        rename_to_webp "$file"
    fi
done

# เปลี่ยนไฟล์ในโฟลเดอร์ vlog
echo "📁 โฟลเดอร์ vlog..."
for file in images/vlog/*.{jpg,jpeg,png}; do
    if [ -f "$file" ]; then
        rename_to_webp "$file"
    fi
done

# เปลี่ยนไฟล์ในโฟลเดอร์ cover
echo "📁 โฟลเดอร์ cover..."
for file in images/cover/*.{jpg,jpeg,png}; do
    if [ -f "$file" ]; then
        rename_to_webp "$file"
    fi
done

# เปลี่ยนไฟล์อื่นๆ
echo "📁 ไฟล์อื่นๆ..."
for file in images/*.{jpg,jpeg,png}; do
    if [ -f "$file" ] && [ "$(dirname "$file")" = "images" ]; then
        rename_to_webp "$file"
    fi
done

echo ""
echo "🎉 เสร็จสิ้นการเปลี่ยนนามสกุลไฟล์!"
echo "📁 โฟลเดอร์สำรองข้อมูล: $backup_dir"
echo ""
echo "📊 สรุปผลลัพธ์:"
echo "   - ไฟล์ที่เปลี่ยนนามสกุล: $(find images -name "*.webp" | wc -l | tr -d ' ') ไฟล์"
echo "   - ไฟล์ที่เหลือ: $(find images -name "*.jpg" -o -name "*.png" -o -name "*.jpeg" | wc -l | tr -d ' ') ไฟล์"
echo ""
echo "💡 ขั้นตอนต่อไป:"
echo "   1. ตรวจสอบไฟล์ที่เปลี่ยนนามสกุลแล้ว"
echo "   2. อัปเดตโค้ดให้ใช้ .webp"
echo "   3. ทดสอบการแสดงผล"
echo "   4. หากมีปัญหา สามารถกู้คืนจากโฟลเดอร์สำรองได้"
