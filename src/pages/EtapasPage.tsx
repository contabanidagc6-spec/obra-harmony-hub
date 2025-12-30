import { useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";

const etapas = [
  {
    id: "fundacao",
    nome: "Fundação",
    status: "Concluída",
    previsto: 40000,
    gasto: 42000,
    progresso: 100,
  },
  {
    id: "estrutural",
    nome: "Estrutura e alvenaria",
    status: "Em andamento",
    previsto: 80000,
    gasto: 52000,
    progresso: 65,
  },
  {
    id: "revestimentos",
    nome: "Revestimentos",
    status: "Planejada",
    previsto: 50000,
    gasto: 0,
    progresso: 5,
  },
];

export const EtapasPage = () => {
  useEffect(() => {
    document.title = "Minha Obra | Etapas";
  }, []);

  return (
    <div className="space-y-4">
      <header className="space-y-1">
        <h1 className="text-xl font-semibold">Etapas da obra</h1>
        <p className="text-sm text-muted-foreground">
          Visualize o avanço financeiro e físico de cada etapa.
        </p>
      </header>

      <div className="space-y-3">
        {etapas.map((etapa) => {
          const desvio = etapa.gasto - etapa.previsto;
          const statusTone = desvio > 0 ? "critical" : etapa.progresso >= 90 ? "good" : "warning";

          return (
            <Card key={etapa.id} className="card-elevated hover-scale">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle className="text-sm font-medium">{etapa.nome}</CardTitle>
                  <p className="text-xs text-muted-foreground">{etapa.status}</p>
                </div>
                <div className="text-right text-xs">
                  <p className="text-muted-foreground">Previsto</p>
                  <p className="font-semibold">
                    R$ {etapa.previsto.toLocaleString("pt-BR")}
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Gasto realizado</span>
                  <span className="font-medium">
                    R$ {etapa.gasto.toLocaleString("pt-BR")} • {etapa.progresso}%
                  </span>
                </div>
                <Progress value={etapa.progresso} className="h-1.5" />

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
                    {desvio > 0 ? `+R$ ${Math.abs(desvio).toLocaleString("pt-BR")}` : "Dentro do previsto"}
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
