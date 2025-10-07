import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

// GET /api/trips - Get all trips (No auth required for now)
export async function GET(request: NextRequest) {
  try {
    // TODO: Add authentication when ready
    // For now, allow all requests for testing
    
    // Fetch trips from Supabase
    const { data: trips, error } = await supabase
      .from('trips')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch trips', details: error.message },
        { status: 500 }
      );
    }

    // Return trips with pagination info
    return NextResponse.json({ 
      trips: trips || [],
      pagination: {
        page: 1,
        limit: 20,
        total: trips?.length || 0,
        totalPages: Math.ceil((trips?.length || 0) / 20)
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

// POST /api/trips - Create new trip (No auth required for now)
export async function POST(request: NextRequest) {
  try {
    // TODO: Add authentication when ready
    
    const body = await request.json();
    
    // Insert new trip into Supabase
    const { data: trip, error } = await supabase
      .from('trips')
      .insert([{
        title: body.title,
        description: body.description,
        content: body.content,
        price: body.price,
        duration: body.duration,
        capacity: body.capacity,
        status: body.status || 'draft',
        image_url: body.image_url,
        gallery: body.gallery ? JSON.stringify(body.gallery) : null,
        highlights: body.highlights ? JSON.stringify(body.highlights) : null,
        includes: body.includes ? JSON.stringify(body.includes) : null,
        schedule: body.schedule,
        video_url: body.video_url,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to create trip' },
        { status: 500 }
      );
    }

    return NextResponse.json({ trip }, { status: 201 });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}