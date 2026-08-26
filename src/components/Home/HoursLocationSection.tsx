"use client";

import { useEffect, useState } from "react";
import { Clock, MapPin, Navigation, Phone } from "lucide-react";
import { getStoreStatus } from "@/lib/utils/hours";

export default function HoursLocationSection() {
  const [status, setStatus] = useState<{ isOpen: boolean; label: string; nextChange: string } | null>(
    null
  );

  useEffect(() => {
    setStatus(getStoreStatus());
    const id = setInterval(() => setStatus(getStoreStatus()), 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="localizacao" className="bg-mata/5 py-16">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 md:grid-cols-2 md:px-8">
        <div className="flex flex-col justify-center gap-4 rounded-3xl bg-white p-8 shadow-card">
          <div className="flex items-center gap-2 text-caju">
            <Clock size={20} />
            <span className="font-bold uppercase tracking-wide text-sm">Horário</span>
          </div>
          <h3 className="font-display text-2xl font-extrabold text-mata">
            Segunda a sábado
          </h3>
          <ul className="text-mata/70">
            <li>Manhã: 07h às 11h</li>
            <li>Tarde: 14h às 18h</li>
          </ul>
          {status && (
            <div
              className={`mt-2 flex w-fit items-center gap-2 rounded-full px-4 py-2 text-sm font-bold ${
                status.isOpen ? "bg-folha/15 text-folha-light" : "bg-caju/10 text-caju-dark"
              }`}
            >
              <span className={`h-2 w-2 rounded-full ${status.isOpen ? "bg-folha" : "bg-caju"}`} />
              {status.label} · {status.nextChange}
            </div>
          )}
        </div>

        <div className="flex flex-col justify-center gap-4 rounded-3xl bg-white p-8 shadow-card">
          <div className="flex items-center gap-2 text-caju">
            <MapPin size={20} />
            <span className="font-bold uppercase tracking-wide text-sm">Localização</span>
          </div>
          <h3 className="font-display text-2xl font-extrabold text-mata">
            Em frente ao Cartório de Ribamar
          </h3>
          <p className="text-mata/60 text-sm">
            Endereço completo em atualização pela loja. Fale com a gente para
            confirmar o ponto de referência.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://www.google.com/maps/search/?api=1&query=Cart%C3%B3rio+de+Ribamar"
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring flex items-center gap-2 rounded-full bg-mata px-5 py-2.5 text-sm font-bold text-white hover:bg-mata-light"
            >
              <Navigation size={16} /> Como chegar
            </a>
            <a
              href="tel:+5598985195882"
              className="focus-ring flex items-center gap-2 rounded-full border-2 border-mata/15 px-5 py-2.5 text-sm font-bold text-mata hover:border-caju hover:text-caju"
            >
              <Phone size={16} /> (98) 98519-5882
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
