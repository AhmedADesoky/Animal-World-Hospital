"use client";

import Link from "next/link";
import { MapPin, ChevronRight } from "lucide-react";
import PageShell from "@/components/PageShell";
import StatusPill from "@/components/StatusPill";
import { useOrders } from "@/lib/orders-context";

export default function OrdersPage() {
  const { orders } = useOrders();

  return (
    <PageShell title="Orders" subtitle="Client orders awaiting driver assignment" actionLabel={null}>
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <div className="surface-card p-5">
          <div className="font-display font-semibold text-[27px]">{orders.filter((o) => o.status === "New").length}</div>
          <div className="text-[12.5px] text-charcoal-light font-semibold">New orders</div>
        </div>
        <div className="surface-card p-5">
          <div className="font-display font-semibold text-[27px]">{orders.filter((o) => o.driver === "Unassigned").length}</div>
          <div className="text-[12.5px] text-charcoal-light font-semibold">Awaiting driver</div>
        </div>
        <div className="surface-card p-5">
          <div className="font-display font-semibold text-[27px]">{orders.length}</div>
          <div className="text-[12.5px] text-charcoal-light font-semibold">Total this week</div>
        </div>
      </div>

      <div className="surface-card p-6">
        <h3 className="font-bold text-[14.5px] mb-5">All orders</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[760px]">
            <thead>
              <tr className="text-left text-[10.5px] font-bold uppercase tracking-wide text-charcoal-light border-b border-black/[.06]">
                <th className="pb-3 pr-3">Order #</th>
                <th className="pb-3 pr-3">Client</th>
                <th className="pb-3 pr-3">Items</th>
                <th className="pb-3 pr-3">Location</th>
                <th className="pb-3 pr-3">Driver</th>
                <th className="pb-3 pr-3">Status</th>
                <th className="pb-3"></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-b border-black/[.05] last:border-0">
                  <td className="py-3.5 pr-3 font-bold text-[13px]">{o.id}</td>
                  <td className="py-3.5 pr-3">
                    <div className="text-[13px] font-semibold">{o.client}</div>
                    <div className="text-[11px] text-charcoal-light">{o.createdAt}</div>
                  </td>
                  <td className="py-3.5 pr-3 text-[13px]">{o.items.reduce((n, i) => n + i.qty, 0)} items</td>
                  <td className="py-3.5 pr-3 text-[12.5px] text-charcoal-light">
                    <div className="flex items-center gap-1">
                      <MapPin size={11} strokeWidth={2} className="text-red-primary shrink-0" /> {o.city}
                    </div>
                  </td>
                  <td className="py-3.5 pr-3">
                    <span className={`text-[13px] font-semibold ${o.driver === "Unassigned" ? "text-charcoal-light italic" : ""}`}>{o.driver}</span>
                  </td>
                  <td className="py-3.5 pr-3">
                    <StatusPill status={o.status} />
                  </td>
                  <td className="py-3.5">
                    <Link href={`/orders/${o.id}`} className="p-1.5 rounded-lg text-charcoal-light hover:bg-grey-soft inline-flex">
                      <ChevronRight size={15} strokeWidth={2} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageShell>
  );
}
