"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import AdminSidebar from "./AdminSidebar";
import type { ReactNode } from "react";
export default function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const titles: Record<string, string> = {
    "/admin/dashboard": "Visão geral",
    "/admin/produtos": "Produtos",
    "/admin/pedidos": "Pedidos",
  };
  return (
    <div className="admin-shell">
      <AdminSidebar />
      <div className="admin-workspace">
        <header className="admin-topbar">
          <nav aria-label="Localização">
            <span>Administração</span>
            <ChevronRight size={14} />
            <strong>{titles[pathname] ?? "Painel"}</strong>
          </nav>
          <Link href="/" target="_blank">
            Abrir loja
            <ArrowUpRight size={16} />
          </Link>
        </header>
        <main id="main-content" tabIndex={-1} className="admin-content">
          {children}
        </main>
      </div>
    </div>
  );
}
