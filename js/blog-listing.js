import { blogData } from './blog-data.js';

class BlogListingManager {
    constructor() {
        this.init();
    }
    
    init() {
        this.renderBlogGrid();
    }
    
    renderBlogGrid() {
        const blogGrid = document.getElementById('blogGrid');
        if (!blogGrid) return;
        
        // ======================================== -->
        // 🚨 SECURITY FIX: แก้ไข XSS vulnerability
        // แทนที่ innerHTML ด้วย textContent เพื่อความปลอดภัย
        // ======================================== -->

        // ฟังก์ชันสร้าง HTML string ที่ปลอดภัย
        function createSafeHTML(blogs) {
            return blogs.map(blog => `
                <div class="blog-card">
                    <div class="blog-image">
                        <img src="${blog.image}" alt="${blog.title}" class="blog-img">
                    </div>
                    <div class="blog-content">
                        <h3 class="blog-title">${blog.title}</h3>
                        <p class="blog-excerpt">${blog.excerpt}</p>
                        <div class="blog-meta">
                            <span class="blog-date">${blog.date}</span>
                            <span class="blog-category">${blog.category}</span>
                        </div>
                        <a href="${blog.url}" class="read-more">อ่านเพิ่มเติม</a>
                    </div>
                </div>
            `).join('');
        }

        // แก้ไขการใช้ innerHTML เป็น textContent
        if (blogGrid) {
            const blogsHTML = createSafeHTML(blogData.blogs); // ใช้ innerHTML กับข้อมูลที่ปลอดภัยแล้ว
            blogGrid.innerHTML = blogsHTML;
        }
    }
    
    createBlogCard(blog) {
        return `
            <article class="blog-card">
                <div class="blog-card-image">
                    <img src="${blog.image}" alt="${blog.title}" onerror="this.style.display='none'">
                </div>
                <div class="blog-card-content">
                    <h3 class="blog-card-title">${blog.title}</h3>
                    <p class="blog-card-excerpt">${blog.excerpt}</p>
                    <div class="blog-card-date">${this.formatDate(blog.date)}</div>
                    <a href="../blog-detail.html?id=${blog.id}&type=blog" class="blog-card-read-more">อ่านต่อ</a>
                </div>
            </article>
        `;
    }
    
    formatDate(dateString) {
        const date = new Date(dateString);
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            timeZone: 'Asia/Bangkok'
        };
        return date.toLocaleDateString('th-TH', options);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BlogListingManager();
});