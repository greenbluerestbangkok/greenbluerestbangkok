#!/bin/bash

# 🛍️ สคริปต์สร้างภาพสินค้าที่แตกต่างกัน
# ใช้สำหรับสร้างภาพสินค้าที่ไม่เหมือนกัน

echo "🛍️ สคริปต์สร้างภาพสินค้าที่แตกต่างกัน"
echo "======================================"

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
    
    # สร้างภาพสินค้าที่แตกต่างกันโดยใช้ ImageMagick
    echo "🎨 สร้างภาพสินค้าที่แตกต่างกัน..."
    
    # สินค้า 1: สบู่แฮนด์เมดน้ำมันมะพร้าว (สีเขียวอ่อน)
    magick images/products/product_01.webp -modulate 100,120,90 -fill "#e8f5e8" -colorize 10% images/webp/products/product_01.webp
    echo "📋 สร้าง product_01.webp (สบู่แฮนด์เมด)"
    
    # สินค้า 2: น้ำส้มคั้นสดจากสวน (สีส้ม)
    magick images/products/product_01.webp -modulate 100,110,85 -fill "#ffe8d6" -colorize 15% images/webp/products/product_02.webp
    echo "📋 สร้าง product_02.webp (น้ำส้มคั้นสด)"
    
    # สินค้า 3: ขนมไทยโบราณ (สีเหลืองอ่อน)
    magick images/products/product_01.webp -modulate 100,105,95 -fill "#fff8e1" -colorize 12% images/webp/products/product_03.webp
    echo "📋 สร้าง product_03.webp (ขนมไทยโบราณ)"
    
    # สินค้า 4: ผ้าขาวม้าทอมือ (สีน้ำเงินอ่อน)
    magick images/products/product_01.webp -modulate 100,95,110 -fill "#e3f2fd" -colorize 8% images/webp/products/product_04.webp
    echo "📋 สร้าง product_04.webp (ผ้าขาวม้าทอมือ)"
    
    # สินค้า 5: น้ำพริกแกงไทยแท้ (สีแดงอ่อน)
    magick images/products/product_01.webp -modulate 100,115,90 -fill "#ffebee" -colorize 10% images/webp/products/product_05.webp
    echo "📋 สร้าง product_05.webp (น้ำพริกแกงไทย)"
    
    # สินค้า 6: หมอนข้าวโพดใยธรรมชาติ (สีขาวนวล)
    magick images/products/product_01.webp -modulate 100,98,105 -fill "#fafafa" -colorize 5% images/webp/products/product_06.webp
    echo "📋 สร้าง product_06.webp (หมอนข้าวโพด)"
    
    # สินค้า 7: ผลไม้อบแห้ง (สีน้ำตาลอ่อน)
    magick images/products/product_01.webp -modulate 100,105,95 -fill "#f3e5f5" -colorize 8% images/webp/products/product_07.webp
    echo "📋 สร้าง product_07.webp (ผลไม้อบแห้ง)"
    
    # สินค้า 8: ครีมบำรุงผิวสมุนไพรไทย (สีชมพูอ่อน)
    magick images/products/product_01.webp -modulate 100,110,95 -fill "#fce4ec" -colorize 10% images/webp/products/product_08.webp
    echo "📋 สร้าง product_08.webp (ครีมบำรุงผิว)"
    
    # สินค้า 9: กระเป๋าผ้าทอมือ (สีม่วงอ่อน)
    magick images/products/product_01.webp -modulate 100,95,110 -fill "#f3e5f5" -colorize 8% images/webp/products/product_09.webp
    echo "📋 สร้าง product_09.webp (กระเป๋าผ้าทอมือ)"
    
    # สินค้า 10: ชาสมุนไพรผสม (สีเขียวเข้ม)
    magick images/products/product_01.webp -modulate 100,120,85 -fill "#e8f5e8" -colorize 12% images/webp/products/product_10.webp
    echo "📋 สร้าง product_10.webp (ชาสมุนไพร)"
    
    # สินค้า 11: น้ำมันหอมระเหยธรรมชาติ (สีเหลืองทอง)
    magick images/products/product_01.webp -modulate 100,110,90 -fill "#fff3e0" -colorize 10% images/webp/products/product_11.webp
    echo "📋 สร้าง product_11.webp (น้ำมันหอมระเหย)"
    
    # สินค้า 12: เสื้อผ้าฝ้ายย้อมสีธรรมชาติ (สีฟ้าอ่อน)
    magick images/products/product_01.webp -modulate 100,95,110 -fill "#e1f5fe" -colorize 8% images/webp/products/product_12.webp
    echo "📋 สร้าง product_12.webp (เสื้อผ้าฝ้าย)"
    
    # สินค้า 13: น้ำผึ้งป่าแท้ 100% (สีเหลืองทองเข้ม)
    magick images/products/product_01.webp -modulate 100,115,85 -fill "#fff8e1" -colorize 15% images/webp/products/product_13.webp
    echo "📋 สร้าง product_13.webp (น้ำผึ้งป่าแท้)"
    
    # สินค้า 14: พวงกุญแจจากใยมะพร้าว (สีน้ำตาลอ่อน)
    magick images/products/product_01.webp -modulate 100,105,95 -fill "#f3e5f5" -colorize 8% images/webp/products/product_14.webp
    echo "📋 สร้าง product_14.webp (พวงกุญแจใยมะพร้าว)"
    
    # สินค้า 15: ใบกล้วยธรรมชาติ (สีเขียวสด)
    magick images/products/product_01.webp -modulate 100,125,90 -fill "#e8f5e8" -colorize 15% images/webp/products/product_15.webp
    echo "📋 สร้าง product_15.webp (ใบกล้วยธรรมชาติ)"
    
    echo ""
    echo "📊 สรุปไฟล์ที่สร้าง:"
    ls -la images/webp/products/product_*.webp | wc -l
    echo "ไฟล์ภาพสินค้าที่แตกต่างกัน"
    
    echo ""
    echo "🎨 ข้อมูลสีของแต่ละสินค้า:"
    echo "1. สบู่แฮนด์เมด - สีเขียวอ่อน"
    echo "2. น้ำส้มคั้นสด - สีส้ม"
    echo "3. ขนมไทยโบราณ - สีเหลืองอ่อน"
    echo "4. ผ้าขาวม้าทอมือ - สีน้ำเงินอ่อน"
    echo "5. น้ำพริกแกงไทย - สีแดงอ่อน"
    echo "6. หมอนข้าวโพด - สีขาวนวล"
    echo "7. ผลไม้อบแห้ง - สีน้ำตาลอ่อน"
    echo "8. ครีมบำรุงผิว - สีชมพูอ่อน"
    echo "9. กระเป๋าผ้าทอมือ - สีม่วงอ่อน"
    echo "10. ชาสมุนไพร - สีเขียวเข้ม"
    echo "11. น้ำมันหอมระเหย - สีเหลืองทอง"
    echo "12. เสื้อผ้าฝ้าย - สีฟ้าอ่อน"
    echo "13. น้ำผึ้งป่าแท้ - สีเหลืองทองเข้ม"
    echo "14. พวงกุญแจใยมะพร้าว - สีน้ำตาลอ่อน"
    echo "15. ใบกล้วยธรรมชาติ - สีเขียวสด"
    
    echo ""
    echo "✅ เสร็จสิ้นการสร้างภาพสินค้าที่แตกต่างกัน"
    echo "🌐 ทดสอบที่: http://localhost:8002/pages/products.html"
    
else
    echo "❌ ไม่พบไฟล์ต้นฉบับ: images/products/product_01.webp"
    echo "📋 ไฟล์ที่มีอยู่ในโฟลเดอร์ products:"
    ls -la images/products/
fi
