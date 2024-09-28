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
import "./tailwind.css";
import { AnimatePresence, motion } from "framer-motion";

import "cal-sans";
import "@fontsource-variable/inter";

import { ApolloWrapper } from "~/api/ApolloWrapper";
import { Footer } from "~/components/Footer";
import { Navbar } from "~/components/Navbar";
import { Toaster } from "~/components/ui/sonner";
import { getDefaultThemeKey } from "~/rootHelpers";
import { AuthProvider } from "~/utils/supabase/AuthProvider";

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
export default function App() {
  return (
    <AuthProvider>
      <ApolloWrapper>
        <Navbar />
        <AnimatePresence mode="popLayout">
          <motion.div
            key={useLocation().pathname}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={transition}
            className="flex min-h-[calc(100dvh-20rem)] flex-row md:min-h-[calc(100dvh-10.5rem)]"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
        <Footer />
        <Toaster />
      </ApolloWrapper>
    </AuthProvider>
  );
}
