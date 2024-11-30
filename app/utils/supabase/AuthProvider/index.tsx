import { AuthSession, Session } from "@supabase/supabase-js";
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
  userId: string | null;
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
  userId: null,
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

  const [isReady, setIsReady] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);
  const tokenRef = useRef<string | null>(null);

  useEffect(() => {
    // This is our way to force a reload when impersonation changes
    if (impersonationRef.current?.userId !== impersonation?.userId) {
      window.location.reload();
    }
  }, [impersonation]);

  const setTokenRef = useCallback(
    (token: string | null) => {
      tokenRef.current = token;
    },
    [tokenRef],
  );

  const setter = useCallback(
    (session: AuthSession | null) => {
      const userId = session?.user?.id ?? null;
      const token = session?.access_token ?? null;

      setUserId(userId);
      setSession(session);
      setTokenRef(token);
    },
    [setTokenRef],
  );

  useEffect(() => {
    const initialize = async () => {
      const {
        data: { session },
        error,
      } = await supabaseClient.auth.getSession();

      if (error) throw error;

      setter(session);
      setIsReady(true);
    };

    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange((_event, session) => {
      setter(session);
      setIsReady(true);
    });

    initialize().catch((error) => {
      console.error("Error setting session", error);
    });

    return () => {
      subscription.unsubscribe();
    };
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
        userId,
        isLogged: Boolean(supabaseSession),
        isReady: Boolean(isReady),
        impersonation,
        tokenRef,
        setTokenRef,
        refreshSession,
        setImpersonation,
      }) satisfies AuthContextType,
    [
      userId,
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

export const useAuthContext = () => useContext(AuthContext);
export const useTokenRef = () => useContext(AuthContext).tokenRef;
export const useIsLoggedIn = () => useContext(AuthContext).isLogged;
export const useIsAuthReady = () => useContext(AuthContext).isReady;
export const useRefreshSession = () => useContext(AuthContext).refreshSession;
