import "./globals.css";
import { Inter, Roboto } from "next/font/google";
import classNames from "classnames";
import { ThemeProvider } from "@/components/providers";
import { ApolloWrapper } from "../src/api/ApolloWrapper";
import { Clerk } from "../src/components/Auth/clerk";

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
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Clerk>
      <html lang="es" className="h-[100dvh] bg-slate-950">
        <body
          className={classNames(
            inter.variable,
            roboto.variable,
          )}
        >
          <ApolloWrapper>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </ApolloWrapper>
        </body>
      </html>
    </Clerk>
  );
}

export const runtime = "edge";
