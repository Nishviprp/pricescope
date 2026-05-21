import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PriceScope — Compare Prices Across All Stores",
  description: "Find the best price for any product across Amazon, Walmart, eBay, BestBuy, and Target. Save money with real-time price comparison.",
  keywords: "price comparison, best price, Amazon, Walmart, eBay, BestBuy, deals, shopping",
  openGraph: {
    title: "PriceScope — Compare Prices Instantly",
    description: "Stop switching tabs. Compare prices across all major retailers in one place.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">{children}</body>
    </html>
  );
}
