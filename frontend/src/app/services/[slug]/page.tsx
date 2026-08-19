import { services } from "@/lib/mock-data";
import ServiceDetailClient from "@/components/ServiceDetailClient";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export default function Page({ params }: { params: { slug: string } }) {
  return <ServiceDetailClient slug={params.slug} />;
}
