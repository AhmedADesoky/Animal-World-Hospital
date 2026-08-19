import { ClipboardList, CheckCircle2, Package, Wallet, Download } from "lucide-react";
import PageShell from "@/components/PageShell";
import KpiCard from "@/components/KpiCard";
import StatusPill from "@/components/StatusPill";
import BarChart from "@/components/charts/BarChart";
import DonutChart from "@/components/charts/DonutChart";
import Heatmap from "@/components/charts/Heatmap";
import { kpis, bookingsOverTime, topServices, peakHours, bookings } from "@/lib/mock-data";

export default function DashboardPage() {
  return (
    <PageShell title="Dashboard overview" subtitle="Wednesday, August 19, 2026" actionLabel="Export report">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KpiCard icon={ClipboardList} value={String(kpis.bookingsThisMonth.value)} label="Bookings this month" change={kpis.bookingsThisMonth.change} up={kpis.bookingsThisMonth.up} />
        <KpiCard icon={CheckCircle2} value={String(kpis.todaysAppointments.value)} label="Today's appointments" change={kpis.todaysAppointments.change} up={kpis.todaysAppointments.up} />
        <KpiCard icon={Package} value={String(kpis.pendingOrders.value)} label="Pending orders" change={kpis.pendingOrders.change} up={kpis.pendingOrders.up} />
        <KpiCard icon={Wallet} value={`${kpis.monthlyRevenue.value.toLocaleString()} EGP`} label="Monthly revenue" change={kpis.monthlyRevenue.change} up={kpis.monthlyRevenue.up} ownerOnly />
      </div>

      <div className="grid lg:grid-cols-[1.6fr_1fr] gap-4 mb-6">
        <div className="surface-card p-6">
          <h3 className="font-bold text-[14.5px]">Bookings over time</h3>
          <p className="text-[12px] text-charcoal-light font-medium mt-0.5 mb-5">Daily appointments — August 2026</p>
          <BarChart data={bookingsOverTime} />
        </div>
        <div className="surface-card p-6">
          <h3 className="font-bold text-[14.5px]">Top services</h3>
          <p className="text-[12px] text-charcoal-light font-medium mt-0.5 mb-5">Bookings by type</p>
          <DonutChart data={topServices} />
        </div>
      </div>

      <div className="surface-card p-6 mb-6">
        <h3 className="font-bold text-[14.5px]">Peak booking hours</h3>
        <p className="text-[12px] text-charcoal-light font-medium mt-0.5 mb-5">Busiest times this month</p>
        <Heatmap {...peakHours} />
      </div>

      <div className="surface-card p-6">
        <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
          <h3 className="font-bold text-[14.5px]">Recent bookings</h3>
          <button className="btn-outline">
            <Download size={13} strokeWidth={2} /> Export
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[640px]">
            <thead>
              <tr className="text-left text-[10.5px] font-bold uppercase tracking-wide text-charcoal-light border-b border-black/[.06]">
                <th className="pb-3 pr-3">Client</th>
                <th className="pb-3 pr-3">Pet</th>
                <th className="pb-3 pr-3">Service</th>
                <th className="pb-3 pr-3">Date &amp; time</th>
                <th className="pb-3 pr-3">Status</th>
                <th className="pb-3">WhatsApp</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id} className="border-b border-black/[.05] last:border-0">
                  <td className="py-3.5 pr-3">
                    <div className="font-bold text-[13px]">{b.client}</div>
                    <div className="text-[11px] text-charcoal-light">{b.phone}</div>
                  </td>
                  <td className="py-3.5 pr-3 text-[13px]">{b.pet}</td>
                  <td className="py-3.5 pr-3 text-[13px]">{b.service}</td>
                  <td className="py-3.5 pr-3 text-[13px]">{b.date}</td>
                  <td className="py-3.5 pr-3">
                    <StatusPill status={b.status} />
                  </td>
                  <td className="py-3.5">
                    <StatusPill status={b.whatsapp} />
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
