"use client";
import { useState } from "react";

/** Presents the result of an existing operation without changing its payload. */
export function useActionFeedback() {
  const [pending, setPending] = useState(false);
  const [feedback, setFeedback] = useState<{
    error: boolean;
    message: string;
  } | null>(null);
  async function run(
    operation: () => PromiseLike<{ error: unknown }>,
    successMessage: string,
  ) {
    setPending(true);
    setFeedback(null);
    try {
      const result = await operation();
      if (result.error) throw result.error;
      setFeedback({ error: false, message: successMessage });
      return true;
    } catch {
      setFeedback({
        error: true,
        message:
          "Não foi possível concluir a ação. Verifique sua conexão e tente novamente.",
      });
      return false;
    } finally {
      setPending(false);
    }
  }
  return { pending, feedback, run };
}
