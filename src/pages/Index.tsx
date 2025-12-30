import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, LineChart, Shield, Wallet, CalendarDays } from "lucide-react";
import landingHero from "@/assets/landing-hero.png";

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
            className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded-md"
          >
            <span className="h-7 w-7 rounded-xl bg-primary/10" aria-hidden="true" />
            <div className="leading-tight text-left">
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

      <main id="topo" className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 pb-20 pt-10">
        {/* HERO */}
        <section className="grid items-center gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] animate-enter">
          <div className="space-y-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/80 px-3 py-1 text-[11px] text-muted-foreground shadow-sm hover-scale">
              <span className="h-1.5 w-1.5 rounded-full bg-primary pulse" />
              <span>Acompanhe cada gasto da obra em tempo real</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
                Sua obra sob controle.
                <br />
                <span className="text-[hsl(var(--primary))]">Sem surpresas no orçamento.</span>
              </h1>
              <p className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                Organize custos, etapas e pagamentos da construção em um só lugar. Visual simples, feito
                para quem não gosta de planilhas complicadas.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-1">
              <Button size="lg" className="hover-scale" onClick={goToAuth}>
                Começar agora
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

            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>Sem cartão de crédito</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                <span>Seus dados protegidos</span>
              </div>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-primary/15 via-accent/10 to-background opacity-80 blur-3xl" />
            <div className="card-elevated relative w-full max-w-md overflow-hidden animate-scale-in hover-scale">
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent pointer-events-none" />
              <img
                src={landingHero}
                alt="Dashboard do Minha Obra com evolução de custos"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* FAIXA DE MÉTRICAS */}
        <section className="mt-12 grid gap-4 rounded-2xl bg-muted/60 px-4 py-4 text-xs sm:grid-cols-3 sm:text-sm animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
              <Wallet className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="font-semibold">Gastos em dia</p>
              <p className="text-muted-foreground">Veja o que já foi pago e o que ainda falta.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
              <LineChart className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="font-semibold">Orçamento sob controle</p>
              <p className="text-muted-foreground">Acompanhe em % quanto da obra já está executado.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
              <CalendarDays className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="font-semibold">Cronograma visível</p>
              <p className="text-muted-foreground">Saiba em que etapa a obra está em segundos.</p>
            </div>
          </div>
        </section>

        {/* BENEFÍCIOS */}
        <section id="beneficios" className="mt-16 space-y-8 animate-fade-in">
          <header className="space-y-2 text-center">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-primary">Benefícios</p>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Pensado para quem está construindo pela primeira vez
            </h2>
            <p className="mx-auto max-w-2xl text-sm text-muted-foreground">
              Visual limpo, termos simples e fluxo rápido. Tudo para você entender a situação da obra em
              poucos cliques.
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
                escondidas.
              </p>
            </article>

            <article className="card-elevated flex h-full flex-col gap-3 p-6 transition-transform duration-200 hover:-translate-y-1 hover-scale">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10">
                <Wallet className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-base font-semibold">Pagamentos organizados</h3>
              <p className="text-sm text-muted-foreground">
                Registre mão de obra, materiais e serviços. Tenha um histórico simples de tudo o que foi
                pago.
              </p>
            </article>

            <article className="card-elevated flex h-full flex-col gap-3 p-6 transition-transform duration-200 hover:-translate-y-1 hover-scale">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-base font-semibold">Etapas sem surpresas</h3>
              <p className="text-sm text-muted-foreground">
                Acompanhe da fundação ao acabamento e evite atrasos por falta de material ou de
                planejamento.
              </p>
            </article>
          </div>
        </section>

        {/* COMO FUNCIONA / DEMO VISUAL */}
        <section
          id="como-funciona"
          className="mt-20 grid items-start gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] animate-fade-in"
        >
          <div className="space-y-5">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-primary">
              Como funciona
            </p>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Em poucos passos, você enxerga toda a sua obra
            </h2>
            <ol className="space-y-4 text-sm text-muted-foreground">
              <li className="flex gap-3">
                <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-[11px] font-semibold text-primary">
                  1
                </span>
                <div>
                  <p className="font-medium text-foreground">Cadastre sua obra</p>
                  <p>Informe orçamento previsto, tipo de obra e data de início em menos de 2 minutos.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-[11px] font-semibold text-primary">
                  2
                </span>
                <div>
                  <p className="font-medium text-foreground">Registre gastos e pagamentos</p>
                  <p>Adicione mão de obra, materiais e serviços conforme eles acontecem.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-[11px] font-semibold text-primary">
                  3
                </span>
                <div>
                  <p className="font-medium text-foreground">Acompanhe os gráficos</p>
                  <p>Veja o que já foi executado, o que ainda está aberto e onde estão os maiores custos.</p>
                </div>
              </li>
            </ol>

            <div className="mt-4 rounded-2xl border border-dashed border-primary/30 bg-primary/5 px-4 py-3 text-xs text-muted-foreground">
              <p>
                O painel foi pensado para quem não é da área técnica: textos curtos, indicadores com cores
                claras e nada de termos complicados.
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
                  <p className="text-sm font-semibold">R$ 180.000,00</p>
                  <p className="mt-1 text-[11px] text-primary">62% já executado</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 text-[11px] sm:text-xs">
              <div className="rounded-xl bg-muted px-3 py-2">
                <p className="text-muted-foreground">Gastos até hoje</p>
                <p className="text-sm font-semibold">R$ 111.600,00</p>
              </div>
              <div className="rounded-xl bg-muted px-3 py-2">
                <p className="text-muted-foreground">Saldo disponível</p>
                <p className="text-sm font-semibold">R$ 68.400,00</p>
              </div>
              <div className="rounded-xl bg-muted px-3 py-2">
                <p className="text-muted-foreground">Próx. pagamentos</p>
                <p className="text-sm font-semibold">R$ 7.500,00</p>
              </div>
            </div>
          </div>
        </section>

        {/* CONTATO / CTA FINAL */}
        <section
          id="contato"
          className="mt-20 rounded-3xl bg-[hsl(var(--primary))] px-6 py-12 text-center text-[hsl(var(--primary-foreground))] animate-fade-in"
        >
          <h2 className="text-2xl font-semibold sm:text-3xl">Comece sua obra organizada hoje</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm opacity-90">
            Crie sua conta, cadastre sua obra e veja em minutos onde está indo o dinheiro. Sem compromisso,
            sem cartão de crédito.
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
