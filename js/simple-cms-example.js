/**
 * ตัวอย่างการใช้งาน CMS API แบบง่ายๆ
 * สำหรับผู้ที่เริ่มต้นใช้งาน
 */

// ========================================
// 🌟 ตัวอย่างที่ 1: ดึงข้อมูลบทความแบบง่าย
// ========================================

async function loadArticlesSimple() {
    console.log('📰 กำลังโหลดบทความ...');
    
    try {
        // 1. เรียก API เพื่อดึงข้อมูล
        const response = await fetch('http://localhost:1337/api/articles');
        
        // 2. ตรวจสอบว่า API ตอบสนองหรือไม่
        if (!response.ok) {
            throw new Error(`API ไม่ตอบสนอง: ${response.status}`);
        }
        
        // 3. แปลงข้อมูลเป็น JSON
        const articles = await response.json();
        
        // 4. แสดงข้อมูลใน Console
        console.log('✅ ดึงข้อมูลสำเร็จ:', articles);
        
        // 5. แสดงผลในหน้าเว็บ
        displayArticles(articles);
        
    } catch (error) {
        console.error('❌ เกิดข้อผิดพลาด:', error);
        showErrorMessage('ไม่สามารถโหลดข้อมูลบทความได้');
    }
}

// ========================================
// 🎨 ฟังก์ชันแสดงผลข้อมูล
// ========================================

function displayArticles(articles) {
    // หา element ที่จะแสดงผล
    const container = document.getElementById('articles-container');
    
    if (!container) {
        console.warn('⚠️ ไม่พบ element ที่ ID: articles-container');
        return;
    }
    
    if (articles.length === 0) {
        container.innerHTML = '<p>ไม่มีบทความในขณะนี้</p>';
        return;
    }
    
    // สร้าง HTML สำหรับแสดงบทความ
    let html = '<div class="articles-list">';
    
    articles.forEach(article => {
        html += `
            <div class="article-item">
                <h3>${article.title}</h3>
                <p>${article.description || 'ไม่มีคำอธิบาย'}</p>
                <small>วันที่: ${formatDate(article.created_at)}</small>
                <span class="status ${article.status}">${article.status}</span>
            </div>
        `;
    });
    
    html += '</div>';
    
    // แสดงผลในหน้าเว็บ
    container.innerHTML = html;
}

// ========================================
// 📦 ตัวอย่างที่ 2: ดึงข้อมูลสินค้า
// ========================================

async function loadProductsSimple() {
    console.log('📦 กำลังโหลดสินค้า...');
    
    try {
        const response = await fetch('http://localhost:1337/api/products');
        const products = await response.json();
        
        console.log('✅ ดึงข้อมูลสินค้าสำเร็จ:', products);
        displayProducts(products);
        
    } catch (error) {
        console.error('❌ เกิดข้อผิดพลาด:', error);
        showErrorMessage('ไม่สามารถโหลดข้อมูลสินค้าได้');
    }
}

function displayProducts(products) {
    const container = document.getElementById('products-container');
    
    if (!container) return;
    
    if (products.length === 0) {
        container.innerHTML = '<p>ไม่มีสินค้าในขณะนี้</p>';
        return;
    }
    
    let html = '<div class="products-grid">';
    
    products.forEach(product => {
        html += `
            <div class="product-item">
                <h3>${product.title}</h3>
                <p>${product.description || 'ไม่มีคำอธิบาย'}</p>
                <p class="price">ราคา: ${product.price || 'ไม่ระบุ'}</p>
                <span class="category">${product.category || 'ไม่ระบุหมวดหมู่'}</span>
            </div>
        `;
    });
    
    html += '</div>';
    container.innerHTML = html;
}

// ========================================
// ➕ ตัวอย่างที่ 3: เพิ่มบทความใหม่
// ========================================

