import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function middleware(req) {
  const path = req.nextUrl.pathname; // Get current path
  const accessToken = req.cookies.get("accessToken")?.value; // Get accessToken from cookies

  const protectedRoutes = ["/merchants", "/leaderboard"];

  // if unautheticated user tries to access protected routes, redirect to login
  if (protectedRoutes.includes(path) && !accessToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next(); 
}

export const config = {
  matcher: ["/merchants", "/leaderboard"], // protect these routes
};
