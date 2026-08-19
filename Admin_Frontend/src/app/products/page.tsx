"use client";

import { useRef, useState } from "react";
import { Pencil, Trash2, Plus, X, ImagePlus } from "lucide-react";
import PageShell from "@/components/PageShell";
import Select from "@/components/ui/Select";
import { products as initialProducts, type Product } from "@/lib/mock-data";

const emptyDraft: Omit<Product, "id"> = {
  name: "",
  category: "Dog food",
  price: 0,
  stock: 0,
  active: true,
  image: "",
};

const categoryOptions = ["Dog food", "Cat food", "Medication", "Accessories"].map((c) => ({ value: c, label: c }));

export default function ProductsPage() {
  const [products, setProducts] = useState(initialProducts);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState(emptyDraft);
  const fileRef = useRef<HTMLInputElement>(null);

  const openCreate = () => {
    setEditingId(null);
    setDraft(emptyDraft);
    setModalOpen(true);
  };

  const openEdit = (p: Product) => {
    setEditingId(p.id);
    setDraft({ name: p.name, category: p.category, price: p.price, oldPrice: p.oldPrice, stock: p.stock, active: p.active, image: p.image });
    setModalOpen(true);
  };

  const removeProduct = (id: string) => setProducts((prev) => prev.filter((p) => p.id !== id));

  const handleFile = (file: File | undefined) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setDraft((d) => ({ ...d, image: url }));
  };

  const save = () => {
    if (!draft.name.trim()) return;
    if (editingId) {
      setProducts((prev) => prev.map((p) => (p.id === editingId ? { ...p, ...draft } : p)));
    } else {
      setProducts((prev) => [{ id: `p${Date.now()}`, ...draft }, ...prev]);
    }
    setModalOpen(false);
  };

  return (
    <PageShell title="Products" subtitle="Manage your product catalog" actionLabel="Add product" onAction={openCreate}>
      <div className="flex items-center justify-between mb-5">
        <span className="text-[12.5px] text-charcoal-light font-semibold">{products.length} products total · {products.filter((p) => p.active).length} active</span>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((p) => (
          <div key={p.id} className="surface-card overflow-hidden">
            <div className="h-[140px] bg-cover bg-center relative bg-grey-soft" style={{ backgroundImage: `url(${p.image})` }}>
              <span
                className={`absolute top-2.5 right-2.5 text-[10px] font-extrabold px-2.5 py-1 rounded-full ${
                  p.active ? "bg-status-green text-white" : "bg-charcoal/70 text-white"
                }`}
              >
                {p.active ? "Active" : "Inactive"}
              </span>
            </div>
            <div className="p-4">
              <div className="font-bold text-[14px] leading-snug">{p.name}</div>
              <div className="text-[11px] text-charcoal-light font-semibold mt-1">{p.category}</div>
              <div className={`text-[11.5px] font-semibold mt-1 ${p.stock <= 5 ? "text-red-primary" : "text-charcoal-light"}`}>
                Stock: {p.stock} units{p.stock <= 5 && " — low"}
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-black/[.06]">
                <div className="flex items-baseline gap-2">
                  <span className="font-display font-semibold text-[16.5px]">{p.price} EGP</span>
                  {p.oldPrice ? <span className="text-[11px] text-charcoal-light line-through">{p.oldPrice} EGP</span> : null}
                </div>
                <div className="flex gap-1">
                  <button onClick={() => openEdit(p)} className="p-1.5 rounded-lg text-charcoal-light hover:bg-grey-soft">
                    <Pencil size={14} strokeWidth={2} />
                  </button>
                  <button onClick={() => removeProduct(p.id)} className="p-1.5 rounded-lg text-red-primary hover:bg-red-tint">
                    <Trash2 size={14} strokeWidth={2} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        <button
          onClick={openCreate}
          className="rounded-2xl border-2 border-dashed border-black/10 flex items-center justify-center min-h-[236px] text-charcoal-light hover:border-red-primary hover:bg-red-tint hover:text-red-primary transition-colors"
        >
          <div className="text-center">
            <Plus size={28} strokeWidth={1.5} className="mx-auto mb-1.5" />
            <div className="text-[13.5px] font-bold">Add new product</div>
          </div>
        </button>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-charcoal/50 backdrop-blur-sm z-[100] flex items-center justify-center p-5" onClick={() => setModalOpen(false)}>
          <div className="bg-white rounded-2xl shadow-modal w-full max-w-[460px] p-7 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-1">
              <h3 className="font-display font-semibold text-[19px]">{editingId ? "Edit product" : "Add product"}</h3>
              <button onClick={() => setModalOpen(false)} className="w-[30px] h-[30px] rounded-full bg-grey-soft flex items-center justify-center text-charcoal-light">
                <X size={15} strokeWidth={2} />
              </button>
            </div>
            <p className="text-[12.5px] text-charcoal-light mb-6">Fill in the details below. It&apos;ll be visible to clients once activated.</p>

            <div className="mb-4">
              <label className="block text-[11px] font-bold uppercase tracking-wide text-charcoal-light mb-1.5">Product image</label>
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
              <label className="block text-[11px] font-bold uppercase tracking-wide text-charcoal-light mb-1.5">Product name</label>
              <input
                value={draft.name}
                onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
                placeholder="e.g. Royal Canin Adult Dog 3kg"
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
                <label className="block text-[11px] font-bold uppercase tracking-wide text-charcoal-light mb-1.5">Old price (optional)</label>
                <input
                  type="number"
                  value={draft.oldPrice ?? ""}
                  onChange={(e) => setDraft((d) => ({ ...d, oldPrice: e.target.value ? Number(e.target.value) : undefined }))}
                  className="w-full rounded-xl border-[1.5px] border-black/10 px-3.5 py-2.5 text-[13.5px] outline-none focus:border-red-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wide text-charcoal-light mb-1.5">Stock quantity</label>
                <input
                  type="number"
                  value={draft.stock}
                  onChange={(e) => setDraft((d) => ({ ...d, stock: Number(e.target.value) }))}
                  className="w-full rounded-xl border-[1.5px] border-black/10 px-3.5 py-2.5 text-[13.5px] outline-none focus:border-red-primary"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wide text-charcoal-light mb-1.5">Category</label>
                <Select
                  value={draft.category}
                  onChange={(v) => setDraft((d) => ({ ...d, category: v as Product["category"] }))}
                  options={categoryOptions}
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-[11px] font-bold uppercase tracking-wide text-charcoal-light mb-1.5">Status</label>
              <Select
                value={draft.active ? "Active" : "Inactive"}
                onChange={(v) => setDraft((d) => ({ ...d, active: v === "Active" }))}
                options={[
                  { value: "Active", label: "Active" },
                  { value: "Inactive", label: "Inactive" },
                ]}
              />
            </div>

            <div className="flex gap-2.5">
              <button onClick={() => setModalOpen(false)} className="btn-outline flex-1 justify-center">
                Cancel
              </button>
              <button onClick={save} className="btn-primary flex-1 justify-center">
                {editingId ? "Save changes" : "Add product"}
              </button>
            </div>
          </div>
        </div>
      )}
    </PageShell>
  );
}
