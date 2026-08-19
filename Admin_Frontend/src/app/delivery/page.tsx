"use client";

import { useState } from "react";
import { MapPin, User2 } from "lucide-react";
import PageShell from "@/components/PageShell";
import Select from "@/components/ui/Select";
import { deliveries as initialDeliveries, type DeliveryOrder } from "@/lib/mock-data";

const statusOptions: DeliveryOrder["status"][] = ["Pending", "In transit", "Delivered"];

export default function DeliveryPage() {
  const [deliveries, setDeliveries] = useState(initialDeliveries);

  const updateStatus = (id: string, status: DeliveryOrder["status"]) => {
    setDeliveries((prev) => prev.map((d) => (d.id === id ? { ...d, status } : d)));
  };

  return (
    <PageShell title="Delivery orders" subtitle="Track and manage deliveries" actionLabel="Export">
      <div className="surface-card p-6">
        <h3 className="font-bold text-[14.5px] mb-5">Delivery orders</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[900px]">
            <thead>
              <tr className="text-left text-[10.5px] font-bold uppercase tracking-wide text-charcoal-light border-b border-black/[.06]">
                <th className="pb-3 pr-3">Order #</th>
                <th className="pb-3 pr-3">Client</th>
                <th className="pb-3 pr-3">Items</th>
                <th className="pb-3 pr-3">Total</th>
                <th className="pb-3 pr-3">Driver</th>
                <th className="pb-3 pr-3">Current location</th>
                <th className="pb-3 pr-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {deliveries.map((d) => (
                <tr key={d.id} className="border-b border-black/[.05] last:border-0">
                  <td className="py-3.5 pr-3 font-bold text-[13px]">#{d.id}</td>
                  <td className="py-3.5 pr-3">
                    <div className="text-[13px] font-semibold">{d.client}</div>
                    <div className="text-[11px] text-charcoal-light flex items-center gap-1 mt-0.5">
                      <MapPin size={11} strokeWidth={2} /> {d.address}
                    </div>
                  </td>
                  <td className="py-3.5 pr-3 text-[13px]">{d.items}</td>
                  <td className="py-3.5 pr-3 text-[13px]">{d.total} EGP</td>
                  <td className="py-3.5 pr-3">
                    <div className={`flex items-center gap-1.5 text-[13px] font-semibold ${d.driver === "Unassigned" ? "text-charcoal-light italic" : ""}`}>
                      <User2 size={13} strokeWidth={2} className="text-red-primary shrink-0" /> {d.driver}
                    </div>
                  </td>
                  <td className="py-3.5 pr-3 text-[12.5px] text-charcoal-light">{d.currentLocation}</td>
                  <td className="py-3.5 pr-3">
                    <Select
                      variant="pill"
                      value={d.status}
                      onChange={(v) => updateStatus(d.id, v as DeliveryOrder["status"])}
                      options={statusOptions.map((s) => ({ value: s, label: s }))}
                      pillStyle={{
                        color: d.status === "Delivered" ? "#1E9E5A" : d.status === "In transit" ? "#B26B00" : "#4A4A6A",
                        background: d.status === "Delivered" ? "#E4F8EE" : d.status === "In transit" ? "#FFF4E0" : "#E8E9EC",
                      }}
                    />
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
