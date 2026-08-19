"use client";

import { useRef, useState } from "react";
import { Pencil, Trash2, X, ImagePlus, ImageOff } from "lucide-react";
import PageShell from "@/components/PageShell";
import StatusPill from "@/components/StatusPill";
import Select from "@/components/ui/Select";
import { services as initialServices, type ServiceRow } from "@/lib/mock-data";

const emptyDraft: Omit<ServiceRow, "id" | "bookingsThisMonth"> = {
  name: "",
  category: "Medical",
  price: 0,
  duration: "30 min",
  status: "Active",
  image: "",
};

export default function ServicesPage() {
  const [services, setServices] = useState(initialServices);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState(emptyDraft);
  const fileRef = useRef<HTMLInputElement>(null);

  const openCreate = () => {
    setEditingId(null);
    setDraft(emptyDraft);
    setModalOpen(true);
  };

  const openEdit = (s: ServiceRow) => {
    setEditingId(s.id);
    setDraft({ name: s.name, category: s.category, price: s.price, duration: s.duration, status: s.status, image: s.image });
    setModalOpen(true);
  };

  const removeService = (id: string) => setServices((prev) => prev.filter((s) => s.id !== id));

  const handleFile = (file: File | undefined) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setDraft((d) => ({ ...d, image: url }));
  };

  const save = () => {
    if (!draft.name.trim()) return;
    if (editingId) {
      setServices((prev) => prev.map((s) => (s.id === editingId ? { ...s, ...draft } : s)));
    } else {
      setServices((prev) => [{ id: `s${Date.now()}`, bookingsThisMonth: 0, ...draft }, ...prev]);
    }
    setModalOpen(false);
  };

  return (
    <PageShell title="Services" subtitle="Manage clinic services" actionLabel="Add service" onAction={openCreate}>
      <div className="surface-card p-6">
        <h3 className="font-bold text-[14.5px] mb-5">Services management</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[760px]">
            <thead>
              <tr className="text-left text-[10.5px] font-bold uppercase tracking-wide text-charcoal-light border-b border-black/[.06]">
                <th className="pb-3 pr-3">Service</th>
                <th className="pb-3 pr-3">Category</th>
                <th className="pb-3 pr-3">Price</th>
                <th className="pb-3 pr-3">Duration</th>
                <th className="pb-3 pr-3">Status</th>
                <th className="pb-3 pr-3">Bookings</th>
                <th className="pb-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((s) => (
                <tr key={s.id} className="border-b border-black/[.05] last:border-0">
                  <td className="py-3 pr-3">
                    <div className="flex items-center gap-3">
                      {s.image ? (
                        <div className="w-11 h-11 rounded-xl bg-cover bg-center shrink-0 border border-black/[.06]" style={{ backgroundImage: `url(${s.image})` }} />
                      ) : (
                        <div className="w-11 h-11 rounded-xl bg-grey-soft flex items-center justify-center shrink-0 text-charcoal-light/50">
                          <ImageOff size={16} strokeWidth={1.5} />
                        </div>
                      )}
                      <span className="font-bold text-[13px]">{s.name}</span>
                    </div>
                  </td>
                  <td className="py-3.5 pr-3 text-[13px]">{s.category}</td>
                  <td className="py-3.5 pr-3 text-[13px]">{s.price} EGP</td>
                  <td className="py-3.5 pr-3 text-[13px]">{s.duration}</td>
                  <td className="py-3.5 pr-3">
                    <StatusPill status={s.status} />
                  </td>
                  <td className="py-3.5 pr-3 text-[13px]">{s.bookingsThisMonth} this month</td>
                  <td className="py-3.5">
                    <div className="flex gap-1">
                      <button onClick={() => openEdit(s)} className="p-1.5 rounded-lg text-charcoal-light hover:bg-grey-soft">
                        <Pencil size={14} strokeWidth={2} />
                      </button>
                      <button onClick={() => removeService(s.id)} className="p-1.5 rounded-lg text-red-primary hover:bg-red-tint">
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
          <div className="bg-white rounded-2xl shadow-modal w-full max-w-[460px] p-7 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-1">
              <h3 className="font-display font-semibold text-[19px]">{editingId ? "Edit service" : "Add service"}</h3>
              <button onClick={() => setModalOpen(false)} className="w-[30px] h-[30px] rounded-full bg-grey-soft flex items-center justify-center text-charcoal-light">
                <X size={15} strokeWidth={2} />
              </button>
            </div>
            <p className="text-[12.5px] text-charcoal-light mb-6">Fill in the details below. Clients will see this once activated.</p>

            <div className="mb-4">
              <label className="block text-[11px] font-bold uppercase tracking-wide text-charcoal-light mb-1.5">Service image</label>
              {draft.image ? (
                <div className="relative">
                  <div className="h-36 rounded-xl bg-cover bg-center border border-black/[.06]" style={{ backgroundImage: `url(${draft.image})` }} />
                  <button
                    onClick={() => setDraft((d) => ({ ...d, image: "" }))}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 shadow-soft flex items-center justify-center text-red-primary"
                  >
                    <Trash2 size={13} strokeWidth={2} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => fileRef.current?.click()}
                  className="w-full h-36 rounded-xl border-2 border-dashed border-black/10 flex flex-col items-center justify-center gap-1.5 text-charcoal-light hover:border-red-primary hover:bg-red-tint hover:text-red-primary transition-colors"
                >
                  <ImagePlus size={22} strokeWidth={1.5} />
                  <span className="text-[12px] font-semibold">Click to upload image</span>
                </button>
              )}
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleFile(e.target.files?.[0])} />
            </div>

            <div className="mb-4">
              <label className="block text-[11px] font-bold uppercase tracking-wide text-charcoal-light mb-1.5">Service name</label>
              <input
                value={draft.name}
                onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
                placeholder="e.g. Dental cleaning"
                className="w-full rounded-xl border-[1.5px] border-black/10 px-3.5 py-2.5 text-[13.5px] outline-none focus:border-red-primary"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wide text-charcoal-light mb-1.5">Price (EGP)</label>
                <input
                  type="number"
                  value={draft.price}
                  onChange={(e) => setDraft((d) => ({ ...d, price: Number(e.target.value) }))}
                  className="w-full rounded-xl border-[1.5px] border-black/10 px-3.5 py-2.5 text-[13.5px] outline-none focus:border-red-primary"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wide text-charcoal-light mb-1.5">Duration</label>
                <input
                  value={draft.duration}
                  onChange={(e) => setDraft((d) => ({ ...d, duration: e.target.value }))}
                  placeholder="e.g. 30 min"
                  className="w-full rounded-xl border-[1.5px] border-black/10 px-3.5 py-2.5 text-[13.5px] outline-none focus:border-red-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wide text-charcoal-light mb-1.5">Category</label>
                <input
                  value={draft.category}
                  onChange={(e) => setDraft((d) => ({ ...d, category: e.target.value }))}
                  className="w-full rounded-xl border-[1.5px] border-black/10 px-3.5 py-2.5 text-[13.5px] outline-none focus:border-red-primary"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wide text-charcoal-light mb-1.5">Status</label>
                <Select
                  value={draft.status}
                  onChange={(v) => setDraft((d) => ({ ...d, status: v as ServiceRow["status"] }))}
                  options={[
                    { value: "Active", label: "Active" },
                    { value: "Limited", label: "Limited" },
                  ]}
                />
              </div>
            </div>

            <div className="flex gap-2.5">
              <button onClick={() => setModalOpen(false)} className="btn-outline flex-1 justify-center">
                Cancel
              </button>
              <button onClick={save} className="btn-primary flex-1 justify-center">
                {editingId ? "Save changes" : "Add service"}
              </button>
            </div>
          </div>
        </div>
      )}
    </PageShell>
  );
}
