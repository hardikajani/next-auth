import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "@ DAY~AI",
  description: "DAY~AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black/80`}>
      <div className="relative w-full flex items-center justify-center ">
          <Navbar />
        </div>
        {children}
      </body>
    </html>
  );
}
