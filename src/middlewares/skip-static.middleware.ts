import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";
import { CustomMiddleware } from "./chain";

/**
 * Skip middleware for static resources, API routes, and Next.js internals
 * This should typically be the first middleware in the chain
 */
export function withSkipStaticMiddleware(
  middleware: CustomMiddleware,
): CustomMiddleware {
  return async (
    request: NextRequest,
    event: NextFetchEvent,
    response: NextResponse,
  ) => {
    const { pathname } = request.nextUrl;

    // Skip middleware for:
    // - Next.js internals (_next)
    // - API routes (/api)
    // - Static files (contains .)
    // - Favicon
    if (
      pathname.startsWith("/_next") ||
      pathname.startsWith("/api") ||
      pathname.includes(".") ||
      pathname.startsWith("/favicon")
    ) {
      return response;
    }

    // Continue to next middleware
    return middleware(request, event, response);
  };
}
