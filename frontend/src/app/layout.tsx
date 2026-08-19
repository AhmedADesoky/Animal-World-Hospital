import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AskAwhChatbot from "@/components/AskAwhChatbot";
import { CartProvider } from "@/lib/cart-context";
import { ClientStoreProvider } from "@/lib/client-store";

const display = Playfair_Display({ subsets: ["latin"], variable: "--font-display", weight: ["500", "600", "700", "800", "900"] });
const body = Inter({ subsets: ["latin"], variable: "--font-body", weight: ["400", "500", "600", "700", "800"] });

export const metadata: Metadata = {
  title: "Animal World Hospital | Caring for Every Paw, Every Day",
  description:
    "Professional veterinary care, grooming, boarding and a pet shop — book appointments online with Animal World Hospital.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", display.variable, body.variable)}>
      <body className="antialiased bg-grey-soft text-charcoal">
        <ClientStoreProvider>
          <CartProvider>
            <Header />
            <main>{children}</main>
            <Footer />
            <AskAwhChatbot />
          </CartProvider>
        </ClientStoreProvider>
      </body>
    </html>
  );
}
