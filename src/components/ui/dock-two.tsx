"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import styles from "./dock-two.module.css";

export interface DockItem {
  icon: LucideIcon;
  label: string;
  href?: string;
  onClick?: () => void;
  active?: boolean;
  badge?: number;
  ariaLabel?: string;
}

export function Dock({ items, label = "Atalhos da loja" }: { items: DockItem[]; label?: string }) {
  return (
    <nav className={styles.dock} aria-label={label}>
      {items.map(({ icon: Icon, label: text, href, onClick, active, badge, ariaLabel }) => {
        const content = <>
          <span className={styles.icon}>
            <Icon size={22} strokeWidth={1.7} aria-hidden="true" />
            {!!badge && <span className={styles.badge} aria-hidden="true">{badge > 99 ? "99+" : badge}</span>}
          </span>
          <span className={styles.label}>{text}</span>
        </>;
        return href ? (
          <Link key={text} href={href} className={styles.item} aria-label={ariaLabel} aria-current={active ? "page" : undefined} onClick={onClick}>
            {content}
          </Link>
        ) : (
          <button key={text} type="button" className={styles.item} onClick={onClick} aria-label={ariaLabel ?? text}>
            {content}
          </button>
        );
      })}
    </nav>
  );
}