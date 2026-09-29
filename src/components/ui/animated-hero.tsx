"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Pause, Play } from "lucide-react";
import styles from "./animated-hero.module.css";

const products = ["Abacaxi temperado", "Tapioca recheada", "Cuscuz quentinho", "Açaí no capricho"];

export function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    if (paused || reducedMotion) return;
    const timer = window.setTimeout(() => setIndex((current) => (current + 1) % products.length), index === 0 ? 6000 : 3500);
    return () => window.clearTimeout(timer);
  }, [index, paused, reducedMotion]);

  return (
    <section className={styles.hero} aria-label="Sabores do TropiMix">
      <div className={styles.copy}>
        <h1 className={styles.heading}>
          <span className="sr-only">Seu dia pede abacaxi temperado. Tapioca, cuscuz e açaí no TropiMix.</span>
          <span aria-hidden="true">
            <span className={styles.intro}>Seu dia pede</span>
            <span className={styles.words}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span className={styles.product} key={reducedMotion ? 0 : index}
                  initial={reducedMotion ? false : { y: 18, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={reducedMotion ? undefined : { y: -18, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}>
                  {products[reducedMotion ? 0 : index]}<span className={styles.dot}>.</span>
                </motion.span>
              </AnimatePresence>
            </span>
          </span>
        </h1>
        <p className={styles.description}>Comece pelo nosso abacaxi temperado.<br />Explore os sabores do TropiMix e escolha o seu pedido.</p>
        <div className={styles.actions}>
          <Link className={styles.primary} href="/cardapio?categoria=abacaxi-temperado">Quero abacaxi temperado <ArrowUpRight size={19} aria-hidden="true" /></Link>
          <Link className={styles.secondary} href="/cardapio">Ver cardápio completo <ArrowUpRight size={16} aria-hidden="true" /></Link>
        </div>
        {!reducedMotion && <button className={styles.pause} type="button" onClick={() => setPaused(!paused)} aria-label={paused ? "Retomar troca de palavras" : "Pausar troca de palavras"}>
          {paused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
          {paused ? "Retomar animação" : "Pausar animação"}
        </button>}
      </div>
      <div className={styles.brand}>
        <Image src="/images/logo01.png" alt="TropiMix" width={500} height={500} priority sizes="(max-width: 700px) 220px, 460px" />
      </div>
      <div className={styles.bottom}><span>Seu café. Seu lanche. Seu ritmo.</span><a href="#localizacao">Conheça a loja <ArrowUpRight size={16} aria-hidden="true" /></a></div>
    </section>
  );
}