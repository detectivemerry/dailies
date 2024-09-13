import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const { pathname } = request.nextUrl;
  // Pages requiring authentication
  if (
    !token &&
    (pathname.startsWith("/create-goal") ||
      pathname.startsWith("/profile") ||
      pathname.startsWith("/notification"))
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Pages that should not have authenticated users
  if(token && (pathname.startsWith('/login') || pathname.startsWith('/register'))){
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Allow requests to proceed
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
