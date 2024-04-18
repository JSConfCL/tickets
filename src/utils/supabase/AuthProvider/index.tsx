"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { User } from "@supabase/supabase-js";
import {
  COOKIE_NAME,
  getCookieOptions,
  supabaseClient,
} from "@/utils/supabase/client";
import cookies from "js-cookie";

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
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      const {
        data: { session },
      } = await supabaseClient.auth.getSession();
      console.log("session", session);
      if (session) {
        setUser(session?.user ?? null);
        const accessToken = session?.access_token ?? null;
        cookies.set(COOKIE_NAME, accessToken, getCookieOptions());
      }
      setIsReady(true);
    };

    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange((_event, session) => {
      console.log("session onAuthStateChange", session);
      const access_token = session?.access_token ?? null;
      if (!access_token) {
        cookies.remove(COOKIE_NAME);
      } else {
        cookies.set(COOKIE_NAME, access_token, getCookieOptions());
      }
      setUser(session?.user ?? null);
    });

    initialize().catch(console.error);
    return () => subscription.unsubscribe();
  }, []);

  const value = useMemo(
    () => ({ user, isLogged: Boolean(user?.id), isReady }),
    [user, isReady],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useUser = () => useContext(AuthContext).user;

export const useIsLoggedIn = () => useContext(AuthContext).isLogged;
export const useIsAuthReady = () => useContext(AuthContext).isReady;
