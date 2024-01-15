import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const publicPaths = ["/login", "/signup"];
  const token = request.cookies.get("token")?.value || "";

  if (publicPaths.includes(path) && token) {
    return NextResponse.redirect(new URL("/profile", request.nextUrl));
  }

  if (!publicPaths.includes(path) && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

export const config = { matcher: ["/", "/login", "/signup", "/profile"] };
