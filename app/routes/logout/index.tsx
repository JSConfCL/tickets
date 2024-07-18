import { useNavigate } from "@remix-run/react";
import { useEffect } from "react";

import {
  useAuthContext,
  useIsAuthReady,
  useIsLoggedIn,
} from "~/utils/supabase/AuthProvider";
import { logout } from "~/utils/supabase/client";
import { urls } from "~/utils/urls";

const Redirecting = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(urls.home);
  }, [navigate]);

  return null;
};

const Logout = () => {
  const { setImpersonation } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    logout(() => {
      navigate(urls.home);
      setImpersonation(null);
    }).catch(console.error);
  }, [navigate, setImpersonation]);

  return null;
};

export default function LogoutRoute() {
  const isLoggedIn = useIsLoggedIn();
  const isAuthReady = useIsAuthReady();

  if (!isAuthReady) {
    return null;
  }

  if (!isLoggedIn) {
    return <Redirecting />;
  }

  return <Logout />;
}
