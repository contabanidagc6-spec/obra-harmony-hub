import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle2,
  LineChart,
  Shield,
  Wallet,
  CalendarDays,
  Crown,
  Star,
  TrendingUp,
  BarChart3,
  FileText,
  Users,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip, CartesianGrid, Cell, PieChart, Pie } from "recharts";

const etapaGastosData = [
  { name: "Fundação", gasto: 60000 },
  { name: "Estrutura", gasto: 100000 },
  { name: "Alvenaria", gasto: 60000 },
  { name: "Acabamento", gasto: 180000 },
  { name: "Finalização", gasto: 30000 },
];

const features = [
  {
    icon: BarChart3,
    title: "Dashboard em tempo real",
    description: "Visualize todos os gastos, etapas e progresso da obra em um painel único e intuitivo.",
    color: "from-emerald-500 to-teal-600"
  },
  {
    icon: Wallet,
    title: "Controle financeiro completo",
    description: "Registre gastos, compare com orçamento previsto e evite surpresas no final da obra.",
    color: "from-teal-500 to-cyan-600"
  },
  {
    icon: CalendarDays,
    title: "Cronograma de etapas",
    description: "Acompanhe o andamento físico e financeiro de cada fase da sua construção.",
    color: "from-cyan-500 to-blue-600"
  },
  {
    icon: FileText,
    title: "Documentos organizados",
    description: "Centralize notas fiscais, contratos e comprovantes em um só lugar seguro.",
    color: "from-blue-500 to-indigo-600"
  },
  {
    icon: Users,
    title: "Compartilhamento seguro",
    description: "Gere links para arquitetos e familiares acompanharem o progresso da obra.",
    color: "from-emerald-600 to-green-700"
  },
  {
    icon: TrendingUp,
    title: "Relatórios inteligentes",
    description: "Exporte relatórios detalhados e tome decisões baseadas em dados reais.",
    color: "from-green-600 to-emerald-700"
  }
];

const FeaturesCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % features.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % features.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + features.length) % features.length);
    setIsAutoPlaying(false);
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/5 via-background to-primary/10 p-1">
      <div className="relative overflow-hidden rounded-3xl bg-background/95 backdrop-blur-xl">
        <div className="relative h-[420px] md:h-[380px]">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isActive = index === currentIndex;
            const isPrev = index === (currentIndex - 1 + features.length) % features.length;
            const isNext = index === (currentIndex + 1) % features.length;

            return (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-700 ease-out ${
                  isActive
                    ? "translate-x-0 opacity-100 scale-100"
                    : isPrev
                    ? "-translate-x-full opacity-0 scale-95"
                    : isNext
                    ? "translate-x-full opacity-0 scale-95"
                    : "translate-x-full opacity-0 scale-95"
                }`}
              >
                <div className="flex h-full flex-col items-center justify-center gap-8 px-8 py-12 text-center">
                  <div className={`relative flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br ${feature.color} shadow-2xl shadow-primary/20`}>
                    <Icon className="h-12 w-12 text-white drop-shadow-lg" strokeWidth={1.5} />
                    <div className="absolute -inset-2 -z-10 rounded-3xl bg-gradient-to-br from-primary/20 to-transparent blur-xl" />
                  </div>

                  <div className="max-w-xl space-y-4">
                    <h3 className="text-3xl font-bold tracking-tight">{feature.title}</h3>
                    <p className="text-lg leading-relaxed text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>

                  <div className="mt-4 flex gap-2">
                    {features.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => goToSlide(i)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          i === currentIndex
                            ? "w-12 bg-primary"
                            : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                        }`}
                        aria-label={`Ir para slide ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-3 shadow-lg backdrop-blur-sm transition-all hover:bg-background hover:scale-110"
          aria-label="Slide anterior"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-3 shadow-lg backdrop-blur-sm transition-all hover:bg-background hover:scale-110"
          aria-label="Próximo slide"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

const AnimatedCounter = ({ end, duration = 2000, prefix = "", suffix = "" }: { end: number; duration?: number; prefix?: string; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, end, duration]);

  return (
    <div ref={ref} className="tabular-nums">
      {prefix}{count.toLocaleString("pt-BR")}{suffix}
    </div>
  );
};

const Index = () => {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    document.title = "Minha Obra | Controle da sua construção";

    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const goToAuth = () => navigate("/auth");

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <div
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,hsl(var(--primary)/0.15),transparent)]"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      />

      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
          <button
            type="button"
            onClick={() => scrollToSection("topo")}
            className="flex items-center gap-3 rounded-xl p-2 transition-all hover:bg-muted/50"
          >
            <Logo variant="compact" className="shrink-0" />
            <div className="hidden text-left leading-tight sm:block">
              <p className="text-sm font-semibold tracking-tight">Minha Obra</p>
              <p className="text-[11px] text-muted-foreground">Controle total da sua construção</p>
            </div>
          </button>

          <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
            <button
              type="button"
              onClick={() => scrollToSection("funcionalidades")}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Funcionalidades
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("como-funciona")}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Como funciona
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("planos")}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Planos
            </button>
            <Button
              size="sm"
              className="shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30"
              type="button"
              onClick={goToAuth}
            >
              Entrar
            </Button>
          </nav>

          <Button
            size="sm"
            variant="outline"
            className="md:hidden"
            type="button"
            onClick={goToAuth}
          >
            Entrar
          </Button>
        </div>
      </header>

      <main id="topo" className="mx-auto w-full max-w-7xl px-6">
        <section className="relative py-20 md:py-32">
          <div className="mx-auto max-w-4xl space-y-12 text-center">
            <div
              className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-2 text-sm font-medium backdrop-blur-sm"
              style={{
                animation: "float 6s ease-in-out infinite"
              }}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              <span>Controle inteligente sem planilhas complexas</span>
            </div>

            <div className="space-y-6">
              <h1
                className="text-5xl font-bold leading-[1.1] tracking-tight md:text-7xl"
                style={{
                  animation: "fadeInUp 0.8s ease-out"
                }}
              >
                Sua obra sob controle.
                <br />
                <span className="bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent">
                  Sem sustos no orçamento.
                </span>
              </h1>
              <p
                className="mx-auto max-w-2xl text-xl leading-relaxed text-muted-foreground"
                style={{
                  animation: "fadeInUp 0.8s ease-out 0.2s both"
                }}
              >
                Veja em minutos quanto já gastou, o que ainda vem e se está dentro do combinado.
                Decisões com calma, sem estouros de última hora.
              </p>
            </div>

            <div
              className="flex flex-wrap items-center justify-center gap-4 pt-4"
              style={{
                animation: "fadeInUp 0.8s ease-out 0.4s both"
              }}
            >
              <Button
                size="lg"
                className="h-14 gap-2 px-8 text-base font-semibold shadow-2xl shadow-primary/30 transition-all hover:scale-105 hover:shadow-3xl hover:shadow-primary/40"
                onClick={goToAuth}
              >
                Ver minha obra agora
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-8 text-base font-semibold backdrop-blur-sm transition-all hover:scale-105"
                type="button"
                onClick={() => scrollToSection("funcionalidades")}
              >
                Conhecer funcionalidades
              </Button>
            </div>

            <div
              className="flex flex-wrap items-center justify-center gap-8 pt-8 text-sm text-muted-foreground"
              style={{
                animation: "fadeInUp 0.8s ease-out 0.6s both"
              }}
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span>Teste grátis por 7 dias</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <span>Dados protegidos</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-primary" />
                <span>Sem fidelidade</span>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 py-16 md:grid-cols-3">
          {[
            { icon: TrendingUp, value: 120, suffix: "+", label: "Obras organizadas", sublabel: "Famílias tomando decisões com calma" },
            { icon: BarChart3, value: 98, suffix: "%", label: "Evitam estouros", sublabel: "Controlando gastos em tempo real" },
            { icon: CalendarDays, value: 45, suffix: "min", label: "Setup médio", sublabel: "Da cadastro ao primeiro insight" }
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-3xl border border-border/50 bg-gradient-to-br from-background via-background to-primary/5 p-8 transition-all hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${0.8 + index * 0.2}s both`
                }}
              >
                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/5 blur-3xl transition-all group-hover:bg-primary/10" />
                <div className="relative space-y-4">
                  <Icon className="h-8 w-8 text-primary transition-transform group-hover:scale-110" />
                  <div>
                    <div className="text-5xl font-bold tracking-tight">
                      <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                    </div>
                    <p className="mt-2 font-semibold">{stat.label}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{stat.sublabel}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        <section id="funcionalidades" className="py-20">
          <div className="mx-auto max-w-5xl space-y-12 text-center">
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">Funcionalidades</p>
              <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
                Tudo que você precisa para<br />controlar sua obra
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                Ferramentas inteligentes que transformam dados complexos em decisões simples.
              </p>
            </div>

            <FeaturesCarousel />
          </div>
        </section>

        <section id="como-funciona" className="py-20">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="order-2 space-y-8 md:order-1">
              <div className="space-y-4">
                <p className="text-sm font-semibold uppercase tracking-wider text-primary">Como funciona</p>
                <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
                  Simples como deveria ser
                </h2>
                <p className="text-lg text-muted-foreground">
                  Sem curva de aprendizado. Cadastre, registre e acompanhe tudo em poucos minutos.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  { step: "01", title: "Cadastre sua obra", desc: "Orçamento, tipo, área e data de início" },
                  { step: "02", title: "Registre os gastos", desc: "Mão de obra, materiais e serviços" },
                  { step: "03", title: "Anexe comprovantes", desc: "Notas, contratos e fotos organizados" },
                  { step: "04", title: "Acompanhe o progresso", desc: "Gráficos e alertas em tempo real" }
                ].map((item, index) => (
                  <div
                    key={index}
                    className="group flex gap-6 rounded-2xl border border-transparent p-6 transition-all hover:border-primary/20 hover:bg-primary/5"
                  >
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/70 text-xl font-bold text-white shadow-lg shadow-primary/20 transition-transform group-hover:scale-110">
                      {item.step}
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-xl font-semibold">{item.title}</h3>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="order-1 md:order-2">
              <div className="rounded-3xl border border-border/50 bg-gradient-to-br from-background to-primary/5 p-8 shadow-2xl">
                <div className="space-y-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-muted-foreground">Dashboard financeiro</span>
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      Tempo real
                    </span>
                  </div>

                  <div className="relative aspect-square max-w-xs mx-auto">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: "Usado", value: 62, fill: "hsl(var(--primary))" },
                            { name: "Restante", value: 38, fill: "hsl(var(--muted))" }
                          ]}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={2}
                          dataKey="value"
                          animationBegin={0}
                          animationDuration={1000}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <p className="text-sm text-muted-foreground">Orçamento</p>
                      <p className="text-3xl font-bold">62%</p>
                      <p className="text-xs text-muted-foreground">executado</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: "Total", value: "R$ 430k" },
                      { label: "Usado", value: "R$ 267k" },
                      { label: "Restante", value: "R$ 163k" }
                    ].map((item, i) => (
                      <div key={i} className="rounded-xl bg-muted/50 p-3 text-center">
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{item.label}</p>
                        <p className="mt-1 text-sm font-bold">{item.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <p className="text-xs font-semibold text-muted-foreground">Gastos por etapa</p>
                    <div className="h-40">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={etapaGastosData.slice(0, 5)}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                          <XAxis
                            dataKey="name"
                            tick={{ fontSize: 10 }}
                            tickLine={false}
                            axisLine={false}
                          />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "hsl(var(--background))",
                              border: "1px solid hsl(var(--border))",
                              borderRadius: 8,
                              fontSize: 12
                            }}
                          />
                          <Bar
                            dataKey="gasto"
                            radius={[8, 8, 0, 0]}
                            animationDuration={1000}
                          >
                            {etapaGastosData.slice(0, 5).map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={`hsl(var(--primary) / ${1 - index * 0.15})`}
                              />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="planos" className="py-20">
          <div className="mx-auto max-w-6xl space-y-12 text-center">
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">Planos</p>
              <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
                Escolha o plano ideal<br />para sua obra
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                Cancele quando quiser, sem multa nem fidelidade.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="group rounded-3xl border border-border/50 bg-background p-8 transition-all hover:border-primary/30 hover:shadow-2xl">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold">Essencial</h3>
                    <p className="mt-2 text-sm text-muted-foreground">Para começar a organizar</p>
                  </div>
                  <div>
                    <span className="text-5xl font-bold">R$ 29,90</span>
                    <span className="text-muted-foreground">/mês</span>
                  </div>
                  <ul className="space-y-3 text-left text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <span>1 obra ativa</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <span>Registro de gastos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <span>Gráficos básicos</span>
                    </li>
                  </ul>
                  <Button className="w-full" variant="outline" onClick={goToAuth}>
                    Começar agora
                  </Button>
                </div>
              </div>

              <div className="relative rounded-3xl border-2 border-primary bg-gradient-to-b from-primary/10 to-background p-8 shadow-2xl shadow-primary/20">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-sm font-bold text-white shadow-lg">
                  Mais escolhido
                </div>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold">Premium</h3>
                    <p className="mt-2 text-sm text-muted-foreground">Controle completo</p>
                  </div>
                  <div>
                    <span className="text-5xl font-bold">R$ 49,90</span>
                    <span className="text-muted-foreground">/mês</span>
                  </div>
                  <ul className="space-y-3 text-left text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <span>Tudo do Essencial</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <span>Upload de documentos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <span>Compartilhamento seguro</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <span>Relatórios detalhados</span>
                    </li>
                  </ul>
                  <Button className="w-full shadow-lg" onClick={goToAuth}>
                    Começar agora
                  </Button>
                </div>
              </div>

              <div className="group rounded-3xl border border-border/50 bg-background p-8 transition-all hover:border-primary/30 hover:shadow-2xl">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold">Executive</h3>
                    <p className="mt-2 text-sm text-muted-foreground">Para múltiplas obras</p>
                  </div>
                  <div>
                    <span className="text-5xl font-bold">R$ 157,90</span>
                    <span className="text-muted-foreground">/mês</span>
                  </div>
                  <ul className="space-y-3 text-left text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <span>Até 5 obras ativas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <span>Histórico completo</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <span>Suporte prioritário</span>
                    </li>
                  </ul>
                  <Button className="w-full" variant="outline" onClick={goToAuth}>
                    Começar agora
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="rounded-3xl bg-gradient-to-br from-primary via-primary/95 to-primary/90 p-12 text-center text-white shadow-2xl shadow-primary/20 md:p-20">
            <div className="mx-auto max-w-3xl space-y-8">
              <h2 className="text-4xl font-bold md:text-5xl">
                Comece a controlar sua obra hoje
              </h2>
              <p className="text-xl opacity-90">
                Cadastre em minutos e veja em tempo real se os gastos estão dentro do combinado.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 border-2 border-white bg-white px-8 text-base font-semibold text-primary hover:bg-white/90"
                  onClick={goToAuth}
                >
                  Criar conta gratuita
                </Button>
                <p className="text-sm opacity-75">7 dias grátis • Sem cartão de crédito</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/50 bg-muted/30 py-12">
        <div className="mx-auto max-w-7xl px-6 text-center text-sm text-muted-foreground">
          <p>© 2025 Minha Obra. Todos os direitos reservados.</p>
          <p className="mt-2">contato@minhaobra.app</p>
        </div>
      </footer>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Index;
