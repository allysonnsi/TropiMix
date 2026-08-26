"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Bike, Store } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { formatBRL, formatPhoneBR } from "@/lib/utils/format";
import { createOrder } from "@/lib/data/orders";
import { buildWhatsAppLink } from "@/lib/whatsapp/buildMessage";
import type { OrderInput, OrderType, PaymentMethod } from "@/types";

const DELIVERY_FEE = 5;

export default function CheckoutForm() {
  const router = useRouter();
  const { items, subtotal, clear } = useCart();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [orderType, setOrderType] = useState<OrderType>("retirada");
  const [address, setAddress] = useState("");
  const [complement, setComplement] = useState("");
  const [reference, setReference] = useState("");
  const [payment, setPayment] = useState<PaymentMethod>("pix");
  const [changeFor, setChangeFor] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deliveryFee = orderType === "entrega" ? DELIVERY_FEE : 0;
  const total = subtotal + deliveryFee;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (items.length === 0) {
      setError("Seu carrinho está vazio. Adicione itens do cardápio antes de continuar.");
      return;
    }
    if (!name.trim() || !phone.trim()) {
      setError("Preencha seu nome e telefone para continuar.");
      return;
    }
    if (orderType === "entrega" && !address.trim()) {
      setError("Informe o endereço de entrega.");
      return;
    }

    setSubmitting(true);

    const order: OrderInput = {
      customer_name: name.trim(),
      customer_phone: phone.trim(),
      order_type: orderType,
      address: orderType === "entrega" ? address.trim() : undefined,
      complement: complement.trim() || undefined,
      reference: reference.trim() || undefined,
      payment_method: payment,
      change_for: payment === "dinheiro" && changeFor ? Number(changeFor) : null,
      notes: notes.trim() || undefined,
      items: items.map((i) => ({
        product_id: i.product.id,
        product_name: i.product.name,
        quantity: i.quantity,
        unit_price: i.product.price ?? 0,
        subtotal: (i.product.price ?? 0) * i.quantity,
        notes: i.notes,
      })),
      subtotal,
      delivery_fee: deliveryFee,
      total,
    };

    try {
      await createOrder(order);
      const whatsappLink = buildWhatsAppLink(order);
      clear();
      window.open(whatsappLink, "_blank", "noopener,noreferrer");
      router.push("/pedido/confirmado");
    } catch (err) {
      console.error(err);
      setError("Não foi possível enviar o pedido agora. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
      <div className="flex flex-col gap-6">
        <fieldset className="rounded-3xl bg-white p-6 shadow-card">
          <legend className="mb-4 font-display text-lg font-bold text-mata">Seus dados</legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1 text-sm font-semibold text-mata/70">
              Nome
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="focus-ring rounded-xl border-2 border-mata/10 px-4 py-2.5 text-mata"
                placeholder="Seu nome completo"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm font-semibold text-mata/70">
              Telefone
              <input
                required
                value={phone}
                onChange={(e) => setPhone(formatPhoneBR(e.target.value))}
                className="focus-ring rounded-xl border-2 border-mata/10 px-4 py-2.5 text-mata"
                placeholder="(98) 90000-0000"
              />
            </label>
          </div>
        </fieldset>

        <fieldset className="rounded-3xl bg-white p-6 shadow-card">
          <legend className="mb-4 font-display text-lg font-bold text-mata">
            Tipo do pedido
          </legend>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setOrderType("retirada")}
              className={`focus-ring flex flex-col items-center gap-2 rounded-2xl border-2 p-4 text-sm font-bold transition ${
                orderType === "retirada"
                  ? "border-caju bg-caju/5 text-caju"
                  : "border-mata/10 text-mata/60"
              }`}
            >
              <Store size={22} /> Retirar no local
            </button>
            <button
              type="button"
              onClick={() => setOrderType("entrega")}
              className={`focus-ring flex flex-col items-center gap-2 rounded-2xl border-2 p-4 text-sm font-bold transition ${
                orderType === "entrega"
                  ? "border-caju bg-caju/5 text-caju"
                  : "border-mata/10 text-mata/60"
              }`}
            >
              <Bike size={22} /> Entrega
            </button>
          </div>

          {orderType === "entrega" && (
            <div className="mt-4 grid gap-4">
              <label className="flex flex-col gap-1 text-sm font-semibold text-mata/70">
                Endereço
                <input
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="focus-ring rounded-xl border-2 border-mata/10 px-4 py-2.5 text-mata"
                  placeholder="Rua, número, bairro"
                />
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-1 text-sm font-semibold text-mata/70">
                  Complemento
                  <input
                    value={complement}
                    onChange={(e) => setComplement(e.target.value)}
                    className="focus-ring rounded-xl border-2 border-mata/10 px-4 py-2.5 text-mata"
                    placeholder="Apto, bloco..."
                  />
                </label>
                <label className="flex flex-col gap-1 text-sm font-semibold text-mata/70">
                  Ponto de referência
                  <input
                    value={reference}
                    onChange={(e) => setReference(e.target.value)}
                    className="focus-ring rounded-xl border-2 border-mata/10 px-4 py-2.5 text-mata"
                    placeholder="Próximo a..."
                  />
                </label>
              </div>
            </div>
          )}
        </fieldset>

        <fieldset className="rounded-3xl bg-white p-6 shadow-card">
          <legend className="mb-4 font-display text-lg font-bold text-mata">Pagamento</legend>
          <div className="grid grid-cols-3 gap-3">
            {(["pix", "dinheiro", "cartao"] as PaymentMethod[]).map((method) => (
              <button
                key={method}
                type="button"
                onClick={() => setPayment(method)}
                className={`focus-ring rounded-2xl border-2 p-3 text-sm font-bold capitalize transition ${
                  payment === method
                    ? "border-caju bg-caju/5 text-caju"
                    : "border-mata/10 text-mata/60"
                }`}
              >
                {method}
              </button>
            ))}
          </div>
          {payment === "dinheiro" && (
            <label className="mt-4 flex flex-col gap-1 text-sm font-semibold text-mata/70">
              Troco para quanto?
              <input
                value={changeFor}
                onChange={(e) => setChangeFor(e.target.value.replace(/[^0-9.]/g, ""))}
                className="focus-ring rounded-xl border-2 border-mata/10 px-4 py-2.5 text-mata"
                placeholder="Ex: 50"
              />
            </label>
          )}
        </fieldset>

        <fieldset className="rounded-3xl bg-white p-6 shadow-card">
          <legend className="mb-4 font-display text-lg font-bold text-mata">Observações</legend>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className="focus-ring w-full rounded-xl border-2 border-mata/10 px-4 py-2.5 text-mata"
            placeholder="Ex: sem cebola, ponto da tapioca, etc."
          />
        </fieldset>
      </div>

      <aside className="h-fit rounded-3xl bg-white p-6 shadow-card lg:sticky lg:top-24">
        <h2 className="mb-4 font-display text-lg font-bold text-mata">Resumo do pedido</h2>
        <ul className="mb-4 flex flex-col gap-2 text-sm text-mata/70">
          {items.map((i) => (
            <li key={i.product.id} className="flex justify-between">
              <span>
                {i.quantity}x {i.product.name}
              </span>
              <span>{formatBRL((i.product.price ?? 0) * i.quantity)}</span>
            </li>
          ))}
        </ul>
        <div className="flex flex-col gap-1 border-t border-mata/10 pt-4 text-sm">
          <div className="flex justify-between text-mata/70">
            <span>Subtotal</span>
            <span>{formatBRL(subtotal)}</span>
          </div>
          {deliveryFee > 0 && (
            <div className="flex justify-between text-mata/70">
              <span>Taxa de entrega</span>
              <span>{formatBRL(deliveryFee)}</span>
            </div>
          )}
          <div className="mt-1 flex justify-between font-display text-lg font-extrabold text-mata">
            <span>Total</span>
            <span>{formatBRL(total)}</span>
          </div>
        </div>

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 rounded-xl bg-caju/10 p-3 text-sm font-semibold text-caju-dark"
          >
            {error}
          </motion.p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="focus-ring mt-5 w-full rounded-full bg-folha py-3.5 text-sm font-bold text-white shadow-soft transition hover:bg-folha-light disabled:opacity-60"
        >
          {submitting ? "Enviando..." : "Enviar pedido pelo WhatsApp"}
        </button>
      </aside>
    </form>
  );
}
