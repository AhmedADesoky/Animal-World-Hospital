"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Phone, Bike as BikeIcon, Package, TrendingUp, Pencil, Trash2, X, Check, ChevronRight } from "lucide-react";
import PageShell from "@/components/PageShell";
import StatusPill from "@/components/StatusPill";
import Select from "@/components/ui/Select";
import { useDrivers } from "@/lib/drivers-context";
import { useOrders } from "@/lib/orders-context";
import { deliveredCount, activeCount } from "@/lib/driver-stats";
import { deliveries, type Driver } from "@/lib/mock-data";

export default function DriverDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { drivers, updateDriver, removeDriver } = useDrivers();
  const { orders } = useOrders();
  const driver = drivers.find((d) => d.id === id);

  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<Omit<Driver, "id">>({ name: "", phone: "", vehicle: "", status: "Active" });
  const [saved, setSaved] = useState(false);

  if (!driver) {
    return (
      <PageShell title="Driver not found" subtitle="" actionLabel={null}>
        <div className="surface-card p-8 text-center text-charcoal-light">
          This driver doesn&apos;t exist. <Link href="/drivers" className="text-red-primary font-semibold hover:underline">Back to drivers</Link>
        </div>
      </PageShell>
    );
  }

  const delivered = deliveredCount(driver.name, orders);
  const active = activeCount(driver.name, orders);
  const assignedOrders = orders.filter((o) => o.driver === driver.name);
  const assignedDeliveries = deliveries.filter((d) => d.driver === driver.name);
  const total = delivered + active;
  const successRate = total > 0 ? Math.round((delivered / total) * 100) : 0;

  const startEdit = () => {
    setDraft({ name: driver.name, phone: driver.phone, vehicle: driver.vehicle, status: driver.status });
    setEditing(true);
  };
  const save = () => {
    updateDriver(driver.id, draft);
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };
  const remove = () => {
    if (confirm(`Remove ${driver.name} from drivers?`)) {
      removeDriver(driver.id);
      router.push("/drivers");
    }
  };

  return (
    <PageShell title={driver.name} subtitle="Driver profile & performance" actionLabel={null}>
      <button onClick={() => router.push("/drivers")} className="flex items-center gap-1.5 text-[13px] font-semibold text-charcoal-light hover:text-red-primary mb-5 transition-colors">
        <ArrowLeft size={14} strokeWidth={2} /> Back to drivers
      </button>

      <div className="grid lg:grid-cols-[1fr_1.4fr] gap-5">
        <div className="space-y-5">
          <div className="surface-card p-6">
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-red-bright to-red-deep flex items-center justify-center text-white font-display font-semibold text-xl shrink-0">
                  {driver.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-[16px]">{driver.name}</div>
                  <StatusPill status={driver.status === "Active" ? "Active" : "On leave"} />
                </div>
              </div>
              {!editing && (
                <div className="flex gap-1">
                  <button onClick={startEdit} className="p-1.5 rounded-lg text-charcoal-light hover:bg-grey-soft">
                    <Pencil size={14} strokeWidth={2} />
                  </button>
                  <button onClick={remove} className="p-1.5 rounded-lg text-red-primary hover:bg-red-tint">
                    <Trash2 size={14} strokeWidth={2} />
                  </button>
                </div>
              )}
            </div>

            {editing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wide text-charcoal-light mb-1.5">Full name</label>
                  <input
                    value={draft.name}
                    onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
                    className="w-full rounded-xl border-[1.5px] border-black/10 px-3.5 py-2.5 text-[13.5px] outline-none focus:border-red-primary"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wide text-charcoal-light mb-1.5">Phone</label>
                  <input
                    value={draft.phone}
                    onChange={(e) => setDraft((d) => ({ ...d, phone: e.target.value }))}
                    className="w-full rounded-xl border-[1.5px] border-black/10 px-3.5 py-2.5 text-[13.5px] outline-none focus:border-red-primary"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wide text-charcoal-light mb-1.5">Vehicle</label>
                  <input
                    value={draft.vehicle}
                    onChange={(e) => setDraft((d) => ({ ...d, vehicle: e.target.value }))}
                    className="w-full rounded-xl border-[1.5px] border-black/10 px-3.5 py-2.5 text-[13.5px] outline-none focus:border-red-primary"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wide text-charcoal-light mb-1.5">Status</label>
                  <Select
                    value={draft.status}
                    onChange={(v) => setDraft((d) => ({ ...d, status: v as Driver["status"] }))}
                    options={[
                      { value: "Active", label: "Active" },
                      { value: "Off duty", label: "Off duty" },
                    ]}
                  />
                </div>
                <div className="flex gap-2.5 pt-1">
                  <button onClick={() => setEditing(false)} className="btn-outline flex-1 justify-center">
                    Cancel
                  </button>
                  <button onClick={save} className="btn-primary flex-1 justify-center">
                    Save changes
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3 text-[13.5px]">
                <div className="flex items-center gap-2.5">
                  <Phone size={15} strokeWidth={2} className="text-red-primary shrink-0" /> {driver.phone}
                </div>
                <div className="flex items-center gap-2.5">
                  <BikeIcon size={15} strokeWidth={2} className="text-red-primary shrink-0" /> {driver.vehicle}
                </div>
              </div>
            )}
            {saved && (
              <div className="flex items-center gap-1.5 mt-4 text-[12.5px] font-semibold text-status-green">
                <Check size={13} strokeWidth={2.5} /> Saved
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="surface-card p-5">
              <div className="pill-icon w-[38px] h-[38px] mb-3">
                <Package size={16} strokeWidth={2} className="text-red-primary" />
              </div>
              <div className="font-display font-semibold text-[22px]">{delivered}</div>
              <div className="text-[11.5px] text-charcoal-light font-semibold">Delivered</div>
            </div>
            <div className="surface-card p-5">
              <div className="pill-icon w-[38px] h-[38px] mb-3">
                <TrendingUp size={16} strokeWidth={2} className="text-red-primary" />
              </div>
              <div className="font-display font-semibold text-[22px]">{successRate}%</div>
              <div className="text-[11.5px] text-charcoal-light font-semibold">Completion rate</div>
            </div>
          </div>
        </div>

        <div className="surface-card p-6">
          <h3 className="font-bold text-[14.5px] mb-1">Assigned orders</h3>
          <p className="text-[12px] text-charcoal-light mb-5">{active} active · {delivered} delivered</p>

          {assignedOrders.length === 0 && assignedDeliveries.length === 0 ? (
            <p className="text-charcoal-light text-[13px]">No orders assigned to this driver yet.</p>
          ) : (
            <div className="space-y-2.5">
              {assignedOrders.map((o) => (
                <Link key={o.id} href={`/orders/${o.id}`} className="flex items-center gap-3 p-3.5 rounded-xl border border-black/[.06] hover:border-red-primary/40 transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-[13px]">{o.id}</div>
                    <div className="text-[11.5px] text-charcoal-light">{o.client} · {o.city}</div>
                  </div>
                  <StatusPill status={o.status} />
                  <ChevronRight size={14} strokeWidth={2} className="text-charcoal-light shrink-0" />
                </Link>
              ))}
              {assignedDeliveries.map((d) => (
                <div key={d.id} className="flex items-center gap-3 p-3.5 rounded-xl border border-black/[.06]">
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-[13px]">#{d.id}</div>
                    <div className="text-[11.5px] text-charcoal-light">{d.client} · {d.address}</div>
                  </div>
                  <StatusPill status={d.status} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </PageShell>
  );
}
