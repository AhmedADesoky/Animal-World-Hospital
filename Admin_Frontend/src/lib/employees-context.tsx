"use client";

import { createContext, useContext, useState } from "react";
import { employees as initialEmployees, type Employee } from "./mock-data";

type EmployeesContextValue = {
  employees: Employee[];
  addEmployee: (employee: Omit<Employee, "id">) => void;
  updateEmployee: (id: string, patch: Partial<Employee>) => void;
  removeEmployee: (id: string) => void;
};

const EmployeesContext = createContext<EmployeesContextValue | null>(null);

export function EmployeesProvider({ children }: { children: React.ReactNode }) {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);

  const addEmployee = (employee: Omit<Employee, "id">) => {
    setEmployees((prev) => [{ id: `e${Date.now()}`, ...employee }, ...prev]);
  };
  const updateEmployee = (id: string, patch: Partial<Employee>) => {
    setEmployees((prev) => prev.map((e) => (e.id === id ? { ...e, ...patch } : e)));
  };
  const removeEmployee = (id: string) => setEmployees((prev) => prev.filter((e) => e.id !== id));

  return (
    <EmployeesContext.Provider value={{ employees, addEmployee, updateEmployee, removeEmployee }}>
      {children}
    </EmployeesContext.Provider>
  );
}

export function useEmployees() {
  const ctx = useContext(EmployeesContext);
  if (!ctx) throw new Error("useEmployees must be used within EmployeesProvider");
  return ctx;
}
