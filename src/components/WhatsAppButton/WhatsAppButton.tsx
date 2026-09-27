"use client";

import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { buildWhatsAppLinkSimple } from "@/lib/whatsapp/buildMessage";

export default function WhatsAppButton() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;
  return (
    <a
      href={buildWhatsAppLinkSimple(
        "Olá! Vim pelo site e quero fazer um pedido 🍍",
      )}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="focus-ring fixed bottom-20 right-4 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-folha text-white shadow-soft transition hover:scale-105 hover:bg-folha-light md:bottom-6"
    >
      <MessageCircle size={26} strokeWidth={1.7} />
    </a>
  );
}
