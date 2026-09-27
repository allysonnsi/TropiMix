import { PageHeading } from "@/components/ui/Primitives";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import CheckoutForm from "@/components/Checkout/CheckoutForm";

export const metadata: Metadata = {
  title: "Finalizar pedido | TROPI MIX",
};

export default function CheckoutPage() {
  return (
    <>
      <Navbar />
      <main
        id="main-content"
        tabIndex={-1}
        className="page-main tropi-container"
      >
        <PageHeading
          eyebrow="Seu pedido"
          title="Só falta combinar os detalhes."
          description="Conte como você quer receber e confira o seu pedido."
        />
        <CheckoutForm />
      </main>
      <Footer />
    </>
  );
}
