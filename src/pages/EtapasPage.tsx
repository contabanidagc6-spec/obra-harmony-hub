import { useEffect, useState } from "react";
import { ChevronRight, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { useToast } from "@/components/ui/use-toast";
type Etapa = Tables<"etapas">;

type EtapaComTotais = {
  etapa: Etapa;
  gastoTotal: number;
  progresso: number;
};

export const EtapasPage = () => {
  const { toast } = useToast();
  const [etapas, setEtapas] = useState<EtapaComTotais[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Minha Obra | Etapas";

    const fetchEtapas = async () => {
      try {
        setLoading(true);

        const { data: etapasData, error: etapasError } = await supabase
          .from("etapas")
          .select("*")
          .order("created_at", { ascending: true });

        if (etapasError) throw etapasError;

        if (!etapasData || etapasData.length === 0) {
          setEtapas([]);
          return;
        }

        const etapaIds = etapasData.map((e) => e.id);

        const { data: gastosAgg, error: gastosError } = await supabase
          .from("gastos")
          .select("etapa_id, total:sum(valor)")
          .in("etapa_id", etapaIds as string[]);

        if (gastosError) throw gastosError;

        const totaisPorEtapa = new Map<string, number>();
        (gastosAgg || []).forEach((item: any) => {
          if (item.etapa_id) {
            totaisPorEtapa.set(item.etapa_id, Number(item.total) || 0);
          }
        });

        const statusProgressoMap: Record<string, number> = {
          "nao-iniciada": 5,
          "em-andamento": 50,
          concluida: 100,
        };

        const etapasComTotais: EtapaComTotais[] = etapasData.map((etapa) => {
          const gastoTotal = totaisPorEtapa.get(etapa.id) ?? 0;
          const orcamentoPrevisto = etapa.orcamento_previsto
            ? Number(etapa.orcamento_previsto)
            : 0;

          let progresso = statusProgressoMap[etapa.status] ?? 0;

          if (orcamentoPrevisto > 0) {
            progresso = Math.min(100, (gastoTotal / orcamentoPrevisto) * 100);
          }

          return {
            etapa,
            gastoTotal,
            progresso: Math.round(progresso),
          };
        });

        setEtapas(etapasComTotais);
      } catch (error) {
        console.error("Erro ao carregar etapas:", error);
        toast({
          title: "Não foi possível carregar as etapas",
          description: "Tente novamente em alguns instantes.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchEtapas();
  }, [toast]);

  const statusLabelMap: Record<string, string> = {
    "nao-iniciada": "Não iniciada",
    "em-andamento": "Em andamento",
    concluida: "Concluída",
  };

  return (
    <div className="space-y-4">
      <header className="space-y-1">
        <h1 className="text-xl font-semibold">Etapas da obra</h1>
        <p className="text-sm text-muted-foreground">
          Visualize o avanço financeiro e físico de cada etapa.
        </p>
      </header>

      <div className="space-y-3">
        {loading && (
          <div className="flex justify-center py-8">
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          </div>
        )}

        {!loading && etapas.length === 0 && (
          <p className="text-xs text-muted-foreground">
            Nenhuma etapa encontrada. Comece criando sua primeira obra no
            onboarding ou ajustando as etapas da obra.
          </p>
        )}

        {!loading &&
          etapas.map(({ etapa, gastoTotal, progresso }) => {
            const orcamentoPrevisto = etapa.orcamento_previsto
              ? Number(etapa.orcamento_previsto)
              : 0;
            const desvio = orcamentoPrevisto > 0 ? gastoTotal - orcamentoPrevisto : 0;
            const statusTone =
              desvio > 0 ? "critical" : progresso >= 90 ? "good" : "warning";

            return (
              <Card key={etapa.id} className="card-elevated hover-scale">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle className="text-sm font-medium">{etapa.nome}</CardTitle>
                    <p className="text-xs text-muted-foreground">
                      {statusLabelMap[etapa.status] ?? etapa.status}
                    </p>
                  </div>
                  <div className="text-right text-xs">
                    <p className="text-muted-foreground">Previsto</p>
                    <p className="font-semibold">
                      {orcamentoPrevisto
                        ? `R$ ${orcamentoPrevisto.toLocaleString("pt-BR")}`
                        : "—"}
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Gasto realizado</span>
                    <span className="font-medium">
                      R$ {gastoTotal.toLocaleString("pt-BR")} • {progresso}%
                    </span>
                  </div>
                  <Progress value={progresso} className="h-1.5" />

                  <div className="flex items-center justify-between">
                    <span
                      className={
                        statusTone === "good"
                          ? "status-pill-good"
                          : statusTone === "warning"
                          ? "status-pill-warning"
                          : "status-pill-critical"
                      }
                    >
                      {orcamentoPrevisto > 0 && desvio > 0
                        ? `+R$ ${Math.abs(desvio).toLocaleString("pt-BR")}`
                        : "Dentro do previsto"}
                    </span>
                    <div className="flex gap-2">
                      <Button asChild variant="outline" size="sm">
                        <Link to={`/etapas/${etapa.id}`}>Ver detalhes</Link>
                      </Button>
                      <Button asChild size="sm" variant="secondary">
                        <Link to="/gastos/novo">Adicionar gasto</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}

        <button className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-primary story-link">
          Ajustar etapas da obra
          <ChevronRight className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
};
