"use client";

import { useState } from "react";
import { Tag, Pencil, Trash2, X, Percent } from "lucide-react";
import PageShell from "@/components/PageShell";
import StatusPill from "@/components/StatusPill";
import Select from "@/components/ui/Select";
import DatePicker from "@/components/ui/DatePicker";
import { offers as initialOffers, products, services, type Offer } from "@/lib/mock-data";

const statusStyles: Record<Offer["status"], string> = {
  Active: "bg-status-greenTint text-status-green",
  Scheduled: "bg-status-blueTint text-status-blue",
  Expired: "bg-grey-mid text-charcoal-light",
};

export default function OffersPage() {
  const [offers, setOffers] = useState(initialOffers);
  const [modalOpen, setModalOpen] = useState(false);
  const [targetType, setTargetType] = useState<Offer["targetType"]>("Product");
  const [targetName, setTargetName] = useState(products[0].name);
  const [discount, setDiscount] = useState(10);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const options = targetType === "Product" ? products.map((p) => p.name) : services.map((s) => s.name);

  const createOffer = () => {
    const offer: Offer = {
      id: `o${Date.now()}`,
      targetType,
      targetName,
      discountPercent: discount,
      startDate: startDate || "TBD",
      endDate: endDate || "TBD",
      status: "Scheduled",
    };
    setOffers((prev) => [offer, ...prev]);
    setModalOpen(false);
  };

  const removeOffer = (id: string) => setOffers((prev) => prev.filter((o) => o.id !== id));

  return (
    <PageShell title="Offers" subtitle="Create discounts on products and services" actionLabel="Create offer" onAction={() => setModalOpen(true)}>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {offers.map((o) => (
          <div key={o.id} className="surface-card p-5">
            <div className="flex items-start justify-between mb-4">
              <div className="pill-icon w-[42px] h-[42px]">
                <Tag size={18} strokeWidth={2} className="text-red-primary" />
              </div>
              <span className={`status-pill ${statusStyles[o.status]}`}>{o.status}</span>
            </div>
            <div className="text-[11px] font-semibold text-charcoal-light">{o.targetType}</div>
            <div className="font-bold text-[15px] mt-1 leading-snug">{o.targetName}</div>
            <div className="flex items-center gap-1.5 mt-3 text-red-primary font-display font-semibold text-[22px]">
              <Percent size={16} strokeWidth={2.5} /> {o.discountPercent}% off
            </div>
            <div className="text-[12px] text-charcoal-light font-medium mt-2">
              {o.startDate} — {o.endDate}
            </div>
            <div className="flex gap-1 mt-4 pt-4 border-t border-black/[.06]">
              <button className="p-1.5 rounded-lg text-charcoal-light hover:bg-grey-soft">
                <Pencil size={14} strokeWidth={2} />
              </button>
              <button onClick={() => removeOffer(o.id)} className="p-1.5 rounded-lg text-red-primary hover:bg-red-tint">
                <Trash2 size={14} strokeWidth={2} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-charcoal/50 backdrop-blur-sm z-[100] flex items-center justify-center p-5" onClick={() => setModalOpen(false)}>
          <div className="bg-white rounded-2xl shadow-modal w-full max-w-[440px] p-7" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-1">
              <h3 className="font-display font-semibold text-[19px]">Create offer</h3>
              <button onClick={() => setModalOpen(false)} className="w-[30px] h-[30px] rounded-full bg-grey-soft flex items-center justify-center text-charcoal-light">
                <X size={15} strokeWidth={2} />
              </button>
            </div>
            <p className="text-[12.5px] text-charcoal-light mb-6">Apply a limited-time discount to a product or service.</p>

            <div className="mb-4">
              <label className="block text-[11px] font-bold uppercase tracking-wide text-charcoal-light mb-1.5">Applies to</label>
              <div className="flex gap-2">
                {(["Product", "Service"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      setTargetType(t);
                      setTargetName(t === "Product" ? products[0].name : services[0].name);
                    }}
                    className={`flex-1 py-2 rounded-xl text-[13px] font-bold border-[1.5px] transition-colors ${
                      targetType === t ? "bg-red-tint border-red-primary text-red-primary" : "border-black/10 text-charcoal-light"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-[11px] font-bold uppercase tracking-wide text-charcoal-light mb-1.5">{targetType} name</label>
              <Select value={targetName} onChange={setTargetName} options={options.map((o) => ({ value: o, label: o }))} />
            </div>

            <div className="mb-4">
              <label className="block text-[11px] font-bold uppercase tracking-wide text-charcoal-light mb-1.5">Discount percentage</label>
              <input
                type="number"
                min={1}
                max={90}
                value={discount}
                onChange={(e) => setDiscount(Number(e.target.value))}
                className="w-full rounded-xl border-[1.5px] border-black/10 px-3.5 py-2.5 text-[13.5px] outline-none focus:border-red-primary"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wide text-charcoal-light mb-1.5">Start date</label>
                <DatePicker value={startDate} onChange={setStartDate} placeholder="Start date" />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wide text-charcoal-light mb-1.5">End date</label>
                <DatePicker value={endDate} onChange={setEndDate} placeholder="End date" />
              </div>
            </div>

            <div className="flex gap-2.5">
              <button onClick={() => setModalOpen(false)} className="btn-outline flex-1 justify-center">
                Cancel
              </button>
              <button onClick={createOffer} className="btn-primary flex-1 justify-center">
                Create offer
              </button>
            </div>
          </div>
        </div>
      )}
    </PageShell>
  );
}
