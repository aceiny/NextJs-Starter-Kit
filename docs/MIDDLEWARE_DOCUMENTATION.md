# Middleware & Middleware Chaining Documentation

This document describes the middleware system and chaining implementation in the Next.js Starter Kit.

## 📋 Table of Contents

- [Overview](#overview)
- [Quick Start](#quick-start)
- [Middleware Chain System](#middleware-chain-system)
- [Available Middlewares](#available-middlewares)
- [Setting Up Middleware](#setting-up-middleware)
- [Creating Custom Middlewares](#creating-custom-middlewares)
- [Best Practices](#best-practices)
- [Examples](#examples)

---

## Overview

The starter kit includes a **composable middleware system** that allows you to chain multiple middleware functions together. This provides a clean, maintainable way to handle cross-cutting concerns like authentication, logging, rate limiting, and more.

### Key Features

- ✅ **Middleware Chaining** - Compose multiple middlewares in sequence
- ✅ **Type-Safe** - Full TypeScript support with custom middleware types
- ✅ **Reusable** - Create once, use in any order
- ✅ **Skip Static Assets** - Automatically bypass middleware for static files
- ✅ **Auth Guard** - Built-in authentication middleware
- ✅ **Easy to Extend** - Simple pattern for adding new middlewares

### File Locations

```
src/
├── middlewares/
│   ├── chain.ts                   # Core chaining mechanism
│   ├── auth-guard.middleware.ts   # Authentication middleware
│   └── skip-static.middleware.ts  # Skip static assets
└── middleware.example.ts          # Example setup (rename to middleware.ts to activate)
```

---

## Quick Start

To activate the middleware system:

1. **Rename the example file:**
   ```bash
   mv src/middleware.example.ts src/middleware.ts
   ```

2. **Uncomment the code** in `src/middleware.ts`

3. **Customize for your needs:**
   - Add or remove middlewares from the chain
   - Define public and protected routes
   - Add custom middleware logic

4. **Start your development server:**
   ```bash
   npm run dev
   ```

That's it! Your middleware is now active and will run on all matching routes.

---

## Middleware Chain System

### Core Implementation

The middleware chain is implemented using a functional composition pattern:

```typescript
// src/middlewares/chain.ts
export type CustomMiddleware = (
  request: NextRequest,
  event: NextFetchEvent,
  response: NextResponse,
) => NextMiddlewareResult | Promise<NextMiddlewareResult>;

type MiddlewareFactory = (middleware: CustomMiddleware) => CustomMiddleware;

export function chain(
  functions: MiddlewareFactory[],
  index = 0,
): CustomMiddleware {
  const current = functions[index];

  if (current) {
    const next = chain(functions, index + 1);
    return current(next);
  }

  return (
    request: NextRequest,
    event: NextFetchEvent,
    response: NextResponse,
  ) => {
    return response;
  };
}
```

### How It Works

1. **Recursive Composition** - Each middleware wraps the next one in the chain
2. **Request Flow** - Request passes through each middleware in order
3. **Response Control** - Any middleware can return early to stop the chain
4. **Context Passing** - Request, event, and response objects flow through all middlewares

---

## Available Middlewares

### 1. Skip Static Middleware

**File:** `src/middlewares/skip-static.middleware.ts`

Skips middleware execution for static assets, API routes, and Next.js internals. This should typically be the **first middleware** in your chain.

```typescript
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
```

**What it skips:**
- `/_next/*` - Next.js internal files
- `/api/*` - API routes
- Files with extensions (`.js`, `.css`, `.png`, etc.)
- `/favicon.ico`

### 2. Auth Guard Middleware

**File:** `src/middlewares/auth-guard.middleware.ts`

Protects routes by checking for authentication tokens in cookies.

```typescript
export function withAuthGuardMiddleware(
  middleware: CustomMiddleware,
): CustomMiddleware {
  return async (
    request: NextRequest,
    event: NextFetchEvent,
    response: NextResponse,
  ) => {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL(APP_PATHS.AUTH.LOGIN, request.url));
    }

    return middleware(request, event, response);
  };
}
```

**Features:**
- Checks for authentication token in cookies
- Redirects unauthenticated users to login
- Passes authenticated requests to next middleware

---

## Setting Up Middleware

To use the middleware chain in your Next.js application, create a `middleware.ts` file in the root of your `src` directory:

### Basic Setup

```typescript
// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";
import { chain } from "@/middlewares/chain";
import { withSkipStaticMiddleware } from "@/middlewares/skip-static.middleware";
import { withAuthGuardMiddleware } from "@/middlewares/auth-guard.middleware";

export default function middleware(req: NextRequest, event: NextFetchEvent) {
  const middlewares = [
    withSkipStaticMiddleware,
    withAuthGuardMiddleware,
  ];

  return chain(middlewares)(req, event, NextResponse.next());
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (static files)
     * 4. /_vercel (Vercel internals)
     * 5. /favicon.ico, /sitemap.xml (static files)
     */
    "/((?!api|_next|_static|_vercel|favicon.ico|sitemap.xml).*)",
  ],
};
```

### With Path-Specific Guards

You can create conditional middleware that only runs on specific paths:

```typescript
// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";
import { chain } from "@/middlewares/chain";
import { withSkipStaticMiddleware } from "@/middlewares/skip-static.middleware";
import { withAuthGuardMiddleware } from "@/middlewares/auth-guard.middleware";

export default function middleware(req: NextRequest, event: NextFetchEvent) {
  const { pathname } = req.nextUrl;

  // Public routes - no auth required
  const publicPaths = ["/", "/login", "/register", "/forgot-password"];
  
  if (publicPaths.includes(pathname)) {
    return chain([withSkipStaticMiddleware])(req, event, NextResponse.next());
  }

  // Protected routes - require auth
  return chain([
    withSkipStaticMiddleware,
    withAuthGuardMiddleware,
  ])(req, event, NextResponse.next());
}

export const config = {
  matcher: ["/((?!api|_next|_static|_vercel|favicon.ico|sitemap.xml).*)"],
};
```

---

## Creating Custom Middlewares

### Basic Template

Follow this pattern to create your own middleware:

```typescript
// src/middlewares/my-custom.middleware.ts
import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";
import { CustomMiddleware } from "./chain";

export function withMyCustomMiddleware(
  middleware: CustomMiddleware,
): CustomMiddleware {
  return async (
    request: NextRequest,
    event: NextFetchEvent,
    response: NextResponse,
  ) => {
    // Your middleware logic here
    console.log("Request path:", request.nextUrl.pathname);

    // Continue to next middleware
    return middleware(request, event, response);
  };
}
```

### Example: Logging Middleware

```typescript
// src/middlewares/logging.middleware.ts
import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";
import { CustomMiddleware } from "./chain";

export function withLoggingMiddleware(
  middleware: CustomMiddleware,
): CustomMiddleware {
  return async (
    request: NextRequest,
    event: NextFetchEvent,
    response: NextResponse,
  ) => {
    const start = Date.now();
    const { pathname, searchParams } = request.nextUrl;

    console.log(`[${new Date().toISOString()}] ${request.method} ${pathname}`);

    // Continue to next middleware
    const result = await middleware(request, event, response);

    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] Completed in ${duration}ms`);

    return result;
  };
}
```

### Example: Rate Limiting Middleware

```typescript
// src/middlewares/rate-limit.middleware.ts
import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";
import { CustomMiddleware } from "./chain";

const requestCounts = new Map<string, { count: number; resetTime: number }>();

export function withRateLimitMiddleware(
  middleware: CustomMiddleware,
  limit: number = 100,
  windowMs: number = 60000, // 1 minute
): CustomMiddleware {
  return async (
    request: NextRequest,
    event: NextFetchEvent,
    response: NextResponse,
  ) => {
    const ip = request.ip || request.headers.get("x-forwarded-for") || "unknown";
    const now = Date.now();

    const userLimit = requestCounts.get(ip);

    if (!userLimit || now > userLimit.resetTime) {
      requestCounts.set(ip, { count: 1, resetTime: now + windowMs });
      return middleware(request, event, response);
    }

    if (userLimit.count >= limit) {
      return NextResponse.json(
        { error: "Too many requests" },
        { status: 429 }
      );
    }

    userLimit.count++;
    return middleware(request, event, response);
  };
}
```

### Example: Header Injection Middleware

```typescript
// src/middlewares/headers.middleware.ts
import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";
import { CustomMiddleware } from "./chain";

export function withSecurityHeadersMiddleware(
  middleware: CustomMiddleware,
): CustomMiddleware {
  return async (
    request: NextRequest,
    event: NextFetchEvent,
    response: NextResponse,
  ) => {
    // Continue to next middleware first
    const result = await middleware(request, event, response);

    // Add security headers to response
    const newResponse = NextResponse.next();
    newResponse.headers.set("X-Frame-Options", "DENY");
    newResponse.headers.set("X-Content-Type-Options", "nosniff");
    newResponse.headers.set("X-XSS-Protection", "1; mode=block");
    newResponse.headers.set(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );

    return newResponse;
  };
}
```

### Example: Locale Detection Middleware

```typescript
// src/middlewares/locale.middleware.ts
import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";
import { CustomMiddleware } from "./chain";

const SUPPORTED_LOCALES = ["en", "fr", "es", "de"];
const DEFAULT_LOCALE = "en";

export function withLocaleMiddleware(
  middleware: CustomMiddleware,
): CustomMiddleware {
  return async (
    request: NextRequest,
    event: NextFetchEvent,
    response: NextResponse,
  ) => {
    // Check if locale is already in the URL
    const { pathname } = request.nextUrl;
    const pathnameHasLocale = SUPPORTED_LOCALES.some(
      (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (pathnameHasLocale) {
      return middleware(request, event, response);
    }

    // Detect locale from Accept-Language header
    const acceptLanguage = request.headers.get("accept-language");
    const detectedLocale = acceptLanguage
      ?.split(",")[0]
      ?.split("-")[0]
      ?.toLowerCase();

    const locale = SUPPORTED_LOCALES.includes(detectedLocale || "")
      ? detectedLocale
      : DEFAULT_LOCALE;

    // Redirect to locale-prefixed URL
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(url);
  };
}
```

---

## Best Practices

### 1. Order Matters

Place middlewares in the correct order for optimal performance and functionality:

```typescript
const middlewares = [
  withSkipStaticMiddleware,    // First: Skip unnecessary processing
  withLoggingMiddleware,        // Second: Log all requests
  withRateLimitMiddleware,      // Third: Rate limiting
  withAuthGuardMiddleware,      // Fourth: Authentication
  withSecurityHeadersMiddleware, // Last: Add security headers to response
];
```

### 2. Performance Considerations

- Keep middleware logic lightweight
- Use early returns to avoid unnecessary processing
- Cache expensive operations when possible
- Consider using Edge Functions for global middlewares

### 3. Error Handling

Always handle errors gracefully:

```typescript
export function withSafeMiddleware(
  middleware: CustomMiddleware,
): CustomMiddleware {
  return async (
    request: NextRequest,
    event: NextFetchEvent,
    response: NextResponse,
  ) => {
    try {
      return await middleware(request, event, response);
    } catch (error) {
      console.error("Middleware error:", error);
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }
  };
}
```

### 4. Environment-Specific Middleware

Load middlewares conditionally based on environment:

```typescript
const middlewares = [
  withSkipStaticMiddleware,
  withAuthGuardMiddleware,
];

// Add logging only in development
if (process.env.NODE_ENV === "development") {
  middlewares.push(withLoggingMiddleware);
}

return chain(middlewares)(req, event, NextResponse.next());
```

---

## Examples

### Complete Production Setup

```typescript
// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";
import { chain } from "@/middlewares/chain";
import { withSkipStaticMiddleware } from "@/middlewares/skip-static.middleware";
import { withAuthGuardMiddleware } from "@/middlewares/auth-guard.middleware";
import { withLoggingMiddleware } from "@/middlewares/logging.middleware";
import { withRateLimitMiddleware } from "@/middlewares/rate-limit.middleware";
import { withSecurityHeadersMiddleware } from "@/middlewares/headers.middleware";

export default function middleware(req: NextRequest, event: NextFetchEvent) {
  const { pathname } = req.nextUrl;

  // Public routes
  const publicPaths = [
    "/",
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
  ];

  // Public routes - minimal middleware
  if (publicPaths.some((path) => pathname.startsWith(path))) {
    return chain([
      withSkipStaticMiddleware,
      withSecurityHeadersMiddleware,
    ])(req, event, NextResponse.next());
  }

  // Admin routes - stricter rate limiting
  if (pathname.startsWith("/admin")) {
    return chain([
      withSkipStaticMiddleware,
      withLoggingMiddleware,
      (middleware) => withRateLimitMiddleware(middleware, 50, 60000), // 50 req/min
      withAuthGuardMiddleware,
      withSecurityHeadersMiddleware,
    ])(req, event, NextResponse.next());
  }

  // Protected routes - standard middleware
  return chain([
    withSkipStaticMiddleware,
    withLoggingMiddleware,
    (middleware) => withRateLimitMiddleware(middleware, 100, 60000), // 100 req/min
    withAuthGuardMiddleware,
    withSecurityHeadersMiddleware,
  ])(req, event, NextResponse.next());
}

export const config = {
  matcher: ["/((?!api|_next|_static|_vercel|favicon.ico|sitemap.xml).*)"],
};
```

### Testing Middlewares

You can test your middleware chain locally:

```typescript
// __tests__/middleware.test.ts
import { NextRequest, NextResponse } from "next/server";
import { chain } from "@/middlewares/chain";
import { withSkipStaticMiddleware } from "@/middlewares/skip-static.middleware";

describe("Middleware Chain", () => {
  it("should skip static files", async () => {
    const request = new NextRequest(new URL("http://localhost:3000/image.png"));
    const event = {} as any;
    const response = NextResponse.next();

    const result = await chain([withSkipStaticMiddleware])(
      request,
      event,
      response
    );

    expect(result).toBe(response);
  });
});
```

---

## Summary

The middleware system provides:

1. **Composability** - Mix and match middlewares as needed
2. **Type Safety** - Full TypeScript support
3. **Flexibility** - Create custom middlewares easily
4. **Performance** - Skip unnecessary processing with early returns
5. **Maintainability** - Each middleware has a single responsibility

For more information on Next.js middleware, visit the [official documentation](https://nextjs.org/docs/app/building-your-application/routing/middleware).

---

**Need help?** Check out the [examples](#examples) or create an issue on GitHub.
