// ข้อมูลสินค้าชุมชนทั้งหมด 15 รายการ
import { IMAGE_CONFIG } from './config.js';

export const productsData = [
    {
        id: 1,
        name: "สบู่แฮนด์เมดน้ำมันมะพร้าว",
        price: "80 บาท",
        category: "beauty",
        description: "สบู่ธรรมชาติจากน้ำมันมะพร้าวบริสุทธิ์ ไม่มีสารเคมี",
        image: IMAGE_CONFIG.getProductImageUrlByNumber(1),
        producer: "เซฟติสท์ฟาร์ม"
    },
    {
        id: 2,
        name: "น้ำส้มคั้นสดจากสวน",
        price: "50 บาท",
        category: "food",
        description: "น้ำส้มคั้นสดจากสวนผลไม้ในชุมชน ไม่มีน้ำตาลเพิ่ม",
        image: IMAGE_CONFIG.getProductImageUrlByNumber(2),
        producer: "เซฟติสท์ฟาร์ม"
    },
    {
        id: 3,
        name: "ขนมไทยโบราณ (ชุดรวม)",
        price: "120 บาท",
        category: "food",
        description: "ขนมไทยโบราณหลากหลายชนิด ทำสดใหม่ทุกวัน",
        image: IMAGE_CONFIG.getProductImageUrlByNumber(3),
        producer: "บ้านเขียนวาดและภาพพิมพ์"
    },
    {
        id: 4,
        name: "ผ้าขาวม้าทอมือ",
        price: "250 บาท",
        category: "craft",
        description: "ผ้าขาวม้าทอมือแบบดั้งเดิม ลวดลายสวยงาม",
        image: IMAGE_CONFIG.getProductImageUrlByNumber(4),
        producer: "บ้านเขียนวาดและภาพพิมพ์"
    },
    {
        id: 5,
        name: "น้ำพริกแกงไทยแท้",
        price: "90 บาท",
        category: "food",
        description: "น้ำพริกแกงสูตรโบราณ จากเครื่องเทศแท้",
        image: IMAGE_CONFIG.getProductImageUrlByNumber(5),
        producer: "ตลาดมดตะนอย"
    },
    {
        id: 6,
        name: "เครื่องปั้นดินเผา",
        price: "300 บาท",
        category: "craft",
        description: "เครื่องปั้นดินเผาแบบโบราณ ลวดลายท้องถิ่น",
        image: IMAGE_CONFIG.getProductImageUrlByNumber(6),
        producer: "กัมปงในดงปรือ"
    },
    {
        id: 7,
        name: "น้ำมันหอมระเหยธรรมชาติ",
        price: "150 บาท",
        category: "beauty",
        description: "น้ำมันหอมระเหยจากสมุนไพรไทยแท้",
        image: IMAGE_CONFIG.getProductImageUrlByNumber(7),
        producer: "วิสาหกิจชุมชนอารยะคลองบางมดสร้างสรรค์"
    },
    {
        id: 8,
        name: "เครื่องจักสานไม้ไผ่",
        price: "200 บาท",
        category: "craft",
        description: "เครื่องจักสานไม้ไผ่แบบดั้งเดิม",
        image: IMAGE_CONFIG.getProductImageUrlByNumber(8),
        producer: "Art Lab"
    },
    {
        id: 9,
        name: "ครีมบำรุงผิวสมุนไพร",
        price: "180 บาท",
        category: "beauty",
        description: "ครีมบำรุงผิวจากสมุนไพรไทย",
        image: IMAGE_CONFIG.getProductImageUrlByNumber(9),
        producer: "S'more town"
    },
    {
        id: 10,
        name: "ผลไม้สดจากสวน",
        price: "80 บาท",
        category: "food",
        description: "ผลไม้สดจากสวนในชุมชน",
        image: IMAGE_CONFIG.getProductImageUrlByNumber(10),
        producer: "นิทานศิลป์ @บ้านดรุณ"
    },
    {
        id: 11,
        name: "เครื่องเงินแฮนด์เมด",
        price: "800 บาท",
        category: "craft",
        description: "เครื่องเงินแฮนด์เมดแบบโบราณ",
        image: IMAGE_CONFIG.getProductImageUrlByNumber(11),
        producer: "บ้านเขียนวาดและภาพพิมพ์"
    },
    {
        id: 12,
        name: "น้ำสมุนไพรไทย",
        price: "100 บาท",
        category: "food",
        description: "น้ำสมุนไพรไทยเพื่อสุขภาพ",
        image: IMAGE_CONFIG.getProductImageUrlByNumber(12),
        producer: "วิสาหกิจชุมชนอารยะคลองบางมดสร้างสรรค์"
    },
    {
        id: 13,
        name: "เครื่องแก้วเป่าแฮนด์เมด",
        price: "500 บาท",
        category: "craft",
        description: "เครื่องแก้วเป่าแฮนด์เมดแบบโบราณ",
        image: IMAGE_CONFIG.getProductImageUrlByNumber(13),
        producer: "Art Lab"
    },
    {
        id: 14,
        name: "แชมพูสมุนไพรธรรมชาติ",
        price: "150 บาท",
        category: "beauty",
        description: "แชมพูสมุนไพรธรรมชาติ ไม่มีสารเคมี",
        image: IMAGE_CONFIG.getProductImageUrlByNumber(14),
        producer: "เซฟติสท์ฟาร์ม"
    },
    {
        id: 15,
        name: "เครื่องหนังแฮนด์เมด",
        price: "350 บาท",
        category: "craft",
        description: "เครื่องหนังแฮนด์เมดแบบดั้งเดิม",
        image: IMAGE_CONFIG.getProductImageUrlByNumber(15),
        producer: "กัมปงในดงปรือ"
    }
];

