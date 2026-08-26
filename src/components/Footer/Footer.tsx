import Link from "next/link";
import { Instagram, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-mata px-4 py-12 text-areia/80 md:px-8">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl font-extrabold text-areia">
            TROPI<span className="text-caju">MIX</span>
          </p>
          <p className="mt-2 text-sm">Sabor que você ama!</p>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <span className="font-bold text-milho">Contato</span>
          <a href="tel:+5598985195882" className="focus-ring flex items-center gap-2 hover:text-milho">
            <Phone size={15} /> (98) 98519-5882
          </a>
          <a
            href="https://www.instagram.com/tropimix_sjr/"
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring flex items-center gap-2 hover:text-milho"
          >
            <Instagram size={15} /> @tropimix_sjr
          </a>
          <span className="flex items-center gap-2">
            <MapPin size={15} /> Em frente ao Cartório de Ribamar
          </span>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <span className="font-bold text-milho">Horário</span>
          <span>Segunda a sábado</span>
          <span>07h às 11h · 14h às 18h</span>
          <Link href="/cardapio" className="focus-ring mt-2 w-fit hover:text-milho">
            Ver cardápio completo →
          </Link>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-6xl border-t border-areia/10 pt-6 text-xs text-areia/50">
        © {new Date().getFullYear()} TROPI MIX. Todos os direitos reservados.
      </p>
    </footer>
  );
}
