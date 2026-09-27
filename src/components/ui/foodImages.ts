/** Presentation-only illustrations. Catalog records and uploaded photographs remain unchanged. */
const foodImages: Record<string, string> = {
  'agua mineral 250ml': 'agua-mineral-250',
  'agua mineral 250 ml': 'agua-mineral-250',
  'refrigerante lata': 'refrigerante-lata',
  'cafe': 'cafe',
  'suco natural': 'suco-natural',
  'tapioca com manteiga': 'tapioca-manteiga',
  'tapioca com presunto': 'tapioca-presunto',
  'tapioca com queijo': 'tapioca-queijo',
  'tapioca com queijo e presunto': 'tapioca-queijo-presunto',
  'tapioca com presunto e queijo': 'tapioca-queijo-presunto',
  'tapioca com frango e queijo': 'tapioca-frango-queijo',
  'tapioca com ovo e queijo': 'tapioca-ovo-queijo',
  'cuscuz com manteiga': 'cuscuz-manteiga',
  'cuscuz com queijo': 'cuscuz-queijo',
  'cuscuz com ovo': 'cuscuz-ovo',
  'cuscuz com presunto e queijo': 'cuscuz-presunto-queijo',
  'cuscuz com queijo e presunto': 'cuscuz-presunto-queijo',
  'cuscuz com frango e queijo': 'cuscuz-frango-queijo',
  'misto queijo e presunto': 'misto-queijo-presunto',
  'misto queijo presunto e ovo': 'misto-queijo-presunto-ovo',
  'pastel': 'pastel',
  'abacaxi temperado salgado': 'abacaxi-salgado',
  'abacaxi temperado agridoce': 'abacaxi-agridoce',
  'manga temperada': 'manga-temperada',
  'manga caja temperada': 'manga-temperada',
  'manga caja': 'manga-temperada',
  'acai 300ml': 'acai-300',
  'acai 300 ml': 'acai-300',
  'acai 500ml': 'acai-500',
  'acai 500 ml': 'acai-500',
};
const categoryImages: Record<string, string> = {
  tapiocas: 'tapioca-queijo', cuscuz: 'cuscuz-manteiga', misto: 'misto-queijo-presunto',
  pastel: 'pastel', 'abacaxi temperado': 'abacaxi-salgado', acai: 'acai-300',
};
export function getFoodIllustration(name: string): string | undefined {
  const key = name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
  const slug = foodImages[key] ?? categoryImages[key];
  return slug ? `/images/products/${slug}.webp` : undefined;
}

