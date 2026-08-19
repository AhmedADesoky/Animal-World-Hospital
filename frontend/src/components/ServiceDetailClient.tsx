"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, CalendarPlus, Stethoscope, Scissors, Syringe, Home, Activity, Building2, type LucideIcon } from "lucide-react";
import { services } from "@/lib/mock-data";
import ReviewSection from "@/components/ReviewSection";
import ServiceCard from "@/components/ServiceCard";
import type { Service } from "@/lib/mock-data";

const iconMap: Record<Service["icon"], LucideIcon> = {
  stethoscope: Stethoscope,
  scissors: Scissors,
  syringe: Syringe,
  home: Home,
  activity: Activity,
  building: Building2,
};

export default function ServiceDetailClient({ slug }: { slug: string }) {
  const service = services.find((s) => s.slug === slug);
  if (!service) return notFound();

  const Icon = iconMap[service.icon];
  const related = services.filter((s) => s.slug !== service.slug && s.category === service.category).slice(0, 3);
  const durationLabel = service.durationMin >= 60 ? `${Math.round(service.durationMin / 60)} hr` : `${service.durationMin} min`;

  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8 py-10">
      <Link href="/services" className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-charcoal-light hover:text-red-primary mb-6 transition-colors">
        <ArrowLeft size={14} strokeWidth={2} /> Back to services
      </Link>

      <div className="grid md:grid-cols-2 gap-10">
        <div className="h-80 sm:h-[420px] rounded-2xl bg-cover bg-center relative shadow-card" style={{ backgroundImage: `url(${service.image})` }}>
          <div className="absolute top-4 left-4 pill-icon w-14 h-14">
            <Icon size={24} className="text-red-primary" strokeWidth={2} />
          </div>
        </div>

        <div>
          <span className="text-[11px] font-bold tracking-[.14em] uppercase text-red-primary">{service.category}</span>
          <h1 className="font-display font-semibold text-3xl mt-2">{service.nameEn}</h1>
          <p className="text-charcoal-light text-sm mt-1" dir="rtl">{service.nameAr}</p>

          <div className="flex items-center gap-5 mt-5">
            <span className="font-display font-semibold text-2xl text-red-primary">{service.price} EGP</span>
            <span className="flex items-center gap-1.5 text-[13.5px] text-charcoal-light font-semibold">
              <Clock size={15} strokeWidth={2} /> {durationLabel}
            </span>
          </div>

          <p className="text-charcoal-light mt-5 leading-relaxed text-[14.5px]">{service.description}</p>

          <Link href={`/book?service=${service.slug}`} className="btn-primary w-full sm:w-auto justify-center mt-8">
            <CalendarPlus size={16} strokeWidth={2} /> Book this service
          </Link>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="font-display font-semibold text-2xl mb-6">Related services</h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {related.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </div>
      )}

      <div className="mt-16 pt-10 border-t border-black/5">
        <ReviewSection targetSlug={service.slug} />
      </div>
    </div>
  );
}
