import type { OrderInput } from "@/types";
import { formatBRL } from "@/lib/utils/format";

export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5598985195882";

export function buildWhatsAppMessage(order: OrderInput): string {
  const lines: string[] = [];
  lines.push("🍍 NOVO PEDIDO — TROPI MIX");
  lines.push("");
  lines.push(`Cliente: ${order.customer_name}`);
  lines.push(`Telefone: ${order.customer_phone}`);
  lines.push("");
  lines.push("PEDIDO:");
  order.items.forEach((item) => {
    lines.push(`${item.quantity}x ${item.product_name} — ${formatBRL(item.subtotal)}`);
    if (item.notes) lines.push(`   obs: ${item.notes}`);
  });
  lines.push("");
  if (order.delivery_fee > 0) {
    lines.push(`Subtotal: ${formatBRL(order.subtotal)}`);
    lines.push(`Taxa de entrega: ${formatBRL(order.delivery_fee)}`);
  }
  lines.push(`Total: ${formatBRL(order.total)}`);
  lines.push("");
  lines.push(`Tipo: ${order.order_type === "retirada" ? "Retirada no local" : "Entrega"}`);
  if (order.order_type === "entrega") {
    lines.push(`Endereço: ${order.address ?? ""}`);
    if (order.complement) lines.push(`Complemento: ${order.complement}`);
    if (order.reference) lines.push(`Referência: ${order.reference}`);
  }
  const paymentLabel = { pix: "PIX", dinheiro: "Dinheiro", cartao: "Cartão" }[
    order.payment_method
  ];
  lines.push(`Pagamento: ${paymentLabel}`);
  if (order.payment_method === "dinheiro" && order.change_for) {
    lines.push(`Troco para: ${formatBRL(order.change_for)}`);
  }
  if (order.notes) {
    lines.push("");
    lines.push("Observação:");
    lines.push(order.notes);
  }
  lines.push("");
  lines.push("Local:");
  lines.push("Em frente ao Cartório de Ribamar");

  return lines.join("\n");
}

export function buildWhatsAppLink(order: OrderInput): string {
  const message = buildWhatsAppMessage(order);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function buildWhatsAppLinkSimple(text: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
