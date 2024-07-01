import { useNavigate } from "@remix-run/react";
import { useEffect } from "react";
import { useIsAuthReady, useIsLoggedIn } from "~/utils/supabase/AuthProvider";
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
  const navigate = useNavigate();
  useEffect(() => {
    logout(() => {
      navigate(urls.home);
    }).catch(console.error);
  }, [navigate]);
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
