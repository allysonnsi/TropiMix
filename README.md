# TROPI MIX 🍍🥭 — Sistema de Vendas Online

Sistema completo de vendas para a **TROPI MIX**, construído com Next.js 14
(App Router), TypeScript, Tailwind CSS, Framer Motion e Supabase.

## ✨ Funcionalidades

- Home institucional (hero, destaques, categorias, sobre, horário, localização, Instagram)
- Cardápio completo com busca e filtro por categoria
- Carrinho persistente (localStorage) com quantidade, observações e subtotal
- Checkout com dados do cliente, tipo de pedido (retirada/entrega), pagamento
  (PIX/dinheiro/cartão) e geração automática de mensagem para o WhatsApp
- Indicador de "Aberto agora / Fechado agora" calculado a partir do horário
  configurado (fuso de São Luís/MA)
- Botão flutuante de WhatsApp e barra de navegação inferior no mobile
- Painel administrativo (`/admin`) protegido por Supabase Auth:
  - Dashboard com vendas do dia, pedidos do dia, ticket médio, produtos
    ativos/indisponíveis, produtos mais vendidos, gráfico de vendas por período
  - CRUD completo de produtos (criar, editar, excluir, ativar/desativar, destacar)
  - Gestão de pedidos com atualização de status e atualização em tempo real
    (Supabase Realtime)
- SEO: metadata, Open Graph, sitemap.xml e robots.txt
- Banco de dados PostgreSQL via Supabase com Row Level Security

> O site funciona imediatamente após `npm install && npm run dev`, mesmo
> sem o Supabase configurado: ele usa os dados de demonstração do cardápio
> como fallback. O carrinho, o checkout e o link de WhatsApp funcionam nesse
> modo; o que depende do Supabase é a **persistência real dos pedidos** e o
> **painel administrativo**.

## 🧱 Tecnologias

Next.js 14 · TypeScript · React 18 · Tailwind CSS · Framer Motion ·
Lucide React · Recharts · Supabase (Auth, Postgres, Storage, Realtime, RLS)


