"use client";

import { createGraphiQLFetcher, Fetcher } from "@graphiql/toolkit";
import { GraphiQL } from "graphiql";
import { useEffect, useRef, useState } from "react";
import "graphiql/graphiql.css";
import Link from "next/link";
import { urls } from "../../../lib/urls";
import { Button } from "../../../components/ui/button";

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
      url: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT!,
      enableIncrementalDelivery: true,
      fetch(input, init) {
        return fetch(input, {
          ...init,
          headers: {
            ...init?.headers,
            AUTH: `Bearer ${token}`,
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
  return <GraphiQL fetcher={fetcherRef.current!} />;
}

export const runtime = "edge";
