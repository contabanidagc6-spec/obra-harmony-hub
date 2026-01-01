import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getUserFriendlyErrorMessage(error: unknown, fallback: string): string {
  if (!error || typeof error !== "object") return fallback;

  const anyError = error as { message?: string; code?: string };
  const rawMessage = typeof anyError.message === "string" ? anyError.message : "";
  const code = anyError.code;

  if (code === "23505" || /duplicate key|unique constraint/i.test(rawMessage)) {
    return "Esse registro já existe. Verifique os dados informados.";
  }

  if (/permission denied|rls|row-level security/i.test(rawMessage)) {
    return "Você não tem permissão para executar esta ação.";
  }

  if (/JWT|token|session/i.test(rawMessage)) {
    return "Sua sessão expirou ou é inválida. Entre novamente para continuar.";
  }

  if (/network error|fetch failed|Failed to fetch/i.test(rawMessage)) {
    return "Não foi possível conectar ao servidor. Verifique sua conexão e tente de novo.";
  }

  return fallback;
}
