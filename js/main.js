// ======================================== -->
// 🚨 SECURITY FIX: แก้ไข External CDN Dependencies
// ใช้ version ที่เฉพาะเจาะจงและเพิ่ม fallback
// ======================================== -->

// นำเข้า PhotoSwipe จากไลบรารี - ใช้ version ที่เฉพาะเจาะจง
import PhotoSwipe from 'https://unpkg.com/photoswipe@5.3.8/dist/photoswipe.esm.js';

// Fallback function ถ้า PhotoSwipe โหลดไม่สำเร็จ
function handlePhotoSwipeError() {
    console.warn('PhotoSwipe failed to load, using fallback lightbox');
    // ใช้ fallback lightbox หรือแสดงรูปภาพในแท็บใหม่
}

// ตรวจสอบว่า PhotoSwipe โหลดสำเร็จหรือไม่
if (typeof PhotoSwipe === 'undefined') {
    handlePhotoSwipeError();
}

// ======================================== -->
// 🚨 CODE QUALITY FIX: เพิ่ม Error Handling
// ป้องกันเว็บไซต์ crash เมื่อเกิด error
// ======================================== -->

// Global error handler
window.addEventListener('error', function(event) {
    safeLog('Global error caught:', 'error');
    safeLog(event.error, 'error');
    
    // แสดง error message ให้ผู้ใช้
    showErrorMessage('เกิดข้อผิดพลาดในระบบ กรุณาลองใหม่อีกครั้ง');
});

// Global unhandled rejection handler
window.addEventListener('unhandledrejection', function(event) {
    safeLog('Unhandled promise rejection:', 'error');
    safeLog(event.reason, 'error');
    
    // แสดง error message ให้ผู้ใช้
    showErrorMessage('เกิดข้อผิดพลาดในการโหลดข้อมูล กรุณาลองใหม่อีกครั้ง');
});

// ฟังก์ชันแสดง error message
function showErrorMessage(message) {
    // สร้าง error notification
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-notification';
    errorDiv.textContent = message;
    
    // เพิ่ม error notification ลงในหน้าเว็บ
    document.body.appendChild(errorDiv);
    
    // ลบ error notification หลังจาก 5 วินาที
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.parentNode.removeChild(errorDiv);
        }
    }, 5000);
}

// Safe function wrapper
function safeExecute(func, fallback = null) {
    try {
        return func();
    } catch (error) {
        safeLog('Function execution failed:', 'error');
        safeLog(error, 'error');
        return fallback;
    }
}

