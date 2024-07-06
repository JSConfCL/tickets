import { AuthSession, Session, User } from "@supabase/supabase-js";
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
  setTokenRef: (token: string | null) => void;
  refreshSession: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLogged: false,
  isReady: false,
  tokenRef: { current: null },
  setTokenRef: () => {},
  refreshSession: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [supabaseSession, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const tokenRef = useRef<string | null>(null);

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
    };

    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange(async (_event, session) => {
      setter(session);
      await supabaseClient.auth.startAutoRefresh();
    });

    // eslint-disable-next-line no-console
    initialize().catch(console.error);

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
        isReady: Boolean(supabaseSession),
        tokenRef,
        setTokenRef,
        refreshSession,
      }) satisfies AuthContextType,
    [user, supabaseSession, tokenRef, setTokenRef, refreshSession],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useUser = () => useContext(AuthContext).user;
export const useTokenRef = () => useContext(AuthContext).tokenRef;
export const useSetTokenRef = () => useContext(AuthContext).setTokenRef;
export const useIsLoggedIn = () => useContext(AuthContext).isLogged;
export const useIsAuthReady = () => useContext(AuthContext).isReady;
export const useRefreshSession = () => useContext(AuthContext).refreshSession;
