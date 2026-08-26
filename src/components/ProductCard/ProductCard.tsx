"use client";

import { motion } from "framer-motion";
import { Plus, Star } from "lucide-react";
import type { Product } from "@/types";
import { formatBRL } from "@/lib/utils/format";
import { useCart } from "@/hooks/useCart";

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

export default function ProductCard({ product }: { product: Product }) {
  const { addItem, lastAdded } = useCart();
  const justAdded = lastAdded === product.id;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35 }}
      className={`group relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-mata/5 transition ${
        !product.available ? "opacity-60" : "hover:-translate-y-1 hover:shadow-soft"
      }`}
    >
      <div className="relative flex h-36 items-center justify-center bg-gradient-to-br from-casca to-milho/20 text-6xl">
        {emojiByCategory[product.category_slug] ?? "🍽️"}
        {product.featured && (
          <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-caju px-2.5 py-1 text-[11px] font-bold text-white">
            <Star size={11} fill="white" /> Destaque
          </span>
        )}
        {!product.available && (
          <span className="absolute right-3 top-3 rounded-full bg-mata/80 px-2.5 py-1 text-[11px] font-bold text-white">
            Indisponível
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1 p-4">
        <h3 className="font-display text-lg font-bold text-mata">{product.name}</h3>
        {product.description && (
          <p className="text-sm text-mata/60">{product.description}</p>
        )}
        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="font-display text-xl font-extrabold text-caju">
            {formatBRL(product.price)}
          </span>
          <button
            disabled={!product.available}
            onClick={() => addItem(product)}
            aria-label={`Adicionar ${product.name}`}
            className={`focus-ring flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold text-white transition disabled:cursor-not-allowed disabled:bg-mata/20 ${
              justAdded ? "scale-95 bg-folha" : "bg-mata hover:bg-mata-light"
            }`}
          >
            <Plus size={16} />
            {justAdded ? "Adicionado" : "Adicionar"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
