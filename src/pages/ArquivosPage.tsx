import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const arquivos = [
  { nome: "Orçamento geral.pdf", tipo: "Orçamento", etapa: "Geral" },
  { nome: "Contrato empreiteiro.pdf", tipo: "Contrato", etapa: "Fundação" },
  { nome: "Nota piso sala.jpg", tipo: "Nota fiscal", etapa: "Revestimentos" },
];

export const ArquivosPage = () => {
  useEffect(() => {
    document.title = "Minha Obra | Arquivos";
  }, []);

  return (
    <div className="space-y-4">
      <header className="space-y-1">
        <h1 className="text-xl font-semibold">Arquivos da obra</h1>
        <p className="text-sm text-muted-foreground">
          Centralize orçamentos, contratos, notas fiscais e fotos em um só lugar.
        </p>
      </header>

      <section className="grid grid-cols-2 gap-3 text-xs sm:grid-cols-3">
        <button className="card-elevated flex flex-col items-start gap-1 px-3 py-2.5 text-left">
          <span className="font-medium">Orçamentos</span>
          <span className="text-[11px] text-muted-foreground">Propostas e planilhas</span>
        </button>
        <button className="card-elevated flex flex-col items-start gap-1 px-3 py-2.5 text-left">
          <span className="font-medium">Contratos</span>
          <span className="text-[11px] text-muted-foreground">Acordos formais</span>
        </button>
        <button className="card-elevated flex flex-col items-start gap-1 px-3 py-2.5 text-left">
          <span className="font-medium">Notas fiscais</span>
          <span className="text-[11px] text-muted-foreground">Comprovantes da obra</span>
        </button>
      </section>

      <section className="space-y-2">
        <h2 className="text-sm font-medium">Arquivos recentes</h2>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {arquivos.map((a, index) => (
            <Card key={index} className="card-elevated">
              <CardHeader className="pb-2">
                <CardTitle className="line-clamp-1 text-sm font-medium">{a.nome}</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-between text-[11px] text-muted-foreground">
                <span>{a.tipo}</span>
                <Badge variant="outline">{a.etapa}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};
