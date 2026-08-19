"use client";

import { useState } from "react";
import Link from "next/link";
import { Pencil, Trash2, X, ChevronRight } from "lucide-react";
import PageShell from "@/components/PageShell";
import StatusPill from "@/components/StatusPill";
import Select from "@/components/ui/Select";
import { useEmployees } from "@/lib/employees-context";
import { type Employee } from "@/lib/mock-data";

const emptyDraft: Omit<Employee, "id"> = { name: "", email: "", role: "Staff", department: "", permissions: "", status: "Active" };

const roleOptions = ["Owner", "Manager", "Staff", "Vet"].map((r) => ({ value: r, label: r }));
const statusOptions = [
  { value: "Active", label: "Active" },
  { value: "On leave", label: "On leave" },
];

export default function EmployeesPage() {
  const { employees, addEmployee, updateEmployee, removeEmployee } = useEmployees();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState(emptyDraft);

  const openCreate = () => {
    setEditingId(null);
    setDraft(emptyDraft);
    setModalOpen(true);
  };
  const openEdit = (e: Employee) => {
    setEditingId(e.id);
    setDraft({ name: e.name, email: e.email, role: e.role, department: e.department, permissions: e.permissions, status: e.status });
    setModalOpen(true);
  };
  const save = () => {
    if (!draft.name.trim()) return;
    if (editingId) updateEmployee(editingId, draft);
    else addEmployee(draft);
    setModalOpen(false);
  };

  return (
    <PageShell title="Employees & roles" subtitle="Manage team and permissions" actionLabel="Add employee" onAction={openCreate}>
      <div className="surface-card p-6">
        <h3 className="font-bold text-[14.5px] mb-5">Team members &amp; roles</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[760px]">
            <thead>
              <tr className="text-left text-[10.5px] font-bold uppercase tracking-wide text-charcoal-light border-b border-black/[.06]">
                <th className="pb-3 pr-3">Name</th>
                <th className="pb-3 pr-3">Role</th>
                <th className="pb-3 pr-3">Department</th>
                <th className="pb-3 pr-3">Permissions</th>
                <th className="pb-3 pr-3">Status</th>
                <th className="pb-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((e) => (
                <tr key={e.id} className="border-b border-black/[.05] last:border-0">
                  <td className="py-3.5 pr-3">
                    <Link href={`/employees/${e.id}`} className="block hover:text-red-primary">
                      <div className="font-bold text-[13px]">{e.name}</div>
                      <div className="text-[11px] text-charcoal-light">{e.email}</div>
                    </Link>
                  </td>
                  <td className="py-3.5 pr-3">
                    <StatusPill status={e.role} />
                  </td>
                  <td className="py-3.5 pr-3 text-[13px]">{e.department}</td>
                  <td className="py-3.5 pr-3 text-[13px] text-charcoal-light">{e.permissions}</td>
                  <td className="py-3.5 pr-3">
                    <StatusPill status={e.status} />
                  </td>
                  <td className="py-3.5">
                    <div className="flex gap-1">
                      <Link href={`/employees/${e.id}`} className="p-1.5 rounded-lg text-charcoal-light hover:bg-grey-soft inline-flex">
                        <ChevronRight size={14} strokeWidth={2} />
                      </Link>
                      <button onClick={() => openEdit(e)} className="p-1.5 rounded-lg text-charcoal-light hover:bg-grey-soft">
                        <Pencil size={14} strokeWidth={2} />
                      </button>
                      {e.role !== "Owner" && (
                        <button onClick={() => removeEmployee(e.id)} className="p-1.5 rounded-lg text-red-primary hover:bg-red-tint">
                          <Trash2 size={14} strokeWidth={2} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-charcoal/50 backdrop-blur-sm z-[100] flex items-center justify-center p-5" onClick={() => setModalOpen(false)}>
          <div className="bg-white rounded-2xl shadow-modal w-full max-w-[440px] p-7" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-1">
              <h3 className="font-display font-semibold text-[19px]">{editingId ? "Edit employee" : "Add employee"}</h3>
              <button onClick={() => setModalOpen(false)} className="w-[30px] h-[30px] rounded-full bg-grey-soft flex items-center justify-center text-charcoal-light">
                <X size={15} strokeWidth={2} />
              </button>
            </div>
            <p className="text-[12.5px] text-charcoal-light mb-6">Set the team member&apos;s role and access level.</p>

            <div className="mb-4">
              <label className="block text-[11px] font-bold uppercase tracking-wide text-charcoal-light mb-1.5">Full name</label>
              <input
                value={draft.name}
                onChange={(ev) => setDraft((d) => ({ ...d, name: ev.target.value }))}
                className="w-full rounded-xl border-[1.5px] border-black/10 px-3.5 py-2.5 text-[13.5px] outline-none focus:border-red-primary"
              />
            </div>
            <div className="mb-4">
              <label className="block text-[11px] font-bold uppercase tracking-wide text-charcoal-light mb-1.5">Email</label>
              <input
                value={draft.email}
                onChange={(ev) => setDraft((d) => ({ ...d, email: ev.target.value }))}
                className="w-full rounded-xl border-[1.5px] border-black/10 px-3.5 py-2.5 text-[13.5px] outline-none focus:border-red-primary"
              />
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wide text-charcoal-light mb-1.5">Role</label>
                <Select value={draft.role} onChange={(v) => setDraft((d) => ({ ...d, role: v as Employee["role"] }))} options={roleOptions} />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wide text-charcoal-light mb-1.5">Status</label>
                <Select value={draft.status} onChange={(v) => setDraft((d) => ({ ...d, status: v as Employee["status"] }))} options={statusOptions} />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-[11px] font-bold uppercase tracking-wide text-charcoal-light mb-1.5">Department</label>
              <input
                value={draft.department}
                onChange={(ev) => setDraft((d) => ({ ...d, department: ev.target.value }))}
                placeholder="e.g. Medical"
                className="w-full rounded-xl border-[1.5px] border-black/10 px-3.5 py-2.5 text-[13.5px] outline-none focus:border-red-primary"
              />
            </div>
            <div className="mb-6">
              <label className="block text-[11px] font-bold uppercase tracking-wide text-charcoal-light mb-1.5">Permissions</label>
              <input
                value={draft.permissions}
                onChange={(ev) => setDraft((d) => ({ ...d, permissions: ev.target.value }))}
                placeholder="e.g. Assigned bookings"
                className="w-full rounded-xl border-[1.5px] border-black/10 px-3.5 py-2.5 text-[13.5px] outline-none focus:border-red-primary"
              />
            </div>

            <div className="flex gap-2.5">
              <button onClick={() => setModalOpen(false)} className="btn-outline flex-1 justify-center">
                Cancel
              </button>
              <button onClick={save} className="btn-primary flex-1 justify-center">
                {editingId ? "Save changes" : "Add employee"}
              </button>
            </div>
          </div>
        </div>
      )}
    </PageShell>
  );
}
