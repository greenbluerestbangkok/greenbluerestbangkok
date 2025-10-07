import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

// GET /api/videos - Get all videos (No auth required for now)
export async function GET(request: NextRequest) {
  try {
    // TODO: Add authentication when ready
    
    // Fetch videos from Supabase
    const { data: videos, error } = await supabase
      .from('videos')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch videos', details: error.message },
        { status: 500 }
      );
    }

    // Return videos with pagination info
    return NextResponse.json({ 
      videos: videos || [],
      pagination: {
        page: 1,
        limit: 20,
        total: videos?.length || 0,
        totalPages: Math.ceil((videos?.length || 0) / 20)
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

// POST /api/videos - Create new video
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
    
    // Insert new video into Supabase
    const { data: video, error } = await supabase
      .from('videos')
      .insert([{
        title: body.title,
        description: body.description,
        video_url: body.video_url,
        thumbnail_url: body.thumbnail_url,
        duration: body.duration,
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
        { error: 'Failed to create video' },
        { status: 500 }
      );
    }

    return NextResponse.json({ video }, { status: 201 });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
