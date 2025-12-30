-- Criar tabela de obras (1 obra por usuário, por enquanto)
CREATE TABLE public.obras (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  nome TEXT NOT NULL,
  tipo TEXT NOT NULL CHECK (tipo IN ('construcao', 'reforma')),
  area_m2 NUMERIC(10, 2),
  orcamento_estimado NUMERIC(12, 2),
  data_inicio DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- RLS: somente donos veem suas obras
ALTER TABLE public.obras ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários veem suas próprias obras"
ON public.obras
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Usuários criam suas próprias obras"
ON public.obras
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários atualizam suas próprias obras"
ON public.obras
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Usuários deletam suas próprias obras"
ON public.obras
FOR DELETE
USING (auth.uid() = user_id);

-- Criar tabela de etapas
CREATE TABLE public.etapas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  obra_id UUID NOT NULL REFERENCES public.obras(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'nao-iniciada' CHECK (status IN ('nao-iniciada', 'em-andamento', 'concluida')),
  orcamento_previsto NUMERIC(12, 2),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- RLS: somente donos da obra veem suas etapas
ALTER TABLE public.etapas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários veem etapas de suas obras"
ON public.etapas
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.obras
    WHERE obras.id = etapas.obra_id
    AND obras.user_id = auth.uid()
  )
);

CREATE POLICY "Usuários criam etapas em suas obras"
ON public.etapas
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.obras
    WHERE obras.id = etapas.obra_id
    AND obras.user_id = auth.uid()
  )
);

CREATE POLICY "Usuários atualizam etapas de suas obras"
ON public.etapas
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.obras
    WHERE obras.id = etapas.obra_id
    AND obras.user_id = auth.uid()
  )
);

CREATE POLICY "Usuários deletam etapas de suas obras"
ON public.etapas
FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM public.obras
    WHERE obras.id = etapas.obra_id
    AND obras.user_id = auth.uid()
  )
);

-- Criar tabela de gastos
CREATE TABLE public.gastos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  etapa_id UUID NOT NULL REFERENCES public.etapas(id) ON DELETE CASCADE,
  valor NUMERIC(12, 2) NOT NULL,
  tipo TEXT NOT NULL CHECK (tipo IN ('material', 'mao-obra', 'servico')),
  forma_pagamento TEXT NOT NULL CHECK (forma_pagamento IN ('pix', 'boleto', 'cartao', 'dinheiro')),
  data_pagamento DATE NOT NULL,
  observacoes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- RLS: somente donos da obra veem gastos
ALTER TABLE public.gastos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários veem gastos de suas obras"
ON public.gastos
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.etapas
    JOIN public.obras ON obras.id = etapas.obra_id
    WHERE etapas.id = gastos.etapa_id
    AND obras.user_id = auth.uid()
  )
);

CREATE POLICY "Usuários criam gastos em suas obras"
ON public.gastos
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.etapas
    JOIN public.obras ON obras.id = etapas.obra_id
    WHERE etapas.id = gastos.etapa_id
    AND obras.user_id = auth.uid()
  )
);

CREATE POLICY "Usuários atualizam gastos de suas obras"
ON public.gastos
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.etapas
    JOIN public.obras ON obras.id = etapas.obra_id
    WHERE etapas.id = gastos.etapa_id
    AND obras.user_id = auth.uid()
  )
);

CREATE POLICY "Usuários deletam gastos de suas obras"
ON public.gastos
FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM public.etapas
    JOIN public.obras ON obras.id = etapas.obra_id
    WHERE etapas.id = gastos.etapa_id
    AND obras.user_id = auth.uid()
  )
);

-- Criar bucket de storage para arquivos da obra (privado)
INSERT INTO storage.buckets (id, name, public, file_size_limit)
VALUES ('obra-files', 'obra-files', false, 10485760);

-- RLS storage: somente donos da obra acessam seus arquivos
CREATE POLICY "Usuários visualizam arquivos de suas obras"
ON storage.objects
FOR SELECT
USING (
  bucket_id = 'obra-files' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Usuários fazem upload de arquivos em suas obras"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'obra-files' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Usuários atualizam arquivos de suas obras"
ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'obra-files' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Usuários deletam arquivos de suas obras"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'obra-files' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Criar tabela de arquivos (metadados)
CREATE TABLE public.arquivos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  gasto_id UUID REFERENCES public.gastos(id) ON DELETE CASCADE,
  obra_id UUID NOT NULL REFERENCES public.obras(id) ON DELETE CASCADE,
  etapa_id UUID REFERENCES public.etapas(id) ON DELETE SET NULL,
  nome_arquivo TEXT NOT NULL,
  tipo_arquivo TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  tamanho_bytes BIGINT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- RLS: somente donos da obra veem metadados dos arquivos
ALTER TABLE public.arquivos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários veem arquivos de suas obras"
ON public.arquivos
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.obras
    WHERE obras.id = arquivos.obra_id
    AND obras.user_id = auth.uid()
  )
);

CREATE POLICY "Usuários criam arquivos em suas obras"
ON public.arquivos
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.obras
    WHERE obras.id = arquivos.obra_id
    AND obras.user_id = auth.uid()
  )
);

CREATE POLICY "Usuários deletam arquivos de suas obras"
ON public.arquivos
FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM public.obras
    WHERE obras.id = arquivos.obra_id
    AND obras.user_id = auth.uid()
  )
);

-- Função e trigger para updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_obras_updated_at
BEFORE UPDATE ON public.obras
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_etapas_updated_at
BEFORE UPDATE ON public.etapas
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_gastos_updated_at
BEFORE UPDATE ON public.gastos
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();