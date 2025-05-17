// app/api/bookings/route.js
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

export async function GET() {
  try {
    const headersList = headers();
    const token = headersList.get('authorization')?.split(' ')[1];
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const response = await fetch(`${process.env.BACKEND_URL}/api/bookings`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Backend error: ${errorData}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Bookings fetch error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred while fetching bookings' }, 
      { status: 500 }
    );
  }
}