"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Session } from "@supabase/supabase-js";
import {
  getSupabaseBrowserClient,
  isSupabaseConfigured,
} from "@/lib/supabase/client";
import { ActionLink, EmptyState, Skeleton } from "@/components/ui/Primitives";
import AdminShell from "@/components/Admin/AdminShell";

export default function AdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {
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

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession);
        if (!newSession) router.replace("/admin");
      },
    );

    return () => listener.subscription.unsubscribe();
  }, [router]);

  if (!isSupabaseConfigured) {
    return (
      <main
        id="main-content"
        tabIndex={-1}
        className="page-main tropi-container"
      >
        <EmptyState
          title="Painel indisponível neste ambiente"
          description="A conexão administrativa ainda não está disponível. Volte à loja ou entre em contato com a pessoa responsável pelo sistema."
        >
          <ActionLink href="/">Voltar à loja</ActionLink>
        </EmptyState>
      </main>
    );
  }
  if (checking) {
    return (
      <main
        id="main-content"
        tabIndex={-1}
        className="page-main tropi-container"
      >
        <Skeleton rows={4} />
      </main>
    );
  }

  if (!session) return null;

  return <AdminShell>{children}</AdminShell>;
}
