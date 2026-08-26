"use client";

import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import AdminGuard from "@/components/Admin/AdminGuard";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { formatBRL } from "@/lib/utils/format";
import type { OrderStatus } from "@/types";

interface OrderRow {
  id: string;
  customer_name: string;
  customer_phone: string;
  order_type: string;
  payment_method: string;
  total: number;
  notes: string | null;
  status: OrderStatus;
  created_at: string;
}

interface ItemRow {
  order_id: string;
  product_name: string;
  quantity: number;
}

const STATUSES: OrderStatus[] = [
  "novo",
  "confirmado",
  "em_preparo",
  "pronto",
  "concluido",
  "cancelado",
];

const statusLabel: Record<OrderStatus, string> = {
  novo: "Novo",
  confirmado: "Confirmado",
  em_preparo: "Em preparo",
  pronto: "Pronto",
  concluido: "Concluído",
  cancelado: "Cancelado",
};

const statusColor: Record<OrderStatus, string> = {
  novo: "bg-caju/10 text-caju-dark",
  confirmado: "bg-milho/25 text-caju-dark",
  em_preparo: "bg-milho/25 text-caju-dark",
  pronto: "bg-folha/15 text-folha-light",
  concluido: "bg-mata/10 text-mata/60",
  cancelado: "bg-mata/10 text-mata/40 line-through",
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [items, setItems] = useState<ItemRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [newAlert, setNewAlert] = useState(false);

  async function loadOrders() {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setLoading(false);
      return;
    }
    const [{ data: orderData }, { data: itemData }] = await Promise.all([
      supabase.from("orders").select("*").order("created_at", { ascending: false }),
      supabase.from("order_items").select("order_id,product_name,quantity"),
    ]);
    setOrders((orderData as OrderRow[]) ?? []);
    setItems((itemData as ItemRow[]) ?? []);
    setLoading(false);
  }

  useEffect(() => {
    loadOrders();

    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;

    const channel = supabase
      .channel("orders-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "orders" },
        () => {
          setNewAlert(true);
          loadOrders();
          window.setTimeout(() => setNewAlert(false), 4000);
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "orders" },
        () => loadOrders()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function updateStatus(id: string, status: OrderStatus) {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;
    await supabase.from("orders").update({ status }).eq("id", id);
    await loadOrders();
  }

  return (
    <AdminGuard>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-mata">Pedidos</h1>
          <p className="text-sm text-mata/50">Acompanhe e atualize os pedidos em tempo real</p>
        </div>
        {newAlert && (
          <span className="flex animate-pulse items-center gap-2 rounded-full bg-caju px-4 py-2 text-xs font-bold text-white">
            <Bell size={14} /> Novo pedido recebido!
          </span>
        )}
      </div>

      {loading ? (
        <p className="text-mata/50">Carregando pedidos...</p>
      ) : orders.length === 0 ? (
        <p className="rounded-3xl bg-white p-8 text-center text-mata/50 shadow-card">
          Nenhum pedido ainda. Assim que um cliente finalizar um pedido no site, ele
          aparecerá aqui automaticamente.
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((o) => (
            <div key={o.id} className="rounded-3xl bg-white p-5 shadow-card">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-display text-lg font-bold text-mata">
                    #{o.id.slice(0, 8)} · {o.customer_name}
                  </p>
                  <p className="text-xs text-mata/50">
                    {new Date(o.created_at).toLocaleString("pt-BR")} · {o.customer_phone}
                  </p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-bold ${statusColor[o.status]}`}>
                  {statusLabel[o.status]}
                </span>
              </div>

              <ul className="mt-3 flex flex-col gap-1 text-sm text-mata/70">
                {items
                  .filter((i) => i.order_id === o.id)
                  .map((i, idx) => (
                    <li key={idx}>
                      {i.quantity}x {i.product_name}
                    </li>
                  ))}
              </ul>

              {o.notes && <p className="mt-2 text-xs text-mata/50">Obs: {o.notes}</p>}

              <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-mata/5 pt-3">
                <div className="flex gap-4 text-xs font-semibold text-mata/60">
                  <span className="capitalize">{o.order_type}</span>
                  <span className="capitalize">{o.payment_method}</span>
                  <span className="font-display text-sm font-extrabold text-caju">
                    {formatBRL(o.total)}
                  </span>
                </div>
                <select
                  value={o.status}
                  onChange={(e) => updateStatus(o.id, e.target.value as OrderStatus)}
                  className="focus-ring rounded-full border-2 border-mata/10 px-3 py-1.5 text-xs font-bold text-mata"
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {statusLabel[s]}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminGuard>
  );
}
