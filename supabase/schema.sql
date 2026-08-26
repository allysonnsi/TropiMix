-- ============================================================
-- TROPI MIX — schema Supabase (PostgreSQL)
-- Execute este arquivo inteiro no SQL Editor do seu projeto Supabase.
-- ============================================================

create extension if not exists "pgcrypto";

-- ---------- categories ----------
create table if not exists categories (
  id text primary key,
  slug text unique not null,
  name text not null,
  description text,
  image text,
  active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ---------- products ----------
create table if not exists products (
  id text primary key,
  category_id text references categories(id) on delete set null,
  category_slug text not null,
  name text not null,
  description text,
  price numeric(10,2), -- null = "sob consulta"
  image_url text,
  available boolean not null default true,
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------- orders ----------
create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  customer_phone text not null,
  order_type text not null check (order_type in ('retirada','entrega')),
  address text,
  complement text,
  reference text,
  payment_method text not null check (payment_method in ('pix','dinheiro','cartao')),
  change_for numeric(10,2),
  notes text,
  subtotal numeric(10,2) not null default 0,
  delivery_fee numeric(10,2) not null default 0,
  total numeric(10,2) not null default 0,
  status text not null default 'novo'
    check (status in ('novo','confirmado','em_preparo','pronto','concluido','cancelado')),
  created_at timestamptz not null default now()
);

-- ---------- order_items ----------
create table if not exists order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references orders(id) on delete cascade,
  product_id text references products(id) on delete set null,
  product_name text not null,
  quantity int not null default 1,
  unit_price numeric(10,2) not null default 0,
  subtotal numeric(10,2) not null default 0
);

-- ---------- store_settings ----------
create table if not exists store_settings (
  id text primary key default 'default',
  store_name text not null default 'TROPI MIX',
  phone text not null default '5598985195882',
  instagram text not null default 'tropimix_sjr',
  address text,
  opening_hours jsonb not null default '{
    "days": [1,2,3,4,5,6],
    "morning": {"start": "07:00", "end": "11:00"},
    "afternoon": {"start": "14:00", "end": "18:00"}
  }',
  latitude double precision,
  longitude double precision
);

insert into store_settings (id) values ('default')
on conflict (id) do nothing;

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table categories enable row level security;
alter table products enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;
alter table store_settings enable row level security;

-- Leitura publica do catalogo (cliente do site)
create policy "categorias sao publicas para leitura"
  on categories for select
  using (true);

create policy "produtos sao publicos para leitura"
  on products for select
  using (true);

create policy "configuracoes da loja sao publicas para leitura"
  on store_settings for select
  using (true);

-- Qualquer visitante pode criar um pedido (checkout publico)
create policy "qualquer pessoa pode criar pedidos"
  on orders for insert
  with check (true);

create policy "qualquer pessoa pode adicionar itens ao pedido"
  on order_items for insert
  with check (true);

-- Apenas usuarios autenticados (administradores) podem ler/alterar pedidos
create policy "admins podem ler pedidos"
  on orders for select
  using (auth.role() = 'authenticated');

create policy "admins podem atualizar pedidos"
  on orders for update
  using (auth.role() = 'authenticated');

create policy "admins podem ler itens de pedidos"
  on order_items for select
  using (auth.role() = 'authenticated');

-- Apenas usuarios autenticados podem gerenciar o catalogo
create policy "admins podem inserir produtos"
  on products for insert
  with check (auth.role() = 'authenticated');

create policy "admins podem atualizar produtos"
  on products for update
  using (auth.role() = 'authenticated');

create policy "admins podem excluir produtos"
  on products for delete
  using (auth.role() = 'authenticated');

create policy "admins podem gerenciar categorias"
  on categories for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "admins podem gerenciar configuracoes"
  on store_settings for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ============================================================
-- REALTIME
-- ============================================================
-- No painel do Supabase, ative o Realtime para a tabela `orders`
-- (Database > Replication > supabase_realtime) para que o
-- /admin/pedidos receba novos pedidos automaticamente.
