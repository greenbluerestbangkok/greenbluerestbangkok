const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const fs = require('fs-extra');
const path = require('path');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false
}));
app.use(cors({
    origin: [
        'http://localhost:3000', 
        'http://localhost:8000', 
        'http://127.0.0.1:3000', 
        'http://127.0.0.1:8000',
        /\.netlify\.app$/,  // Allow all Netlify domains
        /\.railway\.app$/, // Allow Railway domains
        /\.github\.io$/    // Allow GitHub Pages
    ],
    credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.static('.')); // Serve static files from current directory

// File upload configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = 'uploads/';
        fs.ensureDirSync(uploadDir);
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB limit
    },
    fileFilter: function (req, file, cb) {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'), false);
        }
    }
});

// JWT Secret (ในระบบจริงควรใช้ environment variable)
const JWT_SECRET = 'greenbluerest-secret-key-2025';

// Database simulation (ในระบบจริงควรใช้ฐานข้อมูลจริง)
let users = [
    {
        id: 1,
        username: 'admin',
        email: 'admin@greenbluerestbangkok.com',
        password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // admin123
        role: 'admin',
        status: 'active'
    },
    {
        id: 2,
        username: 'manager',
        email: 'manager@greenbluerestbangkok.com',
        password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // manager123
        role: 'manager',
        status: 'active'
    },
    {
        id: 3,
        username: 'editor',
        email: 'editor@greenbluerestbangkok.com',
        password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // editor123
        role: 'editor',
        status: 'active'
    }
];

let trips = [];
let products = [];
let articles = [];
let partners = [];
let settings = {};

// Load initial data from files
async function loadInitialData() {
    try {
        // Load trips data
        if (await fs.pathExists('js/trip-details.js')) {
            const tripContent = await fs.readFile('js/trip-details.js', 'utf8');
            // Parse trips data (simplified parsing)
            trips = [
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

        // Load products data
        if (await fs.pathExists('js/products.js')) {
            const productContent = await fs.readFile('js/products.js', 'utf8');
            products = [
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

        // Load articles data
        articles = [
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
            }
        ];

        // Load partners data
        partners = [
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
            }
        ];

        // Load settings
        settings = {
            websiteName: "GreenBlueRest Bangkok",
            websiteDesc: "เว็บไซต์ท่องเที่ยวชุมชน",
            contactEmail: "contact@greenbluerestbangkok.com",
            contactPhone: "08x-xxx-xxxx",
            contactLine: "greenbluerestbangkok",
            maintenanceMode: false,
            notifications: "all"
        };

        console.log('✅ Initial data loaded successfully');
    } catch (error) {
        console.error('❌ Error loading initial data:', error);
    }
}

// Authentication middleware
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access token required' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid or expired token' });
        }
        req.user = user;
        next();
    });
}

// Role-based access control
function requireRole(role) {
    return (req, res, next) => {
        if (req.user.role === 'admin' || req.user.role === role) {
            next();
        } else {
            res.status(403).json({ error: 'Insufficient permissions' });
        }
    };
}

// Routes

// Authentication
app.post('/api/auth/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = users.find(u => u.username === username);
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user.id, username: user.username, role: user.role },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get current user
app.get('/api/auth/me', authenticateToken, (req, res) => {
    const user = users.find(u => u.id === req.user.id);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    res.json({
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
    });
});

// Dashboard data
app.get('/api/dashboard', authenticateToken, (req, res) => {
    const totalTrips = trips.length;
    const totalProducts = products.length;
    const totalArticles = articles.length;
    const totalPartners = partners.length;
    const activePartners = partners.filter(p => p.status === 'active').length;
    const pendingPartners = partners.filter(p => p.status === 'pending').length;

    res.json({
        totalTrips,
        totalProducts,
        totalArticles,
        totalPartners,
        activePartners,
        pendingPartners,
        todayVisitors: Math.floor(Math.random() * 100) + 50,
        lastUpdate: new Date().toLocaleString('th-TH')
    });
});

// Trips API
app.get('/api/trips', authenticateToken, (req, res) => {
    res.json(trips);
});

app.post('/api/trips', authenticateToken, requireRole('editor'), async (req, res) => {
    try {
        const tripData = req.body;
        const existingIndex = trips.findIndex(t => t.id === tripData.id);
        
        if (existingIndex >= 0) {
            trips[existingIndex] = tripData;
        } else {
            trips.push(tripData);
        }

        // Update trip-details.js file
        await updateTripDetailsFile();
        
        res.json({ message: 'Trip saved successfully', trip: tripData });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save trip' });
    }
});

