#!/bin/bash

# สคริปต์ปรับชื่อไฟล์ภาพทั้งหมดให้เป็นรูปแบบที่สอดคล้องกัน
# รูปแบบ: [category][number]-[type].[extension]

echo "เริ่มปรับชื่อไฟล์ภาพ..."

# 1. ปรับชื่อไฟล์ในโฟลเดอร์ products
echo "ปรับชื่อไฟล์ในโฟลเดอร์ products..."
cd images/products
for i in {1..20}; do
    if [ -f "product-$i.jpg" ]; then
        mv "product-$i.jpg" "product$i-main.jpg"
        echo "เปลี่ยนชื่อ: product-$i.jpg -> product$i-main.jpg"
    fi
done
cd ../..

# 2. ปรับชื่อไฟล์ในโฟลเดอร์ vlog
echo "ปรับชื่อไฟล์ในโฟลเดอร์ vlog..."
cd images/vlog
for i in {1..8}; do
    if [ -f "vlog$i.jpg" ]; then
        mv "vlog$i.jpg" "vlog$i-main.jpg"
        echo "เปลี่ยนชื่อ: vlog$i.jpg -> vlog$i-main.jpg"
    fi
done
cd ../..

# 3. ปรับชื่อไฟล์ในโฟลเดอร์ operators
echo "ปรับชื่อไฟล์ในโฟลเดอร์ operators..."
cd images/operators

# ปรับชื่อไฟล์ cover.jpg เป็น operator1-main.jpg
if [ -f "cover.jpg" ]; then
    mv "cover.jpg" "operator1-main.jpg"
    echo "เปลี่ยนชื่อ: cover.jpg -> operator1-main.jpg"
fi

# ปรับชื่อไฟล์ PNG ต่างๆ
counter=2
for file in *.png; do
    if [ -f "$file" ]; then
        # ดึงชื่อไฟล์โดยไม่มีนามสกุล
        name_without_ext="${file%.*}"
        # สร้างชื่อใหม่
        new_name="operator${counter}-main.png"
        mv "$file" "$new_name"
        echo "เปลี่ยนชื่อ: $file -> $new_name"
        ((counter++))
    fi
done
cd ../..

# 4. ปรับชื่อไฟล์ในโฟลเดอร์ trip1-trip18
echo "ปรับชื่อไฟล์ในโฟลเดอร์ trip1-trip18..."
for trip_num in {1..18}; do
    trip_dir="images/trip$trip_num"
    if [ -d "$trip_dir" ]; then
        echo "ปรับชื่อไฟล์ใน $trip_dir..."
        
        # ปรับชื่อไฟล์ในโฟลเดอร์ large
        if [ -d "$trip_dir/large" ]; then
            cd "$trip_dir/large"
            for file in *; do
                if [ -f "$file" ]; then
                    ext="${file##*.}"
                    mv "$file" "trip${trip_num}-main.$ext"
                    echo "เปลี่ยนชื่อ: $file -> trip${trip_num}-main.$ext"
                fi
            done
            cd ../../..
        fi
        
        # ปรับชื่อไฟล์ในโฟลเดอร์ small
        if [ -d "$trip_dir/small" ]; then
            cd "$trip_dir/small"
            for file in *; do
                if [ -f "$file" ]; then
                    ext="${file##*.}"
                    mv "$file" "trip${trip_num}-sub1.$ext"
                    echo "เปลี่ยนชื่อ: $file -> trip${trip_num}-sub1.$ext"
                fi
            done
            cd ../../..
        fi
        
        # ปรับชื่อไฟล์ที่อยู่ในโฟลเดอร์หลักของ trip
        cd "$trip_dir"
        for file in *; do
            if [ -f "$file" ] && [ "$file" != "README.md" ]; then
                ext="${file##*.}"
                mv "$file" "trip${trip_num}-main.$ext"
                echo "เปลี่ยนชื่อ: $file -> trip${trip_num}-main.$ext"
            fi
        done
        cd ../..
    fi
done

# 5. ปรับชื่อไฟล์ในโฟลเดอร์ cover
echo "ปรับชื่อไฟล์ในโฟลเดอร์ cover..."
cd images/cover
counter=1
for file in *; do
    if [ -f "$file" ] && [ "$file" != "README.md" ]; then
        ext="${file##*.}"
        mv "$file" "cover${counter}-main.$ext"
        echo "เปลี่ยนชื่อ: $file -> cover${counter}-main.$ext"
        ((counter++))
    fi
done
cd ../..

# 6. ปรับชื่อไฟล์ในโฟลเดอร์ trips
echo "ปรับชื่อไฟล์ในโฟลเดอร์ trips..."
cd images/trips
counter=1
for file in *; do
    if [ -f "$file" ] && [ "$file" != "README.md" ]; then
        ext="${file##*.}"
        mv "$file" "trips${counter}-main.$ext"
        echo "เปลี่ยนชื่อ: $file -> trips${counter}-main.$ext"
        ((counter++))
    fi
done
cd ../..

echo "เสร็จสิ้นการปรับชื่อไฟล์ภาพทั้งหมด!"
echo ""
echo "สรุปรูปแบบการตั้งชื่อใหม่:"
echo "- blog: blog[number]-[type].jpg (main, sub1, sub2, ...)"
echo "- products: product[number]-main.jpg"
echo "- vlog: vlog[number]-main.jpg"
echo "- operators: operator[number]-main.png"
echo "- trips: trip[number]-[type].[ext] (main, sub1)"
echo "- cover: cover[number]-main.[ext]"
echo "- trips: trips[number]-main.[ext]"
