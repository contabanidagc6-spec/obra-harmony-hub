import { useEffect, useState } from "react";
import { TrendingUp, AlertTriangle, CalendarDays, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { useToast } from "@/components/ui/use-toast";

type Obra = Tables<"obras">;
type Etapa = Tables<"etapas">;

type DashboardAlert = {
  type: "financeiro" | "prazo";
  label: string;
  tone: "warning" | "critical";
};

type EtapaComparativoDatum = {
  nome: string;
  gastoReal: number;
  gastoPrevisto: number;
};

export const DashboardPage = () => {
  const { toast } = useToast();
  const [obra, setObra] = useState<Obra | null>(null);
  const [totalGasto, setTotalGasto] = useState(0);
  const [diasCorridos, setDiasCorridos] = useState<number | null>(null);
  const [progressoObra, setProgressoObra] = useState(0);
  const [alerts, setAlerts] = useState<DashboardAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [etapasComparativo, setEtapasComparativo] = useState<EtapaComparativoDatum[]>([]);

  useEffect(() => {
    document.title = "Minha Obra | Dashboard";

    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          setLoading(false);
          return;
        }

        const { data: obras, error: obrasError } = await supabase
          .from("obras")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: true })
          .limit(1);

        if (obrasError) throw obrasError;

        const currentObra = obras && obras.length > 0 ? (obras[0] as Obra) : null;
        setObra(currentObra);

        if (!currentObra) {
          setLoading(false);
          return;
        }

        const { data: etapasData, error: etapasError } = await supabase
          .from("etapas")
          .select("*")
          .eq("obra_id", currentObra.id);

        if (etapasError) throw etapasError;

        const etapas = (etapasData as Etapa[]) || [];
        const etapaIds = etapas.map((e) => e.id);

        let totalGastoObra = 0;
        const gastosPorEtapa: Record<string, number> = {};

        if (etapaIds.length > 0) {
          const { data: gastosData, error: gastosError } = await supabase
            .from("gastos")
            .select("valor, etapa_id")
            .in("etapa_id", etapaIds as string[]);

          if (gastosError) throw gastosError;

          (gastosData || []).forEach((gasto: any) => {
            const valor = Number(gasto.valor ?? 0);
            totalGastoObra += valor;
            const etapaId = gasto.etapa_id as string;
            gastosPorEtapa[etapaId] = (gastosPorEtapa[etapaId] || 0) + valor;
          });
        }

        setTotalGasto(totalGastoObra);

        const etapasComparativoData: EtapaComparativoDatum[] = etapas.map((etapa) => {
          const gastoReal = gastosPorEtapa[etapa.id] || 0;
          const gastoPrevisto = etapa.orcamento_previsto ? Number(etapa.orcamento_previsto) : 0;
          return {
            nome: etapa.nome,
            gastoReal,
            gastoPrevisto,
          };
        });

        setEtapasComparativo(etapasComparativoData);

        const totalEtapas = etapas.length;
        const concluidas = etapas.filter((e) => e.status === "concluida").length;
        const progressoPercent = totalEtapas > 0 ? Math.round((concluidas / totalEtapas) * 100) : 0;
        setProgressoObra(progressoPercent);

        let diffDays: number | null = null;

        if (currentObra.data_inicio) {
          const inicio = new Date(currentObra.data_inicio as string);
          const hoje = new Date();
          const diffMs = hoje.getTime() - inicio.getTime();
          diffDays = diffMs > 0 ? Math.floor(diffMs / (1000 * 60 * 60 * 24)) : 0;
          setDiasCorridos(diffDays);
        } else {
          setDiasCorridos(null);
        }

        const newAlerts: DashboardAlert[] = [];

        if (currentObra.orcamento_estimado) {
          const orcamento = Number(currentObra.orcamento_estimado);
          if (orcamento > 0) {
            const desvioPercent = (totalGastoObra / orcamento) * 100;
            if (desvioPercent >= 110) {
              newAlerts.push({
                type: "financeiro",
                label: "Gastos acima do orçamento previsto da obra",
                tone: "critical",
              });
            } else if (desvioPercent >= 90) {
              newAlerts.push({
                type: "financeiro",
                label: "Obra próxima de atingir o orçamento previsto",
                tone: "warning",
              });
            }
          }
        }

        if (diffDays !== null && totalEtapas > 0) {
          if (diffDays > 60 && progressoPercent < 30) {
            newAlerts.push({
              type: "prazo",
              label: "Progresso físico abaixo do esperado para o tempo de obra",
              tone: "critical",
            });
          } else if (diffDays > 30 && progressoPercent < 20) {
            newAlerts.push({
              type: "prazo",
              label: "Acompanhe o cronograma para evitar atrasos na obra",
              tone: "warning",
            });
          }
        }

        setAlerts(newAlerts);
      } catch (error) {
        console.error("Erro ao carregar dados do dashboard:", error);
        toast({
          title: "Não foi possível carregar o dashboard",
          description: "Tente novamente em alguns instantes.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [toast]);

  const orcamentoPrevisto = obra?.orcamento_estimado
    ? Number(obra.orcamento_estimado)
    : null;

  const usedPercent = orcamentoPrevisto
    ? Math.min(100, (totalGasto / orcamentoPrevisto) * 100)
    : 0;

  const roundedUsedPercent = Math.round(usedPercent);

  const budgetData = [
    { name: "Usado", value: roundedUsedPercent },
    { name: "Restante", value: Math.max(0, 100 - roundedUsedPercent) },
  ];

  const formatCurrency = (value: number | null) => {
    if (value === null) return "—";
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="space-y-6 md:space-y-8">
      <section className="flex items-start justify-between gap-3 animate-fade-in">
        <div>
          <h1 className="text-2xl font-semibold leading-tight tracking-tight md:text-3xl">
            Resumo da sua obra
          </h1>
          <p className="text-sm text-muted-foreground">
            Em poucos segundos você enxerga se os gastos e o andamento estão dentro do combinado.
          </p>
        </div>
        <Button size="sm" variant="outline" className="hidden sm:inline-flex">
          Exportar relatório rápido
        </Button>
      </section>

      {loading && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          Carregando dados da sua obra...
        </div>
      )}

      {!loading && !obra && (
        <p className="text-xs text-muted-foreground">
          Nenhuma obra encontrada. Crie uma obra para visualizar o dashboard.
        </p>
      )}

      <section className="grid grid-cols-1 gap-3 sm:grid-cols-3 animate-fade-in">
        <Card className="card-elevated hover-scale">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Orçamento
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-baseline justify-between text-sm">
              <div>
                <p className="text-xs text-muted-foreground">Total previsto</p>
                <p className="text-base font-semibold">
                  {orcamentoPrevisto !== null
                    ? formatCurrency(orcamentoPrevisto)
                    : "Defina nas configurações"}
                </p>
              </div>
              <div className="text-right text-xs">
                <p className="text-muted-foreground">Gasto até agora</p>
                <p className="font-medium">
                  {formatCurrency(totalGasto)}
                  {orcamentoPrevisto !== null && ` (${roundedUsedPercent}%)`}
                </p>
              </div>
            </div>
            <Progress value={roundedUsedPercent} className="h-1.5" />
          </CardContent>
        </Card>

        <Card className="card-elevated hover-scale">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Status da obra
            </CardTitle>
            <div className="status-pill-warning">Atenção</div>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p className="text-muted-foreground">
              Pequenos desvios em algumas etapas. Bom momento para conversar com a equipe e ajustar o rumo
              com calma.
            </p>
          </CardContent>
        </Card>

        <Card className="card-elevated hover-scale">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Prazo
            </CardTitle>
            <CalendarDays className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex items-baseline justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Dias corridos</p>
                <p className="text-base font-semibold">
                  {diasCorridos !== null ? `${diasCorridos} dias` : "Defina a data de início"}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Concluído</p>
                <p className="text-base font-semibold">{progressoObra}%</p>
              </div>
            </div>
            <Progress value={progressoObra} className="h-1.5" />
          </CardContent>
        </Card>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] animate-fade-in">
        <Card className="card-elevated hover-scale">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Orçamento usado x restante</CardTitle>
          </CardHeader>
          <CardContent className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={budgetData}
                barSize={32}
                className="animate-scale-in"
              >
                <XAxis dataKey="name" hide />
                <YAxis hide domain={[0, 100]} />
                <Tooltip
                  cursor={{ fill: "hsl(var(--muted))/0.4" }}
                  formatter={(value: number, name: string) => [`${value}%`, name]}
                  contentStyle={{
                    backgroundColor: "hsl(var(--background))",
                    borderRadius: 12,
                    border: "1px solid hsl(var(--border))",
                    fontSize: 12,
                  }}
                />
                <Bar
                  dataKey="value"
                  radius={[16, 16, 16, 16]}
                  isAnimationActive
                  animationDuration={600}
                >
                  {budgetData.map((entry, index) => (
                    <Cell
                      // eslint-disable-next-line react/no-array-index-key
                      key={`cell-${index}`}
                      fill={
                        entry.name === "Usado"
                          ? "hsl(var(--accent))"
                          : "hsl(var(--primary))"
                      }
                      className="transition-all duration-200 hover:brightness-110"
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Alertas</CardTitle>
            <div
              className={
                alerts.length > 0
                  ? "status-pill-critical text-xs"
                  : "status-pill-good text-xs"
              }
            >
              {alerts.length > 0
                ? `${alerts.length} pendente${alerts.length > 1 ? "s" : ""}`
                : "Sem alertas"}
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {alerts.length === 0 && (
              <p className="text-xs text-muted-foreground">
                Nenhum alerta no momento. Siga acompanhando aqui para evitar surpresas no orçamento e no
                prazo.
              </p>
            )}

            {alerts.map((alert, index) => (
              <div
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                className="flex items-start gap-2 rounded-xl bg-muted/60 px-3 py-2.5 text-xs animate-fade-in"
              >
                <AlertTriangle
                  className="mt-0.5 h-3.5 w-3.5"
                  color={
                    alert.tone === "critical"
                      ? "hsl(var(--status-critical))"
                      : "hsl(var(--status-warning))"
                  }
                />
                <div>
                  <p className="font-medium leading-snug">{alert.label}</p>
                  <p className="text-[11px] text-muted-foreground">
                    Toque para ver as etapas relacionadas.
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] animate-fade-in">
        <Card className="card-elevated hover-scale">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Gastos reais x previstos por etapa
            </CardTitle>
          </CardHeader>
          <CardContent className="h-60">
            {etapasComparativo.length === 0 ? (
              <p className="text-xs text-muted-foreground">
                Cadastre etapas com orçamento previsto e registre gastos para acompanhar a comparação por fase
                da obra.
              </p>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={etapasComparativo}
                  barGap={6}
                  className="animate-scale-in"
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="hsl(var(--muted))"
                  />
                  <XAxis
                    dataKey="nome"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                  />
                  <Tooltip
                    cursor={{ fill: "hsl(var(--muted))/0.3" }}
                    contentStyle={{
                      backgroundColor: "hsl(var(--background))",
                      borderRadius: 12,
                      border: "1px solid hsl(var(--border))",
                      fontSize: 12,
                    }}
                    formatter={(value: number, name: string) => [
                      value.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }),
                      name === "gastoReal" ? "Gasto real" : "Gasto previsto",
                    ]}
                  />
                  <Bar
                    dataKey="gastoPrevisto"
                    stackId="gastos"
                    radius={[8, 8, 0, 0]}
                    fill="hsl(var(--primary))/0.4"
                    stroke="hsl(var(--primary))"
                    isAnimationActive
                    animationDuration={600}
                  />
                  <Bar
                    dataKey="gastoReal"
                    stackId="gastos"
                    radius={[8, 8, 0, 0]}
                    fill="hsl(var(--primary))"
                    stroke="hsl(var(--primary))"
                    isAnimationActive
                    animationDuration={700}
                    className="transition-all duration-200 hover:brightness-110"
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <div className="hidden md:block" />
      </section>
    </div>
  );
};
