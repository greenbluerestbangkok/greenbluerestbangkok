import { NextRequest } from 'next/server';
import { authenticate, getCurrentUser, StrapiAuthResponse, StrapiUser } from './strapi';

// JWT token management
export interface AuthSession {
  user: StrapiUser;
  token: string;
  expiresAt: number;
}

// Session storage key
const SESSION_KEY = 'strapi-auth-session';

/**
 * Get session from request cookies
 */
export function getSession(request: NextRequest): AuthSession | null {
  try {
    const sessionCookie = request.cookies.get(SESSION_KEY);
    if (!sessionCookie) {
      return null;
    }

    const session: AuthSession = JSON.parse(sessionCookie.value);
    
    // Check if session is expired
    if (Date.now() > session.expiresAt) {
      return null;
    }

    return session;
  } catch (error) {
    console.error('Error parsing session:', error);
    return null;
  }
}

/**
 * Set session in response cookies
 */
export function setSessionCookie(session: AuthSession): string {
  const expiresAt = Date.now() + (7 * 24 * 60 * 60 * 1000); // 7 days
  const sessionData = {
    ...session,
    expiresAt,
  };

  return `${SESSION_KEY}=${JSON.stringify(sessionData)}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${7 * 24 * 60 * 60}`;
}

/**
 * Clear session cookie
 */
export function clearSessionCookie(): string {
  return `${SESSION_KEY}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`;
}

/**
 * Authenticate user with Strapi
 */
export async function loginUser(credentials: { identifier: string; password: string }): Promise<AuthSession> {
  try {
    const authResponse: StrapiAuthResponse = await authenticate(credentials);
    
    const session: AuthSession = {
      user: authResponse.user,
      token: authResponse.jwt,
      expiresAt: Date.now() + (7 * 24 * 60 * 60 * 1000), // 7 days
    };

    return session;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

/**
 * Verify JWT token and get current user
 */
export async function verifyToken(token: string): Promise<StrapiUser | null> {
  try {
    const user = await getCurrentUser(token);
    return user;
  } catch (error) {
    console.error('Token verification error:', error);
    return null;
  }
}

/**
 * Middleware to require authentication
 */
export async function requireAuth(request: NextRequest): Promise<{ user: StrapiUser; token: string }> {
  const session = getSession(request);
  
  if (!session) {
    throw new Error('Authentication required');
  }

  // Verify token is still valid
  const user = await verifyToken(session.token);
  if (!user) {
    throw new Error('Invalid or expired token');
  }

  return {
    user: session.user,
    token: session.token,
  };
}

/**
 * Middleware to optionally get auth info
 */
export async function getAuth(request: NextRequest): Promise<{ user: StrapiUser; token: string } | null> {
  try {
    return await requireAuth(request);
  } catch (error) {
    return null;
  }
}

/**
 * Check if user has admin role
 */
export function isAdmin(user: StrapiUser): boolean {
  return user.role.name === 'Admin' || user.role.name === 'Super Admin';
}

/**
 * Check if user can manage content
 */
export function canManageContent(user: StrapiUser): boolean {
  return isAdmin(user) || user.role.name === 'Editor';
}

/**
 * Generate API response with auth headers
 */
export function createAuthResponse(data: any, session: AuthSession) {
  const response = new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': setSessionCookie(session),
    },
  });

  return response;
}

/**
 * Generate API response to clear auth
 */
export function createLogoutResponse() {
  const response = new Response(JSON.stringify({ success: true, message: 'Logged out successfully' }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': clearSessionCookie(),
    },
  });

  return response;
}