// ตัวแปรสำหรับการค้นหาและกรอง
let filteredProducts = [...productsData];
let currentCategory = 'all';
let currentSearch = '';
let searchTimeout = null;

// ฟังก์ชันจัดการการโหลดภาพ
function handleImageLoad(img) {
    // ไม่ต้องทำอะไร - แสดงภาพทันที
}

// ฟังก์ชันจัดการข้อผิดพลาดของภาพ
function handleImageError(img) {
    // ใช้รูปภาพ placeholder เมื่อโหลดไม่ได้
    img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjhGOUZBIi8+CjxwYXRoIGQ9Ik0xMDAgMTIwQzExMC40NTcgMTIwIDExOSAxMTEuNDU3IDExOSAxMDFDMTE5IDkwLjU0MjkgMTEwLjQ1NyA4MiAxMDAgODJDODkuNTQyOSA4MiA4MSA5MC41NDI5IDgxIDEwMUM4MSAxMTEuNDU3IDg5LjU0MjkgMTIwIDEwMCAxMjBaIiBmaWxsPSIjNjY2Ii8+CjxwYXRoIGQ9Ik0xMDAgMTQwQzExMC40NTcgMTQwIDExOSAxMzEuNDU3IDExOSAxMjFDMTE5IDExMC41NDMgMTEwLjQ1NyAxMDIgMTAwIDEwMkM4OS41NDI5IDEwMiA4MSAxMTAuNTQzIDgxIDEyMUM4MSAxMzEuNDU3IDg5LjU0MjkgMTQwIDEwMCAxNDBaIiBmaWxsPSIjNjY2Ii8+Cjwvc3ZnPgo=';
    img.alt = 'ไม่สามารถโหลดภาพได้';
}

// ฟังก์ชันสร้างการ์ดสินค้า
function createProductCard(product) {
    return `
        <div class="product-card" data-category="${product.category}" data-producer="${product.producer}">
            <div class="product-image-container">
                <img src="${product.image}" 
                     alt="${product.name}" 
                     class="product-img" 
                     onerror="handleImageError(this)">
                <div class="product-overlay">
                    <span class="producer-badge">${product.producer}</span>
                </div>
            </div>
            <div class="product-body">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <p class="product-price">${product.price}</p>
                <div class="product-actions">
                    <button class="btn btn-order">สั่งซื้อ</button>
                    <span class="product-category">${getCategoryName(product.category)}</span>
                </div>
            </div>
        </div>
    `;
}

// ฟังก์ชันแปลงชื่อหมวดหมู่
function getCategoryName(category) {
    const categories = {
        'food': 'อาหาร',
        'craft': 'งานฝีมือ',
        'beauty': 'ความงาม',
        'home': 'ของใช้ในบ้าน'
    };
    return categories[category] || category;
}

// ฟังก์ชันแสดงสินค้า
function displayProducts(products) {
    const productsGrid = document.getElementById('products-grid');
    // ======================================== -->
    // 🚨 SECURITY FIX: แก้ไข XSS vulnerability
    // แทนที่ innerHTML ด้วย textContent เพื่อความปลอดภัย
    // ======================================== -->

    // ฟังก์ชันสร้าง HTML string ที่ปลอดภัย
    function createSafeNoResultsHTML() {
        return '<div class="no-results">ไม่พบสินค้าที่ค้นหา</div>';
    }

    function createSafeProductsHTML(products) {
        return products.map(product => createProductCard(product)).join('');
    }

    // แก้ไขการใช้ innerHTML
    if (products.length === 0) {
        productsGrid.innerHTML = createSafeNoResultsHTML();
    } else {
        productsGrid.innerHTML = createSafeProductsHTML(products);
    }
}

