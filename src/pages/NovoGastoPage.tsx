import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

export const NovoGastoPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [arquivo, setArquivo] = useState<File | null>(null);

  useEffect(() => {
    document.title = "Minha Obra | Novo gasto";
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const MAX_SIZE = 10 * 1024 * 1024; // 10MB
    if (file.size > MAX_SIZE) {
      toast({
        title: "Arquivo muito grande",
        description: "O tamanho máximo permitido é 10MB.",
        variant: "destructive",
      });
      e.target.value = "";
      return;
    }

    setArquivo(file);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUploading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const valor = parseFloat(formData.get("valor") as string);
      const tipo = formData.get("tipo") as string;
      const etapaId = formData.get("etapa") as string;
      const formaPagamento = formData.get("forma_pagamento") as string;
      const dataPagamento = formData.get("data") as string;
      const observacoes = formData.get("obs") as string;

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Erro",
          description: "Você precisa estar logado para adicionar gastos.",
          variant: "destructive",
        });
        return;
      }

      // TODO: buscar obra_id real do usuário
      // Por enquanto, assume primeira obra do usuário
      const { data: obras } = await supabase
        .from("obras")
        .select("id")
        .eq("user_id", user.id)
        .limit(1);

      if (!obras || obras.length === 0) {
        toast({
          title: "Erro",
          description: "Você precisa criar uma obra primeiro.",
          variant: "destructive",
        });
        return;
      }

      const obraId = obras[0].id;

      // Inserir gasto
      const { data: gasto, error: gastoError } = await supabase
        .from("gastos")
        .insert({
          etapa_id: etapaId,
          valor,
          tipo,
          forma_pagamento: formaPagamento,
          data_pagamento: dataPagamento,
          observacoes,
        })
        .select()
        .single();

      if (gastoError) throw gastoError;

      // Upload de arquivo, se houver
      if (arquivo && gasto) {
        const fileExt = arquivo.name.split(".").pop();
        const fileName = `${user.id}/${gasto.id}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("obra-files")
          .upload(fileName, arquivo, { upsert: false });

        if (uploadError) throw uploadError;

        // Salvar metadados
        const { error: arquivoError } = await supabase.from("arquivos").insert({
          gasto_id: gasto.id,
          obra_id: obraId,
          etapa_id: etapaId,
          nome_arquivo: arquivo.name,
          tipo_arquivo: arquivo.type,
          storage_path: fileName,
          tamanho_bytes: arquivo.size,
        });

        if (arquivoError) throw arquivoError;
      }

      toast({
        title: "Gasto salvo",
        description: "O lançamento foi registrado com sucesso.",
      });
      navigate(-1);
    } catch (error: any) {
      toast({
        title: "Erro ao salvar gasto",
        description: error.message || "Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
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
            <Select name="tipo" defaultValue="material" required>
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
            <Select name="etapa" defaultValue="fundacao" required>
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
            <Select name="forma_pagamento" defaultValue="pix" required>
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
          <Label htmlFor="upload">Nota / foto (opcional, máx 10MB)</Label>
          <Input
            id="upload"
            name="upload"
            type="file"
            accept="image/*,.pdf,.doc,.docx"
            onChange={handleFileChange}
            className="cursor-pointer"
          />
          {arquivo && (
            <p className="text-xs text-muted-foreground">
              {arquivo.name} ({(arquivo.size / 1024).toFixed(0)} KB)
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="obs">Observações</Label>
          <Textarea
            id="obs"
            name="obs"
            placeholder="Ex: material com desconto, acerto com empreiteiro..."
            rows={3}
          />
        </div>

        <div className="pt-2">
          <Button type="submit" className="w-full" disabled={uploading}>
            {uploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {uploading ? "Salvando..." : "Salvar gasto"}
          </Button>
        </div>
      </form>
    </div>
  );
};
