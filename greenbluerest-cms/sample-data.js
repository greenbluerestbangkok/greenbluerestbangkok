const sqlite3 = require('sqlite3').verbose();

// Create database connection
const db = new sqlite3.Database('cms.db');

// Sample data
const sampleTrips = [
    {
        title: "เที่ยวชุมชนคลองบางมด 1 วัน",
        description: "สัมผัสวิถีชีวิตชุมชนคลองบางมด พร้อมกิจกรรมเรียนรู้วัฒนธรรมท้องถิ่น",
        content: "ทริปท่องเที่ยวชุมชนคลองบางมดที่จะพาคุณไปสัมผัสกับวิถีชีวิตที่เรียบง่ายและอบอุ่นของชุมชน พร้อมกิจกรรมเรียนรู้วัฒนธรรมท้องถิ่น การทำอาหารพื้นบ้าน และการเดินเรือชมธรรมชาติ",
        duration: "1 วัน",
        price: "800 บาท/คน",
        location: "ชุมชนคลองบางมด กรุงเทพฯ",
        status: "published"
    },
    {
        title: "เรียนรู้เกษตรยั่งยืนที่ฟาร์ม SAFETist",
        description: "เรียนรู้เทคนิคการเกษตรแบบยั่งยืนและกิจกรรมสนุกสำหรับครอบครัว",
        content: "ฟาร์ม SAFETist เป็นฟาร์มเกษตรยั่งยืนที่เปิดให้ครอบครัวมาเรียนรู้และสัมผัสธรรมชาติ ตั้งอยู่ท่ามกลางสวนผลไม้และไร่นาที่เขียวขจี",
        duration: "ครึ่งวัน",
        price: "600 บาท/คน",
        location: "ฟาร์ม SAFETist คลองบางมด",
        status: "published"
    }
];

const sampleProducts = [
    {
        title: "น้ำพริกแกงสูตรโบราณ",
        description: "น้ำพริกแกงสูตรดั้งเดิมที่สืบทอดมา 4 รุ่น จากครูใหญ่สมหมาย",
        content: "น้ำพริกแกงที่ทำจากเครื่องเทศสดใหม่ ไม่ใช้สารเคมี ผ่านกระบวนการโขลกด้วยครกดินเผาแบบโบราณ รสชาติเข้มข้นและหอมเป็นเอกลักษณ์",
        price: "150 บาท/กระปุก",
        category: "อาหารพื้นบ้าน",
        status: "published"
    },
    {
        title: "สบู่สมุนไพรจากธรรมชาติ",
        description: "สบู่สมุนไพรสูตรดั้งเดิมจากคุณป้าศรี ผู้เชี่ยวชาญด้านสมุนไพรพื้นบ้าน",
        content: "สบู่สมุนไพรที่ทำจากวัตถุดิบธรรมชาติล้วนๆ ใช้สมุนไพรจากสวนหลังบ้าน ไม่มีสารเคมีที่เป็นอันตราย เหมาะสำหรับทุกสภาพผิว",
        price: "80 บาท/ก้อน",
        category: "ผลิตภัณฑ์เพื่อสุขภาพ",
        status: "published"
    }
];

const sampleArticles = [
    {
        title: "เรียนรู้การทำน้ำพริกแกงจากครูใหญ่สมหมาย",
        description: "เรียนรู้เคล็ดลับการทำน้ำพริกแกงไทยแท้จากครูใหญ่สมหมาย ผู้เชี่ยวชาญที่สืบทอดสูตรมา 4 รุ่น",
        content: "ครูใหญ่สมหมาย วัย 78 ปี เป็นผู้เชี่ยวชาญด้านการทำน้ำพริกแกงที่มีชื่อเสียงในชุมชนบางมด ท่านได้รับการสืบทอดภูมิปัญญานี้มาจากคุณแม่ คุณยาย และคุณทวดทวด จนถึงปัจจุบันเป็นรุ่นที่ 4 แล้ว",
        author: "ทีมงาน GreenBlueRest",
        category: "ภูมิปัญญาท้องถิ่น",
        status: "published"
    },
    {
        title: "ตลาดน้ำบางมด: อดีตที่กลับมาใหม่",
        description: "การฟื้นฟูตลาดน้ำบางมดที่เคยหายไป กลับมาเป็นแหล่งท่องเที่ยวและแหล่งซื้อขายของชุมชน",
        content: "ตลาดน้ำบางมดที่เคยเป็นศูนย์กลางการค้าขายของชุมชนในอดีต แต่ได้หายไปเมื่อประมาณ 30 ปีที่แล้ว เนื่องจากการพัฒนาเมืองและการเปลี่ยนแปลงรูปแบบการค้าขาย ได้กลับมาฟื้นคืนชีพอีกครั้งในปี 2023",
        author: "ทีมงาน GreenBlueRest",
        category: "ประวัติศาสตร์ชุมชน",
        status: "published"
    }
];

const sampleVideos = [
    {
        title: "เที่ยวชุมชนบางมดใน 1 วัน",
        description: "พาชมบรรยากาศการท่องเที่ยวชุมชนบางมดแบบจัดเต็ม ตั้งแต่เช้าถึงเย็น",
        video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        duration: "15:30",
        category: "ท่องเที่ยวชุมชน",
        status: "published"
    },
    {
        title: "ทำขนมไทยกับยายสมใจ",
        description: "เรียนรู้การทำขนมไทยโบราณกับยายสมใจ ผู้เชี่ยวชาญขนมไทยของชุมชน",
        video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        duration: "22:15",
        category: "วัฒนธรรมท้องถิ่น",
        status: "published"
    }
];

