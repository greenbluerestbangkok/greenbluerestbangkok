import { z } from 'zod';

// Base content payload schema
const baseContentPayload = z.object({
  path: z.string().min(1).refine(
    (path) => path.startsWith('/content/') || path.startsWith('content/'),
    { message: "Path must be under /content/ directory" }
  ),
  sha: z.string().optional(),
});

// Markdown content payload
export const zMarkdownPayload = baseContentPayload.extend({
  type: z.literal('md'),
  frontmatter: z.record(z.any()).default({}),
  body: z.string(),
});

// JSON content payload
export const zJsonPayload = baseContentPayload.extend({
  type: z.literal('json'),
  json: z.any(),
});

// Delete payload
export const zDeletePayload = z.object({
  path: z.string().min(1).refine(
    (path) => path.startsWith('/content/') || path.startsWith('content/'),
    { message: "Path must be under /content/ directory" }
  ),
  sha: z.string(),
});

// Union type for content payloads
export const zContentPayload = z.union([zMarkdownPayload, zJsonPayload]);

// Type exports
export type MarkdownPayload = z.infer<typeof zMarkdownPayload>;
export type JsonPayload = z.infer<typeof zJsonPayload>;
export type ContentPayload = z.infer<typeof zContentPayload>;
export type DeletePayload = z.infer<typeof zDeletePayload>;

// Utility function to normalize paths
export function normalizeContentPath(path: string): string {
  // Remove leading slash if present and ensure it starts with content/
  let normalizedPath = path.startsWith('/') ? path.slice(1) : path;
  
  if (!normalizedPath.startsWith('content/')) {
    normalizedPath = `content/${normalizedPath}`;
  }
  
  return normalizedPath;
}

// Utility function to validate content path
export function validateContentPath(path: string): boolean {
  const normalized = normalizeContentPath(path);
  return normalized.startsWith('content/') && 
         (normalized.endsWith('.md') || normalized.endsWith('.json'));
}
