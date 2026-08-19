"use client";

import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, ArrowRight, ArrowLeft, PawPrint, Clock } from "lucide-react";
import { services } from "@/lib/mock-data";
import { useClientStore } from "@/lib/client-store";
import Calendar from "@/components/Calendar";

const timeSlots = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "13:00", "13:30", "14:00", "15:00", "16:00", "17:00"];

type Step = "service" | "pet" | "datetime" | "confirmed";

function BookPageInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { pets, addBooking } = useClientStore();
  const preselected = searchParams.get("service");

  const [step, setStep] = useState<Step>(preselected ? "pet" : "service");
  const [serviceSlug, setServiceSlug] = useState(preselected ?? "");
  const [petName, setPetName] = useState(pets[0]?.name ?? "");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [bookingId, setBookingId] = useState("");

  const service = services.find((s) => s.slug === serviceSlug);
  const steps: Step[] = ["service", "pet", "datetime"];

  const confirm = () => {
    if (!service || !petName || !date || !time) return;
    const booking = addBooking({ serviceSlug: service.slug, serviceName: service.nameEn, petName, date, time, notes });
    setBookingId(booking.id);
    setStep("confirmed");
  };

  if (step === "confirmed") {
    return (
      <div className="mx-auto max-w-lg px-5 py-24 text-center">
        <div className="w-16 h-16 rounded-full bg-status-greenTint flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={30} strokeWidth={2} className="text-status-green" />
        </div>
        <h1 className="font-display font-semibold text-3xl">Appointment booked</h1>
        <p className="text-charcoal-light mt-3">
          Your booking <span className="font-semibold text-charcoal">{bookingId}</span> for {service?.nameEn} on{" "}
          {date} at {time} is confirmed.
        </p>
        <div className="flex gap-3 justify-center mt-8">
          <Link href={`/book/${bookingId}`} className="btn-primary">
            View booking
          </Link>
          <Link href="/profile" className="btn-outline">
            Go to profile
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-5 sm:px-8 py-14">
      <div className="flex items-center gap-2 mb-10 justify-center flex-wrap">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold ${
                step === s ? "bg-red-primary text-white" : "bg-red-tint text-red-primary"
              }`}
            >
              {i + 1}
            </div>
            <span className={`text-[12.5px] font-semibold ${step === s ? "text-charcoal" : "text-charcoal-light"}`}>
              {s === "service" ? "Service" : s === "pet" ? "Your pet" : "Date & time"}
            </span>
            {i < steps.length - 1 && <div className="w-8 h-px bg-black/10 mx-1" />}
          </div>
        ))}
      </div>

      {step === "service" && (
        <div className="surface-card p-6 sm:p-8">
          <h2 className="font-display font-semibold text-xl mb-6">Select a service</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {services.map((s) => (
              <button
                key={s.slug}
                onClick={() => setServiceSlug(s.slug)}
                className={`text-left p-4 rounded-xl border-[1.5px] transition-colors ${
                  serviceSlug === s.slug ? "border-red-primary bg-red-tint" : "border-black/10 hover:border-black/20"
                }`}
              >
                <div className="font-semibold text-[14px]">{s.nameEn}</div>
                <div className="text-[12.5px] text-charcoal-light mt-1">{s.price} EGP · {s.durationMin} min</div>
              </button>
            ))}
          </div>
          <button onClick={() => setStep("pet")} disabled={!serviceSlug} className="btn-primary w-full justify-center mt-8 disabled:opacity-40 disabled:pointer-events-none">
            Continue <ArrowRight size={15} strokeWidth={2} />
          </button>
        </div>
      )}

      {step === "pet" && (
        <div className="surface-card p-6 sm:p-8">
          <h2 className="font-display font-semibold text-xl mb-2">Which pet is this for?</h2>
          <p className="text-[13.5px] text-charcoal-light mb-6">Booking {service?.nameEn} — {service?.price} EGP</p>
          {pets.length === 0 ? (
            <p className="text-charcoal-light text-[13.5px]">
              You haven&apos;t added a pet yet.{" "}
              <Link href="/profile" className="text-red-primary font-semibold hover:underline">
                Add one in your profile
              </Link>
              , then come back.
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 gap-3">
              {pets.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPetName(p.name)}
                  className={`text-left p-4 rounded-xl border-[1.5px] flex items-center gap-3 transition-colors ${
                    petName === p.name ? "border-red-primary bg-red-tint" : "border-black/10 hover:border-black/20"
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0">
                    <PawPrint size={16} strokeWidth={2} className="text-red-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-[14px]">{p.name}</div>
                    <div className="text-[12px] text-charcoal-light">{p.breed}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
          <div className="flex gap-3 mt-8">
            <button onClick={() => setStep("service")} className="btn-outline flex-1 justify-center">
              <ArrowLeft size={15} strokeWidth={2} /> Back
            </button>
            <button onClick={() => setStep("datetime")} disabled={!petName} className="btn-primary flex-1 justify-center disabled:opacity-40 disabled:pointer-events-none">
              Continue <ArrowRight size={15} strokeWidth={2} />
            </button>
          </div>
        </div>
      )}

      {step === "datetime" && (
        <div className="surface-card p-6 sm:p-8">
          <h2 className="font-display font-semibold text-xl mb-6">Pick a date & time</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Calendar value={date} onChange={setDate} />
            <div>
              <div className="flex items-center gap-1.5 text-[12.5px] font-bold uppercase tracking-wide text-charcoal-light mb-3">
                <Clock size={13} strokeWidth={2} /> Available times
              </div>
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
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="Anything the vet should know? (optional)"
                className="w-full rounded-xl border-[1.5px] border-black/10 px-3.5 py-2.5 text-[13px] outline-none focus:border-red-primary resize-none mt-5"
              />
            </div>
          </div>
          <div className="flex gap-3 mt-8">
            <button onClick={() => setStep("pet")} className="btn-outline flex-1 justify-center">
              <ArrowLeft size={15} strokeWidth={2} /> Back
            </button>
            <button onClick={confirm} disabled={!date || !time} className="btn-primary flex-1 justify-center disabled:opacity-40 disabled:pointer-events-none">
              Confirm booking
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function BookPage() {
  return (
    <Suspense>
      <BookPageInner />
    </Suspense>
  );
}
