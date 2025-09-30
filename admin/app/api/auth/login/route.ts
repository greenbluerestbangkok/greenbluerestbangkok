import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { loginUser, createAuthResponse } from '@/lib/auth';

// Login schema
const loginSchema = z.object({
  identifier: z.string().min(1, 'Username or email is required'),
  password: z.string().min(1, 'Password is required'),
});

// POST /api/auth/login - Authenticate user
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const credentials = loginSchema.parse(body);

    // Authenticate with Strapi
    const session = await loginUser(credentials);

    // Create response with auth cookie
    return createAuthResponse({
      success: true,
      message: 'Login successful',
      user: {
        id: session.user.id,
        username: session.user.username,
        email: session.user.email,
        role: session.user.role.name,
      }
    }, session);

  } catch (error) {
    console.error('Login error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid credentials format', details: error.errors },
        { status: 400 }
      );
    }

    if (error instanceof Error && error.message?.includes('Invalid credentials')) {
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 401 }
    );
  }
}