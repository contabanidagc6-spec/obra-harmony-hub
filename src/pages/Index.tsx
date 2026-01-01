import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, LineChart, Shield, Wallet, CalendarDays, Crown, Star } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip, CartesianGrid, Cell } from "recharts";

const etapaGastosData = [
  { name: "Fundação", gasto: 60000 },
  { name: "Estrutura", gasto: 100000 },
  { name: "Alvenaria", gasto: 60000 },
  { name: "Acabamento", gasto: 180000 },
  { name: "Finalização", gasto: 30000 },
];

const rotatingTestimonials = [
  "Antes eu anotava em papel e ficava com medo de perder o controle. Agora vejo em segundos se a obra cabe no bolso.",
  "Consigo enxergar o impacto de cada decisão na obra e conversar com o pedreiro com números na mão.",
  "Mesmo morando longe da obra, acompanho gastos e etapas sem precisar pedir atualização todo dia.",
];

const SocialProofTestimonialRotator = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % rotatingTestimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <figure className="relative flex-1 rounded-xl bg-background/80 px-4 py-3 text-left shadow-sm">
      <blockquote className="text-xs italic text-muted-foreground sm:text-sm">
        “{rotatingTestimonials[index]}”
      </blockquote>
      <figcaption className="mt-2 text-[11px] font-medium text-foreground/80">
        Depoimentos baseados em histórias reais de quem já passou por obra.
      </figcaption>
    </figure>
  );
};

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
            <Logo variant="compact" className="shrink-0" />
            <div className="hidden text-left leading-tight sm:block">
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
              onClick={() => scrollToSection("planos")}
              className="story-link text-muted-foreground transition-colors hover:text-foreground"
            >
              Planos
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
          <div className="max-w-3xl space-y-8 text-center md:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/80 px-3 py-1 text-[11px] font-medium text-muted-foreground shadow-sm hover-scale">
              <span className="h-1.5 w-1.5 rounded-full bg-primary pulse" aria-hidden="true" />
              <span>Entenda sua obra sem depender de planilhas ou termos técnicos</span>
            </div>

            <div className="space-y-4">
              <h1>
                Sua obra sob controle.
                <br />
                <span className="text-[hsl(var(--primary))]">Sem sustos, sem adivinhação no orçamento.</span>
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Veja, em minutos, quanto já saiu do seu bolso, o que ainda vem pela frente e se a obra está dentro
                do combinado. Tudo em um painel simples, para você decidir com calma e evitar estouros de última
                hora.
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
                className="hover-scale font-semibold"
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
              <p className="text-muted-foreground">
                Saiba exatamente o que já foi pago, o que vence nos próximos dias e evite sustos de caixa no meio da
                obra.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
              <LineChart className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="font-semibold">Orçamento sob controle</p>
              <p className="text-muted-foreground">
                Acompanhe em porcentagem quanto da obra já foi executado para decidir, com segurança, se pode gastar
                mais ou se precisa segurar.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
              <CalendarDays className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="font-semibold">Cronograma visível</p>
              <p className="text-muted-foreground">
                Veja em que etapa a obra está e quais são os próximos passos, para combinar prazos com equipe e
                evitar remarcações.
              </p>
            </div>
          </div>
        </section>

        {/* PROVA SOCIAL DINÂMICA */}
        <section className="mt-10 flex flex-col gap-4 rounded-2xl border border-primary/20 bg-primary/5 px-4 py-4 text-xs sm:flex-row sm:items-center sm:justify-between sm:text-sm animate-fade-in">
          <div className="space-y-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">Prova social</p>
            <p className="text-sm font-semibold sm:text-base">
              Mais de <span className="text-[hsl(var(--primary))]">120 obras</span> já foram organizadas com o Minha
              Obra.
            </p>
            <p className="text-xs text-muted-foreground sm:text-sm">
              Cada obra representa uma família decidindo com mais calma onde colocar o dinheiro de construção.
            </p>
          </div>

          <SocialProofTestimonialRotator />
        </section>

        {/* BENEFÍCIOS */}
        <section id="beneficios" className="mt-20 space-y-8 animate-fade-in">
          <header className="space-y-2 text-center">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-primary">Benefícios</p>
            <h2>Pensado para quem está construindo pela primeira vez</h2>
            <p className="mx-auto max-w-2xl text-sm text-muted-foreground">
              Em vez de planilhas difíceis, você enxerga sua obra com frases simples, gráficos em verde, amarelo e
              vermelho e exemplos práticos. Assim, evita decisões no impulso e conversa melhor com quem te ajuda na
              obra.
            </p>
          </header>

          <div className="grid gap-6 md:grid-cols-3">
            <article className="card-elevated flex h-full flex-col gap-3 p-6 transition-transform duration-200 hover:-translate-y-1 hover-scale">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10">
                <LineChart className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-base font-semibold">Visão clara de custos</h3>
              <p className="text-sm text-muted-foreground">
                Veja, em um só lugar, quanto já gastou, quanto ainda falta e em quais etapas o dinheiro está indo.
                Isso te ajuda a dizer "sim" ou "não" para novos gastos com muito mais segurança.
              </p>
            </article>

            <article className="card-elevated flex h-full flex-col gap-3 p-6 transition-transform duration-200 hover:-translate-y-1 hover-scale">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10">
                <Wallet className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-base font-semibold">Pagamentos organizados</h3>
              <p className="text-sm text-muted-foreground">
                Registre mão de obra, materiais e serviços em poucos toques. Nunca mais fique em dúvida se já pagou
                alguém ou se aquele recibo está perdido em alguma gaveta.
              </p>
            </article>

            <article className="card-elevated flex h-full flex-col gap-3 p-6 transition-transform duration-200 hover:-translate-y-1 hover-scale">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-base font-semibold">Etapas sem surpresas</h3>
              <p className="text-sm text-muted-foreground">
                Acompanhe da fundação ao acabamento e veja rapidamente se alguma etapa está atrasando ou gastando
                mais do que o combinado, para agir antes de virar dor de cabeça.
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

        {/* PLANOS / PREÇOS */}
        <section
          id="planos"
          className="mt-24 space-y-8 animate-fade-in"
          aria-labelledby="planos-heading"
        >
          <header className="space-y-2 text-center">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-primary">Planos</p>
            <h2 id="planos-heading" className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Escolha o nível de controle que faz sentido para sua obra
            </h2>
            <p className="mx-auto max-w-2xl text-sm text-muted-foreground">
              Valores mensais para você acompanhar sua construção sem sustos. Você pode cancelar quando quiser,
              sem multa nem fidelidade.
            </p>
          </header>

          {/* Selos de prova social e garantias */}
          <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-3 text-[11px] sm:text-xs">
            <div className="flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1.5">
              <Star className="h-3.5 w-3.5 text-primary" />
              <span className="font-medium text-foreground">Plano Premium é o mais escolhido pelos clientes</span>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-1.5">
              <Shield className="h-3.5 w-3.5 text-primary" />
              <span className="text-muted-foreground">7 dias para testar com tranquilidade</span>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-1.5">
              <CalendarDays className="h-3.5 w-3.5 text-primary" />
              <span className="text-muted-foreground">Cancelamento simples direto pelo painel</span>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Essencial */}
            <article className="card-elevated flex h-full flex-col justify-between p-6">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Essencial</h3>
                <p className="text-sm text-muted-foreground">
                  Para quem quer sair do caderno e ter o básico organizado em um só lugar.
                </p>
                <p className="text-2xl font-semibold">
                  R$ 29,90
                  <span className="text-xs font-normal text-muted-foreground"> / mês</span>
                </p>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <li>• 1 obra ativa por vez</li>
                  <li>• Registro simples de gastos por etapa</li>
                  <li>• Visão geral de pagamentos já feitos</li>
                  <li>• Gráficos básicos de andamento</li>
                </ul>
              </div>
              <div className="mt-6">
                <Button className="w-full hover-scale" size="lg" onClick={goToAuth}>
                  Começar com Essencial
                </Button>
                <p className="mt-2 text-center text-[11px] text-muted-foreground">
                  Assinatura simulada para demonstração. Você ajusta depois.
                </p>
              </div>
            </article>

            {/* Premium - mais escolhido */}
            <article className="relative flex h-full flex-col justify-between rounded-3xl border border-primary/80 bg-[hsl(var(--primary))] p-6 shadow-md shadow-[0_0_40px_hsl(var(--primary)/0.7)] hover:-translate-y-1 hover:shadow-[0_0_52px_hsl(var(--primary)/0.9)] transition-all duration-300">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[hsl(var(--primary-foreground))] px-3 py-1 text-[11px] font-semibold text-[hsl(var(--primary))] shadow-sm">
                Mais escolhido
              </div>
              <div className="space-y-3 pt-4 text-[hsl(var(--primary-foreground))]">
                <div className="inline-flex items-center gap-2 rounded-full bg-[hsl(var(--primary-foreground))/0.1] px-3 py-1 text-xs font-medium text-[hsl(var(--primary-foreground))] animate-pulse">
                  <Crown className="h-3.5 w-3.5" />
                  <span>Controle premium da sua obra</span>
                </div>
                <h3 className="text-lg font-semibold">Premium</h3>
                <p className="text-sm text-[hsl(var(--primary-foreground))/0.88]">
                  Para quem quer acompanhar de perto orçamento, etapas e decisões com mais detalhes.
                </p>
                <p className="text-2xl font-semibold">
                  R$ 49,90
                  <span className="text-xs font-normal text-[hsl(var(--primary-foreground))/0.82]"> / mês</span>
                </p>
                <ul className="mt-3 space-y-2 text-sm text-[hsl(var(--primary-foreground))/0.86]">
                  <li>• Tudo do Essencial</li>
                  <li>• Controle de decisões com impacto financeiro</li>
                  <li>• Linha do tempo de pagamentos futuros (7 e 30 dias)</li>
                  <li>• Upload e consulta de comprovantes da obra</li>
                  <li>• Links de visualização para compartilhar com arquiteto ou família</li>
                </ul>
              </div>
              <div className="mt-6">
                <Button
                  className="w-full hover-scale bg-[hsl(var(--primary-foreground))] text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary-foreground))/0.9]"
                  size="lg"
                  onClick={goToAuth}
               >
                  Escolher plano Premium
                </Button>
                <p className="mt-2 text-center text-[11px] text-[hsl(var(--primary-foreground))/0.8]">
                  Ideal para a maioria das obras residenciais e reformas.
                </p>
              </div>
            </article>

            {/* Executive */}
            <article className="card-elevated flex h-full flex-col justify-between p-6">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Executive</h3>
                <p className="text-sm text-muted-foreground">
                  Para quem acompanha mais de uma obra ao mesmo tempo ou quer histórico completo.
                </p>
                <p className="text-2xl font-semibold">
                  R$ 157,90
                  <span className="text-xs font-normal text-muted-foreground"> / mês</span>
                </p>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <li>• Até 5 obras ativas em paralelo</li>
                  <li>• Histórico completo de gastos e decisões das obras anteriores</li>
                  <li>• Exportação de relatórios financeiros detalhados</li>
                  <li>• Priorização no suporte por e-mail</li>
                </ul>
              </div>
              <div className="mt-6">
                <Button className="w-full hover-scale" size="lg" onClick={goToAuth}>
                  Ficar com Executive
                </Button>
                <p className="mt-2 text-center text-[11px] text-muted-foreground">
                  Pensado para quem gerencia várias obras ou presta consultoria.
                </p>
              </div>
            </article>
          </div>
        </section>


        {/* FAQ */}
        <section
          aria-labelledby="faq-heading"
          className="mt-20 space-y-8 border-t border-border/60 pt-12 animate-fade-in"
        >
          <header className="space-y-2 text-center">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-primary">Dúvidas rápidas</p>
            <h2 id="faq-heading">Perguntas frequentes sobre assinatura</h2>
            <p className="mx-auto max-w-2xl text-sm text-muted-foreground">
              Respostas diretas sobre pagamento, cancelamento e segurança para você decidir com tranquilidade.
            </p>
          </header>

          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
            <article className="card-elevated p-5 text-left">
              <h3 className="text-base font-semibold">Como funciona o pagamento?</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Você escolhe um plano mensal e o valor é cobrado automaticamente todo mês. Nesta versão de
                demonstração, o pagamento é apenas ilustrativo – você poderá ajustar os valores e a forma de
                cobrança quando for lançar para o público.
              </p>
            </article>

            <article className="card-elevated p-5 text-left">
              <h3 className="text-base font-semibold">Posso cancelar quando quiser?</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Sim. A ideia é que você consiga cancelar direto pelo painel, sem telefonema, multa ou fidelidade.
                Enquanto isso, você pode testar à vontade sabendo que pode parar a qualquer momento.
              </p>
            </article>

            <article className="card-elevated p-5 text-left">
              <h3 className="text-base font-semibold">Meus dados e da obra ficam seguros?</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Os dados são armazenados em ambiente seguro, com os mesmos padrões usados por grandes empresas de
                tecnologia. Todas as informações de valor, etapas e documentos são protegidas e você controla quem
                pode enxergar cada obra.
              </p>
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
            Crie sua conta, cadastre sua obra e veja em minutos se os gastos estão dentro do combinado e se há risco
            de atraso. Você controla o cancelamento a qualquer momento, sem burocracia.
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
