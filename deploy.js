// Simple deployment script for static hosting
// This script helps prepare the website for deployment

const fs = require('fs');
const path = require('path');

// Configuration for deployment
const config = {
    // Static hosting services (free)
    hosting: {
        github_pages: {
            name: "GitHub Pages",
            url: "https://pages.github.com/",
            free: true,
            requirements: "GitHub account"
        },
        netlify: {
            name: "Netlify",
            url: "https://www.netlify.com/",
            free: true,
            requirements: "GitHub/GitLab account or drag-and-drop"
        },
        vercel: {
            name: "Vercel", 
            url: "https://vercel.com/",
            free: true,
            requirements: "GitHub/GitLab account"
        }
    },
    
    // Files to include in deployment
    deployFiles: [
        'index.html',
        'admin-panel.html',
        'css/',
        'js/',
        'pages/',
        'images/',
        'Logo/',
        'uploads/',
        'README.md'
    ]
};

// Create deployment package
function createDeploymentPackage() {
    console.log('🚀 Creating deployment package...');
    
    // This is just a helper - actual deployment depends on chosen service
    console.log('\n✅ Files ready for deployment:');
    config.deployFiles.forEach(file => {
        if (fs.existsSync(file)) {
            console.log(`   ✓ ${file}`);
        } else {
            console.log(`   ⚠️  ${file} (not found)`);
        }
    });
    
    console.log('\n📋 Available free hosting options:');
    Object.values(config.hosting).forEach(service => {
        console.log(`   • ${service.name} - ${service.url}`);
        console.log(`     Requirements: ${service.requirements}`);
    });
}

if (require.main === module) {
    createDeploymentPackage();
}

module.exports = { config, createDeploymentPackage };