import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { listQuerySchema, createTripSchema } from '@/lib/schema';
import { listEntities, createEntity, StrapiEntity } from '@/lib/strapi';
import { requireAuth, getAuth } from '@/lib/auth';

// GET /api/trips - List all trips
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

    // Fetch trips from Strapi
    const response = await listEntities('trips', {
      page: parseInt(query.page),
      pageSize: parseInt(query.limit),
      search: query.search,
      category: query.category,
      status: query.status,
      sort: query.sort,
      order: query.order,
    }, auth?.token);

    // Transform Strapi response to match expected format
    const trips = response.data.map((item: StrapiEntity) => ({
      id: item.id,
      ...item.attributes,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    }));

    return NextResponse.json({
      trips,
      pagination: response.meta.pagination || {
        page: parseInt(query.page),
        limit: parseInt(query.limit),
        total: trips.length,
        totalPages: 1
      }
    });

  } catch (error) {
    console.error('Error listing trips:', error);
    
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

// POST /api/trips - Create new trip
export async function POST(request: NextRequest) {
  try {
    // Require authentication
    const { token } = await requireAuth(request);
    
    const body = await request.json();
    const tripData = createTripSchema.parse(body);

    // Create trip in Strapi
    const response = await createEntity('trips', tripData, token);

    // Transform response to match expected format
    const trip = {
      id: response.data.id,
      ...response.data.attributes,
      createdAt: response.data.createdAt,
      updatedAt: response.data.updatedAt,
    };

    return NextResponse.json({
      success: true,
      trip,
      message: 'Trip created successfully'
    });

  } catch (error) {
    console.error('Error creating trip:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid trip data', details: error.errors },
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
