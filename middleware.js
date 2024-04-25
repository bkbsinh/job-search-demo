import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { generateJWT } from "./lib/utils/encrypt";

const PUBLIC_PATHS=["/login", "/signup"];

export async function middleware(req) {
  const path = req.nextUrl.pathname;
  const token = await getToken({
    req: req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isPublicPaths = PUBLIC_PATHS.includes(path);
  const isApiForwarding = path.includes('/_api/protected');
  
  if (isApiForwarding) {
    const encrypted_token = await generateJWT(token);

    const newHeaders = new Headers(req.headers)
    newHeaders.set('x-access-token', encrypted_token)
    return NextResponse.next({
      request: {
        headers: newHeaders,
      },
    })
  }
  if (isPublicPaths && token) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }
  if (!isPublicPaths && !token) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }
}

export const config = {
    matcher: [
      /*
       * Match all request paths except for the ones starting with:
       * - api (API routes)
       * - _next/static (static files)
       * - _next/image (image optimization files)
       * - favicon.ico (favicon file)
       */
        '/((?!api|_next/static|_next/image|favicon.ico|assets).*)'],
  };