import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getEntity, updateEntity, deleteEntity } from '@/lib/strapi';
import { requireAuth, getAuth } from '@/lib/auth';

interface RouteParams {
  params: {
    id: string;
  };
}

// Update article schema
const updateArticleSchema = z.object({
  title: z.string().min(1, 'Title is required').optional(),
  description: z.string().optional(),
  content: z.string().optional(),
  author: z.string().optional(),
  category: z.string().optional(),
  status: z.enum(['draft', 'published']).optional(),
  image_url: z.string().url().optional(),
  slug: z.string().optional(),
});

// GET /api/articles/[id] - Get article by ID
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const articleId = parseInt(params.id);
    
    if (isNaN(articleId)) {
      return NextResponse.json(
        { error: 'Invalid article ID' },
        { status: 400 }
      );
    }

    // Get auth info (optional for public content)
    const auth = await getAuth(request);

    // Fetch article from Strapi
    const response = await getEntity('articles', articleId, auth?.token);
    
    // Transform response to match expected format
    const article = {
      id: response.data.id,
      ...response.data.attributes,
      createdAt: response.data.createdAt,
      updatedAt: response.data.updatedAt,
    };
    
    return NextResponse.json({
      success: true,
      article
    });

  } catch (error) {
    console.error('Error fetching article:', error);
    
    if (error instanceof Error && error.message?.includes('not found')) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/articles/[id] - Update article
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    // Require authentication
    const { token } = await requireAuth(request);
    
    const articleId = parseInt(params.id);
    
    if (isNaN(articleId)) {
      return NextResponse.json(
        { error: 'Invalid article ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const updateData = updateArticleSchema.parse(body);

    // Generate slug if title is updated and slug is not provided
    if (updateData.title && !updateData.slug) {
      updateData.slug = updateData.title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '');
    }

    // Update article in Strapi
    const response = await updateEntity('articles', articleId, updateData, token);

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
      message: 'Article updated successfully'
    });

  } catch (error) {
    console.error('Error updating article:', error);
    
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

    if (error instanceof Error && error.message?.includes('not found')) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/articles/[id] - Delete article
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    // Require authentication
    const { token } = await requireAuth(request);
    
    const articleId = parseInt(params.id);
    
    if (isNaN(articleId)) {
      return NextResponse.json(
        { error: 'Invalid article ID' },
        { status: 400 }
      );
    }

    // Delete article from Strapi
    const response = await deleteEntity('articles', articleId, token);

    return NextResponse.json({
      success: true,
      message: 'Article deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting article:', error);
    
    if (error instanceof Error && error.message === 'Authentication required') {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    if (error instanceof Error && error.message?.includes('not found')) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
