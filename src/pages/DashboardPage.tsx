import { useEffect } from "react";
import { TrendingUp, AlertTriangle, CalendarDays } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const budgetData = [
  { name: "Usado", value: 60 },
  { name: "Restante", value: 40 },
];

const alerts = [
  {
    type: "financeiro",
    label: "Gasto acima do previsto em Fundação",
    tone: "warning" as const,
  },
  {
    type: "prazo",
    label: "Revestimentos com risco de atraso",
    tone: "critical" as const,
  },
];

export const DashboardPage = () => {
  useEffect(() => {
    document.title = "Minha Obra | Dashboard";
  }, []);

  return (
    <div className="space-y-4">
      <section className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold leading-tight">Visão geral da obra</h1>
          <p className="text-sm text-muted-foreground">
            Acompanhe o orçamento, o prazo e os principais alertas em tempo real.
          </p>
        </div>
        <Button size="sm" variant="outline" className="hidden sm:inline-flex">
          Exportar relatório rápido
        </Button>
      </section>

      <section className="grid grid-cols-1 gap-3 sm:grid-cols-3">
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
                <p className="text-base font-semibold">R$ 250.000</p>
              </div>
              <div className="text-right text-xs">
                <p className="text-muted-foreground">Gasto até agora</p>
                <p className="font-medium">R$ 150.000 (60%)</p>
              </div>
            </div>
            <Progress value={60} className="h-1.5" />
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
              Pequenos desvios em algumas etapas. Ótimo momento para revisar decisões.
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
                <p className="text-base font-semibold">86 dias</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Concluído</p>
                <p className="text-base font-semibold">45%</p>
              </div>
            </div>
            <Progress value={45} className="h-1.5" />
          </CardContent>
        </Card>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <Card className="card-elevated">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Orçamento usado x restante</CardTitle>
          </CardHeader>
          <CardContent className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={budgetData} stackOffset="none" barSize={32}>
                <XAxis dataKey="name" hide />
                <YAxis hide domain={[0, 100]} />
                <Tooltip
                  cursor={{ fill: "transparent" }}
                  formatter={(value: number, name: string) => [`${value}%`, name]}
                />
                <Bar dataKey="value" radius={[16, 16, 16, 16]}>
                  {budgetData.map((entry, index) => (
                    <Cell
                      // eslint-disable-next-line react/no-array-index-key
                      key={`cell-${index}`}
                      fill={
                        entry.name === "Usado"
                          ? "hsl(var(--accent))"
                          : "hsl(var(--primary))"
                      }
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
            <div className="status-pill-critical text-xs">2 pendentes</div>
          </CardHeader>
          <CardContent className="space-y-2">
            {alerts.map((alert, index) => (
              <div
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                className="flex items-start gap-2 rounded-xl bg-muted/60 px-3 py-2.5 text-xs"
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
    </div>
  );
};
