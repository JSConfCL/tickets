import { useNavigate } from "@remix-run/react";
import { useEffect } from "react";
import { Login } from "~/components/Login/Login";
import { useIsAuthReady, useIsLoggedIn } from "~/utils/supabase/AuthProvider";
import { urls } from "~/utils/urls";

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
    <div className="flex w-full flex-1 flex-col items-center justify-center gap-2 bg-muted">
      <div className="flex w-full max-w-lg flex-1 flex-col items-center justify-center gap-8">
        <Login />
        <div className="pb-28" />
      </div>
    </div>
  );
}
