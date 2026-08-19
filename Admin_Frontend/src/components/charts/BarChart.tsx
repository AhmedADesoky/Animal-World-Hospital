export default function BarChart({ data }: { data: { label: string; value: number }[] }) {
  const max = Math.max(...data.map((d) => d.value));
  const peakIndex = data.findIndex((d) => d.value === max);

  return (
    <div className="flex items-end gap-2.5 h-[170px] px-1">
      {data.map((d, i) => {
        const heightPct = (d.value / max) * 100;
        const isPeak = i === peakIndex;
        return (
          <div key={d.label} className="flex-1 flex flex-col items-center justify-end h-full gap-2">
            <div
              className="w-full rounded-t-[7px] rounded-b-[3px]"
              style={{
                height: `${heightPct}%`,
                background: isPeak
                  ? "linear-gradient(180deg, #FF3B4E 0%, #C41E3A 100%)"
                  : "linear-gradient(180deg, #FFE3E6 0%, #FFF0F1 100%)",
              }}
            />
            <span className="text-[10px] font-semibold text-charcoal-light">{d.label}</span>
          </div>
        );
      })}
    </div>
  );
}
