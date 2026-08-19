"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Phone, MapPin, StickyNote, User2, Check } from "lucide-react";
import PageShell from "@/components/PageShell";
import StatusPill from "@/components/StatusPill";
import Select from "@/components/ui/Select";
import MapPreview from "@/components/MapPreview";
import { useOrders } from "@/lib/orders-context";
import { useDrivers } from "@/lib/drivers-context";

export default function OrderDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { orders, updateOrder } = useOrders();
  const { drivers } = useDrivers();
  const order = orders.find((o) => o.id === params.id);
  const [saved, setSaved] = useState(false);

  if (!order) {
    return (
      <PageShell title="Order not found" subtitle="" actionLabel={null}>
        <div className="surface-card p-8 text-center text-charcoal-light">This order doesn&apos;t exist.</div>
      </PageShell>
    );
  }

  const subtotal = order.items.reduce((n, i) => n + i.qty * i.price, 0);

  const assignDriver = (driver: string) => {
    updateOrder(order.id, { driver, status: driver === "Unassigned" ? "New" : "Assigned" });
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  };

  return (
    <PageShell title={`Order ${order.id}`} subtitle={order.createdAt} actionLabel={null}>
      <button onClick={() => router.push("/orders")} className="flex items-center gap-1.5 text-[13px] font-semibold text-charcoal-light hover:text-red-primary mb-5 transition-colors">
        <ArrowLeft size={14} strokeWidth={2} /> Back to orders
      </button>

      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-5">
        <div className="space-y-5">
          <div className="surface-card p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-[14.5px]">Order items</h3>
              <StatusPill status={order.status} />
            </div>
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-left text-[10.5px] font-bold uppercase tracking-wide text-charcoal-light border-b border-black/[.06]">
                  <th className="pb-2.5 pr-3">Item</th>
                  <th className="pb-2.5 pr-3">Qty</th>
                  <th className="pb-2.5 pr-3">Price</th>
                  <th className="pb-2.5">Total</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((it) => (
                  <tr key={it.name} className="border-b border-black/[.05] last:border-0">
                    <td className="py-3 pr-3 font-semibold text-[13px]">{it.name}</td>
                    <td className="py-3 pr-3 text-[13px]">×{it.qty}</td>
                    <td className="py-3 pr-3 text-[13px]">{it.price} EGP</td>
                    <td className="py-3 text-[13px] font-semibold">{it.qty * it.price} EGP</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-end pt-4 mt-2 border-t border-black/[.06]">
              <div className="text-right">
                <div className="text-[11px] text-charcoal-light font-semibold uppercase tracking-wide">Order total</div>
                <div className="font-display font-semibold text-[22px] text-red-primary">{subtotal} EGP</div>
              </div>
            </div>
          </div>

          <div className="surface-card p-6">
            <h3 className="font-bold text-[14.5px] mb-5">Delivery location</h3>
            {order.location ? (
              <MapPreview lat={order.location.lat} lng={order.location.lng} />
            ) : (
              <div className="rounded-xl border border-dashed border-black/[.08] p-6 text-center text-[12.5px] text-charcoal-light">
                No location was shared for this order.
              </div>
            )}
            {order.location && (
              <div className="text-[11.5px] text-charcoal-light font-medium mt-2">
                {order.location.lat.toFixed(5)}, {order.location.lng.toFixed(5)} · accuracy ±{Math.round(order.location.accuracy)}m
              </div>
            )}
            <div className="mt-4 space-y-3">
              <div className="flex items-start gap-2.5 text-[13px]">
                <MapPin size={15} strokeWidth={2} className="text-red-primary shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold">{order.addressLine}</div>
                  <div className="text-charcoal-light">{order.city}</div>
                </div>
              </div>
              {order.notes && (
                <div className="flex items-start gap-2.5 text-[13px]">
                  <StickyNote size={15} strokeWidth={2} className="text-red-primary shrink-0 mt-0.5" />
                  <div className="text-charcoal-light">{order.notes}</div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="surface-card p-6">
            <h3 className="font-bold text-[14.5px] mb-5">Customer</h3>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-full bg-grey-mid flex items-center justify-center text-[15px] font-bold text-charcoal-light">
                {order.client.charAt(0)}
              </div>
              <div>
                <div className="font-bold text-[13.5px]">{order.client}</div>
                <div className="text-[11.5px] text-charcoal-light flex items-center gap-1">
                  <Phone size={10} strokeWidth={2} /> {order.phone}
                </div>
              </div>
            </div>
            <button className="btn-outline w-full justify-center">View customer profile</button>
          </div>

          <div className="surface-card p-6">
            <h3 className="font-bold text-[14.5px] mb-1">Assign driver</h3>
            <p className="text-[12px] text-charcoal-light mb-4">Choose the driver responsible for this delivery.</p>
            <Select
              value={order.driver}
              onChange={assignDriver}
              options={[
                { value: "Unassigned", label: "Unassigned" },
                ...drivers.filter((d) => d.status === "Active").map((d) => ({ value: d.name, label: d.name })),
              ]}
            />
            {order.driver !== "Unassigned" && (
              <div className="flex items-center gap-2 mt-4 p-3 rounded-xl bg-status-greenTint text-status-green text-[12.5px] font-semibold">
                <User2 size={14} strokeWidth={2} /> {order.driver} is assigned to this order
              </div>
            )}
            {saved && (
              <div className="flex items-center gap-1.5 mt-3 text-[12px] font-semibold text-status-green">
                <Check size={13} strokeWidth={2.5} /> Saved
              </div>
            )}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
