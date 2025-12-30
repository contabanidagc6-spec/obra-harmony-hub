import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    document.title = "Minha Obra | Criar obra";
    checkExistingObra();
  }, []);

  const checkExistingObra = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // Se já tem obra, redireciona para o dashboard
    const { data: obras } = await supabase
      .from("obras")
      .select("id")
      .eq("user_id", user.id)
      .limit(1);

    if (obras && obras.length > 0) {
      navigate("/dashboard");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Autenticação necessária",
          description: "Você precisa estar logado para criar uma obra.",
          variant: "destructive",
        });
        // TODO: navegar para tela de login quando implementada
        return;
      }

      const formData = new FormData(e.currentTarget);
      const nome = formData.get("nome") as string;
      const tipo = formData.get("tipo") as string;
      const areaM2 = formData.get("area") as string;
      const orcamentoEstimado = formData.get("orcamento") as string;
      const dataInicio = formData.get("inicio") as string;

      // Criar a obra
      const { data: obra, error: obraError } = await supabase
        .from("obras")
        .insert({
          user_id: user.id,
          nome,
          tipo,
          area_m2: areaM2 ? parseFloat(areaM2) : null,
          orcamento_estimado: orcamentoEstimado ? parseFloat(orcamentoEstimado) : null,
          data_inicio: dataInicio || null,
        })
        .select()
        .single();

      if (obraError) throw obraError;

      // Criar etapas padrão
      const etapasPadrao = [
        { nome: "Fundação", ordem: 1 },
        { nome: "Estrutura", ordem: 2 },
        { nome: "Alvenaria", ordem: 3 },
        { nome: "Instalações Elétricas", ordem: 4 },
        { nome: "Instalações Hidráulicas", ordem: 5 },
        { nome: "Revestimentos", ordem: 6 },
        { nome: "Acabamentos", ordem: 7 },
        { nome: "Pintura", ordem: 8 },
        { nome: "Pisos", ordem: 9 },
        { nome: "Louças e Metais", ordem: 10 },
      ];

      const etapasParaInserir = etapasPadrao.map((etapa) => ({
        obra_id: obra.id,
        nome: etapa.nome,
        status: "nao-iniciada",
        orcamento_previsto: null,
      }));

      const { error: etapasError } = await supabase
        .from("etapas")
        .insert(etapasParaInserir);

      if (etapasError) throw etapasError;

      toast({
        title: "Obra criada com sucesso!",
        description: `${etapasPadrao.length} etapas foram adicionadas automaticamente.`,
      });

      navigate("/dashboard");
    } catch (error: any) {
      toast({
        title: "Erro ao criar obra",
        description: error.message || "Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page-shell">
      <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-between px-4 pb-10 pt-8">
        <div>
          <header className="mb-8 space-y-2">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent-foreground/80">
              Minha Obra
            </p>
            <h1 className="text-2xl font-semibold leading-tight">
              Vamos organizar sua obra
            </h1>
            <p className="text-sm text-muted-foreground">
              Em poucos passos você terá um painel visual para acompanhar orçamento,
              etapas e decisões da sua construção ou reforma.
            </p>
          </header>

          <form id="form-obra" onSubmit={handleSubmit} className="space-y-5 card-elevated p-5 animate-scale-in">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome da obra</Label>
              <Input id="nome" name="nome" required placeholder="Ex: Casa dos sonhos" />
            </div>

            <div className="space-y-2">
              <Label>Tipo de obra</Label>
              <RadioGroup name="tipo" defaultValue="construcao" className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2 rounded-xl border bg-background px-3 py-2.5">
                  <RadioGroupItem value="construcao" id="construcao" />
                  <Label htmlFor="construcao" className="cursor-pointer text-sm">
                    Construção
                  </Label>
                </div>
                <div className="flex items-center gap-2 rounded-xl border bg-background px-3 py-2.5">
                  <RadioGroupItem value="reforma" id="reforma" />
                  <Label htmlFor="reforma" className="cursor-pointer text-sm">
                    Reforma
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="area">Área aproximada (m²)</Label>
                <Input id="area" name="area" type="number" min={0} step="0.01" placeholder="120" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="orcamento">Orçamento estimado (R$)</Label>
                <Input id="orcamento" name="orcamento" type="number" min={0} step="0.01" placeholder="250000" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="inicio">Data de início (opcional)</Label>
              <Input id="inicio" name="inicio" type="date" />
            </div>

            <p className="pt-1 text-[11px] leading-snug text-muted-foreground">
              Você poderá alterar esses dados depois nas configurações da obra.
            </p>
          </form>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <Button type="submit" form="form-obra" className="w-full hover-scale" disabled={submitting}>
            {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {submitting ? "Criando..." : "Criar minha obra"}
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            Não se preocupe, você não precisa preencher tudo agora.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Index;
