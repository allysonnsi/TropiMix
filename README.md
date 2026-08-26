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

## 📂 Estrutura do projeto

```
src/
├── app/
│   ├── page.tsx              # Home
│   ├── cardapio/              # Cardápio com busca/filtros
│   ├── checkout/               # Checkout
│   ├── pedido/confirmado/      # Confirmação pós-checkout
│   ├── admin/                  # Login + Dashboard + Produtos + Pedidos
│   ├── sitemap.ts / robots.ts
│   └── globals.css
├── components/
│   ├── Navbar/ Hero/ Footer/ ProductCard/ ProductGrid/
│   ├── Cart/ Checkout/ WhatsAppButton/ Layout/ Home/ Admin/
├── lib/
│   ├── supabase/   # clientes browser/server
│   ├── whatsapp/   # geração da mensagem e do link wa.me
│   ├── utils/      # formatação de preço, telefone e horário de funcionamento
│   └── data/       # camada de acesso a dados (Supabase + fallback seed)
├── types/          # tipos TypeScript compartilhados
└── hooks/useCart.tsx
supabase/
├── schema.sql       # tabelas + Row Level Security
└── seed.sql          # dados iniciais do cardápio
```

## 🚀 Como executar localmente

```bash
npm install
cp .env.example .env.local   # depois preencha com suas chaves do Supabase
npm run dev
```

Acesse `http://localhost:3000`.

## 🗄️ Como configurar o Supabase

1. Crie um projeto em [supabase.com](https://supabase.com).
2. No **SQL Editor**, execute o conteúdo de `supabase/schema.sql` (cria as
   tabelas `categories`, `products`, `orders`, `order_items`,
   `store_settings` e as políticas de Row Level Security).
3. Em seguida execute `supabase/seed.sql` para popular o cardápio inicial
   (baseado no cardápio físico fornecido).
4. Em **Database > Replication**, habilite o Realtime para a tabela
   `orders`, para que `/admin/pedidos` receba novos pedidos automaticamente.
5. Em **Authentication > Users**, crie o usuário administrador (veja abaixo).

## 🔐 Variáveis de ambiente

Copie `.env.example` para `.env.local` e preencha:

```
NEXT_PUBLIC_SUPABASE_URL=https://SEU-PROJETO.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-anon-key-publica
NEXT_PUBLIC_WHATSAPP_NUMBER=5598985195882
```

As chaves são encontradas em **Project Settings > API** no painel do
Supabase. Apenas a chave `anon` (pública) é usada no frontend — nenhuma
chave secreta fica exposta no código.

## 👨‍💼 Como criar o administrador

No painel do Supabase, vá em **Authentication > Users > Add user**, informe
um e-mail e senha para a pessoa que vai administrar o cardápio e os
pedidos. Use essas credenciais para entrar em `/admin`.

## 🌐 Deploy na Vercel

1. Suba este projeto para um repositório no GitHub.
2. Em [vercel.com](https://vercel.com), importe o repositório.
3. Configure as mesmas variáveis de ambiente do `.env.local` em
   **Project Settings > Environment Variables**.
4. Clique em Deploy.

## 📝 Informações que ainda precisam ser preenchidas pela TROPI MIX

O cardápio fornecido tinha alguns pontos ilegíveis/cortados na foto. Os
campos abaixo foram deixados prontos para edição em `/admin/produtos` (ou
diretamente na tabela `products`), sem necessidade de mexer no código:

- **Sucos naturais**: sabores e preço não estavam legíveis no cardápio —
  cadastrado como "Sob consulta".
- **Endereço completo** da loja (rua, número, bairro, CEP) — hoje o site
  mostra apenas "Em frente ao Cartório de Ribamar". Latitude/longitude e
  endereço completo podem ser adicionados na tabela `store_settings` para
  habilitar um mapa incorporado.
- **Fotos dos produtos**: o site usa emojis como placeholder visual; basta
  fazer upload das fotos reais no Supabase Storage e preencher o campo
  `image_url` de cada produto.
- **Taxa de entrega**: está fixa em R$ 5,00 no checkout
  (`src/components/Checkout/CheckoutForm.tsx`, constante `DELIVERY_FEE`) —
  ajuste conforme a política da loja.

## ✅ Checklist de testes antes de publicar

- [ ] Navegação entre todas as páginas
- [ ] Busca e filtros do cardápio
- [ ] Adicionar/remover itens do carrinho e alterar quantidades
- [ ] Checkout completo (retirada e entrega, PIX/dinheiro/cartão)
- [ ] Mensagem gerada corretamente no WhatsApp
- [ ] Login e logout no `/admin`
- [ ] CRUD de produtos
- [ ] Atualização de status de pedidos em tempo real
- [ ] Responsividade em 320px, 375px, 390px, 768px, 1024px, 1440px
- [ ] `npm run build` sem erros
