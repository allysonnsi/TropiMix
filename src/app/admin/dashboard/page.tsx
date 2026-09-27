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
import Link from "next/link";
import { PageHeading, EmptyState, Skeleton } from "@/components/ui/Primitives";
import {
  DollarSign,
  Package,
  Receipt,
  TrendingUp,
  ChartNoAxesCombined,
  type LucideIcon,
} from "lucide-react";
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
  const [productsStats, setProductsStats] = useState({
    active: 0,
    inactive: 0,
  });
  const [period, setPeriod] = useState<Period>("7d");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setLoading(false);
      return;
    }

    (async () => {
      const [{ data: orderData }, { data: itemData }, { data: productData }] =
        await Promise.all([
          supabase
            .from("orders")
            .select("id,total,created_at,status")
            .order("created_at", { ascending: false }),
          supabase.from("order_items").select("product_name,quantity,subtotal"),
          supabase.from("products").select("available"),
        ]);

      setOrders(orderData ?? []);
      setItems(itemData ?? []);
      setProductsStats({
        active: (productData ?? []).filter(
          (p: { available: boolean }) => p.available,
        ).length,
        inactive: (productData ?? []).filter(
          (p: { available: boolean }) => !p.available,
        ).length,
      });
      setLoading(false);
    })();
  }, []);

  const today = new Date().toDateString();
  const todaysOrders = orders.filter(
    (o) => new Date(o.created_at).toDateString() === today,
  );
  const salesToday = todaysOrders.reduce((sum, o) => sum + o.total, 0);
  const avgTicket =
    orders.length > 0
      ? orders.reduce((s, o) => s + o.total, 0) / orders.length
      : 0;

  const topProducts = useMemo(() => {
    const map = new Map<string, number>();
    items.forEach((i) =>
      map.set(i.product_name, (map.get(i.product_name) ?? 0) + i.quantity),
    );
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
      buckets[
        d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })
      ] = 0;
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
      <PageHeading
        eyebrow="Sua operação"
        title="Visão geral"
        description="Um olhar sobre o movimento da sua casa."
        action={
          <Link
            className="ui-button ui-button--secondary"
            href="/admin/pedidos"
          >
            Acompanhar pedidos
          </Link>
        }
      />
      {loading ? (
        <Skeleton rows={4} />
      ) : (
        <>
          <div className="kpi-grid">
            <StatCard
              icon={DollarSign}
              label="Vendas de hoje"
              value={formatBRL(salesToday)}
              detail="Total dos pedidos de hoje"
            />
            <StatCard
              icon={Receipt}
              label="Pedidos de hoje"
              value={String(todaysOrders.length)}
              detail="Pedidos registrados no dia"
            />
            <StatCard
              icon={TrendingUp}
              label="Ticket médio"
              value={formatBRL(avgTicket)}
              detail="Média de todos os pedidos"
            />
            <StatCard
              icon={Package}
              label="Produtos ativos"
              value={String(productsStats.active)}
              detail={productsStats.inactive + " indisponíveis no cardápio"}
            />
          </div>
          <section className="panel dashboard-chart">
            <div className="panel-header">
              <div>
                <h2>Vendas por período</h2>
                <p>Valor total dos pedidos registrados</p>
              </div>
              <div
                className="admin-filters"
                role="group"
                aria-label="Período das vendas"
              >
                {(["hoje", "7d", "30d"] as Period[]).map((p) => (
                  <button
                    key={p}
                    aria-pressed={period === p}
                    onClick={() => setPeriod(p)}
                  >
                    {p === "hoje" ? "Hoje" : p === "7d" ? "7 dias" : "30 dias"}
                  </button>
                ))}
              </div>
            </div>
            {chartData.every((point) => point.total === 0) ? (
              <div className="chart-empty">
                <EmptyState
                  icon={ChartNoAxesCombined}
                  title="O movimento começa com o primeiro pedido"
                  description="Ainda não há valores registrados neste período. As vendas aparecerão aqui conforme os pedidos chegarem."
                />
              </div>
            ) : (
              <>
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={chartData} accessibilityLayer>
                    <CartesianGrid
                      vertical={false}
                      strokeDasharray="3 5"
                      stroke="var(--border)"
                    />
                    <XAxis
                      dataKey="date"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 10, fill: "var(--muted)" }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 10, fill: "var(--muted)" }}
                    />
                    <Tooltip
                      formatter={(value: number) => [
                        formatBRL(value),
                        "Vendas",
                      ]}
                      contentStyle={{
                        borderRadius: 12,
                        border: "1px solid var(--border)", background: "var(--surface)", color: "var(--foreground)",
                        fontSize: 12,
                      }}
                    />
                    <Bar
                      dataKey="total"
                      fill="#65802b"
                      radius={[5, 5, 0, 0]}
                      maxBarSize={36}
                      isAnimationActive={false}
                    />
                  </BarChart>
                </ResponsiveContainer>
                <details className="chart-accessible">
                  <summary>Ver valores em tabela</summary>
                  <table>
                    <caption className="sr-only">
                      Valores de vendas por dia
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col">Data</th>
                        <th scope="col">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {chartData.map((point) => (
                        <tr key={point.date}>
                          <th scope="row">{point.date}</th>
                          <td>{formatBRL(point.total)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </details>
              </>
            )}
          </section>
          <div className="dashboard-lower">
            <section className="panel">
              <div className="panel-header">
                <div>
                  <h2>Favoritos dos clientes</h2>
                  <p>Produtos mais vendidos, em unidades</p>
                </div>
                <Link href="/admin/produtos">Ver produtos</Link>
              </div>
              {topProducts.length === 0 ? (
                <EmptyState
                  icon={Package}
                  title="Seus favoritos vão aparecer aqui"
                  description="O ranking será formado pelas vendas registradas."
                />
              ) : (
                <ol className="data-list">
                  {topProducts.map((product, index) => (
                    <li key={product.name}>
                      <span>
                        <small>{String(index + 1).padStart(2, "0")}</small>
                        {product.name}
                      </span>
                      <strong>{product.qty} un.</strong>
                    </li>
                  ))}
                </ol>
              )}
            </section>
            <section className="panel">
              <div className="panel-header">
                <div>
                  <h2>Pedidos recentes</h2>
                  <p>Os últimos pedidos da sua loja</p>
                </div>
                <Link href="/admin/pedidos">Ver pedidos</Link>
              </div>
              {orders.length === 0 ? (
                <EmptyState
                  icon={Receipt}
                  title="Tudo tranquilo por enquanto"
                  description="Os novos pedidos aparecerão aqui assim que forem registrados."
                />
              ) : (
                <ul className="data-list">
                  {orders.slice(0, 6).map((order) => (
                    <li key={order.id}>
                      <span>
                        #{order.id.slice(0, 8)}
                        <small>{order.status.replaceAll("_", " ")}</small>
                      </span>
                      <strong>{formatBRL(order.total)}</strong>
                    </li>
                  ))}
                </ul>
              )}
            </section>
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
  detail,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="kpi-card">
      <div>
        <span>{label}</span>
        <Icon size={18} strokeWidth={1.5} />
      </div>
      <strong>{value}</strong>
      <small>{detail}</small>
    </div>
  );
}
