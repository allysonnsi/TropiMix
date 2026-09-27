"use client";
import { Plus, Check } from "lucide-react";
import type { Product } from "@/types";
import { formatBRL } from "@/lib/utils/format";
import { useCart } from "@/hooks/useCart";
import CategoryVisual from "@/components/ui/CategoryVisual";
export default function ProductCard({ product }: { product: Product }) {
  const { addItem, lastAdded } = useCart();
  const justAdded = lastAdded === product.id;
  return (
    <article
      className={`product-card ${!product.available ? "product-unavailable" : ""}`}
    >
      <CategoryVisual
        category={product.category_slug}
        image={product.image_url}
        name={product.name}
      />
      <div className="product-content">
        <div className="product-meta">
          <span>{product.category_slug.replaceAll("-", " ")}</span>
          {product.featured && (
            <span className="badge badge-highlight">Da casa</span>
          )}
          {!product.available && <span className="badge">Indisponível</span>}
        </div>
        <h3>{product.name}</h3>
        {product.description && (
          <p className="product-description">{product.description}</p>
        )}
        <div className="product-bottom">
          <strong className="product-price">{formatBRL(product.price)}</strong>
          <button
            className={`product-add ${justAdded ? "is-added" : ""}`}
            disabled={!product.available}
            onClick={() => addItem(product)}
            aria-label={`Adicionar ${product.name}`}
          >
            <span aria-live="polite">
              {justAdded ? "Adicionado" : "Adicionar"}
            </span>
            {justAdded ? <Check size={17} /> : <Plus size={17} />}
          </button>
        </div>
      </div>
    </article>
  );
}