app.delete('/api/trips/:id', authenticateToken, requireRole('editor'), async (req, res) => {
    try {
        const tripId = parseInt(req.params.id);
        trips = trips.filter(t => t.id !== tripId);
        
        // Update trip-details.js file
        await updateTripDetailsFile();
        
        res.json({ message: 'Trip deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete trip' });
    }
});

// Products API
app.get('/api/products', authenticateToken, (req, res) => {
    res.json(products);
});

app.post('/api/products', authenticateToken, requireRole('editor'), async (req, res) => {
    try {
        const productData = req.body;
        const existingIndex = products.findIndex(p => p.id === productData.id);
        
        if (existingIndex >= 0) {
            products[existingIndex] = productData;
        } else {
            products.push(productData);
        }

        // Update products.js file
        await updateProductsFile();
        
        res.json({ message: 'Product saved successfully', product: productData });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save product' });
    }
});

app.delete('/api/products/:id', authenticateToken, requireRole('editor'), async (req, res) => {
    try {
        const productId = parseInt(req.params.id);
        products = products.filter(p => p.id !== productId);
        
        // Update products.js file
        await updateProductsFile();
        
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete product' });
    }
});

// Articles API
app.get('/api/articles', authenticateToken, (req, res) => {
    res.json(articles);
});

app.post('/api/articles', authenticateToken, requireRole('editor'), async (req, res) => {
    try {
        const articleData = req.body;
        const existingIndex = articles.findIndex(a => a.id === articleData.id);
        
        if (existingIndex >= 0) {
            articles[existingIndex] = articleData;
        } else {
            articles.push(articleData);
        }

        // Update articles.js file
        await updateArticlesFile();
        
        res.json({ message: 'Article saved successfully', article: articleData });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save article' });
    }
});

app.delete('/api/articles/:id', authenticateToken, requireRole('editor'), async (req, res) => {
    try {
        const articleId = parseInt(req.params.id);
        articles = articles.filter(a => a.id !== articleId);
        
        // Update articles.js file
        await updateArticlesFile();
        
        res.json({ message: 'Article deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete article' });
    }
});

// Partners API
app.get('/api/partners', authenticateToken, (req, res) => {
    res.json(partners);
});

app.post('/api/partners', authenticateToken, requireRole('editor'), async (req, res) => {
    try {
        const partnerData = req.body;
        const existingIndex = partners.findIndex(p => p.id === partnerData.id);
        
        if (existingIndex >= 0) {
            partners[existingIndex] = partnerData;
        } else {
            partners.push(partnerData);
        }

        // Update partners.js file
        await updatePartnersFile();
        
        res.json({ message: 'Partner saved successfully', partner: partnerData });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save partner' });
    }
});

app.delete('/api/partners/:id', authenticateToken, requireRole('editor'), async (req, res) => {
    try {
        const partnerId = parseInt(req.params.id);
        partners = partners.filter(p => p.id !== partnerId);
        
        // Update partners.js file
        await updatePartnersFile();
        
        res.json({ message: 'Partner deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete partner' });
    }
});

// Settings API
app.get('/api/settings', authenticateToken, (req, res) => {
    res.json(settings);
});

app.post('/api/settings', authenticateToken, requireRole('admin'), async (req, res) => {
    try {
        const newSettings = req.body;
        settings = { ...settings, ...newSettings };

        // Update website files
        await updateWebsiteFiles();
        
        res.json({ message: 'Settings updated successfully', settings });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update settings' });
    }
});

// File update functions
async function updateTripDetailsFile() {
    try {
        let content = '// Trip Details Data\n';
        content += '// Auto-generated by Admin Panel\n\n';
        content += 'const trips = [\n';
        
        trips.forEach((trip, index) => {
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
            if (index < trips.length - 1) content += ',';
            content += '\n';
        });
        
        content += '];\n\n';
        content += 'export { trips };\n';
        
        await fs.writeFile('js/trip-details.js', content, 'utf8');
        console.log('✅ trip-details.js updated successfully');
    } catch (error) {
        console.error('❌ Error updating trip-details.js:', error);
        throw error;
    }
}

