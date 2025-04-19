
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
// app/layout.jsx
import '../app/globals.css';

export const metadata = {
  title: "Cripar - Car Repair Services",
  description: "Professional car repair services website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-black-900">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
