/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from "@supabase/supabase-js";
import cookies from "js-cookie";
import { CookieAttributes } from "node_modules/@types/js-cookie";

import { useSetTokenRef } from "~/utils/supabase/AuthProvider";

export const COOKIE_NAME = "community-os-access-token";

if (!import.meta.env.VITE_SUPABASE_URL) {
  throw new Error("Missing VITE_SUPABASE_URL");
}

if (!import.meta.env.VITE_SUPABASE_ANON_KEY) {
  throw new Error("Missing VITE_SUPABASE_ANON_KEY");
}

export const supabaseClient = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);

export const useRefreshToken = () => {
  const setToken = useSetTokenRef();

  return (onSuccess?: () => void, onError?: (error: unknown) => void) => {
    supabaseClient.auth
      .refreshSession()
      .then(({ data, error }) => {
        if (error) {
          // eslint-disable-next-line no-console
          console.error("Error refreshing access token", error);

          return;
        }

        const newToken = data.session?.access_token;

        if (!newToken) {
          // eslint-disable-next-line no-console
          console.error("No access token found in session data");
        } else {
          setToken(newToken);
        }

        onSuccess?.();
      })
      .catch((error: unknown) => {
        onError?.(error);
      });
  };
};

const oneHour = 1000 * 60 * 60;
const oneYear = oneHour * 24 * 365;

export const logout = async (onDone?: () => void) => {
  const data = await supabaseClient.auth.signOut({ scope: "local" });

  cookies.remove(COOKIE_NAME);

  if (data.error) {
    throw new Error("Error logging out");
  }

  onDone?.();
};

export const getCookieOptions = (): CookieAttributes => {
  const expirationDate = Date.now() + oneYear;
  const cookieArguments = {
    httpOnly: false,
    sameSite: "lax",
    expires: new Date(expirationDate),
    secure: false,
  } satisfies CookieAttributes;

  return cookieArguments;
};
