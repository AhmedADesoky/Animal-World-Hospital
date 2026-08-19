const shades = ["#F4F5F7", "#FDE4E8", "#F9B0BC", "#F27E8F", "#E2445F", "#C41E3A"];

export default function Heatmap({ days, hours, grid }: { days: string[]; hours: string[]; grid: number[][] }) {
  return (
    <div>
      <div className="flex gap-1 mb-2" style={{ marginLeft: "48px" }}>
        {hours.map((h) => (
          <span key={h} className="flex-1 text-center text-[10px] font-semibold text-charcoal-light">
            {h}
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <div className="flex flex-col gap-1 w-[44px] text-[10px] font-semibold text-charcoal-light">
          {days.map((d) => (
            <div key={d} className="h-[26px] flex items-center">
              {d}
            </div>
          ))}
        </div>
        <div className="flex-1 grid gap-1" style={{ gridTemplateColumns: `repeat(${hours.length}, 1fr)`, gridAutoRows: "26px" }}>
          {grid.flatMap((row, ri) =>
            row.map((v, ci) => <div key={`${ri}-${ci}`} className="rounded-[6px]" style={{ background: shades[v] }} />)
          )}
        </div>
      </div>
      <div className="flex items-center gap-1.5 mt-3.5 text-[11px] font-semibold text-charcoal-light">
        Less
        {shades.map((s, i) => (
          <span key={i} className="w-[18px] h-[13px] rounded-[4px]" style={{ background: s }} />
        ))}
        More
      </div>
    </div>
  );
}
