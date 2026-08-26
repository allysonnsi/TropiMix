import Link from "next/link";
import { buildWhatsAppLinkSimple } from "@/lib/whatsapp/buildMessage";

export default function CtaSection() {
  return (
    <section id="contato" className="bg-mata py-16 text-center text-areia">
      <div className="mx-auto max-w-2xl px-4 md:px-8">
        <h2 className="font-display text-3xl font-extrabold md:text-4xl">
          Pronto para o seu sabor favorito?
        </h2>
        <p className="mt-3 text-areia/70">
          Monte seu pedido no cardápio e finalize em poucos passos.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link
            href="/cardapio"
            className="focus-ring rounded-full bg-caju px-7 py-3.5 text-sm font-bold text-white shadow-soft transition hover:bg-caju-dark"
          >
            Ver cardápio
          </Link>
          <a
            href={buildWhatsAppLinkSimple("Olá! Vim pelo site e quero fazer um pedido 🍍")}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring rounded-full border-2 border-areia/30 px-7 py-3.5 text-sm font-bold text-areia transition hover:border-milho hover:text-milho"
          >
            Pedir pelo WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
