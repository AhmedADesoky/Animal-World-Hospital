import { services } from "@/lib/mock-data";
import ServiceCard from "@/components/ServiceCard";

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16">
      <div className="text-center max-w-xl mx-auto mb-12">
        <span className="text-[11px] font-bold tracking-[.14em] uppercase text-red-primary">All services</span>
        <h1 className="font-display font-semibold text-4xl mt-2">Services built around your pet</h1>
        <p className="text-charcoal-light mt-3 text-[15px]">
          From routine check-ups to emergency surgery — everything under one roof.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map((s) => (
          <ServiceCard key={s.slug} service={s} />
        ))}
      </div>
    </div>
  );
}
