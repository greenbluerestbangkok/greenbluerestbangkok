import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { listQuerySchema, createProductSchema } from '@/lib/schema';
import { listEntities, createEntity, StrapiEntity } from '@/lib/strapi';
import { requireAuth, getAuth } from '@/lib/auth';

// GET /api/products - List all products
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

    // Fetch products from Strapi
    const response = await listEntities('products', {
      page: parseInt(query.page),
      pageSize: parseInt(query.limit),
      search: query.search,
      category: query.category,
      status: query.status,
      sort: query.sort,
      order: query.order,
    }, auth?.token);

    // Transform Strapi response to match expected format
    const products = response.data.map((item: StrapiEntity) => ({
      id: item.id,
      ...item.attributes,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    }));

    return NextResponse.json({
      products,
      pagination: response.meta.pagination || {
        page: parseInt(query.page),
        limit: parseInt(query.limit),
        total: products.length,
        totalPages: 1
      }
    });

  } catch (error) {
    console.error('Error listing products:', error);
    
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

// POST /api/products - Create new product
export async function POST(request: NextRequest) {
  try {
    // Require authentication
    const { token } = await requireAuth(request);
    
    const body = await request.json();
    const productData = createProductSchema.parse(body);

    // Create product in Strapi
    const response = await createEntity('products', productData, token);

    // Transform response to match expected format
    const product = {
      id: response.data.id,
      ...response.data.attributes,
      createdAt: response.data.createdAt,
      updatedAt: response.data.updatedAt,
    };

    return NextResponse.json({
      success: true,
      product,
      message: 'Product created successfully'
    });

  } catch (error) {
    console.error('Error creating product:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid product data', details: error.errors },
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
