"use client";

import { useState } from "react";
import { Paperclip, Send } from "lucide-react";
import PageShell from "@/components/PageShell";
import { chatThreads } from "@/lib/mock-data";

export default function CustomerServicePage() {
  const [activeId, setActiveId] = useState(chatThreads[0].id);
  const active = chatThreads.find((t) => t.id === activeId)!;

  return (
    <PageShell title="Customer service" subtitle="Respond to client messages" actionLabel={null}>
      <div className="grid lg:grid-cols-[290px_1fr] gap-4 h-[calc(100vh-148px)]">
        <div className="surface-card overflow-hidden flex flex-col">
          <div className="px-[18px] py-[17px] border-b border-black/[.06] text-[13px] font-bold flex items-center gap-2">
            Conversations
            <span className="ml-auto status-pill bg-red-tint text-red-primary">{chatThreads.filter((t) => t.unread).length}</span>
          </div>
          <div className="flex-1 overflow-y-auto">
            {chatThreads.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveId(t.id)}
                className={`w-full text-left flex gap-2.5 items-start px-4 py-3.5 border-b border-black/[.05] transition-colors ${
                  t.id === activeId ? "bg-red-tint border-l-[3px] border-l-red-primary" : "hover:bg-grey-soft"
                }`}
              >
                <div className="w-9 h-9 rounded-full bg-grey-mid flex items-center justify-center text-[13px] font-bold text-charcoal-light shrink-0">
                  {t.name.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex justify-between gap-2">
                    <span className="text-[13px] font-bold truncate">{t.name}</span>
                    <span className="text-[10.5px] text-charcoal-light font-semibold shrink-0">{t.lastMessageTime}</span>
                  </div>
                  <div className="text-[11.5px] text-charcoal-light truncate mt-0.5">{t.messages[t.messages.length - 1].text}</div>
                </div>
                {t.unread && <span className="w-2 h-2 rounded-full bg-red-bright mt-1.5 shrink-0" />}
              </button>
            ))}
          </div>
        </div>

        <div className="surface-card flex flex-col overflow-hidden">
          <div className="px-[22px] py-4 border-b border-black/[.06] flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-grey-mid flex items-center justify-center text-[15px] font-bold text-charcoal-light">
              {active.name.charAt(0)}
            </div>
            <div>
              <div className="text-[14px] font-bold">{active.name}</div>
              <div className="text-[11.5px] text-charcoal-light">
                {active.phone} · Booking #{active.bookingRef}
              </div>
            </div>
            <div className="ml-auto flex gap-2">
              <button className="btn-outline">View profile</button>
              <button className="btn-primary">New booking</button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-[22px] flex flex-col gap-3.5 bg-grey-soft">
            {active.messages.map((m, i) => (
              <div key={i} className={`max-w-[75%] flex gap-2.5 ${m.from === "out" ? "self-end flex-row-reverse" : ""}`}>
                <div className="w-[30px] h-[30px] rounded-full bg-white shadow-soft flex items-center justify-center text-[13px] shrink-0">
                  {m.from === "out" ? "🩺" : active.name.charAt(0)}
                </div>
                <div>
                  <div
                    className={`px-[15px] py-2.5 rounded-2xl text-[13px] leading-relaxed ${
                      m.from === "in"
                        ? "bg-white shadow-soft rounded-bl-[4px]"
                        : "bg-gradient-to-br from-red-bright to-red-primary text-white rounded-br-[4px]"
                    }`}
                  >
                    {m.text}
                  </div>
                  <div className="text-[10px] text-charcoal-light font-semibold mt-1">
                    {m.time}
                    {m.sender && ` · ${m.sender}`}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="px-5 py-[15px] border-t border-black/[.06] bg-white flex items-center gap-2.5">
            <input
              placeholder="Type your reply…"
              className="flex-1 rounded-full border-[1.5px] border-black/10 px-4 py-2.5 text-[13px] outline-none focus:border-red-primary transition-colors"
            />
            <button className="btn-outline !px-3">
              <Paperclip size={14} strokeWidth={2} />
            </button>
            <button className="btn-primary">
              Send <Send size={13} strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
