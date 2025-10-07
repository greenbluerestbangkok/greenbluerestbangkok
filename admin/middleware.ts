import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ปล่อยให้ผ่านทันที: API routes, Login, และ public assets
  const publicPaths = [
    '/api/',
    '/login',
    '/_next/',
    '/favicon.ico',
    '/static/',
  ];

  // ตรวจสอบว่าเป็น public path หรือไม่
  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // สำหรับทุก path อื่นๆ ให้ผ่านไปก่อน (ปิดการตรวจสอบ auth ชั่วคราว)
  // TODO: เปิดใช้งาน authentication หลังจากแก้ปัญหา routing
  return NextResponse.next();

  /* 
  // Authentication code (comment ไว้ก่อน)
  const supabaseToken = request.cookies.get('supabase_token');

  if (!supabaseToken && pathname !== '/') {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname === '/' && !supabaseToken) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
  */
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
