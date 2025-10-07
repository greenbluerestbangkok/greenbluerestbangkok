// Blog Data with Supabase Integration
// ดึงข้อมูลบทความจาก Supabase API

import { IMAGE_CONFIG } from './config.js';

// Supabase Configuration
const SUPABASE_URL = 'https://gmdvkegcejrbrobtrhfm.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdtZHZrZWdjZWpyYnJvYnRyaGZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyMzQ1NjYsImV4cCI6MjA3NDgxMDU2Nn0.n5iWM2P7G_vYs5VoIexeZ4N0ajkQtnKw8uqsCtzFZto';

// Function to fetch articles from Supabase
async function fetchArticlesFromSupabase() {
    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/articles?status=eq.published&select=*&order=created_at.desc`, {
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch articles');
        }
        
        const articles = await response.json();
        return articles;
    } catch (error) {
        console.error('Error fetching articles:', error);
        return [];
    }
}

// Function to get article by ID from Supabase
async function getArticleById(articleId) {
    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/articles?id=eq.${articleId}&select=*`, {
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch article');
        }
        
        const articles = await response.json();
        return articles[0] || null;
    } catch (error) {
        console.error('Error fetching article:', error);
        return null;
    }
}

// Function to get articles by category from Supabase
async function getArticlesByCategory(category) {
    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/articles?status=eq.published&category=eq.${category}&select=*&order=created_at.desc`, {
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch articles by category');
        }
        
        const articles = await response.json();
        return articles;
    } catch (error) {
        console.error('Error fetching articles by category:', error);
        return [];
    }
}

// Function to transform Supabase article data to match existing format
function transformArticleData(supabaseArticle) {
    if (!supabaseArticle) return null;
    
    return {
        id: supabaseArticle.id,
        title: supabaseArticle.title,
        excerpt: supabaseArticle.description,
        content: supabaseArticle.content,
        author: supabaseArticle.author,
        category: supabaseArticle.category,
        image: IMAGE_CONFIG.getBlogImageUrl(supabaseArticle.id),
        date: new Date(supabaseArticle.created_at).toLocaleDateString('th-TH'),
        slug: supabaseArticle.slug || `article-${supabaseArticle.id}`,
        status: supabaseArticle.status,
        createdAt: supabaseArticle.created_at,
        updatedAt: supabaseArticle.updated_at
    };
}

// Export functions for use in other modules
export { fetchArticlesFromSupabase, getArticleById, getArticlesByCategory, transformArticleData };

// Legacy support - maintain existing blogData structure
let blogData = [];

// Initialize blog data from Supabase
async function initializeBlogData() {
    try {
        const supabaseArticles = await fetchArticlesFromSupabase();
        blogData = supabaseArticles.map(transformArticleData).filter(article => article !== null);
        console.log('Blog data loaded from Supabase:', blogData.length, 'articles');
    } catch (error) {
        console.error('Failed to initialize blog data:', error);
        // Fallback to empty array
        blogData = [];
    }
}

// Initialize on module load
initializeBlogData();

// Export the blogData for backward compatibility
export { blogData };

// Function to get all articles
export function getAllArticles() {
    return blogData;
}

// Function to get article by ID
export function getArticleByIdLegacy(id) {
    return blogData.find(article => article.id === parseInt(id));
}

// Function to get articles by category
export function getArticlesByCategoryLegacy(category) {
    return blogData.filter(article => article.category === category);
}

// Function to search articles
export function searchArticles(query) {
    const lowercaseQuery = query.toLowerCase();
    return blogData.filter(article => 
        article.title.toLowerCase().includes(lowercaseQuery) ||
        article.excerpt.toLowerCase().includes(lowercaseQuery) ||
        article.content.toLowerCase().includes(lowercaseQuery) ||
        article.author.toLowerCase().includes(lowercaseQuery)
    );
}

// Function to get article categories
export function getArticleCategories() {
    const categories = [...new Set(blogData.map(article => article.category))];
    return categories;
}

// Function to get latest articles
export function getLatestArticles(limit = 5) {
    return blogData.slice(0, limit);
}

// Function to get featured articles
export function getFeaturedArticles(limit = 3) {
    // For now, just return the latest articles
    // In the future, you can add a "featured" field to the database
    return blogData.slice(0, limit);
}
