// Configuration for Strapi integration
export const config = {
  // Strapi API configuration
  strapi: {
    url: process.env.STRAPI_URL || 'http://localhost:1337',
    apiToken: process.env.STRAPI_API_TOKEN,
  },
  
  // Next.js configuration
  nextjs: {
    authSecret: process.env.NEXTAUTH_SECRET,
    url: process.env.NEXTAUTH_URL || 'http://localhost:3001',
  },
  
  // Environment
  env: process.env.NODE_ENV || 'development',
  
  // Features
  features: {
    enableAuth: true,
    enableFileUpload: true,
    enablePagination: true,
  },
  
  // Pagination defaults
  pagination: {
    defaultPageSize: 20,
    maxPageSize: 100,
  },
  
  // Content types
  contentTypes: {
    articles: 'articles',
    products: 'products',
    trips: 'trips',
    videos: 'videos',
    entrepreneurs: 'entrepreneurs',
  },
} as const;

export type Config = typeof config;