async function updateProductsFile() {
    try {
        let content = '// Products Data\n';
        content += '// Auto-generated by Admin Panel\n\n';
        content += 'const products = [\n';
        
        products.forEach((product, index) => {
            content += `    {\n`;
            content += `        id: ${product.id},\n`;
            content += `        name: "${product.name}",\n`;
            content += `        description: "${product.description}",\n`;
            content += `        price: "${product.price}",\n`;
            content += `        category: "${product.category}",\n`;
            content += `        image: "images/products/product${product.id}.jpg"\n`;
            content += `    }`;
            if (index < products.length - 1) content += ',';
            content += '\n';
        });
        
        content += '];\n\n';
        content += 'export { products };\n';
        
        await fs.writeFile('js/products.js', content, 'utf8');
        console.log('✅ products.js updated successfully');
    } catch (error) {
        console.error('❌ Error updating products.js:', error);
        throw error;
    }
}

async function updateArticlesFile() {
    try {
        let content = '// Articles Data\n';
        content += '// Auto-generated by Admin Panel\n\n';
        content += 'const articles = [\n';
        
        articles.forEach((article, index) => {
            content += `    {\n`;
            content += `        id: ${article.id},\n`;
            content += `        title: "${article.title}",\n`;
            content += `        excerpt: "${article.excerpt}",\n`;
            content += `        content: "${article.content.replace(/"/g, '\\"')}",\n`;
            content += `        category: "${article.category}",\n`;
            content += `        author: "${article.author}",\n`;
            content += `        date: "${article.date}",\n`;
            content += `        image: "${article.image}",\n`;
            content += `        tags: "${article.tags}",\n`;
            content += `        status: "${article.status}"\n`;
            content += `    }`;
            if (index < articles.length - 1) content += ',';
            content += '\n';
        });
        
        content += '];\n\n';
        content += 'export { articles };\n';
        
        await fs.writeFile('js/articles.js', content, 'utf8');
        console.log('✅ articles.js updated successfully');
    } catch (error) {
        console.error('❌ Error updating articles.js:', error);
        throw error;
    }
}

async function updatePartnersFile() {
    try {
        let content = '// Local Business Partners Data\n';
        content += '// Auto-generated by Admin Panel\n\n';
        content += 'const partners = [\n';
        
        partners.forEach((partner, index) => {
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
            if (index < partners.length - 1) content += ',';
            content += '\n';
        });
        
        content += '];\n\n';
        content += 'export { partners };\n';
        
        await fs.writeFile('js/partners.js', content, 'utf8');
        console.log('✅ partners.js updated successfully');
    } catch (error) {
        console.error('❌ Error updating partners.js:', error);
        throw error;
    }
}

