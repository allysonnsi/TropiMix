"use client";

import { useSearchParams } from "next/navigation";
import ProductGrid from "@/components/ProductGrid/ProductGrid";

export default function CardapioClient() {
  const searchParams = useSearchParams();
  const categoria = searchParams.get("categoria") ?? undefined;
  return <ProductGrid initialCategory={categoria} />;
}
