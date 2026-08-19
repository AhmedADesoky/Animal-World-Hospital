"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const dayNames = ["S", "M", "T", "W", "T", "F", "S"];
const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function toDateKey(y: number, m: number, d: number) {
  return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

export default function Calendar({ value, onChange }: { value: string; onChange: (dateKey: string) => void }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

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

  return (
    <div className="surface-card p-5">
      <div className="flex items-center justify-between mb-4">
        <button type="button" onClick={prevMonth} className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center hover:border-red-primary hover:text-red-primary">
          <ChevronLeft size={14} strokeWidth={2.5} />
        </button>
        <span className="font-display font-semibold text-[15px]">
          {monthNames[viewMonth]} {viewYear}
        </span>
        <button type="button" onClick={nextMonth} className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center hover:border-red-primary hover:text-red-primary">
          <ChevronRight size={14} strokeWidth={2.5} />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-1.5">
        {dayNames.map((d, i) => (
          <div key={i} className="text-center text-[10.5px] font-bold text-charcoal-light py-1">
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          if (!day) return <div key={i} />;
          const dateKey = toDateKey(viewYear, viewMonth, day);
          const cellDate = new Date(viewYear, viewMonth, day);
          const isPast = cellDate < today;
          const isSelected = value === dateKey;
          const isToday = dateKey === toDateKey(today.getFullYear(), today.getMonth(), today.getDate());
          return (
            <button
              key={i}
              type="button"
              disabled={isPast}
              onClick={() => onChange(dateKey)}
              className={`aspect-square rounded-lg text-[12.5px] font-semibold transition-colors ${
                isSelected
                  ? "bg-red-primary text-white"
                  : isPast
                  ? "text-black/20 cursor-not-allowed"
                  : isToday
                  ? "bg-red-tint text-red-primary hover:bg-red-tint2"
                  : "hover:bg-grey-soft text-charcoal"
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
