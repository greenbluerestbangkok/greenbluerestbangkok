import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { listQuerySchema, createOperatorSchema } from '@/lib/schema';
import { listDir, getFile, putFile } from '@/lib/github';

// GET /api/operators - List all operators
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

    // List operators directory
    const operatorsDir = await listDir('/data/operators');
    
    if (!operatorsDir) {
      return NextResponse.json(
        { error: 'Failed to list operators directory' },
        { status: 500 }
      );
    }

    const operatorFiles = operatorsDir
      .filter((file: any) => file.name.endsWith('.json'))
      .map((file: any) => ({
        id: parseInt(file.name.replace('.json', '')),
        path: file.path,
        name: file.name,
        sha: file.sha || ''
      }))
      .filter((operator: any) => operator.id > 0);

    // Fetch operator data
    const operators = [];
    for (const operatorFile of operatorFiles) {
      try {
        const fileResult = await getFile(operatorFile.path);
        if (fileResult) {
          const content = JSON.parse(Buffer.from(fileResult.content, 'base64').toString('utf-8'));
          operators.push({
            ...content,
            id: operatorFile.id,
            sha: operatorFile.sha
          });
        }
      } catch (error) {
        console.error(`Error fetching operator ${operatorFile.id}:`, error);
      }
    }

    // Apply filters
    let filteredOperators = operators;

    if (query.search) {
      const searchLower = query.search.toLowerCase();
      filteredOperators = filteredOperators.filter(operator =>
        operator.name.toLowerCase().includes(searchLower) ||
        operator.description.toLowerCase().includes(searchLower) ||
        operator.type.toLowerCase().includes(searchLower)
      );
    }

    if (query.category) {
      filteredOperators = filteredOperators.filter(operator => operator.type === query.category);
    }

    if (query.status) {
      filteredOperators = filteredOperators.filter(operator => operator.status === query.status);
    }

    // Apply sorting
    filteredOperators.sort((a, b) => {
      const aValue = a[query.sort as keyof typeof a];
      const bValue = b[query.sort as keyof typeof b];
      
      if (query.order === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    // Apply pagination
    const page = parseInt(query.page);
    const limit = parseInt(query.limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedOperators = filteredOperators.slice(startIndex, endIndex);

    return NextResponse.json({
      operators: paginatedOperators,
      pagination: {
        page,
        limit,
        total: filteredOperators.length,
        totalPages: Math.ceil(filteredOperators.length / limit)
      }
    });

  } catch (error) {
    console.error('Error listing operators:', error);
    
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

// POST /api/operators - Create new operator
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const operatorData = createOperatorSchema.parse(body);

    // Generate new operator ID
    const operatorsDir = await listDir('/data/operators');
    if (!operatorsDir) {
      return NextResponse.json(
        { error: 'Failed to access operators directory' },
        { status: 500 }
      );
    }

    const existingIds = operatorsDir
      .filter((file: any) => file.name.endsWith('.json'))
      .map((file: any) => parseInt(file.name.replace('.json', '')))
      .filter((id: any) => id > 0);

    const newId = existingIds.length > 0 ? Math.max(...existingIds) + 1 : 1;

    // Create operator object
    const operator = {
      ...operatorData,
      id: newId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Save to GitHub
    const operatorPath = `/data/operators/${newId}.json`;
    const operatorContent = JSON.stringify(operator, null, 2);
    const base64Content = Buffer.from(operatorContent, 'utf-8').toString('base64');

    const result = await putFile(
      operatorPath,
      base64Content,
      `chore(admin): create operator ${newId} - ${operator.name}`
    );

    if (!result) {
      return NextResponse.json(
        { error: 'Failed to create operator' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      operator,
      commit: result
    });

  } catch (error) {
    console.error('Error creating operator:', error);
    
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
