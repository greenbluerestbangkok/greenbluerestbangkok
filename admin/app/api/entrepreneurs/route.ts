import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

// GET /api/entrepreneurs - Get all entrepreneurs (No auth required for now)
export async function GET(request: NextRequest) {
  try {
    // TODO: Add authentication when ready
    
    // Fetch entrepreneurs from Supabase
    const { data: entrepreneurs, error } = await supabase
      .from('entrepreneurs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch entrepreneurs', details: error.message },
        { status: 500 }
      );
    }

    // Return entrepreneurs with pagination info
    return NextResponse.json({ 
      entrepreneurs: entrepreneurs || [],
      pagination: {
        page: 1,
        limit: 20,
        total: entrepreneurs?.length || 0,
        totalPages: Math.ceil((entrepreneurs?.length || 0) / 20)
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

// POST /api/entrepreneurs - Create new entrepreneur
export async function POST(request: NextRequest) {
  try {
    // Get token from cookie for authentication
    const token = request.cookies.get('supabase_token')?.value;
    
    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Verify token with Supabase
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    const body = await request.json();
    
    // Insert new entrepreneur into Supabase
    const { data: entrepreneur, error } = await supabase
      .from('entrepreneurs')
      .insert([{
        title: body.title,
        description: body.description,
        image_url: body.image_url,
        contact_info: body.contact_info ? JSON.stringify(body.contact_info) : null,
        location: body.location,
        category: body.category || 'general',
        status: body.status || 'draft',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to create entrepreneur' },
        { status: 500 }
      );
    }

    return NextResponse.json({ entrepreneur }, { status: 201 });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
