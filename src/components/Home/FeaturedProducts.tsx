"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard/ProductCard";
import { fetchProducts } from "@/lib/data/catalog";
import type { Product } from "@/types";

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts().then((all) => setProducts(all.filter((p) => p.featured).slice(0, 6)));
  }, []);

  if (products.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 md:px-8">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <span className="text-sm font-bold uppercase tracking-wide text-caju">
            Mais pedidos
          </span>
          <h2 className="font-display text-3xl font-extrabold text-mata md:text-4xl">
            Produtos em destaque
          </h2>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
