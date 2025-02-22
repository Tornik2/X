import { NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function POST(request) {
  const body = await request.json();
  console.log('Login request body:', body);

  try {
    const response = await fetch(`${API_URL}/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    console.log('Login response data:', data);

    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || "Login failed" },
        { status: 400 }
      );
    }

    // Extract token
    const token = data.access;

    const res = NextResponse.json({ message: "Login successful" });

    // Set the token as an HttpOnly cookie.
    res.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    });


    return res;
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
