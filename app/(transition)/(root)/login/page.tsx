"use client";

import { NextPage } from "next";

import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createClient } from "@/utils/supabase/client";
import { useTheme } from "next-themes";

const supabase = createClient();

const AuthPage: NextPage = () => {
  const [session, setSession] = useState<Session | null>(null);
  const { resolvedTheme } = useTheme();
  const [url, setUrl] = useState<string | undefined>();

  useEffect(() => {
    const url = new URL(window.location.href);
    url.pathname = "/";
    url.hash = "";
    setUrl(url.toString());

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      await supabase.auth.startAutoRefresh();
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      await supabase.auth.startAutoRefresh();
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (session) {
    redirect("/");
  }

  return (
    <div className="min-h-[calc(100dvh-57px)] w-full bg-muted px-4 pt-8">
      <div className="m-auto flex w-full max-w-lg shrink-0 flex-col gap-4 rounded-2xl bg-background p-10 shadow-xl">
        <div>
          <h1 className="text-left text-2xl font-bold">Regístrate.</h1>
          <p className="text-left text-sm text-muted-foreground">
            Mantente al tanto de las novedades de JavaScript Chile.
          </p>
        </div>

        <Auth
          providers={["github", "twitter"]}
          supabaseClient={supabase}
          socialLayout="horizontal"
          showLinks={false}
          view="magic_link"
          redirectTo={url}
          localization={{
            variables: {
              magic_link: {
                email_input_label: "Correo electrónico",
                email_input_placeholder: "Ingresa tu correo electrónico",
                button_label: "Enviar enlace mágico ✨",
                confirmation_text: "Revisa tu correo electrónico",
                empty_email_address: "Debes ingresar un correo electrónico",
                loading_button_label: "Enviando...",
              },
            },
          }}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: "#000",
                  brandAccent: "#2a2a2a",
                },
              },
            },
          }}
          theme={resolvedTheme}
        />
      </div>
    </div>
  );
};

export default AuthPage;
