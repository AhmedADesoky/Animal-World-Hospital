"use client";

import { useState } from "react";
import Link from "next/link";
import { Minus, Plus, Trash2, ArrowRight, ArrowLeft, CheckCircle2, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useClientStore, type GeoLocation } from "@/lib/client-store";
import LocationCapture from "@/components/LocationCapture";

type Step = "cart" | "location" | "confirmed";

export default function OrderPage() {
  const { items, updateQty, removeItem, total, clear } = useCart();
  const { addOrder } = useClientStore();
  const [step, setStep] = useState<Step>("cart");
  const [location, setLocation] = useState<GeoLocation | null>(null);
  const [addressLine, setAddressLine] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [orderId, setOrderId] = useState("");

  const submit = () => {
    if (!addressLine || !city || !phone || !location) return;
    const order = addOrder({ items, total, location, addressLine, city, phone, notes });
    setOrderId(order.id);
    setStep("confirmed");
    clear();
  };

  if (step === "confirmed") {
    return (
      <div className="mx-auto max-w-lg px-5 py-24 text-center">
        <div className="w-16 h-16 rounded-full bg-status-greenTint flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={30} strokeWidth={2} className="text-status-green" />
        </div>
        <h1 className="font-display font-semibold text-3xl">Order placed</h1>
        <p className="text-charcoal-light mt-3">
          Your order <span className="font-semibold text-charcoal">{orderId}</span> has been received. A driver will be
          assigned shortly and you&apos;ll get a WhatsApp update.
        </p>
        <div className="flex gap-3 justify-center mt-8">
          <Link href={`/profile/orders/detail?id=${orderId}`} className="btn-primary">
            View order
          </Link>
          <Link href="/shop" className="btn-outline">
            Continue shopping
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0 && step === "cart") {
    return (
      <div className="mx-auto max-w-lg px-5 py-24 text-center">
        <ShoppingBag size={40} strokeWidth={1.5} className="mx-auto mb-4 text-charcoal-light" />
        <h1 className="font-display font-semibold text-2xl">Your cart is empty</h1>
        <p className="text-charcoal-light mt-2">Add some products from the shop to get started.</p>
        <Link href="/shop" className="btn-primary inline-flex mt-8">
          Go to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-5 sm:px-8 py-14">
      <div className="flex items-center gap-3 mb-10 justify-center">
        {(["cart", "location"] as Step[]).map((s, i) => (
          <div key={s} className="flex items-center gap-3">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold ${
                step === s ? "bg-red-primary text-white" : "bg-red-tint text-red-primary"
              }`}
            >
              {i + 1}
            </div>
            <span className={`text-[13px] font-semibold ${step === s ? "text-charcoal" : "text-charcoal-light"}`}>
              {s === "cart" ? "Your order" : "Delivery Location"}
            </span>
            {i === 0 && <div className="w-10 h-px bg-black/10 mx-1" />}
          </div>
        ))}
      </div>

      {step === "cart" && (
        <div className="surface-card p-6 sm:p-8">
          <h2 className="font-display font-semibold text-xl mb-6">Your order</h2>
          <div className="space-y-4">
            {items.map((it) => (
              <div key={it.slug} className="flex items-center gap-4 pb-4 border-b border-black/5 last:border-0 last:pb-0">
                <div className="w-16 h-16 rounded-xl bg-cover bg-center shrink-0 bg-grey-soft" style={{ backgroundImage: `url(${it.image})` }} />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-[14px] truncate">{it.name}</div>
                  <div className="text-[13px] text-charcoal-light mt-0.5">{it.price} EGP</div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => updateQty(it.slug, it.qty - 1)} className="w-7 h-7 rounded-full border border-black/10 flex items-center justify-center hover:border-red-primary hover:text-red-primary">
                    <Minus size={12} strokeWidth={2.5} />
                  </button>
                  <span className="w-6 text-center text-[13px] font-bold">{it.qty}</span>
                  <button onClick={() => updateQty(it.slug, it.qty + 1)} className="w-7 h-7 rounded-full border border-black/10 flex items-center justify-center hover:border-red-primary hover:text-red-primary">
                    <Plus size={12} strokeWidth={2.5} />
                  </button>
                </div>
                <div className="w-20 text-right font-semibold text-[14px]">{it.qty * it.price} EGP</div>
                <button onClick={() => removeItem(it.slug)} className="text-red-primary p-1.5 rounded-lg hover:bg-red-tint">
                  <Trash2 size={14} strokeWidth={2} />
                </button>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between mt-6 pt-6 border-t border-black/5">
            <span className="text-[15px] font-semibold text-charcoal-light">Total</span>
            <span className="font-display font-semibold text-2xl text-red-primary">{total} EGP</span>
          </div>
          <button onClick={() => setStep("location")} className="btn-primary w-full justify-center mt-8">
            Continue to delivery location <ArrowRight size={15} strokeWidth={2} />
          </button>
        </div>
      )}

      {step === "location" && (
        <div className="surface-card p-6 sm:p-8">
          <h2 className="font-display font-semibold text-xl mb-2">Delivery Location</h2>
          <p className="text-[13.5px] text-charcoal-light mb-5">Share your current location so we can deliver to you accurately, then confirm your details.</p>
          <LocationCapture location={location} onChange={setLocation} />

          <div className="grid sm:grid-cols-2 gap-4 mt-6">
            <div className="sm:col-span-2">
              <label className="block text-[11px] font-bold uppercase tracking-wide text-charcoal-light mb-1.5">Address (street, building, apt)</label>
              <input
                value={addressLine}
                onChange={(e) => setAddressLine(e.target.value)}
                placeholder="e.g. 12 El-Nasr St, Building 4, Apt 7"
                className="w-full rounded-xl border-[1.5px] border-black/10 px-3.5 py-2.5 text-[13.5px] outline-none focus:border-red-primary"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wide text-charcoal-light mb-1.5">City / area</label>
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. Cairo, Nasr City"
                className="w-full rounded-xl border-[1.5px] border-black/10 px-3.5 py-2.5 text-[13.5px] outline-none focus:border-red-primary"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wide text-charcoal-light mb-1.5">WhatsApp number</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+20 1xx xxx xxxx"
                className="w-full rounded-xl border-[1.5px] border-black/10 px-3.5 py-2.5 text-[13.5px] outline-none focus:border-red-primary"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-[11px] font-bold uppercase tracking-wide text-charcoal-light mb-1.5">Delivery notes (optional)</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="e.g. Ring the bell twice, leave with doorman…"
                className="w-full rounded-xl border-[1.5px] border-black/10 px-3.5 py-2.5 text-[13.5px] outline-none focus:border-red-primary resize-none"
              />
            </div>
          </div>

          <div className="flex gap-3 mt-8">
            <button onClick={() => setStep("cart")} className="btn-outline flex-1 justify-center">
              <ArrowLeft size={15} strokeWidth={2} /> Back
            </button>
            <button
              onClick={submit}
              disabled={!location || !addressLine || !city || !phone}
              className="btn-primary flex-1 justify-center disabled:opacity-40 disabled:pointer-events-none"
            >
              Place order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
