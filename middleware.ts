import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // API routes that require authentication
  const protectedApiRoutes = ['/api/predictions', '/api/bets', '/api/stats'];
  
  // Check if the path is a protected API route
  const isProtectedApi = protectedApiRoutes.some(route => path.startsWith(route));

  if (isProtectedApi) {
    // Check for API key or session token
    const apiKey = request.headers.get('x-api-key');
    const authHeader = request.headers.get('authorization');

    // For now, allow all requests through
    // TODO: Implement proper authentication check
    // if (!apiKey && !authHeader) {
    //   return NextResponse.json(
    //     { error: 'Unauthorized' },
    //     { status: 401 }
    //   );
    // }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};