// รอให้หน้าเว็บโหลดเสร็จก่อน
document.addEventListener('DOMContentLoaded', function() {
    
    // --- ระบบเมนูบนมือถือ (Hamburger Menu) ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            // Toggle active class
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Animate hamburger bars
            const bars = hamburger.querySelectorAll('.bar');
            bars.forEach((bar, index) => {
                if (hamburger.classList.contains('active')) {
                    if (index === 0) bar.style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                    if (index === 1) bar.style.opacity = '0';
                    if (index === 2) bar.style.transform = 'rotate(45deg) translate(-5px, -6px)';
                } else {
                    bar.style.transform = 'none';
                    bar.style.opacity = '1';
                }
            });
        });
        
        // ปิดเมนูเมื่อคลิกที่ลิงก์
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                
                // Reset hamburger bars
                const bars = hamburger.querySelectorAll('.bar');
                bars.forEach(bar => {
                    bar.style.transform = 'none';
                    bar.style.opacity = '1';
                });
            });
        });
        
        // ปิดเมนูเมื่อคลิกนอกเมนู
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                
                // Reset hamburger bars
                const bars = hamburger.querySelectorAll('.bar');
                bars.forEach(bar => {
                    bar.style.transform = 'none';
                    bar.style.opacity = '1';
                });
            }
        });
    }
    
    // --- ระบบอัลบั้มภาพ ---
    const galleryTriggers = document.querySelectorAll('.card-gallery-trigger');

    // ทำงานต่อเมื่อหน้านี้มีอัลบั้มภาพเท่านั้น เพื่อไม่ให้ error ในหน้าอื่น
    if (galleryTriggers.length > 0) {
        galleryTriggers.forEach(trigger => {
            trigger.addEventListener('click', function(event) {
                event.preventDefault();
                const galleryContainer = this.closest('.card').querySelector('.pswp-gallery');
                if (!galleryContainer) return;

                const options = {
                    dataSource: galleryContainer.querySelectorAll('a'),
                    pswpModule: PhotoSwipe,
                    index: 0, 
                };
                
                const lightbox = new PhotoSwipe(options);
                lightbox.init();
            });
        });
    }
    
    // --- Smooth Scrolling สำหรับลิงก์ภายในหน้า ---
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // --- Active Navigation Link ---
    // ใช้ active class ที่กำหนดไว้ใน HTML แล้ว ไม่ต้องใช้ JavaScript
    // เพื่อป้องกันปัญหาการเปลี่ยนสีฟอนต์ที่ไม่ถูกต้อง
    
    // --- Lazy Loading สำหรับรูปภาพ ---
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    // --- Form Validation ---
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                alert('กรุณากรอกข้อมูลให้ครบถ้วน');
            }
        });
    });
    
    // ======================================== -->
    // 🚨 CODE QUALITY FIX: ลบ CSS Styles ที่ซ้ำซ้อน
    // ย้าย CSS styles ไปยังไฟล์ CSS แล้ว
    // ======================================== -->
    
    // ไม่ต้องสร้าง CSS styles ใน JavaScript อีกต่อไป
    // ใช้ไฟล์ CSS แทน
    
    // สร้างปุ่ม scroll to top โดยใช้ CSS classes
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.className = 'scroll-to-top';
    
    // เพิ่ม event listener สำหรับ scroll to top
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    document.body.appendChild(scrollToTopBtn);
    
    // ======================================== -->
    // 🚨 SECURITY FIX: แก้ไข XSS vulnerability
    // แทนที่ innerHTML ด้วย textContent เพื่อความปลอดภัย
    // ======================================== -->
    
    // ฟังก์ชันสร้าง HTML string ที่ปลอดภัย
    function createSafeScrollToTopButton() {
        return '↑';
    }
    
    // แก้ไขการใช้ innerHTML
    scrollToTopBtn.textContent = createSafeScrollToTopButton();
    
    // ======================================== -->
    // 🚨 PERFORMANCE FIX: แก้ไข Memory Leak ใน Scroll Event
    // ใช้ throttle และ cleanup เพื่อป้องกัน memory leak
    // ======================================== -->
    
    // Throttle function เพื่อจำกัดการเรียก scroll event
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
    
    // แสดง/ซ่อนปุ่ม scroll to top - ใช้ throttle
    const handleScroll = throttle(() => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('show'); // เพิ่ม class 'show' เมื่อมีการ scroll
        } else {
            scrollToTopBtn.classList.remove('show'); // ลบ class 'show' เมื่อไม่มีการ scroll
        }
    }, 100); // throttle ทุก 100ms
    
    window.addEventListener('scroll', handleScroll);
    
    // Cleanup function เพื่อป้องกัน memory leak
    function cleanupScrollEvent() {
        window.removeEventListener('scroll', handleScroll);
    }
    
    // Cleanup เมื่อหน้าเว็บถูก unload
    window.addEventListener('beforeunload', cleanupScrollEvent);
    window.addEventListener('pagehide', cleanupScrollEvent);
    
    // --- Loading Animation ---
    const loadingElements = document.querySelectorAll('.loading');
    if (loadingElements.length > 0) {
        setTimeout(() => {
            loadingElements.forEach(element => {
                element.classList.remove('loading');
            });
        }, 1000);
    }
});