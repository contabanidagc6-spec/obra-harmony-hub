import { Button } from "@/components/ui/button";

const AuthPage = () => {
  return (
    <div className="page-shell">
      <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-4 pb-10 pt-8">
        <header className="mb-6 space-y-2 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent-foreground/80">
            Minha Obra
          </p>
          <h1 className="text-2xl font-semibold leading-tight">Entre para acessar sua obra</h1>
          <p className="text-sm text-muted-foreground">
            Em breve esta tela terá o login completo com e-mail e senha. Por enquanto, você já consegue
            testar o restante da experiência visual do app.
          </p>
        </header>

        <section className="card-elevated space-y-3 p-5 text-sm text-muted-foreground">
          <p>
            O botão <span className="font-semibold">Entrar</span> da landing page já está apontando para
            esta rota <span className="font-mono text-xs">/auth</span>, que será a porta de entrada do app.
          </p>
          <p>
            Assim que o fluxo de autenticação estiver ativo, você vai conseguir acessar o painel interno
            com seus dados de obra protegidos.
          </p>
        </section>

        <div className="mt-6 text-center text-xs text-muted-foreground">
          <p>
            Se quiser, posso configurar agora o login completo com e-mail/senha e proteção das rotas
            internas.
          </p>
        </div>

        <div className="mt-6 flex justify-center">
          <Button variant="outline" size="sm" className="hover-scale" onClick={() => window.history.back()}>
            Voltar
          </Button>
        </div>
      </main>
    </div>
  );
};

export default AuthPage;
