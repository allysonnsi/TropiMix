import type { Category } from "@/types";

export const seedCategories: Category[] = [
  { id: "cat-tapiocas", slug: "tapiocas", name: "Tapiocas", description: "Feitas na hora, recheios variados", active: true, sort_order: 1, image: null },
  { id: "cat-cuscuz", slug: "cuscuz", name: "Cuscuz", description: "Cremoso e fresquinho", active: true, sort_order: 2, image: null },
  { id: "cat-misto", slug: "misto", name: "Misto", description: "Combos completos", active: true, sort_order: 3, image: null },
  { id: "cat-pastel", slug: "pastel", name: "Pastel", description: "Crocante, direto da fritadeira", active: true, sort_order: 4, image: null },
  { id: "cat-abacaxi", slug: "abacaxi-temperado", name: "Abacaxi Temperado", description: "A especialidade da casa", active: true, sort_order: 5, image: null },
  { id: "cat-bebidas", slug: "bebidas", name: "Bebidas", description: "Para refrescar", active: true, sort_order: 6, image: null },
  { id: "cat-acai", slug: "acai", name: "Açaí", description: "Na tigela ou no copo", active: true, sort_order: 7, image: null },
  { id: "cat-sucos", slug: "sucos-naturais", name: "Sucos Naturais", description: "Fruta de verdade", active: true, sort_order: 8, image: null },
];
