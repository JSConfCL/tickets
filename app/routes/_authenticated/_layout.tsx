import { Outlet, useLocation } from "@remix-run/react";

import { Login } from "~/components/Login/Login";
import { useIsAuthReady, useIsLoggedIn } from "~/utils/supabase/AuthProvider";

export default function AuthenticatedLayout() {
  const isAuthReady = useIsAuthReady();
  const isLoggedIn = useIsLoggedIn();
  const location = useLocation();

  if (!isAuthReady) {
    return null;
  }

  if (!isLoggedIn) {
    return (
      <div className="flex w-full flex-1 flex-col items-center justify-center gap-2">
        <div className="pt-28" />
        <Login redirectTo={location.pathname} />
      </div>
    );
  }

  return <Outlet />;
}
