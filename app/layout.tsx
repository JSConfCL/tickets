import "./globals.css";
import classNames from "classnames";
import { Inter, Roboto } from "next/font/google";

import { ThemeProvider } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";

import { ApolloWrapper } from "../src/api/ApolloWrapper";
import { AuthProvider } from "../src/utils/supabase/AuthProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["500", "700", "900"],
});
const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
  weight: ["400", "700"],
});

export const metadata = {
  title: "Tickets",
  description: "Ticketing platform for CommunityOS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`h-[100dvh] bg-slate-950`}>
      <body
        className={classNames(
          inter.variable,
          roboto.variable,
          "flex min-h-full flex-col",
        )}
      >
        <AuthProvider>
          <ApolloWrapper>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <Toaster />
            </ThemeProvider>
          </ApolloWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}

export const runtime = "edge";
