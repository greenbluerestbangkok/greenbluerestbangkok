/**
 * Strapi CMS Integration
 * ดึงข้อมูลจาก Strapi CMS แทนการใช้ข้อมูลใน blog-data.js
 */

const STRAPI_URL = 'http://localhost:1337';
const PRODUCTION_STRAPI_URL = 'https://your-strapi-app.vercel.app';

// ตรวจสอบว่าเป็น production หรือ development
const isProduction = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
const API_URL = isProduction ? PRODUCTION_STRAPI_URL : STRAPI_URL;

/**
 * ดึงข้อมูล Articles จาก Strapi
 */
async function fetchArticles() {
  try {
    const response = await fetch(`${API_URL}/api/articles?pagination[pageSize]=100&sort=publishedAt:desc`);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const data = await response.json();
    return data.data.map(article => ({
      id: article.id,
      title: article.attributes.title,
      excerpt: article.attributes.description,
      image: article.attributes.image_url || 'images/blog/placeholder.webp',
      mainImage: article.attributes.image_url || 'images/blog/placeholder.webp',
      subImages: [], // Strapi ไม่มี subImages ในตัวอย่างนี้
      date: new Date(article.attributes.published_at || article.attributes.createdAt).toISOString().split('T')[0],
      category: 'blog',
      content: article.attributes.content || '',
      author: article.attributes.author || 'ทีมงาน GreenBlueRest',
      slug: article.attributes.slug || article.attributes.title.toLowerCase().replace(/\s+/g, '-')
    }));
  } catch (error) {
    console.error('Error fetching articles from Strapi:', error);
    return [];
  }
}

/**
 * ดึงข้อมูล Trips จาก Strapi
 */
async function fetchTrips() {
  try {
    const response = await fetch(`${API_URL}/api/trips?pagination[pageSize]=100&sort=publishedAt:desc`);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const data = await response.json();
    return data.data.map(trip => ({
      id: trip.id,
      name: trip.attributes.name,
      shortDescription: trip.attributes.shortDescription,
      longDescription: trip.attributes.longDescription || trip.attributes.shortDescription,
      category: trip.attributes.category || 'ชุมชน',
      status: trip.attributes.status || 'published',
      image_url: trip.attributes.image_url || 'images/trip1/large/trip1.webp',
      slug: trip.attributes.slug || trip.attributes.name.toLowerCase().replace(/\s+/g, '-'),
      price: trip.attributes.price || '800 บาท',
      duration: trip.attributes.duration || '1 วัน',
      capacity: trip.attributes.capacity || '15 คน',
      published_at: trip.attributes.published_at || trip.attributes.createdAt
    }));
  } catch (error) {
    console.error('Error fetching trips from Strapi:', error);
    return [];
  }
}

/**
 * ดึงข้อมูล Products จาก Strapi
 */
async function fetchProducts() {
  try {
    const response = await fetch(`${API_URL}/api/products?pagination[pageSize]=100&sort=publishedAt:desc`);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const data = await response.json();
    return data.data.map(product => ({
      id: product.id,
      name: product.attributes.name,
      description: product.attributes.description,
      price: product.attributes.price || '150-300 บาท',
      category: product.attributes.category || 'อาหาร',
      status: product.attributes.status || 'published',
      image_url: product.attributes.image_url || 'images/products/product1.webp',
      slug: product.attributes.slug || product.attributes.name.toLowerCase().replace(/\s+/g, '-'),
      producer: product.attributes.producer || 'ชุมชนบางมด',
      stock: product.attributes.stock || 'มีจำหน่าย',
      published_at: product.attributes.published_at || product.attributes.createdAt
    }));
  } catch (error) {
    console.error('Error fetching products from Strapi:', error);
    return [];
  }
}

/**
 * ดึงข้อมูล Vlogs จาก Strapi (ถ้ามี)
 */
async function fetchVlogs() {
  try {
    const response = await fetch(`${API_URL}/api/videos?pagination[pageSize]=100&sort=publishedAt:desc`);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const data = await response.json();
    return data.data.map(video => ({
      id: video.id,
      title: video.attributes.title,
      excerpt: video.attributes.description,
      thumbnail: video.attributes.thumbnail_url || video.attributes.image_url || 'images/vlog/placeholder.webp',
      youtubeId: video.attributes.youtube_id || 'dQw4w9WgXcQ',
      date: new Date(video.attributes.published_at || video.attributes.createdAt).toISOString().split('T')[0],
      category: 'vlog',
      duration: video.attributes.duration || '15:00'
    }));
  } catch (error) {
    console.error('Error fetching vlogs from Strapi:', error);
    return [];
  }
}

/**
 * ดึงข้อมูลทั้งหมดพร้อมกัน
 */
async function fetchAllData() {
  try {
    const [articles, trips, products, vlogs] = await Promise.all([
      fetchArticles(),
      fetchTrips(),
      fetchProducts(),
      fetchVlogs()
    ]);

    return {
      blogs: articles,
      vlogs: vlogs,
      trips: trips,
      products: products
    };
  } catch (error) {
    console.error('Error fetching all data:', error);
    return {
      blogs: [],
      vlogs: [],
      trips: [],
      products: []
    };
  }
}

/**
 * ตรวจสอบการเชื่อมต่อ Strapi
 */
async function checkStrapiConnection() {
  try {
    const response = await fetch(`${API_URL}/api/health`);
    return response.ok;
  } catch (error) {
    return false;
  }
}

// Export functions for use in other files
window.StrapiIntegration = {
  fetchArticles,
  fetchTrips,
  fetchProducts,
  fetchVlogs,
  fetchAllData,
  checkStrapiConnection,
  API_URL
};

// Auto-fetch data when script loads (optional)
document.addEventListener('DOMContentLoaded', async () => {
  const isConnected = await checkStrapiConnection();
  if (isConnected) {
    console.log('✅ Strapi CMS connected successfully');
    // ข้อมูลจะถูกโหลดเมื่อมีการเรียกใช้
  } else {
    console.log('⚠️ Strapi CMS not available, using fallback data');
    // ใช้ข้อมูลจาก blog-data.js เป็น fallback
  }
});