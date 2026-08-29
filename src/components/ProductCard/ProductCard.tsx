"use client";

import { motion } from "framer-motion";
import {
  Plus,
  Star,
  Check,
} from "lucide-react";

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

export default function ProductCard({
  product,
}: {
  product: Product;
}) {
  const { addItem, lastAdded } = useCart();

  const justAdded = lastAdded === product.id;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{
        once: true,
        margin: "-50px",
      }}
      whileHover={{
        y: -6,
      }}
      transition={{
        duration: 0.35,
      }}
      className={`group relative overflow-hidden rounded-[28px] bg-white shadow-card ring-1 ring-mata/5 ${
        !product.available ? "opacity-60" : ""
      }`}
    >
      {/* Image */}
      <div className="product-image-bg relative flex h-56 items-center justify-center overflow-hidden">
        <motion.div
          whileHover={{
            scale: 1.12,
            rotate: 3,
          }}
          transition={{
            duration: 0.35,
          }}
          className="text-8xl drop-shadow-xl"
        >
          {emojiByCategory[product.category_slug] ?? "🍽️"}
        </motion.div>

        {product.featured && (
          <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-caju px-3 py-1.5 text-[10px] font-black uppercase tracking-wide text-white shadow-lg">
            <Star size={12} fill="currentColor" />
            Destaque
          </span>
        )}

        {!product.available && (
          <span className="absolute right-4 top-4 rounded-full bg-mata px-3 py-1.5 text-[10px] font-black uppercase tracking-wide text-white">
            Indisponível
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex min-h-[185px] flex-col p-5">
        <h3 className="font-display text-xl font-black text-mata">
          {product.name}
        </h3>

        {product.description && (
          <p className="mt-2 line-clamp-2 text-sm leading-5 text-mata/55">
            {product.description}
          </p>
        )}

        <div className="mt-auto flex items-end justify-between gap-4 pt-6">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-mata/40">
              A partir de
            </span>

            <div className="font-display text-2xl font-black text-caju">
              {formatBRL(product.price)}
            </div>
          </div>

          <button
            disabled={!product.available}
            onClick={() => addItem(product)}
            aria-label={`Adicionar ${product.name}`}
            className={`focus-ring flex h-11 items-center gap-2 rounded-full px-4 text-sm font-black text-white transition ${
              justAdded
                ? "bg-folha"
                : "bg-mata hover:bg-caju"
            } disabled:cursor-not-allowed disabled:bg-mata/20`}
          >
            {justAdded ? (
              <>
                <Check size={17} />
                Adicionado
              </>
            ) : (
              <>
                <Plus size={17} />
                Adicionar
              </>
            )}
          </button>
        </div>
      </div>
    </motion.article>
  );
}