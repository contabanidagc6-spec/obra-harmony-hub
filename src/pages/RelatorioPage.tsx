import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const RelatorioPage = () => {
  useEffect(() => {
    document.title = "Minha Obra | Relatório";
  }, []);

  return (
    <div className="space-y-4">
      <header className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold">Relatório da obra</h1>
          <p className="text-sm text-muted-foreground">
            Resumo financeiro e de andamento para compartilhar com quem importa.
          </p>
        </div>
        <Button size="sm" variant="outline">
          Exportar PDF
        </Button>
      </header>

      <section className="space-y-3 text-sm">
        <Card className="card-elevated">
          <CardHeader className="pb-1">
            <CardTitle className="text-sm font-medium">Orçamento inicial x final</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-xs text-muted-foreground">
            <p>Inicial: R$ 250.000</p>
            <p>Projeção atual: R$ 262.000</p>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardHeader className="pb-1">
            <CardTitle className="text-sm font-medium">Etapas com desvio</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-xs text-muted-foreground">
            <p>Fundação: + R$ 2.000</p>
            <p>Revestimentos: risco de aumento por escolha de materiais.</p>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardHeader className="pb-1">
            <CardTitle className="text-sm font-medium">Linha do tempo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-xs text-muted-foreground">
            <p>Início: 10/01/2025</p>
            <p>Previsão de entrega: 30/11/2025</p>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardHeader className="pb-1">
            <CardTitle className="text-sm font-medium">Principais decisões</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-xs text-muted-foreground">
            <p>Troca de piso da área social por opção de maior durabilidade.</p>
            <p>Redução de pontos de iluminação em áreas de circulação.</p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};
