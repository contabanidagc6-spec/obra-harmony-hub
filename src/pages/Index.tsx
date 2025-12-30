import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, LineChart, Shield, Wallet, CalendarDays } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip, CartesianGrid, Cell } from "recharts";

const etapaGastosData = [
  { name: "Fundação", gasto: 60000 },
  { name: "Estrutura", gasto: 100000 },
  { name: "Alvenaria", gasto: 60000 },
  { name: "Acabamento", gasto: 180000 },
  { name: "Finalização", gasto: 30000 },
];

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Minha Obra | Controle da sua construção";
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const goToAuth = () => navigate("/auth");

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Cabeçalho público fixo */}
      <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
          <button
            type="button"
            onClick={() => scrollToSection("topo")}
            className="flex items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
          >
            <span className="h-7 w-7 rounded-xl bg-primary/10" aria-hidden="true" />
            <div className="text-left leading-tight">
              <p className="text-sm font-semibold tracking-tight">Minha Obra</p>
              <p className="text-[11px] text-muted-foreground">Controle total da sua construção</p>
            </div>
          </button>

          <nav className="hidden items-center gap-6 text-sm md:flex">
            <button
              type="button"
              onClick={() => scrollToSection("beneficios")}
              className="story-link text-muted-foreground transition-colors hover:text-foreground"
            >
              Benefícios
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("como-funciona")}
              className="story-link text-muted-foreground transition-colors hover:text-foreground"
            >
              Como funciona
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("contato")}
              className="story-link text-muted-foreground transition-colors hover:text-foreground"
            >
              Contato
            </button>
            <Button size="sm" className="hover-scale" type="button" onClick={goToAuth}>
              Entrar
            </Button>
          </nav>

          {/* Versão mobile simplificada */}
          <Button
            size="sm"
            variant="outline"
            className="hover-scale md:hidden"
            type="button"
            onClick={goToAuth}
          >
            Entrar
          </Button>
        </div>
      </header>

      <main id="topo" className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 pb-24 pt-16">
        {/* HERO */}
        <section className="animate-enter">
          <div className="max-w-3xl space-y-7 text-center md:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/80 px-3 py-1 text-[11px] text-muted-foreground shadow-sm hover-scale">
              <span className="h-1.5 w-1.5 rounded-full bg-primary pulse" aria-hidden="true" />
              <span>Entenda sua obra sem depender de planilhas ou termos técnicos</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
                Sua obra sob controle.
                <br />
                <span className="text-[hsl(var(--primary))]">Sem sustos nem estouro no orçamento.</span>
              </h1>
              <p className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                Veja em um painel simples quanto já foi gasto, o que ainda falta pagar e em que etapa a obra
                está. Tudo organizado em um só lugar, para evitar atrasos, planejar os próximos pagamentos e
                decidir com calma.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-1 md:justify-start">
              <Button size="lg" className="hover-scale" onClick={goToAuth}>
                Ver minha obra em números simples
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="hover-scale"
                type="button"
                onClick={() => scrollToSection("como-funciona")}
              >
                Ver como funciona
              </Button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs text-muted-foreground md:justify-start">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>Teste sem risco: você pode parar quando quiser, sem multa nem fidelidade.</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                <span>Seus dados protegidos com tecnologia usada por bancos e grandes empresas.</span>
              </div>
            </div>
          </div>
        </section>

        {/* FAIXA DE MÉTRICAS */}
        <section className="mt-16 grid gap-4 rounded-2xl bg-muted/60 px-4 py-4 text-xs sm:grid-cols-3 sm:text-sm animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
              <Wallet className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="font-semibold">Gastos em dia</p>
              <p className="text-muted-foreground">Veja o que já foi pago, o que está previsto e evite sustos de última hora.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
              <LineChart className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="font-semibold">Orçamento sob controle</p>
              <p className="text-muted-foreground">Acompanhe em % quanto da obra já está executado para não estourar o limite.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
              <CalendarDays className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="font-semibold">Cronograma visível</p>
              <p className="text-muted-foreground">Saiba em que etapa a obra está e evite atrasos por falta de planejamento.</p>
            </div>
          </div>
        </section>

        {/* BENEFÍCIOS */}
        <section id="beneficios" className="mt-20 space-y-8 animate-fade-in">
          <header className="space-y-2 text-center">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-primary">Benefícios</p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Pensado para quem está construindo pela primeira vez
            </h2>
            <p className="mx-auto max-w-2xl text-sm text-muted-foreground">
              Você não precisa entender de engenharia para saber se a obra está indo bem. Mostramos o essencial
              com frases curtas, exemplos práticos e indicadores em verde, amarelo e vermelho para você agir antes
              de virar problema.
            </p>
          </header>

          <div className="grid gap-6 md:grid-cols-3">
            <article className="card-elevated flex h-full flex-col gap-3 p-6 transition-transform duration-200 hover:-translate-y-1 hover-scale">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10">
                <LineChart className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-base font-semibold">Visão clara de custos</h3>
              <p className="text-sm text-muted-foreground">
                Veja quanto já gastou, quanto ainda falta e onde está indo o dinheiro da obra, sem contas
                escondidas nem surpresas no fim do mês.
              </p>
            </article>

            <article className="card-elevated flex h-full flex-col gap-3 p-6 transition-transform duration-200 hover:-translate-y-1 hover-scale">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10">
                <Wallet className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-base font-semibold">Pagamentos organizados</h3>
              <p className="text-sm text-muted-foreground">
                Registre mão de obra, materiais e serviços em poucos toques. Tenha um histórico simples de tudo o que
                foi pago e do que ainda está por vir.
              </p>
            </article>

            <article className="card-elevated flex h-full flex-col gap-3 p-6 transition-transform duration-200 hover:-translate-y-1 hover-scale">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-base font-semibold">Etapas sem surpresas</h3>
              <p className="text-sm text-muted-foreground">
                Acompanhe da fundação ao acabamento e veja rapidamente se alguma etapa está atrasando ou gastando mais
                do que o combinado.
              </p>
            </article>
          </div>
        </section>

        {/* COMO FUNCIONA / DEMO VISUAL */}
        <section
          id="como-funciona"
          className="mt-24 grid items-start gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] animate-fade-in"
        >
          <div className="space-y-5">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-primary">
              Como funciona
            </p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Em poucos passos, você enxerga toda a sua obra
            </h2>
            <ol className="space-y-4 text-sm text-muted-foreground">
              <li className="flex gap-3">
                <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-[11px] font-semibold text-primary">
                  1
                </span>
                <div>
                  <p className="font-medium text-foreground">Cadastre sua obra</p>
                  <p>Informe orçamento previsto, tipo de obra, área e data de início em poucos toques.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-[11px] font-semibold text-primary">
                  2
                </span>
                <div>
                  <p className="font-medium text-foreground">Registre gastos e pagamentos</p>
                  <p>
                    Adicione mão de obra, materiais e serviços conforme acontecerem, sem planilhas confusas e sem
                    perder recibos.
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-[11px] font-semibold text-primary">
                  3
                </span>
                <div>
                  <p className="font-medium text-foreground">Faça upload dos comprovantes</p>
                  <p>
                    Guarde notas fiscais, contratos e fotos da obra em um só lugar, ligados a cada etapa, para ter
                    tudo organizado quando precisar conferir.
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-[11px] font-semibold text-primary">
                  4
                </span>
                <div>
                  <p className="font-medium text-foreground">Compartilhe o acesso com segurança</p>
                  <p>
                    Gere um link de acesso para arquiteto, engenheiro ou cônjuge acompanharem os números com você,
                    sem precisar passar planilhas por e-mail.
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-[11px] font-semibold text-primary">
                  5
                </span>
                <div>
                  <p className="font-medium text-foreground">Acompanhe os gráficos</p>
                  <p>
                    Veja se está dentro do orçamento e do prazo com cores e indicadores fáceis de entender, mesmo
                    para quem está na primeira obra.
                  </p>
                </div>
              </li>
            </ol>

            <div className="mt-4 rounded-2xl border border-dashed border-primary/30 bg-primary/5 px-4 py-3 text-xs text-muted-foreground">
              <p>
                Tudo foi pensado para reduzir a ansiedade com dinheiro de obra: valores sempre atualizados, alertas
                simples quando algo foge do previsto e uma linguagem direta para você saber, em minutos, se está
                tudo bem ou se precisa agir – sozinho ou junto com quem te ajuda na obra.
              </p>
            </div>
          </div>

          <div className="card-elevated flex flex-col gap-6 p-6 animate-scale-in hover-scale">
            <div className="flex items-center justify-between text-xs">
              <p className="font-semibold text-muted-foreground">Resumo financeiro</p>
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                Exemplo de dashboard
              </span>
            </div>

            <div className="relative flex h-52 items-center justify-center">
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "conic-gradient(hsl(var(--primary)) 0 62%, hsl(var(--muted-foreground)) 62% 100%)",
                }}
              />
              <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-background">
                <div className="text-center text-xs">
                  <p className="text-[11px] text-muted-foreground">Orçamento total</p>
                  <p className="text-sm font-semibold">R$ 430.000,00</p>
                  <p className="mt-1 text-[11px] text-primary">62% já executado</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 text-[11px] sm:text-xs">
              <div className="rounded-xl bg-muted px-3 py-2">
                <p className="text-muted-foreground">Gastos até hoje</p>
                <p className="text-sm font-semibold">R$ 266.600</p>
              </div>
              <div className="rounded-xl bg-muted px-3 py-2">
                <p className="text-muted-foreground">Gastos projetados</p>
                <p className="text-sm font-semibold">R$ 68.400</p>
              </div>
              <div className="rounded-xl bg-muted px-3 py-2">
                <p className="text-muted-foreground">Próx. pagamentos</p>
                <p className="text-sm font-semibold">R$ 13.400</p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <p className="font-semibold text-muted-foreground">Gastos por etapa (exemplo)</p>
                <span className="rounded-full bg-background/40 px-2 py-0.5 text-[10px] text-primary">
                  Cada barra representa uma fase da obra
                </span>
              </div>
              <div className="h-44 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={etapaGastosData} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                    <XAxis
                      dataKey="name"
                      tickLine={false}
                      axisLine={false}
                      tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                    />
                    <Tooltip
                      cursor={{ fill: "hsl(var(--muted))/0.4" }}
                      contentStyle={{
                        backgroundColor: "hsl(var(--background))",
                        borderRadius: 12,
                        border: "1px solid hsl(var(--border))",
                        fontSize: 12,
                      }}
                      formatter={(value: number) => [
                        value.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        }),
                        "Gasto na etapa",
                      ]}
                    />
                    <Bar
                      dataKey="gasto"
                      radius={[8, 8, 0, 0]}
                      isAnimationActive
                      animationDuration={600}
                    >
                      {etapaGastosData.map((entry) => (
                        <Cell
                          key={entry.name}
                          fill={
                            entry.name === "Acabamento" || entry.name === "Alvenaria" || entry.name === "Finalização"
                              ? "hsl(var(--primary) / 0.5)"
                              : "hsl(var(--primary))"
                          }
                          stroke={
                            entry.name === "Acabamento" || entry.name === "Alvenaria" || entry.name === "Finalização"
                              ? "hsl(var(--primary) / 0.6)"
                              : "hsl(var(--primary))"
                          }
                          className="transition-all duration-200 hover:brightness-110"
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </section>

        {/* DEPOIMENTOS */}
        <section className="mt-24 space-y-8 animate-fade-in">
          <header className="space-y-2 text-center">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-primary">Depoimentos</p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Quem já passou por obra sabe como é importante ter controle
            </h2>
            <p className="mx-auto max-w-2xl text-sm text-muted-foreground">
              Histórias fictícias, mas baseadas em situações reais de quem já sofreu com obra sem controle.
              A ideia é mostrar que você não está sozinho e que é possível ter mais tranquilidade com
              número e prazo no radar.
            </p>
          </header>

          <div className="grid gap-6 md:grid-cols-3">
            <article className="card-elevated flex h-full flex-col justify-between gap-4 p-6 transition-transform duration-200 hover:-translate-y-1 hover-scale">
              <p className="text-sm text-muted-foreground">
                "Eu anotava tudo em caderno e nunca sabia quanto já tinha gastado. Agora vejo em segundos se
                estou dentro do orçamento e planejo os próximos passos com mais calma."
              </p>
              <div className="space-y-1 text-sm">
                <p className="font-semibold">Mariana, 1ª obra da família</p>
                <p className="text-xs text-muted-foreground">Casa de 120 m² em Sorocaba - SP</p>
              </div>
            </article>

            <article className="card-elevated flex h-full flex-col justify-between gap-4 p-6 transition-transform duration-200 hover:-translate-y-1 hover-scale">
              <p className="text-sm text-muted-foreground">
                "Com o Minha Obra ficou mais fácil conversar com o pedreiro. Eu levo o celular e mostro o que
                já foi pago, o que falta e evito discussões por falta de registro."
              </p>
              <div className="space-y-1 text-sm">
                <p className="font-semibold">Carlos, reforma de apartamento</p>
                <p className="text-xs text-muted-foreground">Reforma de 60 m² em Curitiba - PR</p>
              </div>
            </article>

            <article className="card-elevated flex h-full flex-col justify-between gap-4 p-6 transition-transform duration-200 hover:-translate-y-1 hover-scale">
              <p className="text-sm text-muted-foreground">
                "Acompanhei cada etapa da obra mesmo morando em outra cidade. Os gráficos me ajudaram a enxergar
                se estava tudo dentro do combinado de prazo e custo."
              </p>
              <div className="space-y-1 text-sm">
                <p className="font-semibold">Luciana, casa de veraneio</p>
                <p className="text-xs text-muted-foreground">Obra em Itapema - SC</p>
              </div>
            </article>
          </div>
        </section>

        {/* CONTATO / CTA FINAL */}
        <section
          id="contato"
          className="mt-24 rounded-3xl bg-[hsl(var(--primary))] px-6 py-16 text-center text-[hsl(var(--primary-foreground))] animate-fade-in"
        >
          <h2 className="text-3xl font-semibold sm:text-4xl">Comece sua obra organizada hoje</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm opacity-90">
            Crie sua conta, cadastre sua obra e veja em minutos se os gastos estão dentro do combinado e se há
            risco de atraso. Você controla o cancelamento a qualquer momento, sem burocracia.
          </p>
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button size="lg" variant="outline" className="hover-scale" onClick={goToAuth}>
              Criar minha conta gratuita
            </Button>
            <p className="text-xs opacity-90">Dúvidas? Fale com a gente em contato@minhaobra.app</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
