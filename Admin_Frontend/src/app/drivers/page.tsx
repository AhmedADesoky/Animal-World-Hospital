"use client";

import { useState } from "react";
import Link from "next/link";
import { Bike, Phone, Pencil, Trash2, X, Package, TrendingUp, ChevronRight } from "lucide-react";
import PageShell from "@/components/PageShell";
import StatusPill from "@/components/StatusPill";
import Select from "@/components/ui/Select";
import { useDrivers } from "@/lib/drivers-context";
import { useOrders } from "@/lib/orders-context";
import { deliveredCount, activeCount } from "@/lib/driver-stats";
import { type Driver } from "@/lib/mock-data";

const emptyDraft: Omit<Driver, "id"> = { name: "", phone: "", vehicle: "", status: "Active" };

export default function DriversPage() {
  const { drivers, addDriver, updateDriver, removeDriver } = useDrivers();
  const { orders } = useOrders();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState(emptyDraft);

  const totalDelivered = drivers.reduce((n, d) => n + deliveredCount(d.name, orders), 0);
  const topDriver = [...drivers].sort((a, b) => deliveredCount(b.name, orders) - deliveredCount(a.name, orders))[0];

  const openCreate = () => {
    setEditingId(null);
    setDraft(emptyDraft);
    setModalOpen(true);
  };

  const openEdit = (d: Driver) => {
    setEditingId(d.id);
    setDraft({ name: d.name, phone: d.phone, vehicle: d.vehicle, status: d.status });
    setModalOpen(true);
  };

  const save = () => {
    if (!draft.name.trim()) return;
    if (editingId) {
      updateDriver(editingId, draft);
    } else {
      addDriver(draft);
    }
    setModalOpen(false);
  };

  return (
    <PageShell title="Drivers" subtitle="Manage delivery drivers and performance" actionLabel="Add driver" onAction={openCreate}>
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <div className="surface-card p-5">
          <div className="pill-icon w-[42px] h-[42px] mb-3.5">
            <Bike size={18} strokeWidth={2} className="text-red-primary" />
          </div>
          <div className="font-display font-semibold text-[27px]">{drivers.length}</div>
          <div className="text-[12.5px] text-charcoal-light font-semibold">Total drivers</div>
        </div>
        <div className="surface-card p-5">
          <div className="pill-icon w-[42px] h-[42px] mb-3.5">
            <Package size={18} strokeWidth={2} className="text-red-primary" />
          </div>
          <div className="font-display font-semibold text-[27px]">{totalDelivered}</div>
          <div className="text-[12.5px] text-charcoal-light font-semibold">Orders delivered</div>
        </div>
        <div className="surface-card p-5">
          <div className="pill-icon w-[42px] h-[42px] mb-3.5">
            <TrendingUp size={18} strokeWidth={2} className="text-red-primary" />
          </div>
          <div className="font-display font-semibold text-[19px] truncate">{topDriver?.name ?? "—"}</div>
          <div className="text-[12.5px] text-charcoal-light font-semibold">Top performer</div>
        </div>
      </div>

      <div className="surface-card p-6 mb-6">
        <h3 className="font-bold text-[14.5px] mb-1">Deliveries by driver</h3>
        <p className="text-[12px] text-charcoal-light mb-5">Completed orders per driver</p>
        <div className="space-y-3.5">
          {drivers.map((d) => {
            const count = deliveredCount(d.name, orders);
            const max = Math.max(1, ...drivers.map((x) => deliveredCount(x.name, orders)));
            return (
              <div key={d.id} className="flex items-center gap-3">
                <span className="w-32 shrink-0 text-[12.5px] font-semibold truncate">{d.name}</span>
                <div className="flex-1 h-2.5 rounded-full bg-grey-soft overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-red-bright to-red-primary"
                    style={{ width: `${(count / max) * 100}%` }}
                  />
                </div>
                <span className="w-6 text-right text-[12.5px] font-bold text-red-primary">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="surface-card p-6">
        <h3 className="font-bold text-[14.5px] mb-5">All drivers</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[720px]">
            <thead>
              <tr className="text-left text-[10.5px] font-bold uppercase tracking-wide text-charcoal-light border-b border-black/[.06]">
                <th className="pb-3 pr-3">Driver</th>
                <th className="pb-3 pr-3">Vehicle</th>
                <th className="pb-3 pr-3">Active orders</th>
                <th className="pb-3 pr-3">Delivered</th>
                <th className="pb-3 pr-3">Status</th>
                <th className="pb-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {drivers.map((d) => (
                <tr key={d.id} className="border-b border-black/[.05] last:border-0">
                  <td className="py-3.5 pr-3">
                    <Link href={`/drivers/${d.id}`} className="flex items-center gap-3 hover:text-red-primary">
                      <div className="w-9 h-9 rounded-full bg-grey-mid flex items-center justify-center text-[13px] font-bold text-charcoal-light shrink-0">
                        {d.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-[13px]">{d.name}</div>
                        <div className="text-[11px] text-charcoal-light flex items-center gap-1">
                          <Phone size={10} strokeWidth={2} /> {d.phone}
                        </div>
                      </div>
                    </Link>
                  </td>
                  <td className="py-3.5 pr-3 text-[13px]">{d.vehicle}</td>
                  <td className="py-3.5 pr-3 text-[13px]">{activeCount(d.name, orders)}</td>
                  <td className="py-3.5 pr-3 text-[13px] font-semibold">{deliveredCount(d.name, orders)}</td>
                  <td className="py-3.5 pr-3">
                    <StatusPill status={d.status === "Active" ? "Active" : "On leave"} />
                  </td>
                  <td className="py-3.5">
                    <div className="flex gap-1">
                      <Link href={`/drivers/${d.id}`} className="p-1.5 rounded-lg text-charcoal-light hover:bg-grey-soft inline-flex">
                        <ChevronRight size={14} strokeWidth={2} />
                      </Link>
                      <button onClick={() => openEdit(d)} className="p-1.5 rounded-lg text-charcoal-light hover:bg-grey-soft">
                        <Pencil size={14} strokeWidth={2} />
                      </button>
                      <button onClick={() => removeDriver(d.id)} className="p-1.5 rounded-lg text-red-primary hover:bg-red-tint">
                        <Trash2 size={14} strokeWidth={2} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-charcoal/50 backdrop-blur-sm z-[100] flex items-center justify-center p-5" onClick={() => setModalOpen(false)}>
          <div className="bg-white rounded-2xl shadow-modal w-full max-w-[440px] p-7" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-1">
              <h3 className="font-display font-semibold text-[19px]">{editingId ? "Edit driver" : "Add driver"}</h3>
              <button onClick={() => setModalOpen(false)} className="w-[30px] h-[30px] rounded-full bg-grey-soft flex items-center justify-center text-charcoal-light">
                <X size={15} strokeWidth={2} />
              </button>
            </div>
            <p className="text-[12.5px] text-charcoal-light mb-6">Drivers can be assigned to orders once added.</p>

            <div className="mb-4">
              <label className="block text-[11px] font-bold uppercase tracking-wide text-charcoal-light mb-1.5">Full name</label>
              <input
                value={draft.name}
                onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
                placeholder="e.g. Youssef Adel"
                className="w-full rounded-xl border-[1.5px] border-black/10 px-3.5 py-2.5 text-[13.5px] outline-none focus:border-red-primary"
              />
            </div>
            <div className="mb-4">
              <label className="block text-[11px] font-bold uppercase tracking-wide text-charcoal-light mb-1.5">Phone number</label>
              <input
                value={draft.phone}
                onChange={(e) => setDraft((d) => ({ ...d, phone: e.target.value }))}
                placeholder="+20 1xx xxx xxxx"
                className="w-full rounded-xl border-[1.5px] border-black/10 px-3.5 py-2.5 text-[13.5px] outline-none focus:border-red-primary"
              />
            </div>
            <div className="mb-4">
              <label className="block text-[11px] font-bold uppercase tracking-wide text-charcoal-light mb-1.5">Vehicle</label>
              <input
                value={draft.vehicle}
                onChange={(e) => setDraft((d) => ({ ...d, vehicle: e.target.value }))}
                placeholder="e.g. Motorcycle · plate #"
                className="w-full rounded-xl border-[1.5px] border-black/10 px-3.5 py-2.5 text-[13.5px] outline-none focus:border-red-primary"
              />
            </div>
            <div className="mb-6">
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

            <div className="flex gap-2.5">
              <button onClick={() => setModalOpen(false)} className="btn-outline flex-1 justify-center">
                Cancel
              </button>
              <button onClick={save} className="btn-primary flex-1 justify-center">
                {editingId ? "Save changes" : "Add driver"}
              </button>
            </div>
          </div>
        </div>
      )}
    </PageShell>
  );
}