const sampleEntrepreneurs = [
    {
        title: "บ้านสวนป้าดา",
        description: "ร้านอาหารไทยต้นตำรับที่ทำจากวัตถุดิบสดใหม่ในชุมชน",
        content: "บ้านสวนป้าดาเป็นสถานที่ที่รวบรวมความทรงจำและรสชาติของอาหารไทยแท้ที่สืบทอดกันมาหลายรุ่น ป้าดา เจ้าของร้าน ได้สืบทอดสูตรอาหารจากคุณย่าคุณยายมาตั้งแต่เด็ก",
        contact_info: "โทร: 08x-xxx-xxxx",
        location: "หมู่ 7 ตำบลบางมด อำเภอเมเทพ จังหวัดสมุทรปราการ",
        category: "ร้านอาหาร",
        status: "published"
    },
    {
        title: "ฟาร์มผึ้งบางมด",
        description: "เรียนรู้การเลี้ยงผึ้งและการผลิตน้ำผึ้งแบบธรรมชาติ ที่ฟาร์มผึ้งบางมดของลุงสมชาย",
        content: "ลุงสมชาย วัย 58 ปี เป็นผู้เลี้ยงผึ้งที่มีประสบการณ์กว่า 20 ปี ฟาร์มของท่านตั้งอยู่ท่ามกลางสวนผลไม้และป่าไผ่ สร้างสภาพแวดล้อมที่เหมาะสำหรับผึ้งอย่างยิ่ง",
        contact_info: "โทร: 08x-xxx-xxxx",
        location: "234 หมู่ 6 ตำบลบางมด",
        category: "เกษตรกรรม",
        status: "published"
    }
];

// Insert sample data
function insertSampleData() {
    console.log('🌱 กำลังเพิ่มข้อมูลตัวอย่าง...');

    // Insert trips
    sampleTrips.forEach((trip, index) => {
        const slug = trip.title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim('-');
        db.run(
            'INSERT OR IGNORE INTO trips (title, description, slug, content, duration, price, location, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [trip.title, trip.description, slug, trip.content, trip.duration, trip.price, trip.location, trip.status],
            function(err) {
                if (err) {
                    console.error('Error inserting trip:', err);
                } else {
                    console.log(`✅ เพิ่มทริป: ${trip.title}`);
                }
            }
        );
    });

    // Insert products
    sampleProducts.forEach((product, index) => {
        const slug = product.title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim('-');
        db.run(
            'INSERT OR IGNORE INTO products (title, description, slug, content, price, category, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [product.title, product.description, slug, product.content, product.price, product.category, product.status],
            function(err) {
                if (err) {
                    console.error('Error inserting product:', err);
                } else {
                    console.log(`✅ เพิ่มสินค้า: ${product.title}`);
                }
            }
        );
    });

    // Insert articles
    sampleArticles.forEach((article, index) => {
        const slug = article.title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim('-');
        db.run(
            'INSERT OR IGNORE INTO articles (title, description, slug, content, author, category, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [article.title, article.description, slug, article.content, article.author, article.category, article.status],
            function(err) {
                if (err) {
                    console.error('Error inserting article:', err);
                } else {
                    console.log(`✅ เพิ่มบทความ: ${article.title}`);
                }
            }
        );
    });

    // Insert videos
    sampleVideos.forEach((video, index) => {
        const slug = video.title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim('-');
        db.run(
            'INSERT OR IGNORE INTO videos (title, description, slug, video_url, duration, category, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [video.title, video.description, slug, video.video_url, video.duration, video.category, video.status],
            function(err) {
                if (err) {
                    console.error('Error inserting video:', err);
                } else {
                    console.log(`✅ เพิ่มวิดีโอ: ${video.title}`);
                }
            }
        );
    });

    // Insert entrepreneurs
    sampleEntrepreneurs.forEach((entrepreneur, index) => {
        const slug = entrepreneur.title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim('-');
        db.run(
            'INSERT OR IGNORE INTO entrepreneurs (title, description, slug, content, contact_info, location, category, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [entrepreneur.title, entrepreneur.description, slug, entrepreneur.content, entrepreneur.contact_info, entrepreneur.location, entrepreneur.category, entrepreneur.status],
            function(err) {
                if (err) {
                    console.error('Error inserting entrepreneur:', err);
                } else {
                    console.log(`✅ เพิ่มผู้ประกอบการ: ${entrepreneur.title}`);
                }
            }
        );
    });

    console.log('🎉 เพิ่มข้อมูลตัวอย่างเรียบร้อยแล้ว!');
    console.log('📊 ข้อมูลที่เพิ่ม:');
    console.log(`   - ทริปท่องเที่ยว: ${sampleTrips.length} รายการ`);
    console.log(`   - สินค้าชุมชน: ${sampleProducts.length} รายการ`);
    console.log(`   - บทความ: ${sampleArticles.length} รายการ`);
    console.log(`   - วิดีโอ: ${sampleVideos.length} รายการ`);
    console.log(`   - ผู้ประกอบการ: ${sampleEntrepreneurs.length} รายการ`);
}

// Run the script
insertSampleData();

// Close database connection
setTimeout(() => {
    db.close();
    console.log('🔒 ปิดการเชื่อมต่อฐานข้อมูล');
}, 2000);
