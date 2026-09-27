"use client";
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard/ProductCard";
import { fetchProducts } from "@/lib/data/catalog";
import type { Product } from "@/types";
import {
  ActionLink,
  SectionHeading,
  Skeleton,
} from "@/components/ui/Primitives";
export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchProducts()
      .then((all) =>
        setProducts(all.filter((product) => product.featured).slice(0, 6)),
      )
      .finally(() => setLoading(false));
  }, []);
  if (!loading && products.length === 0) return null;
  return (
    <section className="featured-section tropi-container">
      <SectionHeading
        eyebrow="Seleção da casa"
        title="No cardápio"
        action={
          <ActionLink href="/cardapio" secondary>
            Ver cardápio
          </ActionLink>
        }
      >
        Nossos destaques para a sua próxima pausa.
      </SectionHeading>
      {loading ? (
        <Skeleton />
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
