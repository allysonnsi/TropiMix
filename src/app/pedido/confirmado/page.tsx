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
      <main className="mx-auto flex max-w-xl flex-col items-center gap-4 px-4 py-24 text-center md:px-8">
        <CheckCircle2 size={56} className="text-folha" />
        <h1 className="font-display text-3xl font-extrabold text-mata">
          Pedido enviado para o WhatsApp!
        </h1>
        <p className="text-mata/70">
          Confirme o envio da mensagem no WhatsApp para que a TROPI MIX comece
          a preparar seu pedido. Se a conversa não abriu automaticamente,
          entre em contato pelo número (98) 98519-5882.
        </p>
        <Link
          href="/cardapio"
          className="focus-ring mt-4 rounded-full bg-caju px-7 py-3.5 text-sm font-bold text-white shadow-soft transition hover:bg-caju-dark"
        >
          Voltar ao cardápio
        </Link>
      </main>
      <Footer />
    </>
  );
}
