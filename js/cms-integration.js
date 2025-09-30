/**
 * GreenBlueRest CMS Integration
 * ดึงข้อมูลจาก CMS API และแสดงผลบนหน้าเว็บ
 */

// ========================================
// 🔧 การตั้งค่า (Configuration)
// ========================================
const CMS_CONFIG = {
    // URL ของ CMS API (เซิร์ฟเวอร์ที่เราสร้างขึ้น)
    baseURL: 'http://localhost:1337/api',
    
    // จำนวนรายการที่แสดงในหน้าแรก
    itemsPerPage: 6,
    
    // ข้อมูลการแสดงผล
    display: {
        articles: {
            containerId: 'articles-container',
            title: 'บทความล่าสุด',
            showImage: true,
            showDescription: true,
            showDate: true
        },
        products: {
            containerId: 'products-container', 
            title: 'สินค้าชุมชนแนะนำ',
            showImage: true,
            showDescription: true,
            showPrice: true
        }
    }
};

// ========================================
// 🌐 API Service - จัดการการเรียก API
// ========================================
class CMSService {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    /**
     * ดึงข้อมูลบทความทั้งหมด
     * @param {number} limit - จำนวนรายการที่ต้องการ
     * @returns {Promise<Array>} รายการบทความ
     */
    async getArticles(limit = CMS_CONFIG.itemsPerPage) {
        try {
            console.log('📰 กำลังดึงข้อมูลบทความ...');
            const response = await fetch(`${this.baseURL}/articles`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const articles = await response.json();
            console.log(`✅ ดึงข้อมูลบทความสำเร็จ: ${articles.length} รายการ`);
            
            // จำกัดจำนวนรายการตามที่ต้องการ
            return articles.slice(0, limit);
        } catch (error) {
            console.error('❌ เกิดข้อผิดพลาดในการดึงข้อมูลบทความ:', error);
            return [];
        }
    }

    /**
     * ดึงข้อมูลสินค้าชุมชนทั้งหมด
     * @param {number} limit - จำนวนรายการที่ต้องการ
     * @returns {Promise<Array>} รายการสินค้า
     */
    async getProducts(limit = CMS_CONFIG.itemsPerPage) {
        try {
            console.log('📦 กำลังดึงข้อมูลสินค้าชุมชน...');
            const response = await fetch(`${this.baseURL}/products`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const products = await response.json();
            console.log(`✅ ดึงข้อมูลสินค้าชุมชนสำเร็จ: ${products.length} รายการ`);
            
            // จำกัดจำนวนรายการตามที่ต้องการ
            return products.slice(0, limit);
        } catch (error) {
            console.error('❌ เกิดข้อผิดพลาดในการดึงข้อมูลสินค้าชุมชน:', error);
            return [];
        }
    }

    /**
     * ดึงข้อมูลทริปท่องเที่ยวทั้งหมด
     * @param {number} limit - จำนวนรายการที่ต้องการ
     * @returns {Promise<Array>} รายการทริป
     */
    async getTrips(limit = CMS_CONFIG.itemsPerPage) {
        try {
            console.log('🗺️ กำลังดึงข้อมูลทริปท่องเที่ยว...');
            const response = await fetch(`${this.baseURL}/trips`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const trips = await response.json();
            console.log(`✅ ดึงข้อมูลทริปท่องเที่ยวสำเร็จ: ${trips.length} รายการ`);
            
            return trips.slice(0, limit);
        } catch (error) {
            console.error('❌ เกิดข้อผิดพลาดในการดึงข้อมูลทริปท่องเที่ยว:', error);
            return [];
        }
    }

    /**
     * ดึงข้อมูลวิดีโอทั้งหมด
     * @param {number} limit - จำนวนรายการที่ต้องการ
     * @returns {Promise<Array>} รายการวิดีโอ
     */
    async getVideos(limit = CMS_CONFIG.itemsPerPage) {
        try {
            console.log('🎥 กำลังดึงข้อมูลวิดีโอ...');
            const response = await fetch(`${this.baseURL}/videos`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const videos = await response.json();
            console.log(`✅ ดึงข้อมูลวิดีโอสำเร็จ: ${videos.length} รายการ`);
            
            return videos.slice(0, limit);
        } catch (error) {
            console.error('❌ เกิดข้อผิดพลาดในการดึงข้อมูลวิดีโอ:', error);
            return [];
        }
    }

    /**
     * ดึงข้อมูลผู้ประกอบการทั้งหมด
     * @param {number} limit - จำนวนรายการที่ต้องการ
     * @returns {Promise<Array>} รายการผู้ประกอบการ
     */
    async getEntrepreneurs(limit = CMS_CONFIG.itemsPerPage) {
        try {
            console.log('👥 กำลังดึงข้อมูลผู้ประกอบการ...');
            const response = await fetch(`${this.baseURL}/entrepreneurs`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const entrepreneurs = await response.json();
            console.log(`✅ ดึงข้อมูลผู้ประกอบการสำเร็จ: ${entrepreneurs.length} รายการ`);
            
            return entrepreneurs.slice(0, limit);
        } catch (error) {
            console.error('❌ เกิดข้อผิดพลาดในการดึงข้อมูลผู้ประกอบการ:', error);
            return [];
        }
    }
}

// ========================================
// 🎨 UI Renderer - จัดการการแสดงผล
// ========================================
class UIRenderer {
    constructor() {
        this.cmsService = new CMSService(CMS_CONFIG.baseURL);
    }

    /**
     * สร้าง HTML สำหรับแสดงบทความ
     * @param {Object} article - ข้อมูลบทความ
     * @returns {string} HTML string
     */
    createArticleCard(article) {
        // สร้าง URL สำหรับเข้าอ่านรายละเอียด
        const detailUrl = `pages/blog/article-detail.html?id=${article.id}`;
        
        // จัดรูปแบบวันที่
        const formattedDate = this.formatDate(article.created_at);
        
        // สร้าง HTML card
        return `
            <div class="blog-card" data-id="${article.id}">
                <div class="blog-card-image">
                    ${article.image_url 
                        ? `<img src="${CMS_CONFIG.baseURL.replace('/api', '')}${article.image_url}" 
                               alt="${article.title}" 
                               onerror="this.src='images/logo_001.webp'">`
                        : `<img src="images/logo_001.webp" alt="${article.title}">`
                    }
                </div>
                <div class="blog-card-content">
                    <h3 class="blog-card-title">
                        <a href="${detailUrl}">${article.title}</a>
                    </h3>
                    ${CMS_CONFIG.display.articles.showDescription && article.description 
                        ? `<p class="blog-card-excerpt">${article.description}</p>`
                        : ''
                    }
                    <div class="blog-card-meta">
                        ${CMS_CONFIG.display.articles.showDate 
                            ? `<span class="blog-card-date">${formattedDate}</span>`
                            : ''
                        }
                        <span class="blog-card-status ${article.status}">
                            ${article.status === 'published' ? 'เผยแพร่' : 'ร่าง'}
                        </span>
                    </div>
                    <div class="blog-card-actions">
                        <a href="${detailUrl}" class="btn btn-primary btn-sm">
                            อ่านต่อ
                        </a>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * สร้าง HTML สำหรับแสดงสินค้า
     * @param {Object} product - ข้อมูลสินค้า
     * @returns {string} HTML string
     */
    createProductCard(product) {
        // สร้าง URL สำหรับเข้าอ่านรายละเอียด
        const detailUrl = `pages/products/product-detail.html?id=${product.id}`;
        
        return `
            <div class="product-card" data-id="${product.id}">
                <div class="product-card-image">
                    ${product.image_url 
                        ? `<img src="${CMS_CONFIG.baseURL.replace('/api', '')}${product.image_url}" 
                               alt="${product.title}" 
                               onerror="this.src='images/logo_001.webp'">`
                        : `<img src="images/logo_001.webp" alt="${product.title}">`
                    }
                </div>
                <div class="product-card-content">
                    <h3 class="product-card-title">
                        <a href="${detailUrl}">${product.title}</a>
                    </h3>
                    ${CMS_CONFIG.display.products.showDescription && product.description 
                        ? `<p class="product-card-description">${product.description}</p>`
                        : ''
                    }
                    <div class="product-card-meta">
                        ${CMS_CONFIG.display.products.showPrice && product.price 
                            ? `<span class="product-card-price">${product.price}</span>`
                            : ''
                        }
                        ${product.category 
                            ? `<span class="product-card-category">${product.category}</span>`
                            : ''
                        }
                    </div>
                    <div class="product-card-actions">
                        <a href="${detailUrl}" class="btn btn-primary btn-sm">
                            ดูรายละเอียด
                        </a>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * แสดงรายการบทความ
     * @param {Array} articles - รายการบทความ
     */
    renderArticles(articles) {
        const container = document.getElementById(CMS_CONFIG.display.articles.containerId);
        
        if (!container) {
            console.warn(`⚠️ ไม่พบ container สำหรับบทความ: ${CMS_CONFIG.display.articles.containerId}`);
            return;
        }

        if (articles.length === 0) {
            container.innerHTML = `
                <div class="no-content">
                    <p>ไม่มีบทความในขณะนี้</p>
                </div>
            `;
            return;
        }

        // สร้าง HTML สำหรับแสดงบทความทั้งหมด
        const articlesHTML = articles.map(article => this.createArticleCard(article)).join('');
        
        // แสดงผล
        container.innerHTML = `
            <div class="section-header">
                <h2>${CMS_CONFIG.display.articles.title}</h2>
                <p>บทความและเรื่องราวน่าสนใจจากชุมชนคลองบางมด</p>
            </div>
            <div class="card-grid">
                ${articlesHTML}
            </div>
        `;

        console.log(`✅ แสดงบทความเรียบร้อย: ${articles.length} รายการ`);
    }

    /**
     * แสดงรายการสินค้า
     * @param {Array} products - รายการสินค้า
     */
    renderProducts(products) {
        const container = document.getElementById(CMS_CONFIG.display.products.containerId);
        
        if (!container) {
            console.warn(`⚠️ ไม่พบ container สำหรับสินค้า: ${CMS_CONFIG.display.products.containerId}`);
            return;
        }

        if (products.length === 0) {
            container.innerHTML = `
                <div class="no-content">
                    <p>ไม่มีสินค้าในขณะนี้</p>
                </div>
            `;
            return;
        }

        // สร้าง HTML สำหรับแสดงสินค้าทั้งหมด
        const productsHTML = products.map(product => this.createProductCard(product)).join('');
        
        // แสดงผล
        container.innerHTML = `
            <div class="section-header">
                <h2>${CMS_CONFIG.display.products.title}</h2>
                <p>สินค้าคุณภาพจากชุมชนคลองบางมด</p>
            </div>
            <div class="card-grid">
                ${productsHTML}
            </div>
        `;

        console.log(`✅ แสดงสินค้าชุมชนเรียบร้อย: ${products.length} รายการ`);
    }

    /**
     * แสดงข้อความโหลด
     * @param {string} containerId - ID ของ container
     * @param {string} message - ข้อความที่แสดง
     */
    showLoading(containerId, message = 'กำลังโหลด...') {
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = `
                <div class="loading">
                    <div class="loading-spinner"></div>
                    <p>${message}</p>
                </div>
            `;
        }
    }

    /**
     * แสดงข้อความข้อผิดพลาด
     * @param {string} containerId - ID ของ container
     * @param {string} message - ข้อความข้อผิดพลาด
     */
    showError(containerId, message = 'เกิดข้อผิดพลาดในการโหลดข้อมูล') {
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = `
                <div class="error-message">
                    <p>❌ ${message}</p>
                    <button onclick="location.reload()" class="btn btn-secondary">
                        ลองใหม่
                    </button>
                </div>
            `;
        }
    }

    /**
     * จัดรูปแบบวันที่
     * @param {string} dateString - วันที่ในรูปแบบ string
     * @returns {string} วันที่ที่จัดรูปแบบแล้ว
     */
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('th-TH', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
}

// ========================================
// 🚀 Main Application - จัดการแอปพลิเคชันหลัก
// ========================================
class CMSApp {
    constructor() {
        this.renderer = new UIRenderer();
        this.isInitialized = false;
    }

    /**
     * เริ่มต้นแอปพลิเคชัน
     */
    async init() {
        console.log('🚀 เริ่มต้น GreenBlueRest CMS Integration...');
        
        try {
            // ตรวจสอบว่า CMS API ทำงานอยู่หรือไม่
            await this.checkCMSHealth();
            
            // โหลดข้อมูลและแสดงผล
            await this.loadAndRenderData();
            
            this.isInitialized = true;
            console.log('✅ เริ่มต้นแอปพลิเคชันสำเร็จ');
            
        } catch (error) {
            console.error('❌ เกิดข้อผิดพลาดในการเริ่มต้นแอปพลิเคชัน:', error);
            this.showInitializationError(error);
        }
    }

    /**
     * ตรวจสอบสถานะของ CMS API
     */
    async checkCMSHealth() {
        try {
            const response = await fetch(`${CMS_CONFIG.baseURL}/health`);
            if (!response.ok) {
                throw new Error(`CMS API ไม่ตอบสนอง (HTTP ${response.status})`);
            }
            const health = await response.json();
            console.log('✅ CMS API พร้อมใช้งาน:', health.message);
        } catch (error) {
            throw new Error(`ไม่สามารถเชื่อมต่อกับ CMS API: ${error.message}`);
        }
    }

    /**
     * โหลดข้อมูลและแสดงผล
     */
    async loadAndRenderData() {
        // แสดงข้อความโหลด
        this.renderer.showLoading(CMS_CONFIG.display.articles.containerId, 'กำลังโหลดบทความ...');
        this.renderer.showLoading(CMS_CONFIG.display.products.containerId, 'กำลังโหลดสินค้า...');

        try {
            // โหลดข้อมูลแบบ parallel (พร้อมกัน)
            const [articles, products] = await Promise.all([
                this.renderer.cmsService.getArticles(),
                this.renderer.cmsService.getProducts()
            ]);

            // แสดงผล
            this.renderer.renderArticles(articles);
            this.renderer.renderProducts(products);

        } catch (error) {
            console.error('❌ เกิดข้อผิดพลาดในการโหลดข้อมูล:', error);
            this.renderer.showError(CMS_CONFIG.display.articles.containerId);
            this.renderer.showError(CMS_CONFIG.display.products.containerId);
        }
    }

    /**
     * แสดงข้อผิดพลาดในการเริ่มต้น
     * @param {Error} error - ข้อผิดพลาด
     */
    showInitializationError(error) {
        console.error('❌ ข้อผิดพลาดในการเริ่มต้น:', error);
        
        // แสดงข้อความข้อผิดพลาดในหน้าเว็บ
        const errorMessage = `
            <div style="padding: 20px; text-align: center; color: #e53e3e; background: #fed7d7; border-radius: 8px; margin: 20px;">
                <h3>⚠️ ไม่สามารถเชื่อมต่อกับระบบจัดการเนื้อหา</h3>
                <p>กรุณาตรวจสอบว่า CMS ทำงานอยู่ที่ <strong>http://localhost:1337</strong></p>
                <p>หรือติดต่อผู้ดูแลระบบ</p>
            </div>
        `;

        // แสดงใน container ที่มีอยู่
        const containers = [
            CMS_CONFIG.display.articles.containerId,
            CMS_CONFIG.display.products.containerId
        ];

        containers.forEach(containerId => {
            const container = document.getElementById(containerId);
            if (container) {
                container.innerHTML = errorMessage;
            }
        });
    }

    /**
     * รีเฟรชข้อมูล
     */
    async refresh() {
        console.log('🔄 รีเฟรชข้อมูล...');
        await this.loadAndRenderData();
    }
}

// ========================================
// 🎯 Global Functions - ฟังก์ชันที่เรียกใช้ได้จากภายนอก
// ========================================

// สร้าง instance ของแอปพลิเคชัน
const cmsApp = new CMSApp();

/**
 * เริ่มต้นระบบ CMS Integration
 * เรียกใช้เมื่อหน้าเว็บโหลดเสร็จ
 */
async function initCMS() {
    await cmsApp.init();
}

/**
 * รีเฟรชข้อมูลจาก CMS
 */
async function refreshCMSData() {
    await cmsApp.refresh();
}

/**
 * ดึงข้อมูลบทความล่าสุด
 * @param {number} limit - จำนวนรายการ
 * @returns {Promise<Array>} รายการบทความ
 */
async function getLatestArticles(limit = 3) {
    const service = new CMSService(CMS_CONFIG.baseURL);
    return await service.getArticles(limit);
}

/**
 * ดึงข้อมูลสินค้าล่าสุด
 * @param {number} limit - จำนวนรายการ
 * @returns {Promise<Array>} รายการสินค้า
 */
async function getLatestProducts(limit = 3) {
    const service = new CMSService(CMS_CONFIG.baseURL);
    return await service.getProducts(limit);
}

// ========================================
// 🔄 Auto-initialization - เริ่มต้นอัตโนมัติ
// ========================================

// เริ่มต้นเมื่อหน้าเว็บโหลดเสร็จ
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCMS);
} else {
    // หน้าเว็บโหลดเสร็จแล้ว
    initCMS();
}

// Export สำหรับการใช้งานใน ES6 modules
export { CMSService, UIRenderer, CMSApp, initCMS, refreshCMSData, getLatestArticles, getLatestProducts };