async function updateWebsiteFiles() {
    try {
        const htmlFiles = [
            'index.html',
            'pages/trips.html',
            'pages/products.html',
            'pages/contact.html',
            'pages/low-carbon.html',
            'pages/activities.html'
        ];

        for (const file of htmlFiles) {
            if (await fs.pathExists(file)) {
                let content = await fs.readFile(file, 'utf8');
                
                // Update website name
                if (settings.websiteName) {
                    content = content.replace(/GreenBlueRest Bangkok/g, settings.websiteName);
                    content = content.replace(/Green Blue Rest Bangkok/g, settings.websiteName);
                }
                
                // Update contact info
                if (settings.contactEmail) {
                    content = content.replace(/contact@[^\s<>"]+/g, settings.contactEmail);
                }
                
                if (settings.contactPhone) {
                    content = content.replace(/08x-xxx-xxxx/g, settings.contactPhone);
                }
                
                if (settings.contactLine) {
                    content = content.replace(/@[^\s<>"]+/g, `@${settings.contactLine}`);
                }
                
                await fs.writeFile(file, content, 'utf8');
                console.log(`✅ ${file} updated successfully`);
            }
        }
    } catch (error) {
        console.error('❌ Error updating website files:', error);
        throw error;
    }
}

// Backup and restore
app.post('/api/backup', authenticateToken, requireRole('admin'), async (req, res) => {
    try {
        const backupData = {
            timestamp: new Date().toISOString(),
            trips,
            products,
            articles,
            partners,
            settings
        };

        const backupDir = 'backups';
        await fs.ensureDir(backupDir);
        
        const filename = `backup_${new Date().toISOString().split('T')[0]}_${Date.now()}.json`;
        const filepath = path.join(backupDir, filename);
        
        await fs.writeFile(filepath, JSON.stringify(backupData, null, 2), 'utf8');
        
        res.json({ 
            message: 'Backup created successfully', 
            filename,
            filepath: `backups/${filename}`
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create backup' });
    }
});

app.post('/api/restore', authenticateToken, requireRole('admin'), async (req, res) => {
    try {
        const { backupData } = req.body;
        
        if (backupData.trips) trips = backupData.trips;
        if (backupData.products) products = backupData.products;
        if (backupData.articles) articles = backupData.articles;
        if (backupData.partners) partners = backupData.partners;
        if (backupData.settings) settings = backupData.settings;
        
        // Update all files
        await updateTripDetailsFile();
        await updateProductsFile();
        await updateArticlesFile();
        await updatePartnersFile();
        await updateWebsiteFiles();
        
        res.json({ message: 'Data restored successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to restore data' });
    }
});

// File upload endpoints
app.post('/api/upload/image', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const fileUrl = `/uploads/${req.file.filename}`;
        res.json({ 
            success: true, 
            fileUrl: fileUrl,
            filename: req.file.filename,
            originalName: req.file.originalname,
            size: req.file.size
        });
    } catch (error) {
        console.error('File upload error:', error);
        res.status(500).json({ error: 'File upload failed' });
    }
});

app.post('/api/upload/logo', upload.single('logo'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No logo uploaded' });
        }

        const fileUrl = `/uploads/${req.file.filename}`;
        res.json({ 
            success: true, 
            logoUrl: fileUrl,
            filename: req.file.filename
        });
    } catch (error) {
        console.error('Logo upload error:', error);
        res.status(500).json({ error: 'Logo upload failed' });
    }
});

// Get uploaded files
app.get('/api/files', async (req, res) => {
    try {
        const uploadDir = 'uploads/';
        if (await fs.pathExists(uploadDir)) {
            const files = await fs.readdir(uploadDir);
            const fileList = files.map(filename => ({
                filename: filename,
                url: `/uploads/${filename}`,
                path: path.join(uploadDir, filename)
            }));
            res.json(fileList);
        } else {
            res.json([]);
        }
    } catch (error) {
        console.error('Error reading files:', error);
        res.status(500).json({ error: 'Failed to read files' });
    }
});

// Delete uploaded file
app.delete('/api/files/:filename', async (req, res) => {
    try {
        const filename = req.params.filename;
        const filePath = path.join('uploads', filename);
        
        if (await fs.pathExists(filePath)) {
            await fs.remove(filePath);
            res.json({ success: true, message: 'File deleted' });
        } else {
            res.status(404).json({ error: 'File not found' });
        }
    } catch (error) {
        console.error('Error deleting file:', error);
        res.status(500).json({ error: 'Failed to delete file' });
    }
});

// Website content management
app.get('/api/website/content', async (req, res) => {
    try {
        const content = {
            title: 'GreenBlueRest Bangkok',
            description: 'การท่องเที่ยวอย่างยั่งยืนในกรุงเทพฯ',
            contact: {
                phone: '+66 2 123 4567',
                email: 'info@greenbluerestbangkok.com',
                address: 'กรุงเทพฯ, ประเทศไทย'
            },
            social: {
                facebook: 'https://facebook.com/greenbluerestbangkok',
                instagram: 'https://instagram.com/greenbluerestbangkok',
                line: '@greenbluerestbangkok'
            }
        };
        res.json(content);
    } catch (error) {
        res.status(500).json({ error: 'Failed to load website content' });
    }
});

// Statistics and analytics
app.get('/api/analytics', async (req, res) => {
    try {
        const stats = {
            totalTrips: trips.length,
            totalProducts: products.length,
            totalArticles: articles.length,
            totalPartners: partners.length,
            activeTrips: trips.filter(t => t.status === 'active').length,
            activeProducts: products.filter(p => p.status === 'active').length,
            publishedArticles: articles.filter(a => a.status === 'published').length,
            activePartners: partners.filter(p => p.status === 'active').length,
            lastUpdated: new Date().toISOString()
        };
        res.json(stats);
    } catch (error) {
        res.status(500).json({ error: 'Failed to load analytics' });
    }
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        version: '1.0.0',
        environment: process.env.NODE_ENV || 'development'
    });
});

// Start server
app.listen(PORT, async () => {
    console.log(`🚀 GreenBlueRest Backend Server running on port ${PORT}`);
    console.log(`📁 Serving files from: ${process.cwd()}`);
    console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
    
    if (process.env.NODE_ENV === 'production') {
        console.log(`🔗 Backend API ready at: https://your-app.railway.app`);
    } else {
        console.log(`🔗 Admin Panel: http://localhost:${PORT}/admin-panel.html`);
        console.log(`🌐 Website: http://localhost:${PORT}/main.html`);
    }
    
    // Load initial data
    await loadInitialData();
    
    console.log('✅ Server ready!');
});
