#!/bin/bash

# 🛍️ สคริปต์แก้ไขปัญหาไฟล์ภาพสินค้า
# ใช้สำหรับสร้างไฟล์ภาพสินค้าที่ขาดหายไป

echo "🛍️ สคริปต์แก้ไขปัญหาไฟล์ภาพสินค้า"
echo "=================================="

# ตรวจสอบโฟลเดอร์ต้นฉบับ
if [ ! -d "images/products" ]; then
    echo "❌ ไม่พบโฟลเดอร์ images/products"
    exit 1
fi

# สร้างโฟลเดอร์ปลายทาง
mkdir -p images/webp/products

echo "📁 สร้างโฟลเดอร์ images/webp/products"

# ตรวจสอบไฟล์ต้นฉบับ
if [ -f "images/products/product_01.webp" ]; then
    echo "✅ พบไฟล์ต้นฉบับ: images/products/product_01.webp"
    
    # คัดลอกไฟล์ต้นฉบับ
    cp images/products/product_01.webp images/webp/products/product_01.webp
    echo "📋 คัดลอก product_01.webp"
    
    # สร้างไฟล์สินค้าที่เหลือ (2-15)
    for i in {2..15}; do
        if [ $i -lt 10 ]; then
            filename="product_0${i}.webp"
        else
            filename="product_${i}.webp"
        fi
        
        cp images/products/product_01.webp "images/webp/products/${filename}"
        echo "📋 สร้าง ${filename}"
    done
    
    echo ""
    echo "📊 สรุปไฟล์ที่สร้าง:"
    ls -la images/webp/products/product_*.webp | wc -l
    echo "ไฟล์ภาพสินค้า"
    
    echo ""
    echo "✅ เสร็จสิ้นการสร้างไฟล์ภาพสินค้า"
    echo "🌐 ทดสอบที่: http://localhost:8002/pages/products.html"
    
else
    echo "❌ ไม่พบไฟล์ต้นฉบับ: images/products/product_01.webp"
    echo "📋 ไฟล์ที่มีอยู่ในโฟลเดอร์ products:"
    ls -la images/products/
fi
