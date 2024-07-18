import { AuthSession, Session, User } from "@supabase/supabase-js";
import { useLocalStorage } from "@uidotdev/usehooks";
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

import { supabaseClient } from "~/utils/supabase/client";

export type AuthContextType = {
  user: User | null;
  isLogged: boolean;
  isReady: boolean;
  tokenRef: MutableRefObject<string | null>;
  impersonation: { userId: string; userName: string } | null;
  setTokenRef: (token: string | null) => void;
  refreshSession: () => Promise<void>;
  setImpersonation: (
    impersonation: { userId: string; userName: string } | null,
  ) => void;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLogged: false,
  isReady: false,
  tokenRef: { current: null },
  impersonation: null,
  setTokenRef: () => {},
  refreshSession: async () => {},
  setImpersonation: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [supabaseSession, setSession] = useState<Session | null>(null);
  const [impersonation, setImpersonation] = useLocalStorage<{
    userId: string;
    userName: string;
  } | null>("impersonation-key", null);
  const impersonationRef = useRef<{
    userId: string;
    userName: string;
  } | null>(impersonation);

  console.log("impersonation", impersonation, impersonationRef.current);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const tokenRef = useRef<string | null>(null);

  useEffect(() => {
    // This is our way to force a reload when impersonation changes
    if (impersonationRef.current?.userId !== impersonation?.userId) {
      window.location.reload();
    }
  }, [impersonation]);

  const setter = useCallback(
    (session: AuthSession | null) => {
      const user = session?.user ?? null;
      const token = session?.access_token ?? null;

      setUser(user);
      setSession(session);
      tokenRef.current = token;
    },
    [setSession, setUser],
  );
  const setTokenRef = useCallback(
    (token: string | null) => {
      tokenRef.current = token;
    },
    [tokenRef],
  );

  useEffect(() => {
    const initialize = async () => {
      const {
        data: { session },
      } = await supabaseClient.auth.getSession();

      setter(session);

      await supabaseClient.auth.startAutoRefresh();
      await supabaseClient.auth.refreshSession();
    };

    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange(async (_event, session) => {
      setter(session);
      await supabaseClient.auth.startAutoRefresh();
    });

    // eslint-disable-next-line no-console
    initialize()
      .then(() => setIsReady(true))
      .catch(console.error);

    return () => subscription.unsubscribe();
  }, [setter]);

  const refreshSession = useCallback(async () => {
    const { data, error } = await supabaseClient.auth.refreshSession();

    if (error) {
      // eslint-disable-next-line no-console
      console.error("Error refreshing access token", error);

      return;
    }

    setter(data?.session ?? null);
  }, [setter]);
  const value = useMemo(
    () =>
      ({
        user,
        isLogged: Boolean(user?.id),
        isReady: Boolean(isReady),
        impersonation,
        tokenRef,
        setTokenRef,
        refreshSession,
        setImpersonation,
      }) satisfies AuthContextType,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      user,
      isReady,
      impersonation,
      setTokenRef,
      refreshSession,
      setImpersonation,
      supabaseSession,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useUser = () => useContext(AuthContext).user;
export const useAuthContext = () => useContext(AuthContext);
export const useTokenRef = () => useContext(AuthContext).tokenRef;
export const useSetTokenRef = () => useContext(AuthContext).setTokenRef;
export const useIsLoggedIn = () => useContext(AuthContext).isLogged;
export const useIsAuthReady = () => useContext(AuthContext).isReady;
export const useRefreshSession = () => useContext(AuthContext).refreshSession;
