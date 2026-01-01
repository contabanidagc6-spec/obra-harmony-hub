import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          navigate("/auth", { replace: true });
          return;
        }

        setChecking(false);
      } catch (error) {
        console.error("Erro ao verificar sessão:", error);
        navigate("/auth", { replace: true });
      }
    };

    checkAuth();
  }, [navigate]);

  if (checking) {
    return (
      <div className="page-shell">
        <main className="flex flex-1 items-center justify-center">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Carregando sua sessão...</span>
          </div>
        </main>
      </div>
    );
  }

  return <>{children}</>;
};
