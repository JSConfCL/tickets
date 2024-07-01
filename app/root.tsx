import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import "./tailwind.css";
import { ApolloWrapper } from "~/api/ApolloWrapper";
import { Navbar } from "~/components/Navbar";
import { Toaster } from "~/components/ui/sonner";
import { AuthProvider } from "~/utils/supabase/AuthProvider";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark h-dvh bg-slate-950">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="flex min-h-full flex-col">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ApolloWrapper>
        <Navbar />
        <Outlet />
        <Toaster />
      </ApolloWrapper>
    </AuthProvider>
  );
}
