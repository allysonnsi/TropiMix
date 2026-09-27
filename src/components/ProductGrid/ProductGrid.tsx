"use client";
import { useEffect, useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard/ProductCard";
import { fetchCategories, fetchProducts } from "@/lib/data/catalog";
import type { Category, Product } from "@/types";
import {
  Button,
  EmptyState,
  SearchField,
  Skeleton,
} from "@/components/ui/Primitives";
export default function ProductGrid({
  initialCategory,
}: {
  initialCategory?: string;
}) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState(
    initialCategory ?? "todos",
  );
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  function load() {
    setLoading(true);
    setError(false);
    Promise.all([fetchCategories(), fetchProducts()])
      .then(([cats, prods]) => {
        setCategories(cats);
        setProducts(prods);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }
  useEffect(() => {
    load();
  }, []);
  useEffect(() => {
    setActiveCategory(initialCategory ?? "todos");
  }, [initialCategory]);
  const filtered = useMemo(
    () =>
      products.filter(
        (p) =>
          (activeCategory === "todos" || p.category_slug === activeCategory) &&
          (!query.trim() ||
            `${p.name} ${p.description ?? ""}`
              .toLocaleLowerCase("pt-BR")
              .includes(query.trim().toLocaleLowerCase("pt-BR"))),
      ),
    [products, activeCategory, query],
  );
  return (
    <div className="catalog-layout">
      <aside className="catalog-sidebar">
        <p className="eyebrow">Categorias</p>
        <div
          className="catalog-categories"
          role="group"
          aria-label="Filtrar por categoria"
        >
          <button
            aria-pressed={activeCategory === "todos"}
            onClick={() => setActiveCategory("todos")}
          >
            Todo o cardápio<span>{products.length}</span>
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              aria-pressed={activeCategory === c.slug}
              onClick={() => setActiveCategory(c.slug)}
            >
              {c.name}
              <span>
                {products.filter((p) => p.category_slug === c.slug).length}
              </span>
            </button>
          ))}
        </div>
        <div className="catalog-note">
          <strong>Feito para você.</strong>
          <p>
            Adicione seus favoritos ao pedido. As observações podem ser enviadas
            na finalização.
          </p>
        </div>
      </aside>
      <div className="catalog-results">
        <div className="catalog-toolbar">
          <p role="status">
            {loading
              ? "Carregando sabores"
              : `${filtered.length} ${filtered.length === 1 ? "opção" : "opções"} no cardápio`}
          </p>
          <SearchField
            label="Buscar no cardápio"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        {loading ? (
          <Skeleton rows={4} />
        ) : error ? (
          <EmptyState
            title="Não conseguimos carregar o cardápio"
            description="Verifique sua conexão e tente novamente."
          >
            <Button onClick={load}>Tentar novamente</Button>
          </EmptyState>
        ) : filtered.length === 0 ? (
          <EmptyState
            title="Nenhum sabor por aqui"
            description="Tente outro nome ou explore todas as categorias."
          >
            <Button
              variant="secondary"
              onClick={() => {
                setQuery("");
                setActiveCategory("todos");
              }}
            >
              Limpar filtros
            </Button>
          </EmptyState>
        ) : (
          <div className="products-grid catalog-products">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
