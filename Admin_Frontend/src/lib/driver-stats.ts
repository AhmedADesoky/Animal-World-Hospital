import { deliveries, type ClientOrder } from "./mock-data";

export function deliveredCount(name: string, orders: ClientOrder[]) {
  const fromOrders = orders.filter((o) => o.driver === name && o.status === "Delivered").length;
  const fromDeliveries = deliveries.filter((d) => d.driver === name && d.status === "Delivered").length;
  return fromOrders + fromDeliveries;
}

export function activeCount(name: string, orders: ClientOrder[]) {
  const fromOrders = orders.filter((o) => o.driver === name && (o.status === "Assigned" || o.status === "In transit")).length;
  const fromDeliveries = deliveries.filter((d) => d.driver === name && d.status === "In transit").length;
  return fromOrders + fromDeliveries;
}
