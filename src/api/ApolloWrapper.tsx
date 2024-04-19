"use client";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { COOKIE_NAME } from "../utils/supabase/client";
import cookies from "js-cookie";

const authLink = setContext((_, context) => {
  // get the authentication token from local storage if it exists
  const token = cookies.get(COOKIE_NAME) ?? null;
  const headers = (context.headers as Record<string, string>) ?? {};
  if (token) {
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${token}`,
      },
    };
  }
  // return the headers to the context so httpLink can read them
  return {
    headers,
  };
});

function useMakeClient() {
  const httpLink = new HttpLink({
    // this needs to be an absolute url, as relative urls cannot be used in SSR
    uri: process.env.NEXT_PUBLIC_JSCL_API_URL,
    // you can disable result caching here if you want to
    // (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
    fetchOptions: { cache: "no-store", credentials: "include" },
    credentials: "include",
    // you can override the default `fetchOptions` on a per query basis
    // via the `context` property on the options passed as a second argument
    // to an Apollo Client data fetching hook, e.g.:
    // const { data } = useSuspenseQuery(MY_QUERY, { context: { fetchOptions: { cache: "force-cache" }}});
  });

  return new ApolloClient({
    // use the `NextSSRInMemoryCache`, not the normal `InMemoryCache`
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
    credentials: "include",
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  const client = useMakeClient();
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
