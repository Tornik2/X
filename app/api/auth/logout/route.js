import { NextResponse } from "next/server";

export async function GET(request) {
  const response = NextResponse.json({ message: "Logged out successfully" });
  response.cookies.delete("accessToken", { path: "/" });
  response.cookies.delete("refreshToken", { path: "/" });
  return response;
}
