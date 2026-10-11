import type { Metadata } from "next";
import { Inter } from "next/font/google";
import StoreHydrator from "@/components/providers/StoreHydrator";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "IBEX | Footwear & Apparel",
  description: "Your IBEX, Our Promise. Shop premium shoes, t-shirts, pants, and bags.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans bg-white text-ink antialiased`} suppressHydrationWarning>
        <StoreHydrator />
        {children}
      </body>
    </html>
  );
}
