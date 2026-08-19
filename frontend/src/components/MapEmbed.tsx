export default function MapEmbed({
  lat,
  lng,
  height = 256,
  type = "roadmap",
}: {
  lat: number;
  lng: number;
  height?: number;
  type?: "roadmap" | "satellite";
}) {
  const src = `https://maps.google.com/maps?q=${lat},${lng}&z=16&t=${type === "satellite" ? "k" : "m"}&output=embed`;
  return (
    <iframe
      title="Delivery location map"
      src={src}
      width="100%"
      height={height}
      style={{ border: 0, display: "block" }}
      loading="lazy"
    />
  );
}
