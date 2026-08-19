export default function DonutChart({ data }: { data: { label: string; value: number; color: string }[] }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  let offsetAcc = 0;

  return (
    <div className="flex items-center gap-6">
      <svg width="120" height="120" viewBox="0 0 120 120" className="shrink-0 -rotate-90">
        <circle cx="60" cy="60" r={radius} fill="none" stroke="#F4F5F7" strokeWidth="16" />
        {data.map((d) => {
          const fraction = d.value / total;
          const dash = fraction * circumference;
          const gap = circumference - dash;
          const strokeDashoffset = -((offsetAcc / total) * circumference);
          offsetAcc += d.value;
          return (
            <circle
              key={d.label}
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke={d.color}
              strokeWidth="16"
              strokeDasharray={`${dash} ${gap}`}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="butt"
            />
          );
        })}
        <circle cx="60" cy="60" r="30" fill="white" />
      </svg>
      <div className="flex flex-col gap-2.5">
        {data.map((d) => (
          <div key={d.label} className="flex items-center gap-2.5 text-[12.5px] font-semibold text-charcoal-light">
            <span className="w-2.5 h-2.5 rounded-[3px] shrink-0" style={{ background: d.color }} />
            {d.label} <span className="text-charcoal">({d.value}%)</span>
          </div>
        ))}
      </div>
    </div>
  );
}
