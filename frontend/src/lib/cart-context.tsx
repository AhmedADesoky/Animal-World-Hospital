"use client";

import { createContext, useContext, useState } from "react";
import type { Product } from "./mock-data";

export type CartItem = { slug: string; name: string; price: number; image: string; qty: number };

type CartContextValue = {
  items: CartItem[];
  addItem: (product: Product) => void;
  updateQty: (slug: string, qty: number) => void;
  removeItem: (slug: string) => void;
  clear: () => void;
  count: number;
  total: number;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (product: Product) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.slug === product.slug);
      if (existing) {
        return prev.map((i) => (i.slug === product.slug ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { slug: product.slug, name: product.name, price: product.price, image: product.image, qty: 1 }];
    });
  };

  const updateQty = (slug: string, qty: number) => {
    if (qty <= 0) {
      removeItem(slug);
      return;
    }
    setItems((prev) => prev.map((i) => (i.slug === slug ? { ...i, qty } : i)));
  };

  const removeItem = (slug: string) => setItems((prev) => prev.filter((i) => i.slug !== slug));
  const clear = () => setItems([]);

  const count = items.reduce((n, i) => n + i.qty, 0);
  const total = items.reduce((n, i) => n + i.qty * i.price, 0);

  return (
    <CartContext.Provider value={{ items, addItem, updateQty, removeItem, clear, count, total }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
