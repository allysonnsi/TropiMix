"use client";
import { useEffect, useState } from "react";
import { ArrowUpRight, Clock3, MapPin } from "lucide-react";
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
      <div className="visit-hours">
        <Clock3 size={24} strokeWidth={1.5} />
        <h3>Segunda a sábado</h3>
        <dl>
          <div>
            <dt>Manhã</dt>
            <dd>07h às 11h</dd>
          </div>
          <div>
            <dt>Tarde</dt>
            <dd>14h às 18h</dd>
          </div>
        </dl>
        {status && (
          <div
            className={`store-status ${status.isOpen ? "is-open" : "is-closed"}`}
          >
            <i aria-hidden="true" />
            {status.label}
            <small>{status.nextChange}</small>
          </div>
        )}
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
