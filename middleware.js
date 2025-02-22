import { NextResponse } from "next/server";
import { cookies } from "next/headers"; // 

export async function middleware(req) {
  const path = req.nextUrl.pathname; // Get current path
  const cookieStore = cookies(); // Get cookies in middleware
  const accessToken = await cookieStore.get("accessToken")?.value; 

  const protectedRoutes = [ "/merchants", "/leaderboard"];
  const authRoutes = ["/login", "/register"];

  // If the user is trying to access a protected route but has no accessToken, redirect to login
  if (protectedRoutes.includes(path) && !accessToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // If the user is already logged in and tries to access login/register, redirect to homepage
  if (authRoutes.includes(path) && accessToken) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next(); // Allow access if conditions are met
}

// protected routes
export const config = {
  matcher: [ "/merchants", "/leaderboard", "/login", "/register"],
};
