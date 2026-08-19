import { bookings, type Booking } from "./mock-data";

function nameToken(vet: string) {
  return vet.replace(/^Dr\.\s*/i, "").split(" ")[0].toLowerCase();
}

export function assignedBookings(employeeName: string): Booking[] {
  const token = nameToken(employeeName);
  return bookings.filter((b) => b.vet && b.vet.toLowerCase().includes(token));
}

export function bookingStats(employeeName: string) {
  const list = assignedBookings(employeeName);
  return {
    total: list.length,
    confirmed: list.filter((b) => b.status === "Confirmed").length,
    pending: list.filter((b) => b.status === "Pending").length,
    upcoming: list.filter((b) => b.status === "Upcoming").length,
    cancelled: list.filter((b) => b.status === "Cancelled").length,
    list,
  };
}
