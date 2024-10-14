import { MetaFunction } from "@remix-run/cloudflare";
import { useNavigate } from "@remix-run/react";
import { useEffect } from "react";

import { Login } from "~/components/Login/Login";
import { useIsAuthReady, useIsLoggedIn } from "~/utils/supabase/AuthProvider";
import { urls } from "~/utils/urls";

export const meta: MetaFunction = () => {
  return [
    { title: "Tickets - Entrar a mi cuenta" },
    {
      property: "og:title",
      content: "Tickets - Entrar a mi cuenta",
    },
    {
      name: "description",
      content:
        "Tickets - Entrar a mi cuenta de Tickets para asistir a eventos, o gestionarlos.",
    },
  ];
};

const Redirecting = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(urls.home);
  }, [navigate]);

  return null;
};

export default function LoginRoute() {
  const isLoggedIn = useIsLoggedIn();
  const isAuthReady = useIsAuthReady();

  if (!isAuthReady) {
    return null;
  }

  if (isLoggedIn) {
    return <Redirecting />;
  }

  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center gap-2">
      <div className="pt-28" />
      <Login />
    </div>
  );
}
