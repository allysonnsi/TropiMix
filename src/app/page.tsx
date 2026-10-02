import { Hero } from "@/components/ui/animated-hero";
import Link from "next/link";
import { Oswald } from "next/font/google";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar/Navbar";
import CategoriesSection from "@/components/Home/CategoriesSection";
import ProductFilm from "@/components/Home/ProductFilm";
import FeaturedProducts from "@/components/Home/FeaturedProducts";
import HoursLocationSection from "@/components/Home/HoursLocationSection";
import { buildWhatsAppLinkSimple } from "@/lib/whatsapp/buildMessage";
import styles from "./home.module.css";

const display = Oswald({ subsets: ["latin"], weight: ["600", "700"], display: "swap", variable: "--home-display" });

export default function HomePage() {
  return (
    <div className={`${styles.home} ${display.variable}`}>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <CategoriesSection />
        <ProductFilm />
        <FeaturedProducts />
        <section id="sobre" className={styles.about}>
          <p>O TropiMix</p>
          <h2>Seu ponto de encontro<br />em Ribamar.</h2>
          <div><p>Tapiocas, cuscuz, abacaxi temperado, açaí e sucos. O nosso cardápio reúne opções para começar o dia ou parar para um lanche.</p><a href={buildWhatsAppLinkSimple("Olá! Quero fazer um pedido no TropiMix.")} target="_blank" rel="noopener noreferrer">Fale com a gente <ArrowUpRight size={18} aria-hidden="true" /></a></div>
        </section>
        <HoursLocationSection />
      </main>
      <footer className={styles.footer}>
        <Link href="/" className={styles.footerBrand}>TROPI MIX<span>São José de Ribamar, MA</span></Link>
        <a href="https://www.instagram.com/tropimix_sjr/" target="_blank" rel="noopener noreferrer">Instagram <ArrowUpRight size={16} aria-hidden="true" /></a>
        <a href="tel:+5598985195882">(98) 98519-5882</a>
        <Link href="/admin">Área administrativa</Link>
        <small>© {new Date().getFullYear()} TropiMix</small>
      </footer>
    </div>
  );
}
