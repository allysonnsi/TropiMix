import { Camera, ArrowUpRight } from "lucide-react";
export default function InstagramSection() {
  return (
    <section className="instagram-section tropi-container" id="instagram">
      <Camera size={32} strokeWidth={1.4} />
      <div>
        <p className="eyebrow">Um pouco mais da nossa casa</p>
        <h2>O próximo sabor aparece por lá.</h2>
        <p>Acompanhe nossos produtos e novidades no Instagram.</p>
      </div>
      <a
        className="text-link"
        href="https://www.instagram.com/tropimix_sjr/"
        target="_blank"
        rel="noopener noreferrer"
      >
        @tropimix_sjr
        <ArrowUpRight size={18} />
      </a>
    </section>
  );
}
