import { NextRequest, NextResponse } from 'next/server';
import { createLogoutResponse } from '@/lib/auth';

// POST /api/auth/logout - Logout user
export async function POST(request: NextRequest) {
  try {
    // Create response to clear auth cookie
    return createLogoutResponse();

  } catch (error) {
    console.error('Logout error:', error);
    
    return NextResponse.json(
      { error: 'Logout failed' },
      { status: 500 }
    );
  }
}