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
        
        const blogsHTML = blogData.blogs.map(blog => this.createBlogCard(blog)).join('');
        blogGrid.innerHTML = blogsHTML;
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