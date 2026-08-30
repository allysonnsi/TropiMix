import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import type { OrderInput } from "@/types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

function getServerSupabase() {
  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

export async function POST(request: Request) {
  try {
    const supabase = getServerSupabase();

    if (!supabase) {
      return NextResponse.json(
        { error: "Supabase não configurado." },
        { status: 500 }
      );
    }

    const body = (await request.json()) as OrderInput;

    if (!body.customer_name?.trim()) {
      return NextResponse.json(
        { error: "Nome do cliente é obrigatório." },
        { status: 400 }
      );
    }

    if (!body.customer_phone?.trim()) {
      return NextResponse.json(
        { error: "Telefone do cliente é obrigatório." },
        { status: 400 }
      );
    }

    if (!Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json(
        { error: "O pedido precisa ter pelo menos um produto." },
        { status: 400 }
      );
    }

    // Impede quantidades absurdas.
    for (const item of body.items) {
      if (
        !item.product_id ||
        !Number.isInteger(item.quantity) ||
        item.quantity < 1 ||
        item.quantity > 50
      ) {
        return NextResponse.json(
          { error: "Quantidade de produto inválida." },
          { status: 400 }
        );
      }
    }

    const productIds = [
      ...new Set(body.items.map((item) => item.product_id)),
    ];

    // Busca os produtos diretamente do banco.
    const { data: products, error: productsError } = await supabase
      .from("products")
      .select("id, name, price, available")
      .in("id", productIds);

    if (productsError) {
      console.error("Erro ao consultar produtos:", productsError);

      return NextResponse.json(
        { error: "Não foi possível validar os produtos." },
        { status: 500 }
      );
    }

    if (!products || products.length !== productIds.length) {
      return NextResponse.json(
        { error: "Um ou mais produtos não existem." },
        { status: 400 }
      );
    }

    const productMap = new Map(
      products.map((product) => [product.id, product])
    );

    // Recalcula o subtotal usando os preços reais do banco.
    let subtotal = 0;

    const items = [];

    for (const item of body.items) {
      const product = productMap.get(item.product_id);

      if (!product) {
        return NextResponse.json(
          { error: "Produto não encontrado." },
          { status: 400 }
        );
      }

      if (!product.available) {
        return NextResponse.json(
          { error: `O produto "${product.name}" está indisponível.` },
          { status: 400 }
        );
      }

      if (product.price === null || product.price === undefined) {
        return NextResponse.json(
          { error: `O produto "${product.name}" não possui preço definido.` },
          { status: 400 }
        );
      }

      const unitPrice = Number(product.price);
      const itemSubtotal = unitPrice * item.quantity;

      subtotal += itemSubtotal;

      items.push({
        product_id: product.id,
        product_name: product.name,
        quantity: item.quantity,
        unit_price: unitPrice,
        subtotal: itemSubtotal,
      });
    }

    // NÃO usamos delivery_fee, subtotal ou total enviados pelo navegador.
    // O servidor calcula novamente.
    const deliveryFee =
      body.order_type === "entrega" ? 5 : 0;

    const total = subtotal + deliveryFee;

    // Validação do tipo de pedido.
    if (!["retirada", "entrega"].includes(body.order_type)) {
      return NextResponse.json(
        { error: "Tipo de pedido inválido." },
        { status: 400 }
      );
    }

    if (!["pix", "dinheiro", "cartao"].includes(body.payment_method)) {
      return NextResponse.json(
        { error: "Forma de pagamento inválida." },
        { status: 400 }
      );
    }

    if (
      body.order_type === "entrega" &&
      !body.address?.trim()
    ) {
      return NextResponse.json(
        { error: "Endereço é obrigatório para entrega." },
        { status: 400 }
      );
    }

    const orderId = crypto.randomUUID();

    // Salva o pedido com os valores calculados pelo servidor.
    const { error: orderError } = await supabase
      .from("orders")
      .insert({
        id: orderId,
        customer_name: body.customer_name.trim(),
        customer_phone: body.customer_phone.trim(),
        order_type: body.order_type,
        address: body.address?.trim() || null,
        complement: body.complement?.trim() || null,
        reference: body.reference?.trim() || null,
        payment_method: body.payment_method,
        change_for:
          body.payment_method === "dinheiro"
            ? body.change_for ?? null
            : null,
        notes: body.notes?.trim() || null,
        subtotal,
        delivery_fee: deliveryFee,
        total,
        status: "novo",
      });

    if (orderError) {
      console.error("Erro ao criar pedido:", orderError);

      return NextResponse.json(
        { error: "Não foi possível salvar o pedido." },
        { status: 500 }
      );
    }

    // Salva os itens usando preços vindos do banco.
    const orderItems = items.map((item) => ({
      order_id: orderId,
      ...item,
    }));

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItems);

    if (itemsError) {
      console.error("Erro ao salvar itens:", itemsError);

      // Tenta remover o pedido para não deixar pedido incompleto.
      await supabase
        .from("orders")
        .delete()
        .eq("id", orderId);

      return NextResponse.json(
        { error: "Não foi possível salvar os itens do pedido." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      id: orderId,
      subtotal,
      delivery_fee: deliveryFee,
      total,
    });
  } catch (error) {
    console.error("Erro inesperado na API de pedidos:", error);

    return NextResponse.json(
      { error: "Erro interno ao processar o pedido." },
      { status: 500 }
    );
  }
}