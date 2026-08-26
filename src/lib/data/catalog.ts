import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { seedCategories } from "@/lib/data/seed-categories";
import { seedProducts } from "@/lib/data/seed-products";
import type { Category, Product } from "@/types";

/**
 * Camada de acesso a dados do catalogo. Usa o Supabase quando configurado
 * (NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY) e cai para os
 * dados de demonstracao (seed) quando o projeto ainda nao foi conectado a
 * um banco — assim o site funciona imediatamente apos o `npm run dev`.
 */
export async function fetchCategories(): Promise<Category[]> {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return seedCategories;

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("active", true)
    .order("sort_order", { ascending: true });

  if (error || !data || data.length === 0) return seedCategories;
  return data as Category[];
}

export async function fetchProducts(): Promise<Product[]> {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return seedProducts;

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: true });

  if (error || !data || data.length === 0) return seedProducts;
  return data as Product[];
}
