// app/api/auth/register/route.js
import { NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function POST(request) {
  const body = await request.json();
  // ... perform registration logic
  console.log(body)
  try {
    const response = await fetch(`${API_URL}/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    console.log(data)
    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || "Registration failed" },
        { status: 400 }
      );
    }

    // IF RESPONSE OK ...
    const res = NextResponse.json({ message: "Registration successful" });

    const accessToken = data.access
    const refreshToken = data.access
    res.cookies.set('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    });
    res.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    });
    return res;
  } catch (err) {
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}
