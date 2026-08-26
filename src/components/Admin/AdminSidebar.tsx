"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Package, ClipboardList, LogOut } from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

const links = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
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
    <aside className="hidden w-60 shrink-0 flex-col border-r border-mata/10 bg-white px-4 py-6 md:flex">
      <Link href="/" className="mb-8 px-2 font-display text-xl font-extrabold text-mata">
        TROPI<span className="text-caju">MIX</span>
      </Link>
      <nav className="flex flex-1 flex-col gap-1">
        {links.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`focus-ring flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold transition ${
              pathname === href ? "bg-mata text-white" : "text-mata/60 hover:bg-mata/5"
            }`}
          >
            <Icon size={18} /> {label}
          </Link>
        ))}
      </nav>
      <button
        onClick={handleLogout}
        className="focus-ring flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold text-mata/60 hover:bg-mata/5"
      >
        <LogOut size={18} /> Sair
      </button>
    </aside>
  );
}
