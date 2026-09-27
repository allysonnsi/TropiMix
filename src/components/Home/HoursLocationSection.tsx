"use client";
import { useEffect, useState } from "react";
import { ArrowUpRight, Clock3, MapPin } from "lucide-react";
import { getStoreStatus } from "@/lib/utils/hours";
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
        <p>Confirme o endereço completo e o ponto de referência com a gente.</p>
        <a
          className="text-link"
          href="https://www.google.com/maps/search/?api=1&query=Cart%C3%B3rio+de+Ribamar"
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
    </section>
  );
}
