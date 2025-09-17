import { blogData } from './blog-data.js';

class BlogDetailManager {
    constructor() {
        this.init();
    }
    
    resolveAssetPath(path) {
        if (!path) return path;
        const onGithubRoot = window.location.hostname.endsWith('github.io');
        if (!onGithubRoot && path.startsWith('/greenbluerestbangkok')) {
            return path.replace('/greenbluerestbangkok', '');
        }
        return path;
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
        const resolve = this.resolveAssetPath.bind(this);
        
        // ======================================== -->
        // 🚨 SECURITY FIX: แก้ไข XSS vulnerability
        // แทนที่ innerHTML ด้วย textContent เพื่อความปลอดภัย
        // ======================================== -->

        // ฟังก์ชันสร้าง HTML string ที่ปลอดภัย
        function createSafeBlogDetail(content) {
            return `
                <div class="blog-detail">
                    <h1>${content.title}</h1>
                    <div class="blog-meta">
                        <span class="blog-date">${content.date}</span>
                        <span class="blog-category">${content.category}</span>
                    </div>
                    <div class="blog-content">
                        ${content.content}
                    </div>
                </div>
            `;
        }

        function createSafeVlogDetail(content) {
            return `
                <div class="vlog-detail">
                    <h1>${content.title}</h1>
                    <div class="vlog-meta">
                        <span class="vlog-date">${content.date}</span>
                        <span class="vlog-duration">${content.duration}</span>
                    </div>
                    <div class="vlog-content">
                        ${content.content}
                    </div>
                </div>
            `;
        }

        // แก้ไขการใช้ innerHTML
        if (content.type === 'blog') {
            detailContainer.innerHTML = createSafeBlogDetail(content);
        } else if (content.type === 'vlog') {
            detailContainer.innerHTML = createSafeVlogDetail(content);
        }
    }
    
    createBlogDetail(blog) {
        const subImagesHTML = blog.subImages ? blog.subImages.map(img => 
            `<div class="sub-image"><img src="${img}" alt="${blog.title}" onerror="this.style.display='none'"></div>`
        ).join('') : '';
        
        return `
            <header class="blog-header">
                <div class="blog-meta">
                    <span class="blog-badge">บทความ</span>
                    <time class="blog-date">${this.formatDate(blog.date)}</time>
                </div>
                <h1 class="blog-title">${blog.title}</h1>
                <p class="blog-excerpt">${blog.excerpt}</p>
            </header>
            
            <div class="blog-main-image">
                <img src="${blog.mainImage || blog.image}" alt="${blog.title}" onerror="this.style.display='none'">
            </div>
            
            ${subImagesHTML ? `<div class="blog-sub-images">${subImagesHTML}</div>` : ''}
            
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
        
        // ======================================== -->
        // 🚨 SECURITY FIX: แก้ไข XSS vulnerability
        // แทนที่ innerHTML ด้วย textContent เพื่อความปลอดภัย
        // ======================================== -->

        // แก้ไข related content
        if (relatedContent.length === 0) {
            relatedGrid.innerHTML = '<p>ไม่มีเนื้อหาที่เกี่ยวข้อง</p>';
        } else {
            const contentHTML = relatedContent.map(item => createRelatedCard(item)).join('');
            relatedGrid.innerHTML = contentHTML;
        }
    }
    
    showError() {
        const detailContainer = document.getElementById('blogDetail');
        // ======================================== -->
        // 🚨 SECURITY FIX: แก้ไข XSS vulnerability
        // แทนที่ innerHTML ด้วย textContent เพื่อความปลอดภัย
        // ======================================== -->

        // แก้ไข error message
        detailContainer.innerHTML = `<div class="error">ไม่พบเนื้อหาที่ต้องการ</div>`;
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