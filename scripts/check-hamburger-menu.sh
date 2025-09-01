#!/bin/bash

# 🍔 สคริปต์ตรวจสอบ Hamburger Menu
# ใช้สำหรับตรวจสอบ hamburger menu ในทุกหน้า

echo "🍔 เริ่มต้นการตรวจสอบ Hamburger Menu..."
echo "======================================"

# ตรวจสอบการโหลด main.js ในทุกหน้า
echo "📄 ตรวจสอบการโหลด main.js ในทุกหน้า..."

html_files=("index.html" "pages/*.html")

for pattern in "${html_files[@]}"; do
    for file in $pattern; do
        if [ -f "$file" ]; then
            echo "📁 ตรวจสอบไฟล์: $file"
            
            # ตรวจสอบการโหลด main.js
            main_js_refs=$(grep -c "main\.js" "$file" 2>/dev/null || echo "0")
            if [ $main_js_refs -gt 0 ]; then
                echo "   ✅ พบการโหลด main.js: $main_js_refs รายการ"
            else
                echo "   ❌ ไม่พบการโหลด main.js"
            fi
            
            # ตรวจสอบการโหลด hamburger-animation.css
            hamburger_css_refs=$(grep -c "hamburger-animation\.css" "$file" 2>/dev/null || echo "0")
            if [ $hamburger_css_refs -gt 0 ]; then
                echo "   ✅ พบการโหลด hamburger-animation.css: $hamburger_css_refs รายการ"
            else
                echo "   ❌ ไม่พบการโหลด hamburger-animation.css"
            fi
            
            # ตรวจสอบโครงสร้าง hamburger menu
            hamburger_structure=$(grep -c "class=\"hamburger\"" "$file" 2>/dev/null || echo "0")
            if [ $hamburger_structure -gt 0 ]; then
                echo "   ✅ พบโครงสร้าง hamburger menu: $hamburger_structure รายการ"
            else
                echo "   ❌ ไม่พบโครงสร้าง hamburger menu"
            fi
        fi
    done
done

# ตรวจสอบไฟล์ CSS ที่เกี่ยวข้อง
echo ""
echo "🎨 ตรวจสอบไฟล์ CSS ที่เกี่ยวข้อง..."

css_files=("css/hamburger-animation.css" "css/style.css" "css/layout-fixes.css")

for file in "${css_files[@]}"; do
    if [ -f "$file" ]; then
        echo "📁 ตรวจสอบไฟล์: $file"
        
        # ตรวจสอบ CSS rules สำหรับ hamburger
        hamburger_rules=$(grep -c "\.hamburger" "$file" 2>/dev/null || echo "0")
        echo "   📊 CSS rules สำหรับ hamburger: $hamburger_rules รายการ"
        
        # ตรวจสอบ responsive rules
        responsive_rules=$(grep -c "@media.*768px" "$file" 2>/dev/null || echo "0")
        echo "   📊 Responsive rules (768px): $responsive_rules รายการ"
        
        # ตรวจสอบ animation rules
        animation_rules=$(grep -c "\.active" "$file" 2>/dev/null || echo "0")
        echo "   📊 Animation rules (.active): $animation_rules รายการ"
    else
        echo "   ❌ ไม่พบไฟล์: $file"
    fi
done

# ตรวจสอบไฟล์ JavaScript
echo ""
echo "⚙️ ตรวจสอบไฟล์ JavaScript..."

if [ -f "js/main.js" ]; then
    echo "📁 ตรวจสอบไฟล์: js/main.js"
    
    # ตรวจสอบ hamburger functionality
    hamburger_js=$(grep -c "hamburger" "js/main.js" 2>/dev/null || echo "0")
    echo "   📊 Hamburger functionality: $hamburger_js รายการ"
    
    # ตรวจสอบ event listeners
    event_listeners=$(grep -c "addEventListener" "js/main.js" 2>/dev/null || echo "0")
    echo "   📊 Event listeners: $event_listeners รายการ"
    
    # ตรวจสอบ DOMContentLoaded
    dom_loaded=$(grep -c "DOMContentLoaded" "js/main.js" 2>/dev/null || echo "0")
    echo "   📊 DOMContentLoaded: $dom_loaded รายการ"
else
    echo "   ❌ ไม่พบไฟล์: js/main.js"
fi

# แสดงสรุป
echo ""
echo "🎉 การตรวจสอบ Hamburger Menu เสร็จสิ้น!"
echo "======================================"
echo "📊 สรุปการทำงาน:"
echo "   ✅ ตรวจสอบการโหลด main.js ในทุกหน้า"
echo "   ✅ ตรวจสอบการโหลด hamburger-animation.css"
echo "   ✅ ตรวจสอบโครงสร้าง hamburger menu"
echo "   ✅ ตรวจสอบไฟล์ CSS ที่เกี่ยวข้อง"
echo "   ✅ ตรวจสอบไฟล์ JavaScript"
echo ""
echo "💡 คำแนะนำ:"
echo "   - หากไม่พบการโหลด main.js ให้เพิ่ม <script src=\"../js/main.js\"></script>"
echo "   - หากไม่พบการโหลด hamburger-animation.css ให้เพิ่ม <link rel=\"stylesheet\" href=\"../css/hamburger-animation.css\">"
echo "   - ตรวจสอบการทำงานของ hamburger menu บนมือถือ"
echo "   - ตรวจสอบ z-index ของ hamburger menu"
