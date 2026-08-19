"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, User, CalendarPlus, ShoppingCart } from "lucide-react";
import Logo from "./Logo";
import { useCart } from "@/lib/cart-context";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-50 glass">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 h-[68px] flex items-center justify-between">
        <Link href="/">
          <Logo />
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="px-4 py-2 rounded-full text-[13.5px] font-semibold text-charcoal-light hover:text-red-primary hover:bg-red-tint transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/order" className="relative w-10 h-10 rounded-full border border-black/10 bg-white flex items-center justify-center text-charcoal hover:border-red-primary hover:text-red-primary transition-colors">
            <ShoppingCart size={16} strokeWidth={2} />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 w-[18px] h-[18px] rounded-full bg-red-primary text-white text-[10px] font-extrabold flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>
          <Link href="/profile" className="btn-outline !px-4 !py-2.5">
            <User size={15} strokeWidth={2} /> Profile
          </Link>
          <Link href="/book" className="btn-primary !px-5 !py-2.5">
            <CalendarPlus size={15} strokeWidth={2} /> Book Appointment
          </Link>
        </div>

        <div className="flex md:hidden items-center gap-2">
          <Link href="/order" className="relative w-9 h-9 rounded-full border border-black/10 bg-white flex items-center justify-center text-charcoal">
            <ShoppingCart size={15} strokeWidth={2} />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 w-[16px] h-[16px] rounded-full bg-red-primary text-white text-[9px] font-extrabold flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="w-9 h-9 rounded-full flex items-center justify-center border border-black/10 bg-white text-charcoal"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden glass border-t border-black/5 px-5 py-4 flex flex-col gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="px-4 py-3 rounded-xl text-sm font-semibold text-charcoal hover:bg-red-tint hover:text-red-primary"
            >
              {l.label}
            </Link>
          ))}
          <Link href="/book" onClick={() => setOpen(false)} className="btn-primary justify-center mt-2">
            <CalendarPlus size={15} strokeWidth={2} /> Book Appointment
          </Link>
        </div>
      )}
    </header>
  );
}
