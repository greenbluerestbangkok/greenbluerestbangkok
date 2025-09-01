#!/bin/bash

# 🖼️ สคริปต์แปลงภาพโปรเจคเป็น .webp แบบ Batch
# ใช้ ImageMagick และ find/xargs เพื่อประสิทธิภาพสูงสุด

echo "🔄 เริ่มต้นการแปลงภาพเป็น .webp แบบ Batch..."

# สร้างโฟลเดอร์หลักสำหรับ .webp
mkdir -p images/webp

# ฟังก์ชันแปลงภาพเป็น .webp
convert_to_webp() {
    local input_file="$1"
    
    # สร้างโฟลเดอร์ปลายทาง
    local relative_path=$(dirname "$input_file" | sed 's|^images/||')
    local output_dir="images/webp/$relative_path"
    mkdir -p "$output_dir"
    
    # สร้างชื่อไฟล์ .webp
    local filename=$(basename "$input_file")
    local name_without_ext="${filename%.*}"
    local webp_file="$output_dir/${name_without_ext}.webp"
    
    # แปลงภาพเป็น .webp ด้วยคุณภาพ 85%
    if convert "$input_file" -quality 85 "$webp_file" 2>/dev/null; then
        echo "✅ $filename → ${name_without_ext}.webp"
        
        # แสดงขนาดไฟล์
        local original_size=$(stat -f%z "$input_file" 2>/dev/null || stat -c%s "$input_file" 2>/dev/null)
        local webp_size=$(stat -f%z "$webp_file" 2>/dev/null || stat -c%s "$webp_file" 2>/dev/null)
        
        if [ -n "$original_size" ] && [ -n "$webp_size" ]; then
            local savings=$((100 - (webp_size * 100 / original_size)))
            echo "   📊 ${original_size} → ${webp_size} bytes (ประหยัด ${savings}%)"
        fi
    else
        echo "❌ $filename - แปลงไม่สำเร็จ"
    fi
}

export -f convert_to_webp

echo "🔄 แปลงภาพทั้งหมดในโปรเจค..."

# ใช้ find และ xargs เพื่อแปลงภาพทั้งหมด
find images -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" \) -print0 | \
xargs -0 -I {} bash -c 'convert_to_webp "$@"' _ {}

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
