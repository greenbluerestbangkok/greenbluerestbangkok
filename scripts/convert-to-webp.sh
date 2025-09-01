#!/bin/bash

# 🖼️ สคริปต์แปลงภาพโปรเจคเป็น .webp
# ใช้ ImageMagick เพื่อแปลงภาพทั้งหมดเป็น .webp

echo "🔄 เริ่มต้นการแปลงภาพเป็น .webp..."

# สร้างโฟลเดอร์สำหรับเก็บภาพ .webp
mkdir -p images/webp

# ฟังก์ชันแปลงภาพเป็น .webp
convert_to_webp() {
    local input_file="$1"
    local output_dir="$2"
    
    # สร้างชื่อไฟล์ .webp
    local filename=$(basename "$input_file")
    local name_without_ext="${filename%.*}"
    local webp_file="$output_dir/${name_without_ext}.webp"
    
    # แปลงภาพเป็น .webp ด้วยคุณภาพ 85%
    if convert "$input_file" -quality 85 "$webp_file" 2>/dev/null; then
        echo "✅ แปลงสำเร็จ: $filename → ${name_without_ext}.webp"
        
        # แสดงขนาดไฟล์
        local original_size=$(stat -f%z "$input_file" 2>/dev/null || stat -c%s "$input_file" 2>/dev/null)
        local webp_size=$(stat -f%z "$webp_file" 2>/dev/null || stat -c%s "$webp_file" 2>/dev/null)
        
        if [ -n "$original_size" ] && [ -n "$webp_size" ]; then
            local savings=$((100 - (webp_size * 100 / original_size)))
            echo "   📊 ขนาด: ${original_size} bytes → ${webp_size} bytes (ประหยัด ${savings}%)"
        fi
    else
        echo "❌ แปลงไม่สำเร็จ: $filename"
    fi
}

# แปลงภาพในโฟลเดอร์ operators
echo "🔄 แปลงภาพในโฟลเดอร์ operators..."
mkdir -p images/webp/operators
for file in images/operators/*.{jpg,jpeg,png}; do
    if [ -f "$file" ]; then
        convert_to_webp "$file" "images/webp/operators"
    fi
done

# แปลงภาพในโฟลเดอร์ products
echo "🔄 แปลงภาพในโฟลเดอร์ products..."
mkdir -p images/webp/products
for file in images/products/*.{jpg,jpeg,png}; do
    if [ -f "$file" ]; then
        convert_to_webp "$file" "images/webp/products"
    fi
done

# แปลงภาพในโฟลเดอร์ blog
echo "🔄 แปลงภาพในโฟลเดอร์ blog..."
mkdir -p images/webp/blog
for file in images/blog/*.{jpg,jpeg,png}; do
    if [ -f "$file" ]; then
        convert_to_webp "$file" "images/webp/blog"
    fi
done

# แปลงภาพในโฟลเดอร์ trips
echo "🔄 แปลงภาพในโฟลเดอร์ trips..."
mkdir -p images/webp/trips
for file in images/trip*/*.{jpg,jpeg,png}; do
    if [ -f "$file" ]; then
        convert_to_webp "$file" "images/webp/trips"
    fi
done

# แปลงภาพในโฟลเดอร์ vlog
echo "🔄 แปลงภาพในโฟลเดอร์ vlog..."
mkdir -p images/webp/vlog
for file in images/vlog/*.{jpg,jpeg,png}; do
    if [ -f "$file" ]; then
        convert_to_webp "$file" "images/webp/vlog"
    fi
done

# แปลงภาพในโฟลเดอร์ cover
echo "🔄 แปลงภาพในโฟลเดอร์ cover..."
mkdir -p images/webp/cover
for file in images/cover/*.{jpg,jpeg,png}; do
    if [ -f "$file" ]; then
        convert_to_webp "$file" "images/webp/cover"
    fi
done

# แปลงภาพอื่นๆ
echo "🔄 แปลงภาพอื่นๆ..."
for file in images/*.{jpg,jpeg,png}; do
    if [ -f "$file" ] && [ "$(dirname "$file")" = "images" ]; then
        convert_to_webp "$file" "images/webp"
    fi
done

echo ""
echo "🎉 เสร็จสิ้นการแปลงภาพเป็น .webp!"
echo "📁 ภาพ .webp ถูกเก็บไว้ใน: images/webp/"
echo ""
echo "📊 สรุปผลลัพธ์:"
echo "   - ภาพต้นฉบับ: $(find images -name "*.jpg" -o -name "*.png" -o -name "*.jpeg" | wc -l | tr -d ' ') ไฟล์"
echo "   - ภาพ .webp: $(find images/webp -name "*.webp" | wc -l | tr -d ' ') ไฟล์"
echo ""
echo "💡 ขั้นตอนต่อไป:"
echo "   1. ตรวจสอบคุณภาพภาพ .webp"
echo "   2. อัปเดตโค้ด HTML/CSS ให้ใช้ .webp"
echo "   3. เพิ่ม fallback สำหรับเบราว์เซอร์เก่า"
echo "   4. ทดสอบการแสดงผล"
