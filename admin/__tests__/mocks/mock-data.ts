// Mock data for development and testing
export interface MockArticle {
  id: number;
  title: string;
  description: string;
  content: string;
  image?: string;
  slug: string;
  status: 'published' | 'draft' | 'archived';
  createdAt: string;
  updatedAt: string;
}

export interface MockProduct {
  id: number;
  name: string;
  description: string;
  price?: number;
  image?: string;
  slug: string;
  status: 'published' | 'draft' | 'archived';
  createdAt: string;
  updatedAt: string;
}

export interface MockTrip {
  id: number;
  name: string;
  description: string;
  duration?: string;
  price?: number;
  image?: string;
  slug: string;
  status: 'published' | 'draft' | 'archived';
  createdAt: string;
  updatedAt: string;
}

// Mock Articles Data
export const MOCK_ARTICLES: MockArticle[] = [
  {
    id: 1,
    title: 'การท่องเที่ยวชุมชนยั่งยืนในย่านคลองบางมด',
    description: 'เรียนรู้เกี่ยวกับการท่องเที่ยวชุมชนที่ยั่งยืนและเป็นมิตรกับสิ่งแวดล้อม',
    content: 'เนื้อหาบทความเกี่ยวกับการท่องเที่ยวชุมชน...',
    image: '/images/blog/blog1-main.webp',
    slug: 'sustainable-community-tourism-bangmot',
    status: 'published',
    createdAt: '2024-01-15T08:00:00Z',
    updatedAt: '2024-01-15T08:00:00Z'
  },
  {
    id: 2,
    title: 'วิถีชีวิตชุมชนริมน้ำคลองบางมด',
    description: 'สำรวจวิถีชีวิตและวัฒนธรรมของชุมชนริมน้ำ',
    content: 'เนื้อหาบทความเกี่ยวกับวิถีชีวิตชุมชน...',
    image: '/images/blog/blog2-main.webp',
    slug: 'waterfront-community-lifestyle',
    status: 'published',
    createdAt: '2024-01-16T08:00:00Z',
    updatedAt: '2024-01-16T08:00:00Z'
  },
  {
    id: 3,
    title: 'การอนุรักษ์สิ่งแวดล้อมผ่านการท่องเที่ยว',
    description: 'วิธีการท่องเที่ยวที่ช่วยอนุรักษ์สิ่งแวดล้อม',
    content: 'เนื้อหาบทความเกี่ยวกับการอนุรักษ์สิ่งแวดล้อม...',
    image: '/images/blog/blog3-main.webp',
    slug: 'environmental-conservation-tourism',
    status: 'published',
    createdAt: '2024-01-17T08:00:00Z',
    updatedAt: '2024-01-17T08:00:00Z'
  },
  {
    id: 4,
    title: 'อาหารพื้นบ้านย่านคลองบางมด',
    description: 'รสชาติแห่งท้องถิ่นและวัฒนธรรมอาหาร',
    content: 'เนื้อหาบทความเกี่ยวกับอาหารพื้นบ้าน...',
    image: '/images/blog/blog4-main.webp',
    slug: 'local-food-bangmot',
    status: 'draft',
    createdAt: '2024-01-18T08:00:00Z',
    updatedAt: '2024-01-18T08:00:00Z'
  },
  {
    id: 5,
    title: 'กิจกรรมเรียนรู้วัฒนธรรมท้องถิ่น',
    description: 'กิจกรรมที่น่าสนใจสำหรับการเรียนรู้วัฒนธรรม',
    content: 'เนื้อหาบทความเกี่ยวกับกิจกรรมเรียนรู้...',
    image: '/images/blog/blog5-main.webp',
    slug: 'cultural-learning-activities',
    status: 'draft',
    createdAt: '2024-01-19T08:00:00Z',
    updatedAt: '2024-01-19T08:00:00Z'
  }
];

