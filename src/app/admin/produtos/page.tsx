"use client";

import {
  PageHeading,
  SearchField,
  EmptyState,
  Skeleton,
  Button,
} from "@/components/ui/Primitives";
import { useEffect, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useActionFeedback } from "@/components/ui/useActionFeedback";
import AdminGuard from "@/components/Admin/AdminGuard";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { formatBRL, slugify } from "@/lib/utils/format";
import { seedCategories } from "@/lib/data/seed-categories";
import type { Category, Product } from "@/types";

const emptyForm = {
  id: "",
  name: "",
  description: "",
  price: "",
  category_id: seedCategories[0].id,
  available: true,
  featured: false,
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>(seedCategories);
  const [loading, setLoading] = useState(true);
  const { pending, feedback, run } = useActionFeedback();
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [query, setQuery] = useState("");
  const [availability, setAvailability] = useState("todos");
  const filteredProducts = products.filter(
    (product) =>
      product.name
        .toLocaleLowerCase("pt-BR")
        .includes(query.trim().toLocaleLowerCase("pt-BR")) &&
      (availability === "todos" ||
        (availability === "ativos" ? product.available : !product.available)),
  );

  async function loadData() {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setLoading(false);
      return;
    }
    const [{ data: cats }, { data: prods }] = await Promise.all([
      supabase.from("categories").select("*").order("sort_order"),
      supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false }),
    ]);
    if (cats && cats.length) setCategories(cats as Category[]);
    setProducts((prods as Product[]) ?? []);
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
  }

  function startEdit(p: Product) {
    setForm({
      id: p.id,
      name: p.name,
      description: p.description ?? "",
      price: p.price !== null ? String(p.price) : "",
      category_id: p.category_id,
      available: p.available,
      featured: p.featured,
    });
    setEditingId(p.id);
    setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;

    const category = categories.find((c) => c.id === form.category_id);
    const payload = {
      name: form.name,
      description: form.description || null,
      price: form.price ? Number(form.price) : null,
      category_id: form.category_id,
      category_slug: category?.slug ?? "tapiocas",
      available: form.available,
      featured: form.featured,
      image_url: null,
    };

    if (editingId) {
      if (
        !(await run(
          () => supabase.from("products").update(payload).eq("id", editingId),
          "Produto atualizado.",
        ))
      )
        return;
    } else {
      if (
        !(await run(
          () =>
            supabase
              .from("products")
              .insert({
                id: slugify(`${form.name}-${Date.now()}`),
                ...payload,
              }),
          "Produto criado.",
        ))
      )
        return;
    }

    await loadData();
    resetForm();
  }

  async function handleDelete(id: string) {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;
    if (!confirm("Excluir este produto?")) return;
    if (
      !(await run(
        () => supabase.from("products").delete().eq("id", id),
        "Produto excluído.",
      ))
    )
      return;
    await loadData();
  }

  async function toggleField(p: Product, field: "available" | "featured") {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;
    if (
      !(await run(
        () =>
          supabase
            .from("products")
            .update({ [field]: !p[field] })
            .eq("id", p.id),
        "Produto atualizado.",
      ))
    )
      return;
    await loadData();
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
        eyebrow="Seu cardápio"
        title="Produtos"
        description="Organize os sabores e a disponibilidade da sua loja."
        action={
          <Button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
          >
            <Plus size={16} />
            Novo produto
          </Button>
        }
      />
      <div className="admin-toolbar">
        <SearchField
          label="Buscar produto"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div
          className="admin-filters"
          role="group"
          aria-label="Disponibilidade"
        >
          {[
            { value: "todos", label: "Todos" },
            { value: "ativos", label: "Ativos" },
            { value: "inativos", label: "Indisponíveis" },
          ].map((filter) => (
            <button
              key={filter.value}
              aria-pressed={availability === filter.value}
              onClick={() => setAvailability(filter.value)}
            >
              {filter.label}
            </button>
          ))}
        </div>
        <span className="results-count" role="status">
          {filteredProducts.length} produtos
        </span>
      </div>
      {showForm && (
        <form
          aria-label={editingId ? "Editar produto" : "Novo produto"}
          onSubmit={handleSubmit}
          className="mb-8 grid gap-4 rounded-3xl bg-white p-6 shadow-card sm:grid-cols-2"
        >
          <label className="flex flex-col gap-1 text-sm font-semibold text-mata/70">
            Nome
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="focus-ring rounded-xl border-2 border-mata/10 px-4 py-2.5"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm font-semibold text-mata/70">
            Preço (R$), vazio para "Sob consulta"
            <input
              value={form.price}
              onChange={(e) =>
                setForm({
                  ...form,
                  price: e.target.value.replace(/[^0-9.]/g, ""),
                })
              }
              className="focus-ring rounded-xl border-2 border-mata/10 px-4 py-2.5"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm font-semibold text-mata/70 sm:col-span-2">
            Descrição
            <input
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="focus-ring rounded-xl border-2 border-mata/10 px-4 py-2.5"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm font-semibold text-mata/70">
            Categoria
            <select
              value={form.category_id}
              onChange={(e) =>
                setForm({ ...form, category_id: e.target.value })
              }
              className="focus-ring rounded-xl border-2 border-mata/10 px-4 py-2.5"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>
          <div className="flex items-center gap-6 pt-6">
            <label className="flex items-center gap-2 text-sm font-semibold text-mata/70">
              <input
                type="checkbox"
                checked={form.available}
                onChange={(e) =>
                  setForm({ ...form, available: e.target.checked })
                }
              />
              Disponível
            </label>
            <label className="flex items-center gap-2 text-sm font-semibold text-mata/70">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) =>
                  setForm({ ...form, featured: e.target.checked })
                }
              />
              Destaque
            </label>
          </div>
          <div className="flex gap-3 sm:col-span-2">
            <button
              type="submit"
              disabled={pending}
              aria-busy={pending}
              className="focus-ring rounded-full bg-mata px-6 py-2.5 text-sm font-bold text-white hover:bg-mata-light"
            >
              {pending
                ? "Salvando…"
                : editingId
                  ? "Salvar alterações"
                  : "Criar produto"}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="focus-ring rounded-full border-2 border-mata/10 px-6 py-2.5 text-sm font-bold text-mata/60"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <Skeleton rows={3} />
      ) : products.length === 0 ? (
        <EmptyState
          title="Seu cardápio começa aqui"
          description="Cadastre o primeiro produto usando o botão Novo produto."
        />
      ) : filteredProducts.length === 0 ? (
        <EmptyState
          title="Nenhum produto encontrado"
          description="Tente outro nome ou altere a disponibilidade."
        >
          <Button
            variant="secondary"
            onClick={() => {
              setQuery("");
              setAvailability("todos");
            }}
          >
            Limpar filtros
          </Button>
        </EmptyState>
      ) : (
        <div className="overflow-x-auto rounded-3xl bg-white shadow-card">
          <table className="admin-product-table w-full text-sm">
            <caption className="sr-only">
              Produtos do cardápio e ações de gerenciamento
            </caption>
            <thead>
              <tr className="border-b border-mata/10 text-left text-xs font-bold uppercase tracking-wide text-mata/40">
                <th scope="col" className="px-5 py-3">
                  Produto
                </th>
                <th scope="col" className="px-5 py-3">
                  Preço
                </th>
                <th scope="col" className="px-5 py-3">
                  Disponível
                </th>
                <th scope="col" className="px-5 py-3">
                  Destaque
                </th>
                <th scope="col" className="px-5 py-3 text-right">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((p) => (
                <tr key={p.id} className="border-b border-mata/5 last:border-0">
                  <td
                    data-label="Produto"
                    className="px-5 py-3 font-semibold text-mata"
                  >
                    {p.name}
                  </td>
                  <td data-label="Preço" className="px-5 py-3 text-mata/70">
                    {formatBRL(p.price)}
                  </td>
                  <td data-label="Disponível" className="px-5 py-3">
                    <button
                      disabled={pending}
                      aria-pressed={p.available}
                      aria-label={"Disponibilidade de " + p.name}
                      onClick={() => toggleField(p, "available")}
                      className={`focus-ring rounded-full px-3 py-1 text-xs font-bold ${
                        p.available
                          ? "bg-folha/15 text-folha-light"
                          : "bg-mata/10 text-mata/50"
                      }`}
                    >
                      {p.available ? "Sim" : "Não"}
                    </button>
                  </td>
                  <td data-label="Destaque" className="px-5 py-3">
                    <button
                      disabled={pending}
                      aria-pressed={p.featured}
                      aria-label={"Destaque de " + p.name}
                      onClick={() => toggleField(p, "featured")}
                      className={`focus-ring rounded-full px-3 py-1 text-xs font-bold ${
                        p.featured
                          ? "bg-milho/25 text-caju-dark"
                          : "bg-mata/10 text-mata/50"
                      }`}
                    >
                      {p.featured ? "Sim" : "Não"}
                    </button>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => startEdit(p)}
                        aria-label={"Editar " + p.name}
                        title="Editar produto"
                        className="focus-ring rounded-full p-2 text-mata/50 hover:bg-mata/5 hover:text-mata"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        disabled={pending}
                        onClick={() => handleDelete(p.id)}
                        aria-label={"Excluir " + p.name}
                        title="Excluir produto"
                        className="focus-ring rounded-full p-2 text-mata/50 hover:bg-caju/10 hover:text-caju"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminGuard>
  );
}
