"use client";

import { SidebarProvider, useSidebar } from "@/lib/sidebar-context";
import { OrdersProvider } from "@/lib/orders-context";
import { DriversProvider } from "@/lib/drivers-context";
import { AdminProfileProvider } from "@/lib/admin-profile-context";
import { EmployeesProvider } from "@/lib/employees-context";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";

function ShellInner({ children }: { children: React.ReactNode }) {
  const { collapsed } = useSidebar();
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <MobileNav />
      <div
        className={`flex-1 flex flex-col min-w-0 transition-[margin] duration-300 ease-out ${
          collapsed ? "md:ml-[84px]" : "md:ml-[252px]"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <OrdersProvider>
        <DriversProvider>
          <AdminProfileProvider>
            <EmployeesProvider>
              <ShellInner>{children}</ShellInner>
            </EmployeesProvider>
          </AdminProfileProvider>
        </DriversProvider>
      </OrdersProvider>
    </SidebarProvider>
  );
}
