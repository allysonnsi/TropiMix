"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import ProductCard from "@/components/ProductCard/ProductCard";
import { fetchCategories, fetchProducts } from "@/lib/data/catalog";
import type { Category, Product } from "@/types";

export default function ProductGrid({ initialCategory }: { initialCategory?: string }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory ?? "todos");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchCategories(), fetchProducts()]).then(([cats, prods]) => {
      setCategories(cats);
      setProducts(prods);
      setLoading(false);
    });
  }, []);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = activeCategory === "todos" || p.category_slug === activeCategory;
      const matchesQuery =
        query.trim() === "" ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        (p.description ?? "").toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [products, activeCategory, query]);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-xs">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-mata/40" size={18} />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar no cardápio..."
            className="focus-ring w-full rounded-full border-2 border-mata/10 bg-white py-2.5 pl-11 pr-4 text-sm text-mata placeholder:text-mata/40"
          />
        </div>

        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:flex-wrap md:px-0">
          <button
            onClick={() => setActiveCategory("todos")}
            className={`focus-ring shrink-0 rounded-full px-4 py-2 text-sm font-bold transition ${
              activeCategory === "todos"
                ? "bg-mata text-white"
                : "bg-white text-mata/70 ring-1 ring-mata/10 hover:ring-caju"
            }`}
          >
            Todos
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.slug)}
              className={`focus-ring shrink-0 rounded-full px-4 py-2 text-sm font-bold transition ${
                activeCategory === c.slug
                  ? "bg-mata text-white"
                  : "bg-white text-mata/70 ring-1 ring-mata/10 hover:ring-caju"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-72 animate-pulse rounded-3xl bg-white/60" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-3xl bg-white p-12 text-center text-mata/60">
          Nenhum produto encontrado para essa busca.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
