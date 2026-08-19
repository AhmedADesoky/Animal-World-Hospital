export default function Logo({ size = 38, showText = true }: { size?: number; showText?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
        <defs>
          <linearGradient id="awh-mark" x1="4" y1="4" x2="116" y2="116" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FF3B4E" />
            <stop offset="1" stopColor="#8F0E22" />
          </linearGradient>
        </defs>
        <circle cx="60" cy="60" r="54" stroke="url(#awh-mark)" strokeWidth="4" />
        <ellipse cx="60" cy="60" rx="54" ry="20" stroke="url(#awh-mark)" strokeWidth="1.3" opacity="0.5" />
        <ellipse cx="60" cy="60" rx="28" ry="54" stroke="url(#awh-mark)" strokeWidth="1.3" opacity="0.5" />
        <g fill="url(#awh-mark)">
          <ellipse cx="60" cy="73" rx="17" ry="13" />
          <ellipse cx="37" cy="53" rx="7.5" ry="9.5" transform="rotate(-24 37 53)" />
          <ellipse cx="50" cy="39" rx="7.5" ry="9.5" transform="rotate(-8 50 39)" />
          <ellipse cx="70" cy="39" rx="7.5" ry="9.5" transform="rotate(8 70 39)" />
          <ellipse cx="83" cy="53" rx="7.5" ry="9.5" transform="rotate(24 83 53)" />
        </g>
      </svg>
      {showText && (
        <div className="leading-[1.05] relative">
          <div className="font-display font-black uppercase tracking-tight text-[15px] text-red-primary whitespace-nowrap">
            <span>AN</span>
            <span className="relative inline-block">
              <svg width="11" height="11" viewBox="0 0 24 24" className="absolute -top-[8px] left-1/2 -translate-x-1/2" fill="#C41E3A">
                <ellipse cx="12" cy="16" rx="6" ry="4.6" />
                <ellipse cx="4.5" cy="8" rx="2.6" ry="3.3" transform="rotate(-25 4.5 8)" />
                <ellipse cx="9.5" cy="4" rx="2.6" ry="3.3" transform="rotate(-8 9.5 4)" />
                <ellipse cx="14.5" cy="4" rx="2.6" ry="3.3" transform="rotate(8 14.5 4)" />
                <ellipse cx="19.5" cy="8" rx="2.6" ry="3.3" transform="rotate(25 19.5 8)" />
              </svg>
              <span>I</span>
            </span>
            <span>MAL WORLD</span>
          </div>
          <div className="font-display font-extrabold uppercase tracking-[.1em] text-[9px] text-red-primary mt-0.5">
            Hospital
          </div>
        </div>
      )}
    </div>
  );
}
