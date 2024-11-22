/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from "@supabase/supabase-js";
import { CookieAttributes } from "node_modules/@types/js-cookie";

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

const oneHour = 1000 * 60 * 60;
const oneYear = oneHour * 24 * 365;

export const logout = async (onDone?: () => void) => {
  const data = await supabaseClient.auth.signOut({ scope: "local" });

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
