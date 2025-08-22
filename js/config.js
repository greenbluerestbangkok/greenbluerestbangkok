// ไฟล์ Config สำหรับจัดการ Path ของภาพ
// แก้ไขที่นี่เดียวเพื่อแก้ปัญหาทั้งหมด

export const IMAGE_CONFIG = {
    // Base URL สำหรับ GitHub Pages
    BASE_URL: '/greenbluerestbangkok',
    
    // Path สำหรับโฟลเดอร์ต่างๆ
    PATHS: {
        BLOG: '/images/blog',
        VLOG: '/images/vlog', 
        OPERATORS: '/images/operators',
        TRIPS: '/images/trips',
        PRODUCTS: '/images/products',
        LOW_CARBON: '/images/low-carbon',
        HERO: '/images/hero',
        GENERAL: '/images/general'
    },
    
    // ฟังก์ชันสร้าง URL สำหรับภาพ
    getImageUrl: (folder, filename) => {
        return `${IMAGE_CONFIG.BASE_URL}${IMAGE_CONFIG.PATHS[folder]}/${filename}`;
    },
    
    // ฟังก์ชันสร้าง URL สำหรับภาพทริป
    getTripImageUrl: (tripId, size, filename) => {
        return `${IMAGE_CONFIG.BASE_URL}/images/trip${tripId}/${size}/${filename}`;
    }
};

// สำหรับใช้ในไฟล์ที่ไม่ใช้ ES6 modules
if (typeof window !== 'undefined') {
    window.IMAGE_CONFIG = IMAGE_CONFIG;
}
