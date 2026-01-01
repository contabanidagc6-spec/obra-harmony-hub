import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Upload, Download } from "lucide-react";

interface Arquivo {
  id: string;
  nome_arquivo: string;
  tipo_arquivo: string;
  storage_path: string;
  tamanho_bytes: number;
  created_at: string;
  etapa_id?: string | null;
  etapas?: { nome: string } | null;
}

export const ArquivosPage = () => {
  const { toast } = useToast();
  const [arquivos, setArquivos] = useState<Arquivo[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewArquivo, setPreviewArquivo] = useState<Arquivo | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [etapaFilter, setEtapaFilter] = useState<string | "todas">("todas");
  const [monthFilter, setMonthFilter] = useState<string | "todos">("todos");
  const [yearFilter, setYearFilter] = useState<string | "todos">("todos");

  useEffect(() => {
    document.title = "Minha Obra | Arquivos";
    fetchArquivos();
  }, []);

  const fetchArquivos = async () => {
    try {
      const { data, error } = await supabase
        .from("arquivos")
        .select(`
          id,
          nome_arquivo,
          tipo_arquivo,
          storage_path,
          tamanho_bytes,
          created_at,
          etapa_id,
          etapas(nome)
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setArquivos(data || []);
    } catch (error: any) {
      toast({
        title: "Erro ao carregar arquivos",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    const MAX_SIZE = 10 * 1024 * 1024; // 10MB
    if (selectedFile.size > MAX_SIZE) {
      toast({
        title: "Arquivo muito grande",
        description: "O tamanho máximo permitido é 10MB.",
        variant: "destructive",
      });
      e.target.value = "";
      return;
    }

    setFile(selectedFile);
  };

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuário não autenticado");

      const { data: obras } = await supabase
        .from("obras")
        .select("id")
        .eq("user_id", user.id)
        .limit(1);

      if (!obras || obras.length === 0) {
        throw new Error("Você precisa criar uma obra primeiro.");
      }

      const obraId = obras[0].id;
      const formData = new FormData(e.currentTarget);
      const etapaId = formData.get("etapa") as string | null;

      const fileExt = file.name.split(".").pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("obra-files")
        .upload(fileName, file, { upsert: false });

      if (uploadError) throw uploadError;

      const { error: arquivoError } = await supabase.from("arquivos").insert({
        obra_id: obraId,
        etapa_id: etapaId || null,
        gasto_id: null,
        nome_arquivo: file.name,
        tipo_arquivo: file.type,
        storage_path: fileName,
        tamanho_bytes: file.size,
      });

      if (arquivoError) throw arquivoError;

      toast({
        title: "Arquivo enviado",
        description: "O arquivo foi salvo com sucesso.",
      });

      setDialogOpen(false);
      setFile(null);
      fetchArquivos();
    } catch (error: any) {
      toast({
        title: "Erro ao enviar arquivo",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
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

  const openPreview = async (arquivo: Arquivo) => {
    try {
      setPreviewLoading(true);
      setPreviewArquivo(arquivo);
      setPreviewOpen(true);

      const { data, error } = await supabase.storage
        .from("obra-files")
        .createSignedUrl(arquivo.storage_path, 60);

      if (error) throw error;
      setPreviewUrl(data.signedUrl);
    } catch (error: any) {
      toast({
        title: "Erro ao abrir arquivo",
        description: error.message,
        variant: "destructive",
      });
      setPreviewOpen(false);
      setPreviewUrl(null);
      setPreviewArquivo(null);
    } finally {
      setPreviewLoading(false);
    }
  };

  const filteredArquivos = arquivos.filter((a) => {
    const createdDate = new Date(a.created_at);
    const month = createdDate.getMonth() + 1;
    const year = createdDate.getFullYear();

    const matchEtapa = etapaFilter === "todas" || a.etapa_id === etapaFilter;
    const matchMonth = monthFilter === "todos" || Number(monthFilter) === month;
    const matchYear = yearFilter === "todos" || Number(yearFilter) === year;

    return matchEtapa && matchMonth && matchYear;
  });

  const availableYears = Array.from(
    new Set(arquivos.map((a) => new Date(a.created_at).getFullYear())),
  ).sort((a, b) => a - b);

  return (
    <div className="space-y-4">
      <header className="flex items-center justify-between gap-3">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold">Arquivos da obra</h1>
          <p className="text-sm text-muted-foreground">
            Centralize orçamentos, contratos, notas fiscais e fotos em um só lugar.
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Upload className="mr-1.5 h-4 w-4" />
              Novo
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar arquivo</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleUpload} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="file">Arquivo (máx 10MB)</Label>
                <Input
                  id="file"
                  name="file"
                  type="file"
                  accept="image/*,.pdf,.doc,.docx"
                  onChange={handleFileChange}
                  required
                  className="cursor-pointer"
                />
                {file && (
                  <p className="text-xs text-muted-foreground">
                    {file.name} ({(file.size / 1024).toFixed(0)} KB)
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label>Etapa (opcional)</Label>
                <Select name="etapa">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma etapa" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fundacao">Fundação</SelectItem>
                    <SelectItem value="estrutura">Estrutura</SelectItem>
                    <SelectItem value="revestimentos">Revestimentos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full" disabled={uploading}>
                {uploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {uploading ? "Enviando..." : "Enviar arquivo"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </header>

      <section className="space-y-3">
        <div className="flex flex-wrap items-center gap-2 text-[11px] sm:text-xs">
          <div className="flex items-center gap-1.5">
            <span className="text-muted-foreground">Etapa:</span>
            <Select value={etapaFilter} onValueChange={(value) => setEtapaFilter(value as typeof etapaFilter)}>
              <SelectTrigger className="h-7 w-32">
                <SelectValue placeholder="Todas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas</SelectItem>
                {Array.from(new Set(arquivos.map((a) => a.etapas?.nome).filter(Boolean))).map(
                  (nome) => (
                    <SelectItem key={nome as string} value={arquivos.find((a) => a.etapas?.nome === nome)?.etapa_id ?? ""}>
                      {nome}
                    </SelectItem>
                  ),
                )}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-muted-foreground">Mês:</span>
            <Select value={monthFilter} onValueChange={(value) => setMonthFilter(value as typeof monthFilter)}>
              <SelectTrigger className="h-7 w-24">
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="1">Jan</SelectItem>
                <SelectItem value="2">Fev</SelectItem>
                <SelectItem value="3">Mar</SelectItem>
                <SelectItem value="4">Abr</SelectItem>
                <SelectItem value="5">Mai</SelectItem>
                <SelectItem value="6">Jun</SelectItem>
                <SelectItem value="7">Jul</SelectItem>
                <SelectItem value="8">Ago</SelectItem>
                <SelectItem value="9">Set</SelectItem>
                <SelectItem value="10">Out</SelectItem>
                <SelectItem value="11">Nov</SelectItem>
                <SelectItem value="12">Dez</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-muted-foreground">Ano:</span>
            <Select value={yearFilter} onValueChange={(value) => setYearFilter(value as typeof yearFilter)}>
              <SelectTrigger className="h-7 w-24">
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                {availableYears.map((year) => (
                  <SelectItem key={year} value={String(year)}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <h2 className="text-sm font-medium">Todos os arquivos</h2>
        {loading ? (
          <p className="text-xs text-muted-foreground">Carregando...</p>
        ) : arquivos.length === 0 ? (
          <div className="space-y-2 rounded-2xl border border-dashed border-border/80 bg-card/60 px-3 py-2.5 text-[11px] text-muted-foreground">
            <p>Nenhum arquivo enviado ainda.</p>
            <p>Clique em "Novo" para enviar seu primeiro arquivo.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {filteredArquivos.map((a) => (
              <Card
                key={a.id}
                className="card-elevated cursor-pointer transition-all hover:shadow-md hover-scale"
                onClick={() => openPreview(a)}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-sm font-medium line-clamp-1">
                    <Download className="h-3.5 w-3.5 text-primary" />
                    {a.nome_arquivo}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-between text-[11px] text-muted-foreground">
                  <span>{(a.tamanho_bytes / 1024).toFixed(0)} KB</span>
                  <Badge variant="outline">{a.etapas?.nome || "Geral"}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle className="text-sm font-medium">
              {previewArquivo?.nome_arquivo || "Visualizar arquivo"}
            </DialogTitle>
          </DialogHeader>
          {previewLoading ? (
            <div className="flex items-center justify-center gap-2 py-6 text-xs text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              Abrindo arquivo...
            </div>
          ) : previewUrl && previewArquivo ? (
            <div className="space-y-3">
              {previewArquivo.tipo_arquivo.startsWith("image/") ? (
                <img
                  src={previewUrl}
                  alt={previewArquivo.nome_arquivo}
                  className="max-h-80 w-full rounded-md object-contain"
                />
              ) : previewArquivo.tipo_arquivo === "application/pdf" ? (
                <iframe
                  src={previewUrl}
                  title={previewArquivo.nome_arquivo}
                  className="h-80 w-full rounded-md border border-border"
                />
              ) : (
                <p className="text-xs text-muted-foreground">
                  Pré-visualização não disponível para este tipo de arquivo. Você pode baixar para visualizar.
                </p>
              )}
              <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                <span>
                  {(previewArquivo.tamanho_bytes / 1024).toFixed(0)} KB · {previewArquivo.etapas?.nome || "Geral"}
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 px-2 text-[11px]"
                  onClick={() =>
                    previewArquivo && handleDownload(previewArquivo.storage_path, previewArquivo.nome_arquivo)
                  }
                >
                  <Download className="mr-1 h-3 w-3" />
                  Baixar
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-xs text-muted-foreground">Não foi possível carregar a pré-visualização.</p>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
