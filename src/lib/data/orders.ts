import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import type { OrderInput } from "@/types";

/**
 * Cria o pedido no Supabase (tabelas `orders` + `order_items`) quando o
 * projeto esta conectado. Se o Supabase ainda nao foi configurado, gera um
 * id local para nao travar o fluxo de checkout/WhatsApp em ambiente de
 * demonstracao.
 */
export async function createOrder(order: OrderInput): Promise<{ id: string }> {
  const supabase = getSupabaseBrowserClient();

  if (!supabase) {
    return { id: `demo-${Date.now()}` };
  }

  const { data: orderRow, error: orderError } = await supabase
    .from("orders")
    .insert({
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
    })
    .select("id")
    .single();

  if (orderError || !orderRow) {
    console.error("Erro ao criar pedido no Supabase:", orderError);
    return { id: `demo-${Date.now()}` };
  }

  const items = order.items.map((item) => ({
    order_id: orderRow.id,
    product_id: item.product_id,
    product_name: item.product_name,
    quantity: item.quantity,
    unit_price: item.unit_price,
    subtotal: item.subtotal,
  }));

  const { error: itemsError } = await supabase.from("order_items").insert(items);
  if (itemsError) {
    console.error("Erro ao salvar itens do pedido:", itemsError);
  }

  return { id: orderRow.id };
}
