import { createGraphiQLFetcher, Fetcher } from "@graphiql/toolkit";
import { GraphiQL } from "graphiql";
import { useEffect, useRef } from "react";

import "graphiql/graphiql.css";
import { Button } from "~/components/ui/button";
import {
  useIsAuthReady,
  useIsLoggedIn,
  useTokenRef,
} from "~/utils/supabase/AuthProvider";
import { useRefreshToken } from "~/utils/supabase/client";
import { urls } from "~/utils/urls";

const comunidades = `query TodasLasComunidades {
  communities {
    description
    id
    name
    status
  }
}`;

const comunidadesYEventos = `query ComunidadesYEventos {
  communities {
    id
    name
    status
    events {
      id
      name
      address
      description
      startDateTime
      endDateTime
    }
  }
}`;

const comunidadesUsuariosYEventos = `query comunidadesUsuariosYEventos {
  communities {
    id
    name
    status
    users {
      id
      username
      lastName
      name
      bio
    }
    events {
      id
      name
      address
      description
      startDateTime
      endDateTime
    }
  }
}`;

const mutacionCrearComunidad = `# Esta mutación requiere un permiso especial.
# Manda un mensaje en el discord
# https://https://discord.jschile.org
# Para que te asignen el permiso
mutation CrearComunidad($input: CommunityCreateInput!) {
  createCommunity(input: $input) {
    id
    description
    name
    status
  }
}`;

const mutacionCrearEvento = `# Esta mutación requiere que seas Admin de una Comunidad.
# Puedes permirle permisos al Admin de alguna comunidad
# para que te haga admin
mutation CrearEvento($input: EventCreateInput!) {
  createEvent(input: $input) {
    id
    description
    startDateTime
    endDateTime
  }
}`;

const mutacionCrearTicket = `# Esta mutación requiere que seas Admin de una Comunidad.
# Puedes permirle permisos al Admin de alguna comunidad
# para que te haga admin
mutation CrearTicket($input: TicketCreateInput!) {
  createTicket(input: $input) {
    id
    description
    startDateTime
    endDateTime
  }
}`;

const mutacionDeCreatePurchaseOrder = `mutation claimUserTicket($input: TicketClaimInput!) {
  claimUserTicket(input: $input) {
    __typename
    ... on PurchaseOrder {
      __typename
      id
      currency {
        id
      }
      finalPrice
      paymentLink
      status
      tickets {
        id
        approvalStatus
        status
        redemptionStatus
        paymentStatus
      }
    }
    ... on RedeemUserTicketError {
      __typename
      error
      errorMessage
    }
  }
}`;

export default function Pregunta() {
  // const [isLoaded, setIsLoaded] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const fetcherRef = useRef<Fetcher>();
  const tokenRef = useTokenRef();
  const isLoggedIn = useIsLoggedIn();
  const isAuthReady = useIsAuthReady();
  const refreshToken = useRefreshToken();

  useEffect(() => {
    if (!tokenRef.current) {
      return;
    }

    const fetcher = createGraphiQLFetcher({
      url: import.meta.env.VITE_JSCL_API_URL!,
      enableIncrementalDelivery: true,
      fetch(input, init) {
        return fetch(input, {
          ...init,
          headers: {
            ...init?.headers,
            Authorization: `Bearer ${tokenRef.current}`,
          },
        }).then(async (res) => {
          const cloned = res.clone();
          const jsonResponse = await res.json();

          if (
            (jsonResponse as { errors: { extensions: { type: string } }[] })
              ?.errors?.[0]?.extensions?.type === "UNAUTHENTICATED"
          ) {
            refreshToken();
          }

          return cloned;
        });
      },
    });

    fetcherRef.current = fetcher;
  }, [tokenRef]);

  if (!isAuthReady) {
    <div className="p-4">...Loading</div>;
  }

  if (!isLoggedIn) {
    return (
      <div className="m-auto my-0 p-4">
        <p>Woah! No estas logueado</p>
        Para loguearte{" "}
        <a href={urls.login}>
          <Button variant="outline">Haz click aquí</Button>
        </a>
      </div>
    );
  }

  if (!fetcherRef.current) {
    return (
      <div className="p-4">
        No pudimos cargar el fetcher. Prueba refrescando, o reporta este issue
        en github.
      </div>
    );
  }

  return (
    <div className="h-[calc(100svh-4rem)]">
      <GraphiQL
        fetcher={fetcherRef.current}
        defaultEditorToolsVisibility="variables"
        defaultTabs={[
          {
            query: comunidades,
          },
          {
            query: comunidadesUsuariosYEventos,
          },
          {
            query: comunidadesYEventos,
          },
          {
            query: mutacionCrearComunidad,
            variables: JSON.stringify(
              {
                input: {
                  description: "",
                  name: "",
                  slug: "",
                },
              },
              null,
              2,
            ),
          },
          {
            query: mutacionCrearEvento,
            variables: JSON.stringify(
              {
                input: {
                  communityId: "",
                  description: "",
                  maxAttendees: 0,
                  name: "",
                  startDateTime: "",
                },
              },
              null,
              2,
            ),
          },
          {
            query: mutacionCrearTicket,
            variables: JSON.stringify(
              {
                input: {
                  eventId: "f8cc358c-a0e5-4ae3-a6e6-d4bf92102f6a",
                  isFree: false,
                  name: "Ticket 1",
                  prices: [
                    {
                      currencyId: "71c3b512-f471-4710-a55c-43b8563825fe",
                      value: 20,
                    },
                  ],
                  startDateTime: "2030-04-03T12:50:31.857Z",
                  unlimitedTickets: false,
                  quantity: 20,
                },
              },
              null,
              2,
            ),
          },
          {
            query: mutacionDeCreatePurchaseOrder,
            variables: JSON.stringify(
              {
                input: {
                  idempotencyUUIDKey: "13a5143e-74b3-4f2a-b1ee-4780ae1086da",
                  purchaseOrder: [
                    {
                      quantity: 2,
                      ticketId: "f7a0f051-b739-4d44-b4b1-1f14e7cf33bd",
                    },
                  ],
                },
              },
              null,
              2,
            ),
          },
        ]}
      />
    </div>
  );
}

export const runtime = "edge";
