import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { updateProductSchema } from '@/lib/schema';
import { getEntity, updateEntity, deleteEntity } from '@/lib/strapi';
import { requireAuth, getAuth } from '@/lib/auth';

interface RouteParams {
  params: {
    id: string;
  };
}

// GET /api/products/[id] - Get product by ID
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const productId = parseInt(params.id);
    
    if (isNaN(productId)) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      );
    }

    // Get auth info (optional for public content)
    const auth = await getAuth(request);

    // Fetch product from Strapi
    const response = await getEntity('products', productId, auth?.token);
    
    // Transform response to match expected format
    const product = {
      id: response.data.id,
      ...response.data.attributes,
      createdAt: response.data.createdAt,
      updatedAt: response.data.updatedAt,
    };
    
    return NextResponse.json({
      success: true,
      product
    });

  } catch (error) {
    console.error('Error fetching product:', error);
    
    if (error instanceof Error && error.message?.includes('not found')) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/products/[id] - Update product
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    // Require authentication
    const { token } = await requireAuth(request);
    
    const productId = parseInt(params.id);
    
    if (isNaN(productId)) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const updateData = updateProductSchema.parse(body);

    // Update product in Strapi
    const response = await updateEntity('products', productId, updateData, token);

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
      message: 'Product updated successfully'
    });

  } catch (error) {
    console.error('Error updating product:', error);
    
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

    if (error instanceof Error && error.message?.includes('not found')) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/products/[id] - Delete product
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    // Require authentication
    const { token } = await requireAuth(request);
    
    const productId = parseInt(params.id);
    
    if (isNaN(productId)) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      );
    }

    // Delete product from Strapi
    const response = await deleteEntity('products', productId, token);

    return NextResponse.json({
      success: true,
      message: 'Product deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting product:', error);
    
    if (error instanceof Error && error.message === 'Authentication required') {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    if (error instanceof Error && error.message?.includes('not found')) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
