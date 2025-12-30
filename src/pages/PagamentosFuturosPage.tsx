import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const pagamentos = [
  {
    data: "10/04/2025",
    descricao: "Salário equipe estrutural",
    valor: 12000,
    etapa: "Estrutura",
    status: "Pendente",
  },
  {
    data: "20/04/2025",
    descricao: "Lote revestimentos banheiro",
    valor: 4800,
    etapa: "Revestimentos",
    status: "Agendado",
  },
];

export const PagamentosFuturosPage = () => {
  useEffect(() => {
    document.title = "Minha Obra | Pagamentos";
  }, []);

  const total7dias = 12000;
  const total30dias = 16800;

  return (
    <div className="space-y-4">
      <header className="space-y-1">
        <h1 className="text-xl font-semibold">Pagamentos futuros</h1>
        <p className="text-sm text-muted-foreground">
          Veja o que vai vencer em breve para evitar surpresas no caixa.
        </p>
      </header>

      <section className="grid grid-cols-2 gap-3 text-sm">
        <Card className="card-elevated">
          <CardHeader className="pb-1">
            <CardTitle className="text-xs text-muted-foreground">Total a pagar em 7 dias</CardTitle>
          </CardHeader>
          <CardContent className="text-lg font-semibold">R$ {total7dias.toLocaleString("pt-BR")}</CardContent>
        </Card>
        <Card className="card-elevated">
          <CardHeader className="pb-1">
            <CardTitle className="text-xs text-muted-foreground">Total a pagar em 30 dias</CardTitle>
          </CardHeader>
          <CardContent className="text-lg font-semibold">R$ {total30dias.toLocaleString("pt-BR")}</CardContent>
        </Card>
      </section>

      <section className="space-y-2">
        <h2 className="text-sm font-medium">Agenda de pagamentos</h2>
        <div className="space-y-2">
          {pagamentos.map((p, index) => (
            <div
              key={index}
              className="flex items-center justify-between gap-3 rounded-2xl border bg-card/80 px-3 py-2.5 text-xs"
            >
              <div>
                <p className="font-medium leading-snug">{p.descricao}</p>
                <p className="text-[11px] text-muted-foreground">
                  {p.data} • {p.etapa}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold">
                  R$ {p.valor.toLocaleString("pt-BR")}
                </p>
                <Button size="sm" variant="outline" className="mt-1">
                  Marcar como pago
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
