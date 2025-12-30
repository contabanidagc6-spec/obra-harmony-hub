-- Tabela de links de compartilhamento somente leitura para obras
CREATE TABLE IF NOT EXISTS public.share_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  obra_id uuid NOT NULL REFERENCES public.obras(id) ON DELETE CASCADE,
  token text NOT NULL UNIQUE,
  revoked boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.share_links ENABLE ROW LEVEL SECURITY;

-- Políticas: apenas o dono da obra pode gerenciar seus links
CREATE POLICY "Dono gerencia seus links de compartilhamento"
ON public.share_links
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.obras o
    WHERE o.id = share_links.obra_id
      AND o.user_id = auth.uid()
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.obras o
    WHERE o.id = share_links.obra_id
      AND o.user_id = auth.uid()
  )
);