import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const baseAuthSchema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: "Digite um e-mail válido" })
    .max(255, { message: "O e-mail deve ter no máximo 255 caracteres" }),
  password: z
    .string()
    .min(8, { message: "A senha deve ter pelo menos 8 caracteres" })
    .max(72, { message: "A senha deve ter no máximo 72 caracteres" }),
});

const signUpSchema = baseAuthSchema
  .extend({
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "As senhas precisam ser iguais",
  });

type AuthMode = "login" | "signup";

type LoginFormValues = z.infer<typeof baseAuthSchema>;
type SignUpFormValues = z.infer<typeof signUpSchema>;

const AuthPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [mode, setMode] = useState<AuthMode>("login");
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormValues | SignUpFormValues>({
    resolver: zodResolver(mode === "login" ? baseAuthSchema : signUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    document.title = "Minha Obra | Entrar";
  }, []);

  const handlePostAuthNavigation = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        toast({
          title: "Sessão não encontrada",
          description: "Tente entrar novamente.",
          variant: "destructive",
        });
        return;
      }

      const { data: obras } = await supabase
        .from("obras")
        .select("id")
        .order("created_at", { ascending: true })
        .limit(1);

      if (!obras || obras.length === 0) {
        navigate("/onboarding");
        return;
      }

      const { data: gastos } = await supabase.from("gastos").select("id").limit(1);

      if (!gastos || gastos.length === 0) {
        navigate("/gastos/novo");
        return;
      }

      navigate("/dashboard");
    } catch (error: any) {
      toast({
        title: "Erro ao redirecionar",
        description: error?.message || "Tente novamente em instantes.",
        variant: "destructive",
      });
    }
  };

  const onSubmit = async (values: LoginFormValues | SignUpFormValues) => {
    setSubmitting(true);

    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({
          email: values.email,
          password: values.password,
        });

        if (error) {
          toast({
            title: "Não foi possível entrar",
            description: error.message || "Verifique seus dados e tente novamente.",
            variant: "destructive",
          });
          return;
        }

        toast({
          title: "Bem-vindo de volta",
          description: "Vamos retomar o controle da sua obra.",
        });

        await handlePostAuthNavigation();
        return;
      }

      const redirectUrl = `${window.location.origin}/`;

      const { error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          emailRedirectTo: redirectUrl,
        },
      });

      if (error) {
        toast({
          title: "Não foi possível criar sua conta",
          description: error.message || "Revise os dados e tente novamente.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Conta criada com sucesso",
        description: "Agora vamos configurar sua obra em poucos passos.",
      });

      reset({ email: values.email, password: "" } as any);
      await handlePostAuthNavigation();
    } catch (error: any) {
      toast({
        title: "Erro inesperado",
        description: error?.message || "Tente novamente em instantes.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const toggleMode = () => {
    setMode((prev) => (prev === "login" ? "signup" : "login"));
    reset({ email: "", password: "" } as any);
  };

  return (
    <div className="page-shell">
      <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-4 pb-10 pt-8">
        <header className="mb-8 space-y-2 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent-foreground/80">Minha Obra</p>
          <h1 className="text-2xl font-semibold leading-tight">
            {mode === "login" ? "Fazer login" : "Criar conta gratuita"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {mode === "login"
              ? "Acesse seu painel de obra com e-mail e senha já cadastrados."
              : "Leva menos de 1 minuto para criar sua conta e começar a organizar sua obra."}
          </p>
        </header>

        <section className="card-elevated p-5 animate-scale-in">
          <div className="mb-5 flex gap-2 rounded-full bg-muted px-1 py-1 text-xs font-medium">
            <button
              type="button"
              onClick={() => {
                setMode("login");
                reset({ email: "", password: "" } as any);
              }}
              className={`flex-1 rounded-full px-3 py-1.5 transition-colors ${
                mode === "login"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Já tenho conta
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("signup");
                reset({ email: "", password: "" } as any);
              }}
              className={`flex-1 rounded-full px-3 py-1.5 transition-colors ${
                mode === "signup"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Criar conta gratuita
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="voce@email.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-xs text-destructive">{errors.email.message as string}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                autoComplete={mode === "login" ? "current-password" : "new-password"}
                placeholder="Mínimo de 8 caracteres"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-xs text-destructive">{errors.password.message as string}</p>
              )}
            </div>

            {mode === "signup" && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar senha</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Repita a mesma senha"
                  {...register("confirmPassword" as any)}
                />
                {"confirmPassword" in errors && (
                  <p className="text-xs text-destructive">{(errors as any).confirmPassword?.message}</p>
                )}
              </div>
            )}

            <Button type="submit" className="mt-2 w-full hover-scale" size="lg" disabled={submitting}>
              {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {mode === "login" ? "Entrar" : "Criar conta e continuar"}
            </Button>
          </form>

          <div className="mt-4 space-y-2 text-center text-xs text-muted-foreground">
            <p>
              {mode === "login"
                ? "Esqueceu a senha? Em breve você poderá recuperá-la diretamente por aqui."
                : "Sem fidelidade e sem multa: você pode parar de usar quando quiser."}
            </p>
            <p>
              Seus dados de obra ficam protegidos e só você decide quem pode enxergar os números, com links seguros
              de compartilhamento.
            </p>
          </div>
        </section>

        <div className="mt-6 flex justify-center">
          <Button
            variant="outline"
            size="sm"
            className="hover-scale"
            type="button"
            onClick={() => navigate("/")}
          >
            Voltar para a página inicial
          </Button>
        </div>
      </main>
    </div>
  );
};

export default AuthPage;
