/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from "@supabase/supabase-js";
import { CookieAttributes } from "node_modules/@types/js-cookie";

// @ts-expect-error env is defined in wrangler.toml
if (!__VITE_SUPABASE_URL__) {
  throw new Error("Missing VITE_SUPABASE_URL");
}

// @ts-expect-error env is defined in wrangler.toml
if (!__VITE_SUPABASE_ANON_KEY__) {
  throw new Error("Missing VITE_SUPABASE_ANON_KEY");
}

export const supabaseClient = createClient(
  // @ts-expect-error env is defined in wrangler.toml
  __VITE_SUPABASE_URL__ as string,
  // @ts-expect-error env is defined in wrangler.toml
  __VITE_SUPABASE_ANON_KEY__ as string,
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
