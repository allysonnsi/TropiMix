import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import type { OrderInput } from "@/types";

/**
 * Cria um pedido no Supabase.
 *
 * O ID é gerado no cliente antes do INSERT para que o visitante
 * não precise ter permissão de SELECT na tabela orders.
 */
export async function createOrder(order: OrderInput): Promise<{ id: string }> {
  const supabase = getSupabaseBrowserClient();

  // Mantém o comportamento de demonstração caso o Supabase
  // ainda não esteja configurado.
  if (!supabase) {
    return { id: `demo-${Date.now()}` };
  }

  // Gera o UUID antes de inserir.
  // A coluna orders.id é do tipo uuid.
  const orderId = crypto.randomUUID();

  const { error: orderError } = await supabase
    .from("orders")
    .insert({
      id: orderId,
      customer_name: order.customer_name,
      customer_phone: order.customer_phone,
      order_type: order.order_type,
      address: order.address ?? null,
      complement: order.complement ?? null,
      reference: order.reference ?? null,
      payment_method: order.payment_method,
      change_for: order.change_for ?? null,
      notes: order.notes ?? null,
      subtotal: order.subtotal,
      delivery_fee: order.delivery_fee,
      total: order.total,
      status: "novo",
    });

  // Se o pedido não puder ser salvo, interrompe o fluxo.
  if (orderError) {
    console.error("Erro ao criar pedido no Supabase:", orderError);
    throw new Error(
      orderError.message || "Não foi possível salvar o pedido."
    );
  }

  // Prepara os itens do pedido usando o mesmo UUID.
  const items = order.items.map((item) => ({
    order_id: orderId,
    product_id: item.product_id,
    product_name: item.product_name,
    quantity: item.quantity,
    unit_price: item.unit_price,
    subtotal: item.subtotal,
  }));

  // Salva os itens.
  if (items.length > 0) {
    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(items);

    if (itemsError) {
      console.error(
        "Erro ao salvar itens do pedido no Supabase:",
        itemsError
      );

      throw new Error(
        itemsError.message || "Não foi possível salvar os itens do pedido."
      );
    }
  }

  return { id: orderId };
}