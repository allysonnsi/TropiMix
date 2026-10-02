"use client";
import { useEffect, useState } from "react";
import { ArrowUpRight, Clock3, MapPin, Sun, Sunset, CalendarClock } from "lucide-react";
import styles from "./hours-location.module.css";
import { getStoreStatus } from "@/lib/utils/hours";
const referenceAddress = "Av. Gonçalves Dias, 768 - Moropia, São José de Ribamar - MA, 65110-000";
const mapsQuery = encodeURIComponent(referenceAddress);

export default function HoursLocationSection() {
  const [status, setStatus] = useState<ReturnType<
    typeof getStoreStatus
  > | null>(null);
  useEffect(() => {
    setStatus(getStoreStatus());
    const id = setInterval(() => setStatus(getStoreStatus()), 60_000);
    return () => clearInterval(id);
  }, []);
  return (
    <section id="localizacao" className="visit-section tropi-container">
      <div className="visit-heading">
        <p className="eyebrow">Passe por aqui</p>
        <h2>
          Visite o
          <br />
          TropiMix.
        </h2>
        <p>
          Estamos em São José de Ribamar.
          <br />
          Vai ser um prazer receber você.
        </p>
      </div>
      <div className={styles.hours} aria-labelledby="opening-hours-title">
        <div className={styles.inner}>
          <span className={styles.clock}><Clock3 size={42} strokeWidth={1.5} aria-hidden="true" /></span>
          <h3 id="opening-hours-title" className={styles.title}>Segunda a sábado</h3>
          <p className={styles.intro}>Estamos prontos para te atender<br />com muito sabor e qualidade!</p>
          <dl className={styles.schedule}>
            <div className={styles.row}>
              <dt><span className={styles.icon}><Sun size={27} strokeWidth={1.6} aria-hidden="true" /></span>Manhã</dt>
              <dd>07h às 11h</dd>
            </div>
            <div className={styles.row}>
              <dt><span className={styles.icon}><Sunset size={27} strokeWidth={1.6} aria-hidden="true" /></span>Tarde</dt>
              <dd>14h às 18h</dd>
            </div>
          </dl>
          <div className={styles.status} role="status" aria-live="polite">
            <span className={styles.dot} aria-hidden="true" />
            <div><strong>{status?.label ?? "Consulte nossos horários"}</strong>{status?.nextChange && <small>{status.nextChange}</small>}</div>
            <CalendarClock className={styles.calendar} size={42} strokeWidth={1.5} aria-hidden="true" />
          </div>
        </div>
      </div>
      <div className="visit-address">
        <MapPin size={24} strokeWidth={1.5} />
        <h3>
          Em frente ao
          <br />
          Cartório de Ribamar
        </h3>
        <p>Endereço do cartório, nosso ponto de referência:</p>
        <p>{referenceAddress}</p>
        <a
          className="text-link"
          href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Como chegar
          <ArrowUpRight size={18} />
        </a>
        <a className="visit-phone" href="tel:+5598985195882">
          (98) 98519-5882
        </a>
      </div>
      <div className="visit-map" style={{ gridColumn: "1 / -1", minWidth: 0 }}>
        <iframe
          title="Mapa do ponto de referência: Cartório de Ribamar"
          src={`https://www.google.com/maps?q=${mapsQuery}&output=embed`}
          width="100%"
          height="360"
          style={{ display: "block", border: 0, borderRadius: 8 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
        <p>O mapa indica o cartório. O TropiMix fica em frente.</p>
      </div>
    </section>
  );
}
