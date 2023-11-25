"use client";

import { createGraphiQLFetcher, Fetcher } from "@graphiql/toolkit";
import { GraphiQL } from "graphiql";
import { useEffect, useRef, useState } from "react";
import "graphiql/graphiql.css";
import Link from "next/link";
import { urls } from "../../../src/lib/urls";
import { Button } from "../../../src/components/ui/button";

const useGetAuthToken = () => {
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_TOKEN_STORAGE_KEY;
    if (!key) {
      console.error("No token storage key");
      return;
    }
    const token = localStorage.getItem(key);
    if (!token) {
      console.error("No token found");
      return;
    }
    const parsedToken = token;
    setToken(parsedToken);
  }, []);
  return token;
};

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
export default function Pregunta() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const fetcherRef = useRef<Fetcher>();
  const token = useGetAuthToken();
  useEffect(() => {
    if (!token) {
      return;
    }
    setIsLoggedIn(true);
    const fetcher = createGraphiQLFetcher({
      url: process.env.NEXT_PUBLIC_JSCL_API_URL!,
      enableIncrementalDelivery: true,
      fetch(input, init) {
        return fetch(input, {
          ...init,
          headers: {
            ...init?.headers,
            Authorization: `Bearer ${token}`,
          },
        });
      },
    });
    fetcherRef.current = fetcher;
    setIsLoaded(true);
  }, [token]);
  if (!isLoaded) {
    <div className="p-4">...Loading</div>;
  }
  if (!isLoggedIn) {
    return (
      <div className="p-4">
        <p>Woah! No estas logueado</p>
        Para loguearte, ve a{" "}
        <Link href={urls.signIn}>
          <Button variant="outline">/sign-in</Button>
        </Link>
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
      ]}
    />
  );
}

export const runtime = "edge";
