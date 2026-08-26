"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchCategories } from "@/lib/data/catalog";
import type { Category } from "@/types";

const emojiByCategory: Record<string, string> = {
  tapiocas: "🫓",
  cuscuz: "🌽",
  misto: "🥪",
  pastel: "🥟",
  "abacaxi-temperado": "🍍",
  bebidas: "🥤",
  acai: "🍇",
  "sucos-naturais": "🧃",
};

export default function CategoriesSection() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetchCategories().then(setCategories);
  }, []);

  return (
    <section className="bg-white/60 py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="mb-8">
          <span className="text-sm font-bold uppercase tracking-wide text-folha">
            Explore
          </span>
          <h2 className="font-display text-3xl font-extrabold text-mata md:text-4xl">
            Categorias
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/cardapio?categoria=${c.slug}`}
              className="focus-ring flex flex-col items-center gap-2 rounded-3xl bg-areia p-6 text-center shadow-card transition hover:-translate-y-1 hover:shadow-soft"
            >
              <span className="text-4xl">{emojiByCategory[c.slug] ?? "🍽️"}</span>
              <span className="font-display text-sm font-bold text-mata">{c.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
