export default function AboutSection() {
  return (
    <section id="sobre" className="mx-auto max-w-6xl px-4 py-16 md:px-8">
      <div className="grid gap-10 md:grid-cols-2 md:items-center">
        <div className="flex h-64 items-center justify-center rounded-3xl bg-gradient-to-br from-folha/15 to-milho/20 text-7xl md:h-80">
          🌴🍍🥭
        </div>
        <div>
          <span className="text-sm font-bold uppercase tracking-wide text-caju">
            Nossa história
          </span>
          <h2 className="mt-1 font-display text-3xl font-extrabold text-mata md:text-4xl">
            Sobre a TROPI MIX
          </h2>
          <p className="mt-4 text-base leading-relaxed text-mata/70">
            A TROPI MIX nasceu para levar até você o sabor tropical que a gente
            ama: tapiocas fresquinhas, cuscuz cremoso, abacaxi temperado da
            casa, açaí e sucos naturais preparados com carinho todos os dias.
          </p>
          <p className="mt-3 text-base leading-relaxed text-mata/70">
            Cada pedido é preparado na hora, com ingredientes selecionados e
            aquele toque artesanal que faz toda a diferença.
          </p>
        </div>
      </div>
    </section>
  );
}
