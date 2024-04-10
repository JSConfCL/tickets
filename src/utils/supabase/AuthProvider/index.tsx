import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { User } from "@supabase/supabase-js";
import {
  COOKIE_NAME,
  getCookieOptions,
  supabaseClient,
} from "@/utils/supabase/client";
import { setCookie } from "cookies-next";

export type AuthContextType = {
  user: User | null;
  isLogged: boolean;
  isReady: boolean;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLogged: false,
  isReady: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const isLogged = !!user?.id;
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      const { data } = await supabaseClient.auth.getSession();
      if (data?.session) {
        // We handle cookies, and session storage here.
        setIsReady(true);
        setCookie(COOKIE_NAME, data.session, getCookieOptions());
        setUser(data?.session?.user ?? null);
        const accessToken = data?.session?.access_token;
        console.log({ accessToken });
      }
    };

    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange((_event, session) => {
      if (_event === "SIGNED_OUT") {
        setCookie(COOKIE_NAME, null, getCookieOptions());
        setUser(null);
      } else {
        setCookie(COOKIE_NAME, session, getCookieOptions());
        setUser(session?.user ?? null);
      }
    });

    initialize().catch(console.error);
    return () => subscription.unsubscribe();
  }, []);

  const value = useMemo(
    () => ({ user, isLogged, isReady }),
    [user, isLogged, isReady],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useUser = () => useContext(AuthContext).user;

export const useIsLoggedIn = () => useContext(AuthContext).isLogged;
export const useIsAuthReady = () => useContext(AuthContext).isReady;
