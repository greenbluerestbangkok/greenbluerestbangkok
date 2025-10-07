// Mock authentication for development/testing
export interface MockUser {
  id: number;
  username: string;
  email: string;
  role: string;
}

export const MOCK_USERS: MockUser[] = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@greenbluerestbangkok.com',
    role: 'admin'
  },
  {
    id: 2,
    username: 'editor',
    email: 'editor@greenbluerestbangkok.com',
    role: 'editor'
  },
  {
    id: 3,
    username: 'manager',
    email: 'manager@greenbluerestbangkok.com',
    role: 'manager'
  }
];

export function authenticateUser(identifier: string, password: string): MockUser | null {
  // Simple mock authentication
  const validPasswords = {
    'admin': 'admin123456',
    'admin@greenbluerestbangkok.com': 'admin123456',
    'editor': 'editor123456',
    'editor@greenbluerestbangkok.com': 'editor123456',
    'manager': 'manager123456',
    'manager@greenbluerestbangkok.com': 'manager123456'
  };

  const expectedPassword = validPasswords[identifier as keyof typeof validPasswords];
  
  if (expectedPassword && password === expectedPassword) {
    const user = MOCK_USERS.find(u => 
      u.username === identifier || u.email === identifier
    );
    return user || null;
  }
  
  return null;
}

export function generateMockToken(user: MockUser): string {
  // Simple base64 encoded token
  const tokenData = {
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role
    },
    iat: Date.now(),
    exp: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
  };
  
  return Buffer.from(JSON.stringify(tokenData)).toString('base64');
}

export function verifyMockToken(token: string): MockUser | null {
  try {
    const tokenData = JSON.parse(Buffer.from(token, 'base64').toString());
    
    // Check if token is expired
    if (Date.now() > tokenData.exp) {
      return null;
    }
    
    return tokenData.user;
  } catch (error) {
    return null;
  }
}
