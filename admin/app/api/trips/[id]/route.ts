import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { updateTripSchema } from '@/lib/schema';
import { getFile, putFile, deleteFile } from '@/lib/github';

interface RouteParams {
  params: {
    id: string;
  };
}

// GET /api/trips/[id] - Get trip by ID
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const tripId = parseInt(params.id);
    
    if (isNaN(tripId)) {
      return NextResponse.json(
        { error: 'Invalid trip ID' },
        { status: 400 }
      );
    }

    const tripPath = `/data/trips/${tripId}.json`;
    const result = await getFile(tripPath);

    if (!result) {
      return NextResponse.json(
        { error: 'Trip not found' },
        { status: 404 }
      );
    }

    const content = JSON.parse(Buffer.from(result.content, 'base64').toString('utf-8'));
    
    return NextResponse.json({
      success: true,
      trip: {
        ...content,
        sha: result.sha
      }
    });

  } catch (error) {
    console.error('Error fetching trip:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/trips/[id] - Update trip
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const tripId = parseInt(params.id);
    
    if (isNaN(tripId)) {
      return NextResponse.json(
        { error: 'Invalid trip ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const updateData = updateTripSchema.parse(body);

    // Get existing trip
    const tripPath = `/data/trips/${tripId}.json`;
    const existingResult = await getFile(tripPath);

    if (!existingResult) {
      return NextResponse.json(
        { error: 'Trip not found' },
        { status: 404 }
      );
    }

    const existingTrip = JSON.parse(Buffer.from(existingResult.content, 'base64').toString('utf-8'));

    // Update trip
    const updatedTrip = {
      ...existingTrip,
      ...updateData,
      id: tripId,
      updatedAt: new Date().toISOString()
    };

    // Save to GitHub
    const tripContent = JSON.stringify(updatedTrip, null, 2);
    const base64Content = Buffer.from(tripContent, 'utf-8').toString('base64');

    const result = await putFile(
      tripPath,
      base64Content,
      `chore(admin): update trip ${tripId} - ${updatedTrip.name}`,
      existingResult.sha
    );

    if (!result) {
      return NextResponse.json(
        { error: 'Failed to update trip' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      trip: updatedTrip,
      commit: result
    });

  } catch (error) {
    console.error('Error updating trip:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid trip data', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/trips/[id] - Delete trip
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const tripId = parseInt(params.id);
    
    if (isNaN(tripId)) {
      return NextResponse.json(
        { error: 'Invalid trip ID' },
        { status: 400 }
      );
    }

    // Get existing trip for name
    const tripPath = `/data/trips/${tripId}.json`;
    const existingResult = await getFile(tripPath);

    if (!existingResult) {
      return NextResponse.json(
        { error: 'Trip not found' },
        { status: 404 }
      );
    }

    const existingTrip = JSON.parse(Buffer.from(existingResult.content, 'base64').toString('utf-8'));

    // Delete from GitHub
    const result = await deleteFile(
      tripPath,
      `chore(admin): delete trip ${tripId} - ${existingTrip.name}`,
      existingResult.sha
    );

    if (!result) {
      return NextResponse.json(
        { error: 'Failed to delete trip' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      commit: result
    });

  } catch (error) {
    console.error('Error deleting trip:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
