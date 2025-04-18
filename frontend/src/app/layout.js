import { GeistSans, GeistMono } from '@vercel/font';

const geistSans = GeistSans();
const geistMono = GeistMono();

export const metadata = {
  title: 'My App',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.className} ${geistMono.className}`}>
      <body>{children}</body>
    </html>
  );
}

