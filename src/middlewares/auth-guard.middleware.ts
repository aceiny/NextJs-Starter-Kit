import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";
import { CustomMiddleware } from "./chain";
import { APP_PATHS } from "@/shared/constants/paths";

export function withAuthGuardMiddleware(
  middleware: CustomMiddleware,
): CustomMiddleware {
  return async (
    request: NextRequest,
    event: NextFetchEvent,
    response: NextResponse,
  ) => {
    const token = request.cookies.get("token")?.value;

    if (
      !token
    ) {
      return NextResponse.redirect(new URL(APP_PATHS.AUTH.LOGIN, request.url));
    }

    return middleware(request, event, response);
  };
}
