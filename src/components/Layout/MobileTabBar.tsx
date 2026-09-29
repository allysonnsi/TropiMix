"use client";
import { usePathname } from "next/navigation";
import { Home, UtensilsCrossed, ShoppingBag } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { Dock, type DockItem } from "@/components/ui/dock-two";

export default function MobileTabBar() {
  const pathname = usePathname();
  const { itemCount, openCart } = useCart();
  if (pathname.startsWith("/admin")) return null;
  const items: DockItem[] = [
    { href: "/", label: "Início", icon: Home, active: pathname === "/" },
    { href: "/cardapio", label: "Cardápio", icon: UtensilsCrossed, active: pathname === "/cardapio" },
    { label: "Meu pedido", icon: ShoppingBag, onClick: openCart, badge: itemCount, ariaLabel: `Abrir meu pedido, ${itemCount} itens` },
  ];
  return <div className="store-dock"><Dock items={items} /></div>;
}