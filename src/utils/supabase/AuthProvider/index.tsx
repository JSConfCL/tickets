"use client";
import { Session, User } from "@supabase/supabase-js";
import cookies from "js-cookie";
import {
  MutableRefObject,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  COOKIE_NAME,
  getCookieOptions,
  supabaseClient,
} from "@/utils/supabase/client";

export type AuthContextType = {
  user: User | null;
  isLogged: boolean;
  isReady: boolean;
  tokenRef: MutableRefObject<string | null>;
  setTokenRef: (token: string | null) => void;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLogged: false,
  isReady: false,
  tokenRef: { current: null },
  setTokenRef: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [supabaseSession, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isReady, setIsReady] = useState(false);
  const tokenRef = useRef<string | null>(null);

  const setTokenRef = useCallback((token: string | null) => {
    tokenRef.current = token;
    if (!tokenRef.current) {
      cookies.remove(COOKIE_NAME);
    } else {
      cookies.set(COOKIE_NAME, tokenRef.current, getCookieOptions());
    }
  }, []);

  useEffect(() => {
    const initialize = async () => {
      const {
        data: { session },
      } = await supabaseClient.auth.getSession();
      setSession(session);
      await supabaseClient.auth.startAutoRefresh();
    };

    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      const token = session?.access_token ?? null;
      tokenRef.current = token;
      await supabaseClient.auth.startAutoRefresh();
    });

    // eslint-disable-next-line no-console
    initialize().catch(console.error);
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (supabaseSession) {
      const { user } = supabaseSession;
      setIsReady(true);
      setUser(user);
      if (!tokenRef.current) {
        cookies.remove(COOKIE_NAME);
      } else {
        cookies.set(COOKIE_NAME, tokenRef.current, getCookieOptions());
      }
    }
  }, [supabaseSession]);

  const value = useMemo(
    () => ({
      user,
      isLogged: Boolean(user?.id),
      isReady,
      tokenRef,
      setTokenRef,
    }),
    [user, isReady, setTokenRef],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useUser = () => useContext(AuthContext).user;
export const useTokenRef = () => useContext(AuthContext).tokenRef;
export const useSetTokenRef = () => useContext(AuthContext).setTokenRef;
export const useIsLoggedIn = () => useContext(AuthContext).isLogged;
export const useIsAuthReady = () => useContext(AuthContext).isReady;
