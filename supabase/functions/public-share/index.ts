import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.48.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minuto
const RATE_LIMIT_MAX_REQUESTS = 30; // por IP
const rateLimitStore = new Map<string, { count: number; timestamp: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry || now - entry.timestamp > RATE_LIMIT_WINDOW_MS) {
    rateLimitStore.set(ip, { count: 1, timestamp: now });
    return false;
  }

  entry.count += 1;
  entry.timestamp = now;
  rateLimitStore.set(ip, entry);

  return entry.count > RATE_LIMIT_MAX_REQUESTS;
}

function isValidToken(token: string): boolean {
  if (!token || typeof token !== "string") return false;
  if (token.length < 32 || token.length > 255) return false;
  return /^[a-zA-Z0-9_-]+$/.test(token);
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const ip =
      req.headers.get("x-forwarded-for") ??
      req.headers.get("cf-connecting-ip") ??
      req.headers.get("x-real-ip") ??
      "unknown";

    if (isRateLimited(ip)) {
      return new Response(JSON.stringify({ error: "Muitas tentativas. Tente novamente mais tarde." }), {
        status: 429,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !serviceRoleKey) {
      return new Response(JSON.stringify({ error: "Configuração do backend ausente" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseClient = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false },
    });

    let token: string | null = null;

    if (req.method === "GET") {
      const url = new URL(req.url);
      token = url.searchParams.get("token");
    } else {
      const body = await req.json().catch(() => null);
      token = body?.token ?? null;
    }

    if (!token) {
      return new Response(JSON.stringify({ error: "Token de compartilhamento não informado" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!isValidToken(token)) {
      console.warn("Tentativa de acesso com token inválido em public-share");
      return new Response(JSON.stringify({ error: "Token inválido" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: link, error: linkError } = await supabaseClient
      .from("share_links")
      .select("obra_id, revoked")
      .eq("token", token)
      .maybeSingle();

    if (linkError) {
      console.error("Erro ao buscar link de compartilhamento", linkError);
      return new Response(JSON.stringify({ error: "Erro ao carregar link" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!link || link.revoked) {
      return new Response(JSON.stringify({ error: "Link inválido ou revogado" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const obraId = link.obra_id as string;

    const { data: obra, error: obraError } = await supabaseClient
      .from("obras")
      .select("id, nome, tipo, area_m2, orcamento_estimado, data_inicio, created_at, updated_at")
      .eq("id", obraId)
      .maybeSingle();

    if (obraError || !obra) {
      console.error("Erro ao buscar obra", obraError);
      return new Response(JSON.stringify({ error: "Não foi possível carregar a obra" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: etapas, error: etapasError } = await supabaseClient
      .from("etapas")
      .select("id, nome, orcamento_previsto, status, created_at, updated_at")
      .eq("obra_id", obraId);

    if (etapasError) {
      console.error("Erro ao buscar etapas", etapasError);
      return new Response(JSON.stringify({ error: "Não foi possível carregar as etapas" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const etapaIds = (etapas ?? []).map((e) => e.id);

    let gastos: any[] = [];

    if (etapaIds.length > 0) {
      const { data: gastosData, error: gastosError } = await supabaseClient
        .from("gastos")
        .select("id, etapa_id, tipo, forma_pagamento, data_pagamento, valor, observacoes, created_at, updated_at")
        .in("etapa_id", etapaIds as string[]);

      if (gastosError) {
        console.error("Erro ao buscar gastos", gastosError);
        return new Response(JSON.stringify({ error: "Não foi possível carregar os gastos" }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      gastos = gastosData ?? [];
    }

    const totalGasto = gastos.reduce((sum, g) => sum + Number(g.valor ?? 0), 0);
    const orcamentoPrevisto = obra.orcamento_estimado ? Number(obra.orcamento_estimado) : null;

    const resumo = {
      obra,
      etapas,
      gastos,
      totalGasto,
      orcamentoPrevisto,
    };

    return new Response(JSON.stringify(resumo), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Erro inesperado na função public-share", error);
    return new Response(JSON.stringify({ error: "Erro inesperado" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
