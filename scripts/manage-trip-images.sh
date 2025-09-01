#!/bin/bash

# 🎒 สคริปต์จัดการภาพทริปท่องเที่ยว
# ใช้สำหรับเพิ่ม แก้ไข และลบภาพในทริปท่องเที่ยว

echo "🎒 สคริปต์จัดการภาพทริปท่องเที่ยว"
echo "=================================="

# ฟังก์ชันแสดงเมนู
show_menu() {
    echo ""
    echo "📋 เมนูการทำงาน:"
    echo "1. 📁 สร้างโครงสร้างโฟลเดอร์ทริปใหม่"
    echo "2. 🖼️  เพิ่มภาพในทริป"
    echo "3. 🔄 แปลงภาพเป็น WebP"
    echo "4. 📊 แสดงสถานะภาพทริป"
    echo "5. 🗑️  ลบภาพทริป"
    echo "6. ❌ ออกจากโปรแกรม"
    echo ""
    read -p "เลือกหมายเลข (1-6): " choice
}

# ฟังก์ชันสร้างโครงสร้างโฟลเดอร์
create_trip_structure() {
    echo ""
    read -p "📁 ใส่หมายเลขทริป (1-18): " trip_number
    
    if [[ $trip_number -ge 1 && $trip_number -le 18 ]]; then
        echo "🔄 สร้างโครงสร้างโฟลเดอร์สำหรับทริปที่ $trip_number..."
        
        mkdir -p "images/webp/trip$trip_number/small"
        mkdir -p "images/webp/trip$trip_number/large"
        
        # สร้างไฟล์ภาพตัวอย่าง
        cp images/webp/logo_001.webp "images/webp/trip$trip_number/small/placeholder.webp"
        cp images/webp/logo_001.webp "images/webp/trip$trip_number/large/placeholder.webp"
        cp images/webp/logo_001.webp "images/webp/trip$trip_number/large/image1.webp"
        cp images/webp/logo_001.webp "images/webp/trip$trip_number/large/image2.webp"
        cp images/webp/logo_001.webp "images/webp/trip$trip_number/large/image3.webp"
        
        echo "✅ สร้างโครงสร้างโฟลเดอร์ทริปที่ $trip_number เรียบร้อยแล้ว"
    else
        echo "❌ หมายเลขทริปไม่ถูกต้อง กรุณาใส่ 1-18"
    fi
}

# ฟังก์ชันเพิ่มภาพในทริป
add_trip_image() {
    echo ""
    read -p "🖼️  ใส่หมายเลขทริป (1-18): " trip_number
    read -p "📁 ใส่ประเภทภาพ (small/large): " image_type
    read -p "📝 ใส่ชื่อไฟล์ภาพ (เช่น image1.jpg): " image_name
    
    if [[ $trip_number -ge 1 && $trip_number -le 18 ]]; then
        if [[ "$image_type" == "small" || "$image_type" == "large" ]]; then
            echo "🔄 เพิ่มภาพ $image_name ในทริปที่ $trip_number ($image_type)..."
            
            # ตรวจสอบว่าไฟล์ต้นฉบับมีอยู่หรือไม่
            if [ -f "$image_name" ]; then
                # แปลงเป็น WebP และคัดลอกไปยังโฟลเดอร์ทริป
                convert "$image_name" "images/webp/trip$trip_number/$image_type/${image_name%.*}.webp"
                echo "✅ เพิ่มภาพเรียบร้อยแล้ว"
            else
                echo "❌ ไม่พบไฟล์ $image_name กรุณาตรวจสอบชื่อไฟล์"
            fi
        else
            echo "❌ ประเภทภาพไม่ถูกต้อง กรุณาใส่ small หรือ large"
        fi
    else
        echo "❌ หมายเลขทริปไม่ถูกต้อง กรุณาใส่ 1-18"
    fi
}

