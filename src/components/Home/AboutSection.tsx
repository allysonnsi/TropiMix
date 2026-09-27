import { Leaf, UtensilsCrossed } from "lucide-react";
export default function AboutSection() {
  return (
    <section id="sobre" className="about-section tropi-container">
      <div>
        <p className="eyebrow">Nossa casa, nosso jeito</p>
        <h2>
          Tem sabor.
          <br />
          Tem cuidado.
          <br />
          <span>Tem TropiMix.</span>
        </h2>
      </div>
      <div className="about-copy">
        <p className="about-lead">
          A gente acredita que uma boa pausa começa com comida feita com
          carinho.
        </p>
        <p>
          A TROPI MIX nasceu para levar até você o sabor tropical que a gente
          ama: tapiocas fresquinhas, cuscuz cremoso, abacaxi temperado da casa,
          açaí e sucos naturais.
        </p>
        <div className="about-values">
          <div>
            <UtensilsCrossed size={22} strokeWidth={1.5} />
            <strong>Preparado na hora</strong>
            <span>Cada pedido recebe nosso toque artesanal.</span>
          </div>
          <div>
            <Leaf size={22} strokeWidth={1.5} />
            <strong>Ingredientes selecionados</strong>
            <span>O cuidado começa antes de chegar à sua mesa.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
