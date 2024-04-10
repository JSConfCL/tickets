import { createClient } from "@supabase/supabase-js";
import cookies, { CookieAttributes } from "js-cookie";

export const COOKIE_NAME = "community-os-access-token";

export const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
    },
  },
);

const oneHour = 1000 * 60 * 60;
const oneYear = oneHour * 24 * 365;

export const logout = async () => {
  const data = await supabaseClient.auth.signOut({ scope: "local" });
  cookies.remove(COOKIE_NAME);
  if (!data.error) {
    throw new Error("Error logging out");
  }
};

export const getCookieOptions = (): CookieAttributes => {
  const expirationDate = Date.now() + oneYear;
  const cookieArguments = {
    httpOnly: false,
    sameSite: "lax",
    expires: expirationDate,
    secure:
      typeof document !== "undefined" &&
      (document.location?.protocol === "https" ||
        document.location?.hostname === "localhost"),
  } satisfies CookieAttributes;
  return cookieArguments;
};
