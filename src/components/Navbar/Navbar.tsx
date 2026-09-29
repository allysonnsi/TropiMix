"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { getStoreStatus } from "@/lib/utils/hours";
import Brand from "@/components/ui/Brand";
const links = [
  { href: "/cardapio", label: "Cardápio" },
  { href: "/#sobre", label: "Nossa casa" },
  { href: "/#localizacao", label: "Onde estamos" },
];
export default function Navbar() {
  const { itemCount, openCart } = useCart();
  const pathname = usePathname();
  const [status, setStatus] = useState<ReturnType<
    typeof getStoreStatus
  > | null>(null);
  useEffect(() => {
    setStatus(getStoreStatus());
    const timer = setInterval(() => setStatus(getStoreStatus()), 60_000);
    return () => clearInterval(timer);
  }, []);
  return (
    <header className="site-header">
      <div className="tropi-container nav-shell">
        <Brand />
        <nav className="desktop-nav" aria-label="Navegação principal">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="nav-actions">
          {status && (
            <span
              className={`store-status ${status.isOpen ? "is-open" : "is-closed"}`}
            >
              <i aria-hidden="true" />
              {status.label}
            </span>
          )}
          <button
            className="cart-trigger"
            onClick={openCart}
            aria-label={`Abrir meu pedido, ${itemCount} itens`}
          >
            <ShoppingBag size={19} />
            <span className="cart-label">Meu pedido</span>
            <span className="cart-count">{itemCount}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
