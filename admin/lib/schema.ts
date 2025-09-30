import { z } from 'zod';

// ========================================
// Trip Management Schemas
// ========================================

export const tripSchema = z.object({
  id: z.number(),
  name: z.string().min(1, 'ชื่อทริปต้องไม่ว่าง'),
  shortDescription: z.string().min(1, 'คำอธิบายสั้นต้องไม่ว่าง'),
  fullDescription: z.string().min(1, 'คำอธิบายเต็มต้องไม่ว่าง'),
  price: z.string().min(1, 'ราคาต้องไม่ว่าง'),
  duration: z.string().min(1, 'ระยะเวลาต้องไม่ว่าง'),
  capacity: z.string().min(1, 'ความจุต้องไม่ว่าง'),
  schedule: z.string().min(1, 'ตารางเวลาต้องไม่ว่าง'),
  mainImage: z.string().url('รูปภาพหลักต้องเป็น URL ที่ถูกต้อง'),
  gallery: z.array(z.string().url('รูปภาพแกลเลอรี่ต้องเป็น URL ที่ถูกต้อง')).default([]),
  highlights: z.array(z.string()).default([]),
  includes: z.array(z.string()).default([]),
  operator: z.string().optional(),
  category: z.string().optional(),
  status: z.enum(['active', 'inactive', 'draft']).default('draft'),
  featured: z.boolean().default(false),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional()
});

export const createTripSchema = tripSchema.omit({ id: true, createdAt: true, updatedAt: true });
export const updateTripSchema = tripSchema.partial().omit({ id: true, createdAt: true });

// ========================================
// Product Management Schemas
// ========================================

export const productSchema = z.object({
  id: z.number(),
  name: z.string().min(1, 'ชื่อสินค้าต้องไม่ว่าง'),
  price: z.string().min(1, 'ราคาต้องไม่ว่าง'),
  category: z.string().min(1, 'หมวดหมู่ต้องไม่ว่าง'),
  description: z.string().min(1, 'คำอธิบายต้องไม่ว่าง'),
  image: z.string().url('รูปภาพต้องเป็น URL ที่ถูกต้อง'),
  producer: z.string().min(1, 'ผู้ผลิตต้องไม่ว่าง'),
  stock: z.number().min(0).optional(),
  status: z.enum(['available', 'out_of_stock', 'discontinued']).default('available'),
  featured: z.boolean().default(false),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional()
});

export const createProductSchema = productSchema.omit({ id: true, createdAt: true, updatedAt: true });
export const updateProductSchema = productSchema.partial().omit({ id: true, createdAt: true });

// ========================================
// Operator Management Schemas
// ========================================

export const operatorSchema = z.object({
  id: z.number(),
  name: z.string().min(1, 'ชื่อผู้ประกอบการต้องไม่ว่าง'),
  description: z.string().min(1, 'คำอธิบายต้องไม่ว่าง'),
  type: z.string().min(1, 'ประเภทต้องไม่ว่าง'),
  address: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email('อีเมลต้องเป็นรูปแบบที่ถูกต้อง').optional(),
  website: z.string().url('เว็บไซต์ต้องเป็น URL ที่ถูกต้อง').optional(),
  image: z.string().url('รูปภาพต้องเป็น URL ที่ถูกต้อง'),
  gallery: z.array(z.string().url()).default([]),
  activities: z.array(z.string()).default([]),
  specialties: z.array(z.string()).default([]),
  status: z.enum(['active', 'inactive']).default('active'),
  featured: z.boolean().default(false),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional()
});

export const createOperatorSchema = operatorSchema.omit({ id: true, createdAt: true, updatedAt: true });
export const updateOperatorSchema = operatorSchema.partial().omit({ id: true, createdAt: true });

// ========================================
// Enhanced Content Management Schemas
// ========================================

export const contentSchema = z.object({
  id: z.number(),
  title: z.string().min(1, 'หัวข้อต้องไม่ว่าง'),
  excerpt: z.string().optional(),
  content: z.string().min(1, 'เนื้อหาต้องไม่ว่าง'),
  category: z.enum(['blog', 'vlog', 'news', 'guide']),
  type: z.enum(['article', 'video', 'gallery']).default('article'),
  image: z.string().url('รูปภาพต้องเป็น URL ที่ถูกต้อง').optional(),
  videoUrl: z.string().url('วิดีโอต้องเป็น URL ที่ถูกต้อง').optional(),
  author: z.string().optional(),
  tags: z.array(z.string()).default([]),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
  featured: z.boolean().default(false),
  publishedAt: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional()
});

