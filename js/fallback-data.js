/**
 * Fallback Data - ใช้เมื่อ Strapi ไม่พร้อมใช้งาน
 * ข้อมูลพื้นฐานที่จำเป็นสำหรับการทำงานของเว็บไซต์
 */

export const fallbackData = {
  blogs: [
    {
      id: 1,
      title: "กินข้าวบ้านสวนป้าดา",
      excerpt: "สัมผัสรสชาติอาหารไทยต้นตำรับที่บ้านสวนป้าดา",
      image: "images/blog/blog1.webp",
      mainImage: "images/blog/blog1-main.webp",
      subImages: [],
      date: "2024-12-15",
      category: "blog",
      content: "<p>เนื้อหาบทความ...</p>",
      author: "ทีมงาน GreenBlueRest",
      slug: "กินข้าวบ้านสวนป้าดา"
    }
  ],
  vlogs: [
    {
      id: 1,
      title: "เที่ยวชุมชนบางมดใน 1 วัน",
      excerpt: "พาชมบรรยากาศการท่องเที่ยวชุมชนบางมดแบบจัดเต็ม",
      thumbnail: "images/vlog/vlog1.webp",
      youtubeId: "dQw4w9WgXcQ",
      date: "2024-12-18",
      category: "vlog",
      duration: "15:30"
    }
  ],
  trips: [
    {
      id: 1,
      name: "เที่ยวชุมชนท่องเที่ยวเชิงอนุรักษ์",
      shortDescription: "ทริปเรียนรู้วิถีชีวิตชุมชนและการอนุรักษ์สิ่งแวดล้อม",
      category: "ชุมชน",
      status: "published",
      image_url: "images/trip1/large/trip1.webp",
      slug: "เที่ยวชุมชนท่องเที่ยวเชิงอนุรักษ์",
      price: "800 บาท",
      duration: "1 วัน",
      capacity: "15 คน"
    }
  ],
  products: [
    {
      id: 1,
      name: "ผลิตภัณฑ์ชุมชนท้องถิ่น",
      description: "ผลิตภัณฑ์ชุมชนที่ทำจากวัตถุดิบธรรมชาติในท้องถิ่น",
      price: "150-300 บาท",
      category: "อาหาร",
      status: "published",
      image_url: "images/products/product1.webp",
      slug: "ผลิตภัณฑ์ชุมชนท้องถิ่น",
      producer: "ชุมชนบางมด",
      stock: "มีจำหน่าย"
    }
  ]
};