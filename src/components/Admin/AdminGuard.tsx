"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Session } from "@supabase/supabase-js";
import { getSupabaseBrowserClient, isSupabaseConfigured } from "@/lib/supabase/client";
import AdminSidebar from "@/components/Admin/AdminSidebar";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setChecking(false);
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setChecking(false);
      if (!data.session) router.replace("/admin");
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      if (!newSession) router.replace("/admin");
    });

    return () => listener.subscription.unsubscribe();
  }, [router]);

  if (!isSupabaseConfigured) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <h1 className="font-display text-2xl font-bold text-mata">
          Configure o Supabase
        </h1>
        <p className="mt-3 text-mata/60">
          O painel administrativo precisa das variáveis{" "}
          <code className="rounded bg-mata/10 px-1.5 py-0.5">NEXT_PUBLIC_SUPABASE_URL</code> e{" "}
          <code className="rounded bg-mata/10 px-1.5 py-0.5">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>{" "}
          configuradas no arquivo <code className="rounded bg-mata/10 px-1.5 py-0.5">.env.local</code>.
          Veja o README para o passo a passo completo.
        </p>
      </div>
    );
  }

  if (checking) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-mata/50">
        Carregando...
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="flex min-h-screen bg-areia">
      <AdminSidebar />
      <div className="flex-1 px-4 py-8 md:px-10">{children}</div>
    </div>
  );
}
