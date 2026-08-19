"use client";

import { useEffect, useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

type Testimonial = { name: string; pet: string; quote: string };

export default function TestimonialsCarousel({ items }: { items: Testimonial[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % items.length), 5000);
    return () => clearInterval(t);
  }, [items.length]);

  const go = (dir: 1 | -1) => setIndex((i) => (i + dir + items.length) % items.length);

  return (
    <div className="relative max-w-3xl mx-auto">
      <div className="relative h-[260px] sm:h-[220px]">
        {items.map((t, i) => (
          <div
            key={t.name}
            className={`absolute inset-0 transition-all duration-700 ease-out ${
              i === index ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none"
            }`}
          >
            <div className="surface-card p-8 sm:p-10 h-full flex flex-col justify-center relative overflow-hidden">
              <div className="flex gap-1 text-red-primary mb-4 relative">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} size={16} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <p className="text-[15px] sm:text-base text-charcoal-light leading-relaxed relative">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-5 pt-4 border-t border-black/5 font-semibold text-[13.5px] relative">
                {t.name} <span className="text-charcoal-light font-normal">· {t.pet}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          onClick={() => go(-1)}
          aria-label="Previous"
          className="w-9 h-9 rounded-full bg-white border border-black/[.08] shadow-soft flex items-center justify-center text-charcoal-light hover:text-red-primary hover:border-red-primary transition-colors"
        >
          <ChevronLeft size={16} />
        </button>
        <div className="flex gap-2">
          {items.map((t, i) => (
            <button
              key={t.name}
              onClick={() => setIndex(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index ? "w-6 bg-red-primary" : "w-2 bg-black/15 hover:bg-black/25"
              }`}
            />
          ))}
        </div>
        <button
          onClick={() => go(1)}
          aria-label="Next"
          className="w-9 h-9 rounded-full bg-white border border-black/[.08] shadow-soft flex items-center justify-center text-charcoal-light hover:text-red-primary hover:border-red-primary transition-colors"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
