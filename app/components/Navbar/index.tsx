import { Link, useNavigate } from "@remix-run/react";
import { LogOut, Tickets, UserIcon, VenetianMaskIcon } from "lucide-react";
import { useMemo, useState } from "react";
import Bowser from "bowser";

import { ImpersonationModal } from "~/components/Navbar/Impersonation";
import { useMyProfileQuery } from "~/components/Profile/graphql/myProfile.generated";
import {
  useAuthContext,
  useIsAuthReady,
  useIsLoggedIn,
} from "~/utils/supabase/AuthProvider";
import { logout } from "~/utils/supabase/client";
import { urls } from "~/utils/urls";

import { MainNav } from "./MainNav";
import { MobileNav } from "./MobileNav";
import { ThemeSwitcher } from "./ThemeSwitcher";
import type { NavbarMenuItem } from "./types";

export const Navbar = () => {
  const navigate = useNavigate();
  const isLogged = useIsLoggedIn();
  const isAuthReady = useIsAuthReady();
  const myProfile = useMyProfileQuery({
    skip: !isLogged || !isAuthReady,
  });
  const browser = Bowser.getParser(window.navigator.userAgent);
  const isMobileSafari = browser.satisfies({
    mobile: {
      safari: ">=9",
    },
  });

  const { impersonation, setImpersonation } = useAuthContext();

  const [impersonateModal, setImpersonateModal] = useState(false);

  const userItems = useMemo(
    () =>
      [
        {
          content: "Eventos",
          show: false,
          link: urls.events.root,
        },
        {
          content: "Comunidades",
          show: false,
          link: urls.comunidades,
        },
        {
          content: "Mis Eventos",
          show: isAuthReady && isLogged,
          link: urls.myEvents.root,
        },
        {
          content: "Perfil",
          show: isAuthReady && isLogged,
          children: [
            {
              content: "Mi Cuenta",
              show: true,
              icon: <UserIcon className="mr-2 size-4" />,
              link: urls.profile.root,
            },
            {
              show: true,
              content: "separator",
            },
            {
              content: impersonation ? "Dejar de Impersonar" : "Impersonar",
              show: Boolean(myProfile?.data?.me?.isSuperAdmin),
              icon: <VenetianMaskIcon color="red" className="mr-2 size-4" />,
              onClick: () => {
                if (impersonation) {
                  setImpersonation(null);
                } else {
                  setImpersonateModal(true);
                }
              },
            },
            // {
            //   content: "Settings",
            //   show: true,
            //   icon: <Settings className="mr-2 size-4" />,
            //   link: urls.home,
            // },
            // {
            //   show: true,
            //   content: "separator",
            // },
            {
              content: "Salir",
              show: isAuthReady && isLogged,
              icon: <LogOut className="mr-2 size-4" />,
              onClick: () => {
                logout().catch(console.error);
                navigate(urls.home);
              },
            },
          ],
        },
        {
          content: "Login",
          link: urls.login,
          fullLink: isMobileSafari
            ? `x-safari-https://tickets.communityos.io/${urls.login}`
            : undefined,
          variant: "secondary",
          show: isAuthReady && !isLogged,
        },
      ] satisfies NavbarMenuItem[],
    [
      impersonation,
      isAuthReady,
      isLogged,
      myProfile?.data?.me?.isSuperAdmin,
      setImpersonation,
      navigate,
    ],
  );

  return (
    <>
      <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-14 items-center">
          <Link to="/">
            <div className="px-0">
              <Tickets className="size-5" />
              <span className="sr-only">Devent</span>
            </div>
          </Link>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none"></div>
            <nav className="hidden items-center space-x-4 md:flex ">
              <MainNav items={userItems} />
              <ThemeSwitcher />
            </nav>
          </div>
          <MobileNav items={userItems} />
        </div>
      </header>
      <ImpersonationModal
        isOpen={impersonateModal}
        onStateChange={setImpersonateModal}
      />
    </>
  );
};
