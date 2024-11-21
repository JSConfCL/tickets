import { LinksFunction, MetaFunction } from "@remix-run/cloudflare";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "@remix-run/react";
import { setDefaultOptions } from "date-fns";
import { es } from "date-fns/locale";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import "cal-sans";
import "@fontsource-variable/inter";

import { ApolloWrapper } from "~/api/ApolloWrapper";
import { Footer } from "~/components/Footer";
import { Navbar } from "~/components/Navbar";
import { Toaster } from "~/components/ui/sonner";
import { getDefaultThemeKey } from "~/rootHelpers";
import { pageview } from "~/utils/meta-pixel";
import { useNavigationHistoryStore } from "~/utils/navigationHistoryStore";
import { AuthProvider } from "~/utils/supabase/AuthProvider";

import "./tailwind.css";

setDefaultOptions({ locale: es });

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`h-dvh bg-slate-100 font-inter dark:bg-slate-950`}
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className={`${getDefaultThemeKey()} flex min-h-full flex-col`}>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

const variants = {
  initial: { opacity: 0, scale: 0.99 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.99 },
};
const transition = { duration: 0.3 };

export const links: LinksFunction = () => {
  return [
    {
      rel: "icon",
      href: "light-mode-favicon.ico",
      media: "(prefers-color-scheme: light)",
    },
    {
      rel: "icon",
      href: "dark-mode-favicon.ico",
      media: "(prefers-color-scheme: dark)",
    },
  ];
};

export const meta: MetaFunction = () => {
  return [
    { title: "Tickets - Plataforma de Entradas Open-Source para Eventos." },
    {
      property: "og:title",
      content: "Tickets - Plataforma de Entradas Open-Source para Eventos.",
    },
    {
      name: "description",
      content:
        "Tickets - Descubre y compra entradas para eventos emocionantes, la solución open-source para la gestión de eventos. Ya sea que asistas o organices, nuestra plataforma te ayuda a descubrir, gestionar y vender entradas, todo impulsado por una comunidad colaborativa.",
    },
    {
      property: "og:image",
      content: "/og.jpg",
    },
  ];
};

function MetaPageviews() {
  const { pathname } = useLocation();
  const addToHistory = useNavigationHistoryStore().addToHistory;

  useEffect(() => {
    pageview();
    addToHistory(window.location.href);
  }, [pathname, addToHistory]);

  return null;
}

export default function App() {
  const [isClient, setIsClient] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsClient(true);
  }, [location.search]);

  if (!isClient) {
    return;
  }

  return (
    <AuthProvider>
      <ApolloWrapper>
        <Navbar />
        <AnimatePresence mode="popLayout">
          <motion.div
            key={location.pathname}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={transition}
            className="flex min-h-[calc(100dvh-20rem)] flex-row md:min-h-[calc(100dvh-11rem)]"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
        <Footer />
        <Toaster />
        <MetaPageviews />
      </ApolloWrapper>
    </AuthProvider>
  );
}
