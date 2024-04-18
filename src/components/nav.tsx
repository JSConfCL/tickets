"use client";

import { LogOut, PackageOpen, Settings, User as UserIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

import { logout } from "@/utils/supabase/client";

import { useIsLoggedIn } from "@/utils/supabase/AuthProvider";
import { MainNav } from "./Navbar/MainNav";
import { MobileNav } from "./Navbar/MobileNav";
import { ThemeSwitcher } from "./Navbar/ThemeSwitcher";
import { NavbarMenuItem } from "./Navbar/types";
import { urls } from "../lib/urls";

export const Nav = () => {
  const router = useRouter();
  const isLogged = useIsLoggedIn();

  const guestItems = useMemo(
    () =>
      [
        {
          content: "Eventos",
          link: urls.eventos.root,
        },
        {
          content: "Comunidades",
          link: urls.comunidades,
        },
      ] satisfies NavbarMenuItem[],
    [],
  );

  const userItems = useMemo(
    () =>
      [
        {
          content: "Eventos",
          link: urls.eventos.root,
        },
        {
          content: "Comunidades",
          link: urls.comunidades,
        },
        {
          content: "Perfil",
          children: [
            {
              content: "Mi Cuenta",
              icon: <UserIcon className="mr-2 h-4 w-4" />,
              link: urls.home,
            },
            {
              content: "separator",
            },
            {
              content: "Settings",
              icon: <Settings className="mr-2 h-4 w-4" />,
              link: urls.home,
            },
            {
              content: "separator",
            },
            {
              content: "Salir",
              icon: <LogOut className="mr-2 h-4 w-4" />,
              onClick: () => {
                logout().catch(() => {
                  router.push(urls.login);
                });
              },
              closeMenu: true,
            },
          ],
        },
      ] satisfies NavbarMenuItem[],
    [],
  );

  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-14 items-center">
        <Link href="/">
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
