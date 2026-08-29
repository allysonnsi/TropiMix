"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

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
    <section className="bg-mata py-20 text-areia">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <span className="text-xs font-black uppercase tracking-[0.2em] text-milho">
              Escolha seu favorito
            </span>

            <h2 className="mt-2 font-display text-4xl font-black md:text-5xl">
              Explore o cardápio
            </h2>
          </div>

          <Link
            href="/cardapio"
            className="focus-ring inline-flex w-fit items-center gap-2 rounded-full border border-areia/20 px-5 py-3 text-sm font-bold text-areia transition hover:border-milho hover:text-milho"
          >
            Ver tudo
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4 [scrollbar-width:none]">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/cardapio?categoria=${category.slug}`}
              className="focus-ring group min-w-[150px] rounded-[24px] border border-areia/10 bg-white/5 p-5 text-center transition duration-300 hover:-translate-y-1 hover:border-milho/40 hover:bg-white/10"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-areia text-4xl transition duration-300 group-hover:scale-110">
                {emojiByCategory[category.slug] ?? "🍽️"}
              </div>

              <p className="mt-4 font-display text-sm font-black">
                {category.name}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}