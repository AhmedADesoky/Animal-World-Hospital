"use client";

import { useState } from "react";
import Link from "next/link";
import {
  User,
  PawPrint,
  ClipboardList,
  Package,
  Pencil,
  Trash2,
  Plus,
  X,
  Check,
  Calendar,
  Clock,
  ChevronRight,
} from "lucide-react";
import { useClientStore, type Pet } from "@/lib/client-store";
import ProfileAvatar from "@/components/ProfileAvatar";

type Tab = "info" | "pets" | "bookings" | "orders";

const tabs: { id: Tab; label: string; icon: typeof User }[] = [
  { id: "info", label: "My details", icon: User },
  { id: "pets", label: "My pets", icon: PawPrint },
  { id: "bookings", label: "Bookings", icon: ClipboardList },
  { id: "orders", label: "Orders", icon: Package },
];

const bookingStatusStyles: Record<string, string> = {
  Upcoming: "bg-status-blueTint text-status-blue",
  Completed: "bg-status-greenTint text-status-green",
  Cancelled: "bg-red-tint text-red-primary",
};

const orderStatusStyles: Record<string, string> = {
  Placed: "bg-status-blueTint text-status-blue",
  Assigned: "bg-status-purpleTint text-status-purple",
  "In transit": "bg-status-amberTint text-status-amber",
  Delivered: "bg-status-greenTint text-status-green",
};

const emptyPetDraft = { name: "", species: "Dog", breed: "", age: "" };

