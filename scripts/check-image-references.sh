#!/bin/bash

# 🔍 สคริปต์ตรวจสอบการอ้างอิงรูปภาพ
# ใช้สำหรับตรวจสอบการอ้างอิงรูปภาพในโค้ด HTML, CSS, และ JavaScript

echo "🔍 เริ่มต้นการตรวจสอบการอ้างอิงรูปภาพ..."
echo "======================================"

# ตรวจสอบการอ้างอิงรูปภาพใน HTML
echo "📄 ตรวจสอบการอ้างอิงรูปภาพใน HTML..."

# ตรวจสอบไฟล์ HTML หลัก
html_files=("index.html" "pages/*.html")

for pattern in "${html_files[@]}"; do
    for file in $pattern; do
        if [ -f "$file" ]; then
            echo "📁 ตรวจสอบไฟล์: $file"
            
            # ตรวจสอบการอ้างอิงรูปภาพ .jpg, .png, .jpeg
            old_refs=$(grep -o 'src="[^"]*\.\(jpg\|png\|jpeg\)"' "$file" | wc -l | tr -d ' ')
            if [ $old_refs -gt 0 ]; then
                echo "   ⚠️ พบการอ้างอิงรูปภาพเก่า: $old_refs รายการ"
                grep -o 'src="[^"]*\.\(jpg\|png\|jpeg\)"' "$file" | head -5
                if [ $old_refs -gt 5 ]; then
                    echo "   ... และอีก $(($old_refs - 5)) รายการ"
                fi
            else
                echo "   ✅ ไม่พบการอ้างอิงรูปภาพเก่า"
            fi
            
            # ตรวจสอบการอ้างอิงรูปภาพ .webp
            webp_refs=$(grep -o 'src="[^"]*\.webp"' "$file" | wc -l | tr -d ' ')
            echo "   📊 การอ้างอิงรูปภาพ WebP: $webp_refs รายการ"
        fi
    done
done

# ตรวจสอบการอ้างอิงรูปภาพใน CSS
echo ""
echo "🎨 ตรวจสอบการอ้างอิงรูปภาพใน CSS..."

css_files=("css/*.css")

for pattern in "${css_files[@]}"; do
    for file in $pattern; do
        if [ -f "$file" ]; then
            echo "📁 ตรวจสอบไฟล์: $file"
            
            # ตรวจสอบการอ้างอิงรูปภาพ .jpg, .png, .jpeg
            old_refs=$(grep -o 'url([^)]*\.\(jpg\|png\|jpeg\))' "$file" | wc -l | tr -d ' ')
            if [ $old_refs -gt 0 ]; then
                echo "   ⚠️ พบการอ้างอิงรูปภาพเก่า: $old_refs รายการ"
                grep -o 'url([^)]*\.\(jpg\|png\|jpeg\))' "$file" | head -3
                if [ $old_refs -gt 3 ]; then
                    echo "   ... และอีก $(($old_refs - 3)) รายการ"
                fi
            else
                echo "   ✅ ไม่พบการอ้างอิงรูปภาพเก่า"
            fi
            
            # ตรวจสอบการอ้างอิงรูปภาพ .webp
            webp_refs=$(grep -o 'url([^)]*\.webp)' "$file" | wc -l | tr -d ' ')
            echo "   📊 การอ้างอิงรูปภาพ WebP: $webp_refs รายการ"
        fi
    done
done

# ตรวจสอบการอ้างอิงรูปภาพใน JavaScript
echo ""
echo "⚙️ ตรวจสอบการอ้างอิงรูปภาพใน JavaScript..."

js_files=("js/*.js")

for pattern in "${js_files[@]}"; do
    for file in $pattern; do
        if [ -f "$file" ]; then
            echo "📁 ตรวจสอบไฟล์: $file"
            
            # ตรวจสอบการอ้างอิงรูปภาพ .jpg, .png, .jpeg
            old_refs=$(grep -o '["'"'"'][^"'"'"']*\.\(jpg\|png\|jpeg\)["'"'"']' "$file" | wc -l | tr -d ' ')
            if [ $old_refs -gt 0 ]; then
                echo "   ⚠️ พบการอ้างอิงรูปภาพเก่า: $old_refs รายการ"
                grep -o '["'"'"'][^"'"'"']*\.\(jpg\|png\|jpeg\)["'"'"']' "$file" | head -3
                if [ $old_refs -gt 3 ]; then
                    echo "   ... และอีก $(($old_refs - 3)) รายการ"
                fi
            else
                echo "   ✅ ไม่พบการอ้างอิงรูปภาพเก่า"
            fi
            
            # ตรวจสอบการอ้างอิงรูปภาพ .webp
            webp_refs=$(grep -o '["'"'"'][^"'"'"']*\.webp["'"'"']' "$file" | wc -l | tr -d ' ')
            echo "   📊 การอ้างอิงรูปภาพ WebP: $webp_refs รายการ"
        fi
    done
done

# แสดงสรุป
echo ""
echo "🎉 การตรวจสอบการอ้างอิงรูปภาพเสร็จสิ้น!"
echo "======================================"
echo "📊 สรุปการทำงาน:"
echo "   ✅ ตรวจสอบการอ้างอิงใน HTML"
echo "   ✅ ตรวจสอบการอ้างอิงใน CSS"
echo "   ✅ ตรวจสอบการอ้างอิงใน JavaScript"
echo ""
echo "💡 คำแนะนำ:"
echo "   - หากพบการอ้างอิงรูปภาพเก่า ให้อัปเดตเป็น .webp"
echo "   - ใช้สคริปต์ update-all-to-webp.sh เพื่ออัปเดตอัตโนมัติ"
echo "   - ตรวจสอบการแสดงผลหลังจากอัปเดต"
