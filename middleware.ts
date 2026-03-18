import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Very light placeholder middleware.
// Once real auth (JWT/cookies) is wired, read role here and route accordingly.

const founderRoutes = ["/dashboard", "/packages", "/budget-analysis", "/library", "/chatbot", "/sessions", "/profile", "/feedback"];
const consultantRoutes = ["/consultant"];
const adminRoutes = ["/admin"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public routes
  if (
    pathname === "/" ||
    pathname === "/login" ||
    pathname === "/signup"
  ) {
    return NextResponse.next();
  }

  // TODO: Replace this with real role lookup (cookie/JWT/localStorage mirror)
  const role = request.cookies.get("startawy_role")?.value;

  // If no role cookie yet, send to login
  if (!role) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Founder-only sections
  if (founderRoutes.some((r) => pathname.startsWith(r))) {
    if (role !== "founder" && role !== "startup") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Consultant-only sections
  if (consultantRoutes.some((r) => pathname.startsWith(r))) {
    if (role !== "consultant") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Admin-only sections
  if (adminRoutes.some((r) => pathname.startsWith(r))) {
    if (role !== "admin") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/packages/:path*",
    "/payment/:path*",
    "/budget-analysis/:path*",
    "/library/:path*",
    "/chatbot/:path*",
    "/sessions/:path*",
    "/profile/:path*",
    "/feedback/:path*",
    "/consultant/:path*",
    "/admin/:path*",
  ],
};

