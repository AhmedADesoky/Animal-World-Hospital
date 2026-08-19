import Link from "next/link";
import { HeartPulse, ShieldCheck, Sparkles, Clock, Award, Users, PawPrint, ArrowRight } from "lucide-react";

const stats = [
  { value: "12+", label: "Years of care" },
  { value: "18,000+", label: "Pets treated" },
  { value: "24/7", label: "Emergency support" },
  { value: "4.9★", label: "Client rating" },
];

const values = [
  {
    icon: HeartPulse,
    title: "Compassionate care",
    desc: "Every pet is treated like family — with patience, gentleness, and genuine attention to their comfort, not just their symptoms.",
  },
  {
    icon: ShieldCheck,
    title: "Vet-approved quality",
    desc: "Every product on our shelves and every service on our menu is reviewed by licensed veterinarians before it reaches your pet.",
  },
  {
    icon: Sparkles,
    title: "Modern facilities",
    desc: "From digital diagnostics to sterile surgical suites, we invest continuously in equipment that keeps pace with veterinary medicine.",
  },
  {
    icon: Clock,
    title: "Always reachable",
    desc: "Our emergency line runs around the clock, and our Ask AWH assistant is on standby for quick questions any time of day.",
  },
];

const team = [
  { name: "Dr. Mostafa Ali", role: "Founder & Chief Veterinarian", photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400&auto=format&fit=crop" },
  { name: "Dr. Hana Mostafa", role: "Senior Veterinarian", photo: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=400&auto=format&fit=crop" },
  { name: "Yara Gamal", role: "Clinic Operations Manager", photo: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=400&auto=format&fit=crop" },
];

export default function AboutPage() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          className="h-[420px] sm:h-[480px] bg-cover bg-center relative"
          style={{ backgroundImage: "url(https://images.unsplash.com/photo-1584467735815-f778f274e296?q=80&w=1600&auto=format&fit=crop)" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/85 via-charcoal/55 to-transparent" />
          <div className="relative mx-auto max-w-7xl h-full px-5 sm:px-8 flex items-center">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-1.5 glass-dark text-white text-[11px] font-bold tracking-wide px-3.5 py-1.5 rounded-full mb-5">
                <PawPrint size={12} /> Our story
              </span>
              <h1 className="font-display font-semibold text-white text-4xl sm:text-5xl leading-[1.1]">About Animal World Hospital</h1>
              <p className="text-white/80 mt-5 text-[15px] sm:text-base leading-relaxed">
                A trusted home for pet health — combining expert medicine, warm hospitality, and quality products under one roof.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div
            className="h-80 rounded-2xl bg-cover bg-center shadow-card"
            style={{ backgroundImage: "url(https://images.unsplash.com/photo-1512237798647-2ecbf8d3ff1e?q=80&w=1200&auto=format&fit=crop)" }}
          />
          <div>
            <span className="text-[11px] font-bold tracking-[.14em] uppercase text-red-primary">Who we are</span>
            <h2 className="font-display font-semibold text-3xl mt-2 mb-5">Caring for every paw, every day</h2>
            <p className="text-charcoal-light leading-relaxed text-[14.5px] mb-4">
              Animal World Hospital was founded on a simple belief: pets deserve the same standard of care, honesty, and
              comfort we&apos;d want for any member of our own family. What started as a small neighborhood clinic has
              grown into a full-service veterinary hospital — offering medical consultations, surgery, grooming,
              boarding, home visits, and a curated pet shop, all built around the wellbeing of the animals we treat.
            </p>
            <p className="text-charcoal-light leading-relaxed text-[14.5px]">
              Every product we stock and every treatment we recommend is chosen the same way: would we trust it for our
              own pets? That question still shapes every decision we make.
            </p>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-charcoal py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="font-display font-semibold text-3xl sm:text-4xl text-white">{s.value}</div>
              <div className="text-white/60 text-[12.5px] font-semibold mt-1.5">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* VALUES / QUALITY */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-20">
        <div className="text-center max-w-lg mx-auto mb-12">
          <span className="text-[11px] font-bold tracking-[.14em] uppercase text-red-primary">Why pet owners trust us</span>
          <h2 className="font-display font-semibold text-3xl mt-2">Quality you can see in every visit</h2>
          <p className="text-charcoal-light mt-3 text-[14.5px]">
            From the medicine we practice to the products on our shelves, quality isn&apos;t a tagline here — it&apos;s the standard everything is measured against.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          {values.map((v) => {
            const Icon = v.icon;
            return (
              <div key={v.title} className="surface-card p-6 flex items-start gap-4">
                <div className="pill-icon w-12 h-12 shrink-0">
                  <Icon size={20} strokeWidth={2} className="text-red-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-[15px]">{v.title}</h3>
                  <p className="text-[13.5px] text-charcoal-light mt-1.5 leading-relaxed">{v.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* TEAM */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="text-center max-w-lg mx-auto mb-12">
            <span className="text-[11px] font-bold tracking-[.14em] uppercase text-red-primary">Meet the team</span>
            <h2 className="font-display font-semibold text-3xl mt-2">The people behind the care</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {team.map((t) => (
              <div key={t.name} className="surface-card overflow-hidden text-center">
                <div className="h-56 bg-cover bg-center" style={{ backgroundImage: `url(${t.photo})` }} />
                <div className="p-5">
                  <div className="font-semibold text-[15px]">{t.name}</div>
                  <div className="text-[12.5px] text-charcoal-light mt-1">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS/SERVICES QUALITY BANNER */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="text-[11px] font-bold tracking-[.14em] uppercase text-red-primary">Products &amp; services</span>
            <h2 className="font-display font-semibold text-3xl mt-2 mb-5">Held to the same high bar</h2>
            <div className="space-y-4">
              {[
                { title: "Vet-vetted shop", desc: "Every food, medication, and accessory we sell is reviewed by our veterinary team before it goes on the shelf." },
                { title: "Licensed specialists", desc: "Our vets, groomers, and surgeons are certified professionals with ongoing training in modern animal care." },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-red-tint flex items-center justify-center shrink-0 mt-0.5">
                    <Award size={15} strokeWidth={2} className="text-red-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-[14px]">{item.title}</div>
                    <div className="text-[13px] text-charcoal-light mt-0.5 leading-relaxed">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div
            className="h-80 rounded-2xl bg-cover bg-center shadow-card"
            style={{ backgroundImage: "url(https://images.unsplash.com/photo-1601758228041-f3b2795255f1?q=80&w=1200&auto=format&fit=crop)" }}
          />
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 pb-20">
        <div className="rounded-2xl bg-gradient-to-br from-red-primary to-red-deep px-8 sm:px-14 py-14 text-center text-white">
          <Users size={28} strokeWidth={1.5} className="mx-auto mb-4 opacity-80" />
          <h2 className="font-display font-semibold text-3xl sm:text-4xl">Join the AWH family</h2>
          <p className="text-white/80 mt-3 max-w-md mx-auto">Book your pet&apos;s first visit and experience the difference quality care makes.</p>
          <Link href="/book" className="inline-flex items-center gap-2 mt-8 bg-white text-red-primary font-bold px-7 py-3.5 rounded-full hover:-translate-y-0.5 transition-transform">
            Book Appointment <ArrowRight size={16} strokeWidth={2} />
          </Link>
        </div>
      </section>
    </div>
  );
}
