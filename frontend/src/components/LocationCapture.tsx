"use client";

import { useState } from "react";
import { LocateFixed, Loader2, RotateCcw, TriangleAlert, Navigation, ShieldCheck, Map, Satellite } from "lucide-react";
import MapEmbed from "./MapEmbed";

export type GeoLocation = { lat: number; lng: number; accuracy: number };

export default function LocationCapture({
  location,
  onChange,
}: {
  location: GeoLocation | null;
  onChange: (loc: GeoLocation | null) => void;
}) {
  const [status, setStatus] = useState<"idle" | "locating" | "error">("idle");
  const [error, setError] = useState("");
  const [mapType, setMapType] = useState<"roadmap" | "satellite">("roadmap");

  const capture = () => {
    if (!("geolocation" in navigator)) {
      setStatus("error");
      setError("Your browser doesn't support location sharing. Please enter your address manually below.");
      return;
    }
    setStatus("locating");
    setError("");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        onChange({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
        });
        setStatus("idle");
      },
      (err) => {
        setStatus("error");
        onChange(null);
        setError(
          err.code === err.PERMISSION_DENIED
            ? "Location access was denied. Please allow location access, or enter your address manually below."
            : "Couldn't get your location. Please try again or enter your address manually below."
        );
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  if (location) {
    return (
      <div className="rounded-[22px] border border-black/[.08] shadow-card overflow-hidden bg-white">
        <div className="relative">
          <MapEmbed lat={location.lat} lng={location.lng} height={280} type={mapType} />

          {/* Floating badge overlay */}
          <div className="absolute top-3 left-3 pointer-events-none">
            <div className="glass !bg-white/90 rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-soft">
              <span className="w-4 h-4 rounded-full bg-red-primary flex items-center justify-center shrink-0">
                <Navigation size={9} strokeWidth={2.5} className="text-white" fill="white" />
              </span>
              <span className="text-[11.5px] font-bold text-charcoal">Live delivery pin</span>
            </div>
          </div>

          {/* Custom map/satellite switch — replaces Google's default corner toggle */}
          <div className="absolute top-3 right-3 glass !bg-white/90 rounded-full p-[3px] flex items-center gap-[2px] shadow-soft">
            {(
              [
                { key: "roadmap", label: "Map", icon: Map },
                { key: "satellite", label: "Satellite", icon: Satellite },
              ] as const
            ).map((opt) => {
              const Icon = opt.icon;
              const active = mapType === opt.key;
              return (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => setMapType(opt.key)}
                  aria-pressed={active}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11.5px] font-bold transition-all duration-200 ${
                    active ? "bg-gradient-to-br from-red-bright to-red-primary text-white shadow-red" : "text-charcoal-light hover:text-charcoal"
                  }`}
                >
                  <Icon size={12} strokeWidth={2.3} />
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Status bar */}
        <div className="flex items-center justify-between gap-3 px-4 py-3.5 border-t border-black/[.06] bg-white">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-status-greenTint flex items-center justify-center shrink-0">
              <ShieldCheck size={15} strokeWidth={2} className="text-status-green" />
            </div>
            <div className="min-w-0">
              <div className="text-[12.5px] font-bold text-charcoal">Location captured</div>
              <div className="text-[11px] text-charcoal-light font-medium">±{Math.round(location.accuracy)}m accuracy</div>
            </div>
          </div>
          <button
            type="button"
            onClick={capture}
            className="inline-flex items-center gap-1.5 text-[12px] font-bold text-red-primary hover:text-red-hover shrink-0 px-3 py-2 rounded-full hover:bg-red-tint transition-colors"
          >
            <RotateCcw size={13} strokeWidth={2.2} /> Refresh
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="relative w-full h-64 sm:h-72 rounded-[22px] border border-black/[.08] shadow-card flex flex-col items-center justify-center gap-3 text-center px-6 overflow-hidden bg-gradient-to-br from-grey-soft via-white to-grey-soft">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: "radial-gradient(rgba(196,30,58,0.08) 1.5px, transparent 1.5px)",
            backgroundSize: "22px 22px",
          }}
        />
        {status === "locating" ? (
          <>
            <div className="relative w-14 h-14 rounded-full bg-red-tint flex items-center justify-center">
              <Loader2 size={24} strokeWidth={2} className="animate-spin text-red-primary" />
            </div>
            <p className="relative text-[13px] font-semibold text-charcoal-light">Getting your current location…</p>
          </>
        ) : (
          <>
            <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-red-bright to-red-deep flex items-center justify-center shadow-red">
              <LocateFixed size={22} strokeWidth={2} className="text-white" />
            </div>
            <div className="relative">
              <p className="text-[14px] font-bold text-charcoal">Share your current location</p>
              <p className="text-[12px] text-charcoal-light mt-1 max-w-[260px] mx-auto">We use this to send your order to the right address for delivery.</p>
            </div>
            <button type="button" onClick={capture} className="relative btn-primary !py-2.5 !px-5 mt-1">
              <LocateFixed size={14} strokeWidth={2} /> Use my current location
            </button>
          </>
        )}
      </div>
      {status === "error" && (
        <div className="flex items-start gap-2 mt-3 text-[12.5px] text-red-primary font-medium bg-red-tint rounded-xl px-3.5 py-2.5">
          <TriangleAlert size={14} strokeWidth={2} className="shrink-0 mt-0.5" /> {error}
        </div>
      )}
    </div>
  );
}
