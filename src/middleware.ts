
import { auth } from "./auth";

export const middleware = auth;

// import { withAuth } from "next-auth/middleware"
// import { NextResponse } from "next/server"
// export { auth as middleware } from "@/auth"

// export default withAuth(
//   function middleware(req) {
//     const { pathname } = req.nextUrl
//     const token = req.nextauth.token

//     // Protect admin routes
//     if (pathname.startsWith("/admin")) {
//       if (!token || token.role !== "admin") {
//         return NextResponse.redirect(new URL("/auth/sign-in", req.url))
//       }
//     }

//     // Redirect authenticated users away from auth pages
//     if (pathname.startsWith("/auth") && token) {
//       return NextResponse.redirect(new URL("/dashboard", req.url))
//     }

//     return NextResponse.next()
//   },
//   {
//     callbacks: {
//       authorized: ({ token, req }) => {
//         const { pathname } = req.nextUrl
        
//         // Allow access to auth pages and public routes
//         if (pathname.startsWith("/auth") || pathname === "/") {
//           return true
//         }
        
//         // Require authentication for protected routes
//         return !!token
//       },
//       pages: {
//         signIn: '/src/app/(auth)/sign-in/page.tsx'
//       }
//     },
//   }
// )

// export const config = {
//   matcher: [
//     "/dashboard/:path*",
//     "/admin/:path*",
//     "/auth/:path*",
//   ]
// }