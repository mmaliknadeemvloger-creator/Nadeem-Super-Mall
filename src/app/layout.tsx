import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: '%s | Nadeem Super Mall',
    default: 'Nadeem Super Mall - Best Deals Online',
  },
  description: "Shop the best products at Nadeem Super Mall. Enjoy massive discounts and fast delivery.",
  openGraph: {
    title: 'Nadeem Super Mall',
    description: 'Shop the best products at Nadeem Super Mall.',
    url: 'https://nadeemsupermall.com',
    siteName: 'Nadeem Super Mall',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
