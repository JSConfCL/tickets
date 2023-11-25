"use client";

import Link from "next/link";
import { MainNav } from "./Navbar/MainNav";
import { MobileNav } from "./Navbar/MobileNav";
import { ThemeSwitcher } from "./Navbar/ThemeSwitcher";
import { LogOut, Settings, User, PackageOpen } from "lucide-react";
import { useClerk, useUser } from "@clerk/clerk-react";
import { useMemo } from "react";
import { NavbarMenuItem } from "./Navbar/types";

export const Nav = () => {
  const { isLoaded, isSignedIn } = useUser();
  const isLogged = useMemo(() => isLoaded && isSignedIn, []);
  const { signOut } = useClerk();

  const guestItems = useMemo(
    () =>
      [
        {
          content: "Eventos",
          link: "/",
        },
        {
          content: "Comunidades",
          link: "/",
        },
      ] satisfies NavbarMenuItem[],
    [],
  );

  const userItems = useMemo(
    () =>
      [
        {
          content: "Eventos",
          link: "/",
        },
        {
          content: "Comunidades",
          link: "/",
        },
        {
          content: "Perfil",
          children: [
            {
              content: "Mi Cuenta",
              icon: <User className="mr-2 h-4 w-4" />,
              link: "/",
            },
            {
              content: "separator",
            },
            {
              content: "Settings",
              icon: <Settings className="mr-2 h-4 w-4" />,
              link: "/",
            },
            {
              content: "separator",
            },
            {
              content: "Salir",
              icon: <LogOut className="mr-2 h-4 w-4" />,
              onClick: () => {
                const key = process.env.NEXT_PUBLIC_TOKEN_STORAGE_KEY;
                if (key) {
                  window.localStorage.clear();
                }
                signOut().catch((e) => console.error(e));
              },
            },
          ],
        },
      ] satisfies NavbarMenuItem[],
    [signOut],
  );

  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-14 items-center">
        <Link href={"/"} target="_blank" rel="noreferrer">
          <div className="px-0">
            <PackageOpen className="h-5 w-5" />
            <span className="sr-only">Devent</span>
          </div>
        </Link>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none"></div>
          <nav className="hidden items-center space-x-4 md:flex ">
            <MainNav items={isLogged ? userItems : guestItems} />
            <ThemeSwitcher />
          </nav>
        </div>
        <MobileNav items={isLogged ? userItems : guestItems} />
      </div>
    </header>
  );
};
