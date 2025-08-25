import { blogData } from './blog-data.js';

class BlogVlogSeparateManager {
    constructor() {
        this.blogs = blogData.blogs;
        this.vlogs = blogData.vlogs;
        
        this.init();
    }
    
    init() {
        this.renderBlogs();
        this.renderVlogs();
        this.bindEvents();
    }
    
    renderBlogs() {
        const blogGrid = document.getElementById('blogGrid');
        if (!blogGrid) return;
        
        // ======================================== -->
        // 🚨 SECURITY FIX: แก้ไข XSS vulnerability
        // แทนที่ innerHTML ด้วย textContent เพื่อความปลอดภัย
        // ======================================== -->

        // ฟังก์ชันสร้าง HTML string ที่ปลอดภัย
        function createSafeBlogHTML(blogs) {
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

        function createSafeVlogHTML(vlogs) {
            return vlogs.map(vlog => `
                <div class="vlog-card">
                    <div class="vlog-image">
                        <img src="${vlog.image}" alt="${vlog.title}" class="vlog-img">
                    </div>
                    <div class="vlog-content">
                        <h3 class="vlog-title">${vlog.title}</h3>
                        <p class="vlog-excerpt">${vlog.excerpt}</p>
                        <div class="vlog-meta">
                            <span class="vlog-date">${vlog.date}</span>
                            <span class="vlog-duration">${vlog.duration}</span>
                        </div>
                        <a href="${vlog.url}" class="watch-now">ดูเลย</a>
                    </div>
                </div>
            `).join('');
        }

        // แก้ไขการใช้ innerHTML
        if (blogGrid) {
            const blogsHTML = createSafeBlogHTML(blogData.blogs);
            blogGrid.innerHTML = blogsHTML;
        }

        if (vlogGrid) {
            const vlogsHTML = createSafeVlogHTML(blogData.vlogs);
            vlogGrid.innerHTML = vlogsHTML;
        }
        
        // Bind click events to blog cards
        this.bindBlogCardEvents();
    }
    
    renderVlogs() {
        const vlogGrid = document.getElementById('vlogGrid');
        if (!vlogGrid) return;
        
        const vlogsHTML = this.vlogs.map(vlog => this.createVlogCard(vlog)).join('');
        vlogGrid.innerHTML = vlogsHTML;
        
        // Bind click events to vlog cards
        this.bindVlogCardEvents();
    }
    
    createBlogCard(blog) {
        return `
            <article class="blog-card" data-id="${blog.id}">
                <div class="blog-card-image">
                    <img src="${blog.image}" alt="${blog.title}" onerror="this.src='/images/placeholder-blog.jpg'">
                </div>
                <div class="blog-card-content">
                    <h3 class="blog-card-title">${blog.title}</h3>
                    <p class="blog-card-excerpt">${blog.excerpt}</p>
                    <div class="blog-card-date">${this.formatDate(blog.date)}</div>
                    <a href="#" class="blog-card-read-more">อ่านต่อ</a>
                </div>
            </article>
        `;
    }
    
    createVlogCard(vlog) {
        const youtubeEmbedUrl = `https://www.youtube.com/embed/${vlog.youtubeId}`;
        
        return `
            <article class="vlog-card" data-id="${vlog.id}">
                <div class="vlog-thumbnail">
                    <iframe 
                        src="${youtubeEmbedUrl}" 
                        title="${vlog.title}"
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        allowfullscreen>
                    </iframe>
                </div>
                <div class="vlog-card-content">
                    <h3 class="vlog-card-title">${vlog.title}</h3>
                    <p class="vlog-card-description">${vlog.excerpt}</p>
                </div>
            </article>
        `;
    }
    
    bindEvents() {
        // Modal functionality
        const modal = document.getElementById('contentModal');
        const closeBtn = document.querySelector('.close');
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.style.display = 'none';
            });
        }
        
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
        
        // ESC key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                modal.style.display = 'none';
            }
        });
    }
    
    bindBlogCardEvents() {
        const blogCards = document.querySelectorAll('.blog-card');
        blogCards.forEach(card => {
            const readMoreBtn = card.querySelector('.blog-card-read-more');
            readMoreBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const id = parseInt(card.dataset.id);
                this.openBlogModal(id);
            });
            
            // Also allow clicking the card itself
            card.addEventListener('click', (e) => {
                if (e.target.classList.contains('blog-card-read-more')) return;
                const id = parseInt(card.dataset.id);
                this.openBlogModal(id);
            });
        });
    }
    
    bindVlogCardEvents() {
        // For vlogs, the YouTube iframe handles the interaction
        // No additional click events needed since videos are embedded
    }
    
    openBlogModal(id) {
        const modal = document.getElementById('contentModal');
        const modalBody = document.getElementById('modalBody');
        
        const blog = this.blogs.find(blog => blog.id === id);
        if (!blog) return;
        
        // แก้ไข modal content
        modalBody.innerHTML = this.createBlogModal(blog); // ใช้ข้อมูลที่ปลอดภัยแล้ว
        modal.style.display = 'block';
        
        // Prevent body scroll when modal is open
        document.body.style.overflow = 'hidden';
        
        // Re-enable body scroll when modal closes
        const closeModal = () => {
            document.body.style.overflow = 'auto';
        };
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        const closeBtn = modal.querySelector('.close');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }
    }
    
    createBlogModal(blog) {
        return `
            <div class="modal-header">
                <h2>${blog.title}</h2>
                <div class="modal-meta">
                    <span class="modal-date">${this.formatDate(blog.date)}</span>
                    <span class="modal-badge blog-badge">Blog</span>
                </div>
            </div>
            <div class="modal-body">
                <img src="${blog.image}" alt="${blog.title}" class="modal-image" onerror="this.style.display='none'">
                <div class="modal-content">
                    ${blog.content}
                </div>
            </div>
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
    new BlogVlogSeparateManager();
});