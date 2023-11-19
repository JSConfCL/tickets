"use client";
import { ClerkProvider } from "@clerk/clerk-react";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export const Clerk = ({ children }: Props) => {
  return (
    <ClerkProvider
      supportEmail="contacto@jschile.org"
      localization={{
        locale: "es-ES",
      }}
      isSatellite={process.env.NEXT_PUBLIC_CLERK_IS_SATELLITE === "true"}
      // TODO: Esto no debería existir. Borrarlo cuando deployiemos a producción
      domain={(url) => {
        const splitted = url.host.split(".");
        return [splitted.at(-2), splitted.at(-1)].join(".");
      }}
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
    >
      {children}
    </ClerkProvider>
  );
};
