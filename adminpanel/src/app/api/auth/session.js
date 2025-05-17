// src/app/api/auth/session/route.js
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    // Get the session cookie from the request
    const sessionCookie = request.cookies.get('session');

    if (!sessionCookie) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    // Your session verification logic here
    // ...

    return NextResponse.json({ user: { /* user data */ } });
  } catch (error) {
    console.error('Error in GET request:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}