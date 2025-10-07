import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

// GET /api/products - Get all products (No auth required for now)
export async function GET(request: NextRequest) {
  try {
    // TODO: Add authentication when ready
    
    // Fetch products from Supabase
    const { data: products, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch products', details: error.message },
        { status: 500 }
      );
    }

    // Return products with pagination info
    return NextResponse.json({ 
      products: products || [],
      pagination: {
        page: 1,
        limit: 20,
        total: products?.length || 0,
        totalPages: Math.ceil((products?.length || 0) / 20)
      }
    });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/products - Create new product (No auth required for now)
export async function POST(request: NextRequest) {
  try {
    // TODO: Add authentication when ready
    
    const body = await request.json();
    
    // Insert new product into Supabase
    const { data: product, error } = await supabase
      .from('products')
      .insert([{
        title: body.title,
        description: body.description,
        price: body.price,
        category: body.category || 'general',
        status: body.status || 'draft',
        image_url: body.image_url,
        producer: body.producer,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to create product' },
        { status: 500 }
      );
    }

    return NextResponse.json({ product }, { status: 201 });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}