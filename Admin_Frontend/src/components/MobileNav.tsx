"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/lib/sidebar-context";
import { mainLinks, peopleLinks, logisticsLinks, systemLinks, type NavLink } from "@/lib/nav-links";

function Group({ title, links, onNavigate }: { title: string; links: NavLink[]; onNavigate: () => void }) {
  const pathname = usePathname();
  return (
    <div className="mb-1">
      <div className="px-4 pt-3 pb-1.5 text-[10px] font-bold tracking-[.14em] uppercase text-charcoal-light/50">{title}</div>
      {links.map((l) => {
        const active = pathname === l.href;
        const Icon = l.icon;
        return (
          <Link
            key={l.href}
            href={l.href}
            onClick={onNavigate}
            className={`flex items-center gap-3 mx-2 px-3.5 py-3 rounded-xl text-[13.5px] font-semibold transition-colors ${
              active ? "bg-red-tint text-red-primary" : "text-charcoal hover:bg-grey-soft"
            }`}
          >
            <Icon size={17} strokeWidth={2} />
            <span className="flex-1">{l.label}</span>
            {l.badge ? (
              <span className="bg-gradient-to-br from-red-bright to-red-deep text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                {l.badge}
              </span>
            ) : null}
          </Link>
        );
      })}
    </div>
  );
}

export default function MobileNav() {
  const { mobileOpen, setMobileOpen } = useSidebar();

  if (!mobileOpen) return null;

  return (
    <>
      <div className="md:hidden fixed inset-0 bg-charcoal/40 z-40" onClick={() => setMobileOpen(false)} />
      <div className="md:hidden fixed top-[68px] left-0 right-0 z-50 glass rounded-b-2xl shadow-modal max-h-[calc(100vh-68px)] overflow-y-auto pb-3">
        <Group title="Main" links={mainLinks} onNavigate={() => setMobileOpen(false)} />
        <Group title="People" links={peopleLinks} onNavigate={() => setMobileOpen(false)} />
        <Group title="Logistics" links={logisticsLinks} onNavigate={() => setMobileOpen(false)} />
        <Group title="System" links={systemLinks} onNavigate={() => setMobileOpen(false)} />
      </div>
    </>
  );
}