export const createContentSchema = contentSchema.omit({ id: true, createdAt: true, updatedAt: true });
export const updateContentSchema = contentSchema.partial().omit({ id: true, createdAt: true });

// ========================================
// Website Settings Schemas
// ========================================

export const websiteSettingsSchema = z.object({
  id: z.string(),
  siteName: z.string().min(1, 'ชื่อเว็บไซต์ต้องไม่ว่าง'),
  siteDescription: z.string().min(1, 'คำอธิบายเว็บไซต์ต้องไม่ว่าง'),
  siteKeywords: z.string().optional(),
  siteLogo: z.string().url().optional(),
  siteFavicon: z.string().url().optional(),
  contactEmail: z.string().email().optional(),
  contactPhone: z.string().optional(),
  contactAddress: z.string().optional(),
  socialMedia: z.object({
    facebook: z.string().url().optional(),
    instagram: z.string().url().optional(),
    line: z.string().optional(),
    youtube: z.string().url().optional()
  }).default({}),
  seo: z.object({
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    metaKeywords: z.string().optional(),
    ogImage: z.string().url().optional()
  }).default({}),
  analytics: z.object({
    googleAnalytics: z.string().optional(),
    facebookPixel: z.string().optional()
  }).default({}),
  theme: z.object({
    primaryColor: z.string().optional(),
    secondaryColor: z.string().optional(),
    accentColor: z.string().optional()
  }).default({}),
  updatedAt: z.string().optional()
});

export const updateWebsiteSettingsSchema = websiteSettingsSchema.partial().omit({ id: true });

// ========================================
// Common Schemas
// ========================================

export const deleteSchema = z.object({
  id: z.union([z.string(), z.number()]),
  sha: z.string().optional()
});

export const listQuerySchema = z.object({
  page: z.string().optional().default('1'),
  limit: z.string().optional().default('20'),
  search: z.string().optional(),
  category: z.string().optional(),
  status: z.string().optional(),
  type: z.string().optional(),
  sort: z.string().optional().default('createdAt'),
  order: z.enum(['asc', 'desc']).optional().default('desc')
});

// ========================================
// Existing Schemas (keep for backward compatibility)
// ========================================

export const zMarkdownPayload = z.object({
  path: z.string(),
  frontmatter: z.object({
    title: z.string(),
    date: z.string(),
    tags: z.array(z.string()).optional(),
    status: z.enum(['draft', 'published']).default('draft'),
    cover: z.string().optional()
  }),
  body: z.string(),
  sha: z.string().optional()
});

export const zJsonPayload = z.object({
  path: z.string(),
  json: z.record(z.any()),
  sha: z.string().optional()
});

export const zDeletePayload = z.object({
  path: z.string(),
  sha: z.string()
});

// Export types
export type Trip = z.infer<typeof tripSchema>;
export type CreateTrip = z.infer<typeof createTripSchema>;
export type UpdateTrip = z.infer<typeof updateTripSchema>;

export type Product = z.infer<typeof productSchema>;
export type CreateProduct = z.infer<typeof createProductSchema>;
export type UpdateProduct = z.infer<typeof updateProductSchema>;

export type Operator = z.infer<typeof operatorSchema>;
export type CreateOperator = z.infer<typeof createOperatorSchema>;
export type UpdateOperator = z.infer<typeof updateOperatorSchema>;

export type Content = z.infer<typeof contentSchema>;
export type CreateContent = z.infer<typeof createContentSchema>;
export type UpdateContent = z.infer<typeof updateContentSchema>;

export type WebsiteSettings = z.infer<typeof websiteSettingsSchema>;
export type UpdateWebsiteSettings = z.infer<typeof updateWebsiteSettingsSchema>;

export type MarkdownPayload = z.infer<typeof zMarkdownPayload>;
export type JsonPayload = z.infer<typeof zJsonPayload>;
export type DeletePayload = z.infer<typeof zDeletePayload>;
export type ListQuery = z.infer<typeof listQuerySchema>;