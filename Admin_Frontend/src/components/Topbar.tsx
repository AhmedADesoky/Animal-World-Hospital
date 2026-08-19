"use client";

import { Bell, Search, Plus, Menu, X } from "lucide-react";
import { useSidebar } from "@/lib/sidebar-context";
import Logo from "./Logo";

export default function Topbar({
  title = "Dashboard overview",
  subtitle = "Wednesday, August 19, 2026",
  actionLabel = "Export report",
  onAction,
}: {
  title?: string;
  subtitle?: string;
  actionLabel?: string | null;
  onAction?: () => void;
}) {
  const { mobileOpen, setMobileOpen } = useSidebar();

  return (
    <header className="sticky top-0 z-30 glass h-[68px] flex items-center justify-between px-4 sm:px-8 gap-3">
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden w-9 h-9 rounded-full border border-black/[.08] bg-white flex items-center justify-center text-charcoal shrink-0"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={16} /> : <Menu size={16} />}
        </button>
        <div className="md:hidden shrink-0">
          <Logo showText={false} size={28} />
        </div>
        <div className="min-w-0">
          <h2 className="text-[15px] sm:text-[18px] font-bold leading-tight truncate">{title}</h2>
          <p className="hidden sm:block text-[12px] text-charcoal-light font-medium mt-0.5 truncate">{subtitle}</p>
        </div>
      </div>
      <div className="flex items-center gap-2.5 shrink-0">
        <button className="relative w-[38px] h-[38px] rounded-full border border-black/[.08] bg-white flex items-center justify-center text-charcoal-light hover:border-red-primary hover:bg-red-tint hover:text-red-primary transition-colors">
          <Bell size={15} strokeWidth={2} />
          <span className="absolute top-[7px] right-[7px] w-[7px] h-[7px] bg-red-bright rounded-full border-[1.5px] border-white" />
        </button>
        <button className="hidden sm:flex w-[38px] h-[38px] rounded-full border border-black/[.08] bg-white items-center justify-center text-charcoal-light hover:border-red-primary hover:bg-red-tint hover:text-red-primary transition-colors">
          <Search size={15} strokeWidth={2} />
        </button>
        {actionLabel && (
          <button onClick={onAction} className="btn-primary !px-3.5 sm:!px-5">
            <Plus size={14} strokeWidth={2.5} /> <span className="hidden sm:inline">{actionLabel}</span>
          </button>
        )}
      </div>
    </header>
  );
}
