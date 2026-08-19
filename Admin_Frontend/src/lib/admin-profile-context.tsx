"use client";

import { createContext, useContext, useState } from "react";

export type AdminProfile = { name: string; email: string; phone: string; role: string; avatar: string };

const defaultProfile: AdminProfile = {
  name: "Dr. Mostafa Ali",
  email: "mostafa@awh.com",
  phone: "+20 100 123 4567",
  role: "Owner",
  avatar: "",
};

type Ctx = { profile: AdminProfile; updateProfile: (patch: Partial<AdminProfile>) => void };

const AdminProfileContext = createContext<Ctx | null>(null);

export function AdminProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<AdminProfile>(defaultProfile);
  const updateProfile = (patch: Partial<AdminProfile>) => setProfile((p) => ({ ...p, ...patch }));
  return <AdminProfileContext.Provider value={{ profile, updateProfile }}>{children}</AdminProfileContext.Provider>;
}

export function useAdminProfile() {
  const ctx = useContext(AdminProfileContext);
  if (!ctx) throw new Error("useAdminProfile must be used within AdminProfileProvider");
  return ctx;
}
