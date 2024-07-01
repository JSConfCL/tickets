import { Outlet } from "@remix-run/react";

import { Login } from "~/components/Login/Login";
import { useIsAuthReady, useIsLoggedIn } from "~/utils/supabase/AuthProvider";

export default function AuthenticatedLayout() {
  const isAuthReady = useIsAuthReady();
  const isLoggedIn = useIsLoggedIn();

  if (!isAuthReady) {
    return null;
  }

  if (!isLoggedIn) {
    return (
      <div className="flex w-full flex-1 items-center justify-center bg-muted px-4 pt-8">
        <Login />
      </div>
    );
  }

  return <Outlet />;
}
