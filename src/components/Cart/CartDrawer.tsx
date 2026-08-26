"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, Trash2, X } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { formatBRL } from "@/lib/utils/format";

export default function CartDrawer() {
  const { items, isOpen, closeCart, increment, decrement, removeItem, subtotal, itemCount } =
    useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-50 bg-mata/50 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-areia shadow-soft"
          >
            <div className="flex items-center justify-between border-b border-mata/10 px-5 py-4">
              <h2 className="font-display text-xl font-bold text-mata">
                Seu carrinho {itemCount > 0 && `(${itemCount})`}
              </h2>
              <button
                onClick={closeCart}
                aria-label="Fechar carrinho"
                className="focus-ring rounded-full p-2 text-mata hover:bg-mata/5"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center text-mata/50">
                  <span className="mb-3 text-4xl">🛒</span>
                  <p>Seu carrinho está vazio.</p>
                  <p className="text-sm">Adicione itens do cardápio para começar.</p>
                </div>
              ) : (
                <ul className="flex flex-col gap-4">
                  {items.map((item) => (
                    <li key={item.product.id} className="flex gap-3 rounded-2xl bg-white p-3 shadow-card">
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-casca text-3xl">
                        🍽️
                      </div>
                      <div className="flex flex-1 flex-col gap-1">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-bold text-mata">{item.product.name}</p>
                          <button
                            onClick={() => removeItem(item.product.id)}
                            aria-label={`Remover ${item.product.name}`}
                            className="focus-ring text-mata/30 hover:text-caju"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <span className="text-xs text-mata/50">
                          {formatBRL(item.product.price)} un.
                        </span>
                        <div className="mt-1 flex items-center gap-3">
                          <button
                            onClick={() => decrement(item.product.id)}
                            aria-label="Diminuir quantidade"
                            className="focus-ring rounded-full bg-areia p-1.5 text-mata hover:bg-milho/30"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-5 text-center text-sm font-bold">{item.quantity}</span>
                          <button
                            onClick={() => increment(item.product.id)}
                            aria-label="Aumentar quantidade"
                            className="focus-ring rounded-full bg-areia p-1.5 text-mata hover:bg-milho/30"
                          >
                            <Plus size={14} />
                          </button>
                          <span className="ml-auto font-display text-sm font-bold text-caju">
                            {formatBRL((item.product.price ?? 0) * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-mata/10 px-5 py-4">
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-semibold text-mata/70">Subtotal</span>
                  <span className="font-display text-xl font-extrabold text-mata">
                    {formatBRL(subtotal)}
                  </span>
                </div>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="focus-ring block rounded-full bg-caju py-3.5 text-center text-sm font-bold text-white shadow-soft transition hover:bg-caju-dark"
                >
                  Finalizar pedido
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
