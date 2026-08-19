"use client";

import { useEffect, useRef, useState } from "react";
import { Camera, Trash2, Pencil } from "lucide-react";
import { useClientStore } from "@/lib/client-store";

export default function ProfileAvatar({ size = 64 }: { size?: number }) {
  const { profile, updateProfile } = useClientStore();
  const fileRef = useRef<HTMLInputElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const handleFile = (file: File | undefined) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    updateProfile({ avatar: url });
    setMenuOpen(false);
  };

  const removeAvatar = () => {
    updateProfile({ avatar: "" });
    setMenuOpen(false);
  };

  return (
    <div ref={wrapRef} className="relative inline-block" style={{ width: size, height: size }}>
      <button
        type="button"
        onClick={() => setMenuOpen((v) => !v)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="relative w-full h-full rounded-full overflow-hidden shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-primary focus-visible:ring-offset-2"
        aria-label="Edit profile photo"
      >
        {profile.avatar ? (
          <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${profile.avatar})` }} />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-red-bright to-red-deep flex items-center justify-center text-white font-display font-semibold" style={{ fontSize: size * 0.38 }}>
            {profile.name.charAt(0)}
          </div>
        )}

        <div
          className={`absolute inset-0 bg-charcoal/50 flex items-center justify-center transition-opacity duration-200 ${
            hover || menuOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          <Camera size={size * 0.28} strokeWidth={2} className="text-white" />
        </div>
      </button>

      <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white border border-black/[.08] shadow-soft flex items-center justify-center text-red-primary pointer-events-none">
        <Pencil size={11} strokeWidth={2.5} />
      </div>

      {menuOpen && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-44 rounded-xl bg-white border border-black/[.08] shadow-modal py-1.5 z-20 animate-[fadein_.15s_ease-out]">
          <button
            onClick={() => fileRef.current?.click()}
            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-[13px] font-semibold text-charcoal hover:bg-grey-soft transition-colors"
          >
            <Camera size={14} strokeWidth={2} /> {profile.avatar ? "Change photo" : "Upload photo"}
          </button>
          {profile.avatar && (
            <button
              onClick={removeAvatar}
              className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-[13px] font-semibold text-red-primary hover:bg-red-tint transition-colors"
            >
              <Trash2 size={14} strokeWidth={2} /> Remove photo
            </button>
          )}
        </div>
      )}

      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleFile(e.target.files?.[0])} />
    </div>
  );
}