async function addNewArticle() {
    console.log('➕ เพิ่มบทความใหม่...');
    
    // ข้อมูลบทความใหม่
    const articleData = {
        title: 'บทความทดสอบ',
        description: 'นี่คือบทความทดสอบที่สร้างจาก JavaScript',
        content: 'เนื้อหาของบทความทดสอบ...',
        author: 'ผู้ทดสอบ',
        category: 'ทดสอบ',
        status: 'draft'
    };
    
    try {
        // สร้าง FormData
        const formData = new FormData();
        formData.append('title', articleData.title);
        formData.append('description', articleData.description);
        formData.append('content', articleData.content);
        formData.append('author', articleData.author);
        formData.append('category', articleData.category);
        formData.append('status', articleData.status);
        
        // ส่งข้อมูลไปยัง API
        const response = await fetch('http://localhost:1337/api/articles', {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            throw new Error(`ไม่สามารถเพิ่มบทความได้: ${response.status}`);
        }
        
        const result = await response.json();
        console.log('✅ เพิ่มบทความสำเร็จ:', result);
        
        // โหลดข้อมูลใหม่
        loadArticlesSimple();
        
    } catch (error) {
        console.error('❌ เกิดข้อผิดพลาด:', error);
        alert('ไม่สามารถเพิ่มบทความได้: ' + error.message);
    }
}

// ========================================
// 🔄 ตัวอย่างที่ 4: โหลดข้อมูลทั้งหมด
// ========================================

async function loadAllData() {
    console.log('🔄 โหลดข้อมูลทั้งหมด...');
    
    try {
        // โหลดข้อมูลแบบพร้อมกัน (parallel)
        const [articlesResponse, productsResponse] = await Promise.all([
            fetch('http://localhost:1337/api/articles'),
            fetch('http://localhost:1337/api/products')
        ]);
        
        // แปลงข้อมูล
        const articles = await articlesResponse.json();
        const products = await productsResponse.json();
        
        console.log('✅ โหลดข้อมูลสำเร็จ:');
        console.log('- บทความ:', articles.length, 'รายการ');
        console.log('- สินค้า:', products.length, 'รายการ');
        
        // แสดงผล
        displayArticles(articles);
        displayProducts(products);
        
    } catch (error) {
        console.error('❌ เกิดข้อผิดพลาด:', error);
        showErrorMessage('ไม่สามารถโหลดข้อมูลได้');
    }
}

// ========================================
// 🛠️ ฟังก์ชันช่วยเหลือ
// ========================================

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function showErrorMessage(message) {
    const container = document.getElementById('error-message');
    if (container) {
        container.innerHTML = `
            <div style="background: #fed7d7; color: #e53e3e; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
                <strong>⚠️ ข้อผิดพลาด:</strong> ${message}
            </div>
        `;
    }
}

function showSuccessMessage(message) {
    const container = document.getElementById('success-message');
    if (container) {
        container.innerHTML = `
            <div style="background: #c6f6d5; color: #22543d; padding: 1rem; border-radius: 4px; margin: 1rem 0;">
                <strong>✅ สำเร็จ:</strong> ${message}
            </div>
        `;
    }
}

// ========================================
// 🚀 เริ่มต้นระบบ
// ========================================

// ฟังก์ชันที่เรียกใช้เมื่อหน้าเว็บโหลดเสร็จ
function initSimpleCMS() {
    console.log('🚀 เริ่มต้น Simple CMS Example...');
    
    // ตรวจสอบว่า CMS ทำงานอยู่หรือไม่
    checkCMSHealth();
    
    // โหลดข้อมูลเริ่มต้น
    loadAllData();
}

// ตรวจสอบสถานะ CMS
async function checkCMSHealth() {
    try {
        const response = await fetch('http://localhost:1337/api/health');
        const health = await response.json();
        console.log('✅ CMS พร้อมใช้งาน:', health.message);
    } catch (error) {
        console.error('❌ CMS ไม่พร้อมใช้งาน:', error);
        showErrorMessage('ไม่สามารถเชื่อมต่อกับ CMS ได้ กรุณาตรวจสอบว่าเซิร์ฟเวอร์ทำงานอยู่');
    }
}

// ========================================
// 🎯 ฟังก์ชันที่เรียกใช้จาก HTML
// ========================================

// ฟังก์ชันที่เรียกใช้จากปุ่มต่างๆ ในหน้าเว็บ
window.refreshData = loadAllData;
window.addArticle = addNewArticle;
window.loadArticles = loadArticlesSimple;
window.loadProducts = loadProductsSimple;

// เริ่มต้นเมื่อหน้าเว็บโหลดเสร็จ
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSimpleCMS);
} else {
    initSimpleCMS();
}
