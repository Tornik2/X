import { NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function GET(request) {
  // get token from cookies
  const token = request.cookies.get('accessToken')?.value;
  if (!token) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  }
  try {
    const response = await fetch(`${API_URL}/profile`, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
    const data = await response.json();
    console.log(data)
    if (!response.ok) {
      throw new Error(data.message || "Profile fetch failed");
    }

    // IF RESPONSE OK ...............
    console.log(data)
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: 'Token verification failed' }, { status: 401 });
  }
}
