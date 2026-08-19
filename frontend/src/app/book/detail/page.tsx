"use client";

import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar as CalendarIcon, Clock, PawPrint, MessageCircle, Phone, Pencil, X, Check } from "lucide-react";
import { useClientStore } from "@/lib/client-store";
import Calendar from "@/components/Calendar";

const timeSlots = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "13:00", "13:30", "14:00", "15:00", "16:00", "17:00"];

const statusStyles: Record<string, string> = {
  Upcoming: "bg-status-blueTint text-status-blue",
  Completed: "bg-status-greenTint text-status-green",
  Cancelled: "bg-red-tint text-red-primary",
};

function BookingDetailInner() {
  const id = useSearchParams().get("id");
  const router = useRouter();
  const { bookings, updateBooking, cancelBooking, setChatbotOpen } = useClientStore();
  const booking = bookings.find((b) => b.id === id);

  const [editing, setEditing] = useState(false);
  const [date, setDate] = useState(booking?.date ?? "");
  const [time, setTime] = useState(booking?.time ?? "");
  const [saved, setSaved] = useState(false);

  if (!booking) {
    return (
      <div className="mx-auto max-w-lg px-5 py-24 text-center">
        <h1 className="font-display font-semibold text-2xl">Booking not found</h1>
        <Link href="/profile" className="btn-primary inline-flex mt-6">
          Go to profile
        </Link>
      </div>
    );
  }

  const saveReschedule = () => {
    updateBooking(booking.id, { date, time });
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const doCancel = () => {
    if (confirm("Cancel this appointment?")) cancelBooking(booking.id);
  };

  return (
    <div className="mx-auto max-w-3xl px-5 sm:px-8 py-14">
      <button onClick={() => router.push("/profile")} className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-charcoal-light hover:text-red-primary mb-6 transition-colors">
        <ArrowLeft size={14} strokeWidth={2} /> Back to profile
      </button>

      <div className="surface-card p-6 sm:p-8">
        <div className="flex items-start justify-between flex-wrap gap-3 mb-6">
          <div>
            <span className="text-[11px] font-bold tracking-[.14em] uppercase text-red-primary">Booking {booking.id}</span>
            <h1 className="font-display font-semibold text-2xl mt-1">{booking.serviceName}</h1>
          </div>
          <span className={`status-pill ${statusStyles[booking.status]}`}>{booking.status}</span>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          <div className="flex items-center gap-2.5 text-[13.5px]">
            <PawPrint size={16} strokeWidth={2} className="text-red-primary shrink-0" /> {booking.petName}
          </div>
          <div className="flex items-center gap-2.5 text-[13.5px]">
            <CalendarIcon size={16} strokeWidth={2} className="text-red-primary shrink-0" /> {booking.date}
          </div>
          <div className="flex items-center gap-2.5 text-[13.5px]">
            <Clock size={16} strokeWidth={2} className="text-red-primary shrink-0" /> {booking.time}
          </div>
        </div>

        {booking.notes && <p className="text-[13.5px] text-charcoal-light bg-grey-soft rounded-xl p-3.5 mb-6">{booking.notes}</p>}

        {booking.status === "Upcoming" && !editing && (
          <div className="flex flex-wrap gap-3">
            <button onClick={() => setEditing(true)} className="btn-outline">
              <Pencil size={14} strokeWidth={2} /> Reschedule
            </button>
            <button onClick={doCancel} className="btn-outline !border-red-primary !text-red-primary">
              <X size={14} strokeWidth={2} /> Cancel booking
            </button>
            <button onClick={() => setChatbotOpen(true)} className="btn-outline">
              <MessageCircle size={14} strokeWidth={2} /> Chat with the team
            </button>
            <a href="https://wa.me/201000000000" target="_blank" rel="noopener noreferrer" className="btn-primary">
              <Phone size={14} strokeWidth={2} /> WhatsApp us
            </a>
          </div>
        )}

        {saved && (
          <div className="flex items-center gap-1.5 mt-4 text-[12.5px] font-semibold text-status-green">
            <Check size={13} strokeWidth={2.5} /> Booking updated
          </div>
        )}

        {editing && (
          <div className="mt-6 pt-6 border-t border-black/5">
            <h3 className="font-semibold text-[15px] mb-4">Choose a new date & time</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Calendar value={date} onChange={setDate} />
              <div>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((t) => (
                    <button
                      key={t}
                      onClick={() => setTime(t)}
                      className={`py-2.5 rounded-xl text-[12.5px] font-semibold border-[1.5px] transition-colors ${
                        time === t ? "border-red-primary bg-red-primary text-white" : "border-black/10 hover:border-red-primary hover:text-red-primary"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setEditing(false)} className="btn-outline flex-1 justify-center">
                Cancel
              </button>
              <button onClick={saveReschedule} disabled={!date || !time} className="btn-primary flex-1 justify-center disabled:opacity-40 disabled:pointer-events-none">
                Save new time
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function BookingDetailPage() {
  return (
    <Suspense>
      <BookingDetailInner />
    </Suspense>
  );
}
