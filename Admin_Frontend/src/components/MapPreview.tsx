import { ExternalLink } from "lucide-react";

export default function MapPreview({ lat, lng, height = 224 }: { lat: number; lng: number; height?: number }) {
  const embedSrc = `https://maps.google.com/maps?q=${lat},${lng}&z=16&output=embed`;
  const openSrc = `https://www.google.com/maps?q=${lat},${lng}`;

  return (
    <div className="relative rounded-xl overflow-hidden border border-black/[.06]">
      <iframe title="Delivery location map" src={embedSrc} width="100%" height={height} style={{ border: 0, display: "block" }} loading="lazy" />
      <a
        href={openSrc}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-2.5 right-2.5 flex items-center gap-1.5 bg-white/95 border border-black/[.08] shadow-soft text-[11.5px] font-semibold text-charcoal px-2.5 py-1.5 rounded-full hover:text-red-primary hover:border-red-primary/30 transition-colors"
      >
        <ExternalLink size={12} strokeWidth={2} /> Open in Maps
      </a>
    </div>
  );
}
