"use client";
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  from,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { RetryLink } from "@apollo/client/link/retry";
import cookies from "js-cookie";

import { useSetTokenRef, useTokenRef } from "../utils/supabase/AuthProvider";
import { COOKIE_NAME, supabaseClient } from "../utils/supabase/client";

const retryLink = new RetryLink();

// Este link "promueve" errores de graphql a errores de Javascript.
// El retry link los va a procesar y reintentar :)
// Importante ponerlo entre el retryLink y el httpLink
const errorPromotionLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((data) => {
    if (data && data.errors && data.errors.length > 0) {
      throw new Error("GraphQL Operational Error. Retriable");
    }
    return data;
  });
});

// Este link se encarga de añadir el token de autenticación a las peticiones
const useAuthLink = () => {
  const accessToken = useTokenRef().current;
  return setContext((_, context) => {
    // Obtenemos el access token desde el contexto.
    const token = accessToken;
    const headers = (context.headers as Record<string, string>) ?? {};
    // TODO: Considerar si es necesario validar que el JWT sea valido/parseable
    if (token) {
      return {
        headers: {
          ...headers,
          authorization: `Bearer ${token}`,
        },
      };
    }
    // Si no hay token, retornamos los headers sin modificar
    return {
      headers,
    };
  });
};

const useErrorLink = () => {
  const setToken = useSetTokenRef();
  return onError(({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        if (err.extensions?.code === "UNAUTHENTICATED") {
          supabaseClient.auth
            .getSession()
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
              forward(operation);
            })
            .catch((error) => {
              // eslint-disable-next-line no-console
              console.error("Error refreshing access token", error);
            });
          // }
        }
      }
    } else if (networkError) {
      // eslint-disable-next-line no-console
      console.error(
        `[Network error]: ${networkError.name} - ${networkError.message}. stack: ${networkError.stack}`,
      );
    } else {
      // eslint-disable-next-line no-console
      console.error("Unknown error", operation);
      forward(operation);
    }
  });
};

// const checkAndRefreshTokenLink = new ApolloLink((operation, forward) => {
//   try {
//     const undecodedToken = cookies.get(COOKIE_NAME) ?? null;
//     console.log("undecodedToken", undecodedToken);
//     if (!undecodedToken) {
//       return forward(operation);
//     }
//     const token = jwtDecode(undecodedToken);
//     console.log("TOKEN", token);
//     if (!token || !token.exp) {
//       return forward(operation);
//     }
//     // Refresh token if it's expired using supabaseclient (and enqueue the operation to be retried after refreshing the token)
//     const now = Date.now() / 1000;
//     if (token.exp - now < 60 * 5) {
//       operationQueue.push(operation);
//       return forward(operation);
//     } else {
//       return forward(operation);
//     }
//   } catch (error) {
//     console.error("Error checking token", error);
//     return forward(operation);
//   }

//   // if (!token) {
//   //   // Token does not exist, refresh it
//   //   supabase.auth.refreshAccessToken().then(({ data, error }) => {
//   //     if (error) {
//   //       console.error("Error refreshing access token", error);
//   //       observer.error(error);
//   //       return;
//   //     }

//   //     const newToken = data.session.access_token;
//   //     cookies.set(COOKIE_NAME, newToken);

//   //     const oldHeaders = operation.getContext().headers;
//   //     operation.setContext({
//   //       headers: {
//   //         ...oldHeaders,
//   //         authorization: `Bearer ${newToken}`,
//   //       },
//   //     });

//   //     forward(operation).subscribe({
//   //       next: (result) => observer.next(result),
//   //       error: (networkError) => observer.error(networkError),
//   //       complete: () => observer.complete(),
//   //     });
//   //   });
//   // } else {
//   //   // Token exists, proceed with the operation
//   //   forward(operation).subscribe({
//   //     next: (result) => observer.next(result),
//   //     error: (networkError) => observer.error(networkError),
//   //     complete: () => observer.complete(),
//   //   });
//   // }
// });

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
  const authLink = useAuthLink();
  const errorLink = useErrorLink();
  return new ApolloClient({
    // use the `NextSSRInMemoryCache`, not the normal `InMemoryCache`
    cache: new InMemoryCache(),
    link: from([
      // checkAndRefreshTokenLink,
      retryLink,
      errorPromotionLink,
      errorLink,
      retryLink,
      authLink.concat(httpLink),
    ]),
    credentials: "include",
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  const client = useMakeClient();
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
