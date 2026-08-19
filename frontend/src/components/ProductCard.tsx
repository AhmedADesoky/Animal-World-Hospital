"use client";

import Link from "next/link";
import { Check, Plus } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/lib/mock-data";
import { useCart } from "@/lib/cart-context";

export default function ProductCard({ product }: { product: Product }) {
  const lowStock = product.stock <= 5;
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div className="surface-card overflow-hidden">
      <Link href={`/shop/${product.slug}`} className="h-44 bg-cover bg-center relative bg-grey-soft block" style={{ backgroundImage: `url(${product.image})` }}>
        <span
          className={`absolute top-3 right-3 text-[10px] font-extrabold px-2.5 py-1 rounded-full ${
            lowStock ? "bg-red-primary text-white" : "bg-charcoal/80 text-white"
          }`}
        >
          {lowStock ? "Low stock" : "In stock"}
        </span>
      </Link>
      <div className="p-4">
        <div className="text-[11px] font-semibold text-charcoal-light">{product.category}</div>
        <Link href={`/shop/${product.slug}`}>
          <h3 className="font-semibold text-[14px] mt-1 leading-snug hover:text-red-primary transition-colors">{product.name}</h3>
        </Link>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-black/5">
          <div className="flex items-baseline gap-2">
            <span className="font-display font-semibold text-[16px]">{product.price} EGP</span>
            {product.oldPrice && (
              <span className="text-[11px] text-charcoal-light line-through">{product.oldPrice} EGP</span>
            )}
          </div>
          <button
            onClick={handleAdd}
            aria-label={`Add ${product.name} to cart`}
            className={`w-9 h-9 rounded-full !p-0 flex items-center justify-center transition-colors ${
              added ? "bg-status-green text-white" : "btn-primary"
            }`}
          >
            {added ? <Check size={15} strokeWidth={2.5} /> : <Plus size={16} strokeWidth={2.5} />}
          </button>
        </div>
      </div>
    </div>
  );
}
