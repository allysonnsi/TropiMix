import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/hooks/useCart";
import WhatsAppButton from "@/components/WhatsAppButton/WhatsAppButton";
import CartDrawer from "@/components/Cart/CartDrawer";
import MobileTabBar from "@/components/Layout/MobileTabBar";

const typography = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tropimix.vercel.app"),
  title: "TROPI MIX 🥭🍍 | Sabor que você ama!",
  description:
    "Peça suas tapiocas, cuscuz, pastéis, bebidas, açaí, sucos e muito mais na TROPI MIX.",
  openGraph: {
    title: "TROPI MIX 🥭🍍 | Sabor que você ama!",
    description:
      "Peça suas tapiocas, cuscuz, pastéis, bebidas, açaí, sucos e muito mais na TROPI MIX.",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={typography.variable}>
      <body className="font-body antialiased pb-16 md:pb-0">
        <a className="skip-link" href="#main-content">
          Pular para o conteúdo
        </a>
        <CartProvider>
          {children}
          <CartDrawer />
          <WhatsAppButton />
          <MobileTabBar />
        </CartProvider>
      </body>
    </html>
  );
}
