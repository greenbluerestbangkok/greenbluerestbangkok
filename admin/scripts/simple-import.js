#!/usr/bin/env node

const SUPABASE_URL = 'https://gmdvkegcejrbrobtrhfm.supabase.co';
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdtZHZrZWdjZWpyYnJvYnRyaGZtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTIzNDU2NiwiZXhwIjoyMDc0ODEwNTY2fQ.Kq6bnRzZFuBaIcVLSCF_v83n8FeauELatKg067Kc9hM';

const trips = [
  { id: 1, title: 'เที่ยวชุมชนคลองบางมด 1 วัน', description: 'สัมผัสวิถีชีวิตชุมชนริมคลองบางมด', content: 'ทริปท่องเที่ยวชุมชนริมคลองบางมด', price: '1,500 บาท', duration: '1 วัน', location: 'คลองบางมด', status: 'published' },
  { id: 2, title: 'ตลาดน้ำบางมด', description: 'สัมผัสตลาดน้ำแบบดั้งเดิม', content: 'เยี่ยมชมตลาดน้ำบางมด', price: '800 บาท', duration: 'ครึ่งวัน', location: 'ตลาดน้ำบางมด', status: 'published' },
  { id: 3, title: 'ท่องเที่ยวชุมชนคลองลัดโพธิ์', description: 'สัมผัสวิถีชีวิตชุมชนริมคลองลัดโพธิ์', content: 'ทริปท่องเที่ยวชุมชนริมคลองลัดโพธิ์', price: '1,200 บาท', duration: '1 วัน', location: 'คลองลัดโพธิ์', status: 'published' },
  { id: 4, title: 'ตลาดนัดชุมชนบางมด', description: 'สัมผัสตลาดนัดชุมชนบางมด', content: 'เยี่ยมชมตลาดนัดชุมชนบางมด', price: '600 บาท', duration: 'ครึ่งวัน', location: 'บางมด', status: 'published' },
  { id: 5, title: 'ท่องเที่ยวชุมชนคลองบางมด 2 วัน 1 คืน', description: 'สัมผัสวิถีชีวิตชุมชน 2 วัน 1 คืน', content: 'ทริปท่องเที่ยว 2 วัน 1 คืน', price: '2,800 บาท', duration: '2 วัน 1 คืน', location: 'คลองบางมด', status: 'published' },
  { id: 6, title: 'ตลาดน้ำคลองลัดโพธิ์', description: 'สัมผัสตลาดน้ำคลองลัดโพธิ์', content: 'เยี่ยมชมตลาดน้ำคลองลัดโพธิ์', price: '900 บาท', duration: 'ครึ่งวัน', location: 'คลองลัดโพธิ์', status: 'published' },
  { id: 7, title: 'ท่องเที่ยวชุมชนคลองบางมด ครึ่งวัน', description: 'สัมผัสวิถีชีวิตชุมชน ครึ่งวัน', content: 'ทริปท่องเที่ยวครึ่งวัน', price: '1,000 บาท', duration: 'ครึ่งวัน', location: 'คลองบางมด', status: 'published' },
  { id: 8, title: 'ตลาดนัดชุมชนคลองลัดโพธิ์', description: 'สัมผัสตลาดนัดชุมชนคลองลัดโพธิ์', content: 'เยี่ยมชมตลาดนัดชุมชน', price: '700 บาท', duration: 'ครึ่งวัน', location: 'คลองลัดโพธิ์', status: 'published' },
  { id: 9, title: 'ท่องเที่ยวชุมชนคลองบางมด 3 วัน 2 คืน', description: 'สัมผัสวิถีชีวิตชุมชน 3 วัน 2 คืน', content: 'ทริปท่องเที่ยว 3 วัน 2 คืน', price: '4,500 บาท', duration: '3 วัน 2 คืน', location: 'คลองบางมด', status: 'published' },
  { id: 10, title: 'ตลาดน้ำคลองบางมด', description: 'สัมผัสตลาดน้ำคลองบางมด', content: 'เยี่ยมชมตลาดน้ำคลองบางมด', price: '750 บาท', duration: 'ครึ่งวัน', location: 'คลองบางมด', status: 'published' },
  { id: 11, title: 'ท่องเที่ยวชุมชนคลองบางมด 1 วันพิเศษ', description: 'สัมผัสวิถีชีวิตชุมชน 1 วันพิเศษ', content: 'ทริปท่องเที่ยว 1 วันพิเศษ', price: '1,800 บาท', duration: '1 วัน', location: 'คลองบางมด', status: 'published' }
];

