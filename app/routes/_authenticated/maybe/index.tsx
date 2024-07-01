import { useNavigate } from "@remix-run/react";

import { useIsAuthReady, useIsLoggedIn } from "~/utils/supabase/AuthProvider";
import { urls } from "~/utils/urls";
import { useEffect } from "react";

const Redirecting = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate(urls.home);
    }, 2000);
  }, [navigate]);
  return <div>Redirecting to home page...</div>;
};

export default function Layout() {
  const isLoggedIn = useIsLoggedIn();
  const isAuthReady = useIsAuthReady();

  if (!isAuthReady) {
    return <div>...</div>;
  }

  if (!isLoggedIn) {
    return <Redirecting />;
  } else {
    return (
      <div className="flex w-full flex-1 flex-col items-center justify-center gap-2 bg-muted">
        <div className="flex w-full max-w-lg flex-1 flex-col items-center justify-center gap-8">
          <h1 className="px-2 text-xl">Yeah, you are logged in</h1>
        </div>
      </div>
    );
  }
}
