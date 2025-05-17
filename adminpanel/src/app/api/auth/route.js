import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/lib/models/User';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  await dbConnect();

  try {
    const { username, password } = await request.json();

    // Find user
    const user = await User.findOne({ username });
    if (!user) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Successful login
    return NextResponse.json(
      { message: 'Login successful' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json(
      { message: 'Server error, please try again' },
      { status: 500 }
    );
  }
}