// src/app/api/auth/login/route.js
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { username, password } = await request.json();
    
    console.log('Attempting login for:', username);

    // Verify backend URL is configured
    if (!process.env.NEXT_PUBLIC_BACKEND_URL) {
      console.error('Backend URL not configured');
      return NextResponse.json(
        { message: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Test backend connection first
    try {
      const healthCheck = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/health`);
      if (!healthCheck.ok) {
        throw new Error('Backend not healthy');
      }
    } catch (healthError) {
      console.error('Backend connection failed:', healthError);
      return NextResponse.json(
        { 
          message: 'Backend service unavailable',
          code: 'SERVICE_UNAVAILABLE'
        },
        { status: 503 }
      );
    }

    // Proceed with login
    const backendResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      }
    );

    const responseData = await backendResponse.json();

    if (!backendResponse.ok) {
      return NextResponse.json(
        { 
          message: responseData.message || 'Authentication failed',
          code: responseData.code || 'AUTH_FAILED'
        },
        { status: backendResponse.status }
      );
    }

    return NextResponse.json(responseData);

  } catch (error) {
    console.error('Login processing error:', error);
    return NextResponse.json(
      { 
        message: 'Internal server error during login',
        code: 'INTERNAL_ERROR'
      },
      { status: 500 }
    );
  }
}