import { NextResponse } from 'next/server';

export async function GET() {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;
  
  return NextResponse.json({
    adminEmail,
    adminPasswordHash: adminPasswordHash ? 'SET' : 'NOT SET',
    hashLength: adminPasswordHash?.length || 0,
    timestamp: new Date().toISOString()
  });
}
