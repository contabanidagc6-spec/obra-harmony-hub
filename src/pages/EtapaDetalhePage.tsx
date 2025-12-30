import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const gastosExemplo = [
  {
    descricao: "Concreto usinado",
    tipo: "Material",
    valor: 18000,
    data: "10/02/2025",
    temAnexo: true,
  },
  {
    descricao: "Mão de obra fundação",
    tipo: "Mão de obra",
    valor: 22000,
    data: "25/02/2025",
    temAnexo: false,
  },
];

export const EtapaDetalhePage = () => {
  const { id } = useParams();

  useEffect(() => {
    document.title = `Minha Obra | Etapa ${id ?? ""}`;
  }, [id]);

  return (
    <div className="space-y-4">
      <header className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold leading-tight">Fundação</h1>
          <p className="text-sm text-muted-foreground">Resumo financeiro e lista de gastos da etapa.</p>
        </div>
        <Button size="sm" asChild>
          <a href="#novo-gasto">Novo gasto</a>
        </Button>
      </header>

      <section className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Card className="card-elevated">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-[0.18em]">
              Orçamento previsto
            </CardTitle>
          </CardHeader>
          <CardContent className="text-lg font-semibold">R$ 40.000</CardContent>
        </Card>
        <Card className="card-elevated">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-[0.18em]">
              Total gasto
            </CardTitle>
          </CardHeader>
          <CardContent className="text-lg font-semibold">R$ 42.000</CardContent>
        </Card>
        <Card className="card-elevated">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-[0.18em]">
              Diferença
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span className="status-pill-critical">+ R$ 2.000</span>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-2">
        <h2 className="text-sm font-medium">Gastos da etapa</h2>
        <div className="space-y-2 rounded-2xl border border-dashed border-border/80 bg-card/60 px-3 py-2.5 text-[11px] text-muted-foreground">
          <p>Liste aqui tudo o que foi gasto nessa etapa: materiais, mão de obra e serviços.</p>
          <p>Isso ajuda a entender onde o orçamento está sendo usado.</p>
        </div>
        <div className="divide-y rounded-2xl border bg-card/80">
          {gastosExemplo.map((gasto, index) => (
            <div key={index} className="flex items-center justify-between gap-3 px-3 py-3 text-xs">
              <div>
                <p className="font-medium leading-snug">{gasto.descricao}</p>
                <p className="text-[11px] text-muted-foreground">
                  {gasto.tipo} • {gasto.data}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold">
                  R$ {gasto.valor.toLocaleString("pt-BR")}
                </p>
                {gasto.temAnexo && <p className="text-[11px] text-primary">Ver anexo</p>}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
