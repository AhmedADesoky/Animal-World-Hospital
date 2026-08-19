"use client";

import { createContext, useContext, useState } from "react";
import { clientOrders as initialOrders, type ClientOrder } from "./mock-data";

type OrdersContextValue = {
  orders: ClientOrder[];
  updateOrder: (id: string, patch: Partial<ClientOrder>) => void;
};

const OrdersContext = createContext<OrdersContextValue | null>(null);

export function OrdersProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<ClientOrder[]>(initialOrders);

  const updateOrder = (id: string, patch: Partial<ClientOrder>) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, ...patch } : o)));
  };

  return <OrdersContext.Provider value={{ orders, updateOrder }}>{children}</OrdersContext.Provider>;
}

export function useOrders() {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error("useOrders must be used within OrdersProvider");
  return ctx;
}
