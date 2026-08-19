import Link from "next/link";
import { PawPrint, Clock, GraduationCap, ScanLine, ArrowRight } from "lucide-react";
import { services, products } from "@/lib/mock-data";
import ServiceCard from "@/components/ServiceCard";
import ProductCard from "@/components/ProductCard";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";

const testimonials = [
  { name: "Ahmed Sayed", pet: "Max 🐕", quote: "The staff is amazing. They love catching up with my dog and treat him like family." },
  { name: "Sara Hassan", pet: "Luna 🐱", quote: "Booked a same-day appointment on WhatsApp — Luna was seen within the hour." },
  { name: "Tarek Ramadan", pet: "Buddy 🐶", quote: "Clean, modern facility and genuinely caring vets. Highly recommend." },
];

export default function Home() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          className="h-[560px] sm:h-[620px] bg-cover bg-center relative"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1583512603806-077998240c7a?q=80&w=1600&auto=format&fit=crop)",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/85 via-charcoal/55 to-transparent" />
          <div className="relative mx-auto max-w-7xl h-full px-5 sm:px-8 flex items-center">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-1.5 glass-dark text-white text-[11px] font-bold tracking-wide px-3.5 py-1.5 rounded-full mb-5">
                <PawPrint size={12} /> Trusted care since day one
              </span>
              <h1 className="font-display font-semibold text-white text-4xl sm:text-5xl leading-[1.1]">
                Caring for Every Paw, Every Day
              </h1>
              <p className="text-white/80 mt-5 text-[15px] sm:text-base leading-relaxed">
                Professional veterinary care, grooming, boarding and a full pet shop — all in one place.
              </p>
              <div className="flex flex-wrap gap-3 mt-8">
                <Link href="/book" className="btn-primary">
                  Book Appointment ▶
                </Link>
                <Link href="/services" className="btn-outline !bg-white/10 !text-white !border-white/25 hover:!border-white/50">
                  Our Services <ArrowRight size={15} strokeWidth={2} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-20">
        <div className="text-center max-w-lg mx-auto mb-12">
          <span className="text-[11px] font-bold tracking-[.14em] uppercase text-red-primary">What we offer</span>
          <h2 className="font-display font-semibold text-3xl mt-2">Our Services</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
      </section>

      {/* WHY US */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 grid md:grid-cols-2 gap-10 items-center">
          <div
            className="h-80 rounded-2xl bg-cover bg-center shadow-card"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1576201836106-db1758fd1c97?q=80&w=1200&auto=format&fit=crop)",
            }}
          />
          <div>
            <span className="text-[11px] font-bold tracking-[.14em] uppercase text-red-primary">Why choose us</span>
            <h2 className="font-display font-semibold text-3xl mt-2 mb-6">Expert care your pet deserves</h2>
            <div className="space-y-4">
              {[
                [Clock, "24/7 Emergency", "Round-the-clock support when your pet needs it most."],
                [GraduationCap, "Expert Vets", "Licensed, experienced veterinarians and specialists."],
                [ScanLine, "Modern Equipment", "Advanced diagnostics and surgical technology."],
              ].map(([Icon, title, desc]) => {
                const IconComp = Icon as typeof Clock;
                return (
                  <div key={title as string} className="flex items-start gap-4 surface-card !shadow-none border-black/5 p-4">
                    <div className="pill-icon w-11 h-11 shrink-0">
                      <IconComp size={19} className="text-red-primary" strokeWidth={2} />
                    </div>
                    <div>
                      <div className="font-semibold text-[14.5px]">{title as string}</div>
                      <div className="text-[13px] text-charcoal-light mt-0.5">{desc as string}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* SHOP PREVIEW */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-20">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <span className="text-[11px] font-bold tracking-[.14em] uppercase text-red-primary">Shop</span>
            <h2 className="font-display font-semibold text-3xl mt-2">Featured Products</h2>
          </div>
          <Link href="/shop" className="btn-outline">
            View all <ArrowRight size={15} strokeWidth={2} />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {products.slice(0, 4).map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="text-center max-w-lg mx-auto mb-12">
            <span className="text-[11px] font-bold tracking-[.14em] uppercase text-red-primary">Feedback</span>
            <h2 className="font-display font-semibold text-3xl mt-2">Client Stories</h2>
          </div>
          <TestimonialsCarousel items={testimonials} />
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-20">
        <div className="rounded-2xl bg-gradient-to-br from-red-primary to-red-deep px-8 sm:px-14 py-14 text-center text-white">
          <h2 className="font-display font-semibold text-3xl sm:text-4xl">Ready to give your pet the best care?</h2>
          <p className="text-white/80 mt-3 max-w-md mx-auto">Book an appointment today and join thousands of happy pets.</p>
          <Link href="/book" className="inline-block mt-8 bg-white text-red-primary font-bold px-7 py-3.5 rounded-full hover:-translate-y-0.5 transition-transform">
            Book Appointment
          </Link>
        </div>
      </section>
    </div>
  );
}
