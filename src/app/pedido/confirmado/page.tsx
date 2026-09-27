import Link from "next/link";
import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

export const metadata: Metadata = {
  title: "Pedido enviado | TROPI MIX",
};

export default function PedidoConfirmadoPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="confirmation-panel">
        <CheckCircle2 size={56} className="text-folha" />
        <h1 className="font-display text-3xl font-extrabold text-mata">
          Pedido enviado para o WhatsApp!
        </h1>
        <p className="text-mata/70">
          Confirme o envio da mensagem no WhatsApp para que a TROPI MIX comece a
          preparar seu pedido. Se a conversa não abriu automaticamente, entre em
          contato pelo número (98) 98519-5882.
        </p>
        <Link href="/cardapio" className="ui-button ui-button--primary">
          Voltar ao cardápio
        </Link>
      </main>
      <Footer />
    </>
  );
}
