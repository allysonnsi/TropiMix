"use client";

import {
  PageHeading,
  SearchField,
  EmptyState,
  Skeleton,
  Button,
} from "@/components/ui/Primitives";
import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { useActionFeedback } from "@/components/ui/useActionFeedback";
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
  const { pending, feedback, run } = useActionFeedback();
  const [newAlert, setNewAlert] = useState(false);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "todos">(
    "todos",
  );
  const filteredOrders = orders.filter(
    (order) =>
      (statusFilter === "todos" || order.status === statusFilter) &&
      `${order.customer_name} ${order.id} ${order.customer_phone}`
        .toLocaleLowerCase("pt-BR")
        .includes(query.trim().toLocaleLowerCase("pt-BR")),
  );

  async function loadOrders() {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setLoading(false);
      return;
    }
    const [{ data: orderData }, { data: itemData }] = await Promise.all([
      supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false }),
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
        },
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "orders" },
        () => loadOrders(),
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function updateStatus(id: string, status: OrderStatus) {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;
    if (
      !(await run(
        () => supabase.from("orders").update({ status }).eq("id", id),
        "Status do pedido atualizado.",
      ))
    )
      return;
    await loadOrders();
  }

  return (
    <AdminGuard>
      {feedback && (
        <p
          className={
            feedback.error
              ? "form-alert operation-feedback"
              : "operation-success operation-feedback"
          }
          role={feedback.error ? "alert" : "status"}
        >
          {feedback.message}
        </p>
      )}
      <PageHeading
        eyebrow="Da cozinha para o cliente"
        title="Pedidos"
        description="Acompanhe cada pedido, do recebimento à conclusão."
      />
      {newAlert && (
        <div className="order-notice" role="status">
          <Bell size={16} /> Novo pedido recebido
        </div>
      )}
      <div className="admin-toolbar">
        <SearchField
          label="Buscar cliente ou pedido"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <label className="status-filter">
          Status
          <select
            aria-label="Filtrar pedidos por status"
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as OrderStatus | "todos")
            }
          >
            <option value="todos">Todos os status</option>
            {STATUSES.map((status) => (
              <option key={status} value={status}>
                {statusLabel[status]}
              </option>
            ))}
          </select>
        </label>
        <span className="results-count" role="status">
          {filteredOrders.length} pedidos
        </span>
      </div>
      {loading ? (
        <Skeleton rows={2} />
      ) : orders.length === 0 ? (
        <EmptyState
          title="Tudo pronto para receber pedidos"
          description="Assim que um cliente finalizar o pedido, ele aparecerá aqui para você acompanhar."
        />
      ) : filteredOrders.length === 0 ? (
        <EmptyState
          title="Nenhum pedido para este filtro"
          description="Busque outro cliente ou veja todos os status."
        >
          <Button
            variant="secondary"
            onClick={() => {
              setQuery("");
              setStatusFilter("todos");
            }}
          >
            Limpar filtros
          </Button>
        </EmptyState>
      ) : (
        <div className="order-list">
          {filteredOrders.map((o) => (
            <div
              key={o.id}
              className="order-card rounded-3xl bg-white p-5 shadow-card"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-display text-lg font-bold text-mata">
                    #{o.id.slice(0, 8)} · {o.customer_name}
                  </p>
                  <p className="text-xs text-mata/50">
                    {new Date(o.created_at).toLocaleString("pt-BR")} ·{" "}
                    {o.customer_phone}
                  </p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${statusColor[o.status]}`}
                >
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

              {o.notes && (
                <p className="mt-2 text-xs text-mata/50">Obs: {o.notes}</p>
              )}

              <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-mata/5 pt-3">
                <div className="flex gap-4 text-xs font-semibold text-mata/60">
                  <span className="capitalize">{o.order_type}</span>
                  <span className="capitalize">{o.payment_method}</span>
                  <span className="font-display text-sm font-extrabold text-caju">
                    {formatBRL(o.total)}
                  </span>
                </div>
                <select
                  disabled={pending}
                  aria-label={"Status do pedido " + o.id.slice(0, 8)}
                  value={o.status}
                  onChange={(e) =>
                    updateStatus(o.id, e.target.value as OrderStatus)
                  }
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
