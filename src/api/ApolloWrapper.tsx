"use client";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import cookies from "js-cookie";

function useMakeClient() {
  const httpLink = new HttpLink({
    // this needs to be an absolute url, as relative urls cannot be used in SSR
    uri: process.env.NEXT_PUBLIC_JSCL_API_URL,
    // you can disable result caching here if you want to
    // (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
    fetchOptions: { cache: "no-store" },
    credentials: "same-origin",
    // you can override the default `fetchOptions` on a per query basis
    // via the `context` property on the options passed as a second argument
    // to an Apollo Client data fetching hook, e.g.:
    // const { data } = useSuspenseQuery(MY_QUERY, { context: { fetchOptions: { cache: "force-cache" }}});
  });

  return new ApolloClient({
    // use the `NextSSRInMemoryCache`, not the normal `InMemoryCache`
    cache: new InMemoryCache(),
    link: httpLink,
    // link:
    //   typeof window === "undefined"
    //     ? ApolloLink.from([
    //         // in a SSR environment, if you use multipart features like
    //         // @defer, you need to decide how to handle these.
    //         // This strips all interfaces with a `@defer` directive from your queries.
    //         new SSRMultipartLink({
    //           stripDefer: true,
    //         }),
    //         httpLink,
    //       ])
    //     : httpLink,
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  const client = useMakeClient();
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
