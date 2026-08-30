import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import type { OrderInput } from "@/types";

export async function createOrder(
  order: OrderInput
): Promise<{ id: string }> {
  const supabase = getSupabaseBrowserClient();

  if (!supabase) {
    throw new Error("Supabase não está configurado.");
  }

  const { data, error } = await supabase.rpc("create_order_atomic", {
    p_customer_name: order.customer_name,
    p_customer_phone: order.customer_phone,
    p_order_type: order.order_type,
    p_address: order.address ?? null,
    p_complement: order.complement ?? null,
    p_reference: order.reference ?? null,
    p_payment_method: order.payment_method,
    p_change_for: order.change_for ?? null,
    p_notes: order.notes ?? null,

    // O servidor/banco usa somente product_id e quantity.
    p_items: order.items.map((item) => ({
      product_id: item.product_id,
      quantity: item.quantity,
    })),
  });

  if (error || !data) {
    console.error("Erro ao criar pedido:", error);

    throw new Error(
      error?.message || "Não foi possível criar o pedido."
    );
  }

  return {
    id: data,
  };
}