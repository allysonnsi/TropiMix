"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import ProductCard from "@/components/ProductCard/ProductCard";
import { fetchProducts } from "@/lib/data/catalog";
import type { Product } from "@/types";

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts().then((all) =>
      setProducts(all.filter((product) => product.featured).slice(0, 6))
    );
  }, []);

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="bg-areia py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-caju">
              <Sparkles size={14} />
              Favoritos
            </span>

            <h2 className="mt-2 font-display text-4xl font-black text-mata md:text-5xl">
              Mais pedidos
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-mata/55 md:text-base">
              Os sabores que fazem sucesso por aqui.
            </p>
          </div>

          <Link
            href="/cardapio"
            className="focus-ring inline-flex w-fit items-center gap-2 rounded-full bg-mata px-5 py-3 text-sm font-bold text-areia transition hover:-translate-y-0.5 hover:bg-mata-light"
          >
            Ver cardápio
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}