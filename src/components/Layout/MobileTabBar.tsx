"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, UtensilsCrossed, ShoppingBag, MapPin } from "lucide-react";
import { useCart } from "@/hooks/useCart";

export default function MobileTabBar() {
  const pathname = usePathname();
  const { itemCount, openCart } = useCart();

  if (pathname.startsWith("/admin")) return null;

  const items = [
    { href: "/", label: "Início", icon: Home },
    { href: "/cardapio", label: "Cardápio", icon: UtensilsCrossed },
    { href: "/#localizacao", label: "Local", icon: MapPin },
  ];

  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 flex items-stretch justify-around border-t border-mata/10 bg-white/95 backdrop-blur md:hidden">
      {items.map(({ href, label, icon: Icon }) => {
        const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={`focus-ring flex flex-1 flex-col items-center gap-0.5 py-2.5 text-[11px] font-bold ${
              active ? "text-caju" : "text-mata/50"
            }`}
          >
            <Icon size={20} />
            {label}
          </Link>
        );
      })}
      <button
        onClick={openCart}
        className="focus-ring relative flex flex-1 flex-col items-center gap-0.5 py-2.5 text-[11px] font-bold text-mata/50"
      >
        <ShoppingBag size={20} />
        Carrinho
        {itemCount > 0 && (
          <span className="absolute right-6 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-caju text-[9px] font-bold text-white">
            {itemCount}
          </span>
        )}
      </button>
    </nav>
  );
}
