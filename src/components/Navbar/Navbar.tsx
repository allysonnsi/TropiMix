"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ShoppingBag, Menu, X, ArrowUpRight } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { getStoreStatus } from "@/lib/utils/hours";
import Brand from "@/components/ui/Brand";
const links = [
  { href: "/", label: "Início" },
  { href: "/cardapio", label: "Cardápio" },
  { href: "/#sobre", label: "Nossa casa" },
  { href: "/#localizacao", label: "Onde estamos" },
];
export default function Navbar() {
  const { itemCount, openCart } = useCart();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [status, setStatus] = useState<ReturnType<
    typeof getStoreStatus
  > | null>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    setStatus(getStoreStatus());
    const timer = setInterval(() => setStatus(getStoreStatus()), 60_000);
    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    if (!menuOpen) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [menuOpen]);
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
            aria-label={`Abrir carrinho, ${itemCount} itens. Meu pedido${itemCount}`}
          >
            <ShoppingBag size={19} />
            <span className="cart-label">Meu pedido</span>
            <span className="cart-count">{itemCount}</span>
          </button>
          <button
            ref={menuButton}
            className="icon-button mobile-menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <nav
          id="mobile-menu"
          className="mobile-menu tropi-container"
          aria-label="Menu móvel"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              aria-current={pathname === link.href ? "page" : undefined}
            >
              {link.label}
              <ArrowUpRight size={17} />
            </Link>
          ))}
          {status && (
            <p>
              {status.label} · {status.nextChange}
            </p>
          )}
        </nav>
      )}
    </header>
  );
}
