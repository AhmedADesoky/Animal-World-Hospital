"use client";

import { createContext, useContext, useState } from "react";
import { initialDrivers, type Driver } from "./mock-data";

type DriversContextValue = {
  drivers: Driver[];
  addDriver: (driver: Omit<Driver, "id">) => void;
  updateDriver: (id: string, patch: Partial<Driver>) => void;
  removeDriver: (id: string) => void;
};

const DriversContext = createContext<DriversContextValue | null>(null);

export function DriversProvider({ children }: { children: React.ReactNode }) {
  const [drivers, setDrivers] = useState<Driver[]>(initialDrivers);

  const addDriver = (driver: Omit<Driver, "id">) => {
    setDrivers((prev) => [{ id: `d${Date.now()}`, ...driver }, ...prev]);
  };

  const updateDriver = (id: string, patch: Partial<Driver>) => {
    setDrivers((prev) => prev.map((d) => (d.id === id ? { ...d, ...patch } : d)));
  };

  const removeDriver = (id: string) => setDrivers((prev) => prev.filter((d) => d.id !== id));

  return (
    <DriversContext.Provider value={{ drivers, addDriver, updateDriver, removeDriver }}>
      {children}
    </DriversContext.Provider>
  );
}

export function useDrivers() {
  const ctx = useContext(DriversContext);
  if (!ctx) throw new Error("useDrivers must be used within DriversProvider");
  return ctx;
}
