import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

// GET /api/articles - Get all articles (No auth required for now)
export async function GET(request: NextRequest) {
  try {
    // TODO: Add authentication when ready
    
    // Fetch articles from Supabase
    const { data: articles, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch articles', details: error.message },
        { status: 500 }
      );
    }

    // Return articles with pagination info
    return NextResponse.json({ 
      articles: articles || [],
      pagination: {
        page: 1,
        limit: 20,
        total: articles?.length || 0,
        totalPages: Math.ceil((articles?.length || 0) / 20)
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

// POST /api/articles - Create new article
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
    
    // Insert new article into Supabase
    const { data: article, error } = await supabase
      .from('articles')
      .insert([{
        title: body.title,
        description: body.description,
        content: body.content,
        category: body.category || 'general',
        status: body.status || 'draft',
        image_url: body.image_url,
        gallery: body.gallery ? JSON.stringify(body.gallery) : null,
        author: body.author || user.email,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to create article' },
        { status: 500 }
      );
    }

    return NextResponse.json({ article }, { status: 201 });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}