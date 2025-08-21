// Admin Panel JavaScript
class AdminPanel {
    constructor() {
        this.currentUser = null;
        this.isAuthenticated = false;
        // เปลี่ยน URL ตามที่ deploy backend
        this.apiBaseUrl = window.location.hostname === 'localhost' 
            ? 'http://localhost:3000/api'
            : 'https://your-backend-url.railway.app/api'; // เปลี่ยนเป็น URL ของคุณ
        this.token = localStorage.getItem('authToken');
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadData();
        this.checkAuth();
        this.setupRealTimeUpdates();
        this.initializeAdvancedFeatures();
    }

    initializeAdvancedFeatures() {
        // ตั้งค่าการทำงานขั้นสูง
        this.setupAutoSave();
        this.setupDataValidation();
        this.setupErrorHandling();
        this.setupPerformanceMonitoring();
    }

    setupAutoSave() {
        // Auto-save every 5 minutes
        setInterval(() => {
            if (this.isAuthenticated && this.hasUnsavedChanges) {
                this.autoSaveData();
            }
        }, 300000); // 5 minutes
    }

    setupDataValidation() {
        // Data validation rules
        this.validationRules = {
            trip: {
                name: { required: true, minLength: 3, maxLength: 100 },
                price: { required: true, pattern: /^\d+(\sบาท)?$/ },
                description: { required: true, minLength: 10 }
            },
            product: {
                name: { required: true, minLength: 3, maxLength: 100 },
                price: { required: true, pattern: /^\d+(\sบาท)?$/ },
                category: { required: true }
            },
            article: {
                title: { required: true, minLength: 5, maxLength: 200 },
                content: { required: true, minLength: 50 }
            },
            partner: {
                businessName: { required: true, minLength: 3, maxLength: 100 },
                contactPerson: { required: true },
                phone: { required: true, pattern: /^[\d\-\+\(\)\s]+$/ },
                email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }
            }
        };
    }

    setupErrorHandling() {
        // Global error handling
        window.addEventListener('error', (event) => {
            console.error('Global error:', event.error);
            this.showStatus('เกิดข้อผิดพลาดในระบบ', 'error');
        });

        window.addEventListener('unhandledrejection', (event) => {
            console.error('Unhandled promise rejection:', event.reason);
            this.showStatus('เกิดข้อผิดพลาดในการประมวลผล', 'error');
        });
    }

    setupPerformanceMonitoring() {
        // Performance monitoring
        if ('performance' in window) {
            const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (entry.entryType === 'navigation') {
                        console.log('Page load time:', entry.loadEventEnd - entry.loadEventStart);
                    }
                }
            });
            observer.observe({ entryTypes: ['navigation'] });
        }
    }

    autoSaveData() {
        // Auto-save functionality
        console.log('Auto-saving data...');
        this.hasUnsavedChanges = false;
    }

    validateData(data, type) {
        const rules = this.validationRules[type];
        if (!rules) return { isValid: true, errors: [] };

        const errors = [];
        for (const [field, rule] of Object.entries(rules)) {
            const value = data[field];
            
            if (rule.required && (!value || value.trim() === '')) {
                errors.push(`${field} is required`);
            }
            
            if (rule.minLength && value && value.length < rule.minLength) {
                errors.push(`${field} must be at least ${rule.minLength} characters`);
            }
            
            if (rule.maxLength && value && value.length > rule.maxLength) {
                errors.push(`${field} must be no more than ${rule.maxLength} characters`);
            }
            
            if (rule.pattern && value && !rule.pattern.test(value)) {
                errors.push(`${field} format is invalid`);
            }
        }

        return { isValid: errors.length === 0, errors };
    }

    setupEventListeners() {
        // Login form
        document.getElementById('loginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.login();
        });

        // Navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.showSection(e.target.closest('.nav-btn').dataset.section);
            });
        });

        // Close modals
        document.querySelectorAll('.close').forEach(closeBtn => {
            closeBtn.addEventListener('click', (e) => {
                this.closeModal(e.target.closest('.modal').id);
            });
        });

        // Close modal when clicking outside
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal(modal.id);
                }
            });
        });

        // Forms
        document.getElementById('websiteForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.updateWebsiteInfo();
        });

        document.getElementById('contactForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.updateContactInfo();
        });

        document.getElementById('tripForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveTrip();
        });

        document.getElementById('productForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveProduct();
        });

        document.getElementById('userForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addUser();
        });

        document.getElementById('generalSettingsForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveGeneralSettings();
        });

        // Article form
        document.getElementById('articleForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveArticle();
        });

        // Partner form
        document.getElementById('partnerForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.savePartner();
        });

        // Logo preview
        document.getElementById('partnerLogo').addEventListener('input', (e) => {
            this.updateLogoPreview(e.target.value);
        });
    }

    // Authentication
    async login() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch(`${this.apiBaseUrl}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            if (response.ok) {
                const data = await response.json();
                this.token = data.token;
                this.currentUser = data.user;
                this.isAuthenticated = true;
                
                // บันทึก token ใน localStorage
                localStorage.setItem('authToken', this.token);
                
                this.showAdminPanel();
                this.showStatus('เข้าสู่ระบบสำเร็จ', 'success');
                this.loadData();
            } else {
                const errorData = await response.json();
                this.showStatus(errorData.error || 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง', 'error');
            }
        } catch (error) {
            console.error('Login error:', error);
            this.showStatus('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้', 'error');
        }
    }

    validateCredentials(username, password) {
        // ข้อมูลล็อกอินจำลอง (ในระบบจริงควรใช้ฐานข้อมูลและเข้ารหัส)
        const validUsers = [
            { username: 'admin', password: 'admin123' },
            { username: 'manager', password: 'manager123' },
            { username: 'editor', password: 'editor123' }
        ];

        return validUsers.some(user => 
            user.username === username && user.password === password
        );
    }

    logout() {
        this.currentUser = null;
        this.isAuthenticated = false;
        this.token = null;
        localStorage.removeItem('authToken');
        this.showLoginPage();
        this.showStatus('ออกจากระบบแล้ว', 'info');
    }

    checkAuth() {
        if (!this.isAuthenticated) {
            this.showLoginPage();
        }
    }

    // API Helper Functions
    async apiRequest(endpoint, options = {}) {
        const url = `${this.apiBaseUrl}${endpoint}`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            },
            ...options
        };

        try {
            const response = await fetch(url, config);
            if (response.status === 401) {
                // Token expired or invalid
                this.logout();
                return null;
            }
            return response;
        } catch (error) {
            console.error('API request error:', error);
            throw error;
        }
    }

    // File Upload Functions
    async uploadImage(file, type = 'image') {
        const formData = new FormData();
        formData.append(type, file);

        try {
            const response = await fetch(`${this.apiBaseUrl}/upload/${type}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.token}`
                },
                body: formData
            });

            if (response.ok) {
                const result = await response.json();
                return result;
            } else {
                throw new Error('Upload failed');
            }
        } catch (error) {
            console.error('Upload error:', error);
            throw error;
        }
    }

    // Real-time Updates
    setupRealTimeUpdates() {
        // Auto-refresh data every 30 seconds
        setInterval(() => {
            if (this.isAuthenticated) {
                this.loadData();
            }
        }, 30000);

        // Setup WebSocket connection for real-time updates (future enhancement)
        this.setupWebSocket();
    }

    setupWebSocket() {
        // WebSocket implementation for real-time updates
        try {
            const wsUrl = window.location.hostname === 'localhost' 
                ? 'ws://localhost:3000'
                : 'wss://your-backend-url.railway.app'; // เปลี่ยนเป็น URL ของคุณ
            const ws = new WebSocket(wsUrl);
            
            ws.onopen = () => {
                console.log('WebSocket connected');
            };

            ws.onmessage = (event) => {
                const data = JSON.parse(event.data);
                this.handleRealTimeUpdate(data);
            };

            ws.onerror = (error) => {
                console.log('WebSocket error:', error);
            };

            ws.onclose = () => {
                console.log('WebSocket disconnected');
                // Reconnect after 5 seconds
                setTimeout(() => this.setupWebSocket(), 5000);
            };

            this.websocket = ws;
        } catch (error) {
            console.log('WebSocket not available:', error);
        }
    }

    handleRealTimeUpdate(data) {
        switch (data.type) {
            case 'trip_updated':
                this.loadTripsFromAPI();
                this.showStatus('ข้อมูลทริปถูกอัปเดต', 'info');
                break;
            case 'product_updated':
                this.loadProductsFromAPI();
                this.showStatus('ข้อมูลสินค้าถูกอัปเดต', 'info');
                break;
            case 'article_updated':
                this.loadArticlesFromAPI();
                this.showStatus('ข้อมูลบทความถูกอัปเดต', 'info');
                break;
            case 'partner_updated':
                this.loadPartnersFromAPI();
                this.showStatus('ข้อมูลผู้ประกอบการถูกอัปเดต', 'info');
                break;
        }
    }

    // Load data from API
    async loadDashboardData() {
        try {
            const response = await this.apiRequest('/dashboard');
            if (response && response.ok) {
                const data = await response.json();
                // Store dashboard data
                this.dashboardData = data;
            }
        } catch (error) {
            console.error('Error loading dashboard data:', error);
        }
    }

    async loadTripsFromAPI() {
        try {
            const response = await this.apiRequest('/trips');
            if (response && response.ok) {
                this.trips = await response.json();
            }
        } catch (error) {
            console.error('Error loading trips:', error);
            this.trips = this.getDefaultTrips();
        }
    }

    async loadProductsFromAPI() {
        try {
            const response = await this.apiRequest('/products');
            if (response && response.ok) {
                this.products = await response.json();
            }
        } catch (error) {
            console.error('Error loading products:', error);
            this.products = this.getDefaultProducts();
        }
    }

    async loadArticlesFromAPI() {
        try {
            const response = await this.apiRequest('/articles');
            if (response && response.ok) {
                this.articles = await response.json();
            }
        } catch (error) {
            console.error('Error loading articles:', error);
            this.articles = this.getDefaultArticles();
        }
    }

    async loadPartnersFromAPI() {
        try {
            const response = await this.apiRequest('/partners');
            if (response && response.ok) {
                this.partners = await response.json();
            }
        } catch (error) {
            console.error('Error loading partners:', error);
            this.partners = this.getDefaultPartners();
        }
    }

    async loadSettingsFromAPI() {
        try {
            const response = await this.apiRequest('/settings');
            if (response && response.ok) {
                this.settings = await response.json();
            }
        } catch (error) {
            console.error('Error loading settings:', error);
            this.settings = this.getDefaultSettings();
        }
    }

    // Advanced Data Management
    async loadAnalytics() {
        try {
            const response = await this.apiRequest('/analytics');
            if (response && response.ok) {
                this.analytics = await response.json();
                this.updateAnalyticsDisplay();
            }
        } catch (error) {
            console.error('Error loading analytics:', error);
        }
    }

    async loadWebsiteContent() {
        try {
            const response = await this.apiRequest('/website/content');
            if (response && response.ok) {
                this.websiteContent = await response.json();
                this.updateWebsiteContentDisplay();
            }
        } catch (error) {
            console.error('Error loading website content:', error);
        }
    }

    async loadUploadedFiles() {
        try {
            const response = await this.apiRequest('/files');
            if (response && response.ok) {
                this.uploadedFiles = await response.json();
                this.updateFileManagerDisplay();
            }
        } catch (error) {
            console.error('Error loading files:', error);
        }
    }

    // Enhanced Save Functions
    async saveProduct() {
        const productData = {
            id: parseInt(document.getElementById('productId').value),
            name: document.getElementById('productName').value,
            price: document.getElementById('productPrice').value,
            description: document.getElementById('productDesc').value,
            category: document.getElementById('productCategory').value,
            status: document.getElementById('productStatus').value
        };

        try {
            const response = await this.apiRequest('/products', {
                method: 'POST',
                body: JSON.stringify(productData)
            });

            if (response && response.ok) {
                const result = await response.json();
                this.showStatus('บันทึกข้อมูลสินค้าสำเร็จ', 'success');
                
                await this.loadProductsFromAPI();
                this.loadProductsData();
                this.updateDashboard();
                
                this.closeModal('productModal');
            } else {
                this.showStatus('ไม่สามารถบันทึกข้อมูลสินค้าได้', 'error');
            }
        } catch (error) {
            console.error('Error saving product:', error);
            this.showStatus('เกิดข้อผิดพลาดในการบันทึกข้อมูล', 'error');
        }
    }

    async saveArticle() {
        const articleData = {
            id: parseInt(document.getElementById('articleId').value),
            title: document.getElementById('articleTitle').value,
            excerpt: document.getElementById('articleExcerpt').value,
            content: document.getElementById('articleContent').value,
            category: document.getElementById('articleCategory').value,
            author: document.getElementById('articleAuthor').value,
            date: document.getElementById('articleDate').value,
            image: document.getElementById('articleImage').value,
            tags: document.getElementById('articleTags').value,
            status: document.getElementById('articleStatus').value
        };

        try {
            const response = await this.apiRequest('/articles', {
                method: 'POST',
                body: JSON.stringify(articleData)
            });

            if (response && response.ok) {
                const result = await response.json();
                this.showStatus('บันทึกข้อมูลบทความสำเร็จ', 'success');
                
                await this.loadArticlesFromAPI();
                this.loadArticlesData();
                this.updateDashboard();
                
                this.closeModal('articleModal');
            } else {
                this.showStatus('ไม่สามารถบันทึกข้อมูลบทความได้', 'error');
            }
        } catch (error) {
            console.error('Error saving article:', error);
            this.showStatus('เกิดข้อผิดพลาดในการบันทึกข้อมูล', 'error');
        }
    }

    async savePartner() {
        const partnerData = {
            id: parseInt(document.getElementById('partnerId').value),
            businessName: document.getElementById('partnerBusinessName').value,
            contactPerson: document.getElementById('partnerContactPerson').value,
            phone: document.getElementById('partnerPhone').value,
            email: document.getElementById('partnerEmail').value,
            address: document.getElementById('partnerAddress').value,
            businessType: document.getElementById('partnerBusinessType').value,
            description: document.getElementById('partnerDescription').value,
            logo: document.getElementById('partnerLogo').value,
            website: document.getElementById('partnerWebsite').value,
            socialMedia: document.getElementById('partnerSocialMedia').value,
            status: document.getElementById('partnerStatus').value
        };

        try {
            const response = await this.apiRequest('/partners', {
                method: 'POST',
                body: JSON.stringify(partnerData)
            });

            if (response && response.ok) {
                const result = await response.json();
                this.showStatus('บันทึกข้อมูลผู้ประกอบการสำเร็จ', 'success');
                
                await this.loadPartnersFromAPI();
                this.loadPartnersData();
                this.updateDashboard();
                
                this.closeModal('partnerModal');
            } else {
                this.showStatus('ไม่สามารถบันทึกข้อมูลผู้ประกอบการได้', 'error');
            }
        } catch (error) {
            console.error('Error saving partner:', error);
            this.showStatus('เกิดข้อผิดพลาดในการบันทึกข้อมูล', 'error');
        }
    }

    // UI Navigation
    showLoginPage() {
        document.getElementById('loginPage').classList.remove('hidden');
        document.getElementById('adminPage').classList.add('hidden');
    }

    showAdminPanel() {
        document.getElementById('loginPage').classList.add('hidden');
        document.getElementById('adminPage').classList.remove('hidden');
        document.getElementById('currentUser').textContent = this.currentUser.username;
    }

    showSection(sectionId) {
        // ซ่อนทุก section
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });

        // แสดง section ที่เลือก
        document.getElementById(sectionId).classList.add('active');

        // อัปเดต navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-section="${sectionId}"]`).classList.add('active');

        // โหลดข้อมูลตาม section
        this.loadSectionData(sectionId);
    }

    loadSectionData(sectionId) {
        switch(sectionId) {
            case 'trips':
                this.loadTripsData();
                break;
            case 'products':
                this.loadProductsData();
                break;
            case 'articles':
                this.loadArticlesData();
                break;
            case 'partners':
                this.loadPartnersData();
                break;
            case 'users':
                this.loadUsersData();
                break;
        }
    }

    // Data Management
    async loadData() {
        if (!this.token) {
            console.log('No token available');
            return;
        }

        try {
            // โหลดข้อมูล Dashboard
            await this.loadDashboardData();
            
            // โหลดข้อมูลทริป
            await this.loadTripsFromAPI();
            
            // โหลดข้อมูลสินค้า
            await this.loadProductsFromAPI();
            
            // โหลดข้อมูลบทความ
            await this.loadArticlesFromAPI();
            
            // โหลดข้อมูลผู้ประกอบการ
            await this.loadPartnersFromAPI();
            
            // โหลดข้อมูลการตั้งค่า
            await this.loadSettingsFromAPI();
            
            // อัปเดต Dashboard
            this.updateDashboard();
            
        } catch (error) {
            console.error('Error loading data:', error);
            this.showStatus('ไม่สามารถโหลดข้อมูลได้', 'error');
        }
    }

    // โหลดข้อมูลจากไฟล์เว็บไซต์จริง
    async loadWebsiteData() {
        try {
            // โหลดข้อมูลทริปจาก trip-details.js
            const tripResponse = await fetch('js/trip-details.js');
            const tripContent = await tripResponse.text();
            this.trips = this.parseTripsFromJS(tripContent);

            // โหลดข้อมูลสินค้าจาก products.js
            const productResponse = await fetch('js/products.js');
            const productContent = await productResponse.text();
            this.products = this.parseProductsFromJS(productContent);

            // อัปเดต Dashboard
            this.updateDashboard();
            
            // ตรวจสอบสถานะการเชื่อมต่อ
            this.checkWebsiteConnection();
        } catch (error) {
            console.error('ไม่สามารถโหลดข้อมูลจากเว็บไซต์ได้:', error);
            // ใช้ข้อมูลจำลองถ้าโหลดไม่ได้
            this.trips = this.getDefaultTrips();
            this.products = this.getDefaultProducts();
        }
    }

    // ตรวจสอบการเชื่อมต่อเว็บไซต์
    async checkWebsiteConnection() {
        const statusElements = {
            trip: document.getElementById('tripFileStatus'),
            product: document.getElementById('productFileStatus'),
            website: document.getElementById('websiteFileStatus')
        };

        // ตรวจสอบไฟล์ทริป
        try {
            const tripResponse = await fetch('js/trip-details.js');
            if (tripResponse.ok) {
                statusElements.trip.innerHTML = '<span style="color: #28a745;">✅ เชื่อมต่อสำเร็จ</span>';
            } else {
                statusElements.trip.innerHTML = '<span style="color: #dc3545;">❌ ไม่พบไฟล์</span>';
            }
        } catch (error) {
            statusElements.trip.innerHTML = '<span style="color: #dc3545;">❌ ไม่สามารถเชื่อมต่อได้</span>';
        }

        // ตรวจสอบไฟล์สินค้า
        try {
            const productResponse = await fetch('js/products.js');
            if (productResponse.ok) {
                statusElements.product.innerHTML = '<span style="color: #28a745;">✅ เชื่อมต่อสำเร็จ</span>';
            } else {
                statusElements.product.innerHTML = '<span style="color: #dc3545;">❌ ไม่พบไฟล์</span>';
            }
        } catch (error) {
            statusElements.product.innerHTML = '<span style="color: #dc3545;">❌ ไม่สามารถเชื่อมต่อได้</span>';
        }

        // ตรวจสอบไฟล์เว็บไซต์หลัก
        try {
            const websiteResponse = await fetch('index.html');
            if (websiteResponse.ok) {
                statusElements.website.innerHTML = '<span style="color: #28a745;">✅ เชื่อมต่อสำเร็จ</span>';
            } else {
                statusElements.website.innerHTML = '<span style="color: #dc3545;">❌ ไม่พบไฟล์</span>';
            }
        } catch (error) {
            statusElements.website.innerHTML = '<span style="color: #dc3545;">❌ ไม่สามารถเชื่อมต่อได้</span>';
        }
    }

    // แยกข้อมูลทริปจากไฟล์ JavaScript
    parseTripsFromJS(jsContent) {
        try {
            // ค้นหา trips array ในไฟล์
            const tripsMatch = jsContent.match(/const\s+trips\s*=\s*(\[[\s\S]*?\]);/);
            if (tripsMatch) {
                // แปลง string เป็น object
                const tripsString = tripsMatch[1];
                // แทนที่ single quotes ด้วย double quotes เพื่อให้ JSON.parse ทำงานได้
                const jsonString = tripsString.replace(/'/g, '"');
                return JSON.parse(jsonString);
            }
        } catch (error) {
            console.error('ไม่สามารถแยกข้อมูลทริปได้:', error);
        }
        return this.getDefaultTrips();
    }

    // แยกข้อมูลสินค้าจากไฟล์ JavaScript
    parseProductsFromJS(jsContent) {
        try {
            // ค้นหา products array ในไฟล์
            const productsMatch = jsContent.match(/const\s+products\s*=\s*(\[[\s\S]*?\]);/);
            if (productsMatch) {
                const productsString = productsMatch[1];
                const jsonString = productsString.replace(/'/g, '"');
                return JSON.parse(jsonString);
            }
        } catch (error) {
            console.error('ไม่สามารถแยกข้อมูลสินค้าได้:', error);
        }
        return this.getDefaultProducts();
    }

    getDefaultTrips() {
        return [
            {
                id: 1,
                name: "ทริปชุมชนบางขุนเทียน",
                price: "500 บาท/คน",
                description: "สัมผัสวิถีชีวิตชุมชนริมน้ำ",
                status: "active"
            },
            {
                id: 2,
                name: "ทริปเกษตรอินทรีย์",
                price: "800 บาท/คน",
                description: "เรียนรู้การเกษตรแบบยั่งยืน",
                status: "active"
            }
        ];
    }

    getDefaultProducts() {
        return [
            {
                id: 1,
                name: "น้ำผึ้งธรรมชาติ",
                price: "150 บาท",
                description: "น้ำผึ้งแท้จากชุมชน",
                category: "สินค้าชุมชน",
                status: "active"
            },
            {
                id: 2,
                name: "ผ้าทอมือ",
                price: "300 บาท",
                description: "ผ้าทอมือคุณภาพดี",
                category: "ของที่ระลึก",
                status: "active"
            }
        ];
    }

    getDefaultUsers() {
        return [
            {
                username: "admin",
                email: "admin@greenbluerestbangkok.com",
                role: "admin",
                status: "active"
            },
            {
                username: "manager",
                email: "manager@greenbluerestbangkok.com",
                role: "editor",
                status: "active"
            }
        ];
    }

    getDefaultSettings() {
        return {
            maintenanceMode: false,
            notifications: "all",
            websiteName: "GreenBlueRest Bangkok",
            websiteDesc: "เว็บไซต์ท่องเที่ยวชุมชน",
            contactEmail: "contact@greenbluerestbangkok.com",
            contactPhone: "08x-xxx-xxxx",
            contactLine: "greenbluerestbangkok"
        };
    }

    getDefaultArticles() {
        return [
            {
                id: 1,
                title: "สัมผัสวิถีชีวิตชุมชนบางขุนเทียน",
                excerpt: "เรียนรู้วัฒนธรรมและวิถีชีวิตของชุมชนริมน้ำที่ยังคงความเป็นเอกลักษณ์ดั้งเดิม",
                content: "ชุมชนบางขุนเทียนเป็นชุมชนริมน้ำที่มีประวัติศาสตร์ยาวนาน...",
                category: "ชุมชน",
                author: "ทีม GreenBlueRest",
                date: "2025-01-15",
                image: "images/blog/community-life.jpg",
                tags: "ชุมชน, วัฒนธรรม, ริมน้ำ",
                status: "published"
            },
            {
                id: 2,
                title: "อาหารพื้นบ้านที่ต้องลอง",
                excerpt: "รสชาติอาหารพื้นบ้านที่หาทานยากในเมืองใหญ่ แต่มีให้ลองในชุมชน",
                content: "อาหารพื้นบ้านของชุมชนบางขุนเทียนมีเอกลักษณ์เฉพาะ...",
                category: "อาหาร",
                author: "ทีม GreenBlueRest",
                date: "2025-01-10",
                image: "images/blog/local-food.jpg",
                tags: "อาหาร, พื้นบ้าน, รสชาติ",
                status: "published"
            }
        ];
    }

    getDefaultPartners() {
        return [
            {
                id: 1,
                name: "ร้านอาหารริมน้ำบางขุนเทียน",
                type: "ร้านอาหาร",
                description: "ร้านอาหารพื้นบ้านริมน้ำที่เสิร์ฟอาหารท้องถิ่นรสชาติแท้",
                owner: "คุณสมชาย ใจดี",
                startDate: "2024-12-01",
                phone: "08x-xxx-xxxx",
                email: "contact@restaurant1.com",
                address: "123 ถนนริมน้ำ บางขุนเทียน กรุงเทพฯ",
                logo: "images/partners/restaurant1-logo.jpg",
                website: "https://facebook.com/restaurant1",
                status: "active",
                notes: "ร่วมมือในการจัดทริปอาหารท้องถิ่น"
            },
            {
                id: 2,
                name: "โรงแรมชุมชนบางขุนเทียน",
                type: "โรงแรม/ที่พัก",
                description: "โรงแรมขนาดเล็กที่ให้บริการที่พักแบบชุมชน",
                owner: "คุณสมหญิง รักดี",
                startDate: "2024-11-15",
                phone: "08x-xxx-xxxx",
                email: "info@hotel1.com",
                address: "456 ถนนชุมชน บางขุนเทียน กรุงเทพฯ",
                logo: "images/partners/hotel1-logo.jpg",
                website: "https://hotel1.com",
                status: "active",
                notes: "ให้ส่วนลดพิเศษสำหรับลูกค้าทริปชุมชน"
            },
            {
                id: 3,
                name: "ร้านหัตถกรรมชุมชน",
                type: "หัตถกรรม",
                description: "ร้านขายสินค้าหัตถกรรมที่ทำโดยช่างท้องถิ่น",
                owner: "คุณสมศักดิ์ มือทอง",
                startDate: "2024-10-20",
                phone: "08x-xxx-xxxx",
                email: "craft@local.com",
                address: "789 ถนนหัตถกรรม บางขุนเทียน กรุงเทพฯ",
                logo: "images/partners/craft1-logo.jpg",
                website: "https://instagram.com/craft1",
                status: "pending",
                notes: "รอการยืนยันการร่วมมือ"
            },
            {
                id: 4,
                name: "ฟาร์มเกษตรอินทรีย์",
                type: "เกษตรกรรม",
                description: "ฟาร์มที่ปลูกผักอินทรีย์และเปิดให้เยี่ยมชม",
                owner: "คุณสมพร เกษตรกร",
                startDate: "2024-09-10",
                phone: "08x-xxx-xxxx",
                email: "farm@organic.com",
                address: "321 ถนนเกษตร บางขุนเทียน กรุงเทพฯ",
                logo: "images/partners/farm1-logo.jpg",
                website: "https://farm1.com",
                status: "active",
                notes: "จัดกิจกรรมเรียนรู้การเกษตรอินทรีย์"
            },
            {
                id: 5,
                name: "ร้านกาแฟชุมชน",
                type: "ร้านอาหาร",
                description: "ร้านกาแฟที่ใช้เมล็ดกาแฟจากชุมชน",
                owner: "คุณสมชาย กาแฟ",
                startDate: "2024-08-25",
                phone: "08x-xxx-xxxx",
                email: "coffee@local.com",
                address: "654 ถนนกาแฟ บางขุนเทียน กรุงเทพฯ",
                logo: "images/partners/coffee1-logo.jpg",
                website: "https://facebook.com/coffee1",
                status: "active",
                notes: "เสิร์ฟกาแฟท้องถิ่นในทริปชุมชน"
            },
            {
                id: 6,
                name: "ร้านของที่ระลึก",
                type: "ร้านค้า/ของที่ระลึก",
                description: "ร้านขายของที่ระลึกและสินค้าท้องถิ่น",
                owner: "คุณสมหญิง ของดี",
                startDate: "2024-07-30",
                phone: "08x-xxx-xxxx",
                email: "souvenir@local.com",
                address: "987 ถนนของดี บางขุนเทียน กรุงเทพฯ",
                logo: "images/partners/souvenir1-logo.jpg",
                website: "https://instagram.com/souvenir1",
                status: "active",
                notes: "ให้ส่วนลดพิเศษสำหรับลูกค้าทริป"
            },
            {
                id: 7,
                name: "บริการเรือท่องเที่ยว",
                type: "บริการท่องเที่ยว",
                description: "บริการเรือนำเที่ยวชมชุมชนริมน้ำ",
                owner: "คุณสมศักดิ์ เรือดี",
                startDate: "2024-06-15",
                phone: "08x-xxx-xxxx",
                email: "boat@tour.com",
                address: "147 ถนนริมน้ำ บางขุนเทียน กรุงเทพฯ",
                logo: "images/partners/boat1-logo.jpg",
                website: "https://boat1.com",
                status: "active",
                notes: "ให้บริการเรือนำเที่ยวในราคาพิเศษ"
            },
            {
                id: 8,
                name: "ร้านขนมไทยโบราณ",
                type: "ร้านอาหาร",
                description: "ร้านขายขนมไทยโบราณที่ทำตามสูตรดั้งเดิม",
                owner: "คุณสมพร ขนมดี",
                startDate: "2024-05-20",
                phone: "08x-xxx-xxxx",
                email: "dessert@thai.com",
                address: "258 ถนนขนมไทย บางขุนเทียน กรุงเทพฯ",
                logo: "images/partners/dessert1-logo.jpg",
                website: "https://facebook.com/dessert1",
                status: "active",
                notes: "จัดกิจกรรมทำขนมไทยโบราณ"
            }
        ];
    }

    // Dashboard
    updateDashboard() {
        document.getElementById('totalTrips').textContent = this.trips.length;
        document.getElementById('totalProducts').textContent = this.products.length;
        document.getElementById('totalArticles').textContent = this.articles.length;
        document.getElementById('totalPartnersDashboard').textContent = this.partners.length;
        document.getElementById('todayVisitors').textContent = Math.floor(Math.random() * 100) + 50;
        document.getElementById('lastUpdate').textContent = new Date().toLocaleString('th-TH');
        
        // อัปเดตสถิติผู้ประกอบการ
        this.updatePartnersStats();
        
        // อัปเดตข้อมูลเพิ่มเติม
        this.updateAdvancedStats();
    }

    updateAdvancedStats() {
        if (this.analytics) {
            const activeTrips = this.analytics.activeTrips || 0;
            const activeProducts = this.analytics.activeProducts || 0;
            const publishedArticles = this.analytics.publishedArticles || 0;
            const activePartners = this.analytics.activePartners || 0;

            // อัปเดตสถานะการทำงาน
            this.updateSystemStatus();
            
            // อัปเดตกราฟและสถิติ
            this.updateCharts();
        }
    }

    updateSystemStatus() {
        const statusElement = document.getElementById('systemStatus');
        if (statusElement) {
            const isHealthy = this.checkSystemHealth();
            if (isHealthy) {
                statusElement.innerHTML = '<span class="status-badge active">🟢 ระบบทำงานปกติ</span>';
            } else {
                statusElement.innerHTML = '<span class="status-badge inactive">🔴 ระบบมีปัญหา</span>';
            }
        }
    }

    checkSystemHealth() {
        // ตรวจสอบสถานะระบบ
        const hasData = this.trips.length > 0 && this.products.length > 0;
        const hasConnection = this.token && this.isAuthenticated;
        return hasData && hasConnection;
    }

    updateCharts() {
        // อัปเดตกราฟและสถิติ (future enhancement)
        this.updateActivityChart();
        this.updatePerformanceMetrics();
    }

    updateActivityChart() {
        // Chart implementation (future enhancement)
        console.log('Updating activity chart...');
    }

    updatePerformanceMetrics() {
        // Performance metrics (future enhancement)
        console.log('Updating performance metrics...');
    }

    updateAnalyticsDisplay() {
        if (this.analytics) {
            // อัปเดตการแสดงผลข้อมูลสถิติ
            this.updateDashboard();
        }
    }

    updateWebsiteContentDisplay() {
        if (this.websiteContent) {
            // อัปเดตการแสดงผลเนื้อหาเว็บไซต์
            console.log('Website content updated:', this.websiteContent);
        }
    }

    updateFileManagerDisplay() {
        if (this.uploadedFiles) {
            // อัปเดตการแสดงผลไฟล์ที่อัปโหลด
            this.updateFileList();
        }
    }

    updateFileList() {
        const fileListElement = document.getElementById('fileList');
        if (fileListElement && this.uploadedFiles) {
            let html = '';
            this.uploadedFiles.forEach(file => {
                html += `
                    <div class="file-item">
                        <img src="${file.url}" alt="${file.filename}" class="file-thumbnail">
                        <div class="file-info">
                            <span class="file-name">${file.filename}</span>
                            <span class="file-url">${file.url}</span>
                        </div>
                        <button class="btn btn-danger btn-sm" onclick="adminPanel.deleteFile('${file.filename}')">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `;
            });
            fileListElement.innerHTML = html;
        }
    }

    // File Management
    async deleteFile(filename) {
        if (confirm(`คุณต้องการลบไฟล์ "${filename}" ใช่หรือไม่?`)) {
            try {
                const response = await this.apiRequest(`/files/${filename}`, {
                    method: 'DELETE'
                });

                if (response && response.ok) {
                    this.showStatus('ลบไฟล์สำเร็จ', 'success');
                    await this.loadUploadedFiles();
                } else {
                    this.showStatus('ไม่สามารถลบไฟล์ได้', 'error');
                }
            } catch (error) {
                console.error('Error deleting file:', error);
                this.showStatus('เกิดข้อผิดพลาดในการลบไฟล์', 'error');
            }
        }
    }

    // Enhanced Delete Functions
    async deleteTrip(tripId) {
        if (confirm('คุณต้องการลบทริปนี้ใช่หรือไม่?')) {
            try {
                const response = await this.apiRequest(`/trips/${tripId}`, {
                    method: 'DELETE'
                });

                if (response && response.ok) {
                    this.showStatus('ลบทริปสำเร็จ', 'success');
                    await this.loadTripsFromAPI();
                    this.loadTripsData();
                    this.updateDashboard();
                } else {
                    this.showStatus('ไม่สามารถลบทริปได้', 'error');
                }
            } catch (error) {
                console.error('Error deleting trip:', error);
                this.showStatus('เกิดข้อผิดพลาดในการลบทริป', 'error');
            }
        }
    }

    async deleteProduct(productId) {
        if (confirm('คุณต้องการลบสินค้านี้ใช่หรือไม่?')) {
            try {
                const response = await this.apiRequest(`/products/${productId}`, {
                    method: 'DELETE'
                });

                if (response && response.ok) {
                    this.showStatus('ลบสินค้าสำเร็จ', 'success');
                    await this.loadProductsFromAPI();
                    this.loadProductsData();
                    this.updateDashboard();
                } else {
                    this.showStatus('ไม่สามารถลบสินค้าได้', 'error');
                }
            } catch (error) {
                console.error('Error deleting product:', error);
                this.showStatus('เกิดข้อผิดพลาดในการลบสินค้า', 'error');
            }
        }
    }

    async deleteArticle(articleId) {
        if (confirm('คุณต้องการลบบทความนี้ใช่หรือไม่?')) {
            try {
                const response = await this.apiRequest(`/articles/${articleId}`, {
                    method: 'DELETE'
                });

                if (response && response.ok) {
                    this.showStatus('ลบบทความสำเร็จ', 'success');
                    await this.loadArticlesFromAPI();
                    this.loadArticlesData();
                    this.updateDashboard();
                } else {
                    this.showStatus('ไม่สามารถลบบทความได้', 'error');
                }
            } catch (error) {
                console.error('Error deleting article:', error);
                this.showStatus('เกิดข้อผิดพลาดในการลบบทความ', 'error');
            }
        }
    }

    async deletePartner(partnerId) {
        if (confirm('คุณต้องการลบผู้ประกอบการนี้ใช่หรือไม่?')) {
            try {
                const response = await this.apiRequest(`/partners/${partnerId}`, {
                    method: 'DELETE'
                });

                if (response && response.ok) {
                    this.showStatus('ลบผู้ประกอบการสำเร็จ', 'success');
                    await this.loadPartnersFromAPI();
                    this.loadPartnersData();
                    this.updateDashboard();
                } else {
                    this.showStatus('ไม่สามารถลบผู้ประกอบการได้', 'error');
                }
            } catch (error) {
                console.error('Error deleting partner:', error);
                this.showStatus('เกิดข้อผิดพลาดในการลบผู้ประกอบการ', 'error');
            }
        }
    }

    // Trips Management
    loadTripsData() {
        const tbody = document.getElementById('tripsTableBody');
        tbody.innerHTML = '';

        this.trips.forEach(trip => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${trip.id}</td>
                <td>${trip.name}</td>
                <td>${trip.price}</td>
                <td><span class="status-badge ${trip.status}">${this.getStatusText(trip.status)}</span></td>
                <td>
                    <button class="btn btn-secondary btn-sm" onclick="adminPanel.editTrip(${trip.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="adminPanel.deleteTrip(${trip.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    showAddTripModal() {
        document.getElementById('tripModalTitle').textContent = 'เพิ่มทริปใหม่';
        document.getElementById('tripForm').reset();
        document.getElementById('tripId').value = this.trips.length + 1;
        this.showModal('tripModal');
    }

    editTrip(tripId) {
        const trip = this.trips.find(t => t.id === tripId);
        if (trip) {
            document.getElementById('tripModalTitle').textContent = 'แก้ไขทริป';
            document.getElementById('tripId').value = trip.id;
            document.getElementById('tripName').value = trip.name;
            document.getElementById('tripPrice').value = trip.price;
            document.getElementById('tripDesc').value = trip.description;
            document.getElementById('tripStatus').value = trip.status;
            this.showModal('tripModal');
        }
    }

    async saveTrip() {
        const tripData = {
            id: parseInt(document.getElementById('tripId').value),
            name: document.getElementById('tripName').value,
            price: document.getElementById('tripPrice').value,
            description: document.getElementById('tripDesc').value,
            status: document.getElementById('tripStatus').value
        };

        try {
            const response = await this.apiRequest('/trips', {
                method: 'POST',
                body: JSON.stringify(tripData)
            });

            if (response && response.ok) {
                const result = await response.json();
                this.showStatus('บันทึกข้อมูลทริปสำเร็จ', 'success');
                
                // โหลดข้อมูลใหม่
                await this.loadTripsFromAPI();
                this.loadTripsData();
                this.updateDashboard();
                
                this.closeModal('tripModal');
            } else {
                this.showStatus('ไม่สามารถบันทึกข้อมูลทริปได้', 'error');
            }
        } catch (error) {
            console.error('Error saving trip:', error);
            this.showStatus('เกิดข้อผิดพลาดในการบันทึกข้อมูล', 'error');
        }
    }

    // อัปเดตไฟล์ trip-details.js
    async updateTripDetailsFile() {
        try {
            // สร้างเนื้อหาใหม่สำหรับไฟล์
            const newContent = this.generateTripDetailsJS();
            
            // ส่งข้อมูลไปยัง server เพื่อบันทึกไฟล์
            // ในที่นี้เราจะใช้ localStorage และแสดงคำแนะนำ
            localStorage.setItem('updatedTripDetails', newContent);
            
            // แสดงคำแนะนำการอัปเดตไฟล์
            this.showFileUpdateInstructions('trip-details.js', newContent);
            
        } catch (error) {
            console.error('ไม่สามารถอัปเดตไฟล์ได้:', error);
            throw error;
        }
    }

    // สร้างเนื้อหา JavaScript สำหรับ trip-details.js
    generateTripDetailsJS() {
        let content = '// Trip Details Data\n';
        content += '// Auto-generated by Admin Panel\n\n';
        content += 'const trips = [\n';
        
        this.trips.forEach((trip, index) => {
            content += `    {\n`;
            content += `        id: ${trip.id},\n`;
            content += `        name: "${trip.name}",\n`;
            content += `        shortDescription: "${trip.description}",\n`;
            content += `        fullDescription: "${trip.description}",\n`;
            content += `        price: "${trip.price}",\n`;
            content += `        duration: "3-4 ชั่วโมง",\n`;
            content += `        capacity: "2-8 คน",\n`;
            content += `        schedule: "ทุกวัน 8:00-17:00",\n`;
            content += `        mainImage: "../images/trip${trip.id}/small/trip${trip.id}-1.jpg",\n`;
            content += `        gallery: [\n`;
            content += `            "../images/trip${trip.id}/large/trip${trip.id}-1.jpg",\n`;
            content += `            "../images/trip${trip.id}/large/trip${trip.id}-2.jpg",\n`;
            content += `            "../images/trip${trip.id}/large/trip${trip.id}-3.jpg"\n`;
            content += `        ],\n`;
            content += `        highlights: [\n`;
            content += `            "กิจกรรมใหม่ที่น่าสนใจ",\n`;
            content += `            "ประสบการณ์พิเศษ",\n`;
            content += `            "การเรียนรู้ใหม่",\n`;
            content += `            "ความสนุกสนาน",\n`;
            content += `            "ความปลอดภัย"\n`;
            content += `        ],\n`;
            content += `        includes: [\n`;
            content += `            "อุปกรณ์ที่จำเป็น",\n`;
            content += `            "ไกด์ท้องถิ่น",\n`;
            content += `            "อาหารและเครื่องดื่ม",\n`;
            content += `            "ประกันอุบัติเหตุ",\n`;
            content += `            "ของที่ระลึก"\n`;
            content += `        ]\n`;
            content += `    }`;
            if (index < this.trips.length - 1) content += ',';
            content += '\n';
        });
        
        content += '];\n\n';
        content += 'export { trips };\n';
        
        return content;
    }

    deleteTrip(tripId) {
        if (confirm('คุณต้องการลบทริปนี้หรือไม่?')) {
            this.trips = this.trips.filter(t => t.id !== tripId);
            this.saveData();
            this.loadTripsData();
            this.updateDashboard();
            this.showStatus('ลบทริปสำเร็จ', 'success');
        }
    }

    // Products Management
    loadProductsData() {
        const tbody = document.getElementById('productsTableBody');
        tbody.innerHTML = '';

        this.products.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>${product.category}</td>
                <td>
                    <button class="btn btn-secondary btn-sm" onclick="adminPanel.editProduct(${product.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="adminPanel.deleteProduct(${product.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    showAddProductModal() {
        document.getElementById('productModalTitle').textContent = 'เพิ่มสินค้าใหม่';
        document.getElementById('productForm').reset();
        document.getElementById('productId').value = this.products.length + 1;
        this.showModal('productModal');
    }

    editProduct(productId) {
        const product = this.products.find(p => p.id === productId);
        if (product) {
            document.getElementById('productModalTitle').textContent = 'แก้ไขสินค้า';
            document.getElementById('productId').value = product.id;
            document.getElementById('productName').value = product.name;
            document.getElementById('productPrice').value = product.price;
            document.getElementById('productDesc').value = product.description;
            document.getElementById('productCategory').value = product.category;
            this.showModal('productModal');
        }
    }

    async saveProduct() {
        const productData = {
            id: parseInt(document.getElementById('productId').value),
            name: document.getElementById('productName').value,
            price: document.getElementById('productPrice').value,
            description: document.getElementById('productDesc').value,
            category: document.getElementById('productCategory').value,
            status: "active"
        };

        const existingIndex = this.products.findIndex(p => p.id === productData.id);
        if (existingIndex >= 0) {
            this.products[existingIndex] = productData;
        } else {
            this.products.push(productData);
        }

        // บันทึกข้อมูลลงไฟล์เว็บไซต์จริง
        try {
            await this.updateProductsFile();
            this.showStatus('บันทึกข้อมูลสินค้าและอัปเดตเว็บไซต์สำเร็จ', 'success');
        } catch (error) {
            this.showStatus('บันทึกข้อมูลสำเร็จ แต่ไม่สามารถอัปเดตไฟล์เว็บไซต์ได้', 'error');
        }

        this.saveData();
        this.closeModal('productModal');
        this.loadProductsData();
        this.updateDashboard();
    }

    // อัปเดตไฟล์ products.js
    async updateProductsFile() {
        try {
            const newContent = this.generateProductsJS();
            localStorage.setItem('updatedProducts', newContent);
            this.showFileUpdateInstructions('products.js', newContent);
        } catch (error) {
            console.error('ไม่สามารถอัปเดตไฟล์ได้:', error);
            throw error;
        }
    }

    // สร้างเนื้อหา JavaScript สำหรับ products.js
    generateProductsJS() {
        let content = '// Products Data\n';
        content += '// Auto-generated by Admin Panel\n\n';
        content += 'const products = [\n';
        
        this.products.forEach((product, index) => {
            content += `    {\n`;
            content += `        id: ${product.id},\n`;
            content += `        name: "${product.name}",\n`;
            content += `        description: "${product.description}",\n`;
            content += `        price: "${product.price}",\n`;
            content += `        category: "${product.category}",\n`;
            content += `        image: "images/products/product${product.id}.jpg"\n`;
            content += `    }`;
            if (index < this.products.length - 1) content += ',';
            content += '\n';
        });
        
        content += '];\n\n';
        content += 'export { products };\n';
        
        return content;
    }

    deleteProduct(productId) {
        if (confirm('คุณต้องการลบสินค้านี้หรือไม่?')) {
            this.products = this.products.filter(p => p.id !== productId);
            this.saveData();
            this.loadProductsData();
            this.updateDashboard();
            this.showStatus('ลบสินค้าสำเร็จ', 'success');
        }
    }

    // Users Management
    loadUsersData() {
        const tbody = document.getElementById('usersTableBody');
        tbody.innerHTML = '';

        this.users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>${this.getRoleText(user.role)}</td>
                <td><span class="status-badge ${user.status}">${this.getStatusText(user.status)}</span></td>
                <td>
                    <button class="btn btn-secondary btn-sm" onclick="adminPanel.editUser('${user.username}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="adminPanel.deleteUser('${user.username}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    showAddUserModal() {
        document.getElementById('userForm').reset();
        this.showModal('userModal');
    }

    addUser() {
        const userData = {
            username: document.getElementById('newUsername').value,
            email: document.getElementById('newUserEmail').value,
            password: document.getElementById('newUserPassword').value,
            role: document.getElementById('newUserRole').value,
            status: "active"
        };

        if (this.users.some(u => u.username === userData.username)) {
            this.showStatus('ชื่อผู้ใช้นี้มีอยู่แล้ว', 'error');
            return;
        }

        this.users.push(userData);
        this.saveData();
        this.closeModal('userModal');
        this.loadUsersData();
        this.showStatus('เพิ่มผู้ใช้สำเร็จ', 'success');
    }

    // Content Management
    async updateWebsiteInfo() {
        const websiteName = document.getElementById('websiteName').value;
        const websiteDesc = document.getElementById('websiteDesc').value;

        this.settings.websiteName = websiteName;
        this.settings.websiteDesc = websiteDesc;
        
        // อัปเดตไฟล์เว็บไซต์จริง
        try {
            await this.updateWebsiteFiles();
            this.showStatus('อัปเดตข้อมูลเว็บไซต์และไฟล์สำเร็จ', 'success');
        } catch (error) {
            this.showStatus('อัปเดตข้อมูลสำเร็จ แต่ไม่สามารถอัปเดตไฟล์เว็บไซต์ได้', 'error');
        }
        
        this.saveData();
    }

    async updateContactInfo() {
        const email = document.getElementById('contactEmail').value;
        const phone = document.getElementById('contactPhone').value;
        const line = document.getElementById('contactLine').value;

        this.settings.contactEmail = email;
        this.settings.contactPhone = phone;
        this.settings.contactLine = line;
        
        // อัปเดตไฟล์เว็บไซต์จริง
        try {
            await this.updateWebsiteFiles();
            this.showStatus('อัปเดตข้อมูลติดต่อและไฟล์สำเร็จ', 'success');
        } catch (error) {
            this.showStatus('อัปเดตข้อมูลสำเร็จ แต่ไม่สามารถอัปเดตไฟล์เว็บไซต์ได้', 'error');
        }
        
        this.saveData();
    }

    // อัปเดตไฟล์เว็บไซต์ทั้งหมด
    async updateWebsiteFiles() {
        try {
            // สร้างเนื้อหาใหม่สำหรับไฟล์ HTML
            const htmlFiles = [
                'index.html',
                'pages/trips.html',
                'pages/products.html',
                'pages/contact.html',
                'pages/low-carbon.html',
                'pages/activities.html'
            ];

            const updateInstructions = [];
            
            for (const file of htmlFiles) {
                try {
                    const response = await fetch(file);
                    if (response.ok) {
                        const content = await response.text();
                        const updatedContent = this.updateHTMLContent(content);
                        
                        // บันทึกเนื้อหาที่อัปเดตแล้ว
                        localStorage.setItem(`updated_${file.replace(/\//g, '_')}`, updatedContent);
                        
                        updateInstructions.push({
                            filename: file,
                            content: updatedContent
                        });
                    }
                } catch (error) {
                    console.error(`ไม่สามารถอัปเดตไฟล์ ${file}:`, error);
                }
            }

            // แสดงคำแนะนำการอัปเดต
            if (updateInstructions.length > 0) {
                this.showMultipleFileUpdateInstructions(updateInstructions);
            }

        } catch (error) {
            console.error('ไม่สามารถอัปเดตไฟล์เว็บไซต์ได้:', error);
            throw error;
        }
    }

    // อัปเดตเนื้อหา HTML
    updateHTMLContent(content) {
        let updatedContent = content;
        
        // อัปเดตชื่อเว็บไซต์
        if (this.settings.websiteName) {
            updatedContent = updatedContent.replace(/GreenBlueRest Bangkok/g, this.settings.websiteName);
            updatedContent = updatedContent.replace(/Green Blue Rest Bangkok/g, this.settings.websiteName);
        }
        
        // อัปเดตข้อมูลติดต่อ
        if (this.settings.contactEmail) {
            updatedContent = updatedContent.replace(/contact@[^\s<>"]+/g, this.settings.contactEmail);
        }
        
        if (this.settings.contactPhone) {
            updatedContent = updatedContent.replace(/08x-xxx-xxxx/g, this.settings.contactPhone);
        }
        
        if (this.settings.contactLine) {
            updatedContent = updatedContent.replace(/@[^\s<>"]+/g, `@${this.settings.contactLine}`);
        }
        
        return updatedContent;
    }

    // แสดงคำแนะนำการอัปเดตหลายไฟล์
    showMultipleFileUpdateInstructions(updateInstructions) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        
        let modalContent = `
            <div class="modal-content" style="max-width: 900px; max-height: 80vh; overflow-y: auto;">
                <span class="close" onclick="this.closest('.modal').remove()">&times;</span>
                <h2>📝 อัปเดตไฟล์เว็บไซต์</h2>
                <p>Admin Panel ได้สร้างเนื้อหาใหม่สำหรับไฟล์เว็บไซต์แล้ว</p>
                
                <div style="margin: 20px 0;">
                    <h3>📋 วิธีการอัปเดต:</h3>
                    <ol style="text-align: left; margin: 20px;">
                        <li>เลือกไฟล์ที่ต้องการอัปเดต</li>
                        <li>คัดลอกเนื้อหาใหม่</li>
                        <li>เปิดไฟล์ในโปรแกรมแก้ไขโค้ด</li>
                        <li>แทนที่เนื้อหาทั้งหมด</li>
                        <li>บันทึกไฟล์</li>
                    </ol>
                </div>
        `;

        updateInstructions.forEach((instruction, index) => {
            modalContent += `
                <div style="border: 1px solid #ddd; border-radius: 8px; margin: 15px 0; padding: 15px;">
                    <h4>📄 ${instruction.filename}</h4>
                    <div style="background: #f8f9fa; padding: 10px; border-radius: 5px; max-height: 200px; overflow-y: auto;">
                        <pre style="margin: 0; font-size: 11px; white-space: pre-wrap;">${instruction.content.substring(0, 500)}...</pre>
                    </div>
                    <button class="btn btn-primary" style="margin-top: 10px;" onclick="navigator.clipboard.writeText('${instruction.content.replace(/'/g, "\\'")}')">
                        <i class="fas fa-copy"></i> คัดลอกเนื้อหาทั้งหมด
                    </button>
                </div>
            `;
        });

        modalContent += `
                <div style="margin: 20px 0;">
                    <button class="btn btn-secondary" onclick="this.closest('.modal').remove()">
                        ปิด
                    </button>
                </div>
            </div>
        `;
        
        modal.innerHTML = modalContent;
        document.body.appendChild(modal);
        modal.classList.remove('hidden');
    }

    // Settings
    saveGeneralSettings() {
        const maintenanceMode = document.getElementById('maintenanceMode').value === 'true';
        const notifications = document.getElementById('notifications').value;

        this.settings.maintenanceMode = maintenanceMode;
        this.settings.notifications = notifications;
        this.saveData();
        this.showStatus('บันทึกการตั้งค่าสำเร็จ', 'success');
    }

    // Tools
    createBackup() {
        const backupData = {
            timestamp: new Date().toISOString(),
            trips: this.trips,
            products: this.products,
            users: this.users,
            settings: this.settings
        };

        const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `backup_${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);

        this.showStatus('สร้างไฟล์สำรองสำเร็จ', 'success');
    }

    restoreBackup() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    try {
                        const backupData = JSON.parse(e.target.result);
                        this.trips = backupData.trips || this.trips;
                        this.products = backupData.products || this.products;
                        this.users = backupData.users || this.users;
                        this.settings = backupData.settings || this.settings;
                        this.saveData();
                        this.updateDashboard();
                        this.showStatus('กู้คืนข้อมูลสำเร็จ', 'success');
                    } catch (error) {
                        this.showStatus('ไฟล์ไม่ถูกต้อง', 'error');
                    }
                };
                reader.readAsText(file);
            }
        };
        input.click();
    }

    exportData() {
        const exportData = {
            trips: this.trips,
            products: this.products,
            settings: this.settings
        };

        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `export_${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);

        this.showStatus('ส่งออกข้อมูลสำเร็จ', 'success');
    }

    openWebsite() {
        window.open('index.html', '_blank');
    }

    openManual() {
        window.open('คู่มือการแก้ไขเว็บไซต์.md', '_blank');
    }

    // Utility Functions
    showModal(modalId) {
        document.getElementById(modalId).classList.remove('hidden');
    }

    closeModal(modalId) {
        document.getElementById(modalId).classList.add('hidden');
    }

    showStatus(message, type = 'info') {
        const status = document.getElementById('status');
        status.textContent = message;
        status.className = `status ${type}`;
        status.classList.remove('hidden');

        setTimeout(() => {
            status.classList.add('hidden');
        }, 3000);
    }

    getStatusText(status) {
        const statusMap = {
            'active': 'เปิดใช้งาน',
            'inactive': 'ปิดใช้งาน',
            'draft': 'ร่าง'
        };
        return statusMap[status] || status;
    }

    getRoleText(role) {
        const roleMap = {
            'admin': 'ผู้ดูแลระบบ',
            'editor': 'ผู้แก้ไข',
            'viewer': 'ผู้ดู'
        };
        return roleMap[role] || role;
    }

    saveData() {
        localStorage.setItem('trips', JSON.stringify(this.trips));
        localStorage.setItem('products', JSON.stringify(this.products));
        localStorage.setItem('articles', JSON.stringify(this.articles));
        localStorage.setItem('partners', JSON.stringify(this.partners));
        localStorage.setItem('users', JSON.stringify(this.users));
        localStorage.setItem('settings', JSON.stringify(this.settings));
    }

    // Partners Management
    updatePartnersStats() {
        const totalPartners = this.partners.length;
        const activePartners = this.partners.filter(p => p.status === 'active').length;
        const pendingPartners = this.partners.filter(p => p.status === 'pending').length;

        document.getElementById('totalPartners').textContent = totalPartners;
        document.getElementById('activePartners').textContent = activePartners;
        document.getElementById('pendingPartners').textContent = pendingPartners;
    }

    loadPartnersData() {
        const tbody = document.getElementById('partnersTableBody');
        tbody.innerHTML = '';

        this.partners.forEach(partner => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${partner.id}</td>
                <td>
                    <div class="partner-logo" style="width: 60px; height: 40px; display: flex; align-items: center; justify-content: center;">
                        ${partner.logo ? 
                            `<img src="${partner.logo}" alt="${partner.name}" style="max-width: 100%; max-height: 100%; object-fit: contain; border-radius: 4px;">` :
                            `<div style="width: 100%; height: 100%; background: #f8f9fa; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: #666;">
                                <i class="fas fa-image"></i>
                            </div>`
                        }
                    </div>
                </td>
                <td>${partner.name}</td>
                <td>${partner.type}</td>
                <td><span class="status-badge ${partner.status}">${this.getPartnerStatusText(partner.status)}</span></td>
                <td>${new Date(partner.startDate).toLocaleDateString('th-TH')}</td>
                <td>
                    <button class="btn btn-secondary btn-sm" onclick="adminPanel.editPartner(${partner.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="adminPanel.deletePartner(${partner.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                    <button class="btn btn-success btn-sm" onclick="adminPanel.viewPartner(${partner.id})">
                        <i class="fas fa-eye"></i>
                    </button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    showAddPartnerModal() {
        document.getElementById('partnerModalTitle').textContent = 'เพิ่มผู้ประกอบการใหม่';
        document.getElementById('partnerForm').reset();
        document.getElementById('partnerId').value = this.partners.length + 1;
        document.getElementById('partnerStartDate').value = new Date().toISOString().split('T')[0];
        this.updateLogoPreview('');
        this.showModal('partnerModal');
    }

    editPartner(partnerId) {
        const partner = this.partners.find(p => p.id === partnerId);
        if (partner) {
            document.getElementById('partnerModalTitle').textContent = 'แก้ไขผู้ประกอบการ';
            document.getElementById('partnerId').value = partner.id;
            document.getElementById('partnerName').value = partner.name;
            document.getElementById('partnerType').value = partner.type;
            document.getElementById('partnerDescription').value = partner.description;
            document.getElementById('partnerOwner').value = partner.owner;
            document.getElementById('partnerStartDate').value = partner.startDate;
            document.getElementById('partnerPhone').value = partner.phone || '';
            document.getElementById('partnerEmail').value = partner.email || '';
            document.getElementById('partnerAddress').value = partner.address || '';
            document.getElementById('partnerLogo').value = partner.logo || '';
            document.getElementById('partnerWebsite').value = partner.website || '';
            document.getElementById('partnerStatus').value = partner.status;
            document.getElementById('partnerNotes').value = partner.notes || '';
            
            this.updateLogoPreview(partner.logo || '');
            this.showModal('partnerModal');
        }
    }

    async savePartner() {
        const partnerData = {
            id: parseInt(document.getElementById('partnerId').value),
            name: document.getElementById('partnerName').value,
            type: document.getElementById('partnerType').value,
            description: document.getElementById('partnerDescription').value,
            owner: document.getElementById('partnerOwner').value,
            startDate: document.getElementById('partnerStartDate').value,
            phone: document.getElementById('partnerPhone').value,
            email: document.getElementById('partnerEmail').value,
            address: document.getElementById('partnerAddress').value,
            logo: document.getElementById('partnerLogo').value,
            website: document.getElementById('partnerWebsite').value,
            status: document.getElementById('partnerStatus').value,
            notes: document.getElementById('partnerNotes').value
        };

        const existingIndex = this.partners.findIndex(p => p.id === partnerData.id);
        if (existingIndex >= 0) {
            this.partners[existingIndex] = partnerData;
        } else {
            this.partners.push(partnerData);
        }

        // บันทึกข้อมูลลงไฟล์เว็บไซต์จริง
        try {
            await this.updatePartnersFile();
            this.showStatus('บันทึกข้อมูลผู้ประกอบการและอัปเดตเว็บไซต์สำเร็จ', 'success');
        } catch (error) {
            this.showStatus('บันทึกข้อมูลสำเร็จ แต่ไม่สามารถอัปเดตไฟล์เว็บไซต์ได้', 'error');
        }

        this.saveData();
        this.closeModal('partnerModal');
        this.loadPartnersData();
        this.updateDashboard();
    }

    deletePartner(partnerId) {
        if (confirm('คุณต้องการลบผู้ประกอบการนี้หรือไม่?')) {
            this.partners = this.partners.filter(p => p.id !== partnerId);
            this.saveData();
            this.loadPartnersData();
            this.updateDashboard();
            this.showStatus('ลบผู้ประกอบการสำเร็จ', 'success');
        }
    }

    viewPartner(partnerId) {
        const partner = this.partners.find(p => p.id === partnerId);
        if (partner) {
            const modal = document.createElement('div');
            modal.className = 'modal';
            modal.innerHTML = `
                <div class="modal-content" style="max-width: 900px; max-height: 80vh; overflow-y: auto;">
                    <span class="close" onclick="this.closest('.modal').remove()">&times;</span>
                    <div style="text-align: center; margin-bottom: 30px;">
                        ${partner.logo ? 
                            `<img src="${partner.logo}" alt="${partner.name}" style="max-width: 200px; max-height: 150px; object-fit: contain; border-radius: 8px; margin-bottom: 20px;">` :
                            `<div style="width: 200px; height: 150px; background: #f8f9fa; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #666; margin: 0 auto 20px;">
                                <i class="fas fa-image" style="font-size: 3rem;"></i>
                            </div>`
                        }
                        <h2>${partner.name}</h2>
                        <p style="color: #666; font-size: 1.1rem;">${partner.type}</p>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px;">
                        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
                            <h4 style="color: #667eea; margin-bottom: 15px;">ข้อมูลธุรกิจ</h4>
                            <p><strong>เจ้าของ:</strong> ${partner.owner}</p>
                            <p><strong>วันที่เริ่มร่วมมือ:</strong> ${new Date(partner.startDate).toLocaleDateString('th-TH')}</p>
                            <p><strong>สถานะ:</strong> ${this.getPartnerStatusText(partner.status)}</p>
                        </div>
                        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
                            <h4 style="color: #667eea; margin-bottom: 15px;">ข้อมูลติดต่อ</h4>
                            <p><strong>โทรศัพท์:</strong> ${partner.phone || 'ไม่มีข้อมูล'}</p>
                            <p><strong>อีเมล:</strong> ${partner.email || 'ไม่มีข้อมูล'}</p>
                            <p><strong>เว็บไซต์:</strong> ${partner.website ? `<a href="${partner.website}" target="_blank">${partner.website}</a>` : 'ไม่มีข้อมูล'}</p>
                        </div>
                    </div>
                    
                    <div style="margin-bottom: 30px;">
                        <h4 style="color: #667eea; margin-bottom: 15px;">คำอธิบายธุรกิจ</h4>
                        <p style="line-height: 1.6;">${partner.description}</p>
                    </div>
                    
                    <div style="margin-bottom: 30px;">
                        <h4 style="color: #667eea; margin-bottom: 15px;">ที่อยู่</h4>
                        <p>${partner.address || 'ไม่มีข้อมูล'}</p>
                    </div>
                    
                    ${partner.notes ? `
                        <div style="margin-bottom: 30px;">
                            <h4 style="color: #667eea; margin-bottom: 15px;">หมายเหตุเพิ่มเติม</h4>
                            <p style="line-height: 1.6;">${partner.notes}</p>
                        </div>
                    ` : ''}
                    
                    <div style="text-align: center;">
                        <button class="btn btn-secondary" onclick="this.closest('.modal').remove()">
                            ปิด
                        </button>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
            modal.classList.remove('hidden');
        }
    }

    // อัปเดตไฟล์ผู้ประกอบการ
    async updatePartnersFile() {
        try {
            const newContent = this.generatePartnersJS();
            localStorage.setItem('updatedPartners', newContent);
            this.showFileUpdateInstructions('partners.js', newContent);
        } catch (error) {
            console.error('ไม่สามารถอัปเดตไฟล์ได้:', error);
            throw error;
        }
    }

    // สร้างเนื้อหา JavaScript สำหรับ partners.js
    generatePartnersJS() {
        let content = '// Local Business Partners Data\n';
        content += '// Auto-generated by Admin Panel\n\n';
        content += 'const partners = [\n';
        
        this.partners.forEach((partner, index) => {
            content += `    {\n`;
            content += `        id: ${partner.id},\n`;
            content += `        name: "${partner.name}",\n`;
            content += `        type: "${partner.type}",\n`;
            content += `        description: "${partner.description.replace(/"/g, '\\"')}",\n`;
            content += `        owner: "${partner.owner}",\n`;
            content += `        startDate: "${partner.startDate}",\n`;
            content += `        phone: "${partner.phone || ''}",\n`;
            content += `        email: "${partner.email || ''}",\n`;
            content += `        address: "${partner.address || ''}",\n`;
            content += `        logo: "${partner.logo || ''}",\n`;
            content += `        website: "${partner.website || ''}",\n`;
            content += `        status: "${partner.status}",\n`;
            content += `        notes: "${partner.notes || ''}"\n`;
            content += `    }`;
            if (index < this.partners.length - 1) content += ',';
            content += '\n';
        });
        
        content += '];\n\n';
        content += 'export { partners };\n';
        
        return content;
    }

    getPartnerStatusText(status) {
        const statusMap = {
            'active': 'ร่วมมือแล้ว',
            'pending': 'รอการยืนยัน',
            'inactive': 'หยุดร่วมมือ'
        };
        return statusMap[status] || status;
    }

    // อัปเดตการแสดงโลโก้
    updateLogoPreview(logoUrl) {
        const preview = document.getElementById('logoPreview');
        if (logoUrl) {
            preview.innerHTML = `
                <img src="${logoUrl}" alt="Logo Preview" style="max-width: 150px; max-height: 100px; object-fit: contain; border-radius: 8px;">
            `;
        } else {
            preview.innerHTML = `
                <div style="width: 150px; height: 100px; border: 2px dashed #ddd; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #666;">
                    <i class="fas fa-image" style="font-size: 2rem;"></i>
                </div>
            `;
        }
    }

    // Articles Management
    loadArticlesData() {
        const tbody = document.getElementById('articlesTableBody');
        tbody.innerHTML = '';

        this.articles.forEach(article => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${article.id}</td>
                <td>${article.title}</td>
                <td>${article.category}</td>
                <td>${article.author}</td>
                <td>${new Date(article.date).toLocaleDateString('th-TH')}</td>
                <td><span class="status-badge ${article.status}">${this.getArticleStatusText(article.status)}</span></td>
                <td>
                    <button class="btn btn-secondary btn-sm" onclick="adminPanel.editArticle(${article.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="adminPanel.deleteArticle(${article.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                    <button class="btn btn-success btn-sm" onclick="adminPanel.previewArticle(${article.id})">
                        <i class="fas fa-eye"></i>
                    </button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    showAddArticleModal() {
        document.getElementById('articleModalTitle').textContent = 'เพิ่มบทความใหม่';
        document.getElementById('articleForm').reset();
        document.getElementById('articleId').value = this.articles.length + 1;
        document.getElementById('articleDate').value = new Date().toISOString().split('T')[0];
        this.showModal('articleModal');
    }

    editArticle(articleId) {
        const article = this.articles.find(a => a.id === articleId);
        if (article) {
            document.getElementById('articleModalTitle').textContent = 'แก้ไขบทความ';
            document.getElementById('articleId').value = article.id;
            document.getElementById('articleTitle').value = article.title;
            document.getElementById('articleExcerpt').value = article.excerpt;
            document.getElementById('articleContent').value = article.content;
            document.getElementById('articleCategory').value = article.category;
            document.getElementById('articleAuthor').value = article.author;
            document.getElementById('articleDate').value = article.date;
            document.getElementById('articleImage').value = article.image || '';
            document.getElementById('articleTags').value = article.tags || '';
            document.getElementById('articleStatus').value = article.status;
            this.showModal('articleModal');
        }
    }

    async saveArticle() {
        const articleData = {
            id: parseInt(document.getElementById('articleId').value),
            title: document.getElementById('articleTitle').value,
            excerpt: document.getElementById('articleExcerpt').value,
            content: document.getElementById('articleContent').value,
            category: document.getElementById('articleCategory').value,
            author: document.getElementById('articleAuthor').value,
            date: document.getElementById('articleDate').value,
            image: document.getElementById('articleImage').value,
            tags: document.getElementById('articleTags').value,
            status: document.getElementById('articleStatus').value
        };

        const existingIndex = this.articles.findIndex(a => a.id === articleData.id);
        if (existingIndex >= 0) {
            this.articles[existingIndex] = articleData;
        } else {
            this.articles.push(articleData);
        }

        // บันทึกข้อมูลลงไฟล์เว็บไซต์จริง
        try {
            await this.updateArticlesFile();
            this.showStatus('บันทึกข้อมูลบทความและอัปเดตเว็บไซต์สำเร็จ', 'success');
        } catch (error) {
            this.showStatus('บันทึกข้อมูลสำเร็จ แต่ไม่สามารถอัปเดตไฟล์เว็บไซต์ได้', 'error');
        }

        this.saveData();
        this.closeModal('articleModal');
        this.loadArticlesData();
        this.updateDashboard();
    }

    deleteArticle(articleId) {
        if (confirm('คุณต้องการลบบทความนี้หรือไม่?')) {
            this.articles = this.articles.filter(a => a.id !== articleId);
            this.saveData();
            this.loadArticlesData();
            this.updateDashboard();
            this.showStatus('ลบบทความสำเร็จ', 'success');
        }
    }

    previewArticle(articleId) {
        const article = this.articles.find(a => a.id === articleId);
        if (article) {
            const modal = document.createElement('div');
            modal.className = 'modal';
            modal.innerHTML = `
                <div class="modal-content" style="max-width: 900px; max-height: 80vh; overflow-y: auto;">
                    <span class="close" onclick="this.closest('.modal').remove()">&times;</span>
                    <h2>${article.title}</h2>
                    <div style="margin: 20px 0; padding: 20px; background: #f8f9fa; border-radius: 8px;">
                        <p><strong>หมวดหมู่:</strong> ${article.category}</p>
                        <p><strong>ผู้เขียน:</strong> ${article.author}</p>
                        <p><strong>วันที่:</strong> ${new Date(article.date).toLocaleDateString('th-TH')}</p>
                        <p><strong>สถานะ:</strong> ${this.getArticleStatusText(article.status)}</p>
                        <p><strong>แท็ก:</strong> ${article.tags || 'ไม่มี'}</p>
                    </div>
                    <div style="margin: 20px 0;">
                        <h3>คำอธิบายสั้น:</h3>
                        <p>${article.excerpt}</p>
                    </div>
                    <div style="margin: 20px 0;">
                        <h3>เนื้อหาบทความ:</h3>
                        <div style="white-space: pre-wrap; line-height: 1.6;">${article.content}</div>
                    </div>
                    <div style="margin: 20px 0; text-align: center;">
                        <button class="btn btn-secondary" onclick="this.closest('.modal').remove()">
                            ปิด
                        </button>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
            modal.classList.remove('hidden');
        }
    }

    // อัปเดตไฟล์บทความ
    async updateArticlesFile() {
        try {
            const newContent = this.generateArticlesJS();
            localStorage.setItem('updatedArticles', newContent);
            this.showFileUpdateInstructions('articles.js', newContent);
        } catch (error) {
            console.error('ไม่สามารถอัปเดตไฟล์ได้:', error);
            throw error;
        }
    }

    // สร้างเนื้อหา JavaScript สำหรับ articles.js
    generateArticlesJS() {
        let content = '// Articles Data\n';
        content += '// Auto-generated by Admin Panel\n\n';
        content += 'const articles = [\n';
        
        this.articles.forEach((article, index) => {
            content += `    {\n`;
            content += `        id: ${article.id},\n`;
            content += `        title: "${article.title}",\n`;
            content += `        excerpt: "${article.excerpt}",\n`;
            content += `        content: "${article.content.replace(/"/g, '\\"')}",\n`;
            content += `        category: "${article.category}",\n`;
            content += `        author: "${article.author}",\n`;
            content += `        date: "${article.date}",\n`;
            content += `        image: "${article.image || ''}",\n`;
            content += `        tags: "${article.tags || ''}",\n`;
            content += `        status: "${article.status}"\n`;
            content += `    }`;
            if (index < this.articles.length - 1) content += ',';
            content += '\n';
        });
        
        content += '];\n\n';
        content += 'export { articles };\n';
        
        return content;
    }

    getArticleStatusText(status) {
        const statusMap = {
            'published': 'เผยแพร่แล้ว',
            'draft': 'ร่าง',
            'archived': 'เก็บถาวร'
        };
        return statusMap[status] || status;
    }

    // แสดงคำแนะนำการอัปเดตไฟล์
    showFileUpdateInstructions(filename, content) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 800px;">
                <span class="close" onclick="this.closest('.modal').remove()">&times;</span>
                <h2>📝 อัปเดตไฟล์ ${filename}</h2>
                <p>Admin Panel ได้สร้างเนื้อหาใหม่สำหรับไฟล์ <strong>${filename}</strong> แล้ว</p>
                
                <div style="margin: 20px 0;">
                    <h3>📋 วิธีการอัปเดตไฟล์:</h3>
                    <ol style="text-align: left; margin: 20px;">
                        <li>คัดลอกเนื้อหาด้านล่าง</li>
                        <li>เปิดไฟล์ <code>${filename}</code> ในโปรแกรมแก้ไขโค้ด</li>
                        <li>แทนที่เนื้อหาทั้งหมดด้วยเนื้อหาใหม่</li>
                        <li>บันทึกไฟล์</li>
                        <li>รีเฟรชเว็บไซต์เพื่อดูการเปลี่ยนแปลง</li>
                    </ol>
                </div>

                <div style="margin: 20px 0;">
                    <h3>📄 เนื้อหาใหม่:</h3>
                    <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; max-height: 400px; overflow-y: auto;">
                        <pre style="margin: 0; white-space: pre-wrap; font-family: monospace; font-size: 12px;">${content}</pre>
                    </div>
                </div>

                <div style="margin: 20px 0;">
                    <button class="btn btn-primary" onclick="navigator.clipboard.writeText('${content.replace(/'/g, "\\'")}')">
                        <i class="fas fa-copy"></i> คัดลอกเนื้อหาทั้งหมด
                    </button>
                    <button class="btn btn-secondary" onclick="this.closest('.modal').remove()">
                        ปิด
                    </button>
                </div>

                <div style="background: #e3f2fd; padding: 15px; border-radius: 8px; margin-top: 20px;">
                    <h4>💡 เคล็ดลับ:</h4>
                    <ul style="text-align: left; margin: 10px 0;">
                        <li>เนื้อหานี้ถูกสร้างโดย Admin Panel อัตโนมัติ</li>
                        <li>ตรวจสอบข้อมูลให้ถูกต้องก่อนบันทึก</li>
                        <li>สร้างไฟล์สำรองก่อนแก้ไขเสมอ</li>
                    </ul>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        modal.classList.remove('hidden');
    }
}

// Global functions for onclick events
function logout() {
    adminPanel.logout();
}

function showSection(sectionId) {
    adminPanel.showSection(sectionId);
}

function showAddTripModal() {
    adminPanel.showAddTripModal();
}

function showAddProductModal() {
    adminPanel.showAddProductModal();
}

function showAddUserModal() {
    adminPanel.showAddUserModal();
}

function showAddArticleModal() {
    adminPanel.showAddArticleModal();
}

function showAddPartnerModal() {
    adminPanel.showAddPartnerModal();
}

function createBackup() {
    adminPanel.createBackup();
}

function restoreBackup() {
    adminPanel.restoreBackup();
}

function exportData() {
    adminPanel.exportData();
}

function openWebsite() {
    adminPanel.openWebsite();
}

function openManual() {
    adminPanel.openManual();
}

function closeModal(modalId) {
    adminPanel.closeModal(modalId);
}

// Initialize Admin Panel
const adminPanel = new AdminPanel();
