import { LogOut, PackageOpen, Settings, User as UserIcon } from "lucide-react";
import { useMemo } from "react";

import { useIsAuthReady, useIsLoggedIn } from "~/utils/supabase/AuthProvider";
import { logout } from "~/utils/supabase/client";
import { urls } from "~/utils/urls";

import { MainNav } from "./MainNav";
import { MobileNav } from "./MobileNav";
import { ThemeSwitcher } from "./ThemeSwitcher";
import type { NavbarMenuItem } from "./types";

const guestItems = [
  {
    content: "Eventos",
    show: true,
    link: urls.events.root,
  },
  {
    content: "Comunidades",
    show: true,
    link: urls.comunidades,
  },
] satisfies NavbarMenuItem[];

export const Navbar = () => {
  const isLogged = useIsLoggedIn();
  const isAuthReady = useIsAuthReady();

  const userItems = useMemo(
    () =>
      [
        {
          content: "Eventos",
          show: true,
          link: urls.events.root,
        },
        {
          content: "Comunidades",
          show: true,
          link: urls.comunidades,
        },
        {
          content: "Mis Eventos",
          show: true,
          link: urls.tickets.root,
        },
        {
          content: "Perfil",
          show: true,
          children: [
            {
              content: "Mi Cuenta",
              show: true,
              icon: <UserIcon className="mr-2 size-4" />,
              link: urls.home,
            },
            {
              show: true,
              content: "separator",
            },
            {
              content: "Settings",
              show: true,
              icon: <Settings className="mr-2 size-4" />,
              link: urls.home,
            },
            {
              show: true,
              content: "separator",
            },
            {
              content: "Salir",
              show: isAuthReady && isLogged,
              icon: <LogOut className="mr-2 size-4" />,
              onClick: () => {
                logout().catch(console.error);
              },
            },
          ],
        },
      ] satisfies NavbarMenuItem[],
    [isAuthReady, isLogged],
  );

  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-14 items-center">
        <a href="/">
          <div className="px-0">
            <PackageOpen className="size-5" />
            <span className="sr-only">Devent</span>
          </div>
        </a>
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
