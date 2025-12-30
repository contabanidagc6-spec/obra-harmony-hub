import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, LineChart, Shield } from "lucide-react";
import { LineChart as ReLineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const sampleCostData = [
  { mes: "Jan", previsto: 20000, real: 18000 },
  { mes: "Fev", previsto: 40000, real: 39000 },
  { mes: "Mar", previsto: 65000, real: 72000 },
  { mes: "Abr", previsto: 90000, real: 88000 },
];

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Minha Obra | Controle da sua construção";
  }, []);

  const handlePrimaryCta = () => {
    navigate("/auth");
  };

  const handleSecondaryCta = () => {
    const section = document.getElementById("como-funciona");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleContactClick = () => {
    const section = document.getElementById("contato");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Cabeçalho público fixo */}
      <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-6 w-6 rounded-lg bg-primary/10" aria-hidden="true" />
            <div className="leading-tight">
              <p className="text-sm font-semibold tracking-tight">Minha Obra</p>
              <p className="text-[11px] text-muted-foreground">Controle simples da sua construção</p>
            </div>
          </div>
          <nav className="flex items-center gap-5 text-sm">
            <button
              type="button"
              onClick={handleSecondaryCta}
              className="text-muted-foreground hover:text-foreground transition-colors story-link"
            >
              Funcionalidades
            </button>
            <button
              type="button"
              onClick={handleContactClick}
              className="text-muted-foreground hover:text-foreground transition-colors story-link"
            >
              Contato
            </button>
            <Button
              size="sm"
              variant="outline"
              className="hover-scale"
              type="button"
              onClick={handlePrimaryCta}
            >
              Login
            </Button>
          </nav>
        </div>
      </header>

      <main className="page-shell mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 pb-12 pt-10">
        {/* Hero */}
        <section className="grid gap-10 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-center animate-fade-in">
          <div className="space-y-6">
            <p className="inline-flex items-center rounded-full border border-border/60 bg-background/70 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur-sm shadow-sm">
              <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-primary" />
              Sua obra no controle, sem planilhas
            </p>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              Organize cada etapa da sua construção em um só lugar.
            </h1>
            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Minha Obra é um painel simples para você acompanhar gastos, etapas, decisões e documentos
              da sua construção ou reforma, direto do celular.
            </p>

            <div className="flex flex-wrap gap-3 pt-1">
              <Button size="lg" className="hover-scale" onClick={handlePrimaryCta}>
                Começar agora
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="hover-scale"
                type="button"
                onClick={handleSecondaryCta}
              >
                Ver como funciona
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>Sem compromisso, você pode testar à vontade.</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                <span>Seus dados protegidos e salvos na nuvem.</span>
              </div>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-primary/10 via-accent/10 to-background opacity-80 blur-3xl" />
            <div className="card-elevated w-full max-w-sm space-y-4 border border-border/70 bg-background/90 p-5 shadow-lg animate-scale-in">
              <header className="space-y-1">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent-foreground/80">
                  Visão geral
                </p>
                <p className="text-sm text-muted-foreground">
                  Um resumo da sua obra em tempo real: orçamento, etapas e próximos pagamentos.
                </p>
              </header>

              <div className="grid gap-3 text-sm">
                <div className="rounded-xl border border-border/70 bg-background/70 p-3 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Orçamento utilizado</p>
                    <p className="text-base font-semibold">R$ 85.400</p>
                  </div>
                  <LineChart className="h-8 w-8 text-primary" />
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="rounded-lg bg-muted/70 p-2">
                    <p className="text-muted-foreground">Etapas</p>
                    <p className="text-sm font-semibold">10</p>
                  </div>
                  <div className="rounded-lg bg-muted/70 p-2">
                    <p className="text-muted-foreground">Concluídas</p>
                    <p className="text-sm font-semibold text-emerald-500">3</p>
                  </div>
                  <div className="rounded-lg bg-muted/70 p-2">
                    <p className="text-muted-foreground">Pagamentos</p>
                    <p className="text-sm font-semibold">12</p>
                  </div>
                </div>
                <p className="text-[11px] leading-snug text-muted-foreground">
                  Os dados acima são apenas um exemplo. Na prática, tudo é atualizado automaticamente a
                  partir dos seus gastos e etapas.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Como funciona */}
        <section id="como-funciona" className="mt-14 space-y-6 animate-fade-in">
          <header className="space-y-2">
            <h2 className="text-xl font-semibold tracking-tight">Como o Minha Obra ajuda você</h2>
            <p className="max-w-2xl text-sm text-muted-foreground">
              Em vez de espalhar informações em planilhas, grupos de mensagem e papéis, você centraliza
              tudo em um painel visual pensado para quem não é da área técnica.
            </p>
          </header>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="card-elevated flex flex-col gap-2 p-4 animate-fade-in">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent-foreground/80">
                1. Crie sua obra
              </p>
              <p className="text-sm font-semibold">Defina nome, orçamento e tipo</p>
              <p className="text-xs text-muted-foreground">
                Em poucos minutos você cadastra sua obra e já começa com etapas padrão prontas para usar.
              </p>
            </div>
            <div className="card-elevated flex flex-col gap-2 p-4 animate-fade-in">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent-foreground/80">
                2. Registre gastos
              </p>
              <p className="text-sm font-semibold">Acompanhe o orçamento de verdade</p>
              <p className="text-xs text-muted-foreground">
                Lance materiais, mão de obra e pagamentos futuros e veja o impacto direto no orçamento.
              </p>
            </div>
            <div className="card-elevated flex flex-col gap-2 p-4 animate-fade-in">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent-foreground/80">
                3. Decida com calma
              </p>
              <p className="text-sm font-semibold">Centralize decisões e arquivos</p>
              <p className="text-xs text-muted-foreground">
                Guarde orçamentos, fotos e decisões em um só lugar para não se perder no meio da obra.
              </p>
            </div>
          </div>
        </section>

        {/* Métricas visuais de exemplo */}
        <section className="mt-14 space-y-6 animate-fade-in">
          <header className="space-y-2">
            <h2 className="text-xl font-semibold tracking-tight">Exemplo de evolução de custos</h2>
            <p className="max-w-2xl text-sm text-muted-foreground">
              Veja como o Minha Obra pode mostrar a diferença entre o orçamento previsto e o que já foi gasto
              ao longo dos meses de obra.
            </p>
          </header>

          <div className="card-elevated border border-border/70 bg-background/90 p-5">
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ReLineChart data={sampleCostData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="mes" tickLine={false} axisLine={{ stroke: "hsl(var(--border))" }} />
                  <YAxis
                    tickFormatter={(v) => `R$ ${v / 1000}k`}
                    width={48}
                    tickLine={false}
                    axisLine={{ stroke: "hsl(var(--border))" }}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "hsl(var(--popover))",
                      borderColor: "hsl(var(--border))",
                      borderRadius: 12,
                    }}
                    formatter={(value: number) => [`R$ ${value.toLocaleString("pt-BR")}`, ""]}
                  />
                  <Line
                    type="monotone"
                    dataKey="previsto"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="real"
                    stroke="hsl(var(--accent))"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                  />
                </ReLineChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-3 text-[11px] leading-snug text-muted-foreground">
              Estes valores são fictícios, apenas para ilustrar como o painel mostra, em tempo real, se a
              sua obra está dentro ou acima do orçamento planejado.
            </p>
          </div>
        </section>

        {/* Contato */}
        <section
          id="contato"
          className="mt-16 border-t border-border/60 pt-8 text-sm text-muted-foreground"
        >
          <p className="font-medium text-foreground">Fale com a gente</p>
          <p className="mt-1 max-w-xl">
            Tem dúvidas ou sugestões sobre o Minha Obra? Envie um e-mail para
            <span className="font-medium"> contato@minhaobra.app</span> e vamos responder o mais rápido
            possível.
          </p>
        </section>
       </main>
    </div>
  );
};

export default Index;
