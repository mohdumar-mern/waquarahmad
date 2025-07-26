import { NextResponse } from 'next/server';

const protectedRoutes = [
  '/dashboard',
  '/dashboard/projects',
  '/dashboard/skills',
  '/dashboard/services',
  '/dashboard/contact',
  '/dashboard/profile',
];

export  function middleware(request) {
  const token = request.cookies.get('token')?.value;
  const pathname = request.nextUrl.pathname;
 

  console.log('🔐 Middleware - Token:', token); // ✅ Debug log
  console.log('📍 Middleware - Pathname:', pathname);

  const isProtected = protectedRoutes.some(route => pathname.startsWith(route));

  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (pathname === '/login' && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/login',
  ],
};
