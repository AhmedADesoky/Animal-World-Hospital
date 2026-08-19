"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { useClientStore } from "@/lib/client-store";

export default function ReviewSection({ targetSlug }: { targetSlug: string }) {
  const { reviewsFor, addReview, profile } = useClientStore();
  const reviews = reviewsFor(targetSlug);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const avg = reviews.length ? reviews.reduce((n, r) => n + r.rating, 0) / reviews.length : 0;

  const submit = () => {
    if (!rating || !comment.trim()) return;
    addReview({ targetSlug, author: profile.name, rating, comment });
    setComment("");
    setRating(0);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2000);
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <h2 className="font-display font-semibold text-2xl">Feedback</h2>
        {reviews.length > 0 && (
          <span className="flex items-center gap-1 text-[13px] font-semibold text-charcoal-light">
            <Star size={14} fill="#C41E3A" strokeWidth={0} className="text-red-primary" />
            {avg.toFixed(1)} ({reviews.length})
          </span>
        )}
      </div>

      <div className="surface-card p-6 mb-6">
        <h3 className="font-semibold text-[14px] mb-3">Write a review</h3>
        <div className="flex gap-1 mb-4">
          {[1, 2, 3, 4, 5].map((s) => (
            <button
              key={s}
              type="button"
              onMouseEnter={() => setHoverRating(s)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setRating(s)}
              aria-label={`Rate ${s} stars`}
            >
              <Star
                size={22}
                strokeWidth={1.5}
                className={(hoverRating || rating) >= s ? "text-red-primary" : "text-black/15"}
                fill={(hoverRating || rating) >= s ? "#C41E3A" : "none"}
              />
            </button>
          ))}
        </div>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={3}
          placeholder="Share your experience…"
          className="w-full rounded-xl border-[1.5px] border-black/10 px-3.5 py-2.5 text-[13.5px] outline-none focus:border-red-primary resize-none"
        />
        <button onClick={submit} disabled={!rating || !comment.trim()} className="btn-primary mt-3 disabled:opacity-40 disabled:pointer-events-none">
          Submit review
        </button>
        {submitted && <span className="ml-3 text-[12.5px] font-semibold text-status-green">Thanks for your feedback!</span>}
      </div>

      {reviews.length === 0 ? (
        <p className="text-charcoal-light text-[13.5px]">No reviews yet — be the first to share your experience.</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((r) => (
            <div key={r.id} className="surface-card p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-[13.5px]">{r.author}</span>
                <span className="text-[11.5px] text-charcoal-light">{r.date}</span>
              </div>
              <div className="flex gap-0.5 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={13} fill={i < r.rating ? "#C41E3A" : "none"} strokeWidth={1.5} className={i < r.rating ? "text-red-primary" : "text-black/15"} />
                ))}
              </div>
              <p className="text-[13.5px] text-charcoal-light leading-relaxed">{r.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
