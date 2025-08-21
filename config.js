// Configuration for Frontend-Backend Connection
// Update these URLs after deploying your backend

const CONFIG = {
    // Backend API Configuration
    API_BASE_URL: window.location.hostname === 'localhost' 
        ? 'http://localhost:3000/api'
        : 'https://YOUR-BACKEND-URL.railway.app/api', // เปลี่ยนเป็น URL จริงของคุณ
    
    // WebSocket Configuration  
    WS_URL: window.location.hostname === 'localhost'
        ? 'ws://localhost:3000'
        : 'wss://YOUR-BACKEND-URL.railway.app', // เปลี่ยนเป็น URL จริงของคุณ
    
    // App Configuration
    APP_NAME: 'GreenBlueRest Bangkok',
    VERSION: '1.0.0',
    
    // Default Admin Credentials
    DEFAULT_ADMIN: {
        username: 'admin',
        password: 'admin123'
    },
    
    // Deployment URLs (update after deployment)
    FRONTEND_URL: window.location.hostname === 'localhost'
        ? 'http://localhost:3000'
        : 'https://YOUR-USERNAME.github.io/community-trip-website', // เปลี่ยนเป็น GitHub Pages URL ของคุณ
    
    // Available Hosting Services
    HOSTING_OPTIONS: {
        backend: {
            railway: {
                name: 'Railway',
                url: 'https://railway.app',
                free: '500 hours/month',
                recommended: true
            },
            render: {
                name: 'Render', 
                url: 'https://render.com',
                free: 'Unlimited but sleeps',
                recommended: false
            }
        },
        frontend: {
            github_pages: {
                name: 'GitHub Pages',
                url: 'https://pages.github.com',
                free: 'Unlimited',
                recommended: true
            },
            netlify: {
                name: 'Netlify',
                url: 'https://netlify.com', 
                free: 'Unlimited',
                recommended: true
            }
        }
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
} else {
    window.CONFIG = CONFIG;
}