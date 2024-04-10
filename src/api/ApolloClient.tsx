import { COOKIE_NAME } from "@/utils/supabase/client";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";
import { getCookie } from "cookies-next";

const { getClient } = registerApolloClient(() => {
  const cookieValue = getCookie(COOKIE_NAME);
  const headers = cookieValue
    ? {
        headers: {
          cookie: `${COOKIE_NAME}=${cookieValue}`,
        },
      }
    : {};
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      // this needs to be an absolute url, as relative urls cannot be used in SSR
      uri: process.env.NEXT_PUBLIC_JSCL_API_URL,
      fetch,
      ...headers,
    }),
  });
});

export const getApolloClient = getClient;
