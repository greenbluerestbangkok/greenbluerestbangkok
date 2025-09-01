# 🖼️ คำสั่ง Terminal สำหรับเปลี่ยนนามสกุลไฟล์ภาพเป็น .webp

## 🚀 **คำสั่งแบบรวดเร็ว (Copy & Paste)**

### **1. เปลี่ยนนามสกุลไฟล์ทั้งหมดในโฟลเดอร์ images**

```bash
# เปลี่ยนไฟล์ .jpg เป็น .webp
find images -name "*.jpg" -exec sh -c 'mv "$1" "${1%.jpg}.webp"' _ {} \;

# เปลี่ยนไฟล์ .jpeg เป็น .webp
find images -name "*.jpeg" -exec sh -c 'mv "$1" "${1%.jpeg}.webp"' _ {} \;

# เปลี่ยนไฟล์ .png เป็น .webp
find images -name "*.png" -exec sh -c 'mv "$1" "${1%.png}.webp"' _ {} \;
```

### **2. เปลี่ยนนามสกุลไฟล์แบบ Batch (แนะนำ)**

```bash
# สร้างสคริปต์แบบรวดเร็ว
cat > rename_all.sh << 'EOF'
#!/bin/bash
echo "🔄 เปลี่ยนนามสกุลไฟล์ภาพทั้งหมดเป็น .webp..."

# เปลี่ยน .jpg
for file in $(find images -name "*.jpg"); do
    mv "$file" "${file%.jpg}.webp"
    echo "✅ $(basename "$file") → $(basename "${file%.jpg}.webp")"
done

# เปลี่ยน .jpeg
for file in $(find images -name "*.jpeg"); do
    mv "$file" "${file%.jpeg}.webp"
    echo "✅ $(basename "$file") → $(basename "${file%.jpeg}.webp")"
done

# เปลี่ยน .png
for file in $(find images -name "*.png"); do
    mv "$file" "${file%.png}.webp"
    echo "✅ $(basename "$file") → $(basename "${file%.png}.webp")"
done

echo "🎉 เสร็จสิ้น!"
EOF

# ให้สิทธิ์และรัน
chmod +x rename_all.sh
./rename_all.sh
```

### **3. เปลี่ยนนามสกุลไฟล์แบบ Interactive (ถามก่อนลบ)**

```bash
# สร้างสคริปต์แบบ Interactive
cat > rename_interactive.sh << 'EOF'
#!/bin/bash
echo "🔄 เปลี่ยนนามสกุลไฟล์ภาพแบบ Interactive..."

# เปลี่ยน .jpg
for file in $(find images -name "*.jpg"); do
    echo "เปลี่ยน $(basename "$file") → $(basename "${file%.jpg}.webp")? (y/n)"
    read -r response
    if [[ "$response" =~ ^[Yy]$ ]]; then
        mv "$file" "${file%.jpg}.webp"
        echo "✅ เปลี่ยนแล้ว"
    else
        echo "⏭️ ข้าม"
    fi
done

# เปลี่ยน .jpeg
for file in $(find images -name "*.jpeg"); do
    echo "เปลี่ยน $(basename "$file") → $(basename "${file%.jpeg}.webp")? (y/n)"
    read -r response
    if [[ "$response" =~ ^[Yy]$ ]]; then
        mv "$file" "${file%.jpeg}.webp"
        echo "✅ เปลี่ยนแล้ว"
    else
        echo "⏭️ ข้าม"
    fi
done

# เปลี่ยน .png
for file in $(find images -name "*.png"); do
    echo "เปลี่ยน $(basename "$file") → $(basename "${file%.png}.webp")? (y/n)"
    read -r response
    if [[ "$response" =~ ^[Yy]$ ]]; then
        mv "$file" "${file%.png}.webp"
        echo "✅ เปลี่ยนแล้ว"
    else
        echo "⏭️ ข้าม"
    fi
done

echo "🎉 เสร็จสิ้น!"
EOF

# ให้สิทธิ์และรัน
chmod +x rename_interactive.sh
./rename_interactive.sh
```

## 📁 **การสำรองข้อมูลก่อนเปลี่ยน**

### **1. สำรองข้อมูลทั้งหมด**
```bash
# สร้างโฟลเดอร์สำรอง
mkdir -p "images_backup_$(date +%Y%m%d_%H%M%S)"

# สำรองข้อมูล
cp -r images "images_backup_$(date +%Y%m%d_%H%M%S)/"

echo "💾 สำรองข้อมูลเสร็จสิ้นใน: images_backup_$(date +%Y%m%d_%H%M%S)/"
```

### **2. ตรวจสอบไฟล์ที่จะเปลี่ยน**
```bash
# นับไฟล์ที่จะเปลี่ยน
echo "📊 ไฟล์ที่จะเปลี่ยนนามสกุล:"
echo "   .jpg: $(find images -name "*.jpg" | wc -l | tr -d ' ') ไฟล์"
echo "   .jpeg: $(find images -name "*.jpeg" | wc -l | tr -d ' ') ไฟล์"
echo "   .png: $(find images -name "*.png" | wc -l | tr -d ' ') ไฟล์"
```

## ⚠️ **ข้อควรระวัง**

1. **สำรองข้อมูลก่อน**: ใช้คำสั่งสำรองข้อมูลก่อนเปลี่ยนนามสกุล
2. **ตรวจสอบไฟล์**: ดูว่าไฟล์ที่จะเปลี่ยนมีอยู่จริงหรือไม่
3. **ทดสอบก่อน**: ทดสอบกับไฟล์ 1-2 ไฟล์ก่อน
4. **กู้คืนได้**: หากมีปัญหา สามารถกู้คืนจากโฟลเดอร์สำรองได้

## 🔄 **การกู้คืนข้อมูล**

```bash
# หากต้องการกู้คืนข้อมูล
cp -r "images_backup_YYYYMMDD_HHMMSS/images" ./

echo "🔄 กู้คืนข้อมูลเสร็จสิ้น"
```
