export type CategorySlug =
  | "tapiocas"
  | "cuscuz"
  | "misto"
  | "pastel"
  | "abacaxi-temperado"
  | "bebidas"
  | "acai"
  | "sucos-naturais";

export interface Category {
  id: string;
  slug: CategorySlug;
  name: string;
  description?: string | null;
  image?: string | null;
  active: boolean;
  sort_order: number;
}

export interface Product {
  id: string;
  category_id: string;
  category_slug: CategorySlug;
  name: string;
  description: string | null;
  price: number | null; // null = "sob consulta", a preencher pelo admin
  image_url: string | null;
  available: boolean;
  featured: boolean;
  created_at?: string;
  updated_at?: string;
}

export type OrderType = "retirada" | "entrega";
export type PaymentMethod = "pix" | "dinheiro" | "cartao";
export type OrderStatus =
  | "novo"
  | "confirmado"
  | "em_preparo"
  | "pronto"
  | "concluido"
  | "cancelado";

export interface OrderItemInput {
  product_id: string;
  product_name: string;
  quantity: number;
  unit_price: number;
  subtotal: number;
  notes?: string;
}

export interface OrderInput {
  customer_name: string;
  customer_phone: string;
  order_type: OrderType;
  address?: string;
  complement?: string;
  reference?: string;
  payment_method: PaymentMethod;
  change_for?: number | null;
  notes?: string;
  items: OrderItemInput[];
  subtotal: number;
  delivery_fee: number;
  total: number;
}

export interface Order extends OrderInput {
  id: string;
  status: OrderStatus;
  created_at: string;
}

export interface StoreSettings {
  id: string;
  store_name: string;
  phone: string;
  instagram: string;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
  opening_hours: OpeningHours;
}

export interface OpeningHours {
  days: number[]; // 0=domingo ... 6=sabado
  morning: { start: string; end: string };
  afternoon: { start: string; end: string };
}

export interface CartItem {
  product: Product;
  quantity: number;
  notes?: string;
}
