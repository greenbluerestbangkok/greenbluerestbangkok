// ไฟล์ Helper สำหรับจัดการ Path ของภาพ
// ใช้แก้ปัญหาการแสดงภาพบน GitHub Pages

const IMAGE_BASE_URL = '/greenbluerestbangkok';

// ฟังก์ชันสร้าง URL สำหรับภาพ
function getImageUrl(folder, filename) {
    return `${IMAGE_BASE_URL}/images/${folder}/${filename}`;
}

// ฟังก์ชันสร้าง URL สำหรับภาพทริป
function getTripImageUrl(tripId, size, filename) {
    return `${IMAGE_BASE_URL}/images/trip${tripId}/${size}/${filename}`;
}

// ฟังก์ชันสร้าง URL สำหรับภาพสินค้า
function getProductImageUrl(filename) {
    return `${IMAGE_BASE_URL}/images/products/${filename}`;
}

// ฟังก์ชันสร้าง URL สำหรับโลโก้ผู้ประกอบการ
function getOperatorImageUrl(filename) {
    return `${IMAGE_BASE_URL}/images/operators/${filename}`;
}

// ฟังก์ชันสร้าง URL สำหรับภาพ Blog
function getBlogImageUrl(filename) {
    return `${IMAGE_BASE_URL}/images/blog/${filename}`;
}

// Export สำหรับใช้ในไฟล์อื่น
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        getImageUrl,
        getTripImageUrl,
        getProductImageUrl,
        getOperatorImageUrl,
        getBlogImageUrl
    };
} else {
    // สำหรับใช้ในเบราว์เซอร์
    window.ImageHelper = {
        getImageUrl,
        getTripImageUrl,
        getProductImageUrl,
        getOperatorImageUrl,
        getBlogImageUrl
    };
}
