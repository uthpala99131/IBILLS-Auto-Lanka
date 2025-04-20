// app/layout.jsx
import '../app/globals.css';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "IBILLS - Auto Mobile Repair Services",
  description: "Professional car repair services website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="text-black bg-white">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
