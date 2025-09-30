import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { listQuerySchema } from '@/lib/schema';
import { listEntities, createEntity, StrapiEntity } from '@/lib/strapi';
import { requireAuth, getAuth } from '@/lib/auth';

// Create article schema
const createArticleSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  content: z.string().optional(),
  author: z.string().optional(),
  category: z.string().optional(),
  status: z.enum(['draft', 'published']).default('draft'),
  image_url: z.string().url().optional(),
  slug: z.string().optional(),
});

// GET /api/articles - List all articles
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = listQuerySchema.parse({
      page: searchParams.get('page') || '1',
      limit: searchParams.get('limit') || '20',
      search: searchParams.get('search') || undefined,
      category: searchParams.get('category') || undefined,
      status: searchParams.get('status') || undefined,
      sort: searchParams.get('sort') || 'createdAt',
      order: searchParams.get('order') || 'desc'
    });

    // Get auth info (optional for public content)
    const auth = await getAuth(request);

    // Fetch articles from Strapi
    const response = await listEntities('articles', {
      page: parseInt(query.page),
      pageSize: parseInt(query.limit),
      search: query.search,
      category: query.category,
      status: query.status,
      sort: query.sort,
      order: query.order,
    }, auth?.token);

    // Transform Strapi response to match expected format
    const articles = response.data.map((item: StrapiEntity) => ({
      id: item.id,
      ...item.attributes,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    }));

    return NextResponse.json({
      articles,
      pagination: response.meta.pagination || {
        page: parseInt(query.page),
        limit: parseInt(query.limit),
        total: articles.length,
        totalPages: 1
      }
    });

  } catch (error) {
    console.error('Error listing articles:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid query parameters', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/articles - Create new article
export async function POST(request: NextRequest) {
  try {
    // Require authentication
    const { token } = await requireAuth(request);
    
    const body = await request.json();
    const articleData = createArticleSchema.parse(body);

    // Generate slug if not provided
    if (!articleData.slug) {
      articleData.slug = articleData.title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '');
    }

    // Create article in Strapi
    const response = await createEntity('articles', articleData, token);

    // Transform response to match expected format
    const article = {
      id: response.data.id,
      ...response.data.attributes,
      createdAt: response.data.createdAt,
      updatedAt: response.data.updatedAt,
    };

    return NextResponse.json({
      success: true,
      article,
      message: 'Article created successfully'
    });

  } catch (error) {
    console.error('Error creating article:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid article data', details: error.errors },
        { status: 400 }
      );
    }

    if (error instanceof Error && error.message === 'Authentication required') {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
