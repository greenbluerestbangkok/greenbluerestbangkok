import { z } from 'zod';

// Schema for media delete payload
export const zMediaDeletePayload = z.object({
  path: z.string().min(1, 'Path is required'),
  sha: z.string().min(1, 'SHA is required for deletion'),
});

// Schema for media list query parameters
export const zMediaListQuery = z.object({
  page: z.string().optional().transform((val) => val ? parseInt(val, 10) : 1),
  limit: z.string().optional().transform((val) => val ? parseInt(val, 10) : 50),
  recursive: z.string().optional().transform((val) => val === 'true'),
});

// Type definitions
export type MediaDeletePayload = z.infer<typeof zMediaDeletePayload>;
export type MediaListQuery = z.infer<typeof zMediaListQuery>;

// Media file interface
export interface MediaFile {
  path: string;
  size?: number;
  sha?: string;
  type?: 'file' | 'dir';
  url?: string;
}

// Uploaded file result interface
export interface UploadedFile {
  path: string;
  originalName: string;
  size: number;
  mimeType: string;
  url: string;
}

// Path validation and normalization functions
export function normalizeMediaPath(path: string): string {
  // Remove leading slash and normalize path
  const normalized = path.replace(/^\/+/, '').replace(/\/+/g, '/');
  
  // Ensure it starts with public/images
  if (!normalized.startsWith('public/images/')) {
    throw new Error('Media path must be under public/images/');
  }
  
  return normalized;
}

export function validateMediaPath(path: string): boolean {
  try {
    normalizeMediaPath(path);
    return true;
  } catch {
    return false;
  }
}

// File validation functions
export function validateMimeType(mimeType: string): boolean {
  const allowedTypes = [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/webp'
  ];
  
  return allowedTypes.includes(mimeType.toLowerCase());
}

export function validateFileSize(size: number, maxSize: number = 8 * 1024 * 1024): boolean {
  return size <= maxSize;
}

// Path generation functions
export function generateMediaPath(originalName: string, mimeType: string): string {
  const now = new Date();
  const year = now.getFullYear().toString();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  
  // Get file extension from mime type
  const extMap: Record<string, string> = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'image/webp': 'webp'
  };
  
  const ext = extMap[mimeType.toLowerCase()] || 'jpg';
  
  // Create slugified filename without extension
  const nameWithoutExt = originalName.replace(/\.[^/.]+$/, '');
  const slugifiedName = nameWithoutExt
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  
  // Generate nanoid-like string (simple version)
  const nanoid = Math.random().toString(36).substring(2, 8);
  
  // Construct final path
  return `public/images/${year}/${month}/${slugifiedName}-${nanoid}.${ext}`;
}

// Utility function to get file size from base64
export function getBase64Size(base64: string): number {
  // Remove data URL prefix if present
  const base64Data = base64.replace(/^data:[^;]+;base64,/, '');
  
  // Calculate size (base64 is ~4/3 the size of original)
  return Math.floor(base64Data.length * 3 / 4);
}