const products = [
  { id: 1, title: 'สบู่ชาโคล', description: 'สบู่น้ำมันธรรมชาติ', price: '99 บาท', category: 'beauty', status: 'available' },
  { id: 2, title: 'สบู่ส้ม', description: 'สบู่น้ำมันธรรมชาติจากน้ำมันพืช 6 ชนิด', price: '99 บาท', category: 'beauty', status: 'available' },
  { id: 3, title: 'สบู่นมแพะ', description: 'สบู่น้ำมันธรรมชาติผสมนมแพะ', price: '99 บาท', category: 'beauty', status: 'available' },
  { id: 4, title: 'ยาดมสูตรธรรมชาติ', description: 'ยาดมสมุนไพรจาก 6 ชนิด', price: '69 บาท', category: 'beauty', status: 'available' },
  { id: 5, title: 'ยาดมสูตรโรสแมรี่', description: 'สูตรเพิ่มใบโรสแมรี่แห้ง', price: '69 บาท', category: 'beauty', status: 'available' },
  { id: 6, title: 'น้ำผึ้งมะนาวใบหูเสือ', description: 'เครื่องดื่มจากใบหูเสือ', price: '50 บาท', category: 'food', status: 'available' },
  { id: 7, title: 'กาแฟอเมริกาโน่', description: 'กาแฟดำเข้มข้น', price: '50 บาท', category: 'food', status: 'available' },
  { id: 8, title: 'ผงโรยข้าว', description: 'ผลิตจากปลาบูดู', price: '69 บาท', category: 'food', status: 'available' },
  { id: 9, title: 'ข้าวหมกไก่', description: 'เมนูฮาลาล', price: '60 บาท', category: 'food', status: 'available' },
  { id: 10, title: 'นมแพะพร้อมดื่ม', description: 'ผลิตจากแพะพันธุ์ซาแนน', price: '25 บาท', category: 'food', status: 'available' },
  { id: 11, title: 'ปลาบูดูหลน', description: 'ผสมปลาบูดูทอดกรอบ', price: '50 บาท', category: 'food', status: 'available' },
  { id: 12, title: 'ปลาบูดูสด', description: 'ปลาบูดูสูตรโบราณ', price: '80-150 บาท', category: 'food', status: 'available' },
  { id: 13, title: 'ทองม้วนนมแพะ', description: 'ขนมทองม้วนสูตรเฉพาะ', price: '50-60 บาท', category: 'food', status: 'available' },
  { id: 14, title: 'สบู่นมแพะ', description: 'ผลิตจากนมแพะแท้', price: '50-100 บาท', category: 'beauty', status: 'available' },
  { id: 15, title: 'หอยทอดถาด', description: 'หอยทอดสูตรดั้งเดิม', price: '50 บาท', category: 'food', status: 'available' },
  { id: 16, title: 'ไอกือเรง ซูซู กาเมง', description: 'อาหารท้องถิ่น', price: '40 บาท', category: 'food', status: 'available' },
  { id: 17, title: 'เมนูเบอร์เกอร์', description: 'เบอร์เกอร์ฮาลาล', price: '49-89 บาท', category: 'food', status: 'available' },
  { id: 18, title: 'แต่งหน้าขนมปัง', description: 'Workshop แต่งหน้าขนมปัง', price: '80 บาท', category: 'food', status: 'available' },
  { id: 19, title: 'กล้วยช็อกโกแลต', description: 'Workshop กล้วยชุบช็อกโกแลต', price: '50 บาท', category: 'food', status: 'available' },
  { id: 20, title: 'น้ำอัญชันโซดา', description: 'Workshop เครื่องดื่ม', price: '69 บาท', category: 'food', status: 'available' },
  { id: 21, title: 'ต้นส้มบางมด', description: 'สวนส้มอนุรักษ์', price: '150-500 บาท', category: 'food', status: 'available' },
  { id: 22, title: 'กาแฟ Café Can Do', description: 'อเมริกาโน่เย็น', price: '50-60 บาท', category: 'food', status: 'available' },
  { id: 23, title: 'ชา-โกโก้ Can Do', description: 'ชาไทย ชาเขียว โกโก้', price: '60 บาท', category: 'food', status: 'available' },
  { id: 24, title: 'Italian Soda', description: 'โซดาหลายรสชาติ', price: '45 บาท', category: 'food', status: 'available' }
];

const articles = [
  { id: 1, title: 'Low Carbon Tourism คืออะไร?', description: 'ทำความรู้จักกับการท่องเที่ยวคาร์บอนต่ำ', content: 'Low Carbon Tourism หรือ การท่องเที่ยวคาร์บอนต่ำ', author: 'Admin', category: 'education', status: 'published' },
  { id: 2, title: 'ประวัติชุมชนคลองบางมด', description: 'เรื่องราวและประวัติศาสตร์', content: 'ชุมชนคลองบางมดเป็นชุมชนเก่าแก่', author: 'Admin', category: 'community', status: 'published' },
  { id: 3, title: '8 กลุ่มผู้ประกอบการในชุมชน', description: 'ทำความรู้จักกับผู้ประกอบการ', content: 'มีผู้ประกอบการ 8 กลุ่ม', author: 'Admin', category: 'community', status: 'published' },
  { id: 4, title: 'วิธีการเดินทางมาชุมชน', description: 'คู่มือการเดินทาง', content: 'สามารถเดินทางมาได้หลายวิธี', author: 'Admin', category: 'travel', status: 'published' },
  { id: 5, title: 'กิจกรรมที่น่าสนใจ', description: 'กิจกรรมและเทศกาล', content: 'มีกิจกรรมมากมาย', author: 'Admin', category: 'events', status: 'published' }
];

