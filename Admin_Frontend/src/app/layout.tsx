import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/AppShell";

const display = Playfair_Display({ subsets: ["latin"], variable: "--font-display", weight: ["500", "600", "700", "800", "900"] });
const body = Inter({ subsets: ["latin"], variable: "--font-body", weight: ["400", "500", "600", "700", "800"] });

export const metadata: Metadata = {
  title: "AWH Admin | Animal World Hospital",
  description: "Admin dashboard for Animal World Hospital — bookings, products, services, customers and more.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="antialiased bg-grey-soft text-charcoal">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
