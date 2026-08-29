"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ShoppingBag,
  Menu,
  X,
  MapPin,
  Clock3,
} from "lucide-react";

import { useCart } from "@/hooks/useCart";
import { getStoreStatus } from "@/lib/utils/hours";
import { buildWhatsAppLinkSimple } from "@/lib/whatsapp/buildMessage";

const links = [
  { href: "/", label: "Início" },
  { href: "/cardapio", label: "Cardápio" },
  { href: "/#sobre", label: "Sobre" },
  { href: "/#localizacao", label: "Localização" },
];

export default function Navbar() {
  const { itemCount, openCart } = useCart();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [status, setStatus] = useState<{
    isOpen: boolean;
    label: string;
  } | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    onScroll();

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    setStatus(getStoreStatus());

    const interval = setInterval(() => {
      setStatus(getStoreStatus());
    }, 60_000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-mata/10 bg-areia/90 shadow-soft backdrop-blur-xl"
            : "bg-areia/80 backdrop-blur-md"
        }`}
      >
        <nav className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-4 md:px-8">
          {/* Logo */}
          <Link
            href="/"
            className="focus-ring group flex items-center gap-2"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-milho/20 text-2xl transition-transform duration-300 group-hover:rotate-6">
              🥭
            </div>

            <div className="leading-none">
              <div className="font-display text-xl font-black tracking-tight text-mata">
                TROPI<span className="text-caju">MIX</span>
              </div>

              <div className="mt-1 hidden text-[9px] font-bold uppercase tracking-[0.2em] text-mata/50 sm:block">
                Sabor que você ama
              </div>
            </div>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden items-center gap-8 lg:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="focus-ring relative text-sm font-bold text-mata/70 transition hover:text-caju"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {status && (
              <div
                className={`hidden items-center gap-2 rounded-full px-4 py-2 text-xs font-bold xl:flex ${
                  status.isOpen
                    ? "bg-folha/10 text-folha"
                    : "bg-caju/10 text-caju-dark"
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${
                    status.isOpen ? "bg-folha" : "bg-caju"
                  }`}
                />

                {status.label}
              </div>
            )}

            <a
              href={buildWhatsAppLinkSimple(
                "Olá! Vim pelo site e quero fazer um pedido 🍍"
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring hidden rounded-full bg-mata px-5 py-3 text-sm font-extrabold text-areia transition hover:-translate-y-0.5 hover:bg-mata-light md:block"
            >
              Pedir agora
            </a>

            <button
              onClick={openCart}
              aria-label="Abrir carrinho"
              className="focus-ring relative flex h-11 w-11 items-center justify-center rounded-full border border-mata/15 bg-white text-mata transition hover:border-caju hover:text-caju"
            >
              <ShoppingBag size={19} />

              {itemCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-caju px-1 text-[10px] font-black text-white">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Mobile menu */}
            <button
              onClick={() => setMenuOpen((value) => !value)}
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              className="focus-ring flex h-11 w-11 items-center justify-center rounded-full border border-mata/15 bg-white text-mata md:hidden"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="border-t border-mata/10 bg-areia px-4 py-5 shadow-lg md:hidden">
            <div className="mx-auto flex max-w-7xl flex-col gap-2">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="focus-ring rounded-2xl px-4 py-3 font-bold text-mata transition hover:bg-white"
                >
                  {link.label}
                </Link>
              ))}

              {status && (
                <div className="mt-2 flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-bold text-mata">
                  <Clock3 size={17} />
                  {status.label}
                </div>
              )}

              <div className="flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-bold text-mata/70">
                <MapPin size={17} />
                Em frente ao Cartório de Ribamar
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
