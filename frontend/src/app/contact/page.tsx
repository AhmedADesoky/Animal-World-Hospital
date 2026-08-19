"use client";

import { useState } from "react";
import { MessageCircle, Phone, Mail, MapPin, Clock, Send, Check } from "lucide-react";
import { useClientStore } from "@/lib/client-store";

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

const channels = [
  {
    icon: MessageCircle,
    title: "Chat with Ask A W H",
    desc: "Get instant answers from our pet-care assistant, day or night.",
    action: "chatbot" as const,
  },
  {
    icon: Phone,
    title: "WhatsApp us",
    desc: "Message our care team directly for bookings or questions.",
    href: "https://wa.me/201000000000",
    action: "link" as const,
  },
  {
    icon: Mail,
    title: "Email us",
    desc: "hello@awh.com — we usually reply within a few hours.",
    href: "mailto:hello@awh.com",
    action: "link" as const,
  },
];

export default function ContactPage() {
  const { setChatbotOpen } = useClientStore();
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSent(true);
    setName("");
    setEmail("");
    setMessage("");
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8 py-14">
      <div className="text-center max-w-xl mx-auto mb-12">
        <span className="text-[11px] font-bold tracking-[.14em] uppercase text-red-primary">Contact us</span>
        <h1 className="font-display font-semibold text-4xl mt-2">We&apos;re here to help</h1>
        <p className="text-charcoal-light mt-3 text-[15px]">Reach out however is easiest for you.</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-5 mb-14">
        {channels.map((c) => {
          const Icon = c.icon;
          const content = (
            <>
              <div className="pill-icon w-12 h-12 mb-4">
                <Icon size={20} strokeWidth={2} className="text-red-primary" />
              </div>
              <h3 className="font-semibold text-[15px]">{c.title}</h3>
              <p className="text-[13px] text-charcoal-light mt-1.5 leading-relaxed">{c.desc}</p>
            </>
          );
          return c.action === "chatbot" ? (
            <button key={c.title} onClick={() => setChatbotOpen(true)} className="surface-card p-6 text-left hover:!shadow-card">
              {content}
            </button>
          ) : (
            <a key={c.title} href={c.href} target="_blank" rel="noopener noreferrer" className="surface-card p-6 block hover:!shadow-card">
              {content}
            </a>
          );
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="surface-card p-6 sm:p-8">
          <h2 className="font-display font-semibold text-xl mb-6">Send us a message</h2>
          {sent && (
            <div className="flex items-center gap-2 mb-5 p-3 rounded-xl bg-status-greenTint text-status-green text-[13px] font-semibold">
              <Check size={14} strokeWidth={2.5} /> Message sent — we&apos;ll get back to you soon.
            </div>
          )}
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wide text-charcoal-light mb-1.5">Your name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border-[1.5px] border-black/10 px-3.5 py-2.5 text-[13.5px] outline-none focus:border-red-primary"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wide text-charcoal-light mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border-[1.5px] border-black/10 px-3.5 py-2.5 text-[13.5px] outline-none focus:border-red-primary"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wide text-charcoal-light mb-1.5">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full rounded-xl border-[1.5px] border-black/10 px-3.5 py-2.5 text-[13.5px] outline-none focus:border-red-primary resize-none"
              />
            </div>
            <button type="submit" className="btn-primary w-full justify-center">
              <Send size={15} strokeWidth={2} /> Send message
            </button>
          </form>
        </div>

        <div className="space-y-5">
          <div className="surface-card p-6 sm:p-8">
            <h3 className="font-semibold text-[15px] mb-4">Clinic information</h3>
            <div className="space-y-3.5 text-[13.5px]">
              <div className="flex items-start gap-2.5">
                <MapPin size={16} strokeWidth={2} className="text-red-primary shrink-0 mt-0.5" /> 24 Tree Extension Rd, Cairo, Egypt
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={16} strokeWidth={2} className="text-red-primary shrink-0" /> +20 100 000 0000
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={16} strokeWidth={2} className="text-red-primary shrink-0" /> hello@awh.com
              </div>
              <div className="flex items-start gap-2.5">
                <Clock size={16} strokeWidth={2} className="text-red-primary shrink-0 mt-0.5" />
                <div>
                  Sat – Thu: 9:00 AM – 9:00 PM
                  <br />
                  Friday: 2:00 PM – 9:00 PM
                  <br />
                  <span className="text-red-primary font-semibold">24/7 Emergency line available</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-5 pt-5 border-t border-black/5">
              {[FacebookMark, InstagramMark].map((Icon, i) => (
                <span key={i} className="w-9 h-9 rounded-full bg-white border border-black/[.06] shadow-soft flex items-center justify-center text-charcoal-light hover:bg-red-primary hover:text-white hover:border-red-primary transition-colors cursor-pointer">
                  <Icon size={15} />
                </span>
              ))}
            </div>
          </div>

          <div
            className="h-52 rounded-2xl relative overflow-hidden border border-black/[.06]"
            style={{
              backgroundColor: "#EAF0E9",
              backgroundImage: "linear-gradient(rgba(26,26,46,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(26,26,46,0.06) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          >
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full">
              <MapPin size={32} strokeWidth={0} fill="#C41E3A" className="drop-shadow-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
