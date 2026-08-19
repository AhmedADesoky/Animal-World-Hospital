"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, Check } from "lucide-react";

export type SelectOption = { value: string; label: string };

function usePortalPosition(triggerRef: React.RefObject<HTMLElement | null>, open: boolean, minWidth?: number) {
  const [pos, setPos] = useState<{ top: number; left: number; width: number; openUp: boolean } | null>(null);

  const recalc = () => {
    const el = triggerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const estimatedMenuHeight = 260;
    const spaceBelow = window.innerHeight - rect.bottom;
    const openUp = spaceBelow < estimatedMenuHeight && rect.top > spaceBelow;
    setPos({
      top: openUp ? rect.top : rect.bottom,
      left: rect.left,
      width: Math.max(rect.width, minWidth ?? 0),
      openUp,
    });
  };

  useLayoutEffect(() => {
    if (!open) return;
    recalc();
    window.addEventListener("scroll", recalc, true);
    window.addEventListener("resize", recalc);
    return () => {
      window.removeEventListener("scroll", recalc, true);
      window.removeEventListener("resize", recalc);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return pos;
}

export default function Select({
  value,
  onChange,
  options,
  placeholder = "Select…",
  className = "",
  variant = "default",
  pillStyle,
}: {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
  variant?: "default" | "pill";
  pillStyle?: { color: string; background: string };
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const current = options.find((o) => o.value === value);
  const pos = usePortalPosition(triggerRef, open, variant === "pill" ? 140 : undefined);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (triggerRef.current?.contains(target)) return;
      if (menuRef.current?.contains(target)) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const menu = open && mounted && pos && (
    <div
      ref={menuRef}
      className="fixed z-[200] rounded-xl bg-white border border-black/[.08] shadow-modal py-1.5 max-h-64 overflow-y-auto animate-[fadein_.15s_ease-out]"
      style={{
        top: pos.openUp ? undefined : pos.top + 6,
        bottom: pos.openUp ? window.innerHeight - pos.top + 6 : undefined,
        left: pos.left,
        width: pos.width,
      }}
    >
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => {
            onChange(o.value);
            setOpen(false);
          }}
          className={`w-full flex items-center justify-between gap-2 px-3.5 py-2.5 text-[13px] font-semibold text-left transition-colors whitespace-nowrap ${
            o.value === value ? "bg-red-tint text-red-primary" : "text-charcoal hover:bg-grey-soft"
          }`}
        >
          {o.label}
          {o.value === value && <Check size={13} strokeWidth={2.5} />}
        </button>
      ))}
    </div>
  );

  if (variant === "pill") {
    return (
      <>
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          style={pillStyle}
          className={`status-pill pr-6 pl-2.5 cursor-pointer transition-opacity hover:opacity-80 relative ${className}`}
        >
          {current?.label ?? placeholder}
          <ChevronDown size={11} strokeWidth={2.5} className={`absolute right-2 top-1/2 -translate-y-1/2 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
        </button>
        {mounted && menu && createPortal(menu, document.body)}
      </>
    );
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`w-full flex items-center justify-between gap-2 rounded-xl border-[1.5px] bg-white px-3.5 py-2.5 text-[13.5px] font-semibold text-left transition-colors ${
          open ? "border-red-primary shadow-[0_0_0_4px_rgba(196,30,58,0.08)]" : "border-black/10 hover:border-black/20"
        } ${className}`}
      >
        <span className={current ? "text-charcoal" : "text-charcoal-light font-normal"}>
          {current ? current.label : placeholder}
        </span>
        <ChevronDown size={14} strokeWidth={2.5} className={`shrink-0 text-charcoal-light transition-transform duration-200 ${open ? "rotate-180 text-red-primary" : ""}`} />
      </button>
      {mounted && menu && createPortal(menu, document.body)}
    </>
  );
}