export default function ProfilePage() {
  const { profile, updateProfile, pets, addPet, updatePet, removePet, bookings, orders } = useClientStore();
  const [tab, setTab] = useState<Tab>("info");

  // Profile info editing
  const [editingInfo, setEditingInfo] = useState(false);
  const [infoDraft, setInfoDraft] = useState(profile);
  const [infoSaved, setInfoSaved] = useState(false);

  const saveInfo = () => {
    updateProfile(infoDraft);
    setEditingInfo(false);
    setInfoSaved(true);
    setTimeout(() => setInfoSaved(false), 2000);
  };

  // Pet modal
  const [petModalOpen, setPetModalOpen] = useState(false);
  const [editingPetId, setEditingPetId] = useState<string | null>(null);
  const [petDraft, setPetDraft] = useState(emptyPetDraft);

  const openAddPet = () => {
    setEditingPetId(null);
    setPetDraft(emptyPetDraft);
    setPetModalOpen(true);
  };
  const openEditPet = (p: Pet) => {
    setEditingPetId(p.id);
    setPetDraft({ name: p.name, species: p.species, breed: p.breed, age: p.age });
    setPetModalOpen(true);
  };
  const savePet = () => {
    if (!petDraft.name.trim()) return;
    if (editingPetId) updatePet(editingPetId, petDraft);
    else addPet(petDraft);
    setPetModalOpen(false);
  };

  return (
    <div className="mx-auto max-w-5xl px-5 sm:px-8 py-14">
      <div className="flex items-center gap-4 mb-10">
        <ProfileAvatar size={64} />
        <div>
          <h1 className="font-display font-semibold text-2xl">{profile.name}</h1>
          <p className="text-charcoal-light text-[13.5px]">{profile.email}</p>
        </div>
      </div>

      <div className="flex gap-2 mb-8 overflow-x-auto">
        {tabs.map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-[13px] font-semibold whitespace-nowrap transition-colors ${
                tab === t.id ? "bg-red-primary text-white" : "bg-white border border-black/10 text-charcoal-light hover:border-red-primary hover:text-red-primary"
              }`}
            >
              <Icon size={14} strokeWidth={2} /> {t.label}
            </button>
          );
        })}
      </div>

      {tab === "info" && (
        <div className="surface-card p-6 sm:p-8 max-w-xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display font-semibold text-xl">My details</h2>
            {!editingInfo && (
              <button onClick={() => { setInfoDraft(profile); setEditingInfo(true); }} className="btn-outline !py-2 !px-4">
                <Pencil size={13} strokeWidth={2} /> Edit
              </button>
            )}
          </div>

          {editingInfo ? (
            <div className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wide text-charcoal-light mb-1.5">Full name</label>
                <input
                  value={infoDraft.name}
                  onChange={(e) => setInfoDraft((d) => ({ ...d, name: e.target.value }))}
                  className="w-full rounded-xl border-[1.5px] border-black/10 px-3.5 py-2.5 text-[13.5px] outline-none focus:border-red-primary"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wide text-charcoal-light mb-1.5">Email</label>
                <input
                  value={infoDraft.email}
                  onChange={(e) => setInfoDraft((d) => ({ ...d, email: e.target.value }))}
                  className="w-full rounded-xl border-[1.5px] border-black/10 px-3.5 py-2.5 text-[13.5px] outline-none focus:border-red-primary"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wide text-charcoal-light mb-1.5">Phone</label>
                <input
                  value={infoDraft.phone}
                  onChange={(e) => setInfoDraft((d) => ({ ...d, phone: e.target.value }))}
                  className="w-full rounded-xl border-[1.5px] border-black/10 px-3.5 py-2.5 text-[13.5px] outline-none focus:border-red-primary"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setEditingInfo(false)} className="btn-outline flex-1 justify-center">
                  Cancel
                </button>
                <button onClick={saveInfo} className="btn-primary flex-1 justify-center">
                  Save changes
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4 text-[14px]">
              <div className="flex justify-between border-b border-black/5 pb-3">
                <span className="text-charcoal-light">Full name</span>
                <span className="font-semibold">{profile.name}</span>
              </div>
              <div className="flex justify-between border-b border-black/5 pb-3">
                <span className="text-charcoal-light">Email</span>
                <span className="font-semibold">{profile.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-light">Phone</span>
                <span className="font-semibold">{profile.phone}</span>
              </div>
            </div>
          )}
          {infoSaved && (
            <div className="flex items-center gap-1.5 mt-4 text-[12.5px] font-semibold text-status-green">
              <Check size={13} strokeWidth={2.5} /> Saved
            </div>
          )}
        </div>
      )}

      {tab === "pets" && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display font-semibold text-xl">My pets</h2>
            <button onClick={openAddPet} className="btn-primary !py-2.5 !px-4">
              <Plus size={14} strokeWidth={2.5} /> Add pet
            </button>
          </div>
          {pets.length === 0 ? (
            <p className="text-charcoal-light text-[13.5px]">You haven&apos;t added any pets yet.</p>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {pets.map((p) => (
                <div key={p.id} className="surface-card p-5 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-red-tint flex items-center justify-center shrink-0">
                    <PawPrint size={20} strokeWidth={2} className="text-red-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-[15px]">{p.name}</div>
                    <div className="text-[13px] text-charcoal-light mt-0.5">
                      {p.species} · {p.breed} · {p.age}
                    </div>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <button onClick={() => openEditPet(p)} className="p-1.5 rounded-lg text-charcoal-light hover:bg-grey-soft">
                      <Pencil size={14} strokeWidth={2} />
                    </button>
                    <button onClick={() => removePet(p.id)} className="p-1.5 rounded-lg text-red-primary hover:bg-red-tint">
                      <Trash2 size={14} strokeWidth={2} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {tab === "bookings" && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display font-semibold text-xl">My bookings</h2>
            <Link href="/book" className="btn-primary !py-2.5 !px-4">
              <Plus size={14} strokeWidth={2.5} /> New booking
            </Link>
          </div>
          {bookings.length === 0 ? (
            <p className="text-charcoal-light text-[13.5px]">No bookings yet.</p>
          ) : (
            <div className="space-y-3">
              {bookings.map((b) => (
                <Link key={b.id} href={`/book/${b.id}`} className="surface-card p-5 flex items-center gap-4 hover:!shadow-card">
                  <div className="w-11 h-11 rounded-full bg-red-tint flex items-center justify-center shrink-0">
                    <Calendar size={17} strokeWidth={2} className="text-red-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-[14px]">{b.serviceName}</div>
                    <div className="text-[12.5px] text-charcoal-light mt-0.5 flex items-center gap-3">
                      <span>{b.petName}</span>
                      <span className="flex items-center gap-1">
                        <Clock size={11} strokeWidth={2} /> {b.date} · {b.time}
                      </span>
                    </div>
                  </div>
                  <span className={`status-pill shrink-0 ${bookingStatusStyles[b.status]}`}>{b.status}</span>
                  <ChevronRight size={16} strokeWidth={2} className="text-charcoal-light shrink-0" />
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      {tab === "orders" && (
        <div>
          <h2 className="font-display font-semibold text-xl mb-6">My orders</h2>
          {orders.length === 0 ? (
            <p className="text-charcoal-light text-[13.5px]">
              No orders yet.{" "}
              <Link href="/shop" className="text-red-primary font-semibold hover:underline">
                Visit the shop
              </Link>
              .
            </p>
          ) : (
            <div className="space-y-3">
              {orders.map((o) => (
                <Link key={o.id} href={`/profile/orders/${o.id}`} className="surface-card p-5 flex items-center gap-4 hover:!shadow-card">
                  <div className="w-11 h-11 rounded-full bg-red-tint flex items-center justify-center shrink-0">
                    <Package size={17} strokeWidth={2} className="text-red-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-[14px]">{o.id}</div>
                    <div className="text-[12.5px] text-charcoal-light mt-0.5">{o.items.length} items · {o.total} EGP · {o.createdAt}</div>
                  </div>
                  <span className={`status-pill shrink-0 ${orderStatusStyles[o.status]}`}>{o.status}</span>
                  <ChevronRight size={16} strokeWidth={2} className="text-charcoal-light shrink-0" />
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      {petModalOpen && (
        <div className="fixed inset-0 bg-charcoal/50 backdrop-blur-sm z-[100] flex items-center justify-center p-5" onClick={() => setPetModalOpen(false)}>
          <div className="bg-white rounded-2xl shadow-modal w-full max-w-[420px] p-7" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-6">
              <h3 className="font-display font-semibold text-[19px]">{editingPetId ? "Edit pet" : "Add pet"}</h3>
              <button onClick={() => setPetModalOpen(false)} className="w-[30px] h-[30px] rounded-full bg-grey-soft flex items-center justify-center text-charcoal-light">
                <X size={15} strokeWidth={2} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wide text-charcoal-light mb-1.5">Pet name</label>
                <input
                  value={petDraft.name}
                  onChange={(e) => setPetDraft((d) => ({ ...d, name: e.target.value }))}
                  placeholder="e.g. Max"
                  className="w-full rounded-xl border-[1.5px] border-black/10 px-3.5 py-2.5 text-[13.5px] outline-none focus:border-red-primary"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wide text-charcoal-light mb-1.5">Species</label>
                  <select
                    value={petDraft.species}
                    onChange={(e) => setPetDraft((d) => ({ ...d, species: e.target.value }))}
                    className="w-full rounded-xl border-[1.5px] border-black/10 px-3.5 py-2.5 text-[13.5px] outline-none focus:border-red-primary bg-white"
                  >
                    <option>Dog</option>
                    <option>Cat</option>
                    <option>Bird</option>
                    <option>Rabbit</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wide text-charcoal-light mb-1.5">Age</label>
                  <input
                    value={petDraft.age}
                    onChange={(e) => setPetDraft((d) => ({ ...d, age: e.target.value }))}
                    placeholder="e.g. 2 years"
                    className="w-full rounded-xl border-[1.5px] border-black/10 px-3.5 py-2.5 text-[13.5px] outline-none focus:border-red-primary"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wide text-charcoal-light mb-1.5">Breed</label>
                <input
                  value={petDraft.breed}
                  onChange={(e) => setPetDraft((d) => ({ ...d, breed: e.target.value }))}
                  placeholder="e.g. Golden Retriever"
                  className="w-full rounded-xl border-[1.5px] border-black/10 px-3.5 py-2.5 text-[13.5px] outline-none focus:border-red-primary"
                />
              </div>
            </div>
            <div className="flex gap-2.5 mt-7">
              <button onClick={() => setPetModalOpen(false)} className="btn-outline flex-1 justify-center">
                Cancel
              </button>
              <button onClick={savePet} className="btn-primary flex-1 justify-center">
                {editingPetId ? "Save changes" : "Add pet"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
