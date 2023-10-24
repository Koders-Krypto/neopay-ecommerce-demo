import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NeoPay Demo",
  description: "NeoPay Payment SDK Demo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className + " px-8 mx-auto max-w-7xl"}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
