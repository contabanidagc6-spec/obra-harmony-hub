import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Loader2, AlertTriangle, CalendarDays, TrendingUp } from "lucide-react";

interface SharedEtapa {
  id: string;
  nome: string;
  orcamento_previsto: number | null;
  status: string;
}

interface SharedGasto {
  id: string;
  etapa_id: string;
  tipo: string;
  forma_pagamento: string;
  data_pagamento: string;
  valor: number;
}

interface SharedObra {
  id: string;
  nome: string;
  tipo: string;
  area_m2: number | null;
  orcamento_estimado: number | null;
  data_inicio: string | null;
}

interface SharedResponse {
  obra: SharedObra;
  etapas: SharedEtapa[];
  gastos: SharedGasto[];
  totalGasto: number;
  orcamentoPrevisto: number | null;
}

export const SharedViewPage = () => {
  const { token } = useParams();
  const [data, setData] = useState<SharedResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setError("Link inválido.");
      setLoading(false);
      return;
    }

    const fetchShared = async () => {
      try {
        const { data, error } = await supabase.functions.invoke<SharedResponse>("public-share", {
          body: { token },
        });

        if (error) {
          throw error;
        }

        setData(data ?? null);
      } catch (err: any) {
        setError("Não foi possível carregar os dados compartilhados.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchShared();
  }, [token]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-sm text-muted-foreground">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Carregando dados da obra compartilhada...
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
        <AlertTriangle className="mb-3 h-6 w-6 text-primary" />
        <p className="text-sm text-muted-foreground max-w-xs">{error ?? "Link inválido ou expirado."}</p>
      </div>
    );
  }

  const { obra, etapas, gastos, totalGasto, orcamentoPrevisto } = data;

  const usedPercent = orcamentoPrevisto
    ? Math.min(100, Math.round((totalGasto / orcamentoPrevisto) * 100))
    : 0;

  const diasCorridos = obra.data_inicio
    ? Math.max(
        0,
        Math.floor(
          (new Date().getTime() - new Date(obra.data_inicio as string).getTime()) /
            (1000 * 60 * 60 * 24),
        ),
      )
    : null;

  const totalEtapas = etapas.length;
  const concluidas = etapas.filter((e) => e.status === "concluida").length;
  const progressoObra = totalEtapas > 0 ? Math.round((concluidas / totalEtapas) * 100) : 0;

  const formatCurrency = (value: number | null) => {
    if (value === null) return "—";
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  return (
    <div className="min-h-screen bg-background px-4 py-6 text-foreground">
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <header className="space-y-1 text-center md:text-left animate-fade-in">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-primary">
            Visão compartilhada
          </p>
          <h1 className="text-2xl font-semibold leading-tight tracking-tight md:text-3xl">
            {obra.nome}
          </h1>
          <p className="text-xs text-muted-foreground">
            Painel somente leitura para acompanhar gastos, etapas e andamento desta obra.
          </p>
        </header>

        <section className="grid grid-cols-1 gap-3 sm:grid-cols-3 animate-fade-in">
          <Card className="card-elevated">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                Orçamento
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-baseline justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Total previsto</p>
                  <p className="text-base font-semibold">
                    {orcamentoPrevisto !== null ? formatCurrency(orcamentoPrevisto) : "Não informado"}
                  </p>
                </div>
                <div className="text-right text-xs">
                  <p className="text-muted-foreground">Gasto até agora</p>
                  <p className="font-medium">
                    {formatCurrency(totalGasto)} {orcamentoPrevisto !== null && `(${usedPercent}%)`}
                  </p>
                </div>
              </div>
              <Progress value={usedPercent} className="h-1.5" />
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                Etapas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-baseline justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Concluídas</p>
                  <p className="text-base font-semibold">
                    {concluidas}/{totalEtapas}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Progresso físico</p>
                  <p className="text-base font-semibold">{progressoObra}%</p>
                </div>
              </div>
              <Progress value={progressoObra} className="h-1.5" />
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                Prazo
              </CardTitle>
              <CalendarDays className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p className="text-xs text-muted-foreground">Dias corridos desde o início</p>
              <p className="text-base font-semibold">
                {diasCorridos !== null ? `${diasCorridos} dias` : "Data de início não informada"}
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-2 animate-fade-in">
          <h2 className="text-sm font-medium">Gastos por etapa</h2>
          <div className="space-y-2 text-xs text-muted-foreground">
            {etapas.map((etapa) => {
              const totalEtapa = gastos
                .filter((g) => g.etapa_id === etapa.id)
                .reduce((sum, g) => sum + Number(g.valor ?? 0), 0);

              return (
                <Card key={etapa.id} className="card-elevated">
                  <CardHeader className="flex flex-row items-center justify-between pb-1.5">
                    <CardTitle className="text-sm font-medium">{etapa.nome}</CardTitle>
                    <span className="text-[11px] text-muted-foreground">
                      {etapa.status === "concluida" ? "Concluída" : "Em andamento"}
                    </span>
                  </CardHeader>
                  <CardContent className="space-y-1.5 text-xs">
                    <div className="flex items-baseline justify-between">
                      <span>Gasto acumulado</span>
                      <span className="font-medium text-foreground">{formatCurrency(totalEtapa)}</span>
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span>Orçamento previsto</span>
                      <span className="font-medium text-foreground">
                        {formatCurrency(etapa.orcamento_previsto ? Number(etapa.orcamento_previsto) : null)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        <section className="space-y-2 animate-fade-in">
          <h2 className="text-sm font-medium">Detalhes dos gastos</h2>
          {gastos.length === 0 ? (
            <p className="text-xs text-muted-foreground">
              Nenhum gasto cadastrado ainda nesta obra.
            </p>
          ) : (
            <div className="space-y-1.5 rounded-2xl border border-border/60 bg-card/60 p-3 text-xs">
              {gastos.slice(0, 40).map((gasto) => {
                const etapa = etapas.find((e) => e.id === gasto.etapa_id);
                return (
                  <div
                    key={gasto.id}
                    className="flex items-baseline justify-between gap-3 border-b border-border/40 pb-1.5 last:border-0 last:pb-0"
                  >
                    <div className="space-y-0.5">
                      <p className="font-medium text-foreground">
                        {formatCurrency(Number(gasto.valor ?? 0))}
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        {etapa?.nome || "Etapa não informada"} · {gasto.tipo}
                      </p>
                    </div>
                    <span className="text-[11px] text-muted-foreground whitespace-nowrap">
                      {new Date(gasto.data_pagamento).toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
          <p className="text-[11px] text-muted-foreground">
            Esta visão é somente para acompanhamento. Qualquer ajuste de valor ou etapa precisa ser feito pelo
            dono da obra dentro do aplicativo Minha Obra.
          </p>
        </section>
      </main>
    </div>
  );
};
