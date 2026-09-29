"use client";
import { forwardRef } from "react";
import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { Check, Plus } from "lucide-react";
import { formatBRL } from "@/lib/utils/format";
import CategoryVisual from "./CategoryVisual";
import styles from "./menu-item-card.module.css";

export interface MenuItemCardProps extends Omit<HTMLMotionProps<"article">, "children"> {
  name: string;
  imageUrl?: string | null;
  category: string;
  description?: string | null;
  price: number | null;
  available?: boolean;
  featured?: boolean;
  added?: boolean;
  onAdd: () => void;
}

export const MenuItemCard = forwardRef<HTMLElement, MenuItemCardProps>(
  function MenuItemCard({ name, imageUrl, category, description, price, available = true, featured = false, added = false, onAdd, className, ...props }, ref) {
    const reducedMotion = useReducedMotion();
    return (
      <motion.article {...props} ref={ref}
        className={[styles.card, !available && styles.unavailable, className].filter(Boolean).join(" ")}
        initial={false}
        whileHover={reducedMotion ? undefined : { y: -3 }}
        transition={{ duration: 0.2 }}>
        <div className={styles.media}>
          <CategoryVisual category={category} image={imageUrl} name={name} />
          {(!available || featured) && <span className={styles.badge}>{available ? "Da casa" : "Indisponível"}</span>}
          <motion.button type="button" className={styles.add} disabled={!available}
            whileTap={reducedMotion ? undefined : { scale: 0.96 }} onClick={onAdd}
            aria-label={`Adicionar ${name} ao pedido`}>
            {added ? <Check size={17} aria-hidden="true" /> : <Plus size={17} aria-hidden="true" />}
            <span aria-live="polite">{!available ? "Indisponível" : added ? "Adicionado" : "Adicionar"}</span>
          </motion.button>
        </div>
        <div className={styles.content}>
          <strong className={styles.price}>{formatBRL(price)}</strong>
          <h3 className={styles.name}>{name}</h3>
          {description && <p className={styles.description}>{description}</p>}
          <span className={styles.category}>{category === "acai" ? "Açaí" : category.replaceAll("-", " ")}</span>
        </div>
      </motion.article>
    );
  }
);
