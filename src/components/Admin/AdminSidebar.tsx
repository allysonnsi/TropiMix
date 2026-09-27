"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ClipboardList,
  LogOut,
  ArrowUpRight,
} from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import Brand from "@/components/ui/Brand";
const links = [
  { href: "/admin/dashboard", label: "Visão geral", icon: LayoutDashboard },
  { href: "/admin/produtos", label: "Produtos", icon: Package },
  { href: "/admin/pedidos", label: "Pedidos", icon: ClipboardList },
];
export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  async function handleLogout() {
    const supabase = getSupabaseBrowserClient();
    await supabase?.auth.signOut();
    router.replace("/admin");
  }
  return (
    <aside className="admin-sidebar">
      <div className="admin-brand">
        <Brand />
        <span className="admin-label">Administração</span>
      </div>
      <p className="admin-nav-label">Sua operação</p>
      <nav aria-label="Administração">
        {links.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            aria-current={pathname === href ? "page" : undefined}
          >
            <Icon size={19} strokeWidth={1.6} />
            <span>{label}</span>
          </Link>
        ))}
      </nav>
      <div className="admin-sidebar-bottom">
        <Link href="/" target="_blank">
          Visitar a loja
          <ArrowUpRight size={16} />
        </Link>
        <button onClick={handleLogout}>
          <LogOut size={18} />
          <span>Sair da conta</span>
        </button>
      </div>
    </aside>
  );
}
