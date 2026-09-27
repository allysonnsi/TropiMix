"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LockKeyhole, Eye, EyeOff, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Brand from "@/components/ui/Brand";
import { Button } from "@/components/ui/Primitives";
import {
  getSupabaseBrowserClient,
  isSupabaseConfigured,
} from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setError(
        "Configure o Supabase antes de acessar o painel (veja o README).",
      );
      setLoading(false);
      return;
    }

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);

    if (authError) {
      setError("E-mail ou senha inválidos.");
      return;
    }

    router.push("/admin/dashboard");
  }

  return (
    <main id="main-content" tabIndex={-1} className="login-page">
      <aside className="login-story">
        <Brand />
        <div>
          <p className="eyebrow">O cuidado também acontece aqui</p>
          <h2>
            Sua casa.
            <br />
            Seus sabores.
            <br />
            Tudo em ordem.
          </h2>
          <p>
            Cuide do cardápio, acompanhe os pedidos e tenha uma visão do
            movimento da TropiMix.
          </p>
        </div>
        <small>TropiMix · São José de Ribamar</small>
      </aside>
      <div className="login-area">
        <form
          method="post"
          data-ready={ready}
          onSubmit={handleSubmit}
          className="login-form"
        >
          <LockKeyhole size={26} strokeWidth={1.5} />
          <h1>Bom ter você aqui.</h1>
          <p>Acesse sua conta para cuidar da operação da TropiMix.</p>
          <div className="login-fields">
            <label htmlFor="admin-email">
              E-mail
              <input
                id="admin-email"
                name="email"
                autoComplete="username"
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Seu e-mail de acesso"
              />
            </label>
            <label htmlFor="admin-password">
              Senha
              <div className="password-field">
                <input
                  id="admin-password"
                  name="password"
                  autoComplete="current-password"
                  required
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Sua senha"
                />
                <button
                  type="button"
                  className="icon-button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  aria-pressed={showPassword}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </label>
          </div>
          {error && (
            <div role="alert" className="form-alert">
              {error}
            </div>
          )}
          {!isSupabaseConfigured && (
            <div className="form-alert">
              O acesso administrativo está indisponível neste ambiente.
            </div>
          )}
          <Button
            type="submit"
            disabled={!ready || loading}
            aria-busy={loading}
          >
            {loading ? "Entrando…" : "Entrar no painel"}
          </Button>
          <Link href="/" className="text-link">
            <ArrowLeft size={15} />
            Voltar para a loja
          </Link>
        </form>
      </div>
    </main>
  );
}
