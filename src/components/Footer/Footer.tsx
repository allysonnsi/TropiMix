import Link from "next/link";
import Brand from "@/components/ui/Brand";
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="tropi-container footer-main">
        <div>
          <Brand />
          <p>
            Sabor tropical, preparado com carinho
            <br />
            em São José de Ribamar.
          </p>
        </div>
        <nav aria-label="Navegação do rodapé">
          <Link href="/cardapio">Cardápio</Link>
          <Link href="/#sobre">Nossa casa</Link>
          <Link href="/#localizacao">Onde estamos</Link>
        </nav>
        <div>
          <strong>Vamos conversar?</strong>
          <a href="tel:+5598985195882">(98) 98519-5882</a>
          <a
            href="https://www.instagram.com/tropimix_sjr/"
            target="_blank"
            rel="noopener noreferrer"
          >
            @tropimix_sjr
          </a>
        </div>
        <div>
          <strong>Segunda a sábado</strong>
          <p>
            07h às 11h
            <br />
            14h às 18h
          </p>
          <small>Horários sujeitos a alterações em feriados.</small>
        </div>
      </div>
      <div className="tropi-container footer-bottom">
        <span>© {new Date().getFullYear()} TropiMix</span>
        <Link href="/admin">Área administrativa</Link>
        <span>Feito com carinho em Ribamar.</span>
      </div>
    </footer>
  );
}
