#!/bin/bash

# 🖼️ สคริปต์เปลี่ยนนามสกุลไฟล์ภาพทั้งหมดเป็น .webp แบบง่าย
# เปลี่ยนไฟล์ .jpg, .jpeg, .png เป็น .webp โดยไม่ลบไฟล์ต้นฉบับ

echo "🔄 เริ่มต้นการเปลี่ยนนามสกุลไฟล์ภาพเป็น .webp แบบง่าย..."

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
    
    # เปลี่ยนนามสกุลไฟล์
    if mv "$file_path" "$new_path" 2>/dev/null; then
        echo "✅ $filename → $new_filename"
    else
        echo "❌ ไม่สามารถเปลี่ยนนามสกุล: $filename"
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
echo ""
echo "📊 สรุปผลลัพธ์:"
echo "   - ไฟล์ .webp ทั้งหมด: $(find images -name "*.webp" | wc -l | tr -d ' ') ไฟล์"
echo "   - ไฟล์ .jpg/.png/.jpeg ที่เหลือ: $(find images -name "*.jpg" -o -name "*.png" -o -name "*.jpeg" | wc -l | tr -d ' ') ไฟล์"
echo ""
echo "💡 ขั้นตอนต่อไป:"
echo "   1. ตรวจสอบไฟล์ที่เปลี่ยนนามสกุลแล้ว"
echo "   2. อัปเดตโค้ดให้ใช้ .webp"
echo "   3. ทดสอบการแสดงผล"
