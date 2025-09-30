// Mock data for development mode
export const mockFiles = [
  {
    name: 'trip1.json',
    path: '/data/trips/trip1.json',
    type: 'file' as const,
    size: 1024,
    sha: 'mock-sha-1'
  },
  {
    name: 'trip2.json',
    path: '/data/trips/trip2.json',
    type: 'file' as const,
    size: 1024,
    sha: 'mock-sha-2'
  },
  {
    name: 'trip3.json',
    path: '/data/trips/trip3.json',
    type: 'file' as const,
    size: 1024,
    sha: 'mock-sha-5'
  },
  {
    name: 'product1.json',
    path: '/data/products/product1.json',
    type: 'file' as const,
    size: 1024,
    sha: 'mock-sha-3'
  },
  {
    name: 'product2.json',
    path: '/data/products/product2.json',
    type: 'file' as const,
    size: 1024,
    sha: 'mock-sha-6'
  },
  {
    name: 'product3.json',
    path: '/data/products/product3.json',
    type: 'file' as const,
    size: 1024,
    sha: 'mock-sha-7'
  },
  {
    name: 'operator1.json',
    path: '/data/operators/operator1.json',
    type: 'file' as const,
    size: 1024,
    sha: 'mock-sha-4'
  },
  {
    name: 'operator2.json',
    path: '/data/operators/operator2.json',
    type: 'file' as const,
    size: 1024,
    sha: 'mock-sha-8'
  }
];

export const mockContent = {
  '/data/trips/trip1.json': Buffer.from(JSON.stringify({
    id: 1,
    name: 'ทริปท่องเที่ยวพายเรือคายัค ลัดเลาะสวนมะพร้าว',
    shortDescription: 'สัมผัสวิถีชีวิตริมคลอง พร้อมกิจกรรมทำขนมไทยโบราณ',
    fullDescription: 'ทริปท่องเที่ยวพิเศษที่จะพาคุณไปสัมผัสความงดงามของธรรมชาติริมคลองบางมด พายเรือคายัคลัดเลาะผ่านสวนมะพร้าวเขียวขจี ชมวิถีชีวิตชาวบ้านที่ยังคงใช้ชีวิตแบบดั้งเดิม พร้อมเรียนรู้การทำขนมไทยโบราณจากปราชญ์ชาวบ้าน',
    price: '800 บาท/คน',
    duration: '3-4 ชั่วโมง',
    capacity: '2-8 คน',
    schedule: 'ทุกวัน 8:00-17:00',
    mainImage: '/images/trip1/small/trip1-main.webp',
    gallery: [
      '/images/trip1/large/trip1-main.webp',
      '/images/trip1/large/trip1-1.webp',
      '/images/trip1/large/trip1-2.webp'
    ],
    highlights: [
      'พายเรือคายัคในคลองบางมด',
      'ชมสวนมะพร้าวเขียวขจี',
      'เรียนรู้การทำขนมไทยโบราณ',
      'สัมผัสวิถีชีวิตชาวบ้าน',
      'ถ่ายภาพธรรมชาติสวยงาม'
    ],
    includes: [
      'อุปกรณ์พายเรือคายัค',
      'ไกด์ท้องถิ่น',
      'ขนมไทยโบราณ',
      'น้ำดื่ม',
      'ประกันอุบัติเหตุ'
    ],
    status: 'active',
    featured: true
  }, null, 2)).toString('base64'),
  
  '/data/products/product1.json': Buffer.from(JSON.stringify({
    id: 1,
    name: 'สบู่แฮนด์เมดน้ำมันมะพร้าว',
    price: '80 บาท',
    category: 'beauty',
    description: 'สบู่ธรรมชาติจากน้ำมันมะพร้าวบริสุทธิ์ ไม่มีสารเคมี',
    image: '/images/products/product1-main.webp',
    producer: 'เซฟติสท์ฟาร์ม',
    stock: 50,
    status: 'available',
    featured: true
  }, null, 2)).toString('base64'),
  
  '/data/operators/operator1.json': Buffer.from(JSON.stringify({
    id: 1,
    name: 'เซฟติสท์ฟาร์ม',
    description: 'ฟาร์มเกษตรอินทรีย์ที่ผลิตสบู่ธรรมชาติและผลไม้สด',
    type: 'farm',
    address: 'ชุมชนคลองบางมด กรุงเทพฯ',
    phone: '081-234-5678',
    email: 'info@safetistfarm.com',
    image: '/images/operators/operator1-main.webp',
    activities: ['ผลิตสบู่ธรรมชาติ', 'ปลูกผลไม้อินทรีย์', 'กิจกรรมท่องเที่ยว'],
    status: 'active',
    featured: true
  }, null, 2)).toString('base64')
};

// Check if we should use mock data
export const isDevelopmentMode = () => {
  const token = process.env.GITHUB_TOKEN;
  return process.env.NODE_ENV === 'development' || 
         !token || 
         token === 'ghp_fallback_token_for_development' ||
         token.startsWith('ghp_fallback');
};
