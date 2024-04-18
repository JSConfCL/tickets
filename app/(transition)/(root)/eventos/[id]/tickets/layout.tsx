"use client";
import React from "react";
import {
  useIsAuthReady,
  useIsLoggedIn,
} from "../../../../../../src/utils/supabase/AuthProvider";
import { Login } from "../../../../../../src/components/features/Auth/Login";

export default function Layout({ children }: { children: React.ReactNode }) {
  const isLoggedIn = useIsLoggedIn();
  const isAuthReady = useIsAuthReady();

  if (!isAuthReady) {
    return <div></div>;
  }

  if (!isLoggedIn) {
    return (
      <div className="flex w-full flex-1 flex-col items-center justify-center gap-2 bg-muted">
        <div className="flex w-full max-w-lg flex-1 flex-col items-center justify-center gap-8">
          <h1 className="px-2 text-xl">
            Inicia sesión para reservar tus tickets
          </h1>
          <Login />
          <div className="pb-28" />
        </div>
      </div>
    );
  }

  return <div>{children}</div>;
}

export const runtime = "edge";
