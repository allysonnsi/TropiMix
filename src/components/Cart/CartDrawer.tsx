"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { Minus, Plus, ShoppingBag, Trash2, X, ArrowRight } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { formatBRL } from "@/lib/utils/format";
import { EmptyState } from "@/components/ui/Primitives";
import CategoryVisual from "@/components/ui/CategoryVisual";
export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    increment,
    decrement,
    removeItem,
    subtotal,
    itemCount,
  } = useCart();
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    if (!isOpen) {
      if (element.open) element.close();
      return;
    }
    const trigger = document.activeElement as HTMLElement | null;
    element.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
      if (element.open) element.close();
      trigger?.focus();
    };
  }, [isOpen]);
  return (
    <dialog
      ref={dialog}
      className="cart-dialog"
      aria-labelledby="cart-title"
      onCancel={(e) => {
        e.preventDefault();
        closeCart();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          const box = e.currentTarget.getBoundingClientRect();
          if (
            e.clientX < box.left ||
            e.clientX > box.right ||
            e.clientY < box.top ||
            e.clientY > box.bottom
          )
            closeCart();
        }
      }}
    >
      <div className="cart-panel">
        <header className="cart-header">
          <div>
            <p className="eyebrow">Quase na mesa</p>
            <h2 id="cart-title">
              Seu pedido <span>({itemCount})</span>
            </h2>
          </div>
          <button
            className="icon-button"
            onClick={closeCart}
            aria-label="Fechar carrinho"
          >
            <X size={21} />
          </button>
        </header>
        <div className="cart-items">
          {items.length === 0 ? (
            <EmptyState
              icon={ShoppingBag}
              title="Sua próxima pausa começa aqui"
              description="Escolha algo do cardápio para montar seu pedido."
            >
              <Link
                href="/cardapio"
                className="ui-button ui-button--primary"
                onClick={closeCart}
              >
                Explorar cardápio
                <ArrowRight size={17} />
              </Link>
            </EmptyState>
          ) : (
            <ul>
              {items.map((item) => (
                <li className="cart-item" key={item.product.id}>
                  <CategoryVisual
                    category={item.product.category_slug}
                    image={item.product.image_url}
                    name={item.product.name}
                    compact
                  />
                  <div className="cart-item-content">
                    <div className="cart-item-title">
                      <h3>{item.product.name}</h3>
                      <button
                        className="icon-button"
                        aria-label={`Remover ${item.product.name}`}
                        onClick={() => removeItem(item.product.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <p>{formatBRL(item.product.price)} por unidade</p>
                    <div className="cart-item-bottom">
                      <div className="quantity-control">
                        <button
                          onClick={() => decrement(item.product.id)}
                          aria-label={`Diminuir quantidade de ${item.product.name}`}
                        >
                          <Minus size={15} />
                        </button>
                        <span aria-live="polite">{item.quantity}</span>
                        <button
                          onClick={() => increment(item.product.id)}
                          aria-label={`Aumentar quantidade de ${item.product.name}`}
                        >
                          <Plus size={15} />
                        </button>
                      </div>
                      <strong>
                        {formatBRL((item.product.price ?? 0) * item.quantity)}
                      </strong>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        {items.length > 0 && (
          <footer className="cart-summary">
            <div>
              <span>Subtotal</span>
              <strong>{formatBRL(subtotal)}</strong>
            </div>
            <p>Entrega e observações na próxima etapa.</p>
            <Link
              className="ui-button ui-button--primary"
              href="/checkout"
              onClick={closeCart}
            >
              Continuar pedido
              <ArrowRight size={18} />
            </Link>
            <button className="text-link" onClick={closeCart}>
              Continuar escolhendo
            </button>
          </footer>
        )}
      </div>
    </dialog>
  );
}
