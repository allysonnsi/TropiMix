"use client";
import { useState } from "react";
import { getFoodIllustration } from "./foodImages";
import {
  Cherry,
  Citrus,
  Coffee,
  CookingPot,
  GlassWater,
  Sandwich,
  UtensilsCrossed,
  Wheat,
} from "lucide-react";
const visuals = {
  tapiocas: CookingPot,
  cuscuz: Wheat,
  misto: Sandwich,
  pastel: UtensilsCrossed,
  "abacaxi-temperado": Citrus,
  bebidas: Coffee,
  acai: Cherry,
  "sucos-naturais": GlassWater,
};
export default function CategoryVisual({
  category,
  image,
  name,
  compact = false,
}: {
  category: string;
  image?: string | null;
  name: string;
  compact?: boolean;
}) {
  const [failedSources, setFailedSources] = useState<string[]>([]);
  const illustration = getFoodIllustration(name);
  const source = image && !failedSources.includes(image) ? image : illustration;
  const Icon = visuals[category as keyof typeof visuals] ?? UtensilsCrossed;
  return (
    <div
      className={`category-visual category-visual--${category} ${compact ? "category-visual--compact" : ""}`}
    >
      {source && !failedSources.includes(source) ? (
        <img
          src={source}
          alt={source === illustration ? `${name}, imagem ilustrativa` : name}
          loading="lazy"
          decoding="async"
          width={800}
          height={800}
          onError={() => setFailedSources((failed) => [...failed, source])}
        />
      ) : (
        <>
          <span className="category-orbit" aria-hidden="true" />
          <Icon strokeWidth={1.1} aria-hidden="true" />
          <span className="sr-only">{name}, sem foto cadastrada</span>
        </>
      )}
    </div>
  );
}
