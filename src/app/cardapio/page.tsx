import { Suspense } from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import ProductGrid from "@/components/ProductGrid/ProductGrid";
import CardapioClient from "./CardapioClient";

export const metadata: Metadata = {
  title: "Cardápio | TROPI MIX",
  description: "Confira tapiocas, cuscuz, pastéis, abacaxi temperado, açaí e sucos naturais da TROPI MIX.",
};

export default function CardapioPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-10 md:px-8">
        <div className="mb-8">
          <span className="text-sm font-bold uppercase tracking-wide text-caju">
            Cardápio completo
          </span>
          <h1 className="font-display text-3xl font-extrabold text-mata md:text-4xl">
            Escolha seu sabor
          </h1>
        </div>
        <Suspense fallback={<ProductGrid />}>
          <CardapioClient />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
