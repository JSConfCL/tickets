import { createClient } from "@supabase/supabase-js";
import { deleteCookie } from "cookies-next";
import { OptionsType } from "cookies-next/lib/types";

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
  deleteCookie(COOKIE_NAME);
  if (!data.error) {
    throw new Error("Error logging out");
  }
};

export const getCookieOptions = (): OptionsType => {
  const expirationDate = Date.now() + oneYear;
  const cookieArguments = {
    httpOnly: false,
    sameSite: "lax",
    maxAge: expirationDate,
    expires: new Date(expirationDate),
    secure:
      typeof document !== "undefined" &&
      (document.location?.protocol === "https" ||
        document.location?.hostname === "localhost"),
  } satisfies OptionsType;
  return cookieArguments;
};
