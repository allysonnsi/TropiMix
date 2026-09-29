import type { Product } from "@/types";

/**
 * Dados iniciais extraidos do cardapio fisico da TROPI MIX.
 * Itens marcados com price: null tiveram o valor ilegivel/cortado na foto
 * do cardapio e devem ser preenchidos pelo administrador em /admin/produtos.
 */
export const seedProducts: Product[] = [
  // TAPIOCAS
  { id: "p-tap-manteiga", category_id: "cat-tapiocas", category_slug: "tapiocas", name: "Tapioca com manteiga", description: "Tapioca simples com manteiga", price: 4, image_url: null, available: true, featured: false },
  { id: "p-tap-presunto", category_id: "cat-tapiocas", category_slug: "tapiocas", name: "Tapioca com presunto", description: "Recheada com presunto", price: 6, image_url: null, available: true, featured: false },
  { id: "p-tap-queijo", category_id: "cat-tapiocas", category_slug: "tapiocas", name: "Tapioca com queijo", description: "Recheada com queijo", price: 7, image_url: null, available: true, featured: true },
  { id: "p-tap-queijo-presunto", category_id: "cat-tapiocas", category_slug: "tapiocas", name: "Tapioca com queijo e presunto", description: "Recheio duplo", price: 8, image_url: null, available: true, featured: true },
  { id: "p-tap-frango-queijo", category_id: "cat-tapiocas", category_slug: "tapiocas", name: "Tapioca com frango e queijo", description: "Frango desfiado com queijo", price: 8, image_url: null, available: true, featured: true },
  { id: "p-tap-ovo-queijo", category_id: "cat-tapiocas", category_slug: "tapiocas", name: "Tapioca com ovo e queijo", description: "Recheada com ovo e queijo", price: 8, image_url: null, available: true, featured: false },

  // CUSCUZ
  { id: "p-cus-manteiga", category_id: "cat-cuscuz", category_slug: "cuscuz", name: "Cuscuz com manteiga", description: "Cuscuz cremoso com manteiga", price: 5, image_url: null, available: true, featured: false },
  { id: "p-cus-queijo", category_id: "cat-cuscuz", category_slug: "cuscuz", name: "Cuscuz com queijo", description: "Cuscuz com queijo", price: 7, image_url: null, available: true, featured: false },
  { id: "p-cus-ovo", category_id: "cat-cuscuz", category_slug: "cuscuz", name: "Cuscuz com ovo", description: "Cuscuz com ovo", price: 6, image_url: null, available: true, featured: false },
  { id: "p-cus-presunto-queijo", category_id: "cat-cuscuz", category_slug: "cuscuz", name: "Cuscuz com presunto e queijo", description: "Recheio duplo", price: 8, image_url: null, available: true, featured: false },
  { id: "p-cus-frango-queijo", category_id: "cat-cuscuz", category_slug: "cuscuz", name: "Cuscuz com frango e queijo", description: "Frango desfiado com queijo", price: 9, image_url: null, available: true, featured: true },

  // MISTO
  { id: "p-misto-basico", category_id: "cat-misto", category_slug: "misto", name: "Misto, queijo e presunto", description: "Combo misto quente", price: 6, image_url: null, available: true, featured: false },
  { id: "p-misto-completo", category_id: "cat-misto", category_slug: "misto", name: "Misto, queijo, presunto e ovo", description: "Combo misto completo", price: 7, image_url: null, available: true, featured: false },

  // PASTEL
  { id: "p-pastel", category_id: "cat-pastel", category_slug: "pastel", name: "Pastel", description: "Crocante, sabor tradicional da casa", price: 3, image_url: null, available: true, featured: false },

  // ABACAXI TEMPERADO
  { id: "p-abacaxi-salgado", category_id: "cat-abacaxi", category_slug: "abacaxi-temperado", name: "Abacaxi temperado — salgado", description: "Tempero salgado, a especialidade da casa", price: 10, image_url: null, available: true, featured: true },
  { id: "p-abacaxi-agridoce", category_id: "cat-abacaxi", category_slug: "abacaxi-temperado", name: "Abacaxi temperado — agridoce", description: "Tempero agridoce", price: 12, image_url: null, available: true, featured: true },

  // BEBIDAS
  { id: "p-agua", category_id: "cat-bebidas", category_slug: "bebidas", name: "Água mineral 250ml", description: null, price: 3, image_url: null, available: true, featured: false },
  { id: "p-refri-lata", category_id: "cat-bebidas", category_slug: "bebidas", name: "Refrigerante lata", description: null, price: 6, image_url: null, available: true, featured: false },
  { id: "p-cafe", category_id: "cat-bebidas", category_slug: "bebidas", name: "Café", description: null, price: 3, image_url: null, available: true, featured: false },

  // AÇAÍ (preços informados no cardápio ficam na categoria bebidas do cardápio original, reorganizados aqui)
  { id: "p-acai-300", category_id: "cat-acai", category_slug: "acai", name: "Açaí 300ml", description: null, price: 15, image_url: null, available: true, featured: true },
  { id: "p-acai-500", category_id: "cat-acai", category_slug: "acai", name: "Açaí 500ml", description: null, price: 20, image_url: null, available: true, featured: true },

  // SUCOS NATURAIS
  { id: "p-suco-natural", category_id: "cat-sucos", category_slug: "sucos-naturais", name: "Suco natural", description: "Sabor do dia — consulte disponibilidade", price: 5, image_url: null, available: true, featured: false },
];
