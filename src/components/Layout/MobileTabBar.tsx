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
    <nav className="mobile-tabbar" aria-label="Atalhos da loja">
      {items.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          aria-current={pathname === href ? "page" : undefined}
        >
          <Icon size={20} strokeWidth={1.5} />
          {label}
        </Link>
      ))}
      <button onClick={openCart} aria-label={`Carrinho, ${itemCount} itens`}>
        <ShoppingBag size={20} strokeWidth={1.5} />
        Carrinho
        {itemCount > 0 && <span className="tab-count">{itemCount}</span>}
      </button>
    </nav>
  );
}
