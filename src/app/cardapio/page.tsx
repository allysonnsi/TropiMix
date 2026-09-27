import { Suspense } from "react";
import styles from "./palette.module.css";
import { PageHeading } from "@/components/ui/Primitives";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import ProductGrid from "@/components/ProductGrid/ProductGrid";
import CardapioClient from "./CardapioClient";

export const metadata: Metadata = {
  title: "Cardápio | TROPI MIX",
  description:
    "Confira tapiocas, cuscuz, pastéis, abacaxi temperado, açaí e sucos naturais da TROPI MIX.",
};

export default function CardapioPage() {
  return (
    <div className={styles.catalog}>
      <Navbar />
      <main
        id="main-content"
        tabIndex={-1}
        className="page-main tropi-container"
      >
        <PageHeading
          eyebrow="Nosso cardápio"
          title="Escolha sua próxima pausa."
          description="Tapiocas, cuscuz, açaí e os sabores da nossa casa."
        />
        <Suspense fallback={<ProductGrid />}>
          <CardapioClient />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
