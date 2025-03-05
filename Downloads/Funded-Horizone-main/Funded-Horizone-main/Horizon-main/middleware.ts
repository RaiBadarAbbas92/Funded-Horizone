import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname

  // Define public paths that don't require authentication
  const isPublicPath = path === '/login' || path === '/signup'

  // Get the token from the cookies
  const token = request.cookies.get('admin-token')?.value || ''

  // If the path starts with /dashboard/admin
  if (path.startsWith('/dashboard/admin')) {
    // If there's no token and we're not on a public path, redirect to login
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // If we're on a public path and have a token, redirect to admin dashboard
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/dashboard/admin', request.url))
  }

  return NextResponse.next()
}

// Configure the paths that middleware will run on
export const config = {
  matcher: [
    '/dashboard/admin/:path*',
    '/login',
    '/signup'
  ]
} 