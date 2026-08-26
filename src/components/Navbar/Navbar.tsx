"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { getStoreStatus } from "@/lib/utils/hours";
import { buildWhatsAppLinkSimple } from "@/lib/whatsapp/buildMessage";

const links = [
  { href: "/", label: "Início" },
  { href: "/cardapio", label: "Cardápio" },
  { href: "/#sobre", label: "Sobre" },
  { href: "/#localizacao", label: "Localização" },
  { href: "/#contato", label: "Contato" },
];

export default function Navbar() {
  const { itemCount, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [status, setStatus] = useState<{ isOpen: boolean; label: string } | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setStatus(getStoreStatus());
    const id = setInterval(() => setStatus(getStoreStatus()), 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-300 ${
        scrolled ? "bg-areia/95 backdrop-blur shadow-soft" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-8">
        <Link href="/" className="flex items-center gap-2 font-display text-2xl font-extrabold text-mata">
          <span className="text-2xl">🍍</span>
          TROPI<span className="text-caju">MIX</span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="focus-ring text-sm font-semibold text-mata/80 transition hover:text-caju"
            >
              {l.label}
            </Link>
          ))}
          {status && (
            <span
              className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
                status.isOpen ? "bg-folha/15 text-folha-light" : "bg-caju/10 text-caju-dark"
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${status.isOpen ? "bg-folha" : "bg-caju"}`}
              />
              {status.label}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <a
            href={buildWhatsAppLinkSimple("Olá! Vim pelo site e quero fazer um pedido 🍍")}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring hidden rounded-full bg-mata px-5 py-2.5 text-sm font-bold text-areia transition hover:bg-mata-light md:inline-block"
          >
            Fazer pedido
          </a>
          <button
            onClick={openCart}
            aria-label="Abrir carrinho"
            className="focus-ring relative rounded-full border-2 border-mata/15 p-2.5 text-mata transition hover:border-caju hover:text-caju"
          >
            <ShoppingBag size={20} />
            {itemCount > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-caju text-[11px] font-bold text-white">
                {itemCount}
              </span>
            )}
          </button>
          <button
            className="focus-ring rounded-full border-2 border-mata/15 p-2.5 text-mata md:hidden"
            aria-label="Abrir menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="border-t border-mata/10 bg-areia px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="focus-ring text-base font-semibold text-mata"
              >
                {l.label}
              </Link>
            ))}
            {status && (
              <span className="text-sm font-bold text-mata/70">{status.label}</span>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
