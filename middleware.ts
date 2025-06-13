// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  console.log('Middleware running for:', request.nextUrl.pathname);
  
  // Check if sessionCartId cookie exists
  const sessionCartId = request.cookies.get('sessionCartId');
  console.log('Existing sessionCartId:', sessionCartId?.value);
  
  if (!sessionCartId) {
    // Generate new sessionCartId
    const newSessionCartId = crypto.randomUUID();
    console.log('Generated new sessionCartId in middleware:', newSessionCartId);
    
    // Create response and set cookie
    const response = NextResponse.next();
    response.cookies.set('sessionCartId', newSessionCartId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: '/'
    });
    
    console.log('Set sessionCartId cookie in response');
    return response;
  }
  
  return NextResponse.next();
}

export const config = {
  // Match all request paths except for the ones starting with:
  // - api/auth (NextAuth routes)
  // - _next/static (static files)
  // - _next/image (image optimization files)
  // - favicon.ico (favicon file)
  matcher: [
    '/((?!api/auth|_next/static|_next/image|favicon.ico).*)',
  ],
}