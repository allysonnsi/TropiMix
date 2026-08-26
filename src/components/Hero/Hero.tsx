"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { buildWhatsAppLinkSimple } from "@/lib/whatsapp/buildMessage";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-mata pb-24 pt-16 text-areia md:pb-32 md:pt-24">
      {/* textura de fundo */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, #F5B72E 2px, transparent 2px), radial-gradient(circle at 80% 60%, #F5B72E 2px, transparent 2px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 md:grid-cols-2 md:items-center md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-milho/15 px-4 py-1.5 text-sm font-bold text-milho">
            Em frente ao Cartório de Ribamar
          </span>
          <h1 className="mt-5 font-display text-5xl font-extrabold leading-[0.95] md:text-7xl">
            TROPI<span className="text-caju">MIX</span>
          </h1>
          <p className="mt-3 font-display text-2xl font-semibold text-milho md:text-3xl">
            Sabor que você ama!
          </p>
          <p className="mt-5 max-w-md text-base text-areia/80 md:text-lg">
            Seu sabor favorito, preparado com carinho e aquele toque tropical
            que você ama. Tapiocas, cuscuz, abacaxi temperado e muito mais.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
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
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          className="relative mx-auto flex h-72 w-72 items-center justify-center md:h-96 md:w-96"
        >
          <div className="absolute inset-0 animate-floaty rounded-blob bg-gradient-to-br from-milho via-caju to-folha opacity-90" />
          <div className="relative flex flex-col items-center justify-center gap-2 text-center">
            <Image
              src="/images/logo01.png"
              alt="TROPI MIX"
              width={1300}
              height={200}
              className="object-contain"
/>
          </div>
          
        </motion.div>
      </div>

      <div className="leaf-divider absolute inset-x-0 bottom-0 rotate-180">
        <svg viewBox="0 0 1200 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0,30 Q30,0 60,30 T120,30 T180,30 T240,30 T300,30 T360,30 T420,30 T480,30 T540,30 T600,30 T660,30 T720,30 T780,30 T840,30 T900,30 T960,30 T1020,30 T1080,30 T1140,30 T1200,30 V60 H0 Z"
            fill="#FFF8EC"
          />
        </svg>
      </div>
    </section>
  );
}
