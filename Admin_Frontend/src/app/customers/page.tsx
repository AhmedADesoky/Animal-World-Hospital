import { Eye, ClipboardList } from "lucide-react";
import PageShell from "@/components/PageShell";
import { customers } from "@/lib/mock-data";

export default function CustomersPage() {
  return (
    <PageShell title="Customers" subtitle="Client directory and history" actionLabel="Export">
      <div className="surface-card p-6">
        <h3 className="font-bold text-[14.5px] mb-5">Customer directory</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[640px]">
            <thead>
              <tr className="text-left text-[10.5px] font-bold uppercase tracking-wide text-charcoal-light border-b border-black/[.06]">
                <th className="pb-3 pr-3">Name</th>
                <th className="pb-3 pr-3">Phone / WhatsApp</th>
                <th className="pb-3 pr-3">Pets</th>
                <th className="pb-3 pr-3">Total bookings</th>
                <th className="pb-3 pr-3">Last visit</th>
                <th className="pb-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c.id} className="border-b border-black/[.05] last:border-0">
                  <td className="py-3.5 pr-3 font-bold text-[13px]">{c.name}</td>
                  <td className="py-3.5 pr-3 text-[13px]">{c.phone}</td>
                  <td className="py-3.5 pr-3 text-[13px]">{c.pets}</td>
                  <td className="py-3.5 pr-3 text-[13px]">{c.totalBookings}</td>
                  <td className="py-3.5 pr-3 text-[13px]">{c.lastVisit}</td>
                  <td className="py-3.5">
                    <div className="flex gap-1">
                      <button className="p-1.5 rounded-lg text-charcoal-light hover:bg-grey-soft">
                        <Eye size={14} strokeWidth={2} />
                      </button>
                      <button className="p-1.5 rounded-lg text-charcoal-light hover:bg-grey-soft">
                        <ClipboardList size={14} strokeWidth={2} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageShell>
  );
}