# ฟังก์ชันแปลงภาพเป็น WebP
convert_to_webp() {
    echo ""
    read -p "🔄 ใส่หมายเลขทริป (1-18): " trip_number
    
    if [[ $trip_number -ge 1 && $trip_number -le 18 ]]; then
        echo "🔄 แปลงภาพในทริปที่ $trip_number เป็น WebP..."
        
        # แปลงภาพในโฟลเดอร์ small
        if [ -d "images/webp/trip$trip_number/small" ]; then
            for img in images/webp/trip$trip_number/small/*.{jpg,jpeg,png}; do
                if [ -f "$img" ]; then
                    echo "🔄 แปลง: $img"
                    convert "$img" "${img%.*}.webp"
                fi
            done
        fi
        
        # แปลงภาพในโฟลเดอร์ large
        if [ -d "images/webp/trip$trip_number/large" ]; then
            for img in images/webp/trip$trip_number/large/*.{jpg,jpeg,png}; do
                if [ -f "$img" ]; then
                    echo "🔄 แปลง: $img"
                    convert "$img" "${img%.*}.webp"
                fi
            done
        fi
        
        echo "✅ แปลงภาพเรียบร้อยแล้ว"
    else
        echo "❌ หมายเลขทริปไม่ถูกต้อง กรุณาใส่ 1-18"
    fi
}

# ฟังก์ชันแสดงสถานะภาพทริป
show_trip_status() {
    echo ""
    read -p "📊 ใส่หมายเลขทริป (1-18) หรือใส่ 'all' เพื่อดูทั้งหมด: " trip_number
    
    if [[ "$trip_number" == "all" ]]; then
        echo "📊 สถานะภาพทริปทั้งหมด:"
        echo "=================================="
        
        for i in {1..18}; do
            small_count=$(ls -1 "images/webp/trip$i/small/"*.webp 2>/dev/null | wc -l)
            large_count=$(ls -1 "images/webp/trip$i/large/"*.webp 2>/dev/null | wc -l)
            
            printf "ทริปที่ %2d: Small: %2d ไฟล์, Large: %2d ไฟล์\n" $i $small_count $large_count
        done
    elif [[ $trip_number -ge 1 && $trip_number -le 18 ]]; then
        echo "📊 สถานะภาพทริปที่ $trip_number:"
        echo "=================================="
        
        if [ -d "images/webp/trip$trip_number" ]; then
            echo "📁 โฟลเดอร์ Small:"
            ls -la "images/webp/trip$trip_number/small/" 2>/dev/null || echo "   ไม่มีโฟลเดอร์"
            
            echo ""
            echo "📁 โฟลเดอร์ Large:"
            ls -la "images/webp/trip$trip_number/large/" 2>/dev/null || echo "   ไม่มีโฟลเดอร์"
        else
            echo "❌ ไม่พบโฟลเดอร์ทริปที่ $trip_number"
        fi
    else
        echo "❌ หมายเลขทริปไม่ถูกต้อง"
    fi
}

# ฟังก์ชันลบภาพทริป
delete_trip_image() {
    echo ""
    read -p "🗑️  ใส่หมายเลขทริป (1-18): " trip_number
    read -p "📁 ใส่ประเภทภาพ (small/large): " image_type
    read -p "📝 ใส่ชื่อไฟล์ภาพ (เช่น image1.webp): " image_name
    
    if [[ $trip_number -ge 1 && $trip_number -le 18 ]]; then
        if [[ "$image_type" == "small" || "$image_type" == "large" ]]; then
            image_path="images/webp/trip$trip_number/$image_type/$image_name"
            
            if [ -f "$image_path" ]; then
                echo "🗑️  ลบภาพ: $image_path"
                rm "$image_path"
                echo "✅ ลบภาพเรียบร้อยแล้ว"
            else
                echo "❌ ไม่พบไฟล์ $image_path"
            fi
        else
            echo "❌ ประเภทภาพไม่ถูกต้อง กรุณาใส่ small หรือ large"
        fi
    else
        echo "❌ หมายเลขทริปไม่ถูกต้อง กรุณาใส่ 1-18"
    fi
}

# ฟังก์ชันหลัก
main() {
    while true; do
        show_menu
        
        case $choice in
            1)
                create_trip_structure
                ;;
            2)
                add_trip_image
                ;;
            3)
                convert_to_webp
                ;;
            4)
                show_trip_status
                ;;
            5)
                delete_trip_image
                ;;
            6)
                echo "👋 ขอบคุณที่ใช้สคริปต์นี้!"
                exit 0
                ;;
            *)
                echo "❌ กรุณาเลือกหมายเลข 1-6"
                ;;
        esac
        
        echo ""
        read -p "กด Enter เพื่อกลับไปยังเมนูหลัก..."
    done
}

# เริ่มต้นโปรแกรม
main
