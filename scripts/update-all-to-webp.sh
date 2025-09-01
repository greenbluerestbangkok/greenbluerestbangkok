#!/bin/bash

# 🔄 สคริปต์อัปเดตโค้ดทั้งหมดให้ใช้ภาพ .webp
# แทนที่การอ้างอิงภาพ .jpg/.png/.jpeg/.avif ด้วย .webp

echo "🔄 เริ่มต้นการอัปเดตโค้ดทั้งหมดให้ใช้ภาพ .webp..."

# ฟังก์ชันแทนที่การอ้างอิงภาพในไฟล์
update_image_references() {
    local file_path="$1"
    local temp_file="${file_path}.tmp"
    
    # แทนที่การอ้างอิงภาพ .jpg/.jpeg/.png/.avif ด้วย .webp
    
    # แทนที่ src=".../image.jpg" เป็น src=".../image.webp"
    sed 's|src="\([^"]*\)\.\(jpg\|jpeg\|png\|avif\)"|src="\1.webp"|g' "$file_path" > "$temp_file"
    
    # แทนที่ background-image: url(.../image.jpg) เป็น background-image: url(.../image.webp)
    sed 's|url(\([^)]*\)\.\(jpg\|jpeg\|png\|avif\))|url(\1.webp)|g' "$temp_file" > "$file_path"
    
    # แทนที่ onerror="this.src='.../image.jpg'" เป็น onerror="this.src='.../image.webp'"
    sed 's|onerror="this\.src='\''\([^'\'']*\)\.\(jpg\|jpeg\|png\|avif\)'\''|onerror="this.src='\''\1.webp'\''|g' "$file_path" > "$temp_file"
    
    # แทนที่ this.src = '.../image.jpg' เป็น this.src = '.../image.webp'
    sed 's|this\.src = '\''\([^'\'']*\)\.\(jpg\|jpeg\|png\|avif\)'\''|this.src = '\''\1.webp'\''|g' "$temp_file" > "$file_path"
    
    # แทนที่ this.src = ".../image.jpg" เป็น this.src = ".../image.webp"
    sed 's|this\.src = "\([^"]*\)\.\(jpg\|jpeg\|png\|avif\)"|this.src = "\1.webp"|g' "$file_path" > "$temp_file"
    
    # แทนที่ const imageUrl = '.../image.jpg' เป็น const imageUrl = '.../image.webp'
    sed 's|const imageUrl = '\''\([^'\'']*\)\.\(jpg\|jpeg\|png\|avif\)'\''|const imageUrl = '\''\1.webp'\''|g' "$temp_file" > "$file_path"
    
    # แทนที่ const imageUrl = ".../image.jpg" เป็น const imageUrl = ".../image.webp"
    sed 's|const imageUrl = "\([^"]*\)\.\(jpg\|jpeg\|png\|avif\)"|const imageUrl = "\1.webp"|g' "$file_path" > "$temp_file"
    
    # ลบไฟล์ชั่วคราว
    rm "$temp_file"
    
    echo "✅ อัปเดต: $file_path"
}

# อัปเดตไฟล์ HTML
echo "🔄 อัปเดตไฟล์ HTML..."
for html_file in *.html pages/*.html; do
    if [ -f "$html_file" ]; then
        update_image_references "$html_file"
    fi
done

# อัปเดตไฟล์ CSS
echo "🔄 อัปเดตไฟล์ CSS..."
for css_file in css/*.css; do
    if [ -f "$css_file" ]; then
        update_image_references "$css_file"
    fi
done

# อัปเดตไฟล์ JavaScript
echo "🔄 อัปเดตไฟล์ JavaScript..."
for js_file in js/*.js; do
    if [ -f "$js_file" ]; then
        update_image_references "$js_file"
    fi
done

echo ""
echo "🎉 เสร็จสิ้นการอัปเดตโค้ดทั้งหมดให้ใช้ภาพ .webp!"
echo ""
echo "💡 ขั้นตอนต่อไป:"
echo "   1. ตรวจสอบการแสดงผลในเบราว์เซอร์"
echo "   2. ทดสอบ fallback สำหรับเบราว์เซอร์เก่า"
echo "   3. ตรวจสอบประสิทธิภาพการโหลด"
echo "   4. Deploy เว็บไซต์"
