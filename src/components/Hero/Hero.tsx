"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  MapPin,
  Sparkles,
} from "lucide-react";

import { buildWhatsAppLinkSimple } from "@/lib/whatsapp/buildMessage";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-areia">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0 tropical-pattern opacity-80" />

      <div className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-milho/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-caju/10 blur-3xl" />

      <div className="relative mx-auto grid min-h-[650px] max-w-7xl items-center gap-12 px-4 py-16 md:px-8 lg:grid-cols-[1fr_0.9fr] lg:py-20">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="relative z-10"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-milho/30 bg-milho/10 px-4 py-2 text-xs font-black uppercase tracking-wide text-mata">
            <Sparkles size={14} className="text-caju" />
            Sabor feito na hora
          </div>

          <h1 className="max-w-3xl font-display text-5xl font-black leading-[0.92] tracking-tight text-mata sm:text-6xl lg:text-8xl">
            O sabor que
            <br />
            <span className="tropi-gradient-text">
              você ama.
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-7 text-mata/65 md:text-lg">
            Tapiocas, cuscuz, açaí, abacaxi temperado,
            bebidas e muito mais preparados com aquele
            toque especial da Tropi Mix.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/cardapio"
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-mata px-7 py-4 text-sm font-black text-areia shadow-xl transition hover:-translate-y-1 hover:bg-mata-light"
            >
              Ver cardápio
              <ArrowRight size={18} />
            </Link>

            <a
              href={buildWhatsAppLinkSimple(
                "Olá! Vim pelo site e quero fazer um pedido 🍍"
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring inline-flex items-center justify-center rounded-full border-2 border-mata/10 bg-white px-7 py-4 text-sm font-black text-mata transition hover:-translate-y-1 hover:border-milho"
            >
              Pedir pelo WhatsApp
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-bold text-mata/55">
            <span className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-folha" />
              Segunda a sábado
            </span>

            <span className="flex items-center gap-2">
              <MapPin size={15} />
              São José de Ribamar
            </span>
          </div>
        </motion.div>

        {/* Right visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
            delay: 0.15,
          }}
          className="relative mx-auto h-[420px] w-full max-w-[500px]"
        >
          {/* Main blob */}
          <div className="absolute inset-[8%] tropi-blob bg-mata shadow-2xl" />

          {/* Yellow shape */}
          <motion.div
            animate={{ y: [-8, 8, -8], rotate: [-3, 3, -3] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute right-[5%] top-[8%] flex h-24 w-24 items-center justify-center rounded-[35%] bg-milho text-5xl shadow-xl"
          >
            🍍
          </motion.div>

          {/* Main product */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute left-1/2 top-1/2 flex h-64 w-64 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-areia shadow-2xl md:h-72 md:w-72"
          >
            <div className="text-center">
              <div className="text-8xl md:text-9xl">
                🥤
              </div>

              <div className="mt-3 rounded-full bg-mata px-5 py-2 text-xs font-black uppercase tracking-wider text-areia">
                Tropical & fresco
              </div>
            </div>
          </motion.div>

          {/* Floating fruit */}
          <motion.div
            animate={{ y: [0, -14, 0], rotate: [0, 8, 0] }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.4,
            }}
            className="absolute bottom-[8%] left-[3%] flex h-20 w-20 items-center justify-center rounded-full bg-caju text-4xl shadow-xl"
          >
            🥭
          </motion.div>

          <motion.div
            animate={{ y: [0, 12, 0], rotate: [0, -7, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.7,
            }}
            className="absolute bottom-[15%] right-[3%] flex h-20 w-20 items-center justify-center rounded-full bg-white text-4xl shadow-xl"
          >
            🍓
          </motion.div>

          {/* Badge */}
          <div className="absolute left-[5%] top-[17%] rounded-2xl bg-white px-4 py-3 shadow-xl">
            <p className="text-[10px] font-black uppercase tracking-wider text-mata/50">
              Especialidade
            </p>
            <p className="mt-1 font-display text-sm font-black text-mata">
              Feito com carinho ❤️
            </p>
          </div>
        </motion.div>
      </div>

      {/* Bottom wave */}
      <div className="leaf-divider relative">
        <svg
          viewBox="0 0 1200 60"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,30 Q30,0 60,30 T120,30 T180,30 T240,30 T300,30 T360,30 T420,30 T480,30 T540,30 T600,30 T660,30 T720,30 T780,30 T840,30 T900,30 T960,30 T1020,30 T1080,30 T1140,30 T1200,30 V60 H0 Z"
            fill="#0F3D2E"
          />
        </svg>
      </div>
    </section>
  );
}
