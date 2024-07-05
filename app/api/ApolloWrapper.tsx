import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  from,
  ApolloProvider,
} from "@apollo/client/index";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { RetryLink } from "@apollo/client/link/retry";

import { useTokenRef } from "../utils/supabase/AuthProvider";
import { useRefreshToken } from "../utils/supabase/client";

const retryLink = new RetryLink();

// Este link "promueve" errores de graphql a errores de Javascript.
// El retry link los va a procesar y reintentar :)
// Importante ponerlo entre el retryLink y el httpLink
const errorPromotionLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((data) => {
    if (
      data.errors &&
      data.errors.length > 0 &&
      data.errors.some((error) => error.extensions.code === "UNAUTHENTICATED")
    ) {
      throw new Error("GraphQL Authentication Error. Retriable");
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
    const headers =
      (context.headers as Record<string, string> | undefined) ?? {};

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

// Este link se encarga de manejar errores de autenticación
// Si el servidor responde con un code UNAUTHENTICATED, intenta refrescar el token.
const useErrorLink = () => {
  const refreshToken = useRefreshToken();

  return onError(({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        if (err.extensions.type === "UNAUTHENTICATED") {
          refreshToken(
            () => {
              forward(operation);
            },
            () => {
              // eslint-disable-next-line no-console
              console.error("Error refreshing access token");
            },
          );
        }
      }
    } else if (networkError) {
      // eslint-disable-next-line no-console
      console.error(
        `[Network error]: ${networkError.name} - ${networkError.message}. stack: ${networkError.stack ?? ""}`,
      );
    } else {
      // eslint-disable-next-line no-console
      console.error("Unknown error", operation);
      forward(operation);
    }
  });
};

if (!import.meta.env.VITE_JSCL_API_URL) {
  throw new Error("Missing env var: VITE_JSCL_API_URL");
}

// Este link se encarga de definir donde y como se conecta el cliente de Apollo a la API
const httpLink = new HttpLink({
  // Tiene que ser una URL absoluta, ya que las URLs relativas no pueden ser usadas en SSR.
  uri: import.meta.env.VITE_JSCL_API_URL,
  fetchOptions: { cache: "no-store", credentials: "include" },
  credentials: "include",
});

function useMakeClient() {
  const authLink = useAuthLink();
  const errorLink = useErrorLink();

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: from([
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
