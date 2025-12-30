import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, LineChart, Shield } from "lucide-react";
import landingHero from "@/assets/landing-hero.png";

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

  return (
    <div className="min-h-screen bg-background">
      {/* Cabeçalho público fixo */}
      <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-6 w-6 rounded-lg bg-primary/10" aria-hidden="true" />
            <div className="leading-tight">
              <p className="text-sm font-semibold tracking-tight">Minha Obra</p>
              <p className="text-[11px] text-muted-foreground">Controle total da sua construção</p>
            </div>
          </div>
          <nav className="flex items-center gap-5 text-sm">
            <button
              type="button"
              onClick={() => {
                const section = document.getElementById("beneficios");
                section?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="text-muted-foreground transition-colors story-link hover:text-foreground"
            >
              Benefícios
            </button>
            <button
              type="button"
              onClick={handleSecondaryCta}
              className="text-muted-foreground transition-colors story-link hover:text-foreground"
            >
              Como funciona
            </button>
            <Button
              size="sm"
              className="hover-scale"
              type="button"
              onClick={handlePrimaryCta}
            >
              Organizar minha obra
            </Button>
          </nav>
        </div>
      </header>

      <main className="page-shell mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 pb-16 pt-10">
        {/* Hero */}
        <section className="grid items-center gap-10 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] animate-fade-in">
          <div className="space-y-6">
            <p className="inline-flex items-center rounded-full border border-border/60 bg-background/70 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur-sm shadow-sm">
              <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-primary" />
              Controle total da sua construção
            </p>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              Controle sua obra.
              <br />
              <span className="text-[hsl(var(--primary))]">Sem sustos no orçamento.</span>
            </h1>
            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              A forma simples de acompanhar custos, etapas e pagamentos da sua construção ou reforma.
              Chega de planilhas complexas.
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
                Ver demonstração
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>Sem cartão de crédito</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                <span>Setup instantâneo</span>
              </div>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-primary/10 via-accent/10 to-background opacity-80 blur-3xl" />
            <div className="card-elevated w-full max-w-md overflow-hidden animate-scale-in hover-scale">
              <img
                src={landingHero}
                alt="Casa em construção representando organização da obra"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* Benefícios */}
        <section id="beneficios" className="mt-16 space-y-8 animate-fade-in">
          <header className="space-y-2 text-center">
            <h2 className="text-2xl font-semibold tracking-tight">Tudo o que você precisa para gerenciar sua obra</h2>
            <p className="mx-auto max-w-2xl text-sm text-muted-foreground">
              Simplificamos o complexo. Mantenha o foco na construção enquanto cuidamos da organização.
            </p>
          </header>

          <div className="grid gap-6 md:grid-cols-3">
            <article className="card-elevated flex flex-col items-start gap-3 p-6 transition-transform duration-200 hover:-translate-y-1 hover-scale">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[hsl(var(--primary))/0.08]">
                <LineChart className="h-6 w-6 text-[hsl(var(--primary))]" />
              </div>
              <h3 className="text-base font-semibold">Controle de Custos</h3>
              <p className="text-sm text-muted-foreground">
                Veja quanto já gastou e quanto ainda falta para terminar a obra. Gráficos claros e
                intuitivos.
              </p>
            </article>

            <article className="card-elevated flex flex-col items-start gap-3 p-6 transition-transform duration-200 hover:-translate-y-1 hover-scale">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[hsl(var(--primary))/0.08]">
                <CheckCircle2 className="h-6 w-6 text-[hsl(var(--primary))]" />
              </div>
              <h3 className="text-base font-semibold">Pagamentos Semanais</h3>
              <p className="text-sm text-muted-foreground">
                Gerencie mão de obra com valor fechado e acerto final. Nunca mais perca um comprovante.
              </p>
            </article>

            <article className="card-elevated flex flex-col items-start gap-3 p-6 transition-transform duration-200 hover:-translate-y-1 hover-scale">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[hsl(var(--primary))/0.08]">
                <Shield className="h-6 w-6 text-[hsl(var(--primary))]" />
              </div>
              <h3 className="text-base font-semibold">Etapas da Obra</h3>
              <p className="text-sm text-muted-foreground">
                Acompanhe cada fase, da fundação ao acabamento, e evite atrasos no cronograma.
              </p>
            </article>
          </div>
        </section>

        {/* Visualização rápida */}
        <section id="como-funciona" className="mt-20 grid items-center gap-10 md:grid-cols-2 animate-fade-in">
          <div className="card-elevated flex flex-col items-center gap-6 p-8">
            <div className="relative flex h-52 w-52 items-center justify-center">
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "conic-gradient(hsl(var(--primary)) 0 65%, hsl(var(--muted)) 65% 100%)",
                }}
              />
              <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-background">
                <div className="text-center text-sm">
                  <p className="text-xs text-muted-foreground">Orçamento Total</p>
                  <p className="text-base font-semibold">R$ 150.000,00</p>
                </div>
              </div>
            </div>

            <div className="flex w-full justify-around text-xs sm:text-sm">
              <div className="text-center">
                <p className="font-semibold text-[hsl(var(--primary))]">65%</p>
                <p className="text-muted-foreground">Executado</p>
              </div>
              <div className="text-center">
                <p className="font-semibold text-muted-foreground">35%</p>
                <p className="text-muted-foreground">Disponível</p>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <h2 className="text-2xl font-semibold tracking-tight">Visualize sua obra em segundos</h2>
            <p className="text-sm text-muted-foreground">
              Pare de tentar entender números soltos no WhatsApp ou no caderno. Nossa dashboard
              transforma dados complexos em visuais simples para você tomar decisões rápidas.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                <span>Relatórios automáticos de gastos</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                <span>Previsão de término baseada no ritmo atual</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                <span>Alertas de estouro de orçamento</span>
              </li>
            </ul>
          </div>
        </section>

        {/* CTA final */}
        <section className="mt-20 rounded-3xl bg-[hsl(var(--primary))] px-6 py-12 text-center text-[hsl(var(--primary-foreground))] animate-fade-in">
          <h2 className="text-2xl font-semibold">Sua obra organizada desde o primeiro dia</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm opacity-90">
            Chega de planilhas confusas e surpresas no final. Junte-se a proprietários que construíram com
            tranquilidade.
          </p>
          <div className="mt-6 flex justify-center">
            <Button size="lg" variant="outline" className="hover-scale" onClick={handlePrimaryCta}>
              Criar minha obra agora
            </Button>
          </div>
          <p className="mt-3 text-xs opacity-90">Teste grátis por 14 dias. Não requer cartão.</p>
        </section>
      </main>
    </div>
  );
};

export default Index;
