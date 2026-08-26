"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { DollarSign, Package, Receipt, TrendingUp } from "lucide-react";
import AdminGuard from "@/components/Admin/AdminGuard";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { formatBRL } from "@/lib/utils/format";

interface OrderRow {
  id: string;
  total: number;
  created_at: string;
  status: string;
}

interface OrderItemRow {
  product_name: string;
  quantity: number;
  subtotal: number;
}

type Period = "hoje" | "7d" | "30d";

export default function DashboardPage() {
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [items, setItems] = useState<OrderItemRow[]>([]);
  const [productsStats, setProductsStats] = useState({ active: 0, inactive: 0 });
  const [period, setPeriod] = useState<Period>("7d");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setLoading(false);
      return;
    }

    (async () => {
      const [{ data: orderData }, { data: itemData }, { data: productData }] = await Promise.all([
        supabase.from("orders").select("id,total,created_at,status").order("created_at", { ascending: false }),
        supabase.from("order_items").select("product_name,quantity,subtotal"),
        supabase.from("products").select("available"),
      ]);

      setOrders(orderData ?? []);
      setItems(itemData ?? []);
      setProductsStats({
        active: (productData ?? []).filter((p: any) => p.available).length,
        inactive: (productData ?? []).filter((p: any) => !p.available).length,
      });
      setLoading(false);
    })();
  }, []);

  const today = new Date().toDateString();
  const todaysOrders = orders.filter((o) => new Date(o.created_at).toDateString() === today);
  const salesToday = todaysOrders.reduce((sum, o) => sum + o.total, 0);
  const avgTicket = orders.length > 0 ? orders.reduce((s, o) => s + o.total, 0) / orders.length : 0;

  const topProducts = useMemo(() => {
    const map = new Map<string, number>();
    items.forEach((i) => map.set(i.product_name, (map.get(i.product_name) ?? 0) + i.quantity));
    return [...map.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, qty]) => ({ name, qty }));
  }, [items]);

  const chartData = useMemo(() => {
    const days = period === "hoje" ? 1 : period === "7d" ? 7 : 30;
    const buckets: Record<string, number> = {};
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      buckets[d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })] = 0;
    }
    orders.forEach((o) => {
      const key = new Date(o.created_at).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
      });
      if (key in buckets) buckets[key] += o.total;
    });
    return Object.entries(buckets).map(([date, total]) => ({ date, total }));
  }, [orders, period]);

  return (
    <AdminGuard>
      <h1 className="font-display text-2xl font-bold text-mata">Dashboard</h1>
      <p className="mb-6 text-sm text-mata/50">Visão geral das vendas da TROPI MIX</p>

      {loading ? (
        <p className="text-mata/50">Carregando dados...</p>
      ) : (
        <>
          <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            <StatCard icon={DollarSign} label="Vendas hoje" value={formatBRL(salesToday)} />
            <StatCard icon={Receipt} label="Pedidos hoje" value={String(todaysOrders.length)} />
            <StatCard icon={TrendingUp} label="Ticket médio" value={formatBRL(avgTicket)} />
            <StatCard
              icon={Package}
              label="Produtos ativos"
              value={`${productsStats.active} ativos / ${productsStats.inactive} indisp.`}
            />
          </div>

          <div className="mb-8 rounded-3xl bg-white p-6 shadow-card">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-lg font-bold text-mata">Vendas por período</h2>
              <div className="flex gap-2">
                {(["hoje", "7d", "30d"] as Period[]).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPeriod(p)}
                    className={`focus-ring rounded-full px-3 py-1.5 text-xs font-bold ${
                      period === p ? "bg-mata text-white" : "bg-areia text-mata/60"
                    }`}
                  >
                    {p === "hoje" ? "Hoje" : p === "7d" ? "7 dias" : "30 dias"}
                  </button>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#0F3D2E15" />
                <XAxis dataKey="date" tick={{ fontSize: 12, fill: "#0F3D2E99" }} />
                <YAxis tick={{ fontSize: 12, fill: "#0F3D2E99" }} />
                <Tooltip formatter={(v: number) => formatBRL(v)} />
                <Bar dataKey="total" fill="#F4772E" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl bg-white p-6 shadow-card">
              <h2 className="mb-4 font-display text-lg font-bold text-mata">
                Produtos mais vendidos
              </h2>
              {topProducts.length === 0 ? (
                <p className="text-sm text-mata/50">Ainda não há vendas registradas.</p>
              ) : (
                <ul className="flex flex-col gap-2 text-sm">
                  {topProducts.map((p) => (
                    <li key={p.name} className="flex justify-between text-mata/70">
                      <span>{p.name}</span>
                      <span className="font-bold text-mata">{p.qty}x</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-card">
              <h2 className="mb-4 font-display text-lg font-bold text-mata">Pedidos recentes</h2>
              {orders.length === 0 ? (
                <p className="text-sm text-mata/50">Nenhum pedido ainda.</p>
              ) : (
                <ul className="flex flex-col gap-2 text-sm">
                  {orders.slice(0, 6).map((o) => (
                    <li key={o.id} className="flex justify-between text-mata/70">
                      <span>#{o.id.slice(0, 8)} · {o.status}</span>
                      <span className="font-bold text-mata">{formatBRL(o.total)}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </>
      )}
    </AdminGuard>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-3xl bg-white p-5 shadow-card">
      <Icon size={18} className="text-caju" />
      <p className="mt-3 text-xs font-bold uppercase tracking-wide text-mata/40">{label}</p>
      <p className="mt-1 font-display text-xl font-extrabold text-mata">{value}</p>
    </div>
  );
}
