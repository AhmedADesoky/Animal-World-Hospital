import { products } from "@/lib/mock-data";
import ProductDetailClient from "@/components/ProductDetailClient";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default function Page({ params }: { params: { slug: string } }) {
  return <ProductDetailClient slug={params.slug} />;
}
