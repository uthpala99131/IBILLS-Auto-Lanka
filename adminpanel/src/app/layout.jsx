'use client';
import { Inter } from 'next/font/google';
import './globals.css';

import { Toaster } from 'react-hot-toast';
import Providers from './providers'

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>IBILLS AUTO LANKA - Admin Dashboard</title>
        <meta name="description" content="Admin dashboard for IBILLS AUTO LANKA automobile service center" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <Providers>
          {children}
          <Toaster 
            position="top-right"
            toastOptions={{
              style: {
                background: '#1F2937',
                color: '#fff',
              },
              success: {
                style: {
                  background: '#065F46',
                },
              },
              error: {
                style: {
                  background: '#991B1B',
                },
              },
            }}
          />
          
        </Providers>
      </body>
    </html>
  );
}