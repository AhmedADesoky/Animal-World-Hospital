"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Crown, ChevronsLeft, ChevronsRight } from "lucide-react";
import Logo from "./Logo";
import { useSidebar } from "@/lib/sidebar-context";
import { useAdminProfile } from "@/lib/admin-profile-context";
import { mainLinks, peopleLinks, logisticsLinks, systemLinks, type NavLink } from "@/lib/nav-links";

function NavItem({ href, label, icon: Icon, badge, collapsed }: NavLink & { collapsed: boolean }) {
  const pathname = usePathname();
  const active = pathname === href;
  return (
    <Link
      href={href}
      title={collapsed ? label : undefined}
      className={`relative flex items-center gap-3 py-2.5 mx-2.5 mb-0.5 rounded-xl text-[13.5px] font-semibold transition-colors ${
        collapsed ? "justify-center px-0" : "px-4"
      } ${active ? "bg-red-tint text-red-primary" : "text-charcoal-light hover:bg-grey-soft hover:text-charcoal"}`}
    >
      {active && !collapsed && (
        <span className="absolute left-[-10px] top-1/4 bottom-1/4 w-[3px] rounded-r-md bg-gradient-to-b from-red-bright to-red-deep" />
      )}
      <Icon size={16} strokeWidth={2} className="shrink-0" />
      {!collapsed && <span className="truncate">{label}</span>}
      {badge && !collapsed ? (
        <span className="ml-auto bg-gradient-to-br from-red-bright to-red-deep text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full">
          {badge}
        </span>
      ) : null}
      {badge && collapsed ? (
        <span className="absolute top-1 right-1.5 w-[7px] h-[7px] rounded-full bg-red-bright" />
      ) : null}
    </Link>
  );
}

function SectionLabel({ children, collapsed }: { children: React.ReactNode; collapsed: boolean }) {
  if (collapsed) return <div className="mx-2.5 my-3 border-t border-black/[.06]" />;
  return <div className="px-6 pt-5 pb-2 text-[10px] font-bold tracking-[.14em] uppercase text-charcoal-light/50">{children}</div>;
}

export default function Sidebar() {
  const { collapsed, toggleCollapsed } = useSidebar();
  const { profile } = useAdminProfile();

  return (
    <aside
      className={`hidden md:flex fixed top-0 left-0 h-screen glass flex-col overflow-y-auto overflow-x-visible z-40 transition-[width] duration-300 ease-out ${
        collapsed ? "w-[84px]" : "w-[252px]"
      }`}
    >
      <div className={`flex items-center h-[68px] shrink-0 border-b border-black/[.06] ${collapsed ? "justify-center px-2" : "px-[22px] justify-between"}`}>
        <Logo showText={!collapsed} size={collapsed ? 30 : 34} />
        {!collapsed && (
          <button
            onClick={toggleCollapsed}
            title="Collapse sidebar"
            aria-label="Collapse sidebar"
            className="w-7 h-7 rounded-full bg-white border border-black/[.08] shadow-soft flex items-center justify-center text-charcoal-light hover:text-red-primary hover:border-red-primary transition-colors shrink-0"
          >
            <ChevronsLeft size={13} strokeWidth={2.5} />
          </button>
        )}
      </div>
      {collapsed && (
        <button
          onClick={toggleCollapsed}
          title="Expand sidebar"
          aria-label="Expand sidebar"
          className="mx-auto mt-3 w-7 h-7 rounded-full bg-white border border-black/[.08] shadow-soft flex items-center justify-center text-charcoal-light hover:text-red-primary hover:border-red-primary transition-colors shrink-0"
        >
          <ChevronsRight size={13} strokeWidth={2.5} />
        </button>
      )}

      <SectionLabel collapsed={collapsed}>Main</SectionLabel>
      {mainLinks.map((l) => (
        <NavItem key={l.href} {...l} collapsed={collapsed} />
      ))}

      <SectionLabel collapsed={collapsed}>People</SectionLabel>
      {peopleLinks.map((l) => (
        <NavItem key={l.href} {...l} collapsed={collapsed} />
      ))}

      <SectionLabel collapsed={collapsed}>Logistics</SectionLabel>
      {logisticsLinks.map((l) => (
        <NavItem key={l.href} {...l} collapsed={collapsed} />
      ))}

      <SectionLabel collapsed={collapsed}>System</SectionLabel>
      {systemLinks.map((l) => (
        <NavItem key={l.href} {...l} collapsed={collapsed} />
      ))}

      <div className={`mt-auto p-4 border-t border-black/[.06] ${collapsed ? "px-2" : ""}`}>
        <Link href="/profile" className={`flex items-center gap-3 py-2.5 rounded-xl hover:bg-grey-soft transition-colors ${collapsed ? "justify-center px-0" : "px-2.5"}`}>
          {profile.avatar ? (
            <div className="w-9 h-9 rounded-full bg-cover bg-center shrink-0 shadow-red" style={{ backgroundImage: `url(${profile.avatar})` }} />
          ) : (
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-red-bright to-red-deep flex items-center justify-center shrink-0 shadow-red">
              <Crown size={16} strokeWidth={2} className="text-white" />
            </div>
          )}
          {!collapsed && (
            <div className="min-w-0">
              <div className="text-[13px] font-bold truncate text-charcoal">{profile.name}</div>
              <div className="text-[11px] text-charcoal-light">{profile.role}</div>
            </div>
          )}
        </Link>
      </div>
    </aside>
  );
}
