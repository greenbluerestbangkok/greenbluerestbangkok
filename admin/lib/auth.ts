import { NextRequest } from 'next/server';

// Mock user interface
export interface AuthSession {
  user: {
    id: number;
    username: string;
    email: string;
    role: string;
  };
  token: string;
  expiresAt: number;
}

// Mock authentication function
export async function authenticateUser(identifier: string, password: string): Promise<AuthSession | null> {
  // Mock users
  const mockUsers = [
    {
      id: 1,
      username: 'admin',
      email: 'admin@greenbluerestbangkok.com',
      role: 'admin',
      password: 'admin123456'
    }
  ];

  const user = mockUsers.find(u => 
    (u.username === identifier || u.email === identifier) && 
    u.password === password
  );

  if (!user) {
    return null;
  }

  return {
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role
    },
    token: 'mock_jwt_token_' + Date.now(),
    expiresAt: Date.now() + (7 * 24 * 60 * 60 * 1000) // 7 days
  };
}

// Mock token verification
export async function verifyToken(token: string): Promise<AuthSession | null> {
  if (!token.startsWith('mock_jwt_token_')) {
    return null;
  }

  // Return mock admin user
  return {
    user: {
      id: 1,
      username: 'admin',
      email: 'admin@greenbluerestbangkok.com',
      role: 'admin'
    },
    token,
    expiresAt: Date.now() + (7 * 24 * 60 * 60 * 1000)
  };
}

// Get current user from request
export async function getCurrentUser(request: NextRequest): Promise<AuthSession | null> {
  const token = request.cookies.get('strapi_token')?.value;
  
  if (!token) {
    return null;
  }

  return await verifyToken(token);
}

// Require authentication middleware
export async function requireAuth(request: NextRequest): Promise<AuthSession> {
  const session = await getCurrentUser(request);
  
  if (!session) {
    throw new Error('Authentication required');
  }

  return session;
}