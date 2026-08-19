"use client";

import { useState } from "react";
import { Pencil, Check } from "lucide-react";
import PageShell from "@/components/PageShell";
import ProfileAvatar from "@/components/ProfileAvatar";
import StatusPill from "@/components/StatusPill";
import { useAdminProfile } from "@/lib/admin-profile-context";

export default function AdminProfilePage() {
  const { profile, updateProfile } = useAdminProfile();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState({ name: profile.name, email: profile.email, phone: profile.phone });
  const [saved, setSaved] = useState(false);

  const startEdit = () => {
    setDraft({ name: profile.name, email: profile.email, phone: profile.phone });
    setEditing(true);
  };

  const save = () => {
    updateProfile(draft);
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <PageShell title="My profile" subtitle="Manage your account details" actionLabel={null}>
      <div className="max-w-xl">
        <div className="surface-card p-6 sm:p-8">
          <div className="flex items-center gap-4 mb-7">
            <ProfileAvatar size={72} />
            <div>
              <div className="font-display font-semibold text-[19px]">{profile.name}</div>
              <div className="mt-1">
                <StatusPill status={profile.role} />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-[14.5px]">Account details</h3>
            {!editing && (
              <button onClick={startEdit} className="btn-outline !py-2 !px-4">
                <Pencil size={13} strokeWidth={2} /> Edit
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
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wide text-charcoal-light mb-1.5">Phone</label>
                <input
                  value={draft.phone}
                  onChange={(e) => setDraft((d) => ({ ...d, phone: e.target.value }))}
                  className="w-full rounded-xl border-[1.5px] border-black/10 px-3.5 py-2.5 text-[13.5px] outline-none focus:border-red-primary"
                />
              </div>
              <div className="flex gap-3 pt-1">
                <button onClick={() => setEditing(false)} className="btn-outline flex-1 justify-center">
                  Cancel
                </button>
                <button onClick={save} className="btn-primary flex-1 justify-center">
                  Save changes
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4 text-[14px]">
              <div className="flex justify-between border-b border-black/5 pb-3">
                <span className="text-charcoal-light">Full name</span>
                <span className="font-semibold">{profile.name}</span>
              </div>
              <div className="flex justify-between border-b border-black/5 pb-3">
                <span className="text-charcoal-light">Email</span>
                <span className="font-semibold">{profile.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-light">Phone</span>
                <span className="font-semibold">{profile.phone}</span>
              </div>
            </div>
          )}
          {saved && (
            <div className="flex items-center gap-1.5 mt-4 text-[12.5px] font-semibold text-status-green">
              <Check size={13} strokeWidth={2.5} /> Saved
            </div>
          )}
        </div>
      </div>
    </PageShell>
  );
}
