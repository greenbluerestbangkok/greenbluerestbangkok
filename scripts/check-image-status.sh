#!/bin/bash

# สคริปต์ตรวจสอบสถานะไฟล์ภาพทั้งหมดหลังจากปรับชื่อ

echo "=== ตรวจสอบสถานะไฟล์ภาพทั้งหมด ==="
echo ""

# ตรวจสอบไฟล์ในโฟลเดอร์ blog
echo "📁 โฟลเดอร์ Blog:"
if [ -d "images/blog" ]; then
    cd images/blog
    blog_count=$(ls -1 *.jpg 2>/dev/null | wc -l)
    echo "   พบไฟล์ภาพ: $blog_count ไฟล์"
    if [ $blog_count -gt 0 ]; then
        echo "   ตัวอย่างไฟล์:"
        ls -1 *.jpg | head -5 | sed 's/^/     /'
        if [ $blog_count -gt 5 ]; then
            echo "     ... และอีก $((blog_count - 5)) ไฟล์"
        fi
    fi
    cd ../..
else
    echo "   ไม่พบโฟลเดอร์ blog"
fi
echo ""

# ตรวจสอบไฟล์ในโฟลเดอร์ products
echo "📁 โฟลเดอร์ Products:"
if [ -d "images/products" ]; then
    cd images/products
    product_count=$(ls -1 *.jpg 2>/dev/null | wc -l)
    echo "   พบไฟล์ภาพ: $product_count ไฟล์"
    if [ $product_count -gt 0 ]; then
        echo "   ตัวอย่างไฟล์:"
        ls -1 *.jpg | head -5 | sed 's/^/     /'
        if [ $product_count -gt 5 ]; then
            echo "     ... และอีก $((product_count - 5)) ไฟล์"
        fi
    fi
    cd ../..
else
    echo "   ไม่พบโฟลเดอร์ products"
fi
echo ""

# ตรวจสอบไฟล์ในโฟลเดอร์ vlog
echo "📁 โฟลเดอร์ Vlog:"
if [ -d "images/vlog" ]; then
    cd images/vlog
    vlog_count=$(ls -1 *.jpg 2>/dev/null | wc -l)
    echo "   พบไฟล์ภาพ: $vlog_count ไฟล์"
    if [ $vlog_count -gt 0 ]; then
        echo "   ตัวอย่างไฟล์:"
        ls -1 *.jpg | head -5 | sed 's/^/     /'
        if [ $vlog_count -gt 5 ]; then
            echo "     ... และอีก $((vlog_count - 5)) ไฟล์"
        fi
    fi
    cd ../..
else
    echo "   ไม่พบโฟลเดอร์ vlog"
fi
echo ""

# ตรวจสอบไฟล์ในโฟลเดอร์ operators
echo "📁 โฟลเดอร์ Operators:"
if [ -d "images/operators" ]; then
    cd images/operators
    operator_count=$(ls -1 *.png *.jpg 2>/dev/null | wc -l)
    echo "   พบไฟล์ภาพ: $operator_count ไฟล์"
    if [ $operator_count -gt 0 ]; then
        echo "   ตัวอย่างไฟล์:"
        ls -1 *.png *.jpg 2>/dev/null | head -5 | sed 's/^/     /'
        if [ $operator_count -gt 5 ]; then
            echo "     ... และอีก $((operator_count - 5)) ไฟล์"
        fi
    fi
    cd ../..
else
    echo "   ไม่พบโฟลเดอร์ operators"
fi
echo ""

# ตรวจสอบไฟล์ในโฟลเดอร์ trips
echo "📁 โฟลเดอร์ Trips:"
trip_total=0
for trip_num in {1..18}; do
    trip_dir="images/trip$trip_num"
    if [ -d "$trip_dir" ]; then
        cd "$trip_dir"
        trip_files=0
        
        # ตรวจสอบไฟล์ใน large
        if [ -d "large" ]; then
            large_count=$(ls -1 large/* 2>/dev/null | wc -l)
            trip_files=$((trip_files + large_count))
        fi
        
        # ตรวจสอบไฟล์ใน small
        if [ -d "small" ]; then
            small_count=$(ls -1 small/* 2>/dev/null | wc -l)
            trip_files=$((trip_files + small_count))
        fi
        
        # ตรวจสอบไฟล์ในโฟลเดอร์หลัก
        main_count=$(ls -1 *.jpg *.png 2>/dev/null | wc -l)
        trip_files=$((trip_files + main_count))
        
        if [ $trip_files -gt 0 ]; then
            trip_total=$((trip_total + trip_files))
        fi
        
        cd ../..
    fi
done
echo "   พบไฟล์ภาพทั้งหมด: $trip_total ไฟล์"
echo "   ในโฟลเดอร์ trip1 ถึง trip18"
echo ""

# ตรวจสอบไฟล์ในโฟลเดอร์ cover
echo "📁 โฟลเดอร์ Cover:"
if [ -d "images/cover" ]; then
    cd images/cover
    cover_count=$(ls -1 *.jpg *.png 2>/dev/null | wc -l)
    echo "   พบไฟล์ภาพ: $cover_count ไฟล์"
    if [ $cover_count -gt 0 ]; then
        echo "   ตัวอย่างไฟล์:"
        ls -1 *.jpg *.png 2>/dev/null | head -5 | sed 's/^/     /'
        if [ $cover_count -gt 5 ]; then
            echo "     ... และอีก $((cover_count - 5)) ไฟล์"
        fi
    fi
    cd ../..
else
    echo "   ไม่พบโฟลเดอร์ cover"
fi
echo ""

# ตรวจสอบไฟล์ในโฟลเดอร์ trips (โฟลเดอร์หลัก)
echo "📁 โฟลเดอร์ Trips (หลัก):"
if [ -d "images/trips" ]; then
    cd images/trips
    trips_main_count=$(ls -1 *.jpg *.png 2>/dev/null | wc -l)
    echo "   พบไฟล์ภาพ: $trips_main_count ไฟล์"
    if [ $trips_main_count -gt 0 ]; then
        echo "   ตัวอย่างไฟล์:"
        ls -1 *.jpg *.png 2>/dev/null | head -5 | sed 's/^/     /'
        if [ $trips_main_count -gt 5 ]; then
            echo "     ... และอีก $((trips_main_count - 5)) ไฟล์"
        fi
    fi
    cd ../..
else
    echo "   ไม่พบโฟลเดอร์ trips"
fi
echo ""

# สรุปทั้งหมด
echo "=== สรุป ==="
total_images=$(find images -name "*.jpg" -o -name "*.png" -o -name "*.jpeg" -o -name "*.gif" | wc -l)
echo "📊 จำนวนไฟล์ภาพทั้งหมด: $total_images ไฟล์"
echo ""
echo "✅ การปรับชื่อไฟล์ภาพเสร็จสิ้นแล้ว!"
echo "📝 ดูรายละเอียดเพิ่มเติมได้ที่: images/NAMING_CONVENTION.md"
