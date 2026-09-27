import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { ActionLink } from "@/components/ui/Primitives";
export default function NotFound() {
  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="confirmation-panel">
        <p className="eyebrow">Página não encontrada</p>
        <h1>Esse caminho não está no cardápio.</h1>
        <p>
          O endereço pode ter mudado. Volte à loja para encontrar seu próximo
          favorito.
        </p>
        <ActionLink href="/cardapio">Ver cardápio</ActionLink>
      </main>
      <Footer />
    </>
  );
}
