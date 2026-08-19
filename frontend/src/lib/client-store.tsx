"use client";

import { createContext, useContext, useState } from "react";
import type { CartItem } from "./cart-context";

// ---------- Profile ----------
export type Profile = { name: string; email: string; phone: string; avatar: string };

const defaultProfile: Profile = { name: "Ahmed Sayed", email: "ahmed.sayed@example.com", phone: "+20 100 000 0000", avatar: "" };

// ---------- Pets ----------
export type Pet = { id: string; name: string; species: string; breed: string; age: string };

const defaultPets: Pet[] = [
  { id: "pet1", name: "Max", species: "Dog", breed: "Golden Retriever", age: "3 years" },
  { id: "pet2", name: "Luna", species: "Cat", breed: "British Shorthair", age: "1 year" },
];

// ---------- Bookings ----------
export type Booking = {
  id: string;
  serviceSlug: string;
  serviceName: string;
  petName: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  status: "Upcoming" | "Completed" | "Cancelled";
  notes: string;
};

const defaultBookings: Booking[] = [
  {
    id: "BK-2201",
    serviceSlug: "medical-consultation",
    serviceName: "Medical Consultation",
    petName: "Max",
    date: "2026-08-24",
    time: "10:30",
    status: "Upcoming",
    notes: "",
  },
  {
    id: "BK-2188",
    serviceSlug: "grooming-session",
    serviceName: "Grooming Session",
    petName: "Luna",
    date: "2026-08-05",
    time: "13:00",
    status: "Completed",
    notes: "",
  },
];

// ---------- Client orders ----------
export type GeoLocation = { lat: number; lng: number; accuracy: number };

export type ClientOrder = {
  id: string;
  items: CartItem[];
  total: number;
  location: GeoLocation | null;
  addressLine: string;
  city: string;
  phone: string;
  notes: string;
  status: "Placed" | "Assigned" | "In transit" | "Delivered";
  createdAt: string;
};

// ---------- Reviews ----------
export type Review = { id: string; targetSlug: string; author: string; rating: number; comment: string; date: string };

const defaultReviews: Review[] = [
  { id: "r1", targetSlug: "royal-canin-dry-2kg", author: "Sara Hassan", rating: 5, comment: "My dog loves this food, great quality!", date: "Aug 2, 2026" },
  { id: "r2", targetSlug: "medical-consultation", author: "Karim Ali", rating: 5, comment: "Very thorough and the vet explained everything clearly.", date: "Jul 28, 2026" },
];

type ClientStoreValue = {
  profile: Profile;
  updateProfile: (patch: Partial<Profile>) => void;

  pets: Pet[];
  addPet: (pet: Omit<Pet, "id">) => void;
  updatePet: (id: string, patch: Partial<Pet>) => void;
  removePet: (id: string) => void;

  bookings: Booking[];
  addBooking: (booking: Omit<Booking, "id" | "status">) => Booking;
  updateBooking: (id: string, patch: Partial<Booking>) => void;
  cancelBooking: (id: string) => void;

  orders: ClientOrder[];
  addOrder: (order: Omit<ClientOrder, "id" | "status" | "createdAt">) => ClientOrder;

  reviews: Review[];
  addReview: (review: Omit<Review, "id" | "date">) => void;
  reviewsFor: (slug: string) => Review[];

  chatbotOpen: boolean;
  setChatbotOpen: (v: boolean) => void;
};

const ClientStoreContext = createContext<ClientStoreValue | null>(null);

export function ClientStoreProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<Profile>(defaultProfile);
  const [pets, setPets] = useState<Pet[]>(defaultPets);
  const [bookings, setBookings] = useState<Booking[]>(defaultBookings);
  const [orders, setOrders] = useState<ClientOrder[]>([]);
  const [reviews, setReviews] = useState<Review[]>(defaultReviews);
  const [chatbotOpen, setChatbotOpen] = useState(false);

  const updateProfile = (patch: Partial<Profile>) => setProfile((p) => ({ ...p, ...patch }));

  const addPet = (pet: Omit<Pet, "id">) => setPets((prev) => [...prev, { id: `pet${Date.now()}`, ...pet }]);
  const updatePet = (id: string, patch: Partial<Pet>) => setPets((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  const removePet = (id: string) => setPets((prev) => prev.filter((p) => p.id !== id));

  const addBooking = (booking: Omit<Booking, "id" | "status">) => {
    const newBooking: Booking = { id: `BK-${Math.floor(1000 + Math.random() * 9000)}`, status: "Upcoming", ...booking };
    setBookings((prev) => [newBooking, ...prev]);
    return newBooking;
  };
  const updateBooking = (id: string, patch: Partial<Booking>) =>
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, ...patch } : b)));
  const cancelBooking = (id: string) => updateBooking(id, { status: "Cancelled" });

  const addOrder = (order: Omit<ClientOrder, "id" | "status" | "createdAt">) => {
    const newOrder: ClientOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      status: "Placed",
      createdAt: new Date().toLocaleString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }),
      ...order,
    };
    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const addReview = (review: Omit<Review, "id" | "date">) =>
    setReviews((prev) => [
      { id: `rev${Date.now()}`, date: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }), ...review },
      ...prev,
    ]);
  const reviewsFor = (slug: string) => reviews.filter((r) => r.targetSlug === slug);

  return (
    <ClientStoreContext.Provider
      value={{
        profile,
        updateProfile,
        pets,
        addPet,
        updatePet,
        removePet,
        bookings,
        addBooking,
        updateBooking,
        cancelBooking,
        orders,
        addOrder,
        reviews,
        addReview,
        reviewsFor,
        chatbotOpen,
        setChatbotOpen,
      }}
    >
      {children}
    </ClientStoreContext.Provider>
  );
}

export function useClientStore() {
  const ctx = useContext(ClientStoreContext);
  if (!ctx) throw new Error("useClientStore must be used within ClientStoreProvider");
  return ctx;
}
