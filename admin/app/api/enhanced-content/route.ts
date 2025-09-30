import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { listQuerySchema, createContentSchema } from '@/lib/schema';
import { listDir, getFile, putFile } from '@/lib/github';

// GET /api/enhanced-content - List all enhanced content
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = listQuerySchema.parse({
      page: searchParams.get('page') || '1',
      limit: searchParams.get('limit') || '20',
      search: searchParams.get('search') || undefined,
      category: searchParams.get('category') || undefined,
      status: searchParams.get('status') || undefined,
      type: searchParams.get('type') || undefined,
      sort: searchParams.get('sort') || 'createdAt',
      order: searchParams.get('order') || 'desc'
    });

    // List enhanced content directory
    const contentDir = await listDir('/data/enhanced-content');
    
    if (!contentDir) {
      return NextResponse.json(
        { error: 'Failed to list content directory' },
        { status: 500 }
      );
    }

    const contentFiles = contentDir
      .filter((file: any) => file.name.endsWith('.json'))
      .map((file: any) => ({
        id: parseInt(file.name.replace('.json', '')),
        path: file.path,
        name: file.name,
        sha: file.sha || ''
      }))
      .filter((content: any) => content.id > 0);

    // Fetch content data
    const contents = [];
    for (const contentFile of contentFiles) {
      try {
        const fileResult = await getFile(contentFile.path);
        if (fileResult) {
          const content = JSON.parse(Buffer.from(fileResult.content, 'base64').toString('utf-8'));
          contents.push({
            ...content,
            id: contentFile.id,
            sha: contentFile.sha
          });
        }
      } catch (error) {
        console.error(`Error fetching content ${contentFile.id}:`, error);
      }
    }

    // Apply filters
    let filteredContents = contents;

    if (query.search) {
      const searchLower = query.search.toLowerCase();
      filteredContents = filteredContents.filter(content =>
        content.title.toLowerCase().includes(searchLower) ||
        content.excerpt?.toLowerCase().includes(searchLower) ||
        content.content.toLowerCase().includes(searchLower)
      );
    }

    if (query.category) {
      filteredContents = filteredContents.filter(content => content.category === query.category);
    }

    if (query.status) {
      filteredContents = filteredContents.filter(content => content.status === query.status);
    }

    if (query.type) {
      filteredContents = filteredContents.filter(content => content.type === query.type);
    }

    // Apply sorting
    filteredContents.sort((a, b) => {
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
    const paginatedContents = filteredContents.slice(startIndex, endIndex);

    return NextResponse.json({
      contents: paginatedContents,
      pagination: {
        page,
        limit,
        total: filteredContents.length,
        totalPages: Math.ceil(filteredContents.length / limit)
      }
    });

  } catch (error) {
    console.error('Error listing enhanced content:', error);
    
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

// POST /api/enhanced-content - Create new enhanced content
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const contentData = createContentSchema.parse(body);

    // Generate new content ID
    const contentDir = await listDir('/data/enhanced-content');
    if (!contentDir) {
      return NextResponse.json(
        { error: 'Failed to access content directory' },
        { status: 500 }
      );
    }

    const existingIds = contentDir
      .filter((file: any) => file.name.endsWith('.json'))
      .map((file: any) => parseInt(file.name.replace('.json', '')))
      .filter((id: any) => id > 0);

    const newId = existingIds.length > 0 ? Math.max(...existingIds) + 1 : 1;

    // Create content object
    const content = {
      ...contentData,
      id: newId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Save to GitHub
    const contentPath = `/data/enhanced-content/${newId}.json`;
    const contentContent = JSON.stringify(content, null, 2);
    const base64Content = Buffer.from(contentContent, 'utf-8').toString('base64');

    const result = await putFile(
      contentPath,
      base64Content,
      `chore(admin): create enhanced content ${newId} - ${content.title}`
    );

    if (!result) {
      return NextResponse.json(
        { error: 'Failed to create content' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      content,
      commit: result
    });

  } catch (error) {
    console.error('Error creating enhanced content:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid content data', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
