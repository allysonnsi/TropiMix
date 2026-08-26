"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LockKeyhole } from "lucide-react";
import { getSupabaseBrowserClient, isSupabaseConfigured } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setError("Configure o Supabase antes de acessar o painel (veja o README).");
      setLoading(false);
      return;
    }

    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (authError) {
      setError("E-mail ou senha inválidos.");
      return;
    }

    router.push("/admin/dashboard");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-mata px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-soft"
      >
        <div className="mb-6 flex flex-col items-center gap-2 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-mata/10 text-mata">
            <LockKeyhole size={22} />
          </span>
          <h1 className="font-display text-2xl font-bold text-mata">Painel TROPI MIX</h1>
          <p className="text-sm text-mata/50">Acesso restrito à administração</p>
        </div>

        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-1 text-sm font-semibold text-mata/70">
            E-mail
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="focus-ring rounded-xl border-2 border-mata/10 px-4 py-2.5 text-mata"
              placeholder="admin@tropimix.com"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm font-semibold text-mata/70">
            Senha
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="focus-ring rounded-xl border-2 border-mata/10 px-4 py-2.5 text-mata"
              placeholder="••••••••"
            />
          </label>
        </div>

        {error && <p className="mt-3 text-sm font-semibold text-caju-dark">{error}</p>}
        {!isSupabaseConfigured && (
          <p className="mt-3 text-xs text-mata/50">
            Dica: configure NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY
            para habilitar o login.
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="focus-ring mt-6 w-full rounded-full bg-mata py-3 text-sm font-bold text-white transition hover:bg-mata-light disabled:opacity-60"
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}
