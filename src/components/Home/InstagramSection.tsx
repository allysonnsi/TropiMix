import Link from "next/link";
import { ArrowUpRight, Camera } from "lucide-react";

export default function InstagramSection() {
  return (
    <section className="bg-areia py-20" id="instagram">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="relative overflow-hidden rounded-[32px] bg-mata px-6 py-12 md:px-12 md:py-16">
          {/* Decorative elements */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-milho/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-caju/10 blur-3xl" />

          <div className="relative grid items-center gap-10 lg:grid-cols-2">
            {/* Text */}
            <div>
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-areia/10 text-milho">
                <Camera size={22} />
              </div>

              <p className="mt-6 text-xs font-black uppercase tracking-[0.2em] text-milho">
                Siga a Tropi Mix
              </p>

              <h2 className="mt-3 font-display text-4xl font-black leading-tight text-areia md:text-5xl">
                Tem sempre um
                <br />
                sabor esperando
                <br />
                por você. 🥭
              </h2>

              <p className="mt-5 max-w-md text-sm leading-6 text-areia/60 md:text-base">
                Acompanhe nossas novidades, produtos e sabores
                no Instagram.
              </p>

              <Link
                href="https://www.instagram.com/tropimix_sjr/"
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring mt-7 inline-flex items-center gap-3 rounded-full bg-milho px-6 py-4 text-sm font-black text-mata transition hover:-translate-y-1 hover:bg-milho/90"
              >
                <span className="text-xl font-black">◎</span>

                @tropimix_sjr

                <ArrowUpRight size={17} />
              </Link>
            </div>

            {/* Visual */}
            <div className="relative mx-auto grid w-full max-w-md grid-cols-2 gap-4">
              <div className="flex aspect-square items-center justify-center rounded-[28px] bg-areia text-7xl shadow-xl transition duration-300 hover:-translate-y-2">
                🥭
              </div>

              <div className="mt-8 flex aspect-square items-center justify-center rounded-[28px] bg-milho text-7xl shadow-xl transition duration-300 hover:-translate-y-2">
                🍍
              </div>

              <div className="-mt-4 flex aspect-square items-center justify-center rounded-[28px] bg-caju text-7xl shadow-xl transition duration-300 hover:-translate-y-2">
                🥤
              </div>

              <div className="flex aspect-square items-center justify-center rounded-[28px] bg-white text-7xl shadow-xl transition duration-300 hover:-translate-y-2">
                🍓
              </div>

              {/* Center badge */}
              <div className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 rotate-3 items-center justify-center rounded-full border-4 border-mata bg-milho text-3xl shadow-2xl">
                ❤️
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
