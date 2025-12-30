import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Paperclip, Download } from "lucide-react";

interface Gasto {
  id: string;
  valor: number;
  tipo: string;
  data_pagamento: string;
  observacoes?: string;
  arquivos: Array<{
    id: string;
    nome_arquivo: string;
    storage_path: string;
    tipo_arquivo: string;
  }>;
}

export const EtapaDetalhePage = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [gastos, setGastos] = useState<Gasto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = `Minha Obra | Etapa ${id ?? ""}`;
    fetchGastos();
  }, [id]);

  const fetchGastos = async () => {
    try {
      // TODO: substituir "fundacao" pelo etapa_id real
      const { data, error } = await supabase
        .from("gastos")
        .select(`
          id,
          valor,
          tipo,
          data_pagamento,
          observacoes,
          arquivos(id, nome_arquivo, storage_path, tipo_arquivo)
        `)
        .eq("etapa_id", id || "fundacao");

      if (error) throw error;
      setGastos(data || []);
    } catch (error: any) {
      toast({
        title: "Erro ao carregar gastos",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (storagePath: string, nomeArquivo: string) => {
    try {
      const { data, error } = await supabase.storage
        .from("obra-files")
        .download(storagePath);

      if (error) throw error;

      const url = URL.createObjectURL(data);
      const a = document.createElement("a");
      a.href = url;
      a.download = nomeArquivo;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error: any) {
      toast({
        title: "Erro ao baixar arquivo",
        description: error.message,
        variant: "destructive",
      });
    }
  };

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
        {loading ? (
          <p className="text-xs text-muted-foreground">Carregando...</p>
        ) : gastos.length === 0 ? (
          <div className="space-y-2 rounded-2xl border border-dashed border-border/80 bg-card/60 px-3 py-2.5 text-[11px] text-muted-foreground">
            <p>Nenhum gasto registrado ainda nesta etapa.</p>
            <p>Clique em "Novo gasto" para começar.</p>
          </div>
        ) : (
          <div className="divide-y rounded-2xl border bg-card/80">
            {gastos.map((gasto) => (
              <div key={gasto.id} className="flex flex-col gap-2 px-3 py-3 text-xs">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium leading-snug">
                      {gasto.observacoes || "Gasto sem descrição"}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      {gasto.tipo} • {new Date(gasto.data_pagamento).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      R$ {gasto.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>
                {gasto.arquivos && gasto.arquivos.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {gasto.arquivos.map((arq) => (
                      <button
                        key={arq.id}
                        onClick={() => handleDownload(arq.storage_path, arq.nome_arquivo)}
                        className="flex items-center gap-1.5 rounded-lg bg-accent/10 px-2 py-1 text-[11px] text-primary hover:bg-accent/20"
                      >
                        <Paperclip className="h-3 w-3" />
                        <span className="max-w-[120px] truncate">{arq.nome_arquivo}</span>
                        <Download className="h-3 w-3" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
