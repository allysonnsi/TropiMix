"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { fetchCategories } from "@/lib/data/catalog";
import type { Category } from "@/types";
import CategoryVisual from "@/components/ui/CategoryVisual";
import { SectionHeading, Skeleton } from "@/components/ui/Primitives";
export default function CategoriesSection() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .finally(() => setLoading(false));
  }, []);
  return (
    <section className="categories-section tropi-container">
      <SectionHeading
        eyebrow="Do seu jeito"
        title="Qual é a vontade de hoje?"
      />
      {loading ? (
        <Skeleton rows={2} />
      ) : (
        <div className="category-grid">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/cardapio?categoria=${category.slug}`}
              className="category-tile"
            >
              <CategoryVisual
                category={category.slug}
                image={category.image}
                name={category.name}
                compact
              />
              <span>{category.name}</span>
              <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
