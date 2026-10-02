"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import styles from "./product-film.module.css";

export default function ProductFilm() {

  const [failed, setFailed] = useState(false);

  return (
    <section className={styles.section} aria-labelledby="product-film-title">
      <div className={styles.media}>
        <video
          src="/videos/abacaxi-tropimix.mp4"
          className={styles.video}
          width={1280}
          height={720}
          poster="/videos/abacaxi-tropimix.webp"
          preload="metadata"
          autoPlay
          loop
          disablePictureInPicture
          disableRemotePlayback
          playsInline
          muted
          controls={false}
          aria-label="Vídeo sem áudio: abacaxi temperado em close e uma pessoa experimentando"
          onError={() => setFailed(true)}
        />

        {failed && <p className={styles.error} role="status">O vídeo não carregou. Conheça os sabores no cardápio.</p>}
      </div>
      <div className={styles.copy}>
        <h2 id="product-film-title">Abacaxi com um toque a mais.</h2>
        <p>Em cada pedaço, o encontro da fruta com o tempero. Você escolhe: salgado ou agridoce.</p>
        <Link href="/cardapio?categoria=abacaxi-temperado">Escolher meu abacaxi <ArrowUpRight size={19} aria-hidden="true" /></Link>
      </div>
    </section>
  );
}
