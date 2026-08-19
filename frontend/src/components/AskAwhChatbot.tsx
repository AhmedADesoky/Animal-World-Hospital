"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, Sparkles, PawPrint, AlertTriangle, Loader2 } from "lucide-react";
import { useClientStore } from "@/lib/client-store";

const CHATBOT_API_URL = process.env.NEXT_PUBLIC_CHATBOT_API_URL ?? "http://localhost:8000";

const quickPrompts = [
  "How do I book an appointment?",
  "What are your clinic hours?",
  "My pet isn't eating — what should I do?",
  "Do you offer home visits?",
];

type ChatMessage = { from: "bot" | "user"; text: string; emergency?: boolean };

export default function AskAwhChatbot() {
  const { chatbotOpen: open, setChatbotOpen: setOpen } = useClientStore();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { from: "bot", text: "Hi! I'm Ask A W H 🐾 — how can I help you and your pet today?" },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const hasConversation = messages.length > 1;

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text: string) => {
    if (!text.trim() || loading) return;
    setMessages((m) => [...m, { from: "user", text }]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch(`${CHATBOT_API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      if (!res.ok) throw new Error("chat request failed");
      const data = await res.json();
      setMessages((m) => [...m, { from: "bot", text: data.answer, emergency: data.emergency }]);
    } catch {
      setMessages((m) => [
        ...m,
        { from: "bot", text: "Sorry, I'm having trouble connecting right now. Please try again or contact us on WhatsApp." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Open Ask AWH chatbot"
        className="fixed bottom-6 right-6 z-[60] w-14 h-14 rounded-full btn-primary !p-0 justify-center shadow-red hover:scale-105 transition-transform"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-[60] w-[92vw] max-w-[380px] rounded-[26px] shadow-modal flex flex-col overflow-hidden max-h-[74vh] border border-black/[.06] bg-white animate-[fadein_.2s_ease-out]">
          {/* Header */}
          <div className="relative bg-gradient-to-br from-red-bright via-red-primary to-red-deep text-white px-5 py-4 flex items-center gap-3 shrink-0 overflow-hidden">
            <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full bg-white/10" />
            <div className="absolute -bottom-10 -right-2 w-20 h-20 rounded-full bg-white/10" />
            <div className="relative w-10 h-10 rounded-full bg-white/15 ring-1 ring-white/25 flex items-center justify-center shrink-0">
              <PawPrint size={19} strokeWidth={2} />
            </div>
            <div className="relative min-w-0">
              <div className="font-display font-semibold text-[15px] leading-tight">Ask A W H</div>
              <div className="text-[11px] text-white/80 flex items-center gap-1.5 mt-0.5">
                <span className="w-[6px] h-[6px] rounded-full bg-status-green shrink-0" />
                Your pet-care assistant
              </div>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3.5 bg-grey-soft/60 scroll-smooth">
            {messages.map((m, i) => (
              <div key={i} className={`flex items-end gap-2 animate-[fadein_.2s_ease-out] ${m.from === "user" ? "flex-row-reverse" : ""}`}>
                {m.from === "bot" && (
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mb-0.5 ${m.emergency ? "bg-red-primary text-white" : "bg-white border border-black/[.06] text-red-primary shadow-soft"}`}>
                    {m.emergency ? <AlertTriangle size={12} strokeWidth={2.5} /> : <PawPrint size={11} strokeWidth={2} />}
                  </div>
                )}
                <div
                  className={`max-w-[78%] px-3.5 py-2.5 rounded-[16px] text-[13px] leading-relaxed ${
                    m.from === "bot"
                      ? m.emergency
                        ? "bg-red-tint border border-red-primary/25 text-red-primary rounded-bl-md font-semibold"
                        : "bg-white border border-black/[.06] shadow-soft text-charcoal rounded-bl-md"
                      : "bg-gradient-to-br from-red-primary to-red-deep text-white rounded-br-md shadow-red"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex items-end gap-2">
                <div className="w-6 h-6 rounded-full bg-white border border-black/[.06] shadow-soft text-red-primary flex items-center justify-center shrink-0 mb-0.5">
                  <PawPrint size={11} strokeWidth={2} />
                </div>
                <div className="px-4 py-3 rounded-[16px] rounded-bl-md bg-white border border-black/[.06] shadow-soft flex items-center gap-1">
                  {[0, 1, 2].map((d) => (
                    <span key={d} className="w-[5px] h-[5px] rounded-full bg-red-primary/50 animate-bounce" style={{ animationDelay: `${d * 0.12}s` }} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quick prompts — only shown before the conversation starts */}
          {!hasConversation && (
            <div className="px-4 pb-3 pt-1 flex flex-wrap gap-1.5 bg-grey-soft/60 border-t border-black/[.04] animate-[fadein_.2s_ease-out]">
              {quickPrompts.map((p) => (
                <button
                  key={p}
                  onClick={() => send(p)}
                  className="text-[11px] font-medium px-3 py-1.5 rounded-full bg-white border border-black/[.06] text-red-primary hover:bg-red-tint hover:border-red-primary/20 transition-colors flex items-center gap-1 shadow-soft"
                >
                  <Sparkles size={10} /> {p}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 p-3 border-t border-black/[.06] bg-white shrink-0"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question…"
              className="flex-1 rounded-full border border-black/10 px-4 py-2.5 text-[13px] outline-none focus:border-red-primary focus:ring-4 focus:ring-red-primary/[.08] transition-all"
            />
            <button
              type="submit"
              aria-label="Send"
              disabled={loading || !input.trim()}
              className="w-10 h-10 rounded-full btn-primary !p-0 justify-center shrink-0 disabled:opacity-40 disabled:pointer-events-none"
            >
              {loading ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} />}
            </button>
          </form>
        </div>
      )}
    </>
  );
}
