import { useEffect } from "react";
import { AppLayout } from "@/layouts/AppLayout";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { DashboardPage } from "./pages/DashboardPage";
import { EtapasPage } from "./pages/EtapasPage";
import { EtapaDetalhePage } from "./pages/EtapaDetalhePage";
import { PagamentosFuturosPage } from "./pages/PagamentosFuturosPage";
import { DecisoesPage } from "./pages/DecisoesPage";
import { ArquivosPage } from "./pages/ArquivosPage";
import { RelatorioPage } from "./pages/RelatorioPage";
import { ConfiguracoesPage } from "./pages/ConfiguracoesPage";
import { NovoGastoPage } from "./pages/NovoGastoPage";
import OnboardingPage from "./pages/OnboardingPage";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    const metaDescription = document.querySelector("meta[name='description']");
    if (!metaDescription) {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content =
        "Minha Obra - organize orçamento, etapas, decisões e pagamentos da sua construção em um painel simples.";
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/onboarding" element={<OnboardingPage />} />
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/etapas" element={<EtapasPage />} />
              <Route path="/etapas/:id" element={<EtapaDetalhePage />} />
              <Route path="/pagamentos" element={<PagamentosFuturosPage />} />
              <Route path="/decisoes" element={<DecisoesPage />} />
              <Route path="/arquivos" element={<ArquivosPage />} />
              <Route path="/relatorio" element={<RelatorioPage />} />
              <Route path="/configuracoes" element={<ConfiguracoesPage />} />
              <Route path="/gastos" element={<NotFound />} />
              <Route path="/gastos/novo" element={<NovoGastoPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
