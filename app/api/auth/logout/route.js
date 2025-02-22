import { NextResponse } from "next/server";

export async function GET(request) {
  const response = NextResponse.json({ message: "Logged out successfully" });
  response.cookies.delete("token", { path: "/" });
  response.cookies.delete("refresh", { path: "/" });
  return response;
}
