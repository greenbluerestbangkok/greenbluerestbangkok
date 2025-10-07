import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

// GET /api/entrepreneurs/[id] - Get single entrepreneur
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { data: entrepreneur, error } = await supabase
      .from('entrepreneurs')
      .select('*')
      .eq('id', params.id)
      .single();

    if (error || !entrepreneur) {
      return NextResponse.json(
        { error: 'Entrepreneur not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ entrepreneur });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/entrepreneurs/[id] - Update entrepreneur
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    
    const { data: entrepreneur, error } = await supabase
      .from('entrepreneurs')
      .update({
        name: body.name,
        description: body.description,
        category: body.category,
        contact_info: body.contact_info,
        location: body.location,
        status: body.status,
        updated_at: new Date().toISOString()
      })
      .eq('id', params.id)
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: 'Failed to update entrepreneur' },
        { status: 500 }
      );
    }

    return NextResponse.json({ entrepreneur });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/entrepreneurs/[id] - Delete entrepreneur
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { error } = await supabase
      .from('entrepreneurs')
      .delete()
      .eq('id', params.id);

    if (error) {
      return NextResponse.json(
        { error: 'Failed to delete entrepreneur' },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: 'Entrepreneur deleted successfully' });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

