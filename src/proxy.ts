/**
 * Main Proxy (Middleware) Configuration
 *
 * This file chains multiple middleware functions together 
 *
 * Each middleware is a factory that wraps the next middleware in the chain.
 * Middleware can either return a response to stop the chain, or call the next middleware.
 */

import { chain } from "@/middlewares/chain";
import { withAuthGuardMiddleware } from "@/middlewares/auth-guard.middleware";
import { withSkipStaticMiddleware } from "./middlewares/skip-static.middleware";

export default chain([
  withSkipStaticMiddleware,
  withAuthGuardMiddleware,
]);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public assets (images, fonts, etc.)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)",
  ],
};
