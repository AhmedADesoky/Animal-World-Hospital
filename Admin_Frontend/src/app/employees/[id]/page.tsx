"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Mail, Briefcase, ClipboardList, CheckCircle2, Pencil, Trash2, Check } from "lucide-react";
import PageShell from "@/components/PageShell";
import StatusPill from "@/components/StatusPill";
import Select from "@/components/ui/Select";
import { useEmployees } from "@/lib/employees-context";
import { bookingStats } from "@/lib/employee-stats";
import { type Employee } from "@/lib/mock-data";

const roleOptions = ["Owner", "Manager", "Staff", "Vet"].map((r) => ({ value: r, label: r }));
const statusOptions = [
  { value: "Active", label: "Active" },
  { value: "On leave", label: "On leave" },
];

export default function EmployeeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { employees, updateEmployee, removeEmployee } = useEmployees();
  const employee = employees.find((e) => e.id === id);

  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<Omit<Employee, "id">>({ name: "", email: "", role: "Staff", department: "", permissions: "", status: "Active" });
  const [saved, setSaved] = useState(false);

  if (!employee) {
    return (
      <PageShell title="Employee not found" subtitle="" actionLabel={null}>
        <div className="surface-card p-8 text-center text-charcoal-light">
          This employee doesn&apos;t exist. <Link href="/employees" className="text-red-primary font-semibold hover:underline">Back to employees</Link>
        </div>
      </PageShell>
    );
  }

  const stats = bookingStats(employee.name);

  const startEdit = () => {
    setDraft({ name: employee.name, email: employee.email, role: employee.role, department: employee.department, permissions: employee.permissions, status: employee.status });
    setEditing(true);
  };
  const save = () => {
    updateEmployee(employee.id, draft);
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };
  const remove = () => {
    if (confirm(`Remove ${employee.name} from the team?`)) {
      removeEmployee(employee.id);
      router.push("/employees");
    }
  };

  return (
    <PageShell title={employee.name} subtitle="Employee profile & performance" actionLabel={null}>
      <button onClick={() => router.push("/employees")} className="flex items-center gap-1.5 text-[13px] font-semibold text-charcoal-light hover:text-red-primary mb-5 transition-colors">
        <ArrowLeft size={14} strokeWidth={2} /> Back to employees
      </button>

      <div className="grid lg:grid-cols-[1fr_1.4fr] gap-5">
        <div className="space-y-5">
          <div className="surface-card p-6">
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-red-bright to-red-deep flex items-center justify-center text-white font-display font-semibold text-xl shrink-0">
                  {employee.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-[16px]">{employee.name}</div>
                  <StatusPill status={employee.role} />
                </div>
              </div>
              {!editing && employee.role !== "Owner" && (
                <div className="flex gap-1">
                  <button onClick={startEdit} className="p-1.5 rounded-lg text-charcoal-light hover:bg-grey-soft">
                    <Pencil size={14} strokeWidth={2} />
                  </button>
                  <button onClick={remove} className="p-1.5 rounded-lg text-red-primary hover:bg-red-tint">
                    <Trash2 size={14} strokeWidth={2} />
                  </button>
                </div>
              )}
              {!editing && employee.role === "Owner" && (
                <button onClick={startEdit} className="p-1.5 rounded-lg text-charcoal-light hover:bg-grey-soft">
                  <Pencil size={14} strokeWidth={2} />
                </button>
              )}
            </div>

            {editing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wide text-charcoal-light mb-1.5">Full name</label>
                  <input
                    value={draft.name}
                    onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
                    className="w-full rounded-xl border-[1.5px] border-black/10 px-3.5 py-2.5 text-[13.5px] outline-none focus:border-red-primary"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wide text-charcoal-light mb-1.5">Email</label>
                  <input
                    value={draft.email}
                    onChange={(e) => setDraft((d) => ({ ...d, email: e.target.value }))}
                    className="w-full rounded-xl border-[1.5px] border-black/10 px-3.5 py-2.5 text-[13.5px] outline-none focus:border-red-primary"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wide text-charcoal-light mb-1.5">Role</label>
                    <Select value={draft.role} onChange={(v) => setDraft((d) => ({ ...d, role: v as Employee["role"] }))} options={roleOptions} />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wide text-charcoal-light mb-1.5">Status</label>
                    <Select value={draft.status} onChange={(v) => setDraft((d) => ({ ...d, status: v as Employee["status"] }))} options={statusOptions} />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wide text-charcoal-light mb-1.5">Department</label>
                  <input
                    value={draft.department}
                    onChange={(e) => setDraft((d) => ({ ...d, department: e.target.value }))}
                    className="w-full rounded-xl border-[1.5px] border-black/10 px-3.5 py-2.5 text-[13.5px] outline-none focus:border-red-primary"
                  />
                </div>
                <div className="flex gap-2.5 pt-1">
                  <button onClick={() => setEditing(false)} className="btn-outline flex-1 justify-center">
                    Cancel
                  </button>
                  <button onClick={save} className="btn-primary flex-1 justify-center">
                    Save changes
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3 text-[13.5px]">
                <div className="flex items-center gap-2.5">
                  <Mail size={15} strokeWidth={2} className="text-red-primary shrink-0" /> {employee.email}
                </div>
                <div className="flex items-center gap-2.5">
                  <Briefcase size={15} strokeWidth={2} className="text-red-primary shrink-0" /> {employee.department}
                </div>
                <div className="text-charcoal-light text-[12.5px] pt-1">{employee.permissions}</div>
              </div>
            )}
            {saved && (
              <div className="flex items-center gap-1.5 mt-4 text-[12.5px] font-semibold text-status-green">
                <Check size={13} strokeWidth={2.5} /> Saved
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="surface-card p-5">
              <div className="pill-icon w-[38px] h-[38px] mb-3">
                <ClipboardList size={16} strokeWidth={2} className="text-red-primary" />
              </div>
              <div className="font-display font-semibold text-[22px]">{stats.total}</div>
              <div className="text-[11.5px] text-charcoal-light font-semibold">Assigned bookings</div>
            </div>
            <div className="surface-card p-5">
              <div className="pill-icon w-[38px] h-[38px] mb-3">
                <CheckCircle2 size={16} strokeWidth={2} className="text-red-primary" />
              </div>
              <div className="font-display font-semibold text-[22px]">{stats.confirmed}</div>
              <div className="text-[11.5px] text-charcoal-light font-semibold">Confirmed</div>
            </div>
          </div>
        </div>

        <div className="surface-card p-6">
          <h3 className="font-bold text-[14.5px] mb-1">Assigned bookings</h3>
          <p className="text-[12px] text-charcoal-light mb-5">
            {stats.confirmed} confirmed · {stats.pending} pending · {stats.upcoming} upcoming{stats.cancelled ? ` · ${stats.cancelled} cancelled` : ""}
          </p>

          {stats.list.length === 0 ? (
            <p className="text-charcoal-light text-[13px]">No bookings assigned to this employee yet.</p>
          ) : (
            <div className="space-y-2.5">
              {stats.list.map((b) => (
                <div key={b.id} className="flex items-center gap-3 p-3.5 rounded-xl border border-black/[.06]">
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-[13px]">{b.client}</div>
                    <div className="text-[11.5px] text-charcoal-light">{b.service} · {b.pet} · {b.date}</div>
                  </div>
                  <StatusPill status={b.status} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </PageShell>
  );
}
