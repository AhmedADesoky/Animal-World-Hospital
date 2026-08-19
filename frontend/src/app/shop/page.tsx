"use client";

import { useMemo, useState } from "react";
import { products } from "@/lib/mock-data";
import ProductCard from "@/components/ProductCard";

const categories = ["All", "Dog food", "Cat food", "Medication", "Accessories", "Toys"] as const;

export default function ShopPage() {
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () =>
      products.filter(
        (p) =>
          (category === "All" || p.category === category) &&
          p.name.toLowerCase().includes(query.toLowerCase())
      ),
    [category, query]
  );

  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16">
      <div className="mb-10">
        <span className="text-[11px] font-bold tracking-[.14em] uppercase text-red-primary">Shop</span>
        <h1 className="font-display font-semibold text-4xl mt-2">Everything your pet needs</h1>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products…"
          className="flex-1 rounded-full border border-black/10 px-5 py-3 text-sm outline-none focus:border-red-primary transition-colors"
        />
      </div>

      <div className="flex gap-2 flex-wrap mb-10">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`px-4 py-2 rounded-full text-[13px] font-semibold border transition-colors ${
              category === c
                ? "bg-red-primary text-white border-red-primary"
                : "bg-white text-charcoal-light border-black/10 hover:border-red-primary hover:text-red-primary"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-charcoal-light py-20">No products match your search.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
