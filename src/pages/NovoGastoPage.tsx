import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

export const NovoGastoPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    document.title = "Minha Obra | Novo gasto";
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Gasto salvo",
      description: "O lançamento foi registrado visualmente (sem salvar em banco por enquanto).",
    });
    navigate(-1);
  };

  return (
    <div className="space-y-4 pb-4">
      <header className="space-y-1">
        <h1 className="text-xl font-semibold">Adicionar gasto</h1>
        <p className="text-sm text-muted-foreground">
          Registre rapidamente um gasto ligado a uma etapa da obra.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-4 card-elevated p-4 text-sm" id="form-gasto">
        <div className="space-y-2">
          <Label htmlFor="valor">Valor</Label>
          <Input id="valor" type="number" min={0} step="0.01" required placeholder="Ex: 1200" />
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Tipo de gasto</Label>
            <Select defaultValue="material">
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="material">Material</SelectItem>
                <SelectItem value="mao-obra">Mão de obra</SelectItem>
                <SelectItem value="servico">Serviço</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Etapa</Label>
            <Select defaultValue="fundacao">
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fundacao">Fundação</SelectItem>
                <SelectItem value="estrutura">Estrutura</SelectItem>
                <SelectItem value="revestimentos">Revestimentos</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Forma de pagamento</Label>
            <Select defaultValue="pix">
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pix">Pix</SelectItem>
                <SelectItem value="boleto">Boleto</SelectItem>
                <SelectItem value="cartao">Cartão</SelectItem>
                <SelectItem value="dinheiro">Dinheiro</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="data">Data de pagamento</Label>
            <Input id="data" type="date" required />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="upload">Nota / foto (opcional)</Label>
          <Input id="upload" type="file" className="cursor-pointer" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="obs">Observações</Label>
          <Textarea id="obs" placeholder="Ex: material com desconto, acerto com empreiteiro..." rows={3} />
        </div>

        <div className="pt-2">
          <Button type="submit" className="w-full">
            Salvar gasto
          </Button>
        </div>
      </form>
    </div>
  );
};
