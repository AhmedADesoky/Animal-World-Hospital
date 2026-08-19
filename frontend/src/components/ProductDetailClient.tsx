"use client";

import { useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Minus, Plus, ShoppingCart, Check, ShieldCheck, Truck } from "lucide-react";
import { products } from "@/lib/mock-data";
import { useCart } from "@/lib/cart-context";
import ReviewSection from "@/components/ReviewSection";
import ProductCard from "@/components/ProductCard";

export default function ProductDetailClient({ slug }: { slug: string }) {
  const product = products.find((p) => p.slug === slug);
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return notFound();

  const related = products.filter((p) => p.slug !== product.slug && p.category === product.category).slice(0, 3);

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8 py-10">
      <Link href="/shop" className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-charcoal-light hover:text-red-primary mb-6 transition-colors">
        <ArrowLeft size={14} strokeWidth={2} /> Back to shop
      </Link>

      <div className="grid md:grid-cols-2 gap-10">
        <div className="h-80 sm:h-[420px] rounded-2xl bg-cover bg-center bg-grey-soft shadow-card" style={{ backgroundImage: `url(${product.image})` }} />

        <div>
          <span className="text-[11px] font-bold tracking-[.14em] uppercase text-red-primary">{product.category}</span>
          <h1 className="font-display font-semibold text-3xl mt-2">{product.name}</h1>

          <div className="flex items-baseline gap-3 mt-4">
            <span className="font-display font-semibold text-2xl text-red-primary">{product.price} EGP</span>
            {product.oldPrice && <span className="text-charcoal-light line-through text-[15px]">{product.oldPrice} EGP</span>}
          </div>

          <p className="text-charcoal-light mt-5 leading-relaxed text-[14.5px]">
            {product.description ?? "A quality product carefully selected for your pet's health and happiness."}
          </p>

          <div className="flex items-center gap-4 mt-6">
            <span className={`text-[13px] font-semibold ${product.stock <= 5 ? "text-red-primary" : "text-status-green"}`}>
              {product.stock <= 5 ? `Only ${product.stock} left in stock` : "In stock"}
            </span>
          </div>

          <div className="flex items-center gap-4 mt-6">
            <div className="flex items-center gap-3 rounded-full border border-black/10 px-3 py-2">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-grey-soft">
                <Minus size={13} strokeWidth={2.5} />
              </button>
              <span className="w-6 text-center font-bold text-[14px]">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-grey-soft">
                <Plus size={13} strokeWidth={2.5} />
              </button>
            </div>
            <button onClick={handleAdd} className={`btn-primary flex-1 justify-center ${added ? "!bg-status-green" : ""}`}>
              {added ? (
                <>
                  <Check size={16} strokeWidth={2.5} /> Added to cart
                </>
              ) : (
                <>
                  <ShoppingCart size={16} strokeWidth={2} /> Add to cart
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-8">
            <div className="flex items-center gap-2.5 text-[12.5px] text-charcoal-light">
              <Truck size={16} strokeWidth={2} className="text-red-primary shrink-0" /> Delivered to your door
            </div>
            <div className="flex items-center gap-2.5 text-[12.5px] text-charcoal-light">
              <ShieldCheck size={16} strokeWidth={2} className="text-red-primary shrink-0" /> Vet-approved quality
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="font-display font-semibold text-2xl mb-6">You may also like</h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      )}

      <div className="mt-16 pt-10 border-t border-black/5">
        <ReviewSection targetSlug={product.slug} />
      </div>
    </div>
  );
}