// Mock Products Data
export const MOCK_PRODUCTS: MockProduct[] = [
  {
    id: 1,
    name: 'ผ้าปักมือจากชุมชนคลองบางมด',
    description: 'ผ้าปักมือที่ทำด้วยเทคนิคดั้งเดิมของชุมชน',
    price: 450,
    image: '/images/products/product1.webp',
    slug: 'hand-embroidered-fabric',
    status: 'published',
    createdAt: '2024-01-10T08:00:00Z',
    updatedAt: '2024-01-10T08:00:00Z'
  },
  {
    id: 2,
    name: 'เครื่องปั้นดินเผาท้องถิ่น',
    description: 'เครื่องปั้นดินเผาที่ทำด้วยดินท้องถิ่น',
    price: 320,
    image: '/images/products/product2.webp',
    slug: 'local-pottery',
    status: 'published',
    createdAt: '2024-01-11T08:00:00Z',
    updatedAt: '2024-01-11T08:00:00Z'
  },
  {
    id: 3,
    name: 'น้ำผึ้งธรรมชาติจากป่าชุมชน',
    description: 'น้ำผึ้งธรรมชาติที่เก็บจากป่าชุมชน',
    price: 180,
    image: '/images/products/product3.webp',
    slug: 'natural-honey',
    status: 'published',
    createdAt: '2024-01-12T08:00:00Z',
    updatedAt: '2024-01-12T08:00:00Z'
  },
  {
    id: 4,
    name: 'เครื่องจักสานจากกก',
    description: 'เครื่องจักสานที่ทำจากกกธรรมชาติ',
    price: 250,
    image: '/images/products/product4.webp',
    slug: 'woven-rush-products',
    status: 'published',
    createdAt: '2024-01-13T08:00:00Z',
    updatedAt: '2024-01-13T08:00:00Z'
  },
  {
    id: 5,
    name: 'ผลิตภัณฑ์จากผักตบชวา',
    description: 'ผลิตภัณฑ์ที่ทำจากผักตบชวาที่นำกลับมาใช้ใหม่',
    price: 150,
    image: '/images/products/product5.webp',
    slug: 'water-hyacinth-products',
    status: 'draft',
    createdAt: '2024-01-14T08:00:00Z',
    updatedAt: '2024-01-14T08:00:00Z'
  }
];

// Mock Trips Data
export const MOCK_TRIPS: MockTrip[] = [
  {
    id: 1,
    name: 'ทริปเรียนรู้วิถีชุมชนริมน้ำ',
    description: 'สำรวจวิถีชีวิตชุมชนริมน้ำคลองบางมด',
    duration: '4 ชั่วโมง',
    price: 800,
    image: '/images/trip1/large/trip1-main.webp',
    slug: 'waterfront-community-experience',
    status: 'published',
    createdAt: '2024-01-05T08:00:00Z',
    updatedAt: '2024-01-05T08:00:00Z'
  },
  {
    id: 2,
    name: 'ทริปอนุรักษ์สิ่งแวดล้อม',
    description: 'เรียนรู้การอนุรักษ์สิ่งแวดล้อมและระบบนิเวศ',
    duration: '6 ชั่วโมง',
    price: 1200,
    image: '/images/trip2/large/trip2-main.webp',
    slug: 'environmental-conservation-trip',
    status: 'published',
    createdAt: '2024-01-06T08:00:00Z',
    updatedAt: '2024-01-06T08:00:00Z'
  },
  {
    id: 3,
    name: 'ทริปอาหารพื้นบ้าน',
    description: 'ลิ้มรสอาหารพื้นบ้านและเรียนรู้การทำอาหาร',
    duration: '3 ชั่วโมง',
    price: 600,
    image: '/images/trip3/large/trip3-main.webp',
    slug: 'local-food-experience',
    status: 'published',
    createdAt: '2024-01-07T08:00:00Z',
    updatedAt: '2024-01-07T08:00:00Z'
  },
  {
    id: 4,
    name: 'ทริปศิลปะและหัตถกรรม',
    description: 'เรียนรู้ศิลปะและหัตถกรรมท้องถิ่น',
    duration: '5 ชั่วโมง',
    price: 1000,
    image: '/images/trip4/large/trip4-main.webp',
    slug: 'arts-crafts-experience',
    status: 'published',
    createdAt: '2024-01-08T08:00:00Z',
    updatedAt: '2024-01-08T08:00:00Z'
  },
  {
    id: 5,
    name: 'ทริปเรือไฟฟ้า',
    description: 'ท่องเที่ยวด้วยเรือไฟฟ้าที่เป็นมิตรกับสิ่งแวดล้อม',
    duration: '2 ชั่วโมง',
    price: 400,
    image: '/images/trip5/large/trip5-main.webp',
    slug: 'electric-boat-tour',
    status: 'draft',
    createdAt: '2024-01-09T08:00:00Z',
    updatedAt: '2024-01-09T08:00:00Z'
  }
];

// Helper functions
export function getMockArticles(): MockArticle[] {
  return MOCK_ARTICLES;
}

export function getMockProducts(): MockProduct[] {
  return MOCK_PRODUCTS;
}

export function getMockTrips(): MockTrip[] {
  return MOCK_TRIPS;
}

export function getMockArticleById(id: number): MockArticle | undefined {
  return MOCK_ARTICLES.find(article => article.id === id);
}

export function getMockProductById(id: number): MockProduct | undefined {
  return MOCK_PRODUCTS.find(product => product.id === id);
}

export function getMockTripById(id: number): MockTrip | undefined {
  return MOCK_TRIPS.find(trip => trip.id === id);
}

export function getMockStats() {
  const articles = getMockArticles();
  const products = getMockProducts();
  const trips = getMockTrips();
  
  const allContent = [...articles, ...products, ...trips];
  const publishedContent = allContent.filter(item => item.status === 'published');
  const draftContent = allContent.filter(item => item.status === 'draft');
  
  return {
    totalContent: allContent.length,
    publishedContent: publishedContent.length,
    draftContent: draftContent.length,
    totalMedia: 0 // Media count would need separate tracking
  };
}