import Link from "next/link";
import { MapPin, Phone, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-mata text-areia">
      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-3"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-milho text-2xl">
                🥭
              </div>

              <div>
                <div className="font-display text-2xl font-black tracking-tight">
                  TROPI<span className="text-milho">MIX</span>
                </div>

                <p className="mt-1 text-xs font-bold uppercase tracking-[0.15em] text-areia/45">
                  Sabor que você ama
                </p>
              </div>
            </Link>

            <p className="mt-6 max-w-sm text-sm leading-6 text-areia/60">
              Sucos, açaí, tapiocas, cuscuz, lanches e muito
              mais preparados com carinho para você.
            </p>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/tropimix_sjr/"
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring mt-6 inline-flex items-center gap-2 rounded-full border border-areia/15 px-4 py-2.5 text-sm font-bold text-areia transition hover:border-milho hover:text-milho"
            >
              <span className="text-lg leading-none">◎</span>
              @tropimix_sjr
              <ArrowUpRight size={15} />
            </a>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-display text-sm font-black uppercase tracking-wider text-milho">
              Navegação
            </h3>

            <ul className="mt-5 space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-sm text-areia/60 transition hover:text-areia"
                >
                  Início
                </Link>
              </li>

              <li>
                <Link
                  href="/cardapio"
                  className="text-sm text-areia/60 transition hover:text-areia"
                >
                  Cardápio
                </Link>
              </li>

              <li>
                <Link
                  href="/#sobre"
                  className="text-sm text-areia/60 transition hover:text-areia"
                >
                  Sobre nós
                </Link>
              </li>

              <li>
                <Link
                  href="/#localizacao"
                  className="text-sm text-areia/60 transition hover:text-areia"
                >
                  Localização
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-sm font-black uppercase tracking-wider text-milho">
              Atendimento
            </h3>

            <div className="mt-5 space-y-5">
              <div className="flex gap-3">
                <MapPin
                  size={19}
                  className="mt-0.5 shrink-0 text-milho"
                />

                <div>
                  <p className="text-sm font-bold text-areia">
                    Onde estamos
                  </p>

                  <p className="mt-1 text-sm leading-5 text-areia/55">
                    Em frente ao Cartório de Ribamar
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Phone
                  size={19}
                  className="mt-0.5 shrink-0 text-milho"
                />

                <div>
                  <p className="text-sm font-bold text-areia">
                    Fale conosco
                  </p>

                  <p className="mt-1 text-sm text-areia/55">
                    Atendimento pelo WhatsApp
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h3 className="font-display text-sm font-black uppercase tracking-wider text-milho">
              Horários
            </h3>

            <div className="mt-5 rounded-2xl border border-areia/10 bg-white/5 p-4">
              <p className="text-sm font-bold text-areia">
                Segunda a sábado
              </p>

              <div className="mt-3 space-y-2 text-sm text-areia/60">
                <div className="flex justify-between gap-4">
                  <span>Manhã</span>
                  <span className="font-bold text-areia">
                    07h – 11h
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span>Tarde</span>
                  <span className="font-bold text-areia">
                    14h – 18h
                  </span>
                </div>
              </div>
            </div>

            <p className="mt-4 text-xs leading-5 text-areia/40">
              Os horários podem sofrer alterações em feriados
              ou datas especiais.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-areia/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-xs text-areia/40 md:flex-row md:items-center md:justify-between md:px-8">
          <p>
            © {new Date().getFullYear()} Tropi Mix. Todos os direitos reservados.
          </p>

          <p>
            Feito com <span className="text-caju">♥</span> em São José de Ribamar
          </p>
        </div>
      </div>
    </footer>
  );
}
