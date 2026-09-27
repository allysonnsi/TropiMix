import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { ActionLink } from "@/components/ui/Primitives";
import { buildWhatsAppLinkSimple } from "@/lib/whatsapp/buildMessage";
export default function Hero() {
  return (
    <section className="hero tropi-container">
      <div className="hero-copy">
        <p className="eyebrow">Tropical de verdade. Feito na hora.</p>
        <h1>
          Seu dia pede
          <br />
          <span>um TropiMix.</span>
        </h1>
        <p className="hero-description">
          Tapiocas, cuscuz, açaí e sabores da nossa terra. Escolha seu favorito
          e deixe o resto com a gente.
        </p>
        <div className="hero-actions">
          <ActionLink href="/cardapio">Ver cardápio</ActionLink>
          <a
            className="text-link"
            href={buildWhatsAppLinkSimple(
              "Olá! Vim pelo site e quero fazer um pedido 🍍",
            )}
            target="_blank"
            rel="noopener noreferrer"
          >
            Pedir pelo WhatsApp
            <ArrowUpRight size={17} />
          </a>
        </div>
      </div>
      <div className="hero-art">
        <div className="hero-art-ring" aria-hidden="true" />
        <Image
          src="/images/logo01.png"
          alt="TropiMix: nosso abacaxi temperado na identidade da casa"
          width={500}
          height={500}
          priority
          className="hero-brand-image"
        />
        <div className="hero-art-caption">
          <span>
            Da nossa casa
            <br />
            <strong>para o seu dia.</strong>
          </span>
          <span className="hero-art-mark" aria-hidden="true">
            TM
          </span>
        </div>
      </div>
    </section>
  );
}
