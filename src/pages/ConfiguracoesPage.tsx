import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const ConfiguracoesPage = () => {
  useEffect(() => {
    document.title = "Minha Obra | Configurações";
  }, []);

  return (
    <div className="space-y-4">
      <header className="space-y-1">
        <h1 className="text-xl font-semibold">Configurações da obra</h1>
        <p className="text-sm text-muted-foreground">
          Ajuste informações gerais, etapas e orçamento total da sua obra.
        </p>
      </header>

      <section className="space-y-3 text-sm">
        <Card className="card-elevated">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Dados da obra</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-xs text-muted-foreground">
            <p>Nome da obra, tipo (construção ou reforma), área e datas.</p>
            <Button size="sm" variant="outline">
              Editar dados da obra
            </Button>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Etapas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-xs text-muted-foreground">
            <p>Adicione, remova ou reordene as etapas conforme o planejamento.</p>
            <Button size="sm" variant="outline">
              Ajustar etapas
            </Button>
          </CardContent>
        </Card>

        <Card className="card-elevated border-destructive/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-destructive">
              Excluir obra
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-xs text-muted-foreground">
            <p>
              Essa ação apaga todos os dados da obra. Use apenas se tiver certeza de que não
              precisa mais dessas informações.
            </p>
            <Button size="sm" variant="destructive">
              Excluir obra
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};
