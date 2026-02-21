/**
 * Next.js Middleware Example
 * 
 * This file demonstrates how to use the middleware chaining system.
 * Uncomment and modify this file to enable middleware in your application.
 * 
 * For complete documentation, see: docs/MIDDLEWARE_DOCUMENTATION.md
 */

// import { NextResponse } from "next/server";
// import type { NextFetchEvent, NextRequest } from "next/server";
// import { chain } from "@/middlewares/chain";
// import { withSkipStaticMiddleware } from "@/middlewares/skip-static.middleware";
// import { withAuthGuardMiddleware } from "@/middlewares/auth-guard.middleware";

// export default function middleware(req: NextRequest, event: NextFetchEvent) {
//   const { pathname } = req.nextUrl;

//   // Public routes - no authentication required
//   const publicPaths = ["/", "/login", "/register", "/forgot-password"];
  
//   if (publicPaths.includes(pathname)) {
//     return chain([withSkipStaticMiddleware])(req, event, NextResponse.next());
//   }

//   // Protected routes - require authentication
//   return chain([
//     withSkipStaticMiddleware,
//     withAuthGuardMiddleware,
//   ])(req, event, NextResponse.next());
// }

// /**
//  * Configure which paths the middleware should run on
//  * This matcher excludes API routes, Next.js internals, and static files
//  */
// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except:
//      * 1. /api routes
//      * 2. /_next (Next.js internals)
//      * 3. /_static (static files)
//      * 4. /_vercel (Vercel internals)
//      * 5. /favicon.ico, /sitemap.xml (static files)
//      */
//     "/((?!api|_next|_static|_vercel|favicon.ico|sitemap.xml).*)",
//   ],
// };
