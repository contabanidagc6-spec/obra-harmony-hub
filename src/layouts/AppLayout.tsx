import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

type Obra = Tables<"obras">;

const navItems = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Etapas da obra", to: "/etapas" },
  { label: "Gastos", to: "/gastos" },
  { label: "Pagamentos futuros", to: "/pagamentos" },
  { label: "Decisões", to: "/decisoes" },
  { label: "Arquivos", to: "/arquivos" },
  { label: "Relatório da obra", to: "/relatorio" },
  { label: "Configurações da obra", to: "/configuracoes" },
];

export const AppLayout = () => {
  const location = useLocation();
  const [obras, setObras] = useState<Obra[]>([]);
  const [loadingObraHeader, setLoadingObraHeader] = useState(true);

  useEffect(() => {
    const loadObras = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          setLoadingObraHeader(false);
          return;
        }

        const { data, error } = await supabase
          .from("obras")
          .select("id, nome, created_at")
          .eq("user_id", user.id)
          .order("created_at", { ascending: true });

        if (error) throw error;

        setObras((data as Obra[]) || []);
      } catch (error) {
        console.error("Erro ao carregar obras para o cabeçalho:", error);
      } finally {
        setLoadingObraHeader(false);
      }
    };

    loadObras();
  }, []);

  const currentObra = obras[0] ?? null;

  return (
    <div className="page-shell">
      <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3 gap-3">
          <div className="flex items-center gap-2">
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="ghost" size="icon" className="hover-scale" aria-label="Abrir menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </DrawerTrigger>
              <DrawerContent className="flex flex-col justify-between px-0 pb-4">
                <div>
                  <DrawerHeader className="px-6 pb-4 pt-2 text-left">
                    <DrawerTitle className="text-lg">Minha Obra</DrawerTitle>
                    <p className="text-sm text-muted-foreground">Controle visual da sua construção</p>
                  </DrawerHeader>
                  <nav className="mt-2 space-y-1 px-2">
                    {navItems.map((item) => (
                      <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) =>
                          `flex items-center rounded-xl px-4 py-2 text-sm transition-colors ${
                            isActive
                              ? "bg-primary/10 text-primary font-medium"
                              : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                          }`
                        }
                      >
                        {item.label}
                      </NavLink>
                    ))}
                  </nav>
                </div>
                <div className="mt-4 border-t border-border/60 px-4 pt-3 space-y-1 text-sm">
                  <button className="w-full text-left text-muted-foreground hover:text-foreground">Suporte</button>
                  <button className="w-full text-left text-muted-foreground hover:text-foreground">Sair</button>
                </div>
              </DrawerContent>
            </Drawer>
            <Link to="/dashboard" className="flex flex-col leading-none">
              <span className="text-sm font-semibold tracking-tight">Minha Obra</span>
              <span className="text-[11px] text-muted-foreground">Painel da obra</span>
            </Link>
          </div>

          <div className="text-right">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Obra atual</p>
            <p className="text-sm font-semibold">
              {loadingObraHeader
                ? "Carregando..."
                : currentObra
                ? currentObra.nome
                : "Nenhuma obra cadastrada"}
            </p>
            {obras.length > 1 && (
              <p className="text-[11px] text-muted-foreground">
                Você tem {obras.length} obras. Em breve será possível alternar entre elas.
              </p>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-4 px-4 pb-24 pt-4 animate-fade-in">
        <Outlet />
      </main>

      {location.pathname !== "/" && (
        <div className="fixed inset-x-0 bottom-0 z-20 border-t bg-background/90 backdrop-blur-md">
          <div className="mx-auto flex max-w-4xl items-center justify-between gap-3 px-4 py-3">
            <div className="text-xs text-muted-foreground">Controle rápido de gastos da obra.</div>
            <Button asChild size="sm" className="hover-scale">
              <Link to="/gastos/novo">Adicionar gasto</Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
