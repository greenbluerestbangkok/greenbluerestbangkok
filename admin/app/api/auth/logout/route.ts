import { NextRequest, NextResponse } from 'next/server';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

// POST /api/auth/logout - User logout
export async function POST(request: NextRequest) {
  try {
    // Clear the cookie
    const response = NextResponse.json(
      { success: true, message: 'Logged out successfully' },
      { status: 200 }
    );

    // Remove the cookie
    response.cookies.set('supabase_token', '', {
      httpOnly: true,
      path: '/',
      maxAge: 0,
      sameSite: 'lax'
    });

    return response;

  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Logout failed' },
      { status: 500 }
    );
  }
}