const videos = [
  { id: 1, title: 'แนะนำชุมชนคลองบางมด', description: 'วิดีโอแนะนำชุมชน', video_url: 'https://www.youtube.com/watch?v=sample1', duration: '5:30', category: 'introduction', status: 'published' },
  { id: 2, title: 'ล่องเรือชมคลอง', description: 'ประสบการณ์การล่องเรือ', video_url: 'https://www.youtube.com/watch?v=sample2', duration: '8:45', category: 'activity', status: 'published' },
  { id: 3, title: 'เรียนทำอาหารไทยโบราณ', description: 'เรียนทำอาหารจากแม่ครัว', video_url: 'https://www.youtube.com/watch?v=sample3', duration: '12:20', category: 'activity', status: 'published' },
  { id: 4, title: 'ทำเครื่องปั้นดินเผา', description: 'Workshop เครื่องปั้นดินเผา', video_url: 'https://www.youtube.com/watch?v=sample4', duration: '10:15', category: 'workshop', status: 'published' },
  { id: 5, title: 'ตลาดนัดชุมชนวันเสาร์', description: 'บรรยากาศตลาดนัด', video_url: 'https://www.youtube.com/watch?v=sample5', duration: '6:40', category: 'event', status: 'published' }
];

const entrepreneurs = [
  { id: 1, title: 'เซฟติสท์ฟาร์ม', description: 'ผู้ผลิตน้ำมันมะพร้าวสกัดเย็น', category: 'beauty', status: 'active' },
  { id: 2, title: 'บ้านเขียนวาด', description: 'กลุ่มงานฝีมือและศิลปะ', category: 'craft', status: 'active' },
  { id: 3, title: 'ตลาดมดตะนอย', description: 'ตลาดนัดชุมชนและอาหารพื้นบ้าน', category: 'food', status: 'active' },
  { id: 4, title: 'กัมปงในดงปรือ', description: 'กลุ่มทอผ้าและผ้าบาติก', category: 'craft', status: 'active' },
  { id: 5, title: 'Art Lab', description: 'ศูนย์เรียนรู้ศิลปะ', category: 'education', status: 'active' },
  { id: 6, title: 'S more Town', description: 'กลุ่มผลิตขนมและของว่าง', category: 'food', status: 'active' },
  { id: 7, title: 'นิทานศิลป์', description: 'กลุ่มงานฝีมือและของที่ระลึก', category: 'craft', status: 'active' },
  { id: 8, title: 'Cafe Can Do', description: 'คาเฟ่ชุมชนและกาแฟคั่วสด', category: 'food', status: 'active' }
];

async function importData() {
  console.log('🚀 Starting auto data import...\n');

  try {
    // Delete existing
    console.log('🗑️  Clearing old data...');
    await deleteTable('trips');
    await deleteTable('products');
    await deleteTable('articles');
    await deleteTable('videos');
    await deleteTable('entrepreneurs');
    console.log('✅ Done\n');

    // Import
    console.log('📦 Importing trips (11)...');
    await importTable('trips', trips);
    console.log('✅ Done');
    
    console.log('📦 Importing products (24)...');
    await importTable('products', products);
    console.log('✅ Done');
    
    console.log('📦 Importing articles (5)...');
    await importTable('articles', articles);
    console.log('✅ Done');
    
    console.log('📦 Importing videos (5)...');
    await importTable('videos', videos);
    console.log('✅ Done');
    
    console.log('📦 Importing entrepreneurs (8)...');
    await importTable('entrepreneurs', entrepreneurs);
    console.log('✅ Done\n');

    console.log('🎉 SUCCESS! All data imported!\n');
    console.log('📊 Summary:');
    console.log('   ✅ 11 Trips');
    console.log('   ✅ 24 Products');
    console.log('   ✅ 5 Articles');
    console.log('   ✅ 5 Videos');
    console.log('   ✅ 8 Entrepreneurs');
    console.log('   ─────────────');
    console.log('   Total: 53 items\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

async function deleteTable(table) {
  await fetch(`${SUPABASE_URL}/rest/v1/${table}?id=gt.0`, {
    method: 'DELETE',
    headers: {
      'apikey': SUPABASE_SERVICE_KEY,
      'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
      'Prefer': 'return=minimal'
    }
  });
}

async function importTable(table, data) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    method: 'POST',
    headers: {
      'apikey': SUPABASE_SERVICE_KEY,
      'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=minimal'
    },
    body: JSON.stringify(data)
  });
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to import ${table}: ${error}`);
  }
}

importData();

