import { Ticket, CheckCircle2, ClipboardList, Pencil, Check, X } from "lucide-react";
import PageShell from "@/components/PageShell";
import StatusPill from "@/components/StatusPill";
import { bookings } from "@/lib/mock-data";

export default function BookingsPage() {
  return (
    <PageShell title="Bookings" subtitle="Manage and confirm appointments" actionLabel="New booking">
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <div className="surface-card p-5">
          <div className="pill-icon w-[42px] h-[42px] mb-3.5">
            <Ticket size={18} strokeWidth={2} className="text-red-primary" />
          </div>
          <div className="font-display font-semibold text-[27px]">7</div>
          <div className="text-[12.5px] text-charcoal-light font-semibold">Awaiting confirmation</div>
        </div>
        <div className="surface-card p-5">
          <div className="pill-icon w-[42px] h-[42px] mb-3.5">
            <CheckCircle2 size={18} strokeWidth={2} className="text-red-primary" />
          </div>
          <div className="font-display font-semibold text-[27px]">18</div>
          <div className="text-[12.5px] text-charcoal-light font-semibold">Confirmed today</div>
        </div>
        <div className="surface-card p-5">
          <div className="pill-icon w-[42px] h-[42px] mb-3.5">
            <ClipboardList size={18} strokeWidth={2} className="text-red-primary" />
          </div>
          <div className="font-display font-semibold text-[27px]">34</div>
          <div className="text-[12.5px] text-charcoal-light font-semibold">This week total</div>
        </div>
      </div>

      <div className="surface-card p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-bold text-[14.5px]">All bookings</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[760px]">
            <thead>
              <tr className="text-left text-[10.5px] font-bold uppercase tracking-wide text-charcoal-light border-b border-black/[.06]">
                <th className="pb-3 pr-3">Client</th>
                <th className="pb-3 pr-3">Pet</th>
                <th className="pb-3 pr-3">Service</th>
                <th className="pb-3 pr-3">Assigned vet</th>
                <th className="pb-3 pr-3">Date &amp; time</th>
                <th className="pb-3 pr-3">Status</th>
                <th className="pb-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id} className="border-b border-black/[.05] last:border-0">
                  <td className="py-3.5 pr-3 font-bold text-[13px]">{b.client}</td>
                  <td className="py-3.5 pr-3 text-[13px]">{b.pet}</td>
                  <td className="py-3.5 pr-3 text-[13px]">{b.service}</td>
                  <td className="py-3.5 pr-3 text-[13px]">{b.vet}</td>
                  <td className="py-3.5 pr-3 text-[13px]">{b.date}</td>
                  <td className="py-3.5 pr-3">
                    <StatusPill status={b.status} />
                  </td>
                  <td className="py-3.5">
                    <div className="flex gap-1">
                      <button className="p-1.5 rounded-lg text-charcoal-light hover:bg-grey-soft">
                        <Pencil size={14} strokeWidth={2} />
                      </button>
                      <button className="p-1.5 rounded-lg text-status-green hover:bg-status-greenTint">
                        <Check size={14} strokeWidth={2} />
                      </button>
                      <button className="p-1.5 rounded-lg text-red-primary hover:bg-red-tint">
                        <X size={14} strokeWidth={2} />
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
