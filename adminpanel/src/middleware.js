// src/middleware.js
import { NextResponse } from 'next/server'
import axios from 'axios'

export async function middleware(request) {
  const path = request.nextUrl.pathname
  const isPublicPath = path === '/login'
  
  try {
    const response = await axios.get(`${request.nextUrl.origin}/api/auth/check`, {
      headers: {
        cookie: request.headers.get('cookie') || ''
      }
    })
    
    if (isPublicPath && response.data.user) {
      return NextResponse.redirect(new URL('/dashboard', request.nextUrl))
    }
    
    if (!isPublicPath && !response.data.user) {
      return NextResponse.redirect(new URL('/login', request.nextUrl))
    }
  } catch {
    if (!isPublicPath) {
      return NextResponse.redirect(new URL('/login', request.nextUrl))
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*']
}