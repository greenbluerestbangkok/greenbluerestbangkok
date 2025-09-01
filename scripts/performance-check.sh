#!/bin/bash

# ⚡ สคริปต์ตรวจสอบ Performance
# ใช้สำหรับตรวจสอบ Performance ของเว็บไซต์

echo "⚡ เริ่มต้นการตรวจสอบ Performance..."
echo "======================================"

# ตรวจสอบขนาดไฟล์ CSS
echo "🎨 ตรวจสอบขนาดไฟล์ CSS..."

css_files=("css/*.css")
total_css_size=0

for pattern in "${css_files[@]}"; do
    for file in $pattern; do
        if [ -f "$file" ]; then
            size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null)
            size_kb=$((size / 1024))
            echo "   📁 $file: ${size_kb}KB"
            total_css_size=$((total_css_size + size))
        fi
    done
done

total_css_kb=$((total_css_size / 1024))
echo "   📊 ขนาด CSS รวม: ${total_css_kb}KB"

if [ $total_css_kb -gt 500 ]; then
    echo "   ⚠️ ขนาด CSS ใหญ่เกินไป (>500KB) แนะนำให้แยกไฟล์"
else
    echo "   ✅ ขนาด CSS เหมาะสม"
fi

# ตรวจสอบขนาดไฟล์ JavaScript
echo ""
echo "⚙️ ตรวจสอบขนาดไฟล์ JavaScript..."

js_files=("js/*.js")
total_js_size=0

for pattern in "${js_files[@]}"; do
    for file in $pattern; do
        if [ -f "$file" ]; then
            size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null)
            size_kb=$((size / 1024))
            echo "   📁 $file: ${size_kb}KB"
            total_js_size=$((total_js_size + size))
        fi
    done
done

total_js_kb=$((total_js_size / 1024))
echo "   📊 ขนาด JavaScript รวม: ${total_js_kb}KB"

if [ $total_js_kb -gt 300 ]; then
    echo "   ⚠️ ขนาด JavaScript ใหญ่เกินไป (>300KB) แนะนำให้แยกไฟล์"
else
    echo "   ✅ ขนาด JavaScript เหมาะสม"
fi

# ตรวจสอบขนาดไฟล์รูปภาพ
echo ""
echo "🖼️ ตรวจสอบขนาดไฟล์รูปภาพ..."

if [ -d "images/webp" ]; then
    total_image_size=0
    image_count=0
    
    while IFS= read -r -d '' file; do
        size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null)
        total_image_size=$((total_image_size + size))
        image_count=$((image_count + 1))
    done < <(find images/webp -type f -name "*.webp" -print0)
    
    total_image_mb=$((total_image_size / 1024 / 1024))
    echo "   📊 จำนวนรูปภาพ WebP: $image_count ไฟล์"
    echo "   📊 ขนาดรูปภาพรวม: ${total_image_mb}MB"
    
    if [ $total_image_mb -gt 50 ]; then
        echo "   ⚠️ ขนาดรูปภาพใหญ่เกินไป (>50MB) แนะนำให้บีบอัด"
    else
        echo "   ✅ ขนาดรูปภาพ เหมาะสม"
    fi
fi

# ตรวจสอบการอ้างอิง External Libraries
echo ""
echo "📚 ตรวจสอบการอ้างอิง External Libraries..."

# ตรวจสอบการอ้างอิง CDN ใน HTML
cdn_refs=$(grep -r "unpkg\|cdnjs\|jsdelivr\|googleapis" --include="*.html" . | wc -l | tr -d ' ')
echo "   📊 การอ้างอิง CDN: $cdn_refs รายการ"

if [ $cdn_refs -gt 10 ]; then
    echo "   ⚠️ การอ้างอิง CDN มากเกินไป แนะนำให้ลดลง"
else
    echo "   ✅ การอ้างอิง CDN เหมาะสม"
fi

# ตรวจสอบการอ้างอิง Google Fonts
font_refs=$(grep -r "fonts.googleapis.com" --include="*.html" . | wc -l | tr -d ' ')
echo "   📊 การอ้างอิง Google Fonts: $font_refs รายการ"

# ตรวจสอบการอ้างอิง PhotoSwipe
photoswipe_refs=$(grep -r "photoswipe" --include="*.html" . | wc -l | tr -d ' ')
echo "   📊 การอ้างอิง PhotoSwipe: $photoswipe_refs รายการ"

# แสดงสรุป
echo ""
echo "🎉 การตรวจสอบ Performance เสร็จสิ้น!"
echo "======================================"
echo "📊 สรุปการทำงาน:"
echo "   ✅ ตรวจสอบขนาดไฟล์ CSS"
echo "   ✅ ตรวจสอบขนาดไฟล์ JavaScript"
echo "   ✅ ตรวจสอบขนาดไฟล์รูปภาพ"
echo "   ✅ ตรวจสอบการอ้างอิง External Libraries"
echo ""
echo "💡 คำแนะนำสำหรับ Performance:"
echo "   - ใช้ CSS และ JavaScript minification"
echo "   - ใช้รูปภาพ WebP และบีบอัด"
echo "   - ลดการอ้างอิง External Libraries"
echo "   - ใช้ lazy loading สำหรับรูปภาพ"
echo "   - ใช้ browser caching"
