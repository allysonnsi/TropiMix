import { Instagram } from "lucide-react";

export default function InstagramSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 text-center md:px-8">
      <div className="mx-auto flex max-w-xl flex-col items-center gap-4 rounded-3xl bg-gradient-to-br from-caju/10 to-milho/15 p-10">
        <Instagram size={36} className="text-caju" />
        <h2 className="font-display text-3xl font-extrabold text-mata">
          Siga a TROPI MIX
        </h2>
        <p className="text-mata/70">
          Acompanhe nossas novidades, produtos e promoções.
        </p>
        <span className="font-display text-lg font-bold text-caju">@tropimix_sjr</span>
        <a
          href="https://www.instagram.com/tropimix_sjr/"
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring mt-2 rounded-full bg-caju px-7 py-3 text-sm font-bold text-white shadow-soft transition hover:bg-caju-dark"
        >
          Seguir no Instagram
        </a>
      </div>
    </section>
  );
}
