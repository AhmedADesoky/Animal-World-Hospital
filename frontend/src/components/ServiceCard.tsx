import Link from "next/link";
import { Stethoscope, Scissors, Syringe, Home, Activity, Building2, type LucideIcon } from "lucide-react";
import type { Service } from "@/lib/mock-data";

const iconMap: Record<Service["icon"], LucideIcon> = {
  stethoscope: Stethoscope,
  scissors: Scissors,
  syringe: Syringe,
  home: Home,
  activity: Activity,
  building: Building2,
};

export default function ServiceCard({ service }: { service: Service }) {
  const Icon = iconMap[service.icon];
  return (
    <div className="surface-card overflow-hidden group">
      <Link
        href={`/services/${service.slug}`}
        className="h-40 bg-cover bg-center relative block"
        style={{ backgroundImage: `url(${service.image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute top-3 left-3 pill-icon w-11 h-11">
          <Icon size={19} className="text-red-primary" strokeWidth={2} />
        </div>
      </Link>
      <div className="p-5">
        <Link href={`/services/${service.slug}`}>
          <h3 className="font-display font-semibold text-[16px] hover:text-red-primary transition-colors">{service.nameEn}</h3>
        </Link>
        <p className="text-[13px] text-charcoal-light mt-1.5 leading-relaxed">{service.description}</p>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-black/5">
          <span className="font-display font-semibold text-red-primary">{service.price} EGP</span>
          <Link href={`/book?service=${service.slug}`} className="text-[12.5px] font-bold text-red-primary hover:text-red-hover">
            Book →
          </Link>
        </div>
      </div>
    </div>
  );
}
