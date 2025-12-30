import { useEffect } from "react";
import { PlusCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const decisoes = [
  {
    nome: "Piso sala e cozinha",
    status: "Pendente",
    impacto: "↑",
  },
  {
    nome: "Tipo de esquadria",
    status: "Decidido",
    impacto: "↓",
  },
];

export const DecisoesPage = () => {
  useEffect(() => {
    document.title = "Minha Obra | Decisões";
  }, []);

  return (
    <div className="space-y-4">
      <header className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold">Decisões da obra</h1>
          <p className="text-sm text-muted-foreground">
            Deixe claro o que ainda precisa ser decidido e o impacto no custo.
          </p>
        </div>
        <Button size="sm" className="inline-flex items-center gap-1">
          <PlusCircle className="h-4 w-4" /> Nova decisão
        </Button>
      </header>

      <section className="space-y-2">
        {decisoes.map((d, index) => (
          <Card key={index} className="card-elevated">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{d.nome}</CardTitle>
              <span
                className={
                  d.status === "Decidido" ? "status-pill-good" : "status-pill-warning"
                }
              >
                {d.status}
              </span>
            </CardHeader>
            <CardContent className="flex items-center justify-between text-xs">
              <p className="text-muted-foreground">
                Impacto no custo: {d.impacto === "↑" ? "tende a aumentar" : "tende a reduzir"}
              </p>
              <button className="text-primary underline-offset-2 hover:underline">
                Ver anexos
              </button>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
};
