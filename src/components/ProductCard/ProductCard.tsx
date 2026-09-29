"use client";
import type { Product } from "@/types";
import { useCart } from "@/hooks/useCart";
import { MenuItemCard } from "@/components/ui/menu-item-card";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem, lastAdded } = useCart();
  return (
    <MenuItemCard
      name={product.name}
      category={product.category_slug}
      imageUrl={product.image_url}
      description={product.description}
      price={product.price}
      available={product.available}
      featured={product.featured}
      added={lastAdded === product.id}
      onAdd={() => addItem(product)}
    />
  );
}
