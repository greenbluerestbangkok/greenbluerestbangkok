// ไฟล์ Config สำหรับจัดการ Path ของภาพ
// แก้ไขที่นี่เดียวเพื่อแก้ปัญหาทั้งหมด

export const IMAGE_CONFIG = {
    // Base URL สำหรับ Local Server และ GitHub Pages
    get BASE_URL() {
        // ตรวจสอบว่าเป็น Local Server หรือ GitHub Pages
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            return ''; // Local Server ไม่มี path
        } else {
            return '/greenbluerestbangkok'; // GitHub Pages
        }
    },
    
    // Path สำหรับโฟลเดอร์ต่างๆ
    PATHS: {
        BLOG: '/images/blog',
        VLOG: '/images/vlog', 
        OPERATORS: '/images/operators',
        TRIPS: '/images/trips',
        PRODUCTS: '/images/products',
        LOW_CARBON: '/images/low-carbon',
        HERO: '/images/hero',
        GENERAL: '/images/general',
        COVER: '/images/cover',
        QR: '/images/general'
    },
    
    // ฟังก์ชันสร้าง URL สำหรับภาพ
    getImageUrl: (folder, filename) => {
        return `${IMAGE_CONFIG.BASE_URL}${IMAGE_CONFIG.PATHS[folder]}/${filename}`;
    },
    
    // ฟังก์ชันสร้าง URL สำหรับภาพทริป
    getTripImageUrl: (tripId, size, filename) => {
        return `${IMAGE_CONFIG.BASE_URL}/images/trip${tripId}/${size}/${filename}`;
    },
    
    // ฟังก์ชันสร้าง URL สำหรับภาพทริปแบบใหม่ (ใช้ระบบเลข)
    getTripImageUrlByNumber: (tripId, size, imageNumber) => {
        const paddedTripId = tripId.toString().padStart(2, '0');
        const paddedImageNumber = imageNumber.toString().padStart(2, '0');
        return `${IMAGE_CONFIG.BASE_URL}/images/trip${paddedTripId}/${size}/trip_${paddedTripId}_${paddedImageNumber}.jpg`;
    },
    
    // ฟังก์ชันสร้าง URL สำหรับภาพสินค้าแบบใหม่ (ใช้ระบบเลข)
    getProductImageUrlByNumber: (productNumber) => {
        const paddedNumber = productNumber.toString().padStart(2, '0');
        return `${IMAGE_CONFIG.BASE_URL}/images/products/product_${paddedNumber}.jpg`;
    },
    
    // ฟังก์ชันสร้าง URL สำหรับภาพ blog แบบใหม่ (ใช้ระบบเลข)
    getBlogImageUrlByNumber: (blogNumber, imageNumber = 1) => {
        const paddedBlogNumber = blogNumber.toString().padStart(2, '0');
        const paddedImageNumber = imageNumber.toString().padStart(2, '0');
        return `${IMAGE_CONFIG.BASE_URL}/images/blog/blog_${paddedBlogNumber}_${paddedImageNumber}.jpg`;
    }
};

// สำหรับใช้ในไฟล์ที่ไม่ใช้ ES6 modules
if (typeof window !== 'undefined') {
    window.IMAGE_CONFIG = IMAGE_CONFIG;
}
