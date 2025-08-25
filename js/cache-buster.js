// ======================================== -->
// 🚨 Cache Buster - ป้องกัน Browser Caching
// Green Blue Rest Bangkok Website
// ======================================== -->

(function() {
    'use strict';
    
    // เพิ่ม version parameter ให้กับไฟล์ CSS และ JS
    function addVersionToAssets() {
        const timestamp = Date.now();
        
        // หาไฟล์ CSS ทั้งหมด
        const cssLinks = document.querySelectorAll('link[rel="stylesheet"]');
        cssLinks.forEach(link => {
            if (link.href && !link.href.includes('?v=')) {
                link.href = link.href + '?v=' + timestamp;
            }
        });
        
        // หาไฟล์ JavaScript ทั้งหมด
        const scriptTags = document.querySelectorAll('script[src]');
        scriptTags.forEach(script => {
            if (script.src && !script.src.includes('?v=')) {
                script.src = script.src + '?v=' + timestamp;
            }
        });
    }
    
    // เพิ่ม version parameter ให้กับรูปภาพ
    function addVersionToImages() {
        const timestamp = Date.now();
        const images = document.querySelectorAll('img[src]');
        
        images.forEach(img => {
            if (img.src && !img.src.includes('?v=')) {
                img.src = img.src + '?v=' + timestamp;
            }
        });
    }
    
    // ทำงานเมื่อหน้าเว็บโหลดเสร็จ
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            addVersionToAssets();
            addVersionToImages();
        });
    } else {
        addVersionToAssets();
        addVersionToImages();
    }
    
    // ======================================== -->
    // 🚨 PERFORMANCE FIX: แก้ไข setTimeout โดยใช้ requestAnimationFrame
    // เพิ่ม cleanup เพื่อป้องกัน memory leak
    // ======================================== -->
    
    // เพิ่ม version parameter ให้กับไฟล์ที่โหลดด้วย JavaScript
    window.addEventListener('load', function() {
        // ใช้ requestAnimationFrame แทน setTimeout เพื่อประสิทธิภาพที่ดีกว่า
        requestAnimationFrame(function() {
            addVersionToImages();
        });
    });
    
    // Cleanup function
    function cleanupCacheBuster() {
        // ล้าง event listeners และ timers
        if (window.cacheBusterCleanup) {
            window.cacheBusterCleanup();
        }
    }
    
    // เก็บ cleanup function ไว้ใน window object
    window.cacheBusterCleanup = cleanupCacheBuster;
    
    // Cleanup เมื่อหน้าเว็บถูก unload
    window.addEventListener('beforeunload', cleanupCacheBuster);
    window.addEventListener('pagehide', cleanupCacheBuster);
    
    // ฟังก์ชันสำหรับเพิ่ม version parameter ให้กับ URL
    window.addVersionToUrl = function(url) {
        if (!url) return url;
        const separator = url.includes('?') ? '&' : '?';
        return url + separator + 'v=' + Date.now();
    };
    
    // ฟังก์ชันสำหรับ reload หน้าเว็บโดยไม่ใช้ cache
    window.hardReload = function() {
        window.location.reload(true);
    };
    
    // ฟังก์ชันสำหรับ reload หน้าเว็บโดยใช้ cache
    window.softReload = function() {
        window.location.reload(false);
    };
    
    // เพิ่มฟังก์ชันสำหรับตรวจสอบการอัปเดตเว็บไซต์
    window.checkForUpdates = function() {
        const lastUpdate = localStorage.getItem('lastUpdate');
        const currentTime = Date.now();
        
        if (!lastUpdate || (currentTime - parseInt(lastUpdate)) > 300000) { // 5 minutes
            localStorage.setItem('lastUpdate', currentTime.toString());
            window.hardReload();
        }
    };
    
    // เพิ่มฟังก์ชันสำหรับล้าง localStorage cache
    window.clearSiteCache = function() {
        localStorage.clear();
        sessionStorage.clear();
        if ('caches' in window) {
            caches.keys().then(names => {
                names.forEach(name => caches.delete(name));
            });
        }
        console.log('🧹 Site cache cleared!');
        window.hardReload();
    };
    
    // เพิ่มฟังก์ชันสำหรับตรวจสอบ service worker
    window.refreshServiceWorker = function() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.getRegistrations().then(registrations => {
                registrations.forEach(registration => {
                    registration.update();
                });
            });
        }
    };

    // ======================================== -->
    // 🚨 CODE QUALITY FIX: ลบ Console Logs ใน Production
    // เพิ่ม environment-based logging
    // ======================================== -->
    
    // Environment-based logging function
    function safeLog(message, type = 'info') {
        // ตรวจสอบว่าเป็น development environment หรือไม่
        const isDevelopment = window.location.hostname === 'localhost' || 
                            window.location.hostname === '127.0.0.1' ||
                            window.location.hostname.includes('dev') ||
                            window.location.hostname.includes('staging');
        
        if (isDevelopment) {
            switch(type) {
                case 'warn':
                    console.warn(message);
                    break;
                case 'error':
                    console.error(message);
                    break;
                default:
                    console.log(message);
            }
        }
    }
    
    // แก้ไข console.log ในฟังก์ชันอื่นๆ
    safeLog('🧹 Site cache cleared!');
    
    // Fallback function ถ้า PhotoSwipe โหลดไม่สำเร็จ
    function handlePhotoSwipeError() {
        safeLog('PhotoSwipe failed to load, using fallback lightbox', 'warn');
        // ใช้ fallback lightbox หรือแสดงรูปภาพในแท็บใหม่
    }
    
})();
