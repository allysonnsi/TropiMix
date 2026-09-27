import { ActionLink } from "@/components/ui/Primitives";
export default function CtaSection() {
  return (
    <section className="cta-section tropi-container" id="contato">
      <div>
        <p className="eyebrow">Sua pausa começa aqui</p>
        <h2>
          Vamos preparar
          <br />o seu favorito?
        </h2>
        <p>Escolha no cardápio e finalize seu pedido pelo WhatsApp.</p>
      </div>
      <ActionLink href="/cardapio">Ver cardápio</ActionLink>
    </section>
  );
}
