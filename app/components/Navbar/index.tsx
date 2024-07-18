import { Link } from "@remix-run/react";
import { LogOut, PackageOpen, UserIcon, VenetianMaskIcon } from "lucide-react";
import { useMemo, useState } from "react";

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
// import { ThemeSwitcher } from "./ThemeSwitcher";
import type { NavbarMenuItem } from "./types";

export const Navbar = () => {
  const isLogged = useIsLoggedIn();
  const isAuthReady = useIsAuthReady();
  const myProfile = useMyProfileQuery({
    skip: !isLogged || !isAuthReady,
  });
  const { impersonation, setImpersonation } = useAuthContext();

  const [impersonateModal, setImpersonateModal] = useState(false);

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
              },
            },
          ],
        },
        {
          content: "Login",
          link: urls.login,
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
    ],
  );

  return (
    <>
      <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-14 items-center">
          <Link to="/">
            <div className="px-0">
              <PackageOpen className="size-5" />
              <span className="sr-only">Devent</span>
            </div>
          </Link>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none"></div>
            <nav className="hidden items-center space-x-4 md:flex ">
              <MainNav items={userItems} />
              {/* <ThemeSwitcher /> */}
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
