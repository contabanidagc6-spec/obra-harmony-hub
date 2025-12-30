import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Minha Obra | Criar obra";
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
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

          <form onSubmit={handleSubmit} className="space-y-5 card-elevated p-5 animate-scale-in">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome da obra</Label>
              <Input id="nome" required placeholder="Ex: Casa dos sonhos" />
            </div>

            <div className="space-y-2">
              <Label>Tipo de obra</Label>
              <RadioGroup defaultValue="construcao" className="grid grid-cols-2 gap-2">
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
                <Input id="area" type="number" min={0} placeholder="120" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="orcamento">Orçamento estimado (R$)</Label>
                <Input id="orcamento" type="number" min={0} placeholder="250000" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="inicio">Data de início (opcional)</Label>
              <Input id="inicio" type="date" />
            </div>

            <p className="pt-1 text-[11px] leading-snug text-muted-foreground">
              Você poderá alterar esses dados depois nas configurações da obra.
            </p>
          </form>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <Button type="submit" form="" className="w-full hover-scale">
            Criar minha obra
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
