import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { updateOperatorSchema } from '@/lib/schema';
import { getFile, putFile, deleteFile } from '@/lib/github';

interface RouteParams {
  params: {
    id: string;
  };
}

// GET /api/operators/[id] - Get operator by ID
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const operatorId = parseInt(params.id);
    
    if (isNaN(operatorId)) {
      return NextResponse.json(
        { error: 'Invalid operator ID' },
        { status: 400 }
      );
    }

    const operatorPath = `/data/operators/${operatorId}.json`;
    const result = await getFile(operatorPath);

    if (!result) {
      return NextResponse.json(
        { error: 'Operator not found' },
        { status: 404 }
      );
    }

    const content = JSON.parse(Buffer.from(result.content, 'base64').toString('utf-8'));
    
    return NextResponse.json({
      success: true,
      operator: {
        ...content,
        sha: result.sha
      }
    });

  } catch (error) {
    console.error('Error fetching operator:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/operators/[id] - Update operator
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const operatorId = parseInt(params.id);
    
    if (isNaN(operatorId)) {
      return NextResponse.json(
        { error: 'Invalid operator ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const updateData = updateOperatorSchema.parse(body);

    // Get existing operator
    const operatorPath = `/data/operators/${operatorId}.json`;
    const existingResult = await getFile(operatorPath);

    if (!existingResult) {
      return NextResponse.json(
        { error: 'Operator not found' },
        { status: 404 }
      );
    }

    const existingOperator = JSON.parse(Buffer.from(existingResult.content, 'base64').toString('utf-8'));

    // Update operator
    const updatedOperator = {
      ...existingOperator,
      ...updateData,
      id: operatorId,
      updatedAt: new Date().toISOString()
    };

    // Save to GitHub
    const operatorContent = JSON.stringify(updatedOperator, null, 2);
    const base64Content = Buffer.from(operatorContent, 'utf-8').toString('base64');

    const result = await putFile(
      operatorPath,
      base64Content,
      `chore(admin): update operator ${operatorId} - ${updatedOperator.name}`,
      existingResult.sha
    );

    if (!result) {
      return NextResponse.json(
        { error: 'Failed to update operator' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      operator: updatedOperator,
      commit: result
    });

  } catch (error) {
    console.error('Error updating operator:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid operator data', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/operators/[id] - Delete operator
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const operatorId = parseInt(params.id);
    
    if (isNaN(operatorId)) {
      return NextResponse.json(
        { error: 'Invalid operator ID' },
        { status: 400 }
      );
    }

    // Get existing operator for name
    const operatorPath = `/data/operators/${operatorId}.json`;
    const existingResult = await getFile(operatorPath);

    if (!existingResult) {
      return NextResponse.json(
        { error: 'Operator not found' },
        { status: 404 }
      );
    }

    const existingOperator = JSON.parse(Buffer.from(existingResult.content, 'base64').toString('utf-8'));

    // Delete from GitHub
    const result = await deleteFile(
      operatorPath,
      `chore(admin): delete operator ${operatorId} - ${existingOperator.name}`,
      existingResult.sha
    );

    if (!result) {
      return NextResponse.json(
        { error: 'Failed to delete operator' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      commit: result
    });

  } catch (error) {
    console.error('Error deleting operator:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
