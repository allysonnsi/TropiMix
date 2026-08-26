-- ============================================================
-- TROPI MIX — dados iniciais (execute depois de schema.sql)
-- Baseado no cardapio fisico fornecido. Itens com price NULL
-- tiveram o valor ilegivel na foto do cardapio: edite pelo
-- painel /admin/produtos assim que tiver a informacao correta.
-- ============================================================

insert into categories (id, slug, name, description, active, sort_order) values
  ('cat-tapiocas', 'tapiocas', 'Tapiocas', 'Feitas na hora, recheios variados', true, 1),
  ('cat-cuscuz', 'cuscuz', 'Cuscuz', 'Cremoso e fresquinho', true, 2),
  ('cat-misto', 'misto', 'Misto', 'Combos completos', true, 3),
  ('cat-pastel', 'pastel', 'Pastel', 'Crocante, direto da fritadeira', true, 4),
  ('cat-abacaxi', 'abacaxi-temperado', 'Abacaxi Temperado', 'A especialidade da casa', true, 5),
  ('cat-bebidas', 'bebidas', 'Bebidas', 'Para refrescar', true, 6),
  ('cat-acai', 'acai', 'Açaí', 'Na tigela ou no copo', true, 7),
  ('cat-sucos', 'sucos-naturais', 'Sucos Naturais', 'Fruta de verdade', true, 8)
on conflict (id) do nothing;

insert into products (id, category_id, category_slug, name, description, price, available, featured) values
  ('p-tap-manteiga', 'cat-tapiocas', 'tapiocas', 'Tapioca com manteiga', 'Tapioca simples com manteiga', 4, true, false),
  ('p-tap-presunto', 'cat-tapiocas', 'tapiocas', 'Tapioca com presunto', 'Recheada com presunto', 6, true, false),
  ('p-tap-queijo', 'cat-tapiocas', 'tapiocas', 'Tapioca com queijo', 'Recheada com queijo', 7, true, true),
  ('p-tap-queijo-presunto', 'cat-tapiocas', 'tapiocas', 'Tapioca com queijo e presunto', 'Recheio duplo', 8, true, true),
  ('p-tap-frango-queijo', 'cat-tapiocas', 'tapiocas', 'Tapioca com frango e queijo', 'Frango desfiado com queijo', 8, true, true),
  ('p-tap-ovo-queijo', 'cat-tapiocas', 'tapiocas', 'Tapioca com ovo e queijo', 'Recheada com ovo e queijo', 8, true, false),

  ('p-cus-manteiga', 'cat-cuscuz', 'cuscuz', 'Cuscuz com manteiga', 'Cuscuz cremoso com manteiga', 5, true, false),
  ('p-cus-queijo', 'cat-cuscuz', 'cuscuz', 'Cuscuz com queijo', 'Cuscuz com queijo', 7, true, false),
  ('p-cus-ovo', 'cat-cuscuz', 'cuscuz', 'Cuscuz com ovo', 'Cuscuz com ovo', 6, true, false),
  ('p-cus-presunto-queijo', 'cat-cuscuz', 'cuscuz', 'Cuscuz com presunto e queijo', 'Recheio duplo', 8, true, false),
  ('p-cus-frango-queijo', 'cat-cuscuz', 'cuscuz', 'Cuscuz com frango e queijo', 'Frango desfiado com queijo', 9, true, true),

  ('p-misto-basico', 'cat-misto', 'misto', 'Misto, queijo e presunto', 'Combo misto quente', 6, true, false),
  ('p-misto-completo', 'cat-misto', 'misto', 'Misto, queijo, presunto e ovo', 'Combo misto completo', 7, true, false),

  ('p-pastel', 'cat-pastel', 'pastel', 'Pastel', 'Crocante, sabor tradicional da casa', 3, true, false),

  ('p-abacaxi-salgado', 'cat-abacaxi', 'abacaxi-temperado', 'Abacaxi temperado — salgado', 'Tempero salgado, a especialidade da casa', 10, true, true),
  ('p-abacaxi-agridoce', 'cat-abacaxi', 'abacaxi-temperado', 'Abacaxi temperado — agridoce', 'Tempero agridoce', 12, true, true),

  ('p-agua', 'cat-bebidas', 'bebidas', 'Água mineral 250ml', null, 3, true, false),
  ('p-refri-lata', 'cat-bebidas', 'bebidas', 'Refrigerante lata', null, 6, true, false),
  ('p-cafe', 'cat-bebidas', 'bebidas', 'Café', null, 3, true, false),

  ('p-acai-300', 'cat-acai', 'acai', 'Açaí 300ml', null, 15, true, true),
  ('p-acai-500', 'cat-acai', 'acai', 'Açaí 500ml', null, 20, true, true),

  ('p-suco-natural', 'cat-sucos', 'sucos-naturais', 'Suco natural', 'Sabor do dia — consulte disponibilidade', null, true, false)
on conflict (id) do nothing;
