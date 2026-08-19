import Link from "next/link";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import Logo from "./Logo";

function FacebookMark({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}
function InstagramMark({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-white to-grey-soft border-t border-black/[.06] mt-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-14 grid gap-10 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-4 text-sm text-charcoal-light leading-relaxed max-w-xs">
            Caring for every paw, every day — professional veterinary care, grooming, boarding and more.
          </p>
        </div>
        <div>
          <h4 className="text-xs font-bold tracking-[.12em] uppercase text-charcoal-light/60 mb-4">Explore</h4>
          <ul className="space-y-2.5 text-sm text-charcoal-light">
            <li><Link href="/services" className="hover:text-red-primary transition-colors">Services</Link></li>
            <li><Link href="/shop" className="hover:text-red-primary transition-colors">Shop</Link></li>
            <li><Link href="/book" className="hover:text-red-primary transition-colors">Book Appointment</Link></li>
            <li><Link href="/about" className="hover:text-red-primary transition-colors">About Us</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-bold tracking-[.12em] uppercase text-charcoal-light/60 mb-4">Contact</h4>
          <ul className="space-y-3 text-sm text-charcoal-light">
            <li className="flex items-center gap-2.5"><MapPin size={15} className="text-red-primary" strokeWidth={2} /> Cairo, Egypt</li>
            <li className="flex items-center gap-2.5"><Phone size={15} className="text-red-primary" strokeWidth={2} /> +20 100 000 0000</li>
            <li className="flex items-center gap-2.5"><Mail size={15} className="text-red-primary" strokeWidth={2} /> hello@awh.com</li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-bold tracking-[.12em] uppercase text-charcoal-light/60 mb-4">Follow</h4>
          <div className="flex gap-2">
            {[FacebookMark, InstagramMark, MessageCircle].map((Icon, i) => (
              <span
                key={i}
                className="w-9 h-9 rounded-full bg-white border border-black/[.06] shadow-soft flex items-center justify-center text-charcoal-light hover:bg-red-primary hover:text-white hover:border-red-primary transition-colors cursor-pointer"
              >
                <Icon size={15} />
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-black/[.06] py-5 text-center text-xs text-charcoal-light/60">
        © 2026 Animal World Hospital. All rights reserved.
      </div>
    </footer>
  );
}
