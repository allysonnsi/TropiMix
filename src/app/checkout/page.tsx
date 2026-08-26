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
      <main className="mx-auto max-w-6xl px-4 py-10 md:px-8">
        <div className="mb-8">
          <span className="text-sm font-bold uppercase tracking-wide text-caju">Checkout</span>
          <h1 className="font-display text-3xl font-extrabold text-mata md:text-4xl">
            Finalizar pedido
          </h1>
        </div>
        <CheckoutForm />
      </main>
      <Footer />
    </>
  );
}
