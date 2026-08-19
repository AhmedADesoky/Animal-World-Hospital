"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, MapPin, Phone, StickyNote, Package } from "lucide-react";
import { useClientStore } from "@/lib/client-store";
import MapEmbed from "@/components/MapEmbed";

const statusStyles: Record<string, string> = {
  Placed: "bg-status-blueTint text-status-blue",
  Assigned: "bg-status-purpleTint text-status-purple",
  "In transit": "bg-status-amberTint text-status-amber",
  Delivered: "bg-status-greenTint text-status-green",
};

const statusSteps = ["Placed", "Assigned", "In transit", "Delivered"];

export default function ClientOrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { orders } = useClientStore();
  const order = orders.find((o) => o.id === id);

  if (!order) {
    return (
      <div className="mx-auto max-w-lg px-5 py-24 text-center">
        <h1 className="font-display font-semibold text-2xl">Order not found</h1>
        <Link href="/profile" className="btn-primary inline-flex mt-6">
          Go to profile
        </Link>
      </div>
    );
  }

  const currentIndex = statusSteps.indexOf(order.status);

  return (
    <div className="mx-auto max-w-3xl px-5 sm:px-8 py-14">
      <Link href="/profile" className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-charcoal-light hover:text-red-primary mb-6 transition-colors">
        <ArrowLeft size={14} strokeWidth={2} /> Back to profile
      </Link>

      <div className="surface-card p-6 sm:p-8">
        <div className="flex items-start justify-between flex-wrap gap-3 mb-6">
          <div>
            <span className="text-[11px] font-bold tracking-[.14em] uppercase text-red-primary">Order {order.id}</span>
            <h1 className="font-display font-semibold text-2xl mt-1">{order.createdAt}</h1>
          </div>
          <span className={`status-pill ${statusStyles[order.status]}`}>{order.status}</span>
        </div>

        <div className="flex items-center gap-2 mb-8">
          {statusSteps.map((s, i) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div className="flex flex-col items-center gap-1.5 flex-1">
                <div className={`w-3 h-3 rounded-full ${i <= currentIndex ? "bg-red-primary" : "bg-black/10"}`} />
                <span className={`text-[10.5px] font-semibold text-center ${i <= currentIndex ? "text-charcoal" : "text-charcoal-light"}`}>{s}</span>
              </div>
              {i < statusSteps.length - 1 && <div className={`h-[2px] flex-1 -mt-4 ${i < currentIndex ? "bg-red-primary" : "bg-black/10"}`} />}
            </div>
          ))}
        </div>

        <h3 className="font-bold text-[14.5px] mb-4">Items</h3>
        <div className="space-y-3 mb-6">
          {order.items.map((it) => (
            <div key={it.slug} className="flex items-center gap-3 pb-3 border-b border-black/5 last:border-0">
              <div className="w-12 h-12 rounded-lg bg-cover bg-center shrink-0 bg-grey-soft" style={{ backgroundImage: `url(${it.image})` }} />
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-[13.5px] truncate">{it.name}</div>
                <div className="text-[12px] text-charcoal-light">×{it.qty}</div>
              </div>
              <div className="font-semibold text-[13.5px]">{it.qty * it.price} EGP</div>
            </div>
          ))}
        </div>
        <div className="flex justify-end mb-6">
          <span className="font-display font-semibold text-xl text-red-primary">{order.total} EGP</span>
        </div>

        <div className="space-y-3 pt-6 border-t border-black/5">
          {order.location && (
            <div className="mb-4">
              <MapEmbed lat={order.location.lat} lng={order.location.lng} height={220} />
            </div>
          )}
          <div className="flex items-start gap-2.5 text-[13.5px]">
            <MapPin size={15} strokeWidth={2} className="text-red-primary shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold">{order.addressLine}</div>
              <div className="text-charcoal-light">{order.city}</div>
            </div>
          </div>
          <div className="flex items-center gap-2.5 text-[13.5px]">
            <Phone size={15} strokeWidth={2} className="text-red-primary shrink-0" /> {order.phone}
          </div>
          {order.notes && (
            <div className="flex items-start gap-2.5 text-[13.5px]">
              <StickyNote size={15} strokeWidth={2} className="text-red-primary shrink-0 mt-0.5" /> <span className="text-charcoal-light">{order.notes}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