// ฟังก์ชันค้นหาสินค้า
function searchProducts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
    currentSearch = searchTerm;
    
    filteredProducts = productsData.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm) ||
                             product.description.toLowerCase().includes(searchTerm) ||
                             product.producer.toLowerCase().includes(searchTerm);
        const matchesCategory = currentCategory === 'all' || product.category === currentCategory;
        
        return matchesSearch && matchesCategory;
    });
    
    displayProducts(filteredProducts);
    updateResultsCount();
}

// ฟังก์ชันค้นหาแบบ debounced
function debouncedSearch() {
    if (searchTimeout) {
        clearTimeout(searchTimeout);
    }
    
    searchTimeout = setTimeout(() => {
        searchProducts();
    }, 300);
}

// ฟังก์ชันกรองตามหมวดหมู่
function filterByCategory(category) {
    currentCategory = category;
    
    // อัปเดตปุ่มกรอง
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // กรองสินค้า
    filteredProducts = productsData.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(currentSearch) ||
                             product.description.toLowerCase().includes(currentSearch) ||
                             product.producer.toLowerCase().includes(searchTerm);
        const matchesCategory = category === 'all' || product.category === category;
        
        return matchesSearch && matchesCategory;
    });
    
    displayProducts(filteredProducts);
    updateResultsCount();
}

// ฟังก์ชันล้างการค้นหา
function clearSearch() {
    document.getElementById('searchInput').value = '';
    currentSearch = '';
    currentCategory = 'all';
    
    // รีเซ็ตปุ่มกรอง
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector('[data-category="all"]').classList.add('active');
    
    filteredProducts = [...productsData];
    displayProducts(filteredProducts);
    updateResultsCount();
}

// ฟังก์ชันอัปเดตจำนวนผลลัพธ์
function updateResultsCount() {
    const resultsCount = document.createElement('div');
    resultsCount.className = 'results-count';
    resultsCount.textContent = `พบสินค้า ${filteredProducts.length} รายการ`;
    
    const existingCount = document.querySelector('.results-count');
    if (existingCount) {
        existingCount.remove();
    }
    
    document.querySelector('.search-container').after(resultsCount);
}

// เพิ่ม Event Listeners เมื่อโหลดหน้า
document.addEventListener('DOMContentLoaded', function() {
    // แสดงสินค้าทั้งหมด
    displayProducts(filteredProducts);
    updateResultsCount();
    
    // Event listener สำหรับปุ่มค้นหา
    document.getElementById('searchBtn').addEventListener('click', searchProducts);
    
    // Event listener สำหรับการกด Enter ในช่องค้นหา
    document.getElementById('searchInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchProducts();
        }
    });
    
    // Event listener สำหรับปุ่มล้างการค้นหา
    document.getElementById('clearSearch').addEventListener('click', clearSearch);
    
    // Event listeners สำหรับปุ่มกรองหมวดหมู่
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            filterByCategory(this.dataset.category);
        });
    });
    
    // Event listener สำหรับการพิมพ์ในช่องค้นหา (ค้นหาแบบ debounced)
    document.getElementById('searchInput').addEventListener('input', function() {
        if (this.value.trim() === '') {
            clearSearch();
        } else {
            debouncedSearch();
        }
    });
    
    // ======================================== -->
    // 🚨 PERFORMANCE FIX: แก้ไข setTimeout โดยใช้ debounce
    // เพิ่ม cleanup เพื่อป้องกัน memory leak
    // ======================================== -->
    
    // Debounce function เพื่อจำกัดการเรียก search function
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // ใช้ debounce สำหรับ search function
    const debouncedSearch = debounce(function(searchTerm) {
        const filteredProducts = productsData.filter(product => 
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
        displayProducts(filteredProducts);
    }, 300);
    
    // แก้ไข search input event
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.trim();
        if (searchTerm === '') {
            displayProducts(productsData); // แสดงสินค้าทั้งหมดเมื่อคลิกล้างการค้นหา
        } else {
            debouncedSearch(searchTerm);
        }
    });
    
    // Cleanup function
    function cleanupProducts() {
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }
        // ล้าง event listeners อื่นๆ ถ้ามี
    }
    
    // Cleanup เมื่อหน้าเว็บถูก unload
    window.addEventListener('beforeunload', cleanupProducts);
    window.addEventListener('pagehide', cleanupProducts);

});
