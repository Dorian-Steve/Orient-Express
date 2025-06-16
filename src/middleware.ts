// src/middleware.ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher(['/protected(.*)'])

export default clerkMiddleware();

export const config = {
  matcher: [
    // Adjust paths to protect routes where auth() is used
    '/((?!api|_next|.*\\..*).*)',
  ],
};
