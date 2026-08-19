"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";

const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function toDateKey(y: number, m: number, d: number) {
  return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}
function formatLabel(dateKey: string) {
  if (!dateKey) return "";
  const [y, m, d] = dateKey.split("-").map(Number);
  return `${d} ${monthNames[m - 1].slice(0, 3)} ${y}`;
}

export default function DatePicker({ value, onChange, placeholder = "Select date" }: { value: string; onChange: (dateKey: string) => void; placeholder?: string }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ top: number; left: number; openUp: boolean } | null>(null);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const seed = value ? new Date(value + "T00:00:00") : today;
  const [viewYear, setViewYear] = useState(seed.getFullYear());
  const [viewMonth, setViewMonth] = useState(seed.getMonth());

  useEffect(() => setMounted(true), []);

  useLayoutEffect(() => {
    if (!open) return;
    const recalc = () => {
      const el = triggerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const menuHeight = 320;
      const openUp = window.innerHeight - rect.bottom < menuHeight && rect.top > menuHeight;
      setPos({ top: openUp ? rect.top : rect.bottom, left: rect.left, openUp });
    };
    recalc();
    window.addEventListener("scroll", recalc, true);
    window.addEventListener("resize", recalc);
    return () => {
      window.removeEventListener("scroll", recalc, true);
      window.removeEventListener("resize", recalc);
    };
  }, [open]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (triggerRef.current?.contains(t) || panelRef.current?.contains(t)) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const cells = [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else setViewMonth((m) => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else setViewMonth((m) => m + 1);
  };

  const panel = open && mounted && pos && (
    <div
      ref={panelRef}
      className="fixed z-[200] w-[280px] rounded-2xl bg-white border border-black/[.08] shadow-modal p-4 animate-[fadein_.15s_ease-out]"
      style={{
        top: pos.openUp ? undefined : pos.top + 6,
        bottom: pos.openUp ? window.innerHeight - pos.top + 6 : undefined,
        left: pos.left,
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <button type="button" onClick={prevMonth} className="w-7 h-7 rounded-full border border-black/10 flex items-center justify-center hover:border-red-primary hover:text-red-primary">
          <ChevronLeft size={13} strokeWidth={2.5} />
        </button>
        <span className="font-display font-semibold text-[14px]">
          {monthNames[viewMonth]} {viewYear}
        </span>
        <button type="button" onClick={nextMonth} className="w-7 h-7 rounded-full border border-black/10 flex items-center justify-center hover:border-red-primary hover:text-red-primary">
          <ChevronRight size={13} strokeWidth={2.5} />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-1">
        {dayNames.map((d, i) => (
          <div key={i} className="text-center text-[10px] font-bold text-charcoal-light py-1">
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          if (!day) return <div key={i} />;
          const dateKey = toDateKey(viewYear, viewMonth, day);
          const isSelected = value === dateKey;
          const isToday = dateKey === toDateKey(today.getFullYear(), today.getMonth(), today.getDate());
          return (
            <button
              key={i}
              type="button"
              onClick={() => {
                onChange(dateKey);
                setOpen(false);
              }}
              className={`aspect-square rounded-lg text-[12px] font-semibold transition-colors ${
                isSelected ? "bg-red-primary text-white" : isToday ? "bg-red-tint text-red-primary hover:bg-red-tint2" : "hover:bg-grey-soft text-charcoal"
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>
      <button
        type="button"
        onClick={() => {
          onChange("");
          setOpen(false);
        }}
        className="w-full text-center text-[11.5px] font-semibold text-charcoal-light hover:text-red-primary mt-3 pt-3 border-t border-black/[.06]"
      >
        Clear date
      </button>
    </div>
  );

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`w-full flex items-center gap-2.5 rounded-xl border-[1.5px] bg-white px-3.5 py-2.5 text-[13px] font-semibold text-left transition-colors ${
          open ? "border-red-primary shadow-[0_0_0_4px_rgba(196,30,58,0.08)]" : "border-black/10 hover:border-black/20"
        }`}
      >
        <CalendarIcon size={14} strokeWidth={2} className="text-red-primary shrink-0" />
        <span className={value ? "text-charcoal" : "text-charcoal-light font-normal"}>{value ? formatLabel(value) : placeholder}</span>
      </button>
      {mounted && panel && createPortal(panel, document.body)}
    </>
  );
}
