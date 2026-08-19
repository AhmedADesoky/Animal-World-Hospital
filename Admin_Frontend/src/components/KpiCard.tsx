import { ArrowUp, ArrowDown, type LucideIcon } from "lucide-react";

export default function KpiCard({
  icon: Icon,
  value,
  label,
  change,
  up,
  ownerOnly,
}: {
  icon: LucideIcon;
  value: string;
  label: string;
  change: number;
  up: boolean;
  ownerOnly?: boolean;
}) {
  return (
    <div className="surface-card p-5">
      <div className="flex items-start justify-between">
        <div className="pill-icon w-[42px] h-[42px]">
          <Icon size={18} strokeWidth={2} className="text-red-primary" />
        </div>
        <span
          className={`inline-flex items-center gap-1 text-[11.5px] font-bold px-2.5 py-1 rounded-full ${
            up ? "bg-status-greenTint text-status-green" : "bg-red-tint text-red-primary"
          }`}
        >
          {up ? <ArrowUp size={11} /> : <ArrowDown size={11} />} {change}%
        </span>
      </div>
      <div className="font-display font-semibold text-[27px] mt-3.5 mb-0.5">{value}</div>
      <div className="text-[12.5px] text-charcoal-light font-semibold">
        {label}
        {ownerOnly && (
          <span className="text-[9.5px] bg-status-amberTint text-status-amber px-1.5 py-0.5 rounded ml-1.5 font-extrabold">
            OWNER ONLY
          </span>
        )}
      </div>
    </div>
  );
}
