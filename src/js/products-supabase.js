// Products with Supabase Integration
// ดึงข้อมูลสินค้าจาก Supabase API

import { IMAGE_CONFIG } from './config.js';

// Supabase Configuration
const SUPABASE_URL = 'https://gmdvkegcejrbrobtrhfm.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdtZHZrZWdjZWpyYnJvYnRyaGZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyMzQ1NjYsImV4cCI6MjA3NDgxMDU2Nn0.n5iWM2P7G_vYs5VoIexeZ4N0ajkQtnKw8uqsCtzFZto';

// Function to fetch products from Supabase
async function fetchProductsFromSupabase() {
    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/products?status=eq.available&select=*`, {
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        
        const products = await response.json();
        return products;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

// Function to get product by ID from Supabase
async function getProductById(productId) {
    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/products?id=eq.${productId}&select=*`, {
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch product');
        }
        
        const products = await response.json();
        return products[0] || null;
    } catch (error) {
        console.error('Error fetching product:', error);
        return null;
    }
}

// Function to transform Supabase product data to match existing format
function transformProductData(supabaseProduct) {
    if (!supabaseProduct) return null;
    
    return {
        id: supabaseProduct.id,
        name: supabaseProduct.title,
        description: supabaseProduct.description,
        price: supabaseProduct.price,
        category: supabaseProduct.category,
        image: IMAGE_CONFIG.getProductImageUrl(supabaseProduct.id),
        status: supabaseProduct.status,
        createdAt: supabaseProduct.created_at,
        updatedAt: supabaseProduct.updated_at
    };
}

// Export functions for use in other modules
export { fetchProductsFromSupabase, getProductById, transformProductData };

// Legacy support - maintain existing productsData structure
let productsData = [];

// Initialize products data from Supabase
async function initializeProductsData() {
    try {
        const supabaseProducts = await fetchProductsFromSupabase();
        productsData = supabaseProducts.map(transformProductData).filter(product => product !== null);
        console.log('Products data loaded from Supabase:', productsData.length, 'products');
    } catch (error) {
        console.error('Failed to initialize products data:', error);
        // Fallback to empty array
        productsData = [];
    }
}

// Initialize on module load
initializeProductsData();

// Export the productsData for backward compatibility
export { productsData };

// Function to get all products
export function getAllProducts() {
    return productsData;
}

// Function to get product by ID
export function getProductByIdLegacy(id) {
    return productsData.find(product => product.id === parseInt(id));
}

// Function to get products by category
export function getProductsByCategory(category) {
    return productsData.filter(product => product.category === category);
}

// Function to search products
export function searchProducts(query) {
    const lowercaseQuery = query.toLowerCase();
    return productsData.filter(product => 
        product.name.toLowerCase().includes(lowercaseQuery) ||
        product.description.toLowerCase().includes(lowercaseQuery) ||
        product.category.toLowerCase().includes(lowercaseQuery)
    );
}

// Function to get product categories
export function getProductCategories() {
    const categories = [...new Set(productsData.map(product => product.category))];
    return categories;
}

// Function to load and display all products on products page
export async function loadProductsGrid() {
    try {
        console.log('Loading all products for products page...');
        const supabaseProducts = await fetchProductsFromSupabase();
        
        if (supabaseProducts.length === 0) {
            console.log('No products found in Supabase');
            displayNoProducts();
            return;
        }
        
        // Transform and display products
        const products = supabaseProducts.map(p => ({
            id: p.id,
            name: p.name,
            price: p.price,
            category: p.category,
            description: p.description,
            image: p.image_url || `../images/webp/products/product_${String(p.id).padStart(2, '0')}.webp`,
            producer: p.producer
        }));
        
        displayProducts(products);
        setupProductFilters(products);
        
    } catch (error) {
        console.error('Error loading products:', error);
        displayNoProducts();
    }
}

// Function to display products
function displayProducts(products) {
    const productsGrid = document.getElementById('products-grid');
    
    if (!productsGrid) {
        console.error('Products grid container not found');
        return;
    }
    
    productsGrid.innerHTML = products.map(product => `
        <div class="product-card" data-category="${product.category}">
            <div class="product-image">
                <img src="${product.image}" 
                     alt="${product.name}" 
                     class="product-img"
                     loading="lazy"
                     onerror="this.src='../images/webp/products/product_01.webp'">
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <p class="product-producer">ผู้ผลิต: ${product.producer}</p>
                <div class="product-price">${product.price}</div>
                <button class="btn btn-order">สั่งซื้อ</button>
            </div>
        </div>
    `).join('');
    
    console.log(`Displayed ${products.length} products`);
    
    // Setup masonry layout
    setupMasonryLayout(productsGrid);
    
    // Setup order buttons
    setupOrderButtons();
}

// Function to display no products message
function displayNoProducts() {
    const productsGrid = document.getElementById('products-grid');
    if (productsGrid) {
        productsGrid.innerHTML = `
            <div class="no-products-message" style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: #666;">
                <p>ยังไม่มีสินค้าในขณะนี้</p>
                <p class="text-sm">กรุณาเพิ่มสินค้าผ่าน Admin Panel</p>
            </div>
        `;
    }
}

// Function to setup masonry layout
function setupMasonryLayout(grid) {
    function resizeGridItem(item) {
        const styles = window.getComputedStyle(grid);
        const rowHeight = parseInt(styles.getPropertyValue('grid-auto-rows')) || 8;
        const rowGap = parseInt(styles.getPropertyValue('gap')) || 12;
        const contentHeight = item.offsetHeight;
        const span = Math.ceil((contentHeight + rowGap) / (rowHeight + rowGap));
        item.style.gridRowEnd = `span ${span}`;
    }
    
    function resizeAll() {
        grid.querySelectorAll('.product-card').forEach(resizeGridItem);
    }
    
    requestAnimationFrame(resizeAll);
    
    grid.querySelectorAll('img.product-img').forEach(img => {
        if (img.complete) {
            resizeAll();
        } else {
            img.addEventListener('load', resizeAll);
            img.addEventListener('error', resizeAll);
        }
    });
    
    window.addEventListener('resize', resizeAll);
}

// Function to setup product filters
function setupProductFilters(products) {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productsGrid = document.getElementById('products-grid');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const clearSearch = document.getElementById('clearSearch');
    
    // Category filters
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.dataset.category;
            
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter products
            let filteredProducts = products;
            if (category !== 'all') {
                filteredProducts = products.filter(product => product.category === category);
            }
            
            displayProducts(filteredProducts);
        });
    });
    
    // Search functionality
    function filterProducts() {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.producer.toLowerCase().includes(searchTerm)
        );
        
        displayProducts(filteredProducts);
    }
    
    searchBtn.addEventListener('click', filterProducts);
    searchInput.addEventListener('input', filterProducts);
    clearSearch.addEventListener('click', () => {
        searchInput.value = '';
        displayProducts(products);
    });
}

// Function to setup order buttons
function setupOrderButtons() {
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn-order')) {
            const productName = e.target.closest('.product-card').querySelector('.product-name').textContent;
            const lineUrl = `https://line.me/R/ti/p/@greenbluerestbangkok?text=สนใจสั่งซื้อ '${productName}'`;
            window.open(lineUrl, '_blank');
        }
    });
}
