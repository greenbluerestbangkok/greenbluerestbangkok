import { blogData } from './blog-data.js';

class BlogDetailManager {
    constructor() {
        this.init();
    }
    
    init() {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        const type = urlParams.get('type') || 'blog';
        
        if (id) {
            this.loadContent(parseInt(id), type);
            this.loadRelatedContent(parseInt(id), type);
        } else {
            this.showError();
        }
    }
    
    loadContent(id, type) {
        let content;
        if (type === 'blog') {
            content = blogData.blogs.find(blog => blog.id === id);
        } else {
            content = blogData.vlogs.find(vlog => vlog.id === id);
        }
        
        if (content) {
            this.renderContent(content, type);
            document.getElementById('breadcrumbTitle').textContent = content.title;
            document.title = `${content.title} - Green Blue Rest`;
        } else {
            this.showError();
        }
    }
    
    renderContent(content, type) {
        const detailContainer = document.getElementById('blogDetail');
        
        if (type === 'blog') {
            detailContainer.innerHTML = this.createBlogDetail(content);
        } else {
            detailContainer.innerHTML = this.createVlogDetail(content);
        }
    }
    
    createBlogDetail(blog) {
        return `
            <header class="blog-header">
                <div class="blog-meta">
                    <span class="blog-badge">Blog</span>
                    <time class="blog-date">${this.formatDate(blog.date)}</time>
                </div>
                <h1 class="blog-title">${blog.title}</h1>
                <p class="blog-excerpt">${blog.excerpt}</p>
            </header>
            
            <div class="blog-image">
                <img src="${blog.image}" alt="${blog.title}" onerror="this.style.display='none'">
            </div>
            
            <div class="blog-content">
                ${blog.content}
            </div>
            
            <div class="blog-footer">
                <div class="share-buttons">
                    <span>แชร์บทความนี้:</span>
                    <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}" target="_blank" class="share-btn facebook">Facebook</a>
                    <a href="https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(blog.title)}" target="_blank" class="share-btn twitter">Twitter</a>
                    <a href="https://line.me/R/msg/text/?${encodeURIComponent(blog.title + ' ' + window.location.href)}" target="_blank" class="share-btn line">Line</a>
                </div>
            </div>
        `;
    }
    
    createVlogDetail(vlog) {
        const youtubeEmbed = `https://www.youtube.com/embed/${vlog.youtubeId}`;
        
        return `
            <header class="blog-header">
                <div class="blog-meta">
                    <span class="vlog-badge">Vlog</span>
                    <time class="blog-date">${this.formatDate(vlog.date)}</time>
                    <span class="video-duration">${vlog.duration}</span>
                </div>
                <h1 class="blog-title">${vlog.title}</h1>
                <p class="blog-excerpt">${vlog.excerpt}</p>
            </header>
            
            <div class="video-container">
                <iframe 
                    src="${youtubeEmbed}" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                </iframe>
            </div>
            
            <div class="blog-content">
                <h3>เกี่ยวกับวีดิโอนี้</h3>
                <p>${vlog.excerpt}</p>
            </div>
            
            <div class="blog-footer">
                <div class="share-buttons">
                    <span>แชร์วีดิโอนี้:</span>
                    <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}" target="_blank" class="share-btn facebook">Facebook</a>
                    <a href="https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(vlog.title)}" target="_blank" class="share-btn twitter">Twitter</a>
                    <a href="https://line.me/R/msg/text/?${encodeURIComponent(vlog.title + ' ' + window.location.href)}" target="_blank" class="share-btn line">Line</a>
                </div>
            </div>
        `;
    }
    
    loadRelatedContent(currentId, currentType) {
        // Get 3 related items (excluding current one)
        const allContent = [...blogData.blogs, ...blogData.vlogs];
        const relatedContent = allContent
            .filter(item => !(item.id === currentId && item.category === currentType))
            .slice(0, 3);
            
        this.renderRelatedContent(relatedContent);
    }
    
    renderRelatedContent(content) {
        const relatedGrid = document.getElementById('relatedGrid');
        
        if (content.length === 0) {
            relatedGrid.innerHTML = '<p>ไม่มีเนื้อหาที่เกี่ยวข้อง</p>';
            return;
        }
        
        const contentHTML = content.map(item => {
            const isVlog = item.category === 'vlog';
            const linkUrl = `blog-detail.html?id=${item.id}&type=${item.category}`;
            
            return `
                <div class="related-card">
                    <a href="${linkUrl}" class="related-link">
                        <div class="related-image">
                            <img src="${isVlog ? item.thumbnail : item.image}" alt="${item.title}">
                            <div class="card-badge ${isVlog ? 'vlog-badge' : 'blog-badge'}">
                                ${isVlog ? 'Vlog' : 'Blog'}
                            </div>
                            ${isVlog ? `<div class="video-duration">${item.duration}</div>` : ''}
                        </div>
                        <div class="related-content">
                            <h4 class="related-title">${item.title}</h4>
                            <p class="related-excerpt">${item.excerpt}</p>
                            <time class="related-date">${this.formatDate(item.date)}</time>
                        </div>
                    </a>
                </div>
            `;
        }).join('');
        
        relatedGrid.innerHTML = contentHTML;
    }
    
    showError() {
        const detailContainer = document.getElementById('blogDetail');
        detailContainer.innerHTML = `
            <div class="error-message">
                <h2>ไม่พบเนื้อหาที่ต้องการ</h2>
                <p>ขออภัย เนื้อหาที่คุณต้องการดูไม่พบหรืออาจถูกลบไปแล้ว</p>
                <a href="activities.html" class="btn btn-primary">กลับสู่หน้า Blog & Vlog</a>
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
    new BlogDetailManager();